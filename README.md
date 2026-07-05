# Next.js Fullstack Practice

A modern Next.js project built with the latest technologies. It demonstrates how to integrate both Prisma and Drizzle ORMs, and how to seamlessly switch between a local SQLite-like environment using PGlite and a remote serverless Postgres environment using NeonDB.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database ORMs:** [Prisma](https://www.prisma.io/) & [Drizzle ORM](https://orm.drizzle.team/)
- **Databases:** 
  - Local Dev: [PGlite](https://pglite.dev/) (Local file-based Postgres)
  - Production: [Neon Serverless Postgres](https://neon.tech/)

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Management

This project uses both Prisma and Drizzle. We have standardized the workflow with the following scripts in `package.json`:

### Prisma Scripts
- `pnpm run db:prisma:generate` - Generates the Prisma Client.
- `pnpm run db:prisma:migrate` - Creates and applies a new migration.
- `pnpm run db:prisma:push` - Pushes the schema state directly to the database without migrations.
- `pnpm run db:prisma:studio` - Opens Prisma Studio to view your data.

### Drizzle Scripts
- `pnpm run db:drizzle:generate` - Generates SQL migration files from your TypeScript schema.
- `pnpm run db:drizzle:migrate` - Applies Drizzle migrations to the database.
- `pnpm run db:drizzle:push` - Pushes changes directly to the database.
- `pnpm run db:drizzle:studio` - Opens Drizzle Studio to view your data.

## Environment Variables

To switch to your production database, simply add your Neon connection string to `.env`:

```env
DATABASE_URL="postgres://user:password@endpoint.neon.tech/neondb?sslmode=require"
```
If `DATABASE_URL` is omitted, the app will automatically default to using the local PGlite file-based database for a seamless local development experience.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/playonweb/next-practice&env=DATABASE_URL)

**Note:** The Vercel deployment will automatically build the Next.js app and run your production database migrations using the `DATABASE_URL` you provide during the setup.
