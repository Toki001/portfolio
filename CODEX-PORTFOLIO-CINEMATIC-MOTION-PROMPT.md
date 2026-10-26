# Codex Prompt — Portfolio Cinematic Motion Upgrade

You are continuing development of my **already completed portfolio redesign**. This is a deliberate **motion-design and interaction-quality upgrade**, NOT permission to rebuild the website or replace its established design system.

## Current project and non-negotiable constraints

- Work inside the **new portfolio checkout**: `/Users/jameskierdoliguez/projects/jameskierdoliguez-portfolio` (inspect and confirm the actual working-directory path before modifying anything). **Do not modify** the separate original `/projects/portfolio` checkout.
- The existing implementation uses **React, TypeScript, Vite, Tailwind CSS 3, and npm**. Preserve it. Do not migrate frameworks or change the package manager.
- Current routes: `/`, `/projects`, `/projects/peso-flow`, `/projects/pokechamp`, `/projects/pixeltools`, `/projects/guest-reco`. Preserve existing functionality, navigation, filter state, deep links and case studies.
- Content is centrally managed in `src/config/site.ts` and `src/content/projects.ts`; inspect before changing. Never invent project descriptions, achievements, team roles, screenshots, ratings, availability, work experience or analytics. GuestReco currently has deliberately limited evidence: keep that honest.
- Established color palette: burgundy `#890620`, slate `#767B91`, white `#FFFFFF`, navy `#011936`, ink `#03191E`. Use dominant clean/light editorial surfaces with strategic dark sections. No random neon colors or wholesale rebrand.
- Last reported baseline: four unit tests, 48 browser tests, nine visual comparisons, zero tested axe violations, and excellent *local lab* Lighthouse results (98–100 for sampled routes). These are **prior reported figures**, not results to assume still pass; reproduce and re-measure.
- Do not push, publish, deploy, or modify a production environment without explicit authorization. Commit each completed milestone locally with a clean, descriptive history.
- Follow existing repository `AGENTS.md`, `codex.md`, and related project requirements. If this prompt differs, honor current functionality, truthful content, accessibility, and performance first; record any deliberate design change.

## REQUIRED FIRST STEP: Study the actual motion references

Explore these five Dribbble links and the provided reference videos before planning or coding:

1. https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations — editorial section choreography, intentional white space, hero/project reveals.
2. https://dribbble.com/shots/19871911-Landing-Designer-portfolio — interactive magnifying glass / refractive lens and fluid gradient atmosphere.
3. https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation — dramatic typography, portrait integration, high-contrast cinematic transitions.
4. https://dribbble.com/shots/27807157-Vadim-Carazan-Portfolio — spatial/3D project field, scroll-travel through work, floating detail panel; interpret as inspiration, not a requirement to reproduce a heavy WebGL installation.
5. https://dribbble.com/shots/27820202-Website-Design-Design-Studio-Portfolio — pixel-grid transitions, floating product-like objects, strong motion hierarchy.

Review local videos under `references/motion/` (the attached pack includes them with descriptive filenames). If the links cannot be opened by your tools, study the provided videos and report which sources you could actually access. The reference clips are for **study only**; never put the third-party videos into production assets, ship them publicly, or copy someone else's identity, portrait, assets, content or layout verbatim.

Use the available `find_skills` capability and plugin-management discovery **if actually exposed** in this Codex environment. Reuse relevant design guidance from `ui-ux-pro-max`, `web-design-guidelines`, `shadcn`, `hallmark`, `apple-design` and `emil-design-eng` where available. Check whether `headless`, `graphify` or `ponytail` can be used; do not claim to invoke tools that are unavailable, and do not waste effort trying to install unrelated tools. Playwright/browser automation, existing project tooling, source inspection and documented design critique are acceptable fallbacks.

Create `docs/design/motion-direction.md` with a *reference-to-effect mapping*, a section-by-section motion storyboard, desktop/mobile interaction notes, risk assessment, and a **prioritized animation inventory**. **Then implement**, not just document.

## Desired creative result

