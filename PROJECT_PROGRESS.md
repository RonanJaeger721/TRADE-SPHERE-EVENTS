# Project progress

## Milestone 1 — foundation and design

- Empty GitHub repository inspected; no existing implementation or dependencies to preserve.
- One Next.js application created, public UI and shared components implemented.
- Official supplied logo preserved, palette and responsive styles established.
- Featured-experience controls, directory search/filters/reset/empty states and event details implemented.
- Four labelled demonstration events; timestamps persist in the fixture and count down from current time.
- Initial public and future application routing; deferred routes disclose their milestone status.
- Confirmed contact: +263 78 922 9508. WhatsApp handoff uses 263789229508.
- Architecture, draft PostgreSQL schema and staged migration/security plan prepared.
- No real accounts, payments, ticket reservations, PDFs, email or scanner integration in this milestone.

## Validation

Production build passes (Next.js 16.4.0). Local preview started on port 3000 and opened in Codex. Responsive and interaction verification is in progress; release evidence will be appended before handoff.

## Next milestone

Milestone 2: authentication, organiser roles, event creation, ticket-category management, publishing/approval and ownership tests. Stop after Milestone 1 as requested in the brief.

## Local verification evidence — 12 October 2026

- Production build and TypeScript checks pass.
- 34 HTTP checks pass: 26 public/foundation routes, six representative local assets and two expected 404 responses.
- Homepage inspected at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1920px; no horizontal overflow or broken images detected.
- Browser verified featured next/previous controls, search empty state, filter reset, Bulawayo location filter, paid-event filter, category-to-filter navigation and mobile menu.
- Countdown checked before and after reload: same fixed event timestamp; timer does not reset.
- No browser warning/error logs observed on the local event detail route.
- Reduced-motion fallback reviewed in CSS. PostgreSQL draft and provider integrations are not tested or provisioned.

## Editorial redesign — 12 October 2026

User rejected the original public styling and requested a newsletter-like experience based on two supplied videos. Reviewed actual frames from WhatsApp Video 23.58.10 (interlocking hero regions) and 23.58.22 (immersive imagery contracting into an editorial frame).

Replaced the landing-page composition with an experience journal: paper masthead, cutaway photographic cover, agenda lead story and numbered shortlist, interactive scene selection, editorial letter and updates/hosting noticeboard. Updated shared navigation, footer and public route styling. Original logo and demonstration labels retained.

Motion: a brief sticky cover contracts from full bleed into an inset frame as scroll progress increases; reverse scroll restores the full scene. Featured selection changes cover photography and event link with coordinated transitions. Mood selection reveals the chosen image and its real event-detail destination. Supporting photos use bounded scroll movement where supported. Mobile uses document-flow text and a single image, with no pinned scene. Reduced motion disables the choreography and retains all controls.

Validated desktop cover progress from 0 to 1 and back to 0; featured next/previous; mood choices; mobile navigation. Responsive checks at 320, 360, 375, 390, 430, 768, 1024, 1366 and 1920px detected no overflow, broken images or mobile text/image overlap. Final production build and release verification follow below.

Milestone 1 scope remains: no account/payment/QR implementation. Updates CTA is a clearly labelled WhatsApp enquiry, not a fake email subscription.

### Editorial redesign final local gate

Production build (including official-artwork icon route), TypeScript and Git whitespace checks pass. The same 34 route/asset/404 checks pass against the final local production server on port 3003. Smooth route-transition declaration added. No database or payment capability added in this revision.
