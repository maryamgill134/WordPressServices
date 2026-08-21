CREATE TYPE "LeadStatus" AS ENUM (
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'WON',
  'LOST',
  'SPAM'
);

CREATE TABLE "leads" (
  "id" TEXT NOT NULL,
  "name" VARCHAR(120) NOT NULL,
  "email" VARCHAR(254) NOT NULL,
  "phone" VARCHAR(40),
  "company" VARCHAR(160),
  "service" VARCHAR(120) NOT NULL,
  "budget" VARCHAR(80),
  "message" TEXT NOT NULL,
  "source" VARCHAR(80) NOT NULL DEFAULT 'website',
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "ipHash" VARCHAR(64),
  "userAgent" VARCHAR(500),
  "consent" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "leads_email_idx" ON "leads"("email");
CREATE INDEX "leads_status_createdAt_idx" ON "leads"("status", "createdAt");
