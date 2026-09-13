#!/usr/bin/env python3
"""Writes ROOT/preview.html: both palettes in mock browser tabs, bookmarks, iOS and Android home
screens, a size ladder, and the alternate concepts. All images are embedded as data URIs.
Usage: make-preview.py ROOT TMP   (TMP holds <set>/master-256.png, alt-red-128.png, alt-m-128.png)"""
import base64, os, sys
root, tmp = sys.argv[1], sys.argv[2]
def uri(path, mime='image/png'):
    return f"data:{mime};base64," + base64.b64encode(open(path, 'rb').read()).decode()
TITLE = 'Chad Denie | Toronto Mortgage Agent'

def assets(d, setname):
    a = {k: uri(os.path.join(d, f)) for k, f in dict(i16='favicon-16x16.png', i32='favicon-32x32.png', i192='icon-192.png',
         i512='icon-512.png', apple='apple-touch-icon.png', mask='icon-512-maskable.png').items()}
    a['svg'] = uri(os.path.join(d, 'favicon.svg'), 'image/svg+xml')
    a['i256'] = uri(os.path.join(tmp, setname, 'master-256.png'))
    a['i48'] = uri(os.path.join(tmp, setname, 'favicon-48x48.png'))
    return a

def tab(img, title, active=False, dot=None):
    fav = f'<img src="{img}" width="16" height="16" alt="">' if img else f'<span class="dot" style="background:{dot}"></span>'
    return f'<div class="tab{" active" if active else ""}">{fav}<span class="t">{title}</span></div>'
def strip(theme, img):
    return f'''<div class="strip {theme}">{tab(None, 'Inbox (3)', dot='#c4c4c4')}{tab(None, 'Rates today - Bank of Canada', dot='#8a8a8a')}{tab(img, TITLE, active=True)}{tab(None, 'Calculator', dot='#a3a3a3')}{tab(None, 'New tab', dot='#bdbdbd')}</div>'''

def section(a, heading, blurb, chips):
    return f'''
<h2>{heading}</h2><p class="sub">{blurb}</p>
{strip('light', a['svg'])}
<div class="bar"><span><span class="dot" style="background:#9aa5b1"></span>News</span><span><img src="{a['i16']}" width="16" height="16" alt="">Chad Denie</span><span><span class="dot" style="background:#c4c4c4"></span>Calendar</span><span><span class="dot" style="background:#8a8a8a"></span>Drive</span></div>
{strip('dark', a['i16'])}
<div class="row">
  <div class="ios"><figure><img src="{a['apple']}" alt="">Chad Denie</figure></div>
  <div class="android"><figure><img src="{a['mask']}" alt="">Chad Denie</figure><figure><img class="squircle" src="{a['mask']}" alt="">Chad Denie</figure></div>
  <div class="card"><b>Colours</b><br><br>{chips}</div>
  <div class="card"><div class="ladder">
    <figure><img src="{a['i16']}" width="16" height="16" alt=""><figcaption>16</figcaption></figure>
    <figure><img src="{a['svg']}" width="16" height="16" alt=""><figcaption>16 svg</figcaption></figure>
    <figure><img src="{a['i32']}" width="32" height="32" alt=""><figcaption>32</figcaption></figure>
    <figure><img src="{a['i48']}" width="48" height="48" alt=""><figcaption>48</figcaption></figure>
    <figure><img src="{a['i192']}" width="96" height="96" alt=""><figcaption>192 @ 96</figcaption></figure>
    <figure><img src="{a['apple']}" width="120" height="120" style="border-radius:27px" alt=""><figcaption>apple 180</figcaption></figure>
    <figure><img src="{a['i512']}" width="160" height="160" alt=""><figcaption>512 @ 160</figcaption></figure>
  </div></div>
</div>'''

def chip(hexcol, label, border=False):
    b = ';border:1px solid #ccd' if border else ''
    return f'<span class="chip" style="background:{hexcol}{b}"></span>{label} <code>{hexcol}</code><br>'

navy = assets(root, 'favicon'); warm = assets(os.path.join(root, 'warm'), 'warm')
alt_r = uri(os.path.join(root, 'alternates', 'alt-red-tile.svg'), 'image/svg+xml')
alt_m = uri(os.path.join(root, 'alternates', 'alt-monogram-m.svg'), 'image/svg+xml')
ar, am = uri(os.path.join(tmp, 'alt-red-128.png')), uri(os.path.join(tmp, 'alt-m-128.png'))

