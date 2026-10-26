# CODEX TASK — Portfolio Phase 3: Editorial Hero Redesign, Scroll Typography, Real Project Expansion & Immersive Case Studies

> **Use this as a continuation prompt in the existing, completed portfolio repository. Implement changes, not just a plan.**
>
> Current working checkout (verify before acting): `/Users/jameskierdoliguez/projects/jameskierdoliguez-portfolio`.
> Original checkout `/projects/portfolio` remains off-limits. Do not push or deploy without authorization.

## A. Situation / why this new phase exists

The site already completed **Milestones 01–14**. The second motion pass is a good improvement, but the visuals still feel less expressive than the attached reference animations. In particular:

1. **Scroll typography** should be prominent: headings and text should be *revealed as you scroll* in tasteful, choreographed ways—not merely appear or fade. The entire site should have an intentional rhythm when a visitor scrolls.
2. **The hero portrait treatment must be redesigned.** The attached current-state screenshot shows the existing graduation portrait inside a thick burgundy arched doorway/window, with a visible architectural grid, a circular glass/outline overlay, and a bottom CTA. **The arched door/window visual is explicitly rejected.** Do not keep it with a different color or radius. Replace the actual design.
3. **The portfolio needs more verified real projects**, sourced from my actual local development folders and my accessible GitHub repositories. I want my genuine engineering work to be discoverable, not a handful of hardcoded existing items.
4. **More projects must receive the high-quality presentation given to PesoFlow.** Design compelling project-specific feature cards and authentic media, not a repetitive template with a different title.
5. **Every project case study with real navigable UI should display at least three different real screens/pages/views when at least three exist.** Use captures from the actual application or verified existing screenshots. Include functioning galleries and honest captions. Do not invent pages, screens, design mockups, claims, screenshots, or features to meet the count.

These are four equally important workstreams: hero redesign, editorial motion, repository-based portfolio expansion, and richer, verifiable project galleries. **Do not spend the entire phase on animations while neglecting project discovery or screenshots.**

## B. Preserve the production-ready foundation

- Preserve React, TypeScript, Vite, Tailwind CSS 3, npm, source architecture, working links, contact actions, existing project details, functional responsive layouts, accessible navigation, SEO and performance checks.
- Preserve current routes `/`, `/projects` and existing project detail routes. Add new project routes using the existing route scheme; do not break saved bookmarks or inbound links.
- Preserve brand palette: burgundy `#890620`, slate `#767B91`, white `#FFFFFF`, deep navy `#011936`, ink `#03191E`. The site remains predominantly editorial/light with contrasting dark sections, not an all-red redesign.
- Content sources already exist at `src/config/site.ts` and `src/content/projects.ts`; inspect their actual contents before editing. Preserve existing data-driven editing or improve it without introducing a fragile CMS.
- Preserve useful previous motion work: spatial showcase, subtle lens/lighting, image reveals, filter reflow, local pixel transition. Refine and integrate rather than blindly replacing.
- Existing results: 4 unit and 70 browser tests, 9 visual comparisons; excellent local Lighthouse scores (roughly 98–100). Keep those tests and run them after work. Do not treat old scores as guaranteed future results.
- No live deployment, remote push, surprise framework migration, unnecessary packages, fabricated achievements, or private material exposed publicly.

## C. Required inspection of actual references

Before implementing, visually inspect **the entire user-supplied five reference videos** in `references/portfolio-phase-3/` (or the equivalent path in the kit) by sampling frames across each clip. Also inspect `references/portfolio-phase-3/current-hero-replace.png`. Read the following source pages; the clips convey actual choreography better than stills:

1. **Dymas Alfin / Mikan — Personal Portfolio Website Animations**  
   https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations  
   Study editorial spacing, carefully staged heading/portrait entrances, selected-work sections, scroll pacing, clear project thumbnails, transitions into the next section.
2. **Purrweb — Landing Designer Portfolio**  
   https://dribbble.com/shots/19871911-Landing-Designer-portfolio  
   Study fluid background lighting and localized glass/lens effects, restrained to suitable pointer devices. The desired improvement is smooth, rich visual response without blocking readable text.
