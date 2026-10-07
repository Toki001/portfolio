---
name: Warm Editorial Engineering
colors:
  surface: '#fcf9f0'
  surface-dim: '#dddad1'
  surface-bright: '#fcf9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ea'
  surface-container: '#f1eee5'
  surface-container-high: '#ebe8df'
  surface-container-highest: '#e5e2da'
  on-surface: '#1c1c17'
  on-surface-variant: '#414846'
  inverse-surface: '#31312b'
  inverse-on-surface: '#f4f1e8'
  outline: '#717976'
  outline-variant: '#c1c8c4'
  surface-tint: '#43655c'
  primary: '#00241d'
  on-primary: '#ffffff'
  primary-container: '#183a32'
  on-primary-container: '#81a499'
  inverse-primary: '#aacec3'
  secondary: '#9f4123'
  on-secondary: '#ffffff'
  secondary-container: '#fd8865'
  on-secondary-container: '#732105'
  tertiary: '#122316'
  on-tertiary: '#ffffff'
  tertiary-container: '#27382a'
  on-tertiary-container: '#8ea28f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5eade'
  primary-fixed-dim: '#aacec3'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#2b4d44'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb59f'
  on-secondary-fixed: '#3a0a00'
  on-secondary-fixed-variant: '#802a0e'
  tertiary-fixed: '#d3e8d4'
  tertiary-fixed-dim: '#b8ccb8'
  on-tertiary-fixed: '#0e1f13'
  on-tertiary-fixed-variant: '#394b3c'
  background: '#fcf9f0'
  on-background: '#1c1c17'
  surface-variant: '#e5e2da'
typography:
  display:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Geist
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
  code-snippet:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style

This design system expresses the discipline, rigor, and craft of modern software engineering through the warmth and tactile dignity of architectural print and editorial publication. It discards cold, hyper-saturated developer aesthetics—such as electric cyans, neon purples, and pitch-black themes—in favor of an earthy, grounded, organic palette dominated by deep forest greens, warm parchment papers, weathered sage washes, and focused bursts of terracotta.

The aesthetic philosophy fuses **Minimalism** with **Tactile Editorial Architecture**:
- Structural layouts prioritize balanced negative space, rigorous modular baselines, and deliberate pacing between dense telemetry blocks and long-form narrative case studies.
- Line work is quiet, structural, and precise, resembling high-grade architectural drafts and classic stationary rather than digital wireframes.
- The tone conveys maturity, serene technical authority, intentionality, and quiet mastery.

## Colors

The system is strictly light mode, built around warm paper layers, dense natural foliage tones, and sunbaked clay highlights.

### Semantic Mapping
- **Canvas / Page Background (`#F4F1E8`)**: Warm parchment tone. Establishes an analog, non-fatiguing baseline across all viewports.
- **Surface Elevation 1 / Cards (`#FFFDF8`)**: Warm porcelain white, offering crisp yet soft figure-ground contrast over parchment.
- **Surface Elevation 2 / Large Panels (`#DDE7DC`)**: Soft sage wash used to group thematic project suites, experience timelines, and architectural diagrams.
- **Inverted Surface / Dark Contact Card (`#15342D`)**: Deep evergreen base reserved for the signature closing call-to-action block, terminal displays, and critical system badges.
- **Primary Text (`#183A32`)**: Deep forest green functioning as absolute black. Provides maximum optical density while retaining an organic temperature.
- **Secondary Text (`#66766E`)**: Muted eucalyptus for metadata, timestamps, secondary navigation links, and code commentary.
- **Borders & Dividers (`#D5D9D2`)**: Warm gray-green for hairline separations and modular grids.
- **Interactive Accent / Brand Primary (`#D96C4B`)**: Sunbaked terracotta. Used exclusively for primary interactive triggers, inline highlights, commit status points, and active tabs.
- **Subtle Accent (`#A9BDAA`)**: Soft sage used for badge fills, secondary pill tags, and muted track lines.

## Typography

The type system blends the surgical, monoline discipline of **Geist** with the warm, human cadence of **Plus Jakarta Sans**. 

- **Geist (Display, Headlines, Labels, Metadata)**: Imparts structural authority and technical precision. Large headlines utilize a tight negative tracking (`-0.02em` to `-0.03em`) to mimic publication titleplates. Labels and uppercase categorizers leverage wide letter-spacing (`0.06em` to `0.08em`) to preserve legibility at small scales.
- **Plus Jakarta Sans (Body text, Long-form narratives, Bio)**: Generates exceptional reading comfort with its open counters, humanist terminals, and generous vertical line-height.
- Numbers, dates, and metrics default to tabular or proportional figures with optical kerning to retain structural column alignment.

## Layout & Spacing

The portfolio is structured around a 12-column fixed-max hybrid grid locked to a max width of `1240px`, centered within the viewport.

### Breakpoints & Layout Adapters
- **Desktop (1024px and above)**: 12-column grid, `1.5rem` (24px) gutters, and minimum outer padding of `3rem` (48px). Multi-column bento modules, alongside split-pane architecture diagrams.
- **Tablet (768px – 1023px)**: 8-column grid, `1.25rem` (20px) gutters, and `2rem` (32px) margins. Side-by-side elements collapse to asymmetrical paired containers.
- **Mobile (below 768px)**: 4-column grid, `1rem` (16px) gutters, and `1.25rem` (20px) outer margin. High-density cards stack vertically into singular focused narratives.

