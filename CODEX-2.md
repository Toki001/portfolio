# CODEX.md — Portfolio Implementation Contract

## Mission

Turn the existing Stitch-generated portfolio into a production-ready, fully functional portfolio while preserving the supplied design **as faithfully as possible**.

This is an implementation task, not a redesign task.

The visual target is the supplied `screen(1).png`. The supplied `code.html` is the implementation/content reference, and `DESIGN(6).md` is the design-system reference.

### Source-of-truth priority

If the references disagree, use this order:

1. **`screen(1).png`** — visual truth
2. **`code.html`** — structure, copy, content, SVG paths, animations, links, and component details
3. **`DESIGN(6).md`** — tokens, typography, spacing, colors, elevation, and design rationale
4. Existing app implementation — only where it does not conflict with the references

Do not reinterpret the design into another style. Do not “improve” it by changing the composition. Do not replace the editorial/technical aesthetic with a generic developer portfolio.

---

# 1. Non-Negotiable Visual Fidelity

Reproduce the supplied screen with the same visual identity and proportions.

## Core palette

Use these values exactly unless the supplied implementation already expresses the same value through a token:

```ts
background: "#F4F1E8"
surface: "#FFFDF8"
primary: "#183A32"
primaryDark: "#15342D"
secondary: "#D96C4B"
secondaryHover: "#C25B3C"
muted: "#66766E"
sage: "#A9BDAA"
sagePanel: "#DDE7DC"
border: "#D5D9D2"
```

Do not introduce:
- blue/purple gradients
- neon colors
- glassmorphism
- dark mode
- generic SaaS styling
- oversized decorative blobs
- new card styles that do not exist in the reference

## Typography

Use:

- **Geist** for headings, labels, navigation, metadata, and technical/monospace-like UI
- **Plus Jakarta Sans** for body text and long-form copy

Important sizing from the design specification:

```txt
Display desktop: 56px / 64px / 600 / -0.03em
Display mobile: 38px / 44px / 600 / -0.025em
Headline large: 36px / 44px / 600 / -0.02em
Headline medium: 26px / 34px / 500 / -0.015em
Headline small: 20px / 28px / 500 / -0.01em
Body large: 18px / 30px / 400
Body medium: 15px / 24px / 400
Body small: 13px / 20px / 400
Label medium: 12px / 16px / 600 / 0.06em
Label small: 11px / 14px / 500 / 0.08em
```

Do not substitute a different visual font unless the current framework makes loading these fonts impossible.

## Layout

Target the same layout shown in `screen(1).png`:

- sticky top navigation
- centered max-width content canvas
- parchment background visible around cards
- modular white cards
- 12-column desktop compositions
- compact technical metadata labels
- generous vertical spacing
- project carousel
- 3-column competencies grid on large screens
- tools/workbench list
- about/experience card
- split contact area
- technical footer

Maintain approximately the same spacing rhythm:

```txt
Desktop gutter: 24px
Tablet gutter: 20px
Mobile gutter: 16px
Desktop outer margin: 48px
Tablet outer margin: 32px
Mobile outer margin: 20px

space-xs: 6px
space-sm: 12px
space-md: 20px
space-lg: 32px
space-xl: 56px
```

## Radius and elevation

Main section cards:
- `24px` radius

Nested work/project cards:
- `20px` radius

Controls:
- approximately `8px` radius

Primary card shadow:

```css
box-shadow:
  0 1px 3px rgba(24, 58, 50, 0.04),
  0 8px 24px -4px rgba(24, 58, 50, 0.06);
```

Hover card shadow:

```css
box-shadow:
  0 2px 6px rgba(24, 58, 50, 0.05),
  0 16px 32px -8px rgba(24, 58, 50, 0.08);
```

Dark contact card:

```css
box-shadow:
  inset 0 1px 0 rgba(217, 108, 75, 0.25),
  0 12px 32px -6px rgba(21, 52, 45, 0.15);
```

Do not replace these with heavy blur shadows.

---

# 2. Preserve the Screen Structure

The finished page must keep these sections and their order.

## Header

The sticky header must include:

- JD/initials brand badge
- configured name
- configured short role line such as `[ mobile • web • ai ]`
- centered desktop nav:
  - Home
  - Projects
  - Tech Stack
  - Tools
  - About
  - Contact
- social buttons:
  - GitHub
  - LinkedIn
  - Facebook
  - Discord
- Get in Touch button
- working mobile menu button and drawer

The current generated HTML references a mobile drawer but does not provide a reliable complete toggle implementation. Fix this in the production implementation.

## Hero / Home

Preserve the top bento composition:

