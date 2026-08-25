export type ServiceCardImage = {
  src: string;
  alt: string;
};

const local = (slug: string) => `/services/${slug}.jpg`;

export const serviceCardImages: Record<string, ServiceCardImage> = {
  "custom-websites": {
    src: local("custom-websites"),
    alt: "Custom website layouts on a laptop and desktop, representing a branded WordPress site build",
  },
  "wordpress-setup": {
    src: local("wordpress-setup"),
    alt: "WordPress PHP theme code in an editor, representing WordPress installation and configuration",
  },
  "woocommerce-setup": {
    src: local("woocommerce-setup"),
    alt: "Store checkout with a tablet POS and contactless payment, representing WooCommerce store setup",
  },
  "learndash-setup": {
    src: local("learndash-setup"),
    alt: "Learner using a laptop for an online course, representing LearnDash course setup",
  },
  "woocommerce-development": {
    src: local("woocommerce-development"),
    alt: "Contactless mobile payment at a store counter, representing custom WooCommerce checkout development",
  },
  "learndash-development": {
    src: local("learndash-development"),
    alt: "Course creator writing on a laptop, representing custom LearnDash LMS development",
  },
  "wordpress-customization": {
    src: local("wordpress-customization"),
    alt: "Color swatches and UI sketches on a tablet, representing WordPress theme and block customization",
  },
  "woocommerce-customization": {
    src: local("woocommerce-customization"),
    alt: "Clothing boutique product displays, representing WooCommerce catalog and storefront customization",
  },
  "learndash-customization": {
    src: local("learndash-customization"),
    alt: "Student writing notes beside a laptop, representing LearnDash course layout customization",
  },
  "plugin-development": {
    src: local("plugin-development"),
    alt: "PHP and HTML in a code editor on a laptop, representing custom WordPress plugin development",
  },
  "migrate-to-wordpress": {
    src: local("migrate-to-wordpress"),
    alt: "Developers working across multiple computers, representing a CMS migration onto WordPress",
  },
  "migrate-to-woocommerce": {
    src: local("migrate-to-woocommerce"),
    alt: "Warehouse inventory aisles, representing a product catalog migration onto WooCommerce",
  },
  "migrate-to-learndash": {
    src: local("migrate-to-learndash"),
    alt: "Students studying together with laptops, representing a course and learner migration onto LearnDash",
  },
  "wordpress-maintenance": {
    src: local("wordpress-maintenance"),
    alt: "Engineer working on a laptop in a technical lab, representing WordPress updates, backups, and maintenance",
  },
  "website-management": {
    src: local("website-management"),
    alt: "Website operations dashboard with charts and metrics, representing ongoing WordPress website management",
  },
  "hire-wordpress-developers": {
    src: local("hire-wordpress-developers"),
    alt: "Development team coding together on laptops, representing hired WordPress developers",
  },
  "hire-woocommerce-developers": {
    src: local("hire-woocommerce-developers"),
    alt: "Point-of-sale terminal totaling a product order, representing hired WooCommerce specialists",
  },
  "hire-learndash-developers": {
    src: local("hire-learndash-developers"),
    alt: "Instructor teaching in a classroom, representing hired LearnDash LMS specialists",
  },
  "wordpress-re-design": {
    src: local("wordpress-re-design"),
    alt: "Website design and code shown side by side on a desktop, representing a WordPress redesign",
  },
  "landing-page-redesign": {
    src: local("landing-page-redesign"),
    alt: "Marketing landing page on a laptop screen, representing landing page redesign",
  },
  "wordpress-speed-optimization": {
    src: local("wordpress-speed-optimization"),
    alt: "Page load time and bounce-rate analytics, representing WordPress speed optimization",
  },
  "woocommerce-speed-optimization": {
    src: local("woocommerce-speed-optimization"),
    alt: "Person entering card details on a laptop, representing faster WooCommerce checkout performance",
  },
  "wordpress-api-development": {
    src: local("wordpress-api-development"),
    alt: "Server racks and network cabling, representing WordPress API and integration development",
  },
  "wordpress-ai-automation": {
    src: local("wordpress-ai-automation"),
    alt: "Stylized AI lettering in a digital network, representing WordPress AI automation",
  },
  "wordpress-seo-services": {
    src: local("wordpress-seo-services"),
    alt: "Search analytics and ranking performance, representing WordPress SEO services",
  },
};

