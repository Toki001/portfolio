# Milestone 03 — editorial identity

Implemented oversized two-line real identity, owned grayscale portrait within burgundy aperture, role/positioning, working work/contact/about anchors, intro reveal, reading-progress transform and reusable once-only WAAPI section reveals. Kept content visible by default. No lens dependency or live blur capture: bounded typographic/portrait choreography carries the hero without an extra pointer effect.

Paths: src/components/portfolio/Hero.tsx, src/hooks/useEditorialMotion.ts, src/hero.css, src/App.tsx, main.tsx, fonts/index head, tests/hero.spec.ts. Corrected Google Fonts download: initial generic user agent returned a static weight; visual review caught all-heavy type. Downloaded verified 100–900 variable WOFF2 subset using modern UA, 34,928 bytes, OFL retained. This supersedes M2 font description.

Executed: lint/build/SEO PASS. Foundation browser suite after hero change: 12/12 PASS. Hero suite final: 2/2 PASS including 320px reduced motion and no JS; visible CTA at 1280×800; scoped axe zero violations. Initial axe caught an unnecessary aria-label mismatch and scanned during fading text; removed mismatched label and awaited actual animation completion before settled-state axe scan. No rules disabled.

Screenshots m3-{320,390,768,1440,1920}.png captured after fonts/animations settle; desktop/mobile manually inspected. No clipped heading or blocked CTA. Intro uses transform/opacity, 60ms line stagger, no blocking loader; progress avoids React state per frame. Measurements are build/browser proxies only, not a claimed 60fps or field INP. Source-read Apple/Emil guidance applied. Full page palette/content below hero remains staged until M4/M6. No deploy.

Commit: introducing commit of this record.
