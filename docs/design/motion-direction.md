# Cinematic motion direction — milestones 09–14

The completed M8 application is the starting point. Current requested contract is CODEX-PORTFOLIO-CINEMATIC-MOTION-PROMPT.md, found in the owner's motion-upgrade pack and copied here. CODEX.md still governs truthful content, palette, stack and release discipline. CODEX-2.md is an old, conflicting warm Stitch implementation brief; it does not supersede the active motion request. Work is confined to the new checkout. No push/deployment or change to original portfolio.

## Actual reference inspection

All five Dribbble pages opened successfully through the web tool; their descriptions corroborate the motion techniques. All five owned reference files decoded with AVFoundation; reviewed chronological frame sequences, including dense opening samples and 25/40/55/70/80/90/97% of each duration. This is frame-sequence analysis, not an assertion that a browser executed their original websites. Hash/duration manifest: references/motion/README.md. Private contact sheets remain outside public output.

| Reference | Observed movement | Original portfolio interpretation |
| --- | --- | --- |
| [Dymas / Mikan editorial](https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations), 21.567s | Outline/solid identity and portrait resolve separately; selected-work header precedes cards; dark experience handoff; row preview; expansive closing CTA | Masked identity lines, portrait curtain, staged project metadata and calm ending. Do not reproduce the reference's blank wait, availability, employers or portrait. |
| [Purrweb lens](https://dribbble.com/shots/19871911-Landing-Designer-portfolio), 16.020s | Bounded magnifier tracks text with visual lag; atmosphere moves behind type; stacked work panels change depth | Small pointer-reactive light/ring confined to owned portrait, plus a shallow magnetic CTA. No live backdrop sampling, shader, multicolor gradient or new photograph. |
| [Matthew typography](https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation), 20.434s | Overview leads into oversized name behind portrait; vertical type/portrait sequencing; high-contrast act change; floating project-row image; large contact typography | Semantic headline masks and portrait settling; case-study heading/cover motif; contact line reveal. No fake intro loader, marquee repetition or reference identity. |
| [Vadim spatial work](https://dribbble.com/shots/27807157-Vadim-Carazan-Portfolio), 34.284s | Portrait resolves from image field; camera travels through depth; selected piece opens an anchored detail panel; returns to field | Three actual featured projects become a short CSS perspective stack with scroll-linked depth, accurate project progress controls, native case links. Interpret spatial relationships, not 1,139-image portrait/WebGL installation. |
| [Anfalova studio](https://dribbble.com/shots/27820202-Website-Design-Design-Studio-Portfolio), 41.334s | Product objects rotate/settle between clear typographic acts; local square pattern bridges sections | One finite geometric pixel-edge handoff to navy capabilities, using palette-derived rectangles, not a permanent background, third-party 3D objects, pricing or studio claims. |

## Storyboard and priorities

See motion-storyboard.svg for the scene map. Every item consumes actual DOM content and current project data.

| Priority / scene | Trigger and choreography | Timing / limits | Keyboard, touch, reduced motion |
| --- | --- | --- | --- |
| P0: shared motion lifecycle | Early capability flag, scoped animations, one shared reveal observer, passive scroll/rAF, visible-tab handling | Central tokens; cancel/reset on preference change and cleanup; no per-frame React state | No JS means static visible content; keyboard actions instant; reduced means no spatial/pinned/pointer choreography |
| P1 signature: hero | Name lines translate through fixed masks; portrait settles behind two burgundy curtains; role/actions stage together | 700–850ms desktop, 450–550ms mobile, 60–70ms line offset; no blocking overlay | One semantic H1; real links usable immediately; static final composition without JS/reduced |
| P1 signature: reactive portrait | Bounded light/ring inside portrait tracks pointer; shallow CTA displacement | <=10px asset tilt/offset, no blur/backdrop capture, finite spring settling, fine pointer only | Pointer decoration contains no information; focus outline/native activation equal; absent touch/reduced |
| P1: hero → work | Owned hero layer recedes slightly as first media approaches | At most 24px travel / scale .97; native scroll | Disabled for coarse pointer, keyboard and reduced; no forced scroll |
| P1 signature: work stack | Three real HTML project chapters approach/overlap in a short sticky CSS perspective stack, retaining logical DOM order | <=three viewport spans, 3 cards, scale floor .94, rotations <=6deg; accurate index/progress | Explicit project selection buttons, focus reveals corresponding chapter; static stacked cards on small/coarse/reduced/no-JS; no wheel interception |
| P1: project pointer | Shallow perspective on media surface while hovered, returning from current position | <=4deg, <=8px, only active/visible target, no loop at rest | All names/summary/links always exposed; visible focus and press equivalent |
| P1: explorer filter | Immediate state/URL/count update; FLIP existing positions and stage new media | 240–280ms, cancel/retarget rapid changes, four records only | Keep filter focus; keyboard/reduced instant, history/reload unchanged; all static content without JS |
| P2: case handoff | Shared named cover where supported; masked title and anchored cover entry | 250–300ms navigation, <=650ms first-entry storytelling | Native URLs/back/refresh; graceful static fallback; no routing/library conversion |
| P2: gallery | Directional image settle inside reserved frame, native zoom opening anchored to image | 180–220ms; navigation and focus never delayed | Native controls, arrows, Escape and focus return preserved; instant reduced/keyboard |
| P2: geometric act change | One row of local navy pixel blocks joins light work to capabilities | Finite <=700ms including stagger; scoped <=64px band | aria-hidden, pointer-events none; static navy edge reduced/no-JS |
| P2: nav/capability | Menu enters from header edge; disclosure icon/content respond to direct activation | 160–220ms, interruption safe, no animated height | Immediate focus and Escape; native details; keyboard/reduced snap |
| P2: about/contact | Heading masks, quiet readable body; final invitation/arrow and truthful clipboard status | <=550ms once, 120–180ms feedback, no fabricated timeline | Body text never concealed; email selectable; actual copy success/failure retained |

## Implementation and performance budget

Keep CSS and WAAPI; no added animation library is justified for three media surfaces and four filter records. Use transforms/opacity and overflow masks, reserving clip-path only if visually essential and profiled. Avoid parent CSS-variable writes driving descendants. Sticky scenes use CSS/native scrolling with scroll-sampled transforms; no prevented wheel/touch scrolling, virtual scroller or artificial delay. Pointer animation owns a nested decorative layer so scroll/reveal effects cannot overwrite each other's transform.

Budget: no continuous idle work; zero active loops while hidden/offscreen/reduced; <=one pending frame per scheduler; <=three transformed project layers. Aim JS gzip increase <=10kB over remeasured M9 80.08kB and mobile Lighthouse >=90, CLS <.1, LCP near/below2.5s. Compare actual results with M9 reports, not assumed M8 scores. No claim of field INP or guaranteed60fps. If an effect exceeds budget, reduce its scope before accepting it.

Risks: sticky focus/zoom and clipped type; must test native200% and force static fallback for short/small viewports. Multiple transform owners; use nested layers and cleanup. Rapid filter/gallery inputs; measure live position and cancel preceding animation. Device capabilities change; subscribe to media/preference/visibility and restore final state. Hydration flash; early root capability flag and semantic static defaults. Real phones/screen readers unavailable here; emulation/code checks cannot establish their physical behavior.

## Baseline and release evidence

M9 reruns npm run verify and captures desktop/mobile default-motion recordings of hero, anchors, selected work, filters, case entry, gallery and menu. Fresh Lighthouse reports use motion-before-* and preserve M8 reports. Final matching route/scenario recordings use after/; intermediate M11–13 clips provide visual checkpoints. Nine static reduced-motion baselines remain separate from motion evidence. Each milestone record includes actual commands/results, shortcomings and its introducing commit.
