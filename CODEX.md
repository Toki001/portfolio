# CODEX.md — Portfolio Toki20 | Editorial Motion Portfolio Redesign

> **Purpose:** Repository-level delivery specification for renovating the existing personal developer portfolio at `https://portfolio-toki20.vercel.app`. This is an **evolution of the existing application**, not permission to replace the project blindly. Keep real content, working routes, links, deployment configuration, and useful code intact unless evidence justifies changes.
>
> **Read together with:** `START-CODEX-PROMPT.md`. If `AGENTS.md` is present, it points here. Date of brief: 2026-10-24.

## 1. Product intent and boundaries

Build a distinctive, polished, highly responsive **software developer / product engineer portfolio** that makes visitors want to explore real work and contact its owner. It must communicate engineering depth, visual quality, systems thinking, and credible proof of delivery. Visual references come from editorial designers and photography portfolios, but **the portfolio must not present the owner as a photographer/agency or claim their results, awards, or statistics**.

Desired personality: **editorial, confident, experimental but readable, interactive but fast, premium but human**. Avoid look-alike templates and generic AI aesthetics. The user wants *many* thoughtfully coordinated animations, not a cluttered or GPU-expensive novelty demo.

User-preferred existing direction: **light mode only**. Implement white/light backgrounds as the primary visual experience with carefully composed navy/ink sections. Do not add a separate dark-mode toggle without a new user request. Use the new five-color palette below, not the orange/yellow/purple accents visible in inspiration media.

The live URL may require Vercel authentication from some environments. **Never infer the existing repository architecture from the URL alone**: inspect locally and record what actually exists. Do not attempt to bypass access controls.

### Non-negotiable constraints

- Maintain the existing framework/router/package manager/build tooling unless a documented, necessary change is approved. Inspect first; suggestions for Next.js apply **only if Next.js is already used**.
- Preserve the original owner's identity and existing approved bio, projects, real links, and contact mechanisms. `config/site.ts` should be the editable source of truth if present; otherwise introduce an equivalent **without duplicating data**.
- Don't create fake employers, clients, metrics, awards, endorsements, personal photo, years of experience, project URLs, or reviews. If data is missing, mark it `TODO` in non-rendered content and hide unsupported UI instead of showing invented facts.
- Don't copy third-party reference people, photographs, logos, mockups, or design code into the public result. Reference files are for **visual analysis only**.
- Real interactions only: links, cards, tabs, filters, dialogs, navigation, media, contact flows, and animations must work. No decorative controls that pretend to do something.
- Preserve SEO-relevant URLs when possible. If a slug must change, add a verifiable redirect; never silently break external inbound links.
- Don't read/commit secrets, deploy production or change domain/DNS/analytics ownership without explicit permission. Don't install unsigned/untrusted plugins indiscriminately; review publisher, scopes, license, and tool access.
- Commit a tested checkpoint at the end of **every one of the eight milestones**; never claim a test passed unless executed.

## 2. Attached inspiration: what to use and what to avoid

Reference files should be placed at `references/portfolio-redesign/` (see manifest). They are **not website assets**.

| Reference | Borrow | Do NOT borrow |
|---|---|---|
| `editorial-laptop.webp` | Oversized thin display type, negative space, image-led hero, controlled asymmetry, understated navigation, ghost/outline typography | Literal laptop/face assets, the reference identity, inaccessible type overlays |
| `visual-poetry.webp` | Dramatic black/white typography, rounded image masks, layered compositions, strong section changes, thin line details | Yellow/orange identity, photography-specific claims, exact arrangement |
| `designer-profile.webp` | Kinetic typography, large section labels, intentional grid breaks, oversized contact CTA, portfolio-as-editorial-spread | Its specific portrait, metrics, brand name, orange/red photo treatment |
| `motion-light.mp4` | Clean landing page, portrait/case-study transitions, project browser cards, restrained hover interactions, project details | The person shown, screenshots pretending to be the user's work |
| `motion-prism.mp4` | Immersive navy/dark gradient stage, cinematic typography, optical cursor-lens movement, transition into a layered projects showcase | Yellow text, constant heavy blur/Chromatic effects, visually confusing motion |