3. **Matthew — Personal Portfolio Website Animation**  
   https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation  
   Study dramatic editorial portrait paired with giant type, huge type reveals, scroll-led storytelling and bold black/white compositions.
4. **Vadim Carazan Portfolio**  
   https://dribbble.com/shots/27807157-Vadim-Carazan-Portfolio  
   Study project-media depth, layered spatial movement and storytelling. Do not attempt to copy a giant WebGL universe or incur a large runtime just because the reference does; the portfolio contains real projects rather than thousands of assets.
5. **Kris Anfalova — Design Studio Portfolio**  
   https://dribbble.com/shots/27820202-Website-Design-Design-Studio-Portfolio  
   Study oversized project presentations, paced scroll transitions, editorial contrast, section-to-section pixel/grid effects and purposeful moving visual objects.

**Deliverable first:** write `docs/design/phase-3-motion-and-content-direction.md` documenting: (a) one usable insight per video with approximate timestamps; (b) a page/section storyboard: which text enters, direction, trigger, cadence and exit/handoff; (c) desktop vs mobile / reduced-motion; (d) screenshot inventory and project choices; (e) why the new hero is NOT an arch/doorway. Original executions only—do not download or redistribute the references' copyrighted creative assets as site content.

## D. Hero: replace the arched "door/window" visual entirely

### Non-negotiable design change

The screenshot labeled `current-hero-replace.png` depicts the CURRENT portrait design, **not an inspiration image**. The thick burgundy horseshoe/arch frame, interior gridded lines, arched photo mask, outlined magnifying-glass circle, and doorway/window feeling must be **removed**. Do not make a slightly more minimal arch and claim completion.

### Desired new composition — art-directed editorial developer introduction

Use one coherent new composition, not a collage of effects:

- Favor **open asymmetric editorial layout**: large expressive introductory typography on one side and the existing genuine portrait on the other, with portrait cropping/overlap against typography or an unframed cutout where the actual source makes it look natural. At mobile widths, stack it deliberately without cropping important face features.
- A high-contrast image treatment is welcome (monochrome photo, clean negative space, fine color accent). Use the actual authorized current portrait; don't face-swap, reconstruct, or fabricate a new portrait. If source quality prevents a safe cutout, choose a strong simple rectangular/edge-to-edge treatment with minimal border, **not another arch**.
- Giant hero identity/type; a small credible role description and purposeful introduction; simple existing contact/project CTAs with clear keyboard focus; subtle index/scroll cue. Align typography with real developer identity rather than portraying me as a design studio.
- Burgundy is an accent: a small highlighted word, rule, accent tag or minimal decorative shape—not a massive burgundy door frame.
- Make the hero feel alive using a staged reveal: typography/masks first, then portrait image unveiling from the side, then tiny details/CTA, and a refined transition into selected work. Do not make users wait to read my name or hide it behind a long full-screen loader.
- Explore **two materially different hero directions** in a short decision note (e.g. portrait overlapping oversized type; offset portrait and open headline grid), implement the strongest based on legibility, responsive behavior and references. No dummy option picker in the final site.
- Explicitly document the removed visual elements and new composition, with before/after desktop and mobile screenshots.

### Hero must work without fancy effects

Without JS, with `prefers-reduced-motion: reduce`, under portrait load failure, and at 200% zoom, all essential hero content, nav and CTA remain visible and operable.

## E. Scroll typography: the most visible requested animation upgrade

**This is a major deliverable, not one shared `opacity: 0 -> 1` utility applied everywhere.** Build an intentional editorial text-reveal system that behaves like the supplied animations:

