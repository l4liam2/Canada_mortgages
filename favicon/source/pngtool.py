#!/usr/bin/env python3
"""Pure-Python image helpers for the favicon build (no Pillow needed).

  pngtool.py finish SRC.png K RXFRAC DST.png   box-downsample by integer K, then apply a
                                               rounded-corner alpha mask with radius RXFRAC*width
  pngtool.py ico DST.ico A.png B.png ...       pack PNGs into a multi-size favicon.ico
  pngtool.py up SRC.png DST.png K              nearest-neighbour enlarge (for inspecting pixels)
  pngtool.py px SRC.png x,y ...                print RGBA of pixels
  pngtool.py ascii SRC.png                     print a character map of the image
"""
import struct, sys, zlib

def read_png(path):
    d = open(path, 'rb').read(); assert d[:8] == b'\x89PNG\r\n\x1a\n', path
    pos, idat = 8, b''
    while pos < len(d):
        ln, typ = struct.unpack('>I4s', d[pos:pos+8]); body = d[pos+8:pos+8+ln]; pos += 12 + ln
        if typ == b'IHDR':
            w, h, bd, ct, _, _, il = struct.unpack('>IIBBBBB', body); assert bd == 8 and il == 0, (bd, il)
        elif typ == b'IDAT': idat += body
    ch = {2: 3, 6: 4, 0: 1, 4: 2}[ct]; raw = zlib.decompress(idat); stride = w * ch
    rows, prev, p = [], bytearray(stride), 0
    for _ in range(h):
        f = raw[p]; line = bytearray(raw[p+1:p+1+stride]); p += 1 + stride
        for i in range(stride):
            a = line[i-ch] if i >= ch else 0; b = prev[i]; c = prev[i-ch] if i >= ch else 0
            if f == 1: line[i] = (line[i] + a) & 255
            elif f == 2: line[i] = (line[i] + b) & 255
            elif f == 3: line[i] = (line[i] + ((a + b) >> 1)) & 255
            elif f == 4:
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                line[i] = (line[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(bytes(line)); prev = line
    px = [[tuple(r[x*ch:(x+1)*ch]) + ((255,) if ch == 3 else ()) for x in range(w)] for r in rows]
    return w, h, px

def write_png(path, w, h, px):
    raw = b''.join(b'\x00' + b''.join(bytes(p[:4]) for p in row) for row in px)
    def chunk(t, b): return struct.pack('>I', len(b)) + t + b + struct.pack('>I', zlib.crc32(t + b) & 0xffffffff)
    open(path, 'wb').write(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
                           + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))

def downsample(px, w, h, k):
    """Average k*k blocks. With artwork drawn on a grid that divides the source size this is exact."""
    W, H, n, out = w // k, h // k, k * k, []
    for Y in range(H):
        rows, row = px[Y*k:(Y+1)*k], []
        for X in range(W):
            r = g = b = a = 0
            for rr in rows:
                for p in rr[X*k:(X+1)*k]: r += p[0]; g += p[1]; b += p[2]; a += p[3]
            row.append(((r + n//2)//n, (g + n//2)//n, (b + n//2)//n, (a + n//2)//n))
        out.append(row)
    return W, H, out

def round_mask(px, w, h, rx, ss):
    """Multiply alpha by the coverage of a rounded rectangle (corner radius rx), ss*ss samples per pixel."""
    if rx <= 0: return
    for y in range(h):
        cy = rx if y < rx else (h - rx if y >= h - rx else None)
        if cy is None: continue
        for x in range(w):
            cx = rx if x < rx else (w - rx if x >= w - rx else None)
            if cx is None: continue
            cnt = 0
            for i in range(ss):
                sx = x + (i + 0.5) / ss - cx
                for j in range(ss):
                    sy = y + (j + 0.5) / ss - cy
                    if sx*sx + sy*sy <= rx*rx: cnt += 1
            r, g, b, a = px[y][x]; px[y][x] = (r, g, b, round(a * cnt / (ss * ss)))

def write_ico(dst, pngs):
    blobs = []
    for p in pngs:
        w, h, _ = read_png(p); blobs.append((w, h, open(p, 'rb').read()))
    hdr = struct.pack('<HHH', 0, 1, len(blobs)); off = 6 + 16 * len(blobs); ents = data = b''
    for w, h, b in blobs:
        ents += struct.pack('<BBBBHHII', w % 256, h % 256, 0, 0, 1, 32, len(b), off); data += b; off += len(b)
    open(dst, 'wb').write(hdr + ents + data)

if __name__ == '__main__':
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == 'finish':
        src, k, rxfrac, dst = args[0], int(args[1]), float(args[2]), args[3]
        w, h, px = read_png(src)
        if k > 1: w, h, px = downsample(px, w, h, k)
        round_mask(px, w, h, rxfrac * w, 16 if w <= 64 else 6)
        write_png(dst, w, h, px); print(f'wrote {dst} ({w}x{h})')
    elif cmd == 'ico': write_ico(args[0], args[1:]); print(f'wrote {args[0]}')
    elif cmd == 'up':
        w, h, px = read_png(args[0]); k = int(args[2])
        write_png(args[1], w*k, h*k, [[px[y//k][x//k] for x in range(w*k)] for y in range(h*k)])
    elif cmd == 'px':
        w, h, px = read_png(args[0])
        for xy in args[1:]:
            x, y = map(int, xy.split(',')); print(f'({x},{y}) -> {px[y][x]}')
    elif cmd == 'ascii':
        w, h, px = read_png(args[0])
        def ch(p):
            r, g, b, a = p
            if a < 40: return '.'
            if a < 215: return ':'
            if r > 200 and g > 200 and b > 200: return '#'
            if r > 150 and g < 90 and b < 90: return 'R'
            if r < 80 and g < 100 and b > 60: return ' '
            return '?'
        for row in px: print(''.join(ch(p) for p in row))