Design an original synthesis, not a pixel-perfect clone. Interpret inspiration through **real engineering projects**, product screenshots, architecture snippets, repository evidence and concise case studies. Write `docs/design/reference-analysis.md` to explain the transformation and protect originality.

## 3. Brand and visual system

### Exact approved five-color palette

| Token | HEX | Recommended role |
|---|---|---|
| `--brand-burgundy` | `#890620` | Primary CTA, focused accents, numbering, selection rules, restrained high-emphasis states |
| `--brand-slate` | `#767B91` | Decorative metadata, large text, borders, subdued visual details (check contrast before body text) |
| `--brand-white` | `#FFFFFF` | Main canvas, breathable editorial content surfaces |
| `--brand-navy` | `#011936` | Architectural dark sections, deep title treatments, project-feature canvas |
| `--brand-ink` | `#03191E` | Primary text, highest-contrast borders, dense footer |

Generate subtle tints using these hues and white (e.g. CSS `color-mix`) for fills and borders; don't introduce a sixth unrelated brand accent. Natural colors **inside legitimate project screenshots** are exempt. Never set small body text in `#767B91` on white without adjusting the token: its approximate contrast is only **4.19:1**, below the WCAG AA 4.5:1 text target. Burgundy on white and white on burgundy are both high contrast; burgundy text on ink is **not**.

Use a small set of well-managed design tokens for spacing, fluid typography, strokes, elevation, corner treatment, z-index, focus states, and motion. Proposed direction:

- **Typography:** an expressive but readable sans such as Archivo for headline/body, combined with Instrument Serif italic **sparingly** for one short emphasized word; verify fonts/license and optimize with framework-native loading. The final choice must be justified after applying design skills. Use huge responsive editorial headings where space allows, with line breaks authored intentionally.
- **Composition:** generous negative space, strong typographic tension, asymmetric and alternating project spreads, 1px precision rules, occasional oversize outlined words, deliberate image cropping, alternating white/ink/navy acts.
- **Components:** flat or softly rounded high-quality cards where appropriate, not a generic repeated-card dashboard. Use crisp labels/tags, natural image aspect ratios, image mosaics, restrained borders, premium button states, authentic project media.
- **Contrast/legibility:** text remains legible over images with tested overlays; section transitions feel deliberate; links are recognizable without hover.
- **No template shortcuts:** no giant purple glows, generic floating blobs, repeated three-column service cards, overuse of glassmorphism, unnecessary animated backgrounds everywhere, fake ticker numbers, AI-ish marketing copy, or shadow spam.

Create and maintain `docs/design/design-system.md` with color, typography, spacing, breakpoints, components, and motion rationale. Use genuine design system decisions from the requested design skills; where skills conflict, **portfolio requirements, accessiblity, and performance win**.

## 4. Information architecture and content

### Primary visitor journey

1. **Hero / identity:** compelling name + honest role + one-sentence engineering positioning + real portrait only if owned (otherwise typographic/art-directed alternative); CTA to featured projects, secondary CTA to contact; a succinct availability status only when user-configured and true. A subtle interactive lens or typographic reveal may be used here.
2. **Featured work:** large, visually rich showcase of **3–4 verified projects** with differentiated case-study art direction; real screenshots/video or well-designed screenshot placeholders labeled `Preview pending` during development only (not deployed as real images). Cards/openers must lead to case studies.
3. **All projects / explore:** accessible filter/search or category chips where the inventory supports them; mobile-first stacked media-rich tiles, not tiny cards. Categories can include web apps, mobile apps, AI/ML, developer tools, games, backend/infrastructure.
4. **Skills, tools, approach:** compact and truthful explanation of stack and problem-solving approach, preferably framed as capabilities rather than logo wallpaper. Stack labels should reflect actual projects.
5. **About / experience:** genuine concise bio, honest timeline only if validated, approach to collaboration, optional real image.
6. **Contact / finish:** prominent name/availability/contact block, functional mailto and social links, authentic resume link if supplied, optionally a verified contact form with server-side handling if the repository supports it. Avoid fake backend behavior.