- **Large section headlines**: line-by-line reveal from a hidden text mask (e.g. each line rises 24–64 px into place) with 40–110 ms line stagger and intentional easing; responsive line breaks should be respected. Reveal the *real text*, not duplicate inaccessible copy.
- **Selective emphasis**: chosen words/phrases slide, track, wipe, or change color in coordination with the section; avoid animating individual letters indiscriminately.
- **Eyebrow labels + overlines**: compact horizontal or vertical movement with a divider/rule growing in, then the headline, then body copy.
- **Body text**: shorter staggered sentence/paragraph reveals or small slide/opacity; keep body readable and calm rather than continuously animated.
- **Scroll-linked handoffs**: on selected sections, preceding heading shrinks, moves or clips away as the next heading/media enters; the structure must remain normal document flow. Avoid scroll hijacking.
- **Project title interaction**: selected-work titles coordinate with thumbnail/image transitions, not separate disconnected fades.
- **Counters/tech stacks**: where useful, restrained movement and small stagger. Do not display artificial or unverified statistics.
- **Footer contact headline**: one strong final typographic reveal rather than another generic fade.

**Important implementation semantics:** use progressive enhancement; server-built/static HTML must reveal real content before JS hydration, and the site must remain readable with JS disabled. Preserve real heading hierarchy and accessible DOM order. If text is segmented by lines/words, use suitable `aria-label`/`aria-hidden` handling to prevent repetitive screen-reader output; avoid cutting words on narrow viewports. Respect font load/reflow and resize. Prefer `IntersectionObserver`, Web Animations/CSS transforms, existing motion utilities or carefully justified packages. Trigger once by default; choose limited replay intentionally. Avoid high-cost scroll event handlers, heavy blur filters and layout-thrashing animations. Mobile should get visually satisfying but shorter/lower-amplitude motion; reduced-motion should skip spatial effects entirely.

**Suggested timing targets, not inflexible mandates**: headline reveals about 450–850 ms, 50–100 ms stagger for lines, supporting labels ~250–450 ms; transitions respond promptly when entering the viewport. The user should be able to scroll fast without missing, losing, or waiting for content.

## F. More genuine portfolio projects — inspect repositories, don't guess

I have additional development work beyond the projects currently listed. Discover it from **actual evidence**:

1. Inspect the existing portfolio's Git remotes and the relevant workspace/project sibling directories available to this checkout (read-only inventory first). Where authenticated and permitted, list repositories from my connected GitHub account or `gh repo list` / GitHub APIs. Check public vs private visibility.
2. Search project README files, manifests, route trees, app screenshots, demo links, history and recent commits. Identify meaningful implemented projects and actual technologies/features. Never run arbitrary remote project scripts without inspection.
3. Build a transparent `docs/verification/project-inventory.md` table: repository/path; actual project title; project type; what demonstrably works; source/live link status; screenshot sources available; page/screen count; public/private status; whether safe/appropriate to showcase; reason for include/defer.
4. Potential names to investigate **ONLY IF ACTUALLY FOUND**: PesoFlow, PokeChamp, PixelTools, GuestReco, LinkPreview Studio, ResolveHub, ReconcileIQ and other accessible projects. These are leads, not authorization to invent them. Do not add a phantom card because a name appeared in this prompt.
5. Select a meaningful broader set: prioritize polished, substantial, demonstrable projects and varied skill areas (full-stack engineering, mobile Flutter, developer tools, AI/CV if present, systems/integration). Keep legitimate existing showcased projects. Do not force unfinished exercises, sensitive client repos or secrets into the public portfolio.
6. For each added project, derive title, tech stack, real features, evidence-backed description, challenges/decisions (if documented), image sources and applicable verified links. Link to a legitimate GitHub repo and/or working demo only where allowed and confirmed. Never fabricate analytics, user numbers, star counts, revenue, performance data or client logos.
7. Do not expose proprietary implementation, .env files, tokens, customer data or private screenshots. A private project can only be described and pictured using assets/content safe for publication; otherwise defer and record why.
8. Expand the existing data-driven project model and filters with helpful categories (e.g. Web Apps, Mobile, Tools, AI, Systems) only where evidenced. Give every new route a slug, appropriate metadata, share image when available, accessible media labeling, and a graceful 404.

**Not every project requires an elaborate case study**, but important, UI-rich projects should receive a credible detailed story and real media. Preserve honest notes for limited projects like GuestReco.