### Spacing Rhythm
Vertical cadence relies on clear optical tiers:
- Related metadata items inside cards utilize `space-xs` (6px) or `space-sm` (12px).
- Internal card padding strictly enforces `space-md` (20px) on mobile and `space-lg` (32px) on desktop.
- Inter-section spacing and major grouping panels leverage `space-xl` (56px) or multi-tier multiples (`space-xl` + `space-lg` = 88px) to introduce editorial quiet and clarity.

## Elevation & Depth

This system avoids synthetic digital dropshadows and heavy blur blurs. Instead, visual hierarchy is grounded through **Tonal Stacking**, **Fine Structural Linework**, and **Subtle Warm Ambient Shadows**.

### Elevation Hierarchy
- **Level 0 (Parchment Base - `#F4F1E8`)**: The boundless foundation layer. Carries ambient site content, header lines, and root typography.
- **Level 1 (Structural Tint Panels - `#DDE7DC`)**: Large framing enclosures used to anchor complex modules (e.g., project case studies, repository graphs). No shadow. Defined purely by 1px borders in `#D5D9D2`.
- **Level 2 (Floating White Cards - `#FFFDF8`)**: Elevated work cards, technical stacks, and article nodes. Styled with a 1px solid border (`#D5D9D2`) and an ambient, warm tinted shadow:
  - `box-shadow: 0 1px 3px rgba(24, 58, 50, 0.04), 0 8px 24px -4px rgba(24, 58, 50, 0.06);`
- **Level 3 (Interactive / Hovered Cards)**:
  - Slight optical lift: `box-shadow: 0 2px 6px rgba(24, 58, 50, 0.05), 0 16px 32px -8px rgba(24, 58, 50, 0.08);`
  - Subtle border accent shift from `#D5D9D2` to a 50% opacity blend of `#A9BDAA`.
- **Inverted Dark Elevation (Closing Contact Hero - `#15342D`)**: A bold anchor anchored at the conclusion of the page. Styled with a subtle warm terracotta inner contour:
  - `box-shadow: inset 0 1px 0 rgba(217, 108, 75, 0.25), 0 12px 32px -6px rgba(21, 52, 45, 0.15);`

## Shapes

The geometry of the design system balances architectural solidity with soft organic contours. Elements employ a consistent `20px` to `24px` radius for primary modules, preventing cards from feeling rigid or industrial.

### Radius Scale
- **Base Components (Inputs, Small Tags, Buttons)**: `8px` (`0.5rem`) for disciplined interactive controls.
- **Medium Panels & Modals**: `16px` (`1rem`) for nested UI modules, floating menus, and popovers.
- **Signature Cards & Framing Panels**: `20px` to `24px` (`1.25rem` – `1.5rem`) for primary work cards, code blocks, and parent bento structures.
- **Status Pills & Micro-Badges**: Fully rounded (`9999px`) to create an immediate shape differentiation against structural rectangular cards.

## Components

### Buttons
- **Primary Action**: Terracotta background (`#D96C4B`), crisp white text (`#FFFDF8`), font Geist Medium (`14px`), `8px` border radius, padding `10px 20px`. Hover state: deepens to `#C25B3C` with smooth 150ms transition. Active: subtle scale (`0.98`).
- **Secondary / Ghost**: Warm porcelain background (`#FFFDF8`), 1px border (`#D5D9D2`), text `#183A32`. Hover: background fills with soft sage tint (`#DDE7DC`) and border shifts toward `#A9BDAA`.
- **Inverted Button (For Contact Card)**: Warm parchment background (`#F4F1E8`), forest green text (`#183A32`), hover state shifts to terracotta text (`#D96C4B`).

### Cards & Panels
- **Work Item Card**: Base surface `#FFFDF8`, 1px border `#D5D9D2`, border radius `20px`, internal padding `32px`. Header features metadata tracking in `#66766E`, headline in `#183A32`, and an inline live link badge in `#D96C4B`.
- **Large Container Grouping Panel**: Base surface `#DDE7DC`, 1px border `#D5D9D2`, border radius `24px`, internal padding `40px` (desktop) or `20px` (mobile). Contains child work cards or timeline blocks.
- **Signature Contact Card**: Deep evergreen `#15342D`, text `#FFFDF8`, muted copy in `#A9BDAA`, 1px border `rgba(255, 253, 248, 0.1)`. Features warm terracotta interactive inputs and actions.

### Chips & Badges
- **Technology Tag**: Background `#FFFDF8`, border 1px solid `#D5D9D2`, text `#183A32`, Geist font `12px`, letter spacing `0.02em`, padding `4px 10px`, radius `9999px`.
- **Status Indicator (e.g., "Available for Q3")**: Sage wash background (`rgba(169, 189, 170, 0.35)`), text `#183A32`, featuring an active pulsating terracotta status dot (`#D96C4B`, 6px).

### Input Fields & Controls
- **Form Inputs**: White background (`#FFFDF8`), border 1px solid `#D5D9D2`, text `#183A32`, placeholder `#66766E`, radius `8px`, padding `12px 16px`. Focus state triggers a clean 1.5px border in `#D96C4B` without intrusive browser glow rings.
- **Checkboxes & Radios**: 1px border in `#66766E`, rounded `4px` (checkbox) or circular (radio). Active state fills with `#183A32` featuring a sharp `#FFFDF8` inner checkmark.

### Architectural Code Block / Terminal Module
- Inline code uses Geist with subtle background wash (`#DDE7DC`) and padding `2px 6px`, radius `4px`.
- Multi-line terminal card embeds into deep evergreen (`#15342D`), with comments rendered in muted eucalyptus (`#66766E`) and operators highlighted in terracotta (`#D96C4B`).