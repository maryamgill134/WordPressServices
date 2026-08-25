export type ServiceIcon =
  | "layout"
  | "wordpress"
  | "store"
  | "learn"
  | "cart"
  | "book"
  | "palette"
  | "tags"
  | "ruler"
  | "plugin"
  | "globe"
  | "refresh"
  | "transfer"
  | "wrench"
  | "layers"
  | "users"
  | "developer"
  | "specialist"
  | "sparkles"
  | "landing"
  | "gauge"
  | "vitals"
  | "code"
  | "bot"
  | "search";

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  benefit: string;
  icon: ServiceIcon;
  isNew?: boolean;
  overview: string;
  problems: string[];
  included: string[];
  benefits: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export type ServiceCategory = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  isNew?: boolean;
  why: { title: string; text: string }[];
  process: { n: string; title: string; text: string }[];
  technologies: string[];
  services: ServiceItem[];
};

export type ServicePillar = {
  slug: "build" | "manage" | "enhance";
  kicker: string;
  title: string;
  description: string;
  categories: ServiceCategory[];
};

const defaultProcess = [
  { n: "01", title: "Discover", text: "We clarify goals, constraints, and the current WordPress setup before recommending a path." },
  { n: "02", title: "Plan", text: "You receive a scoped plan, timeline, and the technical approach we will use." },
  { n: "03", title: "Build", text: "We implement with clean, maintainable WordPress architecture and regular progress reviews." },
  { n: "04", title: "Launch & Optimize", text: "We launch carefully, then refine performance, content structure, and next-step improvements." },
];

function item(service: ServiceItem): ServiceItem {
  return service;
}

