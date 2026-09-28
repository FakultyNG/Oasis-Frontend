# Oasis Prototype QA

## Milestone 10 scenarios

### Scenario A — Regular booking

**Pass.** Regular login, HydraFacial discovery, appointment selection, centralized 5% deposit calculation, booking detail, and rescheduling are connected. Rescheduling preserves the paid deposit.

### Scenario B — Gold activation

**Pass.** A Regular member sees the Skin Journey gate, can open Membership, simulate funding the ₦500,000 Gold threshold, activate Gold, and view the Gold membership card. Funded value remains in the wallet.

### Scenario C — Gold completion and rewards

**Pass.** Gold booking deposits are deducted from the persisted wallet. Confirmed bookings expose a prototype completion action; completion changes the booking status and awards CashPoints to the persisted rewards ledger.

### Scenario D — Black privileges

**Pass.** Northwest Fuel displays priority service plus the Black 5% benefit. The Black home concierge opens the Black-only VIP lounge experience. Regular and Gold users receive a locked VIP state.

### Scenario E — Skin Journey

**Pass.** Skin Passport, camera/demo scan, interactive Skin Twin, treatment recommendation, recommended-treatment booking, and progress reveal are connected. Camera captures persist as the Skin Twin; demo scans use the supplied demo portrait.

## Release checks

- TypeScript strict check passes
- ESLint passes
- Production build passes
- PWA manifest and service worker are present
- All prototype data remains local and simulated
- No real payments, diagnosis, authentication, messaging, or partner integrations are used