### Main profile card
- `[ profile ]`
- `00 // PROFILE`
- initials badge
- name
- professional title
- large hero statement
- supporting paragraph
- View Projects
- Get in Touch
- social icon buttons

### Right-side status cards
- Location
- Current Focus
- Currently Building

These values must come from `config/site.ts`.

### Disciplines card
Keep the section:

> I like building products that solve real problems.

with three configurable cards:
- Mobile Development
- Web Development
- AI / Machine Learning

## Projects

Preserve:

- `[ projects ]`
- `02 // CASE STUDIES`
- deployed/specification count
- previous/next controls
- `Featured Projects & Software`
- descriptive subcopy
- horizontally scrollable project cards
- project image
- index badge
- status/version badge
- category metadata
- title
- description
- technology chips
- status text
- source/demo/live links
- navigation dots
- bottom helper copy

Initial reference projects are:

1. PesoFlow
2. AgroScan
3. PulseHub
4. CloudMetrics

These are only default content values. The UI must be generated from the project array in `config/site.ts`.

## Tech Stack

Preserve:

> Technological Competencies & Ecosystem

and six configurable domain cards:

1. Cross-Platform Mobile
2. Modern Web Development
3. Backend & Cloud Services
4. AI & Machine Learning
5. DevOps, Version Control & Quality
6. System Architecture & Optimization

Each domain must support:
- index
- category
- icon
- title
- description
- technology tags
- footer summary

## Tools

Preserve the workbench section and table/list treatment.

Default rows:
- VS Code & Cursor
- GitHub & Git CLI
- Figma
- Supabase & Firebase Console
- Claude / OpenAI
- Postman

Every row must be config-driven.

## About

Preserve:
- technical section metadata
- `Hi, I'm ...`
- narrative paragraphs
- specialty / focus / timezone chips
- credentials and education panel
- focus areas
- availability
- small code-snippet style identity panel
- role rows:
  - Mobile Application Developer
  - Full-Stack Web Developer
  - AI & Edge Machine Learning

Everything specific to the person must be editable in `config/site.ts`.

## Contact

Preserve:

> Let's Build Something Together

### Left card
Deep evergreen direct-channel card with:
- email
- GitHub
- LinkedIn
- Facebook
- Discord
- response copy

### Right card
Project inquiry form:
- Your Name
- Email Address
- Topic / Project Type
- Project Brief
- response-time label
- Send Message

The form must be truly functional. Do **not** leave the current `alert(...)` demo behavior as the final implementation.

## Footer

Preserve:
- initials marker
- name
- title / crafted-with copy
- indexed quick links
- copyright
- system status indicator

All user-specific footer text must be config-driven.

---

# 3. Central Configuration — REQUIRED

Create exactly:

```txt
config/site.ts
```

This file is the single source of truth for all user-editable portfolio content.

The website should be editable primarily by changing this file rather than editing components.

Do not scatter personal copy, URLs, project metadata, role descriptions, contact details, location information, or technology lists through JSX/TSX files.

## Required configuration shape

You may refine the TypeScript interfaces, but preserve these concepts:

```ts
export const siteConfig = {
  seo: {
    title: "",
    description: "",
    siteUrl: "",
    ogImage: "",
  },

  identity: {
    name: "",
    initials: "",
    shortRole: "",
    title: "",
    heroStatement: "",
    heroDescription: "",
    profileImage: "",
  },

  navigation: [
    { label: "Home", href: "#home", index: "01" },
    { label: "Projects", href: "#projects", index: "02" },
    { label: "Tech Stack", href: "#tech-stack", index: "03" },
    { label: "Tools", href: "#tools", index: "04" },
    { label: "About", href: "#about", index: "05" },
    { label: "Contact", href: "#contact", index: "06" },
  ],

  socials: {
    github: { label: "", url: "", handle: "" },
    linkedin: { label: "", url: "", handle: "" },
    facebook: { label: "", url: "", handle: "" },
    discord: { label: "", url: "", handle: "" },
  },

  location: {
    country: "",
    region: "",
    remoteLabel: "",
    coordinatesLabel: "",
  },

  currentFocus: {
    tags: [],
    architecture: "",
    research: "",
  },

  currentlyBuilding: {
    projectId: "",
    title: "",
    description: "",
    href: "",
  },

  disciplines: [
    {
      index: "01",
      category: "MOBILE",
      title: "",
      description: "",
      stackSummary: "",
      icon: "",
    },
  ],

  projects: [
    {
      id: "",
      index: "01",
      title: "",
      category: "",
      categoryLabel: "",
      statusLabel: "",
      statusTone: "",
      versionLabel: "",
      image: "",
      imageAlt: "",
      description: "",
      tags: [],
      footerLabel: "",
      links: {
        source: "",
        demo: "",
        live: "",
        docs: "",
      },
    },
  ],

  techDomains: [
    {
      index: "01",
      category: "",
      icon: "",
      title: "",
      description: "",
      tags: [],
      footer: "",
    },
  ],

  tools: [
    {
      id: "",
      icon: "",
      name: "",
      description: "",
      categoryLabel: "",
      href: "",
    },
  ],

  about: {
    sectionTitle: "",
    introHeading: "",
    paragraphs: [],
    chips: [
      { label: "", value: "" },
    ],
    education: {
      degree: "",
      school: "",
    },
    focusAreas: [],
    availability: "",
    identityCodeLines: [],
    roles: [
      {
        index: "01",
        title: "",
        stack: "",
      },
    ],
  },

  contact: {
    heading: "",
    intro: "",
    responseTime: "",
    email: "",
    directIntro: "",
    form: {
      mode: "mailto", // "mailto" | "endpoint"
      endpoint: "",
      subjectPrefix: "",
    },
  },

  footer: {
    craftedWith: "",
    copyrightName: "",
    systemStatus: "",
  },
} as const;
```