Make the site feel like a **bespoke, high-end interactive developer portfolio**: editorial typography + restrained art direction + precisely choreographed motion + memorable project showcases. It should be dynamic, surprising and immersive while remaining recruiter-friendly and quickly understandable.

Motion must communicate hierarchy and help the visitor discover real work. Avoid generic template-looking fading boxes, endless floating particles, gratuitous parallax, flashy effects on every card, unreadable animated headings, and full-screen scroll hijacking. Aim for a clear motion rhythm: **hero statement → selected work reveal → immersive project showcase → capabilities/about → contact finale**. Some sections can be calm to make the signature scenes matter.

### A. Hero: cinematic editorial opening

- On first visit, perform a **non-blocking editorial intro**: coordinated mask/clip text reveals, tasteful letter/word/line staggering, a subtle background reveal, and a portrait or existing verified visual that settles into place. Do not invent a portrait. The content must be present immediately for assistive technology and SEO.
- Give the developer name and role an expressive typographic treatment (e.g. an outlined-to-solid word, oversized cropping, split-line typography, or a tasteful italic counterpoint), without sacrificing legibility at small widths or zoom.
- Animate one or two **intentional layers** (e.g. backdrop grid, hero asset and subtle decorative type), not every child. Use a purposeful scroll cue.
- Introduce a **subtle cursor-reactive light or refractive lens** on desktop-capable fine-pointer devices, inspired by the supplied designer reference. It should respond smoothly to pointer movement, have a small bounded range, remain behind readable content or in a noninteractive decorative overlay, and never obscure clickable targets. On touch, show a static or scroll-reactive composition instead.
- Create a cinematic hero-to-work transition, such as scale/crop, clip-path wipe, split mask, or cross-section handoff, **without locking normal scroll**.

### B. Selected projects: the main signature interaction

Replace the feeling of a conventional list of cards with a **designed project presentation sequence** while keeping all existing projects discoverable and keyboard accessible.

- Give the homepage selected-work area one major scroll-choreographed feature, such as a short sticky showcase with **three to four project panels** that swap foreground/background and typography in a controlled sequence. Avoid a huge pinned scroll distance.
- For each project, show authentic existing screenshots or device mockups, project name, type, relevant stack/role, a concise truthful one-line outcome and a clear `View case study` link. Prioritize PesoFlow, PokeChamp and PixelTools; represent GuestReco honestly.
- On desktop fine-pointer devices, add a **follow-cursor image or framed preview** for project rows OR a perspective tilting image card (choose the more usable approach); provide meaningful focus/tap equivalents and never make hover the only way to discover content.
- On reveal or transition, use a **coherent shared motif**: card image expansion, cropped media mask, depth translation, staggered project metadata, or a sophisticated foreground/background crossfade. Avoid pure scroll-triggered opacity on all cards.
- Add a **lightweight spatial gallery moment** inspired by Vadim: a short-depth project wall/stack with CSS transforms, perspective and carefully limited parallax; add real Three.js/WebGL ONLY if profiling justifies it and it degrades cleanly. Keep basic HTML project links visible even if any 3D/JS layer fails.
- Provide a small on-screen progress cue (`01 / 04`, bar, or active project label) that accurately reflects the focused project. Project switching must respond to intentional scroll, clicks, keyboard and touch without trapping users.
- Portfolio previews should show *projects as the hero*, not stock abstract art or made-up product imagery.

### C. `/projects`: an interactive, usable project explorer

- Animate project filter changes with FLIP/reflow or similarly stable layout transitions; keep focus location sensible, results count accurate, controls semantic and URL/navigation behavior intact.
- Give cards an expressive hover/focus state: image zoom/mask change, rotating arrow, title lift, secondary info reveal, or cursor preview, using a consistent system rather than random effects.
- On card activation, create an elegant transition to the project detail page when technically feasible, but **never block navigation, browser back/forward, deep-link refresh, or reduced-motion mode**.
- Provide responsive grid-to-list or alternate layout control only if it is genuinely useful and fully functional, not decorative. Ensure media never jumps or shifts layout.

