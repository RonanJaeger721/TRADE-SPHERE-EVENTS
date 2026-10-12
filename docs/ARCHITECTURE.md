# Trade Sphere Events — architecture and migration plan

Milestone 1 only. The repository was empty when inspected on 12 October 2026.

## Application boundaries

One Next.js App Router application contains public discovery, future organiser workflows and future administrator workflows. Server-rendered public pages share navigation, tokens and event-card components. Only feature switching, search/filter state, menu state, sharing and the countdown are client components. No account, payment or booking mutations exist in this foundation.

`lib/events.ts` is an explicitly labelled demonstration fixture, not production storage. It includes absolute ISO timestamps with UTC+2, matching Africa/Harare. Replace its read boundary with database queries after provisioning Supabase PostgreSQL. Do not migrate demonstration records as live events.

## Proposed providers

Supabase PostgreSQL and Supabase Auth; Paynow merchant integration; transactional email provider to be chosen. No provider is configured or claimed operational. Do not accept credentials in chat. Configure secrets directly in provider/environment settings.

## Data model

`database/001_foundation_draft.sql` covers profiles, organiser ownership and staff, categories, events, ticket categories, seats, bookings, booking items, active seat holds, payment attempts, tickets, atomic check-in uniqueness, sponsored placements and audit records. Store amounts as integer minor units and event timestamps as timestamptz. Schema is a draft; it has not been applied or tested against PostgreSQL.

## Migration stages and release gates

1. Provision an isolated staging Supabase project. Review this draft SQL. Apply with a migration runner and verify constraints/rollback backups. No production data yet.
2. Implement authentication and server authorization. Keep role changes admin-only. Add RLS tests for customer ownership, organiser ownership, assigned staff and administrator operations. Account self-update must never permit role changes. Approvals and audit mutations remain server-only.
3. Implement one database reservation RPC: lock relevant ticket-category rows in stable order, reclaim expired holds, enforce remaining capacity against paid inventory and unexpired reservations, validate sale windows, insert booking/items/holds in one transaction. Use server database time. Unique idempotency keys prevent duplicate bookings. Test simultaneous buyers, hold expiry and duplicate seats.
4. Integrate Paynow server-side, store attempts before initiating payments, authenticate callbacks, verify via provider poll endpoint, compare amount/currency/reference. Handle paid-after-expiry explicitly: reacquire capacity atomically or route to refund/manual reconciliation; never silently oversell. Repeated verified callbacks must be idempotent.
5. Issue one cryptographically random ticket token per admission; store hashes, not raw tokens. Generation uses unique booking-item ordinals. Confirm payment and ticket issuance in an atomic/idempotent path. Email failure leaves a recoverable ticket record and retry state. Add PDF and mobile ticket views.
6. Check-in function verifies staff assignment and event, locks the ticket row, checks paid/issued status, records operator/time, and atomically inserts the unique check-in. Reject duplicate, wrong-event, cancelled and refunded tickets. Test simultaneous scanners.
7. Complete operational dashboards, reconciliation, CSV exports, backups, rate limiting and security review. Run full payment provider test suite and browser→server→database→ticket→scanner demonstration before launch.

## Dependencies before live ticketing

Merchant approval and Paynow test credentials; Supabase project; transactional email configuration; approved terms/privacy/refund policy; confirmed revenue recipient, organiser settlement, fees and refund responsibility; genuine event records and approved venues/prices. Do not enable real payment channels before merchant confirmation.

## Scope and estimates

Milestones 2–7 follow the supplied brief. The supplied 7–8 week plan is a planning estimate, not a guaranteed delivery date. Advanced venue tools, automated payouts, marketing automation and additional gateways are deferred. Development budget, domain, paid hosting, email, gateway fees and maintenance have not been agreed; obtain current provider quotes and client approval rather than inventing prices.

## Creative direction

Emotion: anticipation, connection and confidence. Official logo preserved from the supplied JPEG. Palette: midnight navy, royal blue, electric cyan and cool white. Type: Manrope/Inter where available with reliable system fallbacks.
Three hero concepts considered: (1) rotating globe — declined because literal geometry would add cost without aiding discovery; (2) expanding concert window — visually strong but weak for business-event breadth; (3) event orbit — selected: a photographic stage, orbit lines from the brand and a ticket-inspired annotation. Accessible controls switch meaningful featured event records. Mobile uses a stacked composition with one focused image. Reduced motion retains the entire layout.
Methods: ST-02 living subject, ST-05 asymmetric composition, ST-04 useful discovery. No long pinned scene or decorative 3D dependency.

## Supporting media

Original brand JPEG is client supplied. Supporting event photographs are illustrative Unsplash images, not evidence of Trade Sphere events: photo-1470229722913-7c0e2dbbafd3, photo-1511795409834-ef04bbd61622, photo-1540575467063-178a50c2df87, photo-1492684223066-81342ee5ff30. Obtain authentic event posters before replacing demo content. Images stored locally so the public preview does not depend on a remote image host at runtime.