html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Favicon preview: Chad Denie mortgage site</title>
<link rel="icon" href="{navy['svg']}" type="image/svg+xml">
<style>
  body{{margin:0;padding:32px;font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;color:#1f2933;background:#f4f6f8}}
  h1{{font-size:20px;margin:0 0 4px}} h2{{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#6b7785;margin:40px 0 6px}}
  p.sub{{margin:0 0 12px;color:#52606d}}
  .strip{{display:flex;gap:2px;padding:8px 8px 0;border-radius:10px 10px 0 0;margin-bottom:14px;overflow:hidden}}
  .strip.light{{background:#dfe3e8}} .strip.dark{{background:#202124}}
  .tab{{display:flex;align-items:center;gap:8px;padding:0 12px;height:34px;width:190px;font-size:12px;white-space:nowrap;overflow:hidden;border-radius:8px 8px 0 0}}
  .tab .t{{overflow:hidden;text-overflow:ellipsis}} .tab img{{flex:none}}
  .light .tab{{color:#3c4043}} .light .tab.active{{background:#fff;color:#202124;width:280px}}
  .dark .tab{{color:#bdc1c6}} .dark .tab.active{{background:#35363a;color:#e8eaed;width:280px}}
  .dot{{flex:none;width:16px;height:16px;border-radius:50%}}
  .bar{{display:flex;gap:22px;align-items:center;padding:8px 14px;background:#fff;border:1px solid #dfe3e8;border-radius:0 0 10px 10px;margin-top:-14px;margin-bottom:24px;font-size:12px;color:#3c4043}}
  .bar span{{display:flex;align-items:center;gap:6px}}
  .row{{display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;margin-top:18px}}
  .card{{background:#fff;border:1px solid #e3e8ee;border-radius:12px;padding:18px 20px}}
  .ladder{{display:flex;gap:22px;align-items:flex-end}} .ladder figure{{margin:0;text-align:center}} .ladder figcaption{{font-size:11px;color:#6b7785;margin-top:8px}}
  .ios{{width:150px;height:150px;border-radius:18px;background:linear-gradient(160deg,#5b7bd5 0%,#c66fbc 55%,#f3a26b 100%);display:flex;align-items:center;justify-content:center}}
  .ios figure,.android figure{{margin:0;text-align:center;color:#fff;font-size:11px;text-shadow:0 1px 2px rgba(0,0,0,.4)}}
  .ios img{{width:60px;height:60px;border-radius:14px;display:block;margin:0 auto 6px;box-shadow:0 2px 6px rgba(0,0,0,.25)}}
  .android{{width:200px;height:150px;border-radius:18px;background:linear-gradient(160deg,#1b2a41,#2f4858);display:flex;align-items:center;justify-content:center;gap:26px}}
  .android img{{width:56px;height:56px;border-radius:50%;display:block;margin:0 auto 6px}} .android img.squircle{{border-radius:38%}}
  .alts figure{{margin:0;text-align:center;font-size:12px;color:#52606d}} .alts img.big{{display:block;margin:0 auto 10px}}
  .alts .mini{{display:inline-flex;gap:8px;align-items:center;justify-content:center;padding:6px 10px;background:#dfe3e8;border-radius:6px;margin-bottom:8px}}
  .alts .mini.d{{background:#202124}} .alts .mini img{{width:16px;height:16px}}
  code{{font:12px ui-monospace,SFMono-Regular,Menlo,monospace;background:#eef1f4;padding:1px 5px;border-radius:4px}}
  .chip{{display:inline-block;width:14px;height:14px;border-radius:4px;vertical-align:-2px;margin-right:4px}}
  .site{{display:inline-block;padding:10px 14px;border-radius:10px;background:#faf6f0;color:#2a211c;border:1px solid #e7dccb;font-family:Georgia,serif}} .site b{{color:#c2553a}}
</style></head><body>
<h1>Favicon: Chad Denie mortgage site</h1>
<p class="sub">Same artwork in two palettes. A white house with a red door on a navy tile (the original), and the same house in the site's own palette from <code>globals.css</code>: terracotta tile, cream house, espresso door. Hand-tuned artwork for 16/32 px; a richer master (chimney, gradient) for 180 px and up. View at 100% zoom to judge the tab renders.</p>
<span class="site">Site palette reference: cream page, <b>terracotta</b> accents, espresso text (Fraunces + DM Sans)</span>
{section(warm, 'Site palette (warm/)', 'Terracotta tile, cream house, espresso door. Matches the landing page being built.',
         chip('#c2553a', 'Terracotta (tile)') + chip('#faf6f0', 'Cream (house)', True) + chip('#2b221d', 'Espresso (door)'))}
{section(navy, 'Original palette (favicon/)', 'Navy tile, white house, red door.',
         chip('#1D3557', 'Navy (tile)') + chip('#FFFFFF', 'White (house)', True) + chip('#D62828', 'Red (door)'))}
<h2>Alternate concepts (SVG only, in <code>alternates/</code>)</h2>
<div class="row alts">
  <figure class="card"><img class="big" src="{ar}" width="128" height="128" alt=""><div class="mini"><img src="{alt_r}" alt=""></div><div class="mini d"><img src="{alt_r}" alt=""></div><br>Canada-red tile, navy door</figure>
  <figure class="card"><img class="big" src="{am}" width="128" height="128" alt=""><div class="mini"><img src="{alt_m}" alt=""></div><div class="mini d"><img src="{alt_m}" alt=""></div><br>"M" monogram with gabled peaks</figure>
</div>
</body></html>'''
open(os.path.join(root, 'preview.html'), 'w').write(html)
print('wrote preview.html', len(html) // 1024, 'KB')
