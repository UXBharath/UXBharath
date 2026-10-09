#!/usr/bin/env python3
"""Bundle the site into ONE self-contained HTML file (CSS, JS and images inlined).

Usage:   python3 tools/build-single-file.py [output.html]
Default: dist/portfolio-single-file.html

Python 3 standard library only. The project folder is the source of truth:
change the files in the folder, then rebuild the single file, never the other way round.
The favicon link is left out of the single file.
"""
import base64, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else root / "dist" / "portfolio-single-file.html"
html = (root / "index.html").read_text(encoding="utf-8")


def body(path, drop_trailing_newline=False):
    """File text without its two-line header comment."""
    text = (root / path).read_text(encoding="utf-8").split("\n", 2)[2]
    return text[:-1] if drop_trailing_newline and text.endswith("\n") else text


# 1. CSS: the run of stylesheet links becomes one <style> block, in the same order
css_run = re.compile(r'(?:<link rel="stylesheet" href="assets/css/[^"]+">\n)*<link rel="stylesheet" href="assets/css/[^"]+">')
m = css_run.search(html)
files = re.findall(r'href="(assets/css/[^"]+)"', m.group(0))
html = html.replace(m.group(0), "<style>" + "".join(body(f) for f in files) + "</style>")

# 2. JavaScript: the run of script tags becomes one inline <script>, in the same order
js_run = re.compile(r'(?:<script src="assets/js/[^"]+"></script>\n)*<script src="assets/js/[^"]+"></script>')
m = js_run.search(html)
files = re.findall(r'src="(assets/js/[^"]+)"', m.group(0))
html = html.replace(m.group(0), "<script>" + "\n".join(body(f, True) for f in files) + "</script>")

# 3. Images: src="assets/img/x.jpg" becomes a data URI
mime = {"jpg": "jpeg", "jpeg": "jpeg", "png": "png", "webp": "webp"}
def inline_image(match):
    p = root / match.group(1)
    return 'src="data:image/%s;base64,%s"' % (mime[p.suffix[1:].lower()], base64.b64encode(p.read_bytes()).decode())
html = re.sub(r'src="(assets/img/[^"]+\.(?:jpg|jpeg|png|webp))"', inline_image, html)

# 4. Favicon link is omitted from the single file
html = re.sub(r'\n<link rel="icon" href="assets/img/favicon\.svg" type="image/svg\+xml">', "", html)

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding="utf-8")
print("Wrote %s (%d KB)" % (out, len(html.encode("utf-8")) // 1024))