Keep navigation anchored to actual sections/routes; support mobile menu with a proper focus lifecycle and Escape behavior. Preserve existing sections worth keeping, including tools and tech stack as previously requested.

### Project proof, not just thumbnails

Implement a typed content model and editorial project detail views. Prefer `config/site.ts` for identity/socials and `content/projects.ts` or MDX for project records, adapting to the repository. Suggested fields: `slug`, `title`, `shortSummary`, `category`, `year`, `role`, `featuredRank`, `status`, `techStack`, `tags`, `problem`, `solution`, `architecture`, `keyFeatures`, `challenges`, `results`, `media[] {src,alt,type,poster?}`, `links {demo?,source?,caseStudy?}`, and optional `nextProject`. Require stable slugs and hide absent links.

Possible projects to **verify from the actual repo/user-owned evidence before publishing**: ReconcileIQ, ResolveHub, PesoFlow (Flutter expense tracker), PixelTools, LinkPreview Studio, LeadFlow, rice-leaf disease detection app, Aquarium Collector (Roblox). These are **inventory candidates, not claims that every app is published/finished**. Include only truthful statuses and content; avoid publishing internal/private code or unfinished claims. Show serious engineering details on case studies: constraints, architecture, data flow, screenshots, implementation choices, verification, and outcomes **when verifiable**. Distinguish `Live`, `In development`, `Case study`, and `Source available` accurately.

Prioritize vivid proof: carefully cropped screenshots, a phone mockup for mobile apps, architecture diagrams when meaningful, code or technology snippets, and compact feature demos. For missing assets, produce a clear asset-request checklist; do not use generic stock imagery as substitute for work. Optimize media, use explicit dimensions and responsive image sizes, and don't autoplay unmuted media.

### Proposed route structure (adapt to existing framework)

- `/` hero + flagship projects + selected capabilities + personal intro + contact.
- `/projects` all projects and filters, if substantial enough and aligned with current routing.
- `/projects/[slug]` SEO-indexable project detail pages with related-work navigation and accessible media gallery.
- `/about` and `/contact` **only** if current routing/contents warrant separate pages; otherwise semantic home sections are sufficient.
- Real missing pages produce a proper 404. Never create hollow pages solely to expand the route count.

## 5. Motion direction: rich, intentional, smooth

Implement an explicit **motion inventory** and budget in `docs/design/motion-spec.md`. Each animation needs a purpose, trigger, duration/easing, touch fallback, reduced-motion behavior and performance check. Suggested scenes, selected rather than all played at once:

