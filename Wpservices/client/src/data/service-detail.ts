import type { ServiceCategory, ServiceItem } from "@/data/services";

export type DetailIcon =
  | "code"
  | "gauge"
  | "shield"
  | "devices"
  | "search"
  | "waypoints"
  | "bot"
  | "palette"
  | "wrench"
  | "cart"
  | "book"
  | "badge"
  | "file"
  | "layout"
  | "users"
  | "blocks"
  | "sparkles"
  | "refresh"
  | "globe";

export type ServiceMediaFrame = "browser" | "dashboard" | "photo" | "editor";

export const serviceDetailProcess = [
  { n: "01", title: "Discover", text: "Understand your goals, constraints, and current setup.", icon: "search" as const },
  { n: "02", title: "Plan", text: "Define the technical approach, scope, and timeline.", icon: "file" as const },
  { n: "03", title: "Build", text: "Design, develop, and integrate the solution.", icon: "code" as const },
  { n: "04", title: "Launch", text: "Test, refine, and go live with a clear handover.", icon: "sparkles" as const },
] as const;

const maintenanceProcess = [
  { n: "01", title: "Monitor", text: "Uptime, security, and performance are watched so issues surface early.", icon: "search" as const },
  { n: "02", title: "Maintain", text: "Updates, backups, and housekeeping run on a cadence that protects compatibility.", icon: "file" as const },
  { n: "03", title: "Resolve", text: "When something fails, we isolate it, roll back if needed, and restore a working site.", icon: "code" as const },
  { n: "04", title: "Report", text: "You receive a plain-language summary of what changed and what to do next.", icon: "sparkles" as const },
] as const;

export function processFor(service: ServiceItem) {
  if (service.slug === "wordpress-maintenance") return maintenanceProcess;
  return serviceDetailProcess;
}

const heroHeadlines: Record<string, string> = {
  "custom-websites": "Custom WordPress Websites Built to Convert",
  "wordpress-setup": "WordPress Setup That's Ready for Real Work",
  "woocommerce-setup": "WooCommerce Setup for a Store You Can Run",
  "learndash-setup": "LearnDash Setup With a Clear Path to Enrol",
  "woocommerce-development": "WooCommerce Development Built for How You Sell",
  "learndash-development": "Custom LearnDash Experiences Students Finish",
  "wordpress-customization": "WordPress Customization Without Fighting the Theme",
  "woocommerce-customization": "WooCommerce Storefronts Tuned to Convert",
  "learndash-customization": "LearnDash That Looks Like Your Product",
  "plugin-development": "Custom WordPress Plugins Built to Last",
  "migrate-to-wordpress": "Move to WordPress Without Losing What Works",
  "migrate-to-woocommerce": "Move Your Catalog to WooCommerce Cleanly",
  "migrate-to-learndash": "Move Courses and Learners to LearnDash",
  "wordpress-maintenance": "Keep Your WordPress Website Secure, Updated & Performing at Its Best",
  "website-management": "Website Management With a Steady Operating Rhythm",
  "hire-wordpress-developers": "Hire WordPress Developers Who Know the Stack",
  "hire-woocommerce-developers": "Hire WooCommerce Specialists for Store Work",
  "hire-learndash-developers": "Hire LearnDash Developers for LMS Delivery",
  "wordpress-re-design": "A WordPress Redesign Built to Convert",
  "landing-page-redesign": "Landing Pages With One Offer and One Action",
  "wordpress-speed-optimization": "WordPress Speed You Can Measure",
  "woocommerce-speed-optimization": "Faster WooCommerce Where It Counts",
  "wordpress-api-development": "WordPress APIs That Connect Cleanly",
  "wordpress-ai-automation": "WordPress AI Automation Under Human Control",
  "wordpress-seo-services": "WordPress SEO That Compounds Over Time",
};

export function heroHeadlineFor(service: ServiceItem) {
  return heroHeadlines[service.slug] ?? service.title;
}