Create strongly typed types/interfaces so a malformed configuration is caught by TypeScript.

### Config rules

- Components consume `siteConfig`.
- No duplicate content constants elsewhere.
- Array counts such as project counts and domain counts should be derived automatically.
- Project carousel dots must be derived from `siteConfig.projects.length`.
- Initials can be configured directly; do not rely on fragile automatic generation.
- Links with an empty URL should either be hidden or rendered disabled intentionally, never point to fake placeholder destinations.
- Image paths must be configurable.
- Contact channels must be configurable.
- SEO title/description must be configurable.
- If the framework supports structured metadata, derive it from the config.

---

# 4. Component Architecture

Follow the existing framework instead of rewriting the project into a different framework.

Inspect the repository first.

If it is Next.js, use idiomatic Next.js components and metadata.
If it is Vite/React, use idiomatic Vite/React.
If it is another TypeScript React setup, preserve it.

Do not migrate frameworks without a strong technical reason.

Recommended logical decomposition:

```txt
config/
  site.ts

components/
  portfolio/
    Header.tsx
    FluidBackground.tsx
    SectionMeta.tsx
    Hero.tsx
    Disciplines.tsx
    Projects.tsx
    ProjectCard.tsx
    TechStack.tsx
    ToolsWorkbench.tsx
    About.tsx
    Contact.tsx
    Footer.tsx
```

Names may vary to fit the repository, but avoid one giant page component.

Keep repeated styles/components reusable where doing so does not alter fidelity.

---

# 5. Functional Requirements

Every visible interactive control in the screenshot must do something correct.

## Navigation

Implement:
- smooth anchor scrolling
- sticky-header offset
- correct URL hashes
- active nav state based on the section in view
- keyboard-accessible links
- mobile drawer
- drawer closes after navigation
- drawer closes with Escape
- sensible focus behavior

Use `IntersectionObserver` or equivalent for section-aware navigation.

## Header social buttons

- Read URLs from `siteConfig.socials`.
- External URLs open in a new tab.
- Add `rel="noopener noreferrer"`.
- Add proper accessible labels.
- Hide social items with no configured URL unless Discord is intentionally displayed as a handle-only item.

## CTA buttons

- View Projects scrolls to `#projects`.
- Get in Touch scrolls to `#contact`.
- Currently Building `View →` navigates to its configured project or href.

## Project carousel

This must be a real reusable carousel/scroll rail, not hard-coded `scrollTo(380)` calls.

Required:
- generated from `siteConfig.projects`
- responsive card width
- native touch/swipe scrolling
- scroll-snap
- previous button
- next button
- navigation dots
- active dot updates as the user scrolls
- click a dot to reach that project
- controls work after adding/removing/reordering projects in config
- keyboard-friendly behavior
- no magic pixel offsets tied to exactly four cards
- first/last state should be visually clear
- preserve the exact screenshot appearance

Do not add a bulky third-party carousel library unless the project already uses one.

## Project links

Support configurable:
- Source
- Demo
- Live App
- Docs
- Weights or similar labels if needed

Only render links that exist.

## Contact form

Replace the fake `alert(...)` submission.

Support two modes through `siteConfig.contact.form.mode`:

### `mailto`
Works with no backend:
- validate required fields
- build a properly URL-encoded subject/body from form data
- open the configured email address using a `mailto:` URL
- show a small success/instruction state rather than an alert

