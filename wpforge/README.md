# WPServices

A modern, conversion-focused WordPress agency website built with Next.js 14,
TypeScript, Tailwind CSS, Framer Motion, PostgreSQL, and Prisma ORM.

## Technology

- Next.js 14 App Router and React 18
- TypeScript and Tailwind CSS
- Framer Motion and Lucide icons
- App Router API route using the Node.js runtime
- PostgreSQL with Prisma ORM
- Zod request validation

## Design system

### Color palette

- Midnight Navy `#050D20`: premium hero, process, contact, and authority surfaces
- Deep Navy `#08142D`: elevated dark cards and navigation
- Electric Blue `#1768FF`: primary CTAs, links, focus states, and active controls
- Bright Blue `#4B8DFF`: labels and secondary accents
- Cyan `#3AD8FF`: technical highlights and subtle gradients
- Ink `#0A1225`: headings and high-emphasis text
- Slate `#657089`: body copy
- Cloud `#F6F8FC`: alternating section backgrounds
- Border `#E1E7F0`: card and input boundaries
- White `#FFFFFF`: primary light surface

Navy communicates reliability and technical depth. Electric blue creates clear
conversion paths, while restrained cyan and violet service accents communicate
creativity without weakening trust.

### Typography

Inter is loaded with `next/font` to avoid layout shift.

- Hero: 48–60px / 700 / 1.06 line-height
- Section heading: 32–40px / 700
- Card title: 17–18px / 600
- Body: 13–15px / 400
- Navigation: 12–14px / 500
- Button: 14px / 600
- Label: 10–11px / 600 with increased letter spacing

### Spacing and shape

- Base spacing unit: 4px
- Section spacing: 76px mobile, 96px desktop
- Content width: 1160px with 15–22px mobile gutters
- Card padding: 22–31px
- Radii: 4px controls, 5–8px cards, circular icon treatments
- Shadows: cool navy shadows at 5–12% opacity; stronger shadows only on lead
  forms, device mockups, and featured pricing

### Reusable patterns

- `.button`: blue gradient CTA with a lift interaction
- `.section-heading`: centered eyebrow, title, and supporting copy
- `.service-card`: bordered expertise card with icon, copy, and text CTA
- `.lead-form`: high-contrast conversion form with visible focus styles
- Dark technical sections use subtle grids, dots, and radial glows

## Page structure and conversion strategy

1. **Sticky header** — concise navigation and persistent “Get a Free Quote” CTA.
2. **Hero** — outcome-led headline, two CTAs, three concise benefits, one premium
   website mockup, and a monochrome trust strip.
3. **Trust strip** — recognizable ecosystem names reduce perceived risk.
4. **Metrics** — delivery count, experience, satisfaction, and support promises.
5. **Services** — ten WordPress services with direct paths to lead capture.
6. **Portfolio** — filterable case studies with project capabilities.
7. **Process** — six transparent steps lower uncertainty about engagement.
8. **Why choose us** — performance, responsiveness, security, custom design,
   scalability, and support.
9. **Testimonials** — outcome-based fictional placeholders awaiting approved
   client quotes.
10. **Pricing** — three scope anchors with the growth plan emphasized.
11. **Insights** — expertise-focused content previews for SEO and nurturing.
12. **FAQ** — animated accordions answer common objections before the form.
13. **Lead capture** — detailed qualification form, low-risk micro-copy, and
    quantified social proof.
14. **Newsletter and footer** — retention, navigation, contact, and legal paths.

## Section-level execution

- **Header:** transparent over the hero, blurred navy after scroll, desktop CTA,
  and a keyboard-accessible mobile drawer. Keeping the quote action visible
  reduces navigation friction.
- **Hero:** spacious split composition, outcome-first headline, primary quote
  CTA, secondary portfolio CTA, three lightweight benefits, one laptop mockup,
  and ecosystem trust.
- **Trust and metrics:** compact proof immediately after the promise; animation
  is limited to one viewport reveal so numbers stay readable.
- **Services:** four-column expertise grid with color-coded icons and repeated
  “Learn More” paths. Cards lift slightly to confirm interactivity.
- **Portfolio:** image-led case studies with category filters and layout
  animation. Capability tags make relevance scannable before opening a case study.
- **Process:** six-step dark timeline that reduces project uncertainty and sets
  expectations before pricing.
- **Differentiators:** dark technical surface, short benefit statements, and
  consistent icons communicate engineering maturity.
- **Testimonials:** faces, roles, outcome-led quotes, and five-star markers
  combine identity and social proof.
- **Pricing:** three scope anchors reduce price ambiguity; the Business option is
  emphasized without using manipulative scarcity.
- **Insights:** three editorial cards demonstrate expertise and create internal
  linking opportunities for long-tail SEO.
- **FAQ:** animated accessible accordions address timeline, maintenance, editing,
  and SEO objections directly before lead capture.
- **Contact:** qualification fields balance sales context with completion rate.
  Response-time and privacy micro-copy lower perceived risk.
- **Newsletter/footer:** captures lower-intent visitors and provides complete
  service, company, resource, contact, and legal navigation.

## Motion plan