| Experience | Behavior | Key safeguard |
|---|---|---|
| Intro sequence | Crisp split-line heading reveal; nav and CTA enter with restrained stagger | No blocking loader; core content renders without JavaScript |
| Identity title | Subtle tracking/variable-weight/outline-to-filled type on reveal | Keep semantic accessible text and fixed layout |
| Cursor lens | Optional, bounded light-refraction/lens hover near hero typography based on `motion-prism.mp4` | Fine-pointer only; no expensive live backdrop capture; hidden on touch |
| Hero media | Light parallax/clip reveal coordinated with text | Image loads eagerly if LCP; static when reduced motion |
| Nav | Active section highlight, minimal progress line, smooth anchor navigation | Don't hijack browser scrolling or trap focus |
| Project entrance | Alternating image/text reveal, slight overscan/scale settle, staggered metadata | IntersectionObserver once, avoid excessive individual observers |
| Project hover | Thumbnail swap/preview and subtle pointer tilt or image movement | Keyboard focus equivalent; no hover-only content |
| Project gallery | Accessible next/previous media with animated opacity/transform | Arrow-key navigation, focus, logical tab order |
| Featured transition | Short pinning or horizontal progress for one showcase **only if** mobile and reduced-motion alternatives work well | No scroll lock; never trap users in a long scroll sequence |
| Capability rail | Slow marquee or manually browsable list, if content justifies it | Pause on hover/focus; no endlessly moving vital information |
| Section changes | Navy/white act changes using masks, rules, scale or type | Do not introduce full-screen flashes or layout shifts |
| CTA/footer | Refined button feedback and soft kinetic letter movement | Input remains responsive and fast |
| Case studies | Between-project shared-element feel if router allows | Graceful simple transitions on navigation/back |
| Page state | Skeletons only for actual asynchronous media/data, clear error and empty states | No fake wait animations |

Motion engineering rules:

- Use CSS transitions/animations and `transform`/`opacity` for most effects. Add a motion library **only after** checking whether one already exists; use GSAP ScrollTrigger only when a specific pinned choreography requires it and its performance is validated. No duplicate animation libraries.
- Short interaction feedback generally about **120–250 ms**, larger entrance sequences **350–800 ms** as a starting point, tuned visually. Don't blindly animate every element or keep constant motion in the background.
- Don't animate layout-affecting properties (width/top/left) on scroll. Use compositor-friendly properties and contain expensive work. Respect `prefers-reduced-motion: reduce` with functional equivalent content and **no mandatory animation**. Preserve usability without JS where practical.
- 60 fps is an aspiration on adequate devices, **not a claimed measured result**. Test low-end/mobile behavior, CPU throttling, memory and autoplay policies. Never sacrifice input responsiveness or text legibility for a lens effect.
- Do not introduce horizontal scrolling of the page at 320px; a purpose-built scrollable project rail may scroll **inside its own region** with visible controls and accessible fallback.

## 6. Responsive and accessible behavior

Design **mobile first**, then tablet, laptop, large display. Explicitly QA viewports **320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px** and at least one landscape tablet/phone case. Use container queries where helpful. No clipped giant headings, hidden navigation, project images covering text, or floating buttons obscuring content. Account for iPhone safe areas and reduced bandwidth/mobile processors.

- At `320–430px`: readable type, deliberate headline wrapping, touch targets ideally `44×44px`, simplified hero, tap-based project galleries, no custom pointer, no sticky scroll hijacks, functional collapsible menu, no horizontal overflow.
- At `768–1024px`: editorial stacking/2-column layout as appropriate, proper nav fallback, project media not over-cropped.
- At `1280px+`: more dramatic typography, asymmetric compositions, controlled large project media; keep line lengths sensible and do not just inflate everything.
- Semantic landmarks, one visible H1 per page, logical heading hierarchy, skip link, visible keyboard focus, keyboard-operable menu/carousels, accessible dialog state, ARIA only where necessary, alt text for meaningful images, captions/posters for media, focus restitution, escape exits.
- WCAG 2.2 AA target: **4.5:1 normal-text contrast**, **3:1 large text**, clear error messages, no color-only meaning. Check touch targets and reduced motion. Ensure fully usable at 200% browser zoom.
- Offer correct link destinations and security for external links. Avoid non-semantic clickable `<div>`s, fake disabled controls, decorative text read repeatedly by screen readers.

## 7. Technical SEO, social metadata, and performance

SEO is a **release requirement**, not an afterthought. Check what framework and router exist. For Next.js App Router, leverage its **Metadata API** and special route files; use analogous mechanisms for other stacks. See `https://nextjs.org/docs/app/getting-started/metadata-and-og-images` and `https://nextjs.org/docs/app/guides/production-checklist` when applicable.

**Required:**