### `endpoint`
For services such as a server route or form provider:
- POST the form values to `siteConfig.contact.form.endpoint`
- show sending state
- disable the button while sending
- show success state
- show inline error state
- do not expose secrets in frontend config

Do not silently discard submissions.

## External links

- validate URLs
- no fake `https://github.com` placeholder if the user has configured a real profile
- derive all personal links from config

---

# 6. Animated Fluid Background

Preserve the supplied animated background.

The supplied HTML contains the intended forest, terracotta, and sage SVG paths and animation behavior. Reuse those paths and motion rather than approximating them with unrelated decoration.

Keep:
- forest flowing curves
- terracotta accent curves
- sage contour ribbons
- spiral nodes
- floating loop strands
- slow independent motion
- fixed full-screen positioning
- pointer-events disabled
- content above the SVG

Animation timing should remain in the same restrained range:
- ~26s to ~45s
- slow ease-in-out or linear where appropriate

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* all background motion off */
}
```

The background must not interfere with scrolling, clicking, focus, text contrast, or mobile performance.

---

# 7. Responsiveness

The supplied desktop composition must adapt cleanly.

## Desktop
`>= 1024px`
- 12-column layout
- full top nav
- social buttons visible
- wide bento compositions
- 3 tech cards per row where space permits

## Tablet
`768px–1023px`
- reduced gutters
- paired cards where appropriate
- avoid cramped metadata

## Mobile
`< 768px`
- compact header
- working menu
- one-column primary cards
- readable project rail
- no horizontal page overflow
- maintain card radii and editorial feeling
- ensure buttons remain tappable
- fluid background simplified only if necessary for performance

Do not simply shrink the desktop page with tiny text.

---

# 8. Accessibility

At minimum:

- semantic sections and headings
- all controls keyboard accessible
- visible focus states
- descriptive alt text for project images
- `aria-label` for icon-only buttons
- `aria-expanded` and `aria-controls` on mobile menu
- carousel buttons with accessible names
- form labels connected to inputs
- inline form status announced with `aria-live`
- external decorative SVG background `aria-hidden="true"`
- reduced-motion support
- no color-only status indicators without text

---

# 9. Image Handling

Use the project image shown in the reference where it is already available in the project.

Prefer stable local assets under something like:

```txt
public/images/projects/
```

over temporary generated/remote image URLs, but do not substitute different imagery just to make it local.

All image sources must be editable through `config/site.ts`.

Do not fabricate screenshots for projects.

---

# 10. SEO / Metadata

Use config values for:

- document title
- meta description
- canonical site URL if supplied
- Open Graph title/description/image
- Twitter card metadata if the framework supports it

The default current title from the reference is:

`Jameskier Doliguez — Mobile, Web & AI Developer`

but it must live in config.

---

# 11. Code Quality

Requirements:

- TypeScript where the project supports it
- no `any` unless technically unavoidable
- no duplicated personal data
- no giant hard-coded arrays inside components
- no inline `onclick` HTML handlers in the final React implementation
- no direct DOM manipulation when idiomatic React state/refs suffice
- no dead demo code
- no console errors
- no broken links caused by empty config values
- preserve existing dependencies where possible
- avoid new dependencies for trivial behavior
- keep styles maintainable
- do not over-engineer

---

# 12. Validation Before Finishing

Run the repository's relevant checks.

At minimum, where scripts exist:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

or the package-manager equivalents.

If a script does not exist, do not invent a failing command; report it.

Also verify:

- page renders
- no horizontal overflow at mobile widths
- every header/nav link works
- mobile menu works
- active navigation updates
- project arrows work
- project dots work
- touch scrolling works
- external social links use config
- contact form mailto mode works
- endpoint mode is implemented safely
- adding a fifth project in config does not require component changes
- deleting a social URL does not leave a fake link
- reduced motion disables SVG animation
- build succeeds

If browser automation or screenshot tooling already exists in the repository, compare the implementation against `screen(1).png` at the closest matching viewport and correct obvious visual drift before finishing.

---

# 13. Scope Guardrails

Do not add unrelated features.

Do not add:
- authentication
- CMS
- database
- blog
- analytics dashboard
- theme switcher
- dark mode
- admin panel
- unnecessary backend
- large UI library solely for these sections

The objective is:

**Make the supplied portfolio exact, configurable, responsive, accessible, and functional.**

---

# 14. Completion Report

When finished, report:

1. what files were changed
2. where `config/site.ts` is
3. which content can now be edited there
4. how the contact form works
5. how the project carousel works
6. validation commands run and results
7. any reference detail that could not be reproduced exactly, with the reason

Do not claim pixel-perfect fidelity unless you actually verified it.
