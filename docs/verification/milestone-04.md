# Milestone 04 — featured work and exploration

Implemented three verified project spreads with distinct media arrangements, keyboard/touch-equivalent linked cards, native scroll, staged once-only reveals, /projects explorer with functional categories, query/history/reload support and honest GuestReco project note. Preserved old project hashes including #guest-reco. Added minimal real detail routes now so every featured link works; M5 expands them.

Replaced unrelated PokeChamp database-dashboard thumbnail with capture of actual owned local team builder (sample selection only, no Save/auth request). Added three owned PesoFlow golden captures with explicit fixture captions. PixelTools real screenshot retained. No third-party reference media published, metrics or deployed counters. Media sources and limitations: docs/design/media-provenance.md.

Paths: src/components/portfolio/{Projects,ProjectArtwork,ProjectExplorer,ProjectPage,NotFound}.tsx, content/projects.ts, work.css, App/entry-server/main, scripts/{prerender,seo,check-seo}.mjs, Vite head markers, public/projects/, tests/projects.spec.ts.

Executed: lint/build/SEO PASS; static output has six real pages + noindex 404, unique titles/canonicals and crawlable project text. Foundation suite 12/12 PASS. Project suite final 3/3 PASS: matching detail navigation, all category/history/reload states, touch interaction and full filtered-page axe zero violations. Initial touch axe caught artwork caption/ARIA-label conflict; fixed by text-content destination names and decorative redundant linked thumbnails (standalone media retains alt/captions). No axe rules disabled.

Screenshots: m4-work-{390,768,1440}.png and m4-index-{390,768,1440}.png. Desktop/mobile work compositions visually inspected. No scroll locking, hidden interaction requirement or generic image filler. Known: Vite preview fallback returns 200 for unknown routes; M5 replaces preview with true static HTTP status behavior; Vercel static 404 output already exists. Detailed gallery/architecture follows in M5; external live link reachability not yet confirmed. No deployment/push.

Commit: introducing commit of this record.