- Unique, human-written `title` / `description` for home, work listing and every project page; correct `lang`, viewport, favicon and Apple touch icon, SVG/png variants, descriptive social thumbnails.
- Correct absolute canonical URL using **actual production origin**, initially `https://portfolio-toki20.vercel.app` unless repo environment proves otherwise; account for primary-domain redirects. No staging domain indexed. Check `metadataBase` if Next.js.
- `robots.txt` and `sitemap.xml` with only valid indexable routes and true last-modified data if available; correct 404s; redirect renamed routes; no duplicate canonical/OG tags.
- Open Graph + Twitter card metadata with real 1200×630 images that represent user projects; per-project social cards where feasible; no broken SVG-only preview unsupported by target platforms.
- Valid JSON-LD `Person` / `WebSite` and project `SoftwareApplication` / `CreativeWork` **only when supported by truthful content**; use actual external profiles in `sameAs`. Schema validation is not a guarantee of a Google rich result.
- Semantic server-rendered or statically available content for major project text, meaningful internal links, descriptive anchor text, image alt text, clean slugs, breadcrumb semantics where useful.
- Fast media handling: responsive `srcset` / `sizes`, optimized WebP/AVIF, preload only actual LCP asset, appropriate font loading, lazy secondary video, poster frames, no oversized hero background video on mobile.
- Correct share-preview appearance, open redirect safety, analytics script only if already configured/approved; never ship new tracking by default.

**Measure (record actual numbers and conditions):** Lighthouse mobile/desktop Performance, Accessibility, Best Practices, SEO; target roughly **90+/95+/95+/95+** respectively where achievable, and document reasons if not. Core Web Vitals target **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1** at the 75th percentile **once field data exists**. Lab tests do not establish field INP. Ensure JavaScript/hydration and animation startup do not block first meaningful render. Compare bundle sizes to baseline.

## 8. Architecture, code quality, and safety

1. **Audit before editing:** current framework/version, pages, layouts, config, assets, dependencies, commit status, tests, scripts, deployment/CI, SEO metadata, content inventory, and visual baseline. Record a `docs/verification/pre-redesign-baseline.md`. Don't overwrite uncommitted user work.
2. **Minimal implementation:** preserve existing component patterns and dependency choices, use strong types, portable components, CSS variables, modular animations, and semantic HTML. Split only where it reduces complexity. Don't reflexively introduce a global store, CMS, new backend or animation stack.
3. **Project data:** one validated source; ensure cards/detail pages/site SEO reuse the same data to avoid title, URL and thumbnail drift. Validate required fields and optional URLs during build/tests.
4. **Images and legal:** record origin/license/permission for all published assets. Developer-owned media is preferred; don't use copyrighted inspiration photography without explicit permission.
5. **Testing:** lint, typecheck, build, unit/integration tests for content + navigation + filters, browser E2E tests for routes/projects/contact/mobile navigation, automated accessibility checks, headless visual screenshots, manual/assisted motion review and contrast checks. Fix failures before milestone commits.
6. **Deployment:** verify `pnpm`/`npm`/`yarn` from lockfile, Vercel configuration and runtime compatibility. Do not alter deployment secrets or send production deployments without permission. If deploy remains user-owned, supply exact steps.
7. **Docs:** keep `README.md` updated and create `docs/verification/milestone-01.md` through `milestone-08.md`, tracking executed commands, measured results, design decisions, screenshot paths and remaining issues.

### Illustrative (not prescriptive) file arrangement

