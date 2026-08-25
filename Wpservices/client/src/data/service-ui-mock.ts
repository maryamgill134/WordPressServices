export type UiMockKind =
  | "site-home"
  | "site-inner"
  | "gutenberg"
  | "wp-setup"
  | "wp-settings"
  | "woo-admin"
  | "woo-shop"
  | "woo-product"
  | "woo-checkout"
  | "ld-builder"
  | "ld-player"
  | "ld-student"
  | "ld-enroll"
  | "ld-course"
  | "plugin-settings"
  | "plugin-code"
  | "migrate-wp"
  | "migrate-woo"
  | "migrate-ld"
  | "ops-dash"
  | "content-queue"
  | "sprint-board"
  | "landing"
  | "landing-form"
  | "speed"
  | "cache-panel"
  | "speed-shop"
  | "api"
  | "integrate"
  | "workflow"
  | "review-queue"
  | "seo"
  | "serp";

export type UiFrame = "browser" | "dashboard" | "editor";

export type ServiceFocusChip = { icon: string; title: string };

export type ServiceVisual = {
  hero: UiMockKind;
  overview: UiMockKind;
  heroFrame: UiFrame;
  overviewFrame: UiFrame;
  heroLabel: string;
  overviewLabel: string;
  focus: ServiceFocusChip[];
  processTitle?: string;
  ctaTitle?: string;
  ctaText?: string;
};