const fallback = serviceCardImages["custom-websites"];

export function getServiceCardImage(slug: string) {
  return (serviceCardImages[slug] ?? fallback).src;
}

export function getServiceCardAlt(slug: string, title: string) {
  return serviceCardImages[slug]?.alt ?? title;
}

export type ServiceImageSlot = "hero" | "overview" | "benefits" | "showcase";

const detailExtras: Record<string, [string, string, string]> = {
  "custom-websites": ["wordpress-re-design", "landing-page-redesign", "wordpress-customization"],
  "wordpress-setup": ["plugin-development", "wordpress-maintenance", "custom-websites"],
  "woocommerce-setup": ["woocommerce-development", "woocommerce-customization", "hire-woocommerce-developers"],
  "learndash-setup": ["learndash-development", "learndash-customization", "hire-learndash-developers"],
  "woocommerce-development": ["woocommerce-setup", "woocommerce-customization", "woocommerce-speed-optimization"],
  "learndash-development": ["learndash-setup", "learndash-customization", "migrate-to-learndash"],
  "wordpress-customization": ["custom-websites", "wordpress-re-design", "landing-page-redesign"],
  "woocommerce-customization": ["woocommerce-setup", "woocommerce-development", "hire-woocommerce-developers"],
  "learndash-customization": ["learndash-setup", "learndash-development", "hire-learndash-developers"],
  "plugin-development": ["wordpress-setup", "wordpress-api-development", "hire-wordpress-developers"],
  "migrate-to-wordpress": ["wordpress-setup", "custom-websites", "wordpress-maintenance"],
  "migrate-to-woocommerce": ["woocommerce-setup", "woocommerce-development", "woocommerce-customization"],
  "migrate-to-learndash": ["learndash-setup", "learndash-development", "learndash-customization"],
  "wordpress-maintenance": ["website-management", "wordpress-setup", "plugin-development"],
  "website-management": ["wordpress-maintenance", "hire-wordpress-developers", "wordpress-speed-optimization"],
  "hire-wordpress-developers": ["plugin-development", "wordpress-setup", "custom-websites"],
  "hire-woocommerce-developers": ["woocommerce-development", "woocommerce-setup", "woocommerce-customization"],
  "hire-learndash-developers": ["learndash-development", "learndash-setup", "learndash-customization"],
  "wordpress-re-design": ["custom-websites", "landing-page-redesign", "wordpress-customization"],
  "landing-page-redesign": ["wordpress-re-design", "custom-websites", "wordpress-customization"],
  "wordpress-speed-optimization": ["website-management", "wordpress-seo-services", "wordpress-maintenance"],
  "woocommerce-speed-optimization": ["woocommerce-development", "woocommerce-setup", "wordpress-speed-optimization"],
  "wordpress-api-development": ["plugin-development", "wordpress-setup", "website-management"],
  "wordpress-ai-automation": ["wordpress-api-development", "plugin-development", "website-management"],
  "wordpress-seo-services": ["wordpress-speed-optimization", "website-management", "custom-websites"],
};

function imageFromSlug(slug: string) {
  return serviceCardImages[slug] ?? fallback;
}

export function getServiceDetailImage(slug: string, slot: ServiceImageSlot) {
  const hero = imageFromSlug(slug);
  if (slot === "hero") return hero;

  const related = detailExtras[slug] ?? ["wordpress-setup", "plugin-development", "website-management"];
  const index = slot === "overview" ? 0 : slot === "benefits" ? 1 : 2;
  const extra = imageFromSlug(related[index] ?? "wordpress-setup");
  return extra.src === hero.src ? imageFromSlug(related.find((item) => imageFromSlug(item).src !== hero.src) ?? "plugin-development") : extra;
}

if (process.env.NODE_ENV !== "production") {
  for (const slug of Object.keys(serviceCardImages)) {
    const srcs = (["hero", "overview", "benefits", "showcase"] as const).map((slot) => getServiceDetailImage(slug, slot).src);
    if (new Set(srcs).size !== srcs.length) {
      console.warn(`[service-images] duplicate detail images for ${slug}`, srcs);
    }
  }
}