```text
<existing-repo>/
├── AGENTS.md                        # small shim to load this file (recommended)
├── codex.md                         # this specification
├── START-CODEX-PROMPT.md
├── config/site.ts                   # retain / adapt if present
├── content/projects.ts              # or existing content/MDX equivalent
├── app/ or src/ or pages/           # KEEP current router; add routes thoughtfully
│   ├── ... home
│   ├── ... projects directory
│   └── ... project detail
├── components/                      # site, projects, motion, UI as needed
├── public/projects/                 # real, licensed screenshots/posters
├── styles/                          # brand tokens/design primitives as appropriate
├── tests/                            # real testing suite used by repo
├── docs/
│   ├── design/{reference-analysis,design-system,motion-spec}.md
│   └── verification/{pre-redesign-baseline,milestone-01...08}.md
└── references/portfolio-redesign/   # PRIVATE reference source, not publicly served
```

Don't use this sketch to migrate a working framework or duplicate a preexisting directory.

## 9. Mandatory skills and plugin discovery; specific responsibilities

**Before designing/coding, call `find_skills` if this tool is genuinely exposed in your current Codex environment, and use the installed plugin-management discovery/status interface.** If those exact names are absent, enumerate whatever native skill and plugin listing mechanisms exist and record the actual names. Never hallucinate a tool call or state that a plugin was used merely because this document mentions it.

### UI/UX skills to locate and read

| Skill requested | Primary job |
|---|---|
| `ui-ux-pro-max` | Generate a palette-aware design system, typography hierarchy, UX component matrix, responsive concepts |
| `web-design-guidelines` | Independent UX, web-interface, responsiveness, and accessibility audit with actionable file/line issues |
| `shadcn` | Component and accessibility guidance **if shadcn/ui already fits the stack**; avoid forcing shadcn onto an unrelated stack |
| `hallmark` | Distinctive editorial art direction, anti-template checks; study/audit/redesign of an existing visual system |
| `apple-design` | Material restraint, interaction continuity, optical alignment, spring/motion nuance—not wholesale copying Apple UI |
| `emil-design-eng` | Motion vocabulary, timing/easing, animations audit, reduced-motion and responsiveness critique |

Known upstream examples to **verify via skill discovery**, not commands to run blindly: `https://github.com/nutlope/hallmark`, `https://github.com/emilkowalski/skills` (contains `apple-design` and `emil-design-eng`), `https://github.com/shadcn-ui/ui`, `https://github.com/vercel-labs/agent-skills`, `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`. Read each tool's official instructions before use; some have multiple distributions or forked skill names.

### Development plugins to locate and actually use

| Plugin | Intended concrete use | Fallback if unavailable |
|---|---|---|
| `headless` | Inspect locally rendered UI, record desktop/mobile screenshots, click through navigation, capture browser console/network issues, conduct regression visual comparisons | Playwright browser tests and headless Chromium in repo |
| `graphify` | Query the indexed code graph, find current route/content owners and high-impact dependency paths, assess blast radius before refactoring, optionally remember architecture findings | `rg`, language server references, dependency audit, tests; Graphify may require a ready indexed repository and login |
| `ponytail` | Apply pragmatic senior-level simplicity/YAGNI review, remove unnecessary abstractions/dependencies, check maintainability at every milestone | Human-readable complexity checklist and ordinary code review |

`graphify` has a hosted MCP service at `https://api.graphify.com/mcp` **but requires authorized repo indexing/account access**; don't mistake this for a similarly named, distinct product. Ponytail's Codex plugin is associated with `DietrichGebert/ponytail` (check current official installation docs). The exact `headless` plugin identity is unspecified—discover its provider/capabilities **before** choosing how to use it. Don't silently substitute an unrelated service and claim it was the requested plugin.

**Required evidence:** `docs/verification/tool-discovery.md` with exact discovered names/publishers, version, availability, authorized scope, which `SKILL.md` files were read, example actual tool actions, fallback choices, and any installation/permission blockers. Request approval for external installs or OAuth flows if needed. Continue safe repo-local development if a service is unavailable; be transparent about gaps.

**Workflow:** (a) discovery -> (b) existing repo + Graphify audit -> (c) Hallmark/UI UX/design-system direction -> (d) Apple/Emil motion draft -> (e) implementation with shadcn guidance where appropriate -> (f) headless screenshots/regressions -> (g) web-design-guidelines + Hallmark critique -> (h) Ponytail simplification review -> (i) verification and commit.

