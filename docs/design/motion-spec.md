# Motion inventory and budget

No animation dependency. CSS/WAAPI + one shared IntersectionObserver. Native scrolling; no scroll locking/pinning. Visible default content; enhance only after JS initialization. Main CTA works during entrance. Fine-pointer lens only if measured cheap; no live backdrop capture. Prefer bounded image displacement over an expensive lens.

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
