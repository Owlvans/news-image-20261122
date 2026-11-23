# The World in One Day — Sunday 22 November 2026

[![make.fun bounty](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/owlvans/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/owlvans/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

An entry for the make.fun bounty [news-image-20261122](https://make.fun/bounty/news-image-20261122): sum up one day of world news — Sunday 22 November 2026 — in a single image.

The image is a hand-built newspaper front page: 26 stories from that Sunday (3 lead stories, 10 cards, 13 briefs), a large world map with a numbered pin for every story that has a place, a labelled band of the Saturday events behind Sunday's headlines, and a date check on every item. Each story was verified against a dated original source from that Sunday before it earned its place.

## How it works

- `page.html` — the front page itself: hand-written HTML/SVG, no external assets.
- `render.sh` — renders `page.html` to `entry.png` (1024×1024) with headless Chrome.
- `entry.png` — the rendered front page, byte-identical on every render.
- `main.ts` — the entry program: copies `entry.png` to `/output/entry.png` (or `$MAKEFUN_OUTPUT_DIR`), then verifies the copy's size, PNG signature, dimensions and the 1 MiB cap.

Run it with:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
