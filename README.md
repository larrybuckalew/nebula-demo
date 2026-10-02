# NEBULA — Beyond Reality

An immersive, abstract-luxury 3D landing built for a **wow-in-5-seconds** client demo. Scroll-driven cinematic journey + interactive islands, crafted with code-generated geometry — no custom modelling required.

**Live:** https://larrybuckalew.github.io/nebula-demo/

> Companion demos: [hero3d-landing](https://larrybuckalew.github.io/hero3d-landing/) · [grand-planetarium](https://larrybuckalew.github.io/grand-planetarium/) · [living-planet](https://larrybuckalew.github.io/living-planet/)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build (type-checks)
npm run preview    # serve dist/
npm run typecheck  # tsc --noEmit
```

## Deploying to GitHub Pages

Push to `main` and `.github/workflows/deploy.yml` handles the rest: type-check → build → publish `dist/` to Pages. Also runs on PRs so broken builds are caught early.

**One-time setup** — Pages must be enabled on the repo and set to build with
GitHub Actions, or the workflow fails at `configure-pages` with a 404 and the
site never publishes:

```bash
gh api --method POST repos/larrybuckalew/nebula-demo/pages -f build_type=workflow
```

Verify with `gh api repos/larrybuckalew/nebula-demo/pages` — it should report
`"build_type": "workflow"`. If a deploy fails after this, re-run it:
`gh run rerun <run-id> --repo larrybuckalew/nebula-demo`.

Key details:

- **`base: "/nebula-demo/"`** in `vite.config.ts` — assets resolve under the repo sub-path on Pages (override by removing `base` for a custom domain at root). Every absolute URL in `index.html` (the favicon) must carry the same prefix.
- **`dist/`** is the Pages artifact (Vite default). No SSR, no image optimizer — purely static.

## Where things live

```
src/
  App.tsx                 # progress + parallax + shell
  main.tsx  index.css     # entry + Tailwind + tokens
  lib/scrollTimeline.ts   # 7 camera keyframes + sampling
  hooks/useScrollProgress.ts # GSAP ScrollTrigger → 0..1 progress
  canvas/
    Scene.tsx             # <Canvas> + adaptive DPR + postprocessing guard
    CameraRig.tsx         # lerps camera on scrollTimeline
    Lighting.tsx          # lights + fog
    Monoliths.tsx         # 3 floating glass monoliths (hover island #1)
    MorphBlob.tsx         # transmission sphere (drag + click island #2)
    Particles.tsx         # 2.4k points (grid condense + cursor trail island #3)
  components/
    Overlay.tsx           # 7 scroll chapters (HTML over Canvas)
    Nav.tsx               # progress bar + dots
    Loader.tsx            # branded spinner
public/
  favicon.svg              # app icon (linked from index.html)
  icons.svg                # inline SVG sprite used by the overlay
```

## How the 3D works

- **One fixed Canvas, no pointer capture** — HTML overlay stays selectable/scrollable; parallax reads `window.pointermove` directly.
- **CameraRig** samples `scrollTimeline` keyframes and damps toward them each frame.
- **Particles** drift subtly; condense into a grid in the Numbers chapter; trail cursor in Contact.
- **Postprocessing** (Bloom + Vignette) disabled on mobile for perf.
- **Performance:** `PerformanceMonitor` + `AdaptiveDpr`; particle count drops on mobile; `prefers-reduced-motion` disables parallax/motion.

## Tweaking

| Want to change | Edit |
|---|---|
| Camera path | `src/lib/scrollTimeline.ts` `keyframes` |
| Particle count / color | `src/canvas/Particles.tsx` |
| Monolith / torus material | `src/canvas/Monoliths.tsx` |
| Blob materials | `src/canvas/MorphBlob.tsx` `mats` |
| Copy / chapters | `src/components/Overlay.tsx` |
| Theme (bg/accent/gold) | `src/index.css` `:root` tokens + `tailwind.config.js` |
| Sub-path for Pages | `vite.config.ts` `base` |

## Re-skin guide

Search `NEBULA` / `#3b82f6` / `#d4af37` / `#07070a` → replace brand, accent, and background. Copy lives in `Overlay.tsx`; keyframes in `scrollTimeline.ts`; tokens in `index.css`. Under 30 minutes for a new client.

## QA

- `npm run build` passes; `npm run typecheck` clean.
- Scroll scrub smooth; 3 interactive islands respond; loader clears quickly; reduced-motion verified in DevTools.

## SEO

Title, description, canonical and Open Graph/Twitter tags in `index.html`. The
`og:image` points at the hub's project thumbnail — swap it for a dedicated
1200x630 card if this gets shared standalone, and add JSON-LD (`WebApplication`
or `SoftwareApplication`) if you want rich results.

## License

MIT — see `LICENSE`.
