# Design system

Approved base tokens only: burgundy #890620; slate #767B91; white #FFFFFF; navy #011936; ink #03191E. Tints derive by mixing these with white. Slate is decorative only for small text; muted body is slate mixed with ink. White is the primary canvas; selected engineering work and contact can use navy/ink. No mode toggle.

Typography: use expressive **Archivo** variable sans for display and body if official OFL font can be acquired, with system fallback. Compared with existing Geist/Jakarta, its wide, confident letterforms better carry the reference's editorial identity; one family reduces loading and visual clutter. Avoid decorative italics inside headings. Display clamp roughly 3.3–10rem, tight -.065em tracking and .9 leading; body 1rem / 1.65. Nav/labels 0.8125–0.9375rem, sentence case, no tracking. Respect text zoom.

Spacing rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px expressed in rem. Main max 1440px, gutters 20px mobile / 40px tablet / 64px desktop; gutters grow at 1920. Breakpoints 600, 768, 1024, 1280. All media grid tracks minmax(0,1fr). Full-width sections align to the same container.

Controls: native buttons/links, 44px minimum action target, visible immediate focus outlines, 100ms press feedback, no decorative dead controls. Header sticky white with actual section navigation, compact menu at <=1024, Escape/close/focus lifecycle. Project media uses authentic responsive images and editorial captions rather than boxed dashboard UI. Native details for stack capabilities. Gallery controls have explicit labels, arrow keys and status.

One border token, small control radii, soft 20px media corners with a more expressive hero aperture. No generic shadows or blurred blobs. A geometric portrait backdrop is code-native art direction, not stock filler. No claim statistics.

Contrast validation computed in M1 evidence; body text must exceed 4.5:1. Never small slate text on white or burgundy text on navy. Focus outline uses burgundy on white and white on navy.

This document and active brief supersede the prior warm-earth DESIGN.md; architecture remains unchanged. Design guidance applied from Apple Design and source-reviewed UI-UX/Hallmark/shadcn principles; script-based design generators not run.

Final implementation: Archivo variable Latin OFL is installed (100–900, 34,928 bytes). Removed unused Geist/Jakarta files, legacy icons and ambient background. The root DESIGN.md now points to this system. Mobile project captions use their own opaque rose strip so text does not overlap interface text at tablet widths.

## Phase 3 portrait replacement (M16)

The hero now uses an open asymmetric text/photograph spread: a straight rectangular owned portrait, oversized offset name lines, a separate About caption link and small burgundy identity accents. The former horseshoe frame, rounded image mask, grid, code ornament, circular lens and image-overlay action are removed. A single white side reveal and nested picture settle coordinate with name masks. Fine-pointer lighting is a faint rectangular sheen; mobile/reduced/no-JS show the same readable composition without required movement. See phase-3-motion-and-content-direction.md and milestone-16.md for decision and real before/after evidence.

## Phase 3 editorial identity and row rhythm

The navbar wordmark is the owner-requested `toki.` with a burgundy full stop, configured in siteConfig.identity.wordmark, while the real personal identity stays Jameskier Doliguez. The current favicon is an original code-native white **tk** monogram on a navy rounded square with a burgundy dot and white keyline. `src/brand/toki-symbol.svg` generates fresh toki SVG/ICO/PNG/Apple paths and a monochrome Safari mask. Conventional favicon/Apple discovery paths contain the same new symbol. Share cards and the manifest use the same identity. Approved palette and self-hosted Archivo remain.

The portrait is an owned high-resolution photograph offset beside oversized name lines, with a softly rounded mask and matching inset at all four edges. Its image box is positioned within the frame inset; it cannot extend below the bottom padding. Outer/inner radii share the same spacing variables. It has no arch, window, grid or thick colored frame. A quiet light curtain and finite masked type entry coordinate its entrance. Portrait action lives in the caption.

Capabilities and tools retain semantic details/summary and ordered-list reading order. On first ordinary scroll, a fine rule draws from the left, titles reveal through real responsive line masks, and index/category/support text arrive with a short stagger. Opening a capability adds at most 260ms of finite transform/opacity feedback across its paragraph/tags. Native state changes are immediate; rapid toggles cancel previous feedback, keyboard and reduced motion snap. Row rules are decorative. Nothing becomes a fake clickable tool or forces a scroll sequence.

## PesoFlow multi-screen preview

The current mobile gallery composes three authentic 390:844 viewports on a quiet slate/white stage, with softly rounded frames, restrained shadow and offset heights. Home and Budgets use the actual new light app; Analytics shows its actual dark theme. Desktop card selection names the zoom target. Compact screens show one readable selected phone with the retained controls/swipe. This updates the preview composition; it does not add simulated app controls or copy reference screenshots. See `../verification/pesoflow-refresh.md`.
