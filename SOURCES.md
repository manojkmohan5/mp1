# Sources

CS 409 MP1 requires that every source referenced while building this page be
declared. This is that declaration.

The page is an **unofficial fan work** and is not approved or endorsed by
CD PROJEKT RED. It is non-commercial student coursework.

## Code

All HTML, SCSS and JavaScript in `src/` was written by hand for this
assignment. No CSS or JS framework, library or template is used — no
Bootstrap, no jQuery, no React, no carousel or modal plugin. The only
third-party code in the repository is the build toolchain that shipped with
the course template (`webpack.config.js`, `package.json`).

Reference material consulted for technique (read, not copied):

- MDN Web Docs — `IntersectionObserver`, `scroll-behavior`, `scroll-padding`,
  `background-attachment`, `aspect-ratio`, CSS custom properties,
  `prefers-reduced-motion`. <https://developer.mozilla.org/>
- Sass documentation — `@use`, `@forward`, modules, maps.
  <https://sass-lang.com/documentation/>
- WAI-ARIA Authoring Practices — dialog (modal) pattern and carousel pattern,
  for the focus-trap and `aria-live` behaviour.
  <https://www.w3.org/WAI/ARIA/apg/patterns/>
- WCAG 2.1 Level AA success criteria, for contrast, focus visibility, error
  identification and motion.  <https://www.w3.org/TR/WCAG21/>

## Text

Factual claims about The Witcher IV come from:

- CD PROJEKT RED press release, "The Witcher IV Revealed at The Game Awards".
  <https://press.cdprojektred.com/en/news/1702/the-witcher-iv-revealed-at-the-game-awards>
- Official product page. <https://www.thewitcher.com/us/en/witcher4>
- Wikipedia, "The Witcher IV". <https://en.wikipedia.org/wiki/The_Witcher_IV>
- PCGamesN, The Witcher 4 news hub.
  <https://www.pcgamesn.com/the-witcher-4/the-witcher-4-release-date-system-requirements-news-trailer-story-everything-we-know>
- GamesRadar+, The Witcher 4 guide.
  <https://www.gamesradar.com/games/the-witcher/the-witcher-4-guide/>

All prose on the page was written by me from those facts.

## Images

Ten screenshots and wallpapers published by CD PROJEKT RED on its public CDN
(`public.cdn.cdpr.app`), linked from the official product page. Downloaded,
resized and re-compressed with ffmpeg for the web; no other alteration.

| File in `src/assets/img/` | Original |
| --- | --- |
| `hero-bg.jpg` | Witcher IV Wallpaper 01 (bottom cropped) |
| `world-bg.jpg`, `gallery-kovir-vista.jpg` | UE5 tech demo — Ciri, Kovir Vista |
| `saga-ciri.jpg` | UE5 tech demo — Ciri 1 |
| `gallery-ciri-2.jpg`, `card-ciri.jpg` | UE5 tech demo — Ciri 2 |
| `gallery-forest.jpg`, `card-forest.jpg` | UE5 tech demo — Forest |
| `gallery-manticore.jpg`, `card-manticore.jpg` | UE5 tech demo — Manticore |
| `gallery-market.jpg`, `card-market.jpg` | UE5 tech demo — Market |
| `gallery-village.jpg`, `card-village.jpg` | UE5 tech demo — Village |
| `card-kelpie.jpg` | UE5 tech demo — Kelpie |

© CD PROJEKT S.A. Used non-commercially under the CD PROJEKT RED Fan Content
Guidelines, which permit community websites and fan pages and the use of game
screenshots, subject to the disclaimer shown in the page footer.
<https://www.cdprojektred.com/en/fan-content>

The CD PROJEKT RED Press Center was **not** used; its terms of service limit
accounts to journalists and business partners.

## Video

`src/assets/video/witcher4-reel.mp4` is not a CD PROJEKT RED trailer. It is a
25-second silent montage I composed myself with ffmpeg: six of the stills
above, each given a slow pan or push-in, cross-faded together. It has no audio
track, so no captions are required. `video-poster.jpg` is a frame from it.

## Fonts and icons

- **Cinzel** (display) and **Inter** (body), Google Fonts, SIL Open Font
  License 1.1. Self-hosted as variable `.woff2` in `src/assets/fonts/`; no CDN
  request is made at runtime.
- **Font Awesome Free 6.7.2** — icon webfonts `fa-solid-900.woff2` and
  `fa-brands-400.woff2`, self-hosted. Fonts under SIL OFL 1.1, icons under
  CC BY 4.0. The icon CSS in `_base.scss` is my own; only the font files and
  glyph codepoints come from Font Awesome. <https://fontawesome.com/license/free>

## Large language model use

See `llm_logs.csv`.
