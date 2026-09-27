# Ospra

Traceable, unified data layer for battery manufacturers: a digital identity per
battery that connects the production floor to the battery's field lifecycle.

- `design-system/` — the Ospra deck & social design system (tokens, guide,
  specimen). Base for all decks and social posts.
- `deck/project/` — source for the pitch deck (`deck.json` index plus one HTML
  file per slide), built on the design system.
- `video/` — the Ospra brand film (about 66 s, 1920×1080, silent, loops).
  - `ospra-film.html` is the source animation. Opened directly, it plays live
    and loops, scaled to the window. Fonts are self-hosted in `video/fonts/`.
  - `render.js` renders it frame by frame to `dist/ospra-film.mp4`:
    `FFMPEG=/path/to/ffmpeg node render.js 30 dist`.
  - Website hero embed:

    ```html
    <video autoplay muted loop playsinline preload="auto" poster="ospra-poster.jpg">
      <source src="ospra-film.webm" type="video/webm">
      <source src="ospra-film.mp4" type="video/mp4">
    </video>
    ```
