# Editorial engineering portfolio

The active design specification is [docs/design/design-system.md](docs/design/design-system.md). The execution contract is [CODEX.md](CODEX.md).

Five brand colors: burgundy **#890620**, slate **#767B91**, white **#FFFFFF**, navy **#011936**, ink **#03191E**. Secondary surfaces and readable muted text derive from these colors. Light mode is primary, with navy capabilities/contact and an ink footer. Actual project screenshots retain their own colors.

One self-hosted Archivo variable font carries the large identity and readable body. A burgundy aperture frames the owned portrait. PesoFlow's mobile screens lead the selected-work composition; PokeChamp and PixelTools form offset browser spreads. Native disclosures expose technical depth; the closing invitation opens a real email draft.

Tokens live in src/styles-tokens.css. Layout/CSS are split into foundation, hero, work, case-study and life sections. Motion uses CSS and one shared IntersectionObserver/WAAPI hook, with native scrolling and a static reduced-motion equivalent. No animation library or continuous background effect.

See [reference analysis](docs/design/reference-analysis.md), [motion inventory](docs/design/motion-spec.md), [contrast](docs/design/contrast.md), [media provenance](docs/design/media-provenance.md), and [design audit](docs/verification/design-audit.md) for decisions and evidence. The prior warm-earth system is retained in Git history.