## 10. Exactly EIGHT major implementation milestones

Each stage: implement, test, inspect with the browser as appropriate, document evidence in `docs/verification/milestone-0N.md`, commit to the current branch with a **distinct milestone commit**, then continue. An unexpected blocker must be recorded with honest status; never fabricate success.

### M1 — Baseline, tool discovery, and design direction

- Audit repository and current behavior, capture route/component tree, identify package manager and existing design/SEO/animations, check git state and deployed configuration.
- Discover `find_skills`, plugin management, all six UI skills and three requested plugins; read available instructions, log version/publisher and access limitations. Use Graphify to map route ownership/dependencies if authorized.
- Study attached reference media; produce art-direction brief, original page-level wireframes (desktop/tablet/mobile), palette/contrast checks, motion storyboard and prioritized gaps; use Hallmark, ui-ux-pro-max, apple-design, emil-design-eng in this phase.
- Capture baseline headless screenshots at 390/768/1440 where possible; document site and project inventory without inventing projects.
- **Acceptance:** baseline + tool-discovery + reference-analysis + first design-system + motion-spec documents exist; no production breakage; initial tests still pass.
- Suggested commit: `chore(portfolio): milestone 01 audit and redesign blueprint`.

### M2 — Architecture, tokens, and responsive design foundation

- Implement centralized palette, typography, spacing, layout breakpoints, motion primitives, reusable accessible controls and responsive navigation; preserve current file structure and routes.
- Consolidate `config/site.ts` identity, social links, SEO site origin, genuine availability/resume, typed project schema and content validation; migrate existing data without losing it.
- Set up/check Playwright headless E2E/visual snapshots, a11y audit harness and sustainable testing commands; implement foundational skeleton of page sections.
- **Acceptance:** mobile nav keyboard/touch friendly, no horizontal overflow 320–1920px, palette consistent, content data driven, snapshots recorded.
- Suggested commit: `feat(portfolio): milestone 02 design system and structure`.

### M3 — Hero, identity, navigation, and motion foundation

- Build original editorial responsive hero (bold type + contrasting expressive type where useful), verified owner identity, CTA hierarchy, original portrait presentation if available; add balanced featured-work transition.
- Create intro reveal, typographic micro-interactions, nav indicator, progressive section cues; optional performant optical-lens interaction on desktop with touch/no-motion fallback.
- Use `emil-design-eng` / `apple-design` for timing and interruption behavior, and `hallmark` to reject default-template structure. Check LCP and main-thread costs before adding more effects.
- **Acceptance:** real CTA and links, hero accessible with/without motion, legible at 320px, no large CLS or render-blocking intro.
- Suggested commit: `feat(portfolio): milestone 03 editorial hero and navigation`.

### M4 — Featured work and immersive project exploration

- Build 3–4 verified featured project presentations (alternating art direction, staggered reveal, hover/tap state, real responsive media) and an accessible all-projects explorer.
- Implement meaningful category filters/search only if inventory supports them, cards with live/GitHub links only when actual, featured-to-detail navigation, hover preview with keyboard/touch equivalents.
- Consider one bounded scroll-led showcase scene; simplify for mobile and reduced motion. Validate with headless screenshot/video captures for 390/768/1440.
- **Acceptance:** every featured card opens correct real content; filters work; pointer and touch equivalents exist; no faux projects/statistics.
- Suggested commit: `feat(portfolio): milestone 04 featured work experience`.

### M5 — Project case studies and credible engineering content