## G. Bring more project cards up to PesoFlow-level quality

The existing PesoFlow presentation is the reference for visual production value. Reuse its **quality** (art direction, large crisp media, layered context, intentional hierarchy and thoughtful responsive framing), not exactly the same blue-card composition for every project.

- Give each featured project a distinct but harmonized art direction: authentic screenshots inside appropriate device/browser frames; a project-specific accent color derived from real product UI where appropriate; typographic label, role, tech stack, concrete feature highlights and obvious "View case study" CTA.
- Build substantial cards for multiple real projects—at minimum all high-priority UI-rich projects backed by good assets, not just PesoFlow. Use staggered editorial card sizes, alternating composition and a few large immersive spreads with breathing room. Keep all readable at 320px through large desktop sizes.
- For web apps, compose real captured desktop screens with secondary mobile/details previews; for mobile apps, use actual phone-screen captures; for developer tools, present real interface or demo output; for games, present genuine gameplay screens and clear mechanic callouts.
- Create animated media reveals, hover preview/focus behavior, restrained perspective/parallax where appropriate; do not have every card use exactly the same animation. Touch and keyboard get equal functionality without needing hover.
- No screenshots downloaded from inspiration portfolios, no AI-fabricated UI, no decorative fake charts or fake code. Decorators must be clearly decorative, with real application media separately identifiable.
- Project browse experience should scale to the expanded collection. Filter chips, tab/segmented options, layout, quick metadata, pagination/load-more (if needed), and consistent back-navigation must work on real devices. Avoid filtering that hides selected projects from keyboard/screen readers unpredictably.

## H. Project case studies — minimum three genuine screens when present

**This is an explicit acceptance criterion for each showcased UI project.**

1. Inspect each project to find real navigable screens/pages/views/routes. For a web project, typical genuine distinct captures might be landing/home, editor/dashboard, results/detail/settings; for Flutter, Home, Transactions, Analytics/Budgets/Add Expense; for games, distinct real gameplay states or screens. These are examples, not claims about what exists.
2. If the real product has **three or more distinct meaningful screens/views**, include at least **three actual screenshots** for that case study. Aim for more when the project benefits. They must depict genuinely distinct pages/workflows, not three crops or three viewport sizes of one page masquerading as unique screens.
3. Prefer to capture screenshots yourself from the checked-out, runnable app in a deterministic controlled environment (with Playwright for web, appropriate emulator/device/available build capture for mobile). If runtime is unavailable, use clearly verified existing product images from that project's repo/docs/artifacts. Do not fake screens or claim screenshots are current if they are older.
4. If only one or two real screens exist, show those **one/two** and say so in `project-inventory.md`—do not pad or silently invent a third. For API/background-service repos without visual pages, use honest architecture/workflow diagrams or actual terminal/docs artifacts, labeled accurately as such and **never** presented as web app screenshots.
5. Each screenshot must be traceable: source repo, exact source path or controlled capture command, page/view label, capture state/version/date where possible; keep an evidence file `docs/verification/project-media-manifest.md`. Check against leaked personal or secret data.
6. Provide an intentional **case-study narrative**: hero/overview; what it does; key engineering challenge and verified solution; tech stack; 3+ screen gallery if available; actual features; outcomes only if measured; useful links/next project. Keep text clear for recruiters.
7. Build an excellent **interactive media gallery**: full-width hero image plus at least three diverse screen previews (where they exist), thumbnail selector or horizontally scrollable gallery, arrow/keyboard navigation, visible image captions, accessible focus management, touch swipe if practical, zoom/lightbox only if needed, and responsive image sizing. Avoid auto-changing content before users finish reading.
8. Show screenshot progression as a product walkthrough instead of randomly scattered media: e.g. "01 Overview → 02 Core workflow → 03 Results/Insights" with actual screen labels, and coordinate headline/caption reveals with media transitions.
9. Use responsive image variants, `srcset`/`sizes` where appropriate, modern compression without blurring text, known dimensions to prevent CLS, lazy loading below the fold, and preload only the essential hero/first image. Never turn a case study into an enormous GIF carousel.
10. Confirm every image loads in production build, with descriptive alt text and meaningful captions. Include both desktop and mobile views when genuinely available, while keeping distinct-screen count honest.

