# Oasis MedSpa Membership Prototype

Mobile-first PWA prototype for the Oasis MedSpa membership experience.

## Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

- `src/app` — App Router screens and PWA manifest
- `src/components` — reusable product and shell components
- `src/domain` — types, constants, and business rules
- `src/data/mock` — prototype fixture data
- `src/repositories` — API-swappable data access contracts
- `src/stores` — persisted demo controls

Milestones are implemented and approved sequentially per the product requirements.

## Current milestone

Milestone 10 is implemented: all five PRD journeys have passed prototype QA, including booking and rescheduling, Gold activation, wallet-paid treatment completion with CashPoints, Black privileges, and the complete Skin Journey loop.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