Framer Motion uses one-time viewport reveals to avoid repetitive distraction.
Portfolio filtering uses layout animations, FAQ answers animate height and
opacity, and the mobile navigation uses a compact drawer. CSS hover motion is
limited to 2–6px lifts and image scale changes. `prefers-reduced-motion` disables
nonessential animation.

## Backend architecture

`POST /api/leads` runs on the Node.js runtime:

1. Reject payloads above 32KB.
2. Validate and normalize input with Zod.
3. Silently accept honeypot submissions.
4. Reject unrealistically fast submissions.
5. Hash the client IP using `LEAD_HASH_SALT`.
6. Apply a small in-memory abuse limit.
7. Store the qualified submission through Prisma.
8. Return safe, user-readable errors without exposing internals.

Production deployments should supplement the included controls with provider
rate limiting or a shared Redis limiter, Turnstile on high-abuse forms, database
backups, and alerting for failed submissions.

### Lead model

```prisma
model Lead {
  id        String     @id @default(cuid())
  name      String     @db.VarChar(120)
  email     String     @db.VarChar(254)
  phone     String?    @db.VarChar(40)
  company   String?    @db.VarChar(160)
  service   String     @db.VarChar(120)
  budget    String?    @db.VarChar(80)
  message   String     @db.Text
  source    String     @default("website") @db.VarChar(80)
  status    LeadStatus @default(NEW)
  ipHash    String?    @db.VarChar(64)
  userAgent String?    @db.VarChar(500)
  consent   Boolean    @default(false)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

Implementation files:

- `client/prisma/schema.prisma`
- `client/prisma.config.ts`
- `client/src/lib/prisma.ts`
- `client/src/lib/lead-validation.ts`
- `client/src/app/api/leads/route.ts`

## Key implementation examples

The complete Header, Hero, Services, FAQ, and ContactForm implementation is in
`client/src/components/landing-page.tsx`. Representative patterns:

```tsx
<header className={`header ${scrolled ? "header--scrolled" : ""}`}>
  <nav aria-label="Primary navigation">
    {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
  </nav>
  <a className="button" href="#contact">Get a Free Quote</a>
</header>
```

```tsx
<div className="service-grid">
  {services.map((service) => (
    <motion.article key={service.title} {...fadeUp}>
      <service.icon aria-hidden="true" />
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </motion.article>
  ))}
</div>
```

```tsx
const response = await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...lead, consent, startedAt }),
});
```

```ts
export async function POST(request: NextRequest) {
  const parsed = leadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Check your details." }, { status: 400 });
  }
  await getPrisma().lead.create({ data: normalizedLead });
  return NextResponse.json({ message: "Thanks!" }, { status: 201 });
}
```

## Responsive behavior

- **Mobile, under 540px:** single-column content, stacked CTAs, two-field form
  rows collapse, compact device composition, and a full-width hamburger drawer.
- **Tablet, 540–780px:** one-column persuasion sections, two-column metrics and
  portfolio where space permits, centered trust and CTA content.
- **Small desktop, 780–1000px:** two-column service grid, three-step process rows,
  and compressed navigation.
- **Desktop, over 1000px:** full split hero, four-column services, three-column
  case studies/testimonials/pricing, and six-step process.

Important content order remains logical in the DOM, so responsive reflow does
not harm keyboard navigation or SEO.

## SEO, accessibility, and performance

- App Router metadata, Open Graph, Twitter cards, robots, sitemap, and JSON-LD
- One semantic `h1`, logical heading hierarchy, sections, nav, lists, and forms
- Keyboard-operable menu, filters, accordions, and visible focus rings
- Explicit labels, validation messaging, live status region, and required consent
- WCAG AA-oriented color contrast and reduced-motion support
- `next/image`, remote image sizing, static page generation, and font optimization
- Keep production imagery compressed; add final social preview artwork before launch

## Local setup

Requirements: Node.js 20+ and PostgreSQL.

```bash
cd wpforge
npm install
copy client\.env.example client\.env
npm run db:generate
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`.

Environment:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wpservices?schema=public"
LEAD_HASH_SALT="use-a-long-random-production-secret"
```

## Quality and deployment

```bash
npm run lint
npm run build
```

For Vercel, set the root directory to `wpforge/client`, configure both environment
variables, attach a managed PostgreSQL database, and run migrations during the
release workflow. Use `prisma migrate deploy` rather than `prisma migrate dev`
in production.

### Next.js 14 security note

The requested Next.js 14 constraint is implemented at `14.2.35`. Current npm
advisories classify the Next.js 14 line as vulnerable to several issues whose
official automated fix upgrades to Next.js 16. Before a public production launch,
review that constraint and preferably approve an upgrade to the current supported
Next.js release. Until then, deploy behind a managed platform/WAF, keep image
origins tightly restricted, avoid untrusted rewrites, and apply provider-level
request limits.

## Assumptions

- Portfolio items, testimonials, logos, contact details, and prices are placeholders.
- Pricing uses custom quotes because final scope varies substantially.
- The example domain is `wpservices.com`; replace it if the final domain differs.
- A managed PostgreSQL database is available in staging and production.
