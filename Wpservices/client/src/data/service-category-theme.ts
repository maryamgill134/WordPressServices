import type { DetailIcon, ServiceMediaFrame } from "@/data/service-detail";
import type { ServiceItem } from "@/data/services";

export type ServiceCategoryThemeSlug =
  | "setup"
  | "customize"
  | "migrate"
  | "retainers"
  | "redesign"
  | "speed"
  | "integrate"
  | "automate"
  | "seo";

export type SignatureKind =
  | "setup-board"
  | "editor-board"
  | "migrate-flow"
  | "monitor-board"
  | "before-after"
  | "speed-board"
  | "integrate-map"
  | "workflow-board"
  | "seo-board";

export type ThemeFocusItem = {
  icon: DetailIcon;
  title: string;
  text: string;
};

export type CategoryTheme = {
  slug: ServiceCategoryThemeSlug;
  heroFrame: ServiceMediaFrame;
  overviewFlipped: boolean;
  signature: SignatureKind;
  hideOverviewPhoto: boolean;
  hideBenefitsPhoto: boolean;
  focus: ThemeFocusItem[];
  process: { n: string; title: string; text: string; icon: DetailIcon }[];
  featuresHeading: string;
  featuresTitle: string;
  benefitsHeading: string;
  benefitsTitle: string;
  signatureEyebrow: string;
  signatureTitle: string;
  signatureText: string;
  processTitle: string;
  ctaTitle: string;
  ctaText: string;
};

