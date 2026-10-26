# Motion inventory and budget

No animation dependency. CSS/WAAPI + one shared reveal IntersectionObserver. Native scrolling; M12 adds a short desktop CSS sticky stack, with no scroll locking or wheel interception. Visible default content; enhance only after JS initialization. Main CTA works during entrance. Fine-pointer lens only if measured cheap; no live backdrop capture. Prefer bounded image displacement over an expensive lens.

| Scene | Purpose / trigger | Duration and curve | Touch / reduced-motion / budget |
| --- | --- | --- | --- |
| Intro title lines | Establish identity on first render | 650ms cubic-bezier(.23,1,.32,1), 60ms stagger | Reduced: static; transform/opacity only, no loader |
| Portrait entrance | Connect identity to owned portrait | 700ms, max 80ms delay | Static reduced; fixed dimensions |
| Nav indicator | Current location, observer | 180ms opacity/transform | No hover dependency; aria-current |
| Progress rule | Show reading position | RAF transform scaleX, passive scroll | Omit reduced; no React per-frame state |
| Project spread | Direct attention as it enters | 600ms, 12px translate, once | Same stacked touch view; static reduced; unobserve after reveal |
| Media hover | Hint case study destination | 350ms scale 1.025 and arrow displacement | Fine pointer only; focus outline equivalent; no hidden information |
| Filters | Immediate content choice | 150ms controls, no result delay | Native buttons, aria-pressed; static reduced |
| Capability disclosure | Reveal depth when asked | Native details, icon rotation 180ms | Native touch/keyboard; static reduced |
| Gallery | User-controlled media navigation | 180ms opacity at most | Visible next/prev, keyboard; instant reduced |
| Contact | Large link and arrow invitation | 220ms underline/arrow transform | Actual mailto; 100ms press; no loops |

## Motion review from source-read Emil and Apple guidance

| Before | After | Why |
| --- | --- | --- |
| Ambient perpetual swirls | Bounded reveal and native scrolling | Focus attention; remove idle GPU work |
| transition-all on repeated cards | Explicit transform/opacity/color | Predictable and cheap |
| Delayed form fake sending | Immediate real email action | Feedback matches actual behavior |
| Tiny hover controls | 44px controls and visible focus | Touch and keyboard equivalent |

Targets: 120–250ms ordinary feedback, 350–800ms editorial entrance. No bounce except future actual momentum gesture. No mandatory motion, loop or keyboard delay. Record measured Lighthouse and CPU traces later; never equate lab results with field INP/60fps.


## Cinematic upgrade (M09–14)

See [motion-direction.md](motion-direction.md) for reference mapping and responsive storyboard, and [motion-review.md](motion-review.md) for final animation review. Actual implementation adds: two fixed text masks (780/520ms,60ms stagger), split owned-portrait curtain (700/480ms), finite critically damped pointer follower (omega24, <=4deg /6px), hero recession (24px/.975scale), three-project native sticky depth stack (<=4deg/.95scale, large/fine/full only), immediate filters with280ms FLIP, case masks650ms, gallery180ms, native dialog220ms, one12-block geometric edge460ms+<=220ms stagger, contact mask/160ms real clipboard feedback. Quiet body/tool rows remain static.

Input modality suppresses interactive movement, with immediate keyboard/Escape/focus. A completed hero never restarts when modality/preference changes. Root preference bootstrap avoids an animated no-JS path. Mode/visibility/unmount cancels effects and resets pointer/depth layers; offscreen hero writes stop. No tracking, WebGL, animated public video, background loop, native-scroll replacement or animation library. Native cross-document fade opt-in was removed after actual baseline navigation aborts; controlled page entry remains reliable.