### D. Project case-study pages: cinematic product storytelling

On `/projects/peso-flow`, `/projects/pokechamp`, `/projects/pixeltools` and `/projects/guest-reco`:

- Use a consistent page-entry animation: text clip/mask reveal, anchored project cover appearance, and lightweight metadata staging.
- Add thoughtfully animated **real media galleries**: click/tap carousel or image viewer; keyboard operable with obvious next/previous and appropriate focus management; preserved captions and meaningful alt text.
- For substantive case studies, alternate clear editorial text modules with media-driven transitions. Consider pinning a device screenshot for a limited segment while features advance, *only where actual project assets and content support it*.
- Animate section transitions using scale, reveal masks, or inset media movement; keep code examples, evidence, and explanatory text immediately readable.
- Include graceful transitions to the next project and an accessible back-to-projects path.
- GuestReco must remain a limited, candid project note; no fake gallery, invented screen recordings or unsupported claims.

### E. About, skills, contact and site-wide motion language

- Treat section headers as *art-directed typography*, with subtle scrolling marquees or oversized background type where appropriate. Avoid moving important text indefinitely.
- Let tech stack/capabilities categories have responsive interactive rows or expandable panels with purposeful motion; show real skills and verified tools only.
- Add a cohesive timeline or visual rhythm for the About section if existing content warrants it; never invent milestones or numbers.
- Enhance header state transitions (transparent → subtle solid, active nav indication, mobile menu choreography). Make the mobile menu robust and accessible.
- Add one restrained **pixel-grid transition** between selected dark/light sections, inspired by the studio portfolio reference. This should be a locally scoped layer effect, not a permanent animated pixel background.
- For final contact, create a memorable typography-led call to action with understated pointer motion and a satisfying but accessible copy-email confirmation. Existing email/clipboard actions must keep working, including error states.
- Add small, elegant microinteractions: magnetic-like CTA offset (fine-pointer only), tactile button press, icon arrow travel, underline draw, social-link underline, focus-visible highlight and return-to-top transition. Keep pointer effects shallow and respect reduced motion.

## Motion design system — actual specifications, not random defaults

Create shared tokens/utilities and document them. Suggested ranges (adjust to visual review and tests):

- Microfeedback: ~120–240 ms.
- Hover and filter transitions: ~180–400 ms.
- Section reveals: ~450–850 ms.
- Major hero/project transition: ~700–1200 ms only when it feels fluid and does not delay access.
- Word/line staggering: ~35–100 ms increments, capped so text never feels tedious.
- Favor `transform` and `opacity`; use clip paths and filters with care and profile their costs. Choose a consistent easing vocabulary, e.g. soft ease-out for reveals, controlled ease-in-out for scene transitions, spring-like ease for small cursor responses.
- Use `IntersectionObserver`, existing animation dependencies, CSS animations, or a well-justified small motion library; inspect the stack first. If adopting Motion or GSAP, justify bundle impact, avoid overlapping animation owners, clean up effects correctly, and code-split heavy features. No dependency pile-up.
- Animate with stable measured states and cleanup on route changes. Avoid hydration-like flash (even in Vite SPA), sticky jitter, content jumps, high-frequency React state updates from pointer movement, cumulative transform bugs and memory leaks.
- Important: **no autoplay audio, no forced full-page loading screen, no fake loading, no scroll-jacking, no horizontal overflow, no excessive 3D that makes projects hard to access**.

## Responsive/accessibility/performance requirements

