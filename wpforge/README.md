# WPForge

A production-ready website for a WordPress services studio. The project combines a
responsive Next.js marketing site with an Express API that validates and stores
contact submissions.

## Stack

- Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons
- Node.js, Express, Zod validation, Helmet, CORS, and rate limiting
- PostgreSQL in production; a JSON file store is available for zero-config local use

## Local setup

Requirements: Node.js 20.9+ and npm 10+.

```bash
cd wpforge
npm install
cp client/.env.example client/.env.local
cp server/.env.example server/.env
npm run dev
```

Open `http://localhost:3000`. The API runs at `http://localhost:5000`, with a
health check at `GET /api/health`.

To run without PostgreSQL, remove or comment out `DATABASE_URL` in `server/.env`.
The API will write submissions to `server/data/contacts.json`. That directory is
excluded from Git.

## Environment variables

### Client

- `NEXT_PUBLIC_API_URL`: public URL of the Express API.

### Server

- `PORT`: API port. Defaults to `5000`.
- `CLIENT_ORIGIN`: comma-separated allowed frontend origins.
- `DATABASE_URL`: PostgreSQL connection string. Optional locally and recommended
  for every production deployment.
- `NODE_ENV`: set to `production` in production.

The API creates the `contact_submissions` table automatically at startup.

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

Deploy `client` to Vercel or any Node.js host. Set `NEXT_PUBLIC_API_URL` to the
public API URL.

Deploy `server` to Render, Railway, Fly.io, or another persistent Node.js host.
Attach a PostgreSQL database and configure `DATABASE_URL` and `CLIENT_ORIGIN`.
Build with `npm run build -w server` and start with `npm run start -w server`.

Before launch, replace the sample domain, email, social links, portfolio imagery,
testimonials, and organization schema with the client's final content. Add a
transactional email provider if immediate lead notifications are required.

## API

`POST /api/contact`

```json
{
  "name": "Alex Morgan",
  "email": "alex@company.com",
  "service": "Plugin development",
  "message": "We need a custom integration for our member portal."
}
```

Submissions are validated, size-limited, rate-limited, and persisted. The public
API never returns stored contact records.