const themes: Record<ServiceCategoryThemeSlug, CategoryTheme> = {
  setup: {
    slug: "setup",
    heroFrame: "dashboard",
    overviewFlipped: false,
    signature: "setup-board",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "sliders", title: "Configuration", text: "Permalinks, environments, and the settings a live site actually needs." },
      { icon: "server", title: "Hosting", text: "A stack that matches the project, not a rushed default install." },
      { icon: "shield", title: "Security", text: "Hardening, HTTPS, and sensible roles from day one." },
      { icon: "globe", title: "Setup", text: "WordPress ready for design, content, and launch work." },
    ],
    process: [
      { n: "01", title: "Review", text: "Confirm hosting, access, and what the site needs to do on day one.", icon: "search" },
      { n: "02", title: "Install", text: "Set up WordPress, environments, and the essential plugin stack.", icon: "globe" },
      { n: "03", title: "Harden", text: "Apply security, backups, and clean admin defaults.", icon: "shield" },
      { n: "04", title: "Handover", text: "Walk your team through the install so the next phase can start cleanly.", icon: "file" },
    ],
    featuresHeading: "WHAT WE SET UP",
    featuresTitle: "The Foundation This Service Puts in Place",
    benefitsHeading: "WHY IT MATTERS",
    benefitsTitle: "A Cleaner Start for Everything That Follows",
    signatureEyebrow: "SETUP CONSOLE",
    signatureTitle: "Configured Like a Production Site, Not a Demo",
    signatureText: "Installation, hosting choices, security, and admin orientation are treated as one setup job.",
    processTitle: "From Access to a Ready WordPress Install",
    ctaTitle: "Ready to Launch a Stronger WordPress Foundation?",
    ctaText: "Tell us about the site you need live. We will recommend the right WordPress, WooCommerce, or LearnDash setup.",
  },
  customize: {
    slug: "customize",
    heroFrame: "editor",
    overviewFlipped: true,
    signature: "editor-board",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "palette", title: "Design", text: "Templates and interface details shaped around your brand." },
      { icon: "sparkles", title: "Branding", text: "Inner pages feel as considered as the homepage." },
      { icon: "layout", title: "Layout", text: "Blocks and templates that match how you actually publish." },
      { icon: "blocks", title: "Functionality", text: "Features that belong in WordPress, not a pile of workarounds." },
    ],
    process: [
      { n: "01", title: "Audit", text: "Review the theme, templates, and where the CMS is fighting you.", icon: "search" },
      { n: "02", title: "Define", text: "Agree the layouts, brand rules, and editor experience to keep.", icon: "file" },
      { n: "03", title: "Customize", text: "Adjust templates, blocks, and flows without trapping logic in the theme.", icon: "palette" },
      { n: "04", title: "Verify", text: "Check key templates on desktop and mobile, then hand over notes.", icon: "badge" },
    ],
    featuresHeading: "WHAT WE CUSTOMIZE",
    featuresTitle: "Changes That Make WordPress Fit the Business",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "A Site That Feels Custom Without a Full Rebuild",
    signatureEyebrow: "EDITOR VIEW",
    signatureTitle: "Customization Happens in the Templates Your Team Edits",
    signatureText: "We shape design, branding, layout, and functionality so publishing stays usable after handover.",
    processTitle: "A Controlled Path From Theme Limits to a Better Fit",
    ctaTitle: "Ready to Make WordPress Fit Your Business?",
    ctaText: "Share the pages and flows that feel off. We will show the fastest customization path that still survives updates.",
  },
  migrate: {
    slug: "migrate",
    heroFrame: "photo",
    overviewFlipped: false,
    signature: "migrate-flow",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "backup", title: "Backup", text: "A restorable copy before anything moves." },
      { icon: "transfer", title: "Transfer", text: "Content, media, and records mapped instead of rebuilt by hand." },
      { icon: "shield", title: "Security", text: "A clean destination install, not a messy copy of the old stack." },
      { icon: "badge", title: "Testing", text: "Staging review and cutover checks before DNS changes." },
    ],
    process: [
      { n: "01", title: "Inventory", text: "Audit the current platform, content volume, and URLs.", icon: "search" },
      { n: "02", title: "Map", text: "Define the destination, redirects, and rehearsal environment.", icon: "file" },
      { n: "03", title: "Move", text: "Transfer content into staging WordPress with SEO kept in view.", icon: "transfer" },
      { n: "04", title: "Cut over", text: "Launch with verification, not a guess on go-live night.", icon: "sparkles" },
    ],
    featuresHeading: "WHAT THE MOVE INCLUDES",
    featuresTitle: "A Controlled Transfer onto WordPress",
    benefitsHeading: "WHAT YOU KEEP",
    benefitsTitle: "Content, Rankings, and a CMS You Can Own",
    signatureEyebrow: "MIGRATION PATH",
    signatureTitle: "Backup, Transfer, Secure, Then Test",
    signatureText: "The move is rehearsed so launch is a cutover, not a scramble.",
    processTitle: "From Source Platform to a Live WordPress Site",
    ctaTitle: "Ready to Move Without Losing What You Have Built?",
    ctaText: "Tell us where the site lives today. We will confirm what can move, what should be rebuilt, and how to protect SEO.",
  },
  retainers: {
    slug: "retainers",
    heroFrame: "dashboard",
    overviewFlipped: true,
    signature: "monitor-board",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "refresh", title: "Updates", text: "Core, plugin, and theme work on a cadence your site can survive." },
      { icon: "wrench", title: "Maintenance", text: "The unglamorous work that keeps WordPress healthy after launch." },
      { icon: "shield", title: "Security", text: "Monitoring and hardening against preventable risk." },
      { icon: "headset", title: "Support", text: "A specialist who already knows the stack." },
      { icon: "activity", title: "Monitoring", text: "Uptime, performance, and issues caught before they become incidents." },
    ],
    process: [
      { n: "01", title: "Align", text: "Agree hours, access, and how requests should be raised.", icon: "users" },
      { n: "02", title: "Stabilize", text: "Put monitoring, backups, and a working rhythm in place.", icon: "shield" },
      { n: "03", title: "Deliver", text: "Ship updates, management work, or embedded development against the retainer.", icon: "wrench" },
      { n: "04", title: "Review", text: "Report what ran, what can wait, and what needs a larger project.", icon: "file" },
    ],
    featuresHeading: "WHAT THE RETAINER COVERS",
    featuresTitle: "Ongoing Ownership After Launch",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "Capacity That Already Knows Your WordPress Stack",
    signatureEyebrow: "OPERATIONS DASHBOARD",
    signatureTitle: "A Website That Is Watched, Updated, and Supported",
    signatureText: "Retainers cover the operating work: updates, maintenance, security, support, and monitoring.",
    processTitle: "A Monthly Rhythm Instead of Restarting Every Request",
    ctaTitle: "Ready for Ongoing WordPress Support?",
    ctaText: "Tell us whether you need maintenance-level care, website management, or embedded developers. We will recommend a retainer that fits.",
  },
  redesign: {
    slug: "redesign",
    heroFrame: "browser",
    overviewFlipped: false,
    signature: "before-after",
    hideOverviewPhoto: true,
    hideBenefitsPhoto: true,
    focus: [
      { icon: "waypoints", title: "UX", text: "Clearer journeys from first impression to enquiry." },
      { icon: "layout", title: "UI", text: "Typography, spacing, and composition that feel current." },
      { icon: "devices", title: "Responsive", text: "A designed small-screen experience, not a squashed desktop." },
      { icon: "palette", title: "Branding", text: "A visual system that matches the quality of the business." },
      { icon: "target", title: "Conversion", text: "Homepages and offer pages built to produce a next step." },
    ],
    process: [
      { n: "01", title: "Audit", text: "Review UX, content, and the templates that are holding the site back.", icon: "search" },
      { n: "02", title: "Direction", text: "Define the visual system, page types, and conversion path.", icon: "palette" },
      { n: "03", title: "Rebuild", text: "Implement key templates in WordPress without throwing away the CMS.", icon: "layout" },
      { n: "04", title: "Launch", text: "Check responsive behaviour, redirects, and the paths that create leads.", icon: "sparkles" },
    ],
    featuresHeading: "WHAT THE REDESIGN INCLUDES",
    featuresTitle: "A Modern Experience Without Starting From Zero",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "A Site That Looks Current and Works Harder",
    signatureEyebrow: "DESIGN DIRECTION",
    signatureTitle: "From Dated Layouts to a Clearer Conversion Path",
    signatureText: "We rework hierarchy, templates, and mobile behaviour while keeping the WordPress your team already knows.",
    processTitle: "From UX Audit to a Live Redesign",
    ctaTitle: "Ready for a Website That Matches the Business?",
    ctaText: "Share the pages that feel outdated. We will outline a WordPress redesign that protects SEO while improving conversion.",
  },
  speed: {
    slug: "speed",
    heroFrame: "dashboard",
    overviewFlipped: false,
    signature: "speed-board",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "layers", title: "Caching", text: "Cache that is safe for WordPress and WooCommerce, not a blunt plugin toggle." },
      { icon: "zap", title: "Optimization", text: "Scripts, fonts, and database bloat reduced to what the page needs." },
      { icon: "gauge", title: "Core Web Vitals", text: "LCP, INP, and CLS treated as product work." },
      { icon: "image", title: "Images", text: "Media sized, compressed, and loaded with intent." },
      { icon: "activity", title: "Performance", text: "Real templates measured, then tuned on staging." },
    ],
    process: [
      { n: "01", title: "Profile", text: "Measure the live templates, hosting, and plugin stack.", icon: "search" },
      { n: "02", title: "Prioritize", text: "Rank image, cache, script, and database work by impact.", icon: "file" },
      { n: "03", title: "Tune", text: "Implement the pass on staging without breaking cart or checkout.", icon: "gauge" },
      { n: "04", title: "Verify", text: "Recheck Core Web Vitals and watch for regressions after launch.", icon: "badge" },
    ],
    featuresHeading: "WHAT WE OPTIMIZE",
    featuresTitle: "Performance Work Visitors Can Feel",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "A Faster Site That Still Looks Like Yours",
    signatureEyebrow: "PERFORMANCE LAB",
    signatureTitle: "Caching, Assets, and Core Web Vitals in One Pass",
    signatureText: "We measure the templates that matter, then fix what is actually slow.",
    processTitle: "From a Slow Page to a Measured Improvement",
    ctaTitle: "Ready to Make Your WordPress Site Faster?",
    ctaText: "Send the URLs that feel slow. We will profile them and recommend a performance pass that fits WordPress or WooCommerce.",
  },
  integrate: {
    slug: "integrate",
    heroFrame: "dashboard",
    overviewFlipped: true,
    signature: "integrate-map",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "code", title: "API", text: "Custom REST routes and connectors with documented contracts." },
      { icon: "users", title: "CRM", text: "Leads and records stay in sync with the tools your team already uses." },
      { icon: "cart", title: "Payments", text: "Commerce events connected without fragile copy-paste work." },
      { icon: "mail", title: "Email", text: "Transactional and marketing tools talking to WordPress events." },
      { icon: "chart", title: "Analytics", text: "The data layer connected so reporting is not a manual export." },
    ],
    process: [
      { n: "01", title: "Map systems", text: "Identify WordPress events and the tools that need to receive them.", icon: "search" },
      { n: "02", title: "Design", text: "Define payloads, auth, and what happens when the other system is slow.", icon: "file" },
      { n: "03", title: "Connect", text: "Build endpoints, webhooks, or connectors that respect WordPress.", icon: "code" },
      { n: "04", title: "Document", text: "Leave logging, retries, and notes the next developer can follow.", icon: "badge" },
    ],
    featuresHeading: "WHAT WE CONNECT",
    featuresTitle: "WordPress as Part of the Operating System",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "Fewer Manual Steps Between Your Tools",
    signatureEyebrow: "INTEGRATION MAP",
    signatureTitle: "WordPress Connected to the Rest of Your Stack",
    signatureText: "APIs, CRM, payments, email, and analytics are wired with contracts, not guesswork.",
    processTitle: "From a Manual Handoff to a Documented Integration",
    ctaTitle: "Ready to Connect WordPress to the Rest of Your Stack?",
    ctaText: "Tell us which systems need to talk to WordPress. We will confirm feasibility and the cleanest integration path.",
  },
  automate: {
    slug: "automate",
    heroFrame: "dashboard",
    overviewFlipped: true,
    signature: "workflow-board",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "workflow", title: "Workflows", text: "Repeatable WordPress processes that no longer need a reminder." },
      { icon: "zap", title: "Triggers", text: "Forms, orders, and publishes that start the next step automatically." },
      { icon: "bell", title: "Notifications", text: "The right owner is told when something needs a human." },
      { icon: "waypoints", title: "Integrations", text: "WordPress talking to the tools your team already lives in." },
      { icon: "bot", title: "Automation", text: "Assistive AI and routing, with review on anything customer-facing." },
    ],
    process: [
      { n: "01", title: "Map", text: "Document the repetitive steps after a lead, order, or publish.", icon: "search" },
      { n: "02", title: "Design", text: "Define triggers, human review, and fallbacks before anything runs.", icon: "file" },
      { n: "03", title: "Automate", text: "Build the WordPress workflow with logging you can inspect.", icon: "bot" },
      { n: "04", title: "Train", text: "Show the team what runs alone and what still needs a person.", icon: "users" },
    ],
    featuresHeading: "WHAT WE AUTOMATE",
    featuresTitle: "Less Busywork, With Humans Still in Control",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "Hours Returned to Delivery Instead of Admin",
    signatureEyebrow: "WORKFLOW",
    signatureTitle: "Trigger, Automate, Review, Then Notify",
    signatureText: "Automation is built as a reviewable system, not an unsupervised experiment.",
    processTitle: "From a Repeated Task to a Controlled Workflow",
    ctaTitle: "Ready to Remove Repeat Work From WordPress?",
    ctaText: "Describe the process that eats time after every lead or order. We will design an automation that stays under human control.",
  },
  seo: {
    slug: "seo",
    heroFrame: "dashboard",
    overviewFlipped: false,
    signature: "seo-board",
    hideOverviewPhoto: false,
    hideBenefitsPhoto: false,
    focus: [
      { icon: "search", title: "Keywords", text: "Pages structured around the queries the business can actually win." },
      { icon: "chart", title: "Analytics", text: "Measurement that shows what to fix next, not vanity screenshots." },
      { icon: "code", title: "Technical SEO", text: "Indexation, metadata, sitemaps, and crawlable templates." },
      { icon: "globe", title: "Rankings", text: "Architecture and internal links that support visibility over time." },
      { icon: "zap", title: "Optimization", text: "On-page templates and performance work that search can use." },
    ],
    process: [
      { n: "01", title: "Audit", text: "Review crawlability, templates, metadata, and the pages that matter.", icon: "search" },
      { n: "02", title: "Prioritize", text: "Separate technical fixes from content and architecture work.", icon: "file" },
      { n: "03", title: "Implement", text: "Improve WordPress templates, metadata, and internal structure.", icon: "code" },
      { n: "04", title: "Measure", text: "Set the next-step plan so SEO work continues after handover.", icon: "chart" },
    ],
    featuresHeading: "WHAT THE SEO WORK COVERS",
    featuresTitle: "Search Structure Built Into WordPress",
    benefitsHeading: "BUSINESS IMPACT",
    benefitsTitle: "Visibility Work the CMS Can Sustain",
    signatureEyebrow: "SEARCH CONSOLE",
    signatureTitle: "Keywords, Technical SEO, and Templates in One View",
    signatureText: "We fix the WordPress foundations content teams need, then leave a plan for the pages that should grow.",
    processTitle: "From a Technical Audit to a Clear Next-Step Plan",
    ctaTitle: "Ready to Improve Your WordPress Search Visibility?",
    ctaText: "Share the site and the pages that should rank. We will audit the WordPress foundations and recommend practical SEO work.",
  },
};