## I. Page-by-page visual choreography

### Home (`/`)
- New editorial hero without arch/window; staged typographic/portrait entry, accessible identity and CTA.
- Scroll into short intro/what-I-build with line-masked text reveal and gentle supporting-copy staging.
- Selected Work gets strong masked heading, media/card transitions, several heavyweight project spreads (not only three project cards).
- Capabilities/tech shows staggered labels, thoughtful emphasis changes and a simple interactive detail, not pointless floating badges.
- About adds a candid personal statement and tasteful image or factual credentials, with text reveals but no made-up work history.
- Contact has a memorable, large typographic conclusion and functional existing actions.

### Project index (`/projects`)
- Editorial introduction to the expanded real project catalog; animated but legible filters.
- High-production, distinct project cards with real media, meaningful responsive layouts, unambiguous links. A selected project can expand or highlight its media without hijacking navigation.
- Graceful animated reflow, no focus loss when filters change, no layout shifts.

### Every project detail page
- Strong project-specific hero, real product hero screenshot, factual overview.
- Scroll-led reveal of project information and screenshot gallery in a sequence useful for understanding the product.
- For UI-based projects with 3+ screens: 3+ **different authentic pages/views**, named and captioned.
- Next/previous project navigation, working source/demo links only where real, a responsive layout and SEO metadata.

## J. Motion + interaction discipline

- **Do not make the site a theme-park demo.** The rhythm should be 1 strong signature effect followed by quieter editorial reading space. More visible and considered than Phase 2, but purposeful, fast and readable.
- Never prevent native scrolling, disable selection, remove focus indicators, intercept wheel in general page scroll, or require pointer devices to access project detail.
- Every decorative motion is optional from an accessibility perspective; essential content and controls appear with motion disabled.
- Use transforms/opacity wherever possible. Only use expensive filters/WebGL/shader/canvas where justified, with graceful low-power fallback.
- Avoid long startup spinners, blanket smooth-scroll wrappers, global scroll-jacking, continuous high-frequency JS scroll calculations, and animation delays that frustrate fast scrollers.
- Pointer effects should be bounded and touch-disabled; no huge glass circle obscuring faces or text (especially after rejecting the old hero overlay).
- Use correct semantics, `prefers-reduced-motion`, visibility management, contrast, keyboard, focus, and full content at no JS.
- Monitor real DOM/layout work, INP proxies, CLS, LCP and animation jank; no heavy animation on large offscreen carousels.

## K. Mandatory Milestones 15–20 (continue the established workflow)

### Milestone 15 — Audit, reference storyboard, repo discovery
- Verify branch/working tree; read existing AGENTS/docs/motion directions/current UI; preserve historical work.
- Inspect five supplied clips and current-hero screenshot. Capture baseline desktop/mobile videos and performance.
- Discover accessible repos and local projects; create initial project/media inventories; assess what can legitimately be included.
- Document two hero directions, select one, map actual effects to sections and devices. Commit only notes and safe audit changes.

### Milestone 16 — Replace the hero design
- Delete the burgundy doorway/arched frame treatment and circular overlay; implement a fresh editorial portrait/typographic composition.
- Deliver desktop/tablet/mobile responsive layouts, polished hero animation, clear CTAs, accessibility fallbacks.
- Test and compare before/after screenshots; commit with acceptance evidence.

### Milestone 17 — True scroll-responsive editorial typography
- Implement reusable headline/eyebrow/body reveal primitives with proper a11y, SSR/static/no-JS visibility and resize robustness.
- Apply meaningful animations across Home, project index and details. Add selected section handoffs; keep performance stable.
- Capture scroll-through comparison video and tests including fast-scroll, scroll-back, reduced motion, 200% zoom; commit.

