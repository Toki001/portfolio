# Design system

Approved base tokens only: burgundy #890620; slate #767B91; white #FFFFFF; navy #011936; ink #03191E. Tints derive by mixing these with white. Slate is decorative only for small text; muted body is slate mixed with ink. White is the primary canvas; selected engineering work and contact can use navy/ink. No mode toggle.

Typography: use expressive **Archivo** variable sans for display and body if official OFL font can be acquired, with system fallback. Compared with existing Geist/Jakarta, its wide, confident letterforms better carry the reference's editorial identity; one family reduces loading and visual clutter. Avoid decorative italics inside headings. Display clamp roughly 3.3–10rem, tight -.065em tracking and .9 leading; body 1rem / 1.65. Nav/labels 0.8125–0.9375rem, sentence case, no tracking. Respect text zoom.

Spacing rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px expressed in rem. Main max 1440px, gutters 20px mobile / 40px tablet / 64px desktop; gutters grow at 1920. Breakpoints 600, 768, 1024, 1280. All media grid tracks minmax(0,1fr). Full-width sections align to the same container.

Controls: native buttons/links, 44px minimum action target, visible immediate focus outlines, 100ms press feedback, no decorative dead controls. Header sticky white with actual section navigation, compact menu at <=1024, Escape/close/focus lifecycle. Project media uses authentic responsive images and editorial captions rather than boxed dashboard UI. Native details for stack capabilities. Gallery controls have explicit labels, arrow keys and status.

One border token, small control radii, soft 20px media corners with a more expressive hero aperture. No generic shadows or blurred blobs. A geometric portrait backdrop is code-native art direction, not stock filler. No claim statistics.

Contrast validation computed in M1 evidence; body text must exceed 4.5:1. Never small slate text on white or burgundy text on navy. Focus outline uses burgundy on white and white on navy.

This document and active brief supersede the prior warm-earth DESIGN.md; architecture remains unchanged. Design guidance applied from Apple Design and source-reviewed UI-UX/Hallmark/shadcn principles; script-based design generators not run.

Final implementation: Archivo variable Latin OFL is installed (100–900, 34,928 bytes). Removed unused Geist/Jakarta files, legacy icons and ambient background. The root DESIGN.md now points to this system. Mobile project captions use their own opaque rose strip so text does not overlap interface text at tablet widths.