export function overviewHeadingFor(service: ServiceItem) {
  return service.benefit.replace(/\.$/, "");
}

const iconPool: DetailIcon[] = [
  "layout", "code", "gauge", "shield", "devices", "search", "waypoints", "bot",
  "palette", "wrench", "cart", "book", "badge", "file", "users", "blocks",
  "sparkles", "refresh", "globe",
];

function uniqueIcons(preferred: DetailIcon[]) {
  const used = new Set<DetailIcon>();
  return preferred.map((icon) => {
    if (!used.has(icon)) {
      used.add(icon);
      return icon;
    }
    const next = iconPool.find((item) => !used.has(item)) ?? "sparkles";
    used.add(next);
    return next;
  });
}

export function chromeLabelFor(slug: string, frame: ServiceMediaFrame, _categorySlug = "") {
  if (frame === "editor") return "wp-admin / editor";
  if (frame !== "dashboard") return browserUrlFor(slug);
  if (slug.includes("seo")) return "Search performance";
  if (slug.includes("speed")) return "Core Web Vitals";
  if (slug.includes("api")) return "API console";
  if (slug.includes("website-management") || slug.includes("maintenance")) return "Operations dashboard";
  return "Performance overview";
}

export function browserUrlFor(slug: string) {
  if (slug.includes("woocommerce")) return "yoursite.com/shop";
  if (slug.includes("learndash")) return "yoursite.com/courses";
  if (slug.includes("seo")) return "search.yoursite.com";
  if (slug.includes("api")) return "api.yoursite.com";
  if (slug.includes("landing")) return "yoursite.com/offer";
  if (slug.includes("ai") || slug.includes("automat")) return "yoursite.com/workflows";
  return "yoursite.com";
}

export function heroFrameFor(slug: string): ServiceMediaFrame {
  if (/seo|speed|website-management|api/.test(slug)) return "dashboard";
  if (/hire-|maintenance|migrate-to-woocommerce|migrate-to-learndash/.test(slug)) return "photo";
  return "browser";
}

export function getServiceTechnologies(category: ServiceCategory, service: ServiceItem) {
  const slug = service.slug;
  const isWoo = slug.includes("woocommerce");
  const isLd = slug.includes("learndash");
  const isSeo = slug.includes("seo");
  const isAi = /(^|-)ai(-|$)|automat/.test(slug);
  const isApi = slug.includes("api");
  const isPlugin = slug.includes("plugin");
  const isSpeed = slug.includes("speed");
  const isRedesign = /re-design|landing/.test(slug);

  const items = category.technologies.filter((tech) => {
    if (tech === "LearnDash" && !isLd) return false;
    if (tech === "WooCommerce" && !isWoo && !isApi) return false;
    if (tech === "Elementor" && !isRedesign && slug !== "custom-websites" && category.slug !== "customize") return false;
    if (tech === "AI Automation" && !isAi) return false;
    if (tech === "APIs" && !isApi && category.slug !== "integrate") return false;
    return true;
  });

  const add = (tech: string) => {
    if (!items.includes(tech)) items.push(tech);
  };

  if (!items.includes("WordPress")) items.unshift("WordPress");
  if (isWoo) add("WooCommerce");
  if (isLd) add("LearnDash");
  if (isSeo) add("SEO");
  if (isAi) add("AI Automation");
  if (isApi) add("REST API");
  if (isPlugin || isApi) add("PHP");
  if (isSpeed) add("JavaScript");
  if ((isRedesign || slug === "custom-websites" || category.slug === "customize") && category.technologies.includes("Elementor")) {
    add("Elementor");
  }

  return items.filter((tech) => !(isApi && tech === "APIs"));
}