- Mobile is not a shrunk desktop. Create tailored sequences: simplified hero motion, tap-first project explorer, shorter/zero sticky segments, no hover-only content, no viewport-escaping typography and reliable mobile navigation. Test both portrait and landscape.
- Honor `prefers-reduced-motion: reduce`: remove spatial travel, looping gradient movement, cursor lens and pinned choreography where necessary; use instant state changes or brief opacity changes. All content and interactions must remain available.
- Respect keyboard navigation, visible focus, semantics, scroll position, screen-reader reading order, text contrast, touch targets and WCAG-oriented accessibility practices. Native browser 200% zoom must remain usable.
- Preserve meaningful text and links in real DOM; do not turn hero or project content into canvas-only experiences. Existing no-JavaScript content behavior should not regress.
- Avoid unnecessary media payload and heavyweight canvas loops. Lazy-load below-fold media, use optimized images/responsive sources where sensible, pause offscreen work, respect tab visibility, and cap device pixel ratio for optional effects.
- Treat prior Lighthouse results as *baselines to measure*, not guaranteed outputs. Aim to retain strong mobile performance (prefer 90+ lab score), LCP near/below 2.5 s where conditions allow, CLS below 0.1, and low TBT. If a signature effect seriously damages performance, simplify it before accepting the result. Document results and differences instead of claiming exact results without measurements.

## Execution plan — commit after each milestone

**Milestone 09 — Motion research and baseline:** inspect actual code, animations, routes and media; watch reference videos; review linked inspiration; reproduce existing tests and Lighthouse baseline; create `docs/design/motion-direction.md`, visual storyboard, dependency decision and performance budget. Commit research/docs.

**Milestone 10 — Animation foundations:** establish motion primitives/tokens, responsive/reduced-motion handling, navigation transitions and safe scroll/observer mechanisms. Test and commit.

**Milestone 11 — Cinematic hero and section handoff:** implement premium hero sequence, responsive visual atmosphere, optional lens and hero-to-work transitions. Capture desktop/mobile videos, visually critique, test and commit.

**Milestone 12 — Signature project showcase and explorer:** build homepage immersive featured-work scene, spatial gallery where justified, accessible interaction equivalents, animated `/projects` filters/previews. Verify existing data and routes; test and commit.

**Milestone 13 — Case study storytelling and global polish:** improve each case-study presentation, actual media interactions, About/skills/contact choreography, pixel-grid transition and meaningful microinteractions. Verify all links and interactions, test and commit.

**Milestone 14 — Full verification and handoff:** rerun fresh `npm ci`, format, lint, TypeScript/typecheck, build, unit/e2e, accessibility, no-JS, SEO and responsive suites; expand Playwright tests for new motion and fallback states. Capture real screen recordings (desktop + mobile), visual comparisons and Lighthouse before/after. Fix issues, document tradeoffs, commit. **Do not deploy or push.**

## Acceptance criteria — the upgrade is incomplete unless these pass

1. All six routes work by direct URL refresh, navigation and browser back/forward; project content remains truthful and findable.
2. The homepage has **at least three noticeably different, reference-informed signature motion experiences** (for example: editorial hero reveal, interactive lens, project-scene choreography), plus selective, restrained microinteractions elsewhere.
3. Project presentation is substantially more cinematic than the current basic grid **and** remains usable through keyboard/tap without hover or animation.
4. Motion works smoothly at desktop, tablet and mobile sizes; test at the ten previously required viewport widths, landscape touch and native 200% zoom.
5. `prefers-reduced-motion`, no-JavaScript output, keyboard focus, screen-reader content order, zoom, semantic controls and axe audits remain acceptable. No console errors or broken assets.
6. Current functionality remains intact: filters, route links, real media, copy email, mailto actions, SEO metadata, sitemap/robots/schema and existing tests.
7. Capture a **before-and-after screen recording** demonstrating the actual movement of the hero, featured work, filter changes, project detail and mobile interactions. Static screenshots alone cannot validate motion.
8. Provide performance comparison and honest regression analysis; do not claim baseline Lighthouse scores still hold without rerunning.
9. Commit each milestone. Leave working tree clean. Do not modify original checkout or deploy/push.
10. In the final report include what changed, effect-by-effect reference attribution, changed files, added libraries, screenshots/video evidence paths, tests, measured performance, remaining caveats and the six local commit hashes.

Start now with Milestone 09. Do not stop at a written proposal: **implement through Milestone 14, continuously test, critique the design against the videos, and refine weak results**. Prioritize working, high-quality interaction over implementing every novelty for its own sake.