### Milestone 18 — Expand with verified repositories
- Finalize repository/project inventory; incorporate additional verified presentable projects with accurate title/description, stack, assets, filters and working routes.
- Record private/public decisions and defer unsupported projects; add all verified links/metadata and working browsing controls.
- Add project listing/route/SEO tests; commit.

### Milestone 19 — Premium featured cards + authentic three-screen galleries
- Extend PesoFlow-level media/art direction to other suitable projects while giving each a distinct visual identity.
- Collect and optimize authentic screenshot sets; produce media manifest and usable 3+ screen case-study walkthroughs when available.
- Build captioned/accessible, keyboard/touch-friendly responsive galleries; ensure project-specific cards and details work.
- Test media traceability, no secret content, high-DPI legibility, all navigation; commit.

### Milestone 20 — End-to-end polish, verification and handoff
- Run `npm ci`, format/lint/typecheck/unit/browser/accessibility/SEO/build and visual regression tests; preserve or increase relevant coverage.
- Test all existing and newly added routes, all filters, CTA links, image/gallery interactions and fallback states.
- Test 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920 and any old mandated widths; landscape touch, 200% zoom, keyboard, reduced-motion and no-JS.
- Capture browser *videos* of the new hero, multiple scroll headline reveals, featured cards and a complete three-screen case-study gallery on desktop and mobile; screenshots alone are insufficient to prove motion.
- Rerun Lighthouse with same repeatable config as previous results, compare old/new and report objective differences. Target mobile Performance >=95 where reproducible, preserve accessibility/SEO/Best Practices 100 when feasible, avoid meaningful LCP/CLS regressions and fix new runtime/console errors. Record limitations honestly.
- Ensure final working tree clean; six milestone commits; clear handoff with paths, tests, media sources and notes. **Do not push or deploy**.

## L. Required acceptance checklist

- [ ] Hero **does not** look like a door/window/arch and no residual thick burgundy arch/grid/circular overlay remains.
- [ ] Hero has a substantially redesigned portrait + typography composition using an actual authorized photo.
- [ ] Scroll-triggered editorial text reveals are visibly present in **multiple different sections and project pages**, not only at the hero, while accessible and readable.
- [ ] More real projects are shown based on verified local/GitHub repositories, not guessed titles.
- [ ] Featured cards for multiple projects reach the production value of PesoFlow and are not cookie-cutter clones.
- [ ] Every showcased UI-based project with 3+ existing distinct pages/views displays at least 3 **genuine different** screenshots; fewer only when that's all that exists, with evidence.
- [ ] Case-study galleries are functional with appropriate keyboard/mobile controls, captions, responsive sizes and optimized real images.
- [ ] No misleading achievements, false live demos, private data, invented product images or dead links.
- [ ] Original six routes continue working; all new routes, filters, SEO, responsive and contact interactions work.
- [ ] Existing quality gates, reduced-motion, no-JS, keyboard/zoom, tests and performance are revalidated.
- [ ] Before/after desktop/mobile screen captures AND motion recordings demonstrate the changes.
- [ ] Milestones 15–20 each have evidence and their own commit. No push or deployment.

## M. Developer tool discovery and execution directive

At the start, use `find_skills` / skill discovery and plugin management where tools are actually available. Review applicable UI/UX, web-design guidelines, shadcn, Apple Design, Hallmark, Emil design engineering and animation/performance skills already available. Discover Headless, Graphify and Ponytail if present, but **do not block delivery** or falsely report usage when unavailable. The previous phase reported them unavailable; use proven alternatives such as Playwright and repository/media inspection. Prefer refining the existing small dependency footprint rather than introducing large frameworks purely for visual effects.

When browsing the owner's own GitHub repository list, use an existing authenticated GitHub integration or CLI only when authorized. If access is unavailable, inspect accessible local project folders, deliver what can be verified and document uninspected repos rather than treating that as permission to make up portfolio content.

**Start Milestone 15 now. Work through all six milestones without stopping at a proposal. Review the actual resulting page in a browser after each significant visual change. Ensure the owner sees a genuinely different hero, clearly animated typography on scroll, more legitimate projects and substantive 3-screen walkthroughs where they exist.**
