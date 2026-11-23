#!/bin/sh
# Render entry.png from page.html (1024x1024) with headless Chrome.
# The image is a hand-built HTML/SVG newspaper front page; entry.png is its
# pixel-exact screenshot, and main.ts copies those bytes to /output/entry.png.
CHROME="${CHROME:-chrome-headless-shell}"
"$CHROME" --headless --disable-gpu --no-sandbox \
  --screenshot="$PWD/entry.png" --window-size=1024,1024 --hide-scrollbars \
  "file://$PWD/page.html"