export function getCategoryTheme(categorySlug: string): CategoryTheme {
  if (categorySlug === "maintain") return themes.retainers;
  return themes[categorySlug as ServiceCategoryThemeSlug] ?? themes.setup;
}

export function heroHeadlineFor(service: ServiceItem) {
  const headlines: Record<string, string> = {
    "custom-websites": "A Custom WordPress Website Built Around How You Sell",
    "wordpress-setup": "WordPress Installed, Configured, and Ready for Real Work",
    "woocommerce-setup": "A WooCommerce Store Configured for Real Orders",
    "learndash-setup": "LearnDash Set Up for How You Actually Teach",
    "woocommerce-development": "WooCommerce Built Around Your Sales Model",
    "learndash-development": "A LearnDash Academy That Matches How You Teach",
    "wordpress-customization": "Make WordPress Fit Your Brand and Workflow",
    "woocommerce-customization": "Shape Product, Cart, and Checkout Around Your Store",
    "learndash-customization": "A LearnDash Experience That Feels Designed",
    "plugin-development": "Custom Plugins for Features That Should Not Live in the Theme",
    "migrate-to-wordpress": "Move to WordPress Without Losing Content or Rankings",
    "migrate-to-woocommerce": "Move Your Catalog and Customers onto WooCommerce",
    "migrate-to-learndash": "Bring Courses and Learners onto LearnDash",
    "website-management": "Ongoing WordPress Management After Launch",
    "hire-wordpress-developers": "Senior WordPress Developers on a Retainer",
    "hire-woocommerce-developers": "WooCommerce Specialists When Store Work Cannot Wait",
    "hire-learndash-developers": "LearnDash Developers Embedded With Your Team",
    "wordpress-re-design": "A Modern WordPress Experience Without Starting From Zero",
    "landing-page-redesign": "Landing Pages Built to Convert the Traffic You Already Have",
    "wordpress-speed-optimization": "WordPress Performance Visitors Can Feel",
    "woocommerce-speed-optimization": "Faster Catalog, Product, and Checkout Pages",
    "wordpress-api-development": "Connect WordPress to the Rest of Your Stack",
    "wordpress-ai-automation": "WordPress Automation That Stays Under Human Control",
    "wordpress-seo-services": "WordPress SEO Built Into the CMS, Not Sprinkled On Later",
  };
  return headlines[service.slug] ?? service.title;
}
