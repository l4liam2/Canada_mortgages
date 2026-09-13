#!/bin/zsh
# Rebuilds every favicon asset (both palettes) and preview.html from the SVG sources.
# Uses only macOS built-ins: qlmanage (Quick Look) rasterizes the SVGs, python3 does the rest.
#
# Why the detour: qlmanage renders SVGs blank below roughly 180 px and flattens transparency
# onto white. So we render large, square-cornered copies and let pngtool.py box-downsample
# them (exact, because the artwork sits on a 16- or 64-unit grid that divides the render size)
# and re-cut the rounded corners as real alpha.
set -eu
TOOLS="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$TOOLS")"; TMP="$(mktemp -d)"
pt() { python3 "$TOOLS/pngtool.py" "$@"; }

render() { # render SVG SIZE OUT.png -- full-bleed (rx stripped), explicit pixel size
  local svg="$1" size="$2" out="$3"; local tmp="$TMP/$(basename "$svg" .svg)-$size-$RANDOM.svg"
  sed -e "s|<svg |<svg width=\"$size\" height=\"$size\" |" -e 's/ rx="[0-9.]*"//' "$svg" > "$tmp"
  rm -rf "$TMP/ql"; mkdir -p "$TMP/ql"
  perl -e 'alarm 90; exec @ARGV' -- qlmanage -t -s "$size" -o "$TMP/ql" "$tmp" >/dev/null 2>&1
  mv "$TMP/ql/$(basename "$tmp").png" "$out"
}

build_set() { # build_set SRC_DIR OUT_DIR
  local SRC="$1"; local OUT="$2"; local T="$TMP/$(basename "$OUT")"; mkdir -p "$T"
  render "$SRC/favicon-small.svg"  512 "$T/small-512.png"
  render "$SRC/favicon-small.svg"  768 "$T/small-768.png"
  render "$SRC/favicon-master.svg" 512 "$T/master-512.png"
  render "$SRC/favicon-master.svg" 768 "$T/master-768.png"
  render "$SRC/favicon-master.svg" 720 "$T/master-720.png"
  render "$SRC/icon-maskable.svg"  512 "$T/maskable-512.png"
  #         source              /K   corner-radius fraction   output
  pt finish "$T/small-512.png"    32  0.1875   "$OUT/favicon-16x16.png"      # 16-grid: rx 3/16
  pt finish "$T/small-512.png"    16  0.1875   "$OUT/favicon-32x32.png"
  pt finish "$T/small-768.png"    16  0.1875   "$T/favicon-48x48.png"
  pt finish "$T/master-768.png"    4  0.21875  "$OUT/icon-192.png"           # 64-grid: rx 14/64
  pt finish "$T/master-512.png"    1  0.21875  "$OUT/icon-512.png"
  pt finish "$T/master-720.png"    4  0        "$OUT/apple-touch-icon.png"   # iOS masks corners itself
  pt finish "$T/maskable-512.png"  1  0        "$OUT/icon-512-maskable.png"
  pt finish "$T/master-768.png"    3  0.21875  "$T/master-256.png"           # for preview.html
  pt ico "$OUT/favicon.ico" "$OUT/favicon-16x16.png" "$OUT/favicon-32x32.png" "$T/favicon-48x48.png"
  cp "$SRC/favicon-small.svg" "$OUT/favicon.svg"
}

build_set "$TOOLS" "$ROOT"                    # navy palette (sources live next to the tools)
build_set "$ROOT/warm/source" "$ROOT/warm"    # site palette: terracotta / cream / espresso

# Preview page: both palettes, alternates, size ladder. Images embedded as data URIs.
render "$ROOT/alternates/alt-red-tile.svg"   512 "$TMP/altred-512.png"
render "$ROOT/alternates/alt-monogram-m.svg" 512 "$TMP/altm-512.png"
pt finish "$TMP/altred-512.png" 4 0.1875  "$TMP/alt-red-128.png"
pt finish "$TMP/altm-512.png"   4 0.21875 "$TMP/alt-m-128.png"
python3 "$TOOLS/make-preview.py" "$ROOT" "$TMP"
rm -rf "$TMP"; echo "done -> $ROOT"
