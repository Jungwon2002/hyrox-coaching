#!/usr/bin/env python3
"""
Rebuilds tools/mobile-preview.html — the phone preview published as an Artifact.

It reads site/*.html and site/style.css directly, so the preview can never drift
from the real site. Run it after any visual change, then republish the artifact.

    python3 tools/build-mobile-preview.py

Artifacts are served under a strict CSP that blocks every external host, so the
webfonts and the hero video cannot be linked. Instead this script:
  - subsets each typeface to only the glyphs the site actually uses and inlines
    it as a base64 @font-face (Anton, Gothic A1 and Oswald via the Google Fonts
    text= API; Pretendard subset locally with fontTools)
  - swaps the <video> for a still frame pulled out of training.mp4
"""

import base64
import html
import io
import json
import re
import subprocess
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
OUT = ROOT / "tools" / "mobile-preview.html"

PAGES = [
    ("index", "index.html", "홈 · Home"),
    ("program", "program.html", "4주 프로그램 · Programme"),
    ("coaching", "coaching.html", "1:1 코칭 · Coaching"),
]

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode("utf-8")


# ---------------------------------------------------------------- page content

def body_of(path):
    """Inner HTML of <body>, with the script tag dropped."""
    src = path.read_text(encoding="utf-8")
    body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
    return re.sub(r'<script src="script\.js"></script>', "", body).strip()


def visible_text(markup):
    txt = re.sub(r"<[^>]+>", " ", markup)
    return html.unescape(txt)


def poster_data_uri():
    """First frame of the hero video, as a JPEG data URI."""
    tmp = ROOT / "tools" / ".poster"
    tmp.mkdir(exist_ok=True)
    png = tmp / "training.mp4.png"
    if not png.exists():
        subprocess.run(
            ["qlmanage", "-t", "-s", "820", "-o", str(tmp),
             str(SITE / "assets" / "training.mp4")],
            check=True, capture_output=True)
    jpg = tmp / "poster.jpg"
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "62",
         str(png), "--out", str(jpg)],
        check=True, capture_output=True)
    b64 = base64.b64encode(jpg.read_bytes()).decode()
    return "data:image/jpeg;base64," + b64


# --------------------------------------------------------------------- fonts

def google_subset(family, weights, text):
    """@font-face CSS for a Google family, subset to `text`, base64 inlined."""
    fam = family.replace(" ", "+")
    spec = f"{fam}:wght@{';'.join(str(w) for w in weights)}" if weights else fam
    url = ("https://fonts.googleapis.com/css2?family=" + spec
           + "&text=" + urllib.parse.quote("".join(sorted(set(text)))))
    css = fetch(url)
    out = []
    for block in re.findall(r"@font-face\s*\{[^}]*\}", css):
        weight = re.search(r"font-weight:\s*([^;]+);", block)
        src = re.search(r"url\((https://[^)]+)\)", block)
        if not src:
            continue
        b64 = base64.b64encode(fetch(src.group(1), binary=True)).decode()
        out.append(
            "@font-face{font-family:'%s';font-style:normal;font-weight:%s;"
            "font-display:block;src:url(data:font/woff2;base64,%s) format('woff2')}"
            % (family, weight.group(1).strip() if weight else "400", b64))
    return "".join(out)


def pretendard_subset(text):
    """Pretendard Variable, subset locally — Google doesn't host it."""
    from fontTools import subset
    from fontTools.ttLib import TTFont

    cache = ROOT / "tools" / ".poster" / "PretendardVariable.woff2"
    if not cache.exists():
        cache.parent.mkdir(exist_ok=True)
        cache.write_bytes(fetch(
            "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages"
            "/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
            binary=True))

    font = TTFont(io.BytesIO(cache.read_bytes()))
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.drop_tables = []
    sub = subset.Subsetter(options=opts)
    sub.populate(text="".join(sorted(set(text))))
    sub.subset(font)

    buf = io.BytesIO()
    font.flavor = "woff2"
    font.save(buf)
    b64 = base64.b64encode(buf.getvalue()).decode()
    return ("@font-face{font-family:'Pretendard Variable';font-style:normal;"
            "font-weight:45 920;font-display:block;"
            "src:url(data:font/woff2;base64,%s) format('woff2-variations')}" % b64)


# ---------------------------------------------------------------------- build

def main():
    style = (SITE / "style.css").read_text(encoding="utf-8")
    bodies, all_text = {}, []

    for key, filename, _label in PAGES:
        markup = body_of(SITE / filename)
        if key == "index":
            markup = re.sub(
                r"<video class=\"hero-dark__video\".*?</video>",
                '<img class="hero-dark__video" alt="트레이닝 영상 스틸 프레임" '
                'src="%s">' % poster_data_uri(),
                markup, flags=re.S)
        bodies[key] = markup
        all_text.append(visible_text(markup))

    text_all = "".join(all_text)
    ascii_text = "".join(sorted({c for c in text_all if 32 <= ord(c) < 127}))

    src = (SITE / "index.html").read_text(encoding="utf-8")
    hero_kr = " ".join(re.findall(
        r'class="hero-dark__(?:kicker|kr)[^"]*">(.*?)</p>', src, re.S))

    print("subsetting fonts…", file=sys.stderr)
    fonts = "".join([
        google_subset("Anton", [], ascii_text),
        google_subset("Oswald", [500, 600, 700], ascii_text),
        google_subset("Gothic A1", [700, 900], visible_text(hero_kr) + ascii_text),
        pretendard_subset(text_all),
    ])

    payload = {
        "fonts": fonts,
        "css": style,
        "pages": {k: v for k, v in bodies.items()},
        "built": datetime.now().strftime("%Y-%m-%d %H:%M"),
    }

    # ensure_ascii keeps the payload pure ASCII (\uXXXX), so the Korean survives
    # whatever charset the host serves; "</" would close the <script> early
    blob = json.dumps(payload, ensure_ascii=True).replace("</", "<\\/")

    template = (ROOT / "tools" / "preview-template.html").read_text(encoding="utf-8")
    page = template.replace("/*__PAYLOAD__*/ null", blob)

    # the artifact wrapper owns <head>, so this file cannot declare its own
    # charset — emit pure ASCII (numeric entities in markup, \uXXXX in the
    # payload) and the Korean survives regardless of what the host sends
    page = page.encode("ascii", "xmlcharrefreplace").decode("ascii")

    OUT.write_text(page, encoding="ascii")
    print(f"wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size/1024:.0f} KB)")


if __name__ == "__main__":
    main()











