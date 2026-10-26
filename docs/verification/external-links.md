# External destination check

Read-only HTTP GET on 2026-10-26 (no credentials or access-control bypass). These verify response availability, not app feature correctness or social-account ownership beyond the original portfolio source.

| Destination | Result |
| --- | --- |
| https://portfolio-toki20.vercel.app/ | 200, stays on requested origin |
| https://portfolio-flax-one-59.vercel.app/ | 200, legacy origin still responds independently |
| https://github.com/Toki001 | 200 |
| https://github.com/Toki001/pesoflow | 200 |
| https://github.com/Toki001/pokechamp | 200 |
| https://github.com/Toki001/pixeltools | 200 |
| https://github.com/Toki001/guest-reco | 200 |
| https://pokechamp-tau.vercel.app/ | 200 |
| https://pixeltool-toki.netlify.app/ | 200 |
| https://www.facebook.com/jameskier.doliguez | 200 (platform response, not an authenticated profile audit) |
| https://www.linkedin.com/in/jameskier-doliguez-6b8432413/ | 999, automated access restricted; original owner-provided destination retained |

Canonical, sitemap, JSON-LD, social metadata and local HTTPS redirect config now consistently target the user's explicit production origin portfolio-toki20.vercel.app. No primary-domain/DNS ownership or live redirect was changed. The independent legacy deployment can only be redirected or removed with owner-authorized Vercel configuration after release.

Email actions open the local mail client; no email was sent. Discord remains a plain handle because the source provides no verified profile URL. No resume or app-store URL is fabricated.