export const servicePillars: ServicePillar[] = [
  {
    slug: "build",
    kicker: "BUILD",
    title: "Creation & Foundation",
    description: "Build powerful, scalable WordPress experiences from the ground up.",
    categories: [
      {
        slug: "setup",
        label: "SETUP",
        title: "WordPress Setup Services",
        summary: "Launch a production-ready WordPress, WooCommerce, or LearnDash foundation with the right architecture from day one.",
        icon: "wordpress",
        why: [
          { title: "Expert WordPress Development", text: "Senior specialists who work in WordPress every day, not as a side skill." },
          { title: "Conversion-Focused Design", text: "Pages structured to guide visitors toward enquiry, purchase, or enrolment." },
          { title: "Performance Optimized", text: "Lean themes, careful assets, and hosting choices that keep Core Web Vitals healthy." },
          { title: "Scalable Architecture", text: "Setups that can grow into stores, memberships, or custom features without a rebuild." },
        ],
        process: defaultProcess,
        technologies: ["WordPress", "WooCommerce", "LearnDash", "Elementor", "PHP", "JavaScript"],
        services: [
          item({
            slug: "custom-websites",
            title: "Custom Websites",
            short: "Build a powerful website around your brand, offer, and conversion path.",
            benefit: "A site that looks premium and is structured to generate enquiries.",
            icon: "layout",
            overview: "We design and develop custom WordPress websites for businesses that need more than a generic template. The work covers information architecture, visual system, reusable blocks, and a content model your team can actually manage.",
            problems: ["Outdated or generic websites that fail to represent the brand", "Unclear service pages that do not convert", "Themes that break when content is edited", "No mobile-first structure or lead path"],
            included: ["Discovery and sitemap", "Custom WordPress theme or block build", "Responsive layouts", "Core pages and conversion paths", "CMS training", "Launch checklist"],
            benefits: [
              { title: "Brand-led design", text: "Visual language that feels considered, not templated." },
              { title: "Editable structure", text: "Reusable blocks so your team can publish without a developer." },
              { title: "Clear conversion path", text: "Every key page points toward a next step." },
              { title: "Room to grow", text: "Architecture that can later support commerce, LMS, or integrations." },
            ],
            faqs: [
              { q: "Do you start from a theme or from scratch?", a: "Either. We recommend the fastest path that still meets design, performance, and editing requirements." },
              { q: "Can we update the site ourselves?", a: "Yes. We build with reusable blocks and include a short handoff session." },
              { q: "How long does a custom website take?", a: "Most marketing websites take 4–8 weeks depending on content, integrations, and review cycles." },
            ],
          }),
          item({
            slug: "wordpress-setup",
            title: "WordPress Setup",
            short: "Install, configure, and harden WordPress so it is ready for real work.",
            benefit: "A clean, secure baseline instead of a messy default install.",
            icon: "wordpress",
            overview: "WordPress Setup covers installation, essential configuration, security basics, permalinks, environments, and the plugins your project actually needs. The result is a stable starting point for design and content.",
            problems: ["Rushed installs with unused plugins and weak security", "No staging environment", "Broken permalinks or mixed HTTP/HTTPS", "No backup or update process"],
            included: ["WordPress installation", "Environment and permalink setup", "Essential plugin stack", "Security hardening", "Backup configuration", "Admin orientation"],
            benefits: [
              { title: "Clean foundation", text: "Only the plugins and settings the project needs." },
              { title: "Safer defaults", text: "Hardening, HTTPS, and sensible user roles from the start." },
              { title: "Faster next phase", text: "Design and content can begin on a stable install." },
              { title: "Handover ready", text: "Your team knows where content, settings, and backups live." },
            ],
            faqs: [
              { q: "Can you set WordPress up on our existing hosting?", a: "Yes. We work with managed WordPress hosts and standard cPanel or cloud environments." },
              { q: "Is this enough to go live?", a: "It is the technical foundation. Design, content, and conversion work usually follow." },
              { q: "Do you migrate existing content during setup?", a: "Basic content can be included. Larger migrations are scoped under our Migrate services." },
            ],
          }),
          item({
            slug: "woocommerce-setup",
            title: "WooCommerce Setup",
            short: "Configure a store that is ready for products, payments, and shipping.",
            benefit: "A shop foundation that checkout and catalog work can build on.",
            icon: "cart",
            overview: "We set up WooCommerce with the catalog structure, tax, shipping, payments, and store settings your business needs. The goal is a store that is operationally correct before visual polish and conversion work.",
            problems: ["Stores that cannot take payment reliably", "Confusing shipping or tax settings", "Product types that do not match the catalog", "Checkout fields that create drop-off"],
            included: ["WooCommerce installation", "Product types and categories", "Payment gateway setup", "Shipping and tax configuration", "Essential store pages", "Test order walkthrough"],
            benefits: [
              { title: "Operational store", text: "Payments, shipping, and product types configured correctly." },
              { title: "Cleaner catalog", text: "Categories and attributes that scale as you add products." },
              { title: "Safer checkout", text: "Only the fields needed to fulfill an order." },
              { title: "Admin confidence", text: "Your team can add products without breaking the shop." },
            ],
            faqs: [
              { q: "Which payment gateways do you support?", a: "Stripe, PayPal, and most major WooCommerce gateways. We confirm the right option during discovery." },
              { q: "Can you import existing products?", a: "Yes. Product imports are scoped based on catalog size and data quality." },
              { q: "Is design included?", a: "Setup covers store configuration. Theme and conversion design can be added as a related service." },
            ],
          }),
          item({
            slug: "learndash-setup",
            title: "LearnDash Setup",
            short: "Configure courses, lessons, and access so learners can start cleanly.",
            benefit: "An LMS that is structured for teaching, not just installed.",
            icon: "learn",
            overview: "LearnDash Setup gets your course architecture, user roles, progress tracking, and access rules in place. We focus on a learning path that is clear for students and manageable for your team.",
            problems: ["Courses that are hard to navigate", "Unclear drip or access rules", "No progress or certificate setup", "Membership and LMS plugins fighting each other"],
            included: ["LearnDash installation", "Course and lesson structure", "User roles and access", "Progress and certificates", "Essential LMS pages", "Instructor walkthrough"],
            benefits: [
              { title: "Clear learning path", text: "Courses that students can complete without confusion." },
              { title: "Controlled access", text: "Drip, prerequisites, and roles set with intent." },
              { title: "Admin-ready", text: "Your team can add lessons without breaking structure." },
              { title: "Room for growth", text: "Ready for memberships, bundles, or WooCommerce later." },
            ],
            faqs: [
              { q: "Can LearnDash work with WooCommerce?", a: "Yes. Course products and access can be connected to WooCommerce when needed." },
              { q: "Do you migrate existing course content?", a: "We can. Larger LMS migrations are scoped under Migrate to LearnDash." },
              { q: "Will students need training?", a: "The student experience is designed to be self-explanatory. Instructors receive a short admin walkthrough." },
            ],
          }),
          item({
            slug: "woocommerce-development",
            title: "WooCommerce Development",
            short: "Extend WooCommerce with custom product flows, checkout, and store logic.",
            benefit: "A store that matches how you actually sell, not a default shop.",
            icon: "store",
            overview: "WooCommerce Development is for stores that need custom product types, pricing, checkout, or operational workflows. We build maintainable extensions rather than fragile plugin stacks.",
            problems: ["Default WooCommerce cannot support the sales model", "Plugin conflicts around cart and checkout", "Manual order processes that should be automated", "Catalog performance issues at scale"],
            included: ["Requirements workshop", "Custom WooCommerce features", "Checkout and cart adjustments", "Product or pricing logic", "QA against real order paths", "Documentation for your team"],
            benefits: [
              { title: "Sales-model fit", text: "The store follows your packaging, pricing, and fulfillment rules." },
              { title: "Fewer plugin collisions", text: "Custom logic where plugins would fight each other." },
              { title: "Better operations", text: "Less manual work after an order is placed." },
              { title: "Maintainable code", text: "Changes that your future team can still understand." },
            ],
            faqs: [
              { q: "Do you replace WooCommerce?", a: "No. We extend it. WooCommerce remains the commerce engine." },
              { q: "Can you work on an existing store?", a: "Yes. We audit first so custom work does not destabilize checkout." },
              { q: "What if we already have many plugins?", a: "We identify what can stay, what should go, and what should be built properly." },
            ],
          }),
          item({
            slug: "learndash-development",
            title: "LearnDash Development",
            short: "Custom course experiences, reporting, and LMS workflows on LearnDash.",
            benefit: "An academy that matches how you teach and sell access.",
            icon: "book",
            overview: "We extend LearnDash with custom templates, reporting, drip logic, and integrations that a default LMS cannot cover. The work stays compatible with LearnDash updates wherever possible.",
            problems: ["Generic course templates that do not fit the brand", "Reporting that instructors cannot use", "Access rules that need custom logic", "LMS and membership tools overlapping"],
            included: ["LMS requirements mapping", "Custom LearnDash templates or features", "Progress and reporting adjustments", "Access or bundle logic", "Integration with WordPress or WooCommerce", "QA on learner and instructor roles"],
            benefits: [
              { title: "Better learner experience", text: "Course UI that feels like part of your brand." },
              { title: "Instructor insight", text: "Progress and completion data that is actually usable." },
              { title: "Smarter access", text: "Rules that match cohorts, bundles, or memberships." },
              { title: "Update-safe approach", text: "Custom work structured to survive LearnDash updates." },
            ],
            faqs: [
              { q: "Is this different from LearnDash Setup?", a: "Setup configures the LMS. Development customizes how it behaves and looks." },
              { q: "Can you add a student dashboard?", a: "Yes. Dashboards, progress views, and custom course templates are common requests." },
              { q: "Will this lock us into a custom LMS?", a: "No. LearnDash remains the platform. We extend it rather than replacing it." },
            ],
          }),
        ],
      },
      {
        slug: "customize",
        label: "CUSTOMIZE",
        title: "WordPress Customization Services",
        summary: "Adapt WordPress, WooCommerce, LearnDash, and plugins so the platform fits your brand and operations.",
        icon: "palette",
        why: [
          { title: "Precise, not patched", text: "Customizations are planned so they survive updates." },
          { title: "Brand consistency", text: "Templates, checkout, and course views feel like one product." },
          { title: "Editor-friendly", text: "Changes stay usable in the WordPress admin." },
          { title: "Technical restraint", text: "We customize where it matters instead of rewriting everything." },
        ],
        process: defaultProcess,
        technologies: ["WordPress", "WooCommerce", "LearnDash", "PHP", "JavaScript", "APIs"],
        services: [
          item({
            slug: "wordpress-customization",
            title: "WordPress Customization",
            short: "Refine themes, templates, and blocks to match how your business actually works.",
            benefit: "A WordPress site that feels custom without a full rebuild.",
            icon: "palette",
            overview: "WordPress Customization is for sites that are close, but not quite right. We adjust templates, Gutenberg blocks, navigation, and page types so the CMS matches your content and brand.",
            problems: ["Theme limitations that block layout or content", "Inconsistent inner pages", "Blocks that are awkward to edit", "Header, footer, or blog templates that fight the brand"],
            included: ["Theme and content audit", "Template and block customization", "Style system alignment", "Editor experience improvements", "QA across key templates", "Handover notes"],
            benefits: [
              { title: "Better fit", text: "Pages finally match the layouts you intended." },
              { title: "Easier editing", text: "Less fighting the theme when publishing." },
              { title: "Visual cohesion", text: "Inner pages feel as considered as the homepage." },
              { title: "Lower rebuild cost", text: "Improve what you have before starting over." },
            ],
            faqs: [
              { q: "Can you customize a ThemeForest theme?", a: "Yes, with care. We isolate custom work so theme updates are less destructive." },
              { q: "When do you recommend a redesign instead?", a: "When the theme, UX, and conversion path are all holding the business back." },
              { q: "Will this affect SEO?", a: "We preserve URLs, headings, and structured content unless a change is required." },
            ],
          }),
          item({
            slug: "woocommerce-customization",
            title: "WooCommerce Customization",
            short: "Shape product pages, cart, and checkout around your catalog and brand.",
            benefit: "A storefront that sells the way your customers actually buy.",
            icon: "tags",
            overview: "We customize WooCommerce templates and flows: product presentation, variation UX, cart, checkout, emails, and account pages. The aim is a store that looks premium and reduces purchase friction.",
            problems: ["Generic product pages that do not sell", "Awkward variation or bundle UX", "Checkout that feels disconnected from the brand", "Emails and account pages left on defaults"],
            included: ["Storefront UX review", "Product, cart, and checkout customization", "Account and email template updates", "Mobile checkout checks", "Conversion-focused adjustments", "QA with test orders"],
            benefits: [
              { title: "Stronger product pages", text: "Details, trust, and next steps above the fold." },
              { title: "Smoother checkout", text: "Fewer fields and clearer shipping expectations." },
              { title: "On-brand commerce", text: "Shop templates that match the rest of the site." },
              { title: "Mobile-ready buying", text: "The path to purchase works on a real phone." },
            ],
            faqs: [
              { q: "Can you customize checkout without breaking payments?", a: "Yes. Payment and tax logic stay intact. We change presentation and field experience." },
              { q: "Do you work with existing product data?", a: "Yes. We design around the catalog you already have whenever possible." },
              { q: "Is this the same as speed optimization?", a: "No. This is UX and template work. Speed can be added as a related service." },
            ],
          }),
          item({
            slug: "learndash-customization",
            title: "LearnDash Customization",
            short: "Customize course layouts, dashboards, and LMS flows for a better learning experience.",
            benefit: "An academy that feels designed, not bolted onto WordPress.",
            icon: "ruler",
            overview: "LearnDash Customization covers course templates, focus mode, profiles, and the small UX details that decide whether students stay. We keep LearnDash as the engine and improve the experience around it.",
            problems: ["Default LearnDash UI that does not match the brand", "Students getting lost between lessons", "Weak course landing pages", "Instructor tools that are hard to use"],
            included: ["LMS UX review", "Course and lesson template customization", "Student dashboard adjustments", "Focus mode and navigation tweaks", "Brand and typography alignment", "Learner-path QA"],
            benefits: [
              { title: "Higher completion comfort", text: "Clearer next-lesson paths and progress." },
              { title: "Brand continuity", text: "The LMS looks like part of the website." },
              { title: "Better first impression", text: "Course pages that explain value before enrolment." },
              { title: "Instructor ease", text: "Admin and reporting views that are less noisy." },
            ],
            faqs: [
              { q: "Will custom templates survive LearnDash updates?", a: "We use child-theme and supported override patterns to reduce update risk." },
              { q: "Can you customize certificates?", a: "Yes. Certificate design and completion rules can be included." },
              { q: "Do you also handle course content?", a: "We structure the LMS. Content writing can be scoped separately if needed." },
            ],
          }),
          item({
            slug: "plugin-development",
            title: "Plugin Development",
            short: "Build custom WordPress plugins for features that should not live in the theme.",
            benefit: "Portable, update-safe functionality your site can keep as it grows.",
            icon: "plugin",
            overview: "When a feature is core to the business, it belongs in a plugin. We develop custom WordPress plugins for integrations, admin tools, content types, and workflows that off-the-shelf plugins cannot cover cleanly.",
            problems: ["Business logic trapped in a theme", "Multiple plugins overlapping the same job", "Needed functionality that does not exist", "Fragile code snippets in functions.php"],
            included: ["Feature specification", "Custom plugin architecture", "Admin UI where needed", "Security and capability checks", "Tested against WordPress updates", "Developer documentation"],
            benefits: [
              { title: "Portable features", text: "The plugin can move with you if the theme changes." },
              { title: "Cleaner WordPress", text: "Less theme clutter and fewer conflicting plugins." },
              { title: "Business-specific logic", text: "The CMS supports your process, not the other way around." },
              { title: "Safer long-term", text: "Code written to WordPress standards, not as a one-off hack." },
            ],
            faqs: [
              { q: "When should something be a plugin vs a theme change?", a: "If the feature is needed regardless of design, it should be a plugin." },
              { q: "Do you submit plugins to WordPress.org?", a: "Only when that is the goal. Most client plugins remain private." },
              { q: "Can you take over an existing custom plugin?", a: "Yes. We review quality first, then improve or rebuild the parts that are risky." },
            ],
          }),
        ],
      },
      {
        slug: "migrate",
        label: "MIGRATE",
        title: "WordPress Migration Services",
        summary: "Move websites, stores, and academies onto WordPress with preserved content, SEO, and as little downtime as possible.",
        icon: "globe",
        why: [
          { title: "Content preserved", text: "Pages, media, products, and users are mapped before anything moves." },
          { title: "SEO continuity", text: "Redirects and URL strategy are part of the plan, not an afterthought." },
          { title: "Low-downtime cutover", text: "We rehearse the switch so launch is controlled." },
          { title: "Clean destination", text: "You land on a maintainable WordPress setup, not a messy copy." },
        ],
        process: [
          { n: "01", title: "Discover", text: "We audit the current platform, content volume, and integrations." },
          { n: "02", title: "Plan", text: "URL map, redirect strategy, and a rehearsal environment are defined." },
          { n: "03", title: "Build", text: "Content and functionality are moved into a staging WordPress site." },
          { n: "04", title: "Launch & Optimize", text: "DNS cutover, redirect checks, and a post-launch verification pass." },
        ],
        technologies: ["WordPress", "WooCommerce", "LearnDash", "PHP", "APIs"],
        services: [
          item({
            slug: "migrate-to-wordpress",
            title: "Migrate to WordPress",
            short: "Move from another CMS or builder onto a clean WordPress foundation.",
            benefit: "Keep your content and rankings while gaining a better CMS.",
            icon: "globe",
            isNew: true,
            overview: "We migrate websites from Webflow, Wix, Squarespace, custom CMS platforms, and older WordPress installs onto a structured WordPress build. SEO, media, and page intent are treated as first-class requirements.",
            problems: ["Platform lock-in and rising host or builder costs", "Limited editing or developer access", "SEO risk from a careless move", "Content that would be painful to recreate by hand"],
            included: ["Source platform audit", "Content and URL mapping", "WordPress destination setup", "Redirect plan", "Staging review", "Launch and verification"],
            benefits: [
              { title: "Ownership", text: "Your site lives on WordPress, not a closed builder." },
              { title: "SEO protection", text: "Redirects and metadata are handled deliberately." },
              { title: "Editable result", text: "The new CMS is structured for your team." },
              { title: "Cleaner codebase", text: "A chance to leave accumulated platform debt behind." },
            ],
            faqs: [
              { q: "Will the new site look identical?", a: "It can be a visual match or a redesign. We confirm that before migration begins." },
              { q: "How do you handle SEO?", a: "We map URLs, implement redirects, and verify indexable pages after launch." },
              { q: "What platforms can you migrate from?", a: "Most CMS and site builders. We confirm feasibility after a short audit." },
            ],
          }),
          item({
            slug: "migrate-to-woocommerce",
            title: "Migrate to WooCommerce",
            short: "Move products, customers, and order history onto WooCommerce.",
            benefit: "A store you own, with a catalog that survives the move.",
            icon: "refresh",
            overview: "Commerce migrations need more than page copies. We move products, variations, customers, and where possible order history into WooCommerce, then verify checkout before DNS changes.",
            problems: ["Shopify or other platforms becoming expensive or limiting", "Product data too large to rebuild manually", "Fear of losing customers or order records", "Checkout behaviour changing unexpectedly"],
            included: ["Catalog and customer audit", "Product and variation import", "Customer data migration", "Checkout verification", "Redirects for product URLs", "Post-launch order checks"],
            benefits: [
              { title: "Catalog continuity", text: "Products and variations arrive intact." },
              { title: "Owned commerce stack", text: "WooCommerce on WordPress, without platform lock-in." },
              { title: "Safer cutover", text: "Test orders happen before customers notice a change." },
              { title: "SEO for products", text: "Category and product URLs are mapped, not guessed." },
            ],
            faqs: [
              { q: "Can you migrate from Shopify?", a: "Yes. Catalog, customers, and many content pages can be moved. Apps are reviewed case by case." },
              { q: "Will orders keep the same IDs?", a: "Not always. We preserve the records that operations need and explain any platform differences." },
              { q: "Do payments move automatically?", a: "Gateways are reconnected on WooCommerce. Customer saved cards depend on the provider." },
            ],
          }),
          item({
            slug: "migrate-to-learndash",
            title: "Migrate to LearnDash",
            short: "Bring courses, students, and progress into a WordPress LMS.",
            benefit: "Teach on a platform you can extend, without starting from zero.",
            icon: "transfer",
            overview: "We migrate course content, users, and where possible progress data into LearnDash. The destination is a WordPress academy your team can expand with memberships, WooCommerce, or custom reporting.",
            problems: ["LMS platforms that are hard to brand or extend", "Student records that must not be lost", "Course structures that do not map 1:1", "No control over data or integrations"],
            included: ["Course inventory", "LearnDash information architecture", "Content and media migration", "User import", "Access rule mapping", "Learner QA on staging"],
            benefits: [
              { title: "Course continuity", text: "Lessons and media move with a defined structure." },
              { title: "Student access", text: "Accounts and enrolment are rebuilt with care." },
              { title: "WordPress control", text: "The LMS can sit beside your marketing site." },
              { title: "Future features", text: "Easier to add checkout, memberships, or custom dashboards." },
            ],
            faqs: [
              { q: "Can progress data always be migrated?", a: "It depends on the source LMS. We confirm what can move during the audit." },
              { q: "Will students need new logins?", a: "Sometimes. We minimize disruption and communicate the cutover clearly." },
              { q: "Can you migrate from Teachable or Thinkific?", a: "Yes in most cases. Content maps well; progress and drip rules are reviewed individually." },
            ],
          }),
        ],
      },
    ],
  },
  {
    slug: "manage",
    kicker: "MANAGE",
    title: "Maintenance & Operations",
    description: "Keep your WordPress ecosystem secure, reliable, and continuously managed.",
    categories: [
      {
        slug: "maintain",
        label: "MAINTAIN",
        title: "WordPress Maintenance Services",
        summary: "Ongoing care for WordPress: security, updates, backups, monitoring, performance, and technical support.",
        icon: "wrench",
        why: [
          { title: "Quiet reliability", text: "Updates and backups happen on a schedule, not after an incident." },
          { title: "Security first", text: "Monitoring and hardening reduce the chance of preventable issues." },
          { title: "Performance watch", text: "We notice slowdowns before they become a ranking or conversion problem." },
          { title: "A specialist on call", text: "You are not searching forums when something breaks." },
        ],
        process: [
          { n: "01", title: "Discover", text: "We review hosting, plugins, backups, and current risk." },
          { n: "02", title: "Plan", text: "A care plan is set: update cadence, monitoring, and support hours." },
          { n: "03", title: "Build", text: "Backup, security, and staging processes are put in place." },
          { n: "04", title: "Launch & Optimize", text: "Monthly care continues, with reports and prioritized improvements." },
        ],
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        services: [
          item({
            slug: "wordpress-maintenance",
            title: "WordPress Maintenance",
            short: "Updates, backups, security, monitoring, and support on a predictable cadence.",
            benefit: "A WordPress site that stays healthy after launch.",
            icon: "wrench",
            overview: "WordPress Maintenance is ongoing care for a live site: core, plugin, and theme updates, daily backups, security and malware checks, performance and uptime monitoring, database cleanup, and a specialist to call when something fails. The work stays on a predictable cadence so the site remains healthy after launch.",
            problems: ["No one owns updates until the site breaks", "Backups that have never been tested", "Plugin lag creating security risk", "No staging, so live edits become incidents"],
            included: ["WordPress Updates", "Daily Backups", "Security Monitoring", "Performance Monitoring", "Uptime Monitoring", "Bug Fixes & Support"],
            benefits: [
              { title: "Security", text: "Patching and monitoring against known WordPress risks." },
              { title: "Performance", text: "Slowdowns are noticed before they become a conversion problem." },
              { title: "Backups", text: "Restorable copies, not a false sense of safety." },
              { title: "Peace of mind", text: "A specialist who already knows your site owns the technical care." },
            ],
            faqs: [
              { q: "What is included in WordPress maintenance?", a: "Typical care covers WordPress core, plugin, and theme updates, daily backups, security and malware checks, performance and uptime monitoring, database cleanup, bug fixes, and a monthly report. The exact mix is confirmed in your plan." },
              { q: "How often do you update WordPress, plugins, and themes?", a: "Security patches are treated as a priority. Larger updates are reviewed for compatibility and applied on a cadence that fits the site. When staging is available, we test there first." },
              { q: "Do you take backups before making changes?", a: "Yes. Daily offsite backups are part of ongoing care, and we take a restore point before significant updates. A backup only matters if it can be restored." },
              { q: "What happens if an update breaks the site?", a: "We isolate the change, roll back if needed, and restore a working site. The goal is a stable live site first, then a controlled fix for the plugin or theme that caused the conflict." },
              { q: "Is hosting included in the maintenance plan?", a: "Hosting can be advised or managed separately. Maintenance focuses on the WordPress application: updates, backups, security, performance, uptime, and support." },
              { q: "How quickly do you respond to downtime or errors?", a: "Uptime monitoring means we often see an outage before you do. Response speed depends on the plan, but every care plan includes a named technical owner instead of a generic ticket queue." },
              { q: "Will I receive reports on the work you do?", a: "Yes. You receive a monthly maintenance report covering updates, backups, incidents, and anything that needs a decision." },
              { q: "Can you maintain a WooCommerce or membership site?", a: "Yes. Stores and membership sites need extra care around checkout, product data, and plugins. We confirm the stack during onboarding and recommend the right plan when commerce or high traffic is involved." },
            ],
          }),
        ],
      },
      {
        slug: "retainers",
        label: "RETAINERS",
        title: "WordPress Retainer Services",
        summary: "Your dedicated WordPress development team, whenever you need it.",
        icon: "users",
        why: [
          { title: "Capacity on tap", text: "Hours reserved for the work that appears after launch." },
          { title: "People who know the stack", text: "The same team that already understands your WordPress build." },
          { title: "Business-first delivery", text: "Requests are triaged against impact, not only tickets." },
          { title: "Predictable cost", text: "A monthly rhythm instead of restarting a project every time." },
        ],
        process: [
          { n: "01", title: "Discover", text: "We agree scope, hours, and how requests should be raised." },
          { n: "02", title: "Plan", text: "A backlog and communication cadence are set with your team." },
          { n: "03", title: "Build", text: "Development, management, or hiring support runs against the retainer." },
          { n: "04", title: "Launch & Optimize", text: "We review usage, priorities, and outcomes each month." },
        ],
        technologies: ["WordPress", "WooCommerce", "LearnDash", "PHP", "JavaScript", "APIs"],
        services: [
          item({
            slug: "website-management",
            title: "Website Management",
            short: "A managed WordPress operation: content, small builds, QA, and coordination.",
            benefit: "Someone accountable for the website besides your internal team.",
            icon: "layers",
            overview: "Website Management is for teams that need WordPress looked after as a product. We handle content changes, small features, QA, plugin decisions, and the coordination work that usually falls through the cracks.",
            problems: ["Marketing needs changes faster than developers can start", "No owner for the CMS after launch", "Inconsistent quality across new pages", "Agencies that disappear between projects"],
            included: ["Monthly hour bank", "Content and layout updates", "Small feature work", "QA before publish", "Plugin and vendor coordination", "Status reporting"],
            benefits: [
              { title: "Faster iteration", text: "Landing pages and campaign edits without a new proposal each time." },
              { title: "Quality control", text: "Changes are checked before they go live." },
              { title: "Institutional memory", text: "The people doing the work already know the site." },
              { title: "Clear reporting", text: "You see what was done with the retainer." },
            ],
            faqs: [
              { q: "What is the difference between management and maintenance?", a: "Maintenance is care and risk. Management is ongoing product and content work." },
              { q: "Can unused hours roll over?", a: "We agree this in the retainer. Most plans allow a modest rollover." },
              { q: "Do you also do larger projects?", a: "Yes. Larger builds are scoped separately so the retainer stays available for day-to-day work." },
            ],
          }),
          item({
            slug: "hire-wordpress-developers",
            title: "Hire WordPress Developers",
            short: "Embed experienced WordPress engineers with your team on a retainer.",
            benefit: "Senior WordPress capacity without a long hiring cycle.",
            icon: "users",
            overview: "Hire WordPress Developers when you need production-quality theme, plugin, and CMS work on a recurring basis. You get developers who already work in our delivery system, not a random contractor marketplace.",
            problems: ["Hiring freeze but a growing WordPress backlog", "Freelancers who vanish mid-sprint", "Internal teams blocked on WordPress expertise", "Inconsistent code quality"],
            included: ["Dedicated WordPress developers", "Shared Slack or email cadence", "Ticket or sprint workflow", "Code aligned to WordPress standards", "QA support", "Monthly review"],
            benefits: [
              { title: "Speed to capacity", text: "Start in days, not a three-month hire." },
              { title: "Senior judgment", text: "Developers who have seen the failure modes before." },
              { title: "Your backlog, our craft", text: "Work happens inside your priorities." },
              { title: "Continuity", text: "Knowledge stays with a studio, not a single contractor." },
            ],
            faqs: [
              { q: "Can developers join our standups?", a: "Yes. We match your communication tools and timezone overlap as far as possible." },
              { q: "Is this staff augmentation or a managed team?", a: "Either. Some clients direct the work; others want us to run the backlog." },
              { q: "What if we need more hours next month?", a: "Capacity can scale up with notice. We avoid surprise overages." },
            ],
          }),
          item({
            slug: "hire-woocommerce-developers",
            title: "Hire WooCommerce Developers",
            short: "Specialist WooCommerce engineers for catalog, checkout, and store operations.",
            benefit: "Store expertise on tap when commerce work cannot wait.",
            icon: "developer",
            overview: "WooCommerce retainers give you developers who understand cart, checkout, subscriptions, and catalog performance. Useful when an in-house team is strong on marketing but light on commerce engineering.",
            problems: ["Checkout bugs with no internal owner", "Catalog changes that need custom logic", "Seasonal peaks that need extra hands", "Fear of touching WooCommerce code"],
            included: ["WooCommerce specialists", "Checkout and catalog work", "Extension and gateway care", "Performance-aware store changes", "Staging QA with test orders", "Monthly commerce review"],
            benefits: [
              { title: "Safer store changes", text: "People who treat checkout as critical infrastructure." },
              { title: "Seasonal flexibility", text: "Add capacity ahead of campaigns." },
              { title: "Operational knowledge", text: "Orders, taxes, and product types are not an afterthought." },
              { title: "Less plugin gambling", text: "Custom work when an extension would create debt." },
            ],
            faqs: [
              { q: "Can you support subscriptions or wholesale?", a: "Yes. Those flows are a common reason teams hire WooCommerce specialists." },
              { q: "Do you work alongside our agency?", a: "Yes. We can own the commerce layer while another team owns brand or content." },
              { q: "Is emergency support included?", a: "Priority response is part of the retainer. True incidents are triaged immediately." },
            ],
          }),
          item({
            slug: "hire-learndash-developers",
            title: "Hire LearnDash Developers",
            short: "LMS specialists for course features, reporting, and learner experience.",
            benefit: "LearnDash expertise without hiring a rare full-time role.",
            icon: "specialist",
            overview: "LearnDash developers on retainer help academies ship course features, reporting, and integrations without pausing the teaching calendar. The team already knows the LMS patterns that break during updates.",
            problems: ["Course roadmap stalled by lack of LMS developers", "Reporting the business cannot see", "Integrations with membership or WooCommerce", "Custom learner UX that a generalist will guess at"],
            included: ["LearnDash specialists", "Course feature development", "Reporting and dashboard work", "Membership or commerce connections", "Update-aware customizations", "Monthly LMS review"],
            benefits: [
              { title: "LMS fluency", text: "Developers who know LearnDash, not only WordPress." },
              { title: "Teaching continuity", text: "Changes are planned around cohorts and launch dates." },
              { title: "Better data", text: "Progress and completion that instructors can use." },
              { title: "Sustainable custom work", text: "Overrides that are less likely to break on update." },
            ],
            faqs: [
              { q: "Can you support multiple instructors?", a: "Yes. Roles, capabilities, and course ownership are part of the work." },
              { q: "Do you create course content?", a: "We build the product. Instructional design can be partnered or scoped separately." },
              { q: "Is this suitable for a small academy?", a: "Yes. Retainers can start small and grow with enrolment." },
            ],
          }),
        ],
      },
    ],
  },
  {
    slug: "enhance",
    kicker: "ENHANCE",
    title: "Growth & Optimization",
    description: "Optimize, redesign, integrate, automate, and grow your digital presence.",
    categories: [
      {
        slug: "redesign",
        label: "REDESIGN",
        title: "WordPress Redesign Services",
        summary: "Modernize WordPress experiences with stronger UI, UX, conversion paths, and mobile performance.",
        icon: "sparkles",
        why: [
          { title: "Modern UI", text: "Typography, spacing, and composition that feel current." },
          { title: "UX that converts", text: "Clearer journeys from first impression to enquiry." },
          { title: "Mobile done properly", text: "Not a squashed desktop, a designed small-screen experience." },
          { title: "SEO-aware change", text: "Visual modernization without throwing away rankings." },
        ],
        process: defaultProcess,
        technologies: ["WordPress", "Elementor", "JavaScript", "PHP"],
        services: [
          item({
            slug: "wordpress-re-design",
            title: "WordPress Re-design",
            short: "Transform an outdated WordPress site into a modern, conversion-focused experience.",
            benefit: "A site that looks current and works harder for the business.",
            icon: "sparkles",
            isNew: true,
            overview: "A WordPress redesign is not only new colors. We rework hierarchy, page types, and conversion paths while keeping the CMS your team already knows. The result should feel like a new product, not a reskin.",
            problems: ["The brand has moved on and the website has not", "High bounce on key pages", "Mobile experience that feels like an afterthought", "A theme that cannot support the next two years"],
            included: ["UX and content audit", "New visual system", "Key template redesign", "Conversion path work", "Responsive implementation", "Redirect and SEO checks"],
            benefits: [
              { title: "Visual modernization", text: "A site that matches the quality of the business." },
              { title: "UX improvements", text: "Easier scanning, clearer next steps, less friction." },
              { title: "Conversion focus", text: "Homepages and service pages built to produce leads." },
              { title: "Mobile responsiveness", text: "Layouts designed for the devices your audience actually uses." },
            ],
            faqs: [
              { q: "Do we have to change CMS?", a: "No. Redesigns usually stay on WordPress unless the platform itself is the problem." },
              { q: "Will we lose SEO?", a: "We map URLs, preserve useful content, and implement redirects when structure changes." },
              { q: "Can you redesign only the homepage?", a: "Yes, though inner templates often need to follow or the site will feel unfinished." },
            ],
          }),
          item({
            slug: "landing-page-redesign",
            title: "Landing Page Redesign",
            short: "Rebuild campaign and offer pages to convert with less friction.",
            benefit: "Landing pages that earn the traffic you already pay for.",
            icon: "landing",
            overview: "Landing Page Redesign focuses on a single offer: message hierarchy, proof, form friction, and mobile behaviour. Useful when ads or campaigns send traffic to a page that does not close.",
            problems: ["Paid traffic landing on a generic inner page", "Forms that ask too much too soon", "No proof near the call to action", "Slow or cluttered campaign pages"],
            included: ["Offer and audience review", "Wireframe and copy hierarchy", "Landing page design", "Form and CTA optimization", "Mobile conversion pass", "Launch and measurement setup"],
            benefits: [
              { title: "Sharper offer", text: "One page, one action, fewer distractions." },
              { title: "Better proof placement", text: "Trust appears where the decision happens." },
              { title: "Faster pages", text: "Campaign pages stay lean." },
              { title: "Easier testing", text: "Structure that can support later experiments." },
            ],
            faqs: [
              { q: "Can you redesign pages inside an existing theme?", a: "Yes. We match the brand system while giving the landing page a stronger conversion layout." },
              { q: "Do you write the copy?", a: "We structure the message. Full copywriting can be included when needed." },
              { q: "How quickly can a landing page ship?", a: "Focused landing pages often ship in 1–3 weeks depending on content and review." },
            ],
          }),
        ],
      },
      {
        slug: "speed",
        label: "SPEED",
        title: "WordPress Speed Optimization",
        summary: "Improve loading time, Core Web Vitals, and the performance of WordPress and WooCommerce sites.",
        icon: "gauge",
        why: [
          { title: "Faster loading", text: "Visitors and crawlers both benefit from a lighter page." },
          { title: "Core Web Vitals", text: "LCP, INP, and CLS treated as product work, not a plugin toggle." },
          { title: "Image and code hygiene", text: "Assets and scripts reduced to what the page needs." },
          { title: "Database care", text: "WooCommerce and WordPress stay quicker as they grow." },
        ],
        process: [
          { n: "01", title: "Discover", text: "We profile the live site, hosting, and the templates that matter." },
          { n: "02", title: "Plan", text: "A prioritized list: assets, queries, plugins, and server configuration." },
          { n: "03", title: "Build", text: "We implement caching, image, code, and database improvements on staging." },
          { n: "04", title: "Launch & Optimize", text: "We verify Core Web Vitals and keep a watch on regressions." },
        ],
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        services: [
          item({
            slug: "wordpress-speed-optimization",
            title: "WordPress Speed Optimization",
            short: "Improve Core Web Vitals with image, code, cache, and database work.",
            benefit: "A faster site that feels as premium as it looks.",
            icon: "gauge",
            overview: "WordPress Speed Optimization is a structured performance pass: measuring what is slow, then fixing images, CSS/JS, fonts, caching, and the plugin stack. We aim for real user experience, not only a lab screenshot.",
            problems: ["Slow LCP on the homepage", "Too many plugins and third-party scripts", "Unoptimized media", "Hosting or cache that is misconfigured"],
            included: ["Performance audit", "Image optimization", "Script and style reduction", "Caching configuration", "Database cleanup", "Core Web Vitals verification"],
            benefits: [
              { title: "Faster loading", text: "Pages become usable sooner." },
              { title: "Core Web Vitals", text: "Work aimed at LCP, INP, and CLS." },
              { title: "Code optimization", text: "Less unused JavaScript and CSS on each template." },
              { title: "Database optimization", text: "Revisions, transients, and bloat taken seriously." },
            ],
            faqs: [
              { q: "Will you guarantee a 100 PageSpeed score?", a: "No honest studio should. We target meaningful gains and healthy Core Web Vitals." },
              { q: "Do you remove plugins?", a: "When they are the bottleneck and there is a safer replacement or custom option." },
              { q: "Is hosting part of this?", a: "We optimize the application and advise if hosting is the limiter." },
            ],
          }),
          item({
            slug: "woocommerce-speed-optimization",
            title: "WooCommerce Speed Optimization",
            short: "Make catalog, product, and checkout pages faster under real store load.",
            benefit: "A shop that stays quick as the catalog and traffic grow.",
            icon: "vitals",
            overview: "WooCommerce adds queries, carts, and dynamic pages that generic cache plugins mishandle. We optimize product archives, product pages, and checkout with store-aware caching, object cache, and catalog performance work.",
            problems: ["Slow category pages", "Product pages heavy with apps and reviews", "Cart fragments fighting cache", "Checkout that stalls on mobile"],
            included: ["WooCommerce performance audit", "Archive and product template work", "Image and script optimization", "Cache strategy for dynamic pages", "Database and transient cleanup", "Test-order performance checks"],
            benefits: [
              { title: "Faster catalogs", text: "Category pages that do not punish shoppers." },
              { title: "Leaner product pages", text: "Media and apps kept in check." },
              { title: "Smarter caching", text: "Cache that respects cart and account states." },
              { title: "Checkout confidence", text: "The last step stays responsive." },
            ],
            faqs: [
              { q: "Can you cache a WooCommerce site fully?", a: "Not the cart and checkout. We cache what is safe and accelerate the rest." },
              { q: "Will this change how the store looks?", a: "Visual design stays. We remove weight, not brand." },
              { q: "Do you work during peak season?", a: "Yes, with a freeze window for risky changes if you are in a campaign." },
            ],
          }),
        ],
      },
      {
        slug: "integrate",
        label: "INTEGRATE",
        title: "WordPress API Development",
        summary: "Connect WordPress to the rest of your stack with robust APIs and technical integrations.",
        icon: "code",
        why: [
          { title: "Systems that talk", text: "CRM, ERP, and internal tools stay in sync with WordPress." },
          { title: "Clean contracts", text: "APIs designed so future work does not guess at payloads." },
          { title: "Secure by default", text: "Auth, roles, and validation treated as part of the build." },
          { title: "WordPress-native", text: "Integrations that respect hooks, cron, and the admin." },
        ],
        process: defaultProcess,
        technologies: ["WordPress", "APIs", "PHP", "JavaScript", "WooCommerce"],
        services: [
          item({
            slug: "wordpress-api-development",
            title: "WordPress API Development",
            short: "Custom REST or integration work that connects WordPress to other products.",
            benefit: "WordPress becomes part of the operating system of the business.",
            icon: "code",
            overview: "WordPress API Development covers custom REST endpoints, incoming webhooks, CRM sync, and headless or hybrid setups. We treat integration as engineering: documented, authenticated, and resilient when the other system is slow.",
            problems: ["Manual copying between WordPress and other tools", "Off-the-shelf connectors that almost work", "No reliable way to push or pull product or lead data", "Fragile Zapier-only workflows for core operations"],
            included: ["Integration discovery", "API design or mapping", "Custom endpoints or connectors", "Authentication and error handling", "Logging and retry strategy", "Technical documentation"],
            benefits: [
              { title: "Fewer manual steps", text: "Data moves without someone exporting CSVs." },
              { title: "Reliable contracts", text: "Payloads and failure cases are defined." },
              { title: "Safer access", text: "Keys, roles, and scopes are not left on defaults." },
              { title: "Easier future work", text: "The next developer can see how the integration works." },
            ],
            faqs: [
              { q: "Do you work with the WordPress REST API?", a: "Yes. We extend it or add custom routes when the default API is not enough." },
              { q: "Can you connect to Salesforce, HubSpot, or a custom ERP?", a: "Yes. Feasibility depends on the other system’s API quality, which we check first." },
              { q: "Is this the same as automation?", a: "APIs are the pipes. Automation is the workflow on top. Many projects need both." },
            ],
          }),
        ],
      },
      {
        slug: "automate",
        label: "AUTOMATE",
        title: "WordPress AI Automation",
        summary: "Professional AI workflows that reduce repetitive work inside WordPress and around it.",
        icon: "bot",
        isNew: true,
        why: [
          { title: "AI workflows", text: "Assistive processes for content, routing, and operations." },
          { title: "Business automation", text: "Fewer repetitive admin tasks after a lead or order." },
          { title: "Smart integrations", text: "WordPress talking to the tools your team already uses." },
          { title: "Productivity with control", text: "Automation that is reviewed, logged, and reversible." },
        ],
        process: defaultProcess,
        technologies: ["WordPress", "AI Automation", "APIs", "JavaScript", "PHP"],
        services: [
          item({
            slug: "wordpress-ai-automation",
            title: "WordPress AI Automation",
            short: "Automate processes with AI-assisted workflows that stay under human control.",
            benefit: "Less busywork, without turning the website into an experiment.",
            icon: "bot",
            isNew: true,
            overview: "WordPress AI Automation is for studios and operators who want practical gains: drafting assistance, lead routing, support triage, internal summaries, and workflow triggers. We keep a professional, reviewable system rather than unsupervised content publishing.",
            problems: ["Teams repeating the same admin tasks after every lead", "Content operations that stall on first drafts", "Support questions that never reach the right person", "No connection between WordPress events and internal tools"],
            included: ["Workflow mapping", "AI-assisted process design", "WordPress triggers and integrations", "Human review steps", "Logging and fallbacks", "Team training"],
            benefits: [
              { title: "Automated processes", text: "Routine steps happen without a reminder." },
              { title: "Smarter routing", text: "Leads and requests reach the right owner faster." },
              { title: "Assistive content ops", text: "First drafts and summaries, with humans still accountable." },
              { title: "Productivity", text: "Hours returned to delivery and client work." },
            ],
            faqs: [
              { q: "Will AI publish to the live site automatically?", a: "Not by default. We prefer human approval on anything customer-facing." },
              { q: "Which models do you use?", a: "We choose based on privacy, cost, and the job. The workflow matters more than the logo." },
              { q: "Is this only for large companies?", a: "No. Even a small lead-to-CRM workflow can be worth automating." },
            ],
          }),
        ],
      },
      {
        slug: "seo",
        label: "SEO",
        title: "WordPress SEO Services",
        summary: "Technical SEO, on-page structure, and an architecture built for search visibility and growth.",
        icon: "search",
        why: [
          { title: "Technical SEO", text: "Indexation, metadata, sitemaps, and Core Web Vitals as a foundation." },
          { title: "On-page structure", text: "Headings, internal links, and content types that search engines can parse." },
          { title: "Search visibility", text: "Pages that can rank because they are clear, fast, and unique." },
          { title: "Growth strategy", text: "A WordPress information architecture that can support more content." },
        ],
        process: defaultProcess,
        technologies: ["WordPress", "JavaScript", "PHP", "APIs"],
        services: [
          item({
            slug: "wordpress-seo-services",
            title: "WordPress SEO Services",
            short: "Make WordPress easier to index, understand, and grow in search.",
            benefit: "Technical and on-page SEO built into the CMS, not sprinkled on later.",
            icon: "search",
            overview: "WordPress SEO Services cover the foundations that content teams need: crawlable architecture, metadata, schema where it helps, performance, and templates that do not fight search. We pair this with a practical growth plan for the pages that matter.",
            problems: ["Thin or duplicate templates", "Missing metadata and messy permalinks", "Slow pages undermining rankings", "No internal linking or content model"],
            included: ["Technical SEO audit", "On-page template improvements", "Metadata and sitemap setup", "Performance-related SEO fixes", "Content type recommendations", "Measurement and next-step plan"],
            benefits: [
              { title: "Technical SEO", text: "A site search engines can crawl and understand." },
              { title: "On-page optimization", text: "Templates that support unique, useful pages." },
              { title: "Performance", text: "Speed work that supports visibility." },
              { title: "SEO-friendly architecture", text: "WordPress structured for the next year of content, not only launch day." },
            ],
            faqs: [
              { q: "Do you guarantee rankings?", a: "No. We build the conditions for visibility. Rankings also depend on content, competition, and demand." },
              { q: "Is this the same as blog writing?", a: "No. This is technical and structural SEO. Content production can be added if you need it." },
              { q: "Will you install an SEO plugin?", a: "If it helps your team manage metadata. Plugins are a tool, not the strategy." },
            ],
          }),
        ],
      },
    ],
  },
];

export const allCategories: ServiceCategory[] = servicePillars.flatMap((pillar) => pillar.categories);

export function getCategory(slug: string) {
  return allCategories.find((category) => category.slug === slug) ?? null;
}

export function getService(categorySlug: string, serviceSlug: string) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  const service = category.services.find((item) => item.slug === serviceSlug);
  if (!service) return null;
  return { category, service };
}

export const WORDPRESS_MAINTENANCE_HREF = "/services/wordpress-maintenance";

export function servicePageHref(categorySlug: string, serviceSlug: string) {
  if (serviceSlug === "wordpress-maintenance") return WORDPRESS_MAINTENANCE_HREF;
  return `/services/${categorySlug}/${serviceSlug}`;
}

export function getAllServicePaths() {
  return allCategories.flatMap((category) =>
    category.services.map((service) => ({
      category: category.slug,
      service: service.slug,
    })),
  );
}

export function getAllServiceTitles() {
  return allCategories.flatMap((category) => category.services.map((service) => service.title));
}

export function getPillarForCategory(slug: string) {
  return servicePillars.find((pillar) => pillar.categories.some((category) => category.slug === slug)) ?? null;
}