export function featureTextFor(item: string) {
  const text = item.toLowerCase();
  if (/wordpress updates/.test(text)) {
    return "Core, plugin, and theme updates on a cadence that protects compatibility.";
  }
  if (/daily backups/.test(text)) {
    return "Offsite copies are taken daily and treated as restore points, not just files.";
  }
  if (/uptime monitoring/.test(text)) {
    return "Availability is watched so outages are noticed before customers report them.";
  }
  if (/bug fixes/.test(text)) {
    return "When something fails, a specialist who already knows the site owns the fix.";
  }
  if (/human review/.test(text)) {
    return "A person still signs off before anything customer-facing goes out.";
  }
  if (/\blogging\b|fallback/.test(text)) {
    return "Failures are visible, retryable, and never a silent dead end.";
  }
  if (/api|integrat|endpoint|connector/.test(text)) {
    return "Systems connect through clean, documented interfaces instead of fragile workarounds.";
  }
  if (/\bai\b|automat|workflow|\btriggers?\b/.test(text)) {
    return "Repeatable work is automated with human review where quality still matters.";
  }
  if (/audit|review|discover|workshop|mapping|inventory/.test(text)) {
    return "We start with the current setup so the work is scoped to what actually matters.";
  }
  if (/install|setup|configuration|environment|permalink/.test(text)) {
    return "The platform is configured correctly from day one, not left on defaults.";
  }
  if (/checkout|cart|payment|gateway|order/.test(text)) {
    return "Purchase flows stay reliable, on-brand, and easier for customers to complete.";
  }
  if (/product|catalog|pricing|variation/.test(text)) {
    return "Catalog structure and buying logic match how you actually sell.";
  }
  if (/responsive|mobile/.test(text)) {
    return "The experience stays readable and usable on phones, tablets, and desktops.";
  }
  if (/conversion|lead path|core pages/.test(text)) {
    return "Key pages are structured so visitors always have a clear next step.";
  }
  if (/launch|checklist/.test(text)) {
    return "Go-live is planned: content, forms, redirects, and a working handoff.";
  }
  if (/template|theme|block|visual|design|wireframe|ux|layout/.test(text)) {
    return "Layouts and interface details are shaped around your brand and content.";
  }
  if (/security|hardening|capability|auth/.test(text)) {
    return "Access, updates, and hardening are part of delivery, not an afterthought.";
  }
  if (/performance|cache|image optimization|script|vitals|speed/.test(text)) {
    return "Pages are measured and tuned so they load faster where it counts.";
  }
  if (/seo|metadata|sitemap|redirect/.test(text)) {
    return "Search structure stays intact and is improved where the CMS is holding it back.";
  }
  if (/qa|test|verification|walkthrough/.test(text)) {
    return "We verify the real paths your team and customers will use before launch.";
  }
  if (/training|handover|documentation|orientation|reporting|status/.test(text)) {
    return "Your team knows what changed and how to keep operating after handover.";
  }
  if (/backup|update|monitor|uptime|support/.test(text)) {
    return "Ongoing care is structured so issues are caught before they become incidents.";
  }
  if (/plugin|architecture|custom/.test(text)) {
    return "Custom work is built to survive updates and stay maintainable.";
  }
  if (/content type|recommendation/.test(text)) {
    return "Page types and content patterns are planned so publishing supports growth.";
  }
  if (/measurement|next-step|plan/.test(text)) {
    return "You leave with a clear view of what improved and what to do next.";
  }
  if (/hour bank|ticket|sprint|slack|cadence|dedicated/.test(text)) {
    return "Reserved capacity and a clear working rhythm instead of restarting every request.";
  }
  return `${item.replace(/\.$/, "")} is delivered as core work, not a bolt-on extra.`;
}