const visuals: Record<string, ServiceVisual> = {
  "custom-websites": {
    hero: "site-home",
    overview: "gutenberg",
    heroFrame: "browser",
    overviewFrame: "editor",
    heroLabel: "yoursite.com",
    overviewLabel: "wp-admin / editor",
    focus: [
      { icon: "layout", title: "Layout" },
      { icon: "palette", title: "Branding" },
      { icon: "target", title: "Conversion" },
      { icon: "blocks", title: "CMS" },
    ],
  },
  "wordpress-setup": {
    hero: "wp-setup",
    overview: "wp-settings",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "wp-admin / setup",
    overviewLabel: "wp-admin / settings",
    focus: [
      { icon: "globe", title: "Installation" },
      { icon: "sliders", title: "Configuration" },
      { icon: "shield", title: "Security" },
      { icon: "sparkles", title: "Launch" },
    ],
  },
  "woocommerce-setup": {
    hero: "woo-admin",
    overview: "woo-checkout",
    heroFrame: "dashboard",
    overviewFrame: "browser",
    heroLabel: "wp-admin / woocommerce",
    overviewLabel: "yoursite.com/checkout",
    focus: [
      { icon: "cart", title: "Products" },
      { icon: "badge", title: "Payments" },
      { icon: "server", title: "Shipping" },
      { icon: "target", title: "Checkout" },
    ],
  },
  "learndash-setup": {
    hero: "ld-builder",
    overview: "ld-enroll",
    heroFrame: "dashboard",
    overviewFrame: "browser",
    heroLabel: "wp-admin / learndash",
    overviewLabel: "yoursite.com/courses",
    focus: [
      { icon: "book", title: "Courses" },
      { icon: "file", title: "Lessons" },
      { icon: "shield", title: "Access" },
      { icon: "users", title: "Enrollment" },
    ],
  },
  "woocommerce-development": {
    hero: "woo-shop",
    overview: "woo-checkout",
    heroFrame: "browser",
    overviewFrame: "browser",
    heroLabel: "yoursite.com/shop",
    overviewLabel: "yoursite.com/checkout",
    focus: [
      { icon: "cart", title: "Checkout" },
      { icon: "layout", title: "Catalog" },
      { icon: "sliders", title: "Pricing" },
      { icon: "badge", title: "Orders" },
    ],
  },
  "learndash-development": {
    hero: "ld-player",
    overview: "ld-student",
    heroFrame: "browser",
    overviewFrame: "dashboard",
    heroLabel: "yoursite.com/lesson",
    overviewLabel: "student / dashboard",
    focus: [
      { icon: "book", title: "Course UI" },
      { icon: "chart", title: "Reporting" },
      { icon: "shield", title: "Access" },
      { icon: "layout", title: "LMS" },
    ],
  },
  "wordpress-customization": {
    hero: "gutenberg",
    overview: "site-inner",
    heroFrame: "editor",
    overviewFrame: "browser",
    heroLabel: "wp-admin / editor",
    overviewLabel: "yoursite.com/services",
    focus: [
      { icon: "layout", title: "Templates" },
      { icon: "blocks", title: "Blocks" },
      { icon: "palette", title: "Branding" },
      { icon: "file", title: "Editor" },
    ],
  },
  "woocommerce-customization": {
    hero: "woo-product",
    overview: "woo-shop",
    heroFrame: "browser",
    overviewFrame: "browser",
    heroLabel: "yoursite.com/product",
    overviewLabel: "yoursite.com/shop",
    focus: [
      { icon: "layout", title: "Product pages" },
      { icon: "cart", title: "Cart" },
      { icon: "target", title: "Checkout" },
      { icon: "users", title: "Account" },
    ],
  },
  "learndash-customization": {
    hero: "ld-course",
    overview: "ld-player",
    heroFrame: "browser",
    overviewFrame: "browser",
    heroLabel: "yoursite.com/course",
    overviewLabel: "yoursite.com/lesson",
    focus: [
      { icon: "layout", title: "Course layout" },
      { icon: "devices", title: "Dashboard" },
      { icon: "waypoints", title: "Navigation" },
      { icon: "palette", title: "Brand" },
    ],
  },
  "plugin-development": {
    hero: "plugin-settings",
    overview: "plugin-code",
    heroFrame: "dashboard",
    overviewFrame: "editor",
    heroLabel: "wp-admin / plugins",
    overviewLabel: "plugin / source",
    focus: [
      { icon: "blocks", title: "Architecture" },
      { icon: "sliders", title: "Admin UI" },
      { icon: "shield", title: "Security" },
      { icon: "code", title: "Updates" },
    ],
  },
  "migrate-to-wordpress": {
    hero: "migrate-wp",
    overview: "site-home",
    heroFrame: "dashboard",
    overviewFrame: "browser",
    heroLabel: "migration / staging",
    overviewLabel: "yoursite.com",
    focus: [
      { icon: "backup", title: "Backup" },
      { icon: "file", title: "Content" },
      { icon: "refresh", title: "Redirects" },
      { icon: "badge", title: "Testing" },
    ],
  },
  "migrate-to-woocommerce": {
    hero: "migrate-woo",
    overview: "woo-admin",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "catalog / import",
    overviewLabel: "wp-admin / products",
    focus: [
      { icon: "cart", title: "Catalog" },
      { icon: "users", title: "Customers" },
      { icon: "badge", title: "Checkout" },
      { icon: "refresh", title: "Redirects" },
    ],
  },
  "migrate-to-learndash": {
    hero: "migrate-ld",
    overview: "ld-builder",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "courses / import",
    overviewLabel: "wp-admin / learndash",
    focus: [
      { icon: "book", title: "Courses" },
      { icon: "users", title: "Students" },
      { icon: "shield", title: "Access" },
      { icon: "badge", title: "QA" },
    ],
  },
  "wordpress-maintenance": {
    hero: "ops-dash",
    overview: "wp-settings",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "operations / maintenance",
    overviewLabel: "wp-admin / settings",
    focus: [
      { icon: "wrench", title: "Updates" },
      { icon: "shield", title: "Security" },
      { icon: "gauge", title: "Uptime" },
      { icon: "file", title: "Backups" },
    ],
  },
  "website-management": {
    hero: "ops-dash",
    overview: "content-queue",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "operations / website",
    overviewLabel: "wp-admin / pages",
    focus: [
      { icon: "file", title: "Content" },
      { icon: "badge", title: "QA" },
      { icon: "blocks", title: "Features" },
      { icon: "chart", title: "Reporting" },
    ],
  },
  "hire-wordpress-developers": {
    hero: "sprint-board",
    overview: "plugin-code",
    heroFrame: "dashboard",
    overviewFrame: "editor",
    heroLabel: "delivery / sprint",
    overviewLabel: "wordpress / codebase",
    focus: [
      { icon: "users", title: "Capacity" },
      { icon: "layout", title: "Sprints" },
      { icon: "code", title: "Code" },
      { icon: "badge", title: "QA" },
    ],
  },
  "hire-woocommerce-developers": {
    hero: "woo-shop",
    overview: "sprint-board",
    heroFrame: "browser",
    overviewFrame: "dashboard",
    heroLabel: "yoursite.com/shop",
    overviewLabel: "commerce / sprint",
    focus: [
      { icon: "cart", title: "Store" },
      { icon: "target", title: "Checkout" },
      { icon: "layout", title: "Catalog" },
      { icon: "badge", title: "QA" },
    ],
  },
  "hire-learndash-developers": {
    hero: "ld-student",
    overview: "sprint-board",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "lms / dashboard",
    overviewLabel: "learndash / sprint",
    focus: [
      { icon: "book", title: "LMS" },
      { icon: "layout", title: "Courses" },
      { icon: "chart", title: "Reporting" },
      { icon: "badge", title: "QA" },
    ],
  },
  "wordpress-re-design": {
    hero: "site-home",
    overview: "site-inner",
    heroFrame: "browser",
    overviewFrame: "browser",
    heroLabel: "yoursite.com",
    overviewLabel: "yoursite.com/services",
    focus: [
      { icon: "waypoints", title: "UX" },
      { icon: "layout", title: "UI" },
      { icon: "devices", title: "Responsive" },
      { icon: "target", title: "Conversion" },
    ],
  },
  "landing-page-redesign": {
    hero: "landing",
    overview: "landing-form",
    heroFrame: "browser",
    overviewFrame: "browser",
    heroLabel: "yoursite.com/offer",
    overviewLabel: "yoursite.com/offer#form",
    focus: [
      { icon: "sparkles", title: "Offer" },
      { icon: "badge", title: "Proof" },
      { icon: "file", title: "Form" },
      { icon: "devices", title: "Mobile" },
    ],
  },
  "wordpress-speed-optimization": {
    hero: "speed",
    overview: "cache-panel",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "performance / vitals",
    overviewLabel: "performance / cache",
    focus: [
      { icon: "layers", title: "Caching" },
      { icon: "image", title: "Images" },
      { icon: "code", title: "Scripts" },
      { icon: "gauge", title: "Vitals" },
    ],
  },
  "woocommerce-speed-optimization": {
    hero: "speed-shop",
    overview: "woo-shop",
    heroFrame: "dashboard",
    overviewFrame: "browser",
    heroLabel: "store / performance",
    overviewLabel: "yoursite.com/shop",
    focus: [
      { icon: "layout", title: "Catalog" },
      { icon: "image", title: "Product" },
      { icon: "cart", title: "Checkout" },
      { icon: "layers", title: "Cache" },
    ],
  },
  "wordpress-api-development": {
    hero: "api",
    overview: "integrate",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "wp-json / console",
    overviewLabel: "integrations / map",
    focus: [
      { icon: "code", title: "REST" },
      { icon: "users", title: "CRM" },
      { icon: "shield", title: "Auth" },
      { icon: "file", title: "Logging" },
    ],
  },
  "wordpress-ai-automation": {
    hero: "workflow",
    overview: "review-queue",
    heroFrame: "dashboard",
    overviewFrame: "dashboard",
    heroLabel: "workflows / automation",
    overviewLabel: "workflows / review",
    focus: [
      { icon: "zap", title: "Triggers" },
      { icon: "badge", title: "Review" },
      { icon: "waypoints", title: "Routing" },
      { icon: "workflow", title: "Workflows" },
    ],
  },
  "wordpress-seo-services": {
    hero: "seo",
    overview: "serp",
    heroFrame: "dashboard",
    overviewFrame: "browser",
    heroLabel: "search / structure",
    overviewLabel: "search / snippet",
    focus: [
      { icon: "search", title: "Keywords" },
      { icon: "code", title: "Technical SEO" },
      { icon: "layout", title: "Templates" },
      { icon: "chart", title: "Measurement" },
    ],
  },
};

const categoryFallback: Record<string, ServiceVisual> = {
  setup: visuals["wordpress-setup"],
  customize: visuals["wordpress-customization"],
  migrate: visuals["migrate-to-wordpress"],
  maintain: visuals["wordpress-maintenance"],
  retainers: visuals["website-management"],
  redesign: visuals["wordpress-re-design"],
  speed: visuals["wordpress-speed-optimization"],
  integrate: visuals["wordpress-api-development"],
  automate: visuals["wordpress-ai-automation"],
  seo: visuals["wordpress-seo-services"],
};

export function getServiceVisual(slug: string, categorySlug: string): ServiceVisual {
  return visuals[slug] ?? categoryFallback[categorySlug] ?? visuals["wordpress-setup"];
}