- Implement complete, typed and indexable project detail template with hero media, context, problem/solution, features, architecture, stack, meaningful proof, results when verified, media gallery, credits and next-project navigation.
- Populate verified real project content from authorized sources, audit for sensitive/private data, request missing media via a clear checklist. Add accessible images/posters, use independent layouts/different media rhythms for varied work.
- Add project-specific share-card and metadata hooks, consistent breadcrumbs, not-found behavior, link tests.
- **Acceptance:** at least the actual available featured projects have readable, working case studies; absent live URLs aren't clickable; gallery works on mobile/keyboard.
- Suggested commit: `feat(portfolio): milestone 05 engineering case studies`.

### M6 — About, capability narrative, contact, and motion polish

- Complete authentic About/experience/story (if known), tool/tech capability area, optional verified stats, differentiating engineering approach and polished footer/contact section.
- Wire mailto/social/GitHub/LinkedIn and resume when real; if a form exists, validate success/failure and anti-spam safely instead of pretending to send emails.
- Polish detail motion: subtle button magnetism where beneficial, section reveal, nuanced nav and gallery transitions, stop/pause behavior; tune touch/reduced motion; run Ponytail simplification review.
- **Acceptance:** no dead CTA/social links, no fake placeholders on published screens, delightful yet readable transitions, no a11y regressions.
- Suggested commit: `feat(portfolio): milestone 06 about contact and motion polish`.

### M7 — Full SEO, accessibility, optimization, and hardening

- Implement metadata, canonical, robots/sitemap, OG/Twitter images, favicons, JSON-LD, redirects, valid 404s, and crawlable project content; verify with rendered HTML, not just source inspection.
- Optimize bundle/media/fonts, LCP and CLS, deferred animations, low-motion/no-JS experience where practical. Run design guideline audit, Hallmark audit, accessibility checker, link crawler and content validation.
- Test all responsive widths, orientations, 200% zoom, keyboard-only flow, reduced motion, fine/coarse pointer, CPU-throttled mobile.
- **Acceptance:** SEO artifacts and real share images accessible, comprehensive automated test suite pass (or gaps documented), no major accessibility/console failures, measured Lighthouse scores logged.
- Suggested commit: `fix(portfolio): milestone 07 seo accessibility performance`.

### M8 — Final browser QA, documentation, and deployment readiness

- Run all formatting/lint/typecheck/unit/E2E/a11y/build tests and desktop/mobile visual regressions; manually review headless captured screenshots and real interactions; investigate/fix high-impact issues.
- Compare new site to references **for editorial quality only**, audit originality, remove vestigial code, analyze dependencies with Graphify if available, run Ponytail code-simplicity review and a final independent web-design-guidelines audit.
- Update README/config documentation, media provenance, QA screenshots, known limitations, Vercel deployment notes/rollback guidance; ensure Git clean after final commit.
- **Acceptance:** eight milestone verification records and eight commits, truthful final issue list, exact tests+results, accessible/responsive experience, production-ready build. Do **not** claim deployment occurred unless explicitly performed and verified.
- Suggested commit: `chore(portfolio): milestone 08 release verification and polish`.

## 11. Definition of done and reporting format

A milestone is complete only when its behavior, content, accessibility, responsiveness, and documented tests satisfy acceptance criteria. Each milestone report should include: summary; modified paths; screenshot paths and viewport sizes; tools/skills actually invoked; test commands + real outcomes; Lighthouse/console/a11y observations where applicable; known limitations; commit SHA.

At the end of M8, report:

1. Real architecture and installed tool matrix, including missing/unavailable plugins.
2. The eight commit SHAs and what changed at each.
3. Working routes, real projects/case studies and interactions; missing owner-provided screenshots/content if any.
4. Results of lint, typecheck, unit, E2E, a11y, visual/console, build and SEO validation; actual Lighthouse numbers and device/viewport.
5. Evidence for mobile/reduced motion/performance and outstanding issues.
6. Exact local run and deployment instructions, with statement whether production was **not deployed**.

**Do not stop at a style mockup. Implement a maintainable, genuinely functional website. Don't report complete until tested.**