export function featureIconFor(item: string): DetailIcon {
  const text = item.toLowerCase();
  if (/security|hardening|capability|auth/.test(text)) return "shield";
  if (/performance|cache|speed|vitals|image optimization|script/.test(text)) return "gauge";
  if (/seo|metadata|sitemap|search/.test(text)) return "search";
  if (/api|integrat|endpoint|connector/.test(text)) return "waypoints";
  if (/\bai\b|automat|workflow|trigger/.test(text)) return "bot";
  if (/responsive|mobile/.test(text)) return "devices";
  if (/payment|checkout|cart|order|product|catalog|pricing/.test(text)) return "cart";
  if (/plugin|architecture|code|php|custom plugin/.test(text)) return "code";
  if (/design|visual|template|theme|ux|wireframe|layout|block/.test(text)) return "palette";
  if (/backup|update|maintenance|monitor|support/.test(text)) return "wrench";
  if (/training|handover|documentation|walkthrough|orientation/.test(text)) return "file";
  if (/qa|test|verification/.test(text)) return "badge";
  if (/course|lesson|learner|instructor|lms/.test(text)) return "book";
  if (/hour|ticket|sprint|dedicated|team|slack/.test(text)) return "users";
  if (/redirect|url|migrate|import/.test(text)) return "refresh";
  if (/install|setup|environment|core pages/.test(text)) return "globe";
  if (/feature specification|custom/.test(text)) return "blocks";
  return "sparkles";
}

export function uniqueFeatureIcons(items: string[]) {
  return uniqueIcons(items.map(featureIconFor));
}

export function uniqueBenefitIcons(items: { title: string }[]) {
  return uniqueIcons(items.map((item) => benefitIconFor(item.title)));
}

export function benefitIconFor(title: string): DetailIcon {
  const text = title.toLowerCase();
  if (/performance|speed|fast/.test(text)) return "gauge";
  if (/scalable|scale|growth/.test(text)) return "waypoints";
  if (/user|experience|learner|customer|editing|editor/.test(text)) return "devices";
  if (/reliable|quality|update-safe|maintain/.test(text)) return "shield";
  if (/security|trust/.test(text)) return "shield";
  if (/seo|search|visibility/.test(text)) return "search";
  if (/brand|visual|design|fit|cohesion/.test(text)) return "palette";
  if (/commerce|store|checkout|product|sales/.test(text)) return "cart";
  if (/plugin|collision/.test(text)) return "blocks";
  if (/operation|manual/.test(text)) return "wrench";
  if (/code|maintainable/.test(text)) return "code";
  if (/team|instructor|staff/.test(text)) return "users";
  if (/automat|ai/.test(text)) return "bot";
  if (/integrat|api|connect/.test(text)) return "waypoints";
  if (/mobile/.test(text)) return "devices";
  return "sparkles";
}

export function showcaseCopy(service: ServiceItem, category: ServiceCategory) {
  if (category.slug === "redesign" || service.slug.includes("re-design")) {
    return {
      kicker: "TRANSFORMATION",
      title: "A clearer experience, built to convert.",
      text: service.benefit,
    };
  }
  if (category.slug === "speed" || service.slug.includes("speed")) {
    return {
      kicker: "PERFORMANCE",
      title: "Speed you can measure and feel.",
      text: service.benefit,
    };
  }
  if (category.slug === "seo") {
    return {
      kicker: "SEARCH",
      title: "Visibility that compounds over time.",
      text: service.benefit,
    };
  }
  if (service.slug.includes("woocommerce")) {
    return {
      kicker: "COMMERCE",
      title: "A storefront that looks as good as it sells.",
      text: service.benefit,
    };
  }
  if (service.slug.includes("ai") || category.slug === "automate") {
    return {
      kicker: "AUTOMATION",
      title: "Workflows that save hours, not just clicks.",
      text: service.benefit,
    };
  }
  if (service.slug.includes("api") || category.slug === "integrate") {
    return {
      kicker: "INTEGRATION",
      title: "Systems that talk to each other cleanly.",
      text: service.benefit,
    };
  }
  if (service.slug.includes("learndash")) {
    return {
      kicker: "LEARNING",
      title: "Course experiences built around how you teach.",
      text: service.benefit,
    };
  }
  if (category.slug === "migrate") {
    return {
      kicker: "MIGRATION",
      title: "Move the business without losing the work already done.",
      text: service.benefit,
    };
  }
  return {
    kicker: "SHOWCASE",
    title: service.benefit,
    text: service.short,
  };
}
