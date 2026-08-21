export type ServiceCardImage = {
  src: string;
  alt: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fm=jpg&fit=crop&w=1600&h=1000&q=80`;

export const serviceCardImages: Record<string, ServiceCardImage> = {
  "custom-websites": {
    src: unsplash("1499951360447-b19be8fe80f5"),
    alt: "Custom website layouts on a laptop and desktop, representing a branded WordPress site build",
  },
  "wordpress-setup": {
    src: "/services/wordpress-setup.jpg",
    alt: "WordPress PHP theme code in an editor, representing WordPress installation and configuration",
  },
  "woocommerce-setup": {
    src: "/services/woocommerce-setup.jpg",
    alt: "Store checkout with a tablet POS and contactless payment, representing WooCommerce store setup",
  },
  "learndash-setup": {
    src: unsplash("1513258496099-48168024aec0"),
    alt: "Learner using a laptop for an online course, representing LearnDash course setup",
  },
  "woocommerce-development": {
    src: "/services/woocommerce-development.jpg",
    alt: "Contactless mobile payment at a store counter, representing custom WooCommerce checkout development",
  },
  "learndash-development": {
    src: unsplash("1488190211105-8b0e65b80b4e"),
    alt: "Course creator writing on a laptop, representing custom LearnDash LMS development",
  },
  "wordpress-customization": {
    src: "/services/wordpress-customization.jpg",
    alt: "Color swatches and UI sketches on a tablet, representing WordPress theme and block customization",
  },
  "woocommerce-customization": {
    src: unsplash("1441986300917-64674bd600d8"),
    alt: "Clothing boutique product displays, representing WooCommerce catalog and storefront customization",
  },
  "learndash-customization": {
    src: unsplash("1434030216411-0b793f4b4173"),
    alt: "Student writing notes beside a laptop, representing LearnDash course layout customization",
  },
  "plugin-development": {
    src: "/services/plugin-development.jpg",
    alt: "PHP and HTML in a code editor on a laptop, representing custom WordPress plugin development",
  },
  "migrate-to-wordpress": {
    src: unsplash("1504384308090-c894fdcc538d"),
    alt: "Developers working across multiple computers, representing a CMS migration onto WordPress",
  },
  "migrate-to-woocommerce": {
    src: unsplash("1586528116311-ad8dd3c8310d"),
    alt: "Warehouse inventory aisles, representing a product catalog migration onto WooCommerce",
  },
  "migrate-to-learndash": {
    src: unsplash("1523240795612-9a054b0db644"),
    alt: "Students studying together with laptops, representing a course and learner migration onto LearnDash",
  },
  "wordpress-maintenance": {
    src: "/services/wordpress-maintenance.jpg",
    alt: "Engineer working on a laptop in a technical lab, representing WordPress updates, backups, and maintenance",
  },
  "website-management": {
    src: "/services/website-management.jpg",
    alt: "Website operations dashboard with charts and metrics, representing ongoing WordPress website management",
  },
  "hire-wordpress-developers": {
    src: "/services/hire-wordpress-developers.jpg",
    alt: "Development team coding together on laptops, representing hired WordPress developers",
  },
  "hire-woocommerce-developers": {
    src: "/services/hire-woocommerce-developers.jpg",
    alt: "Point-of-sale terminal totaling a product order, representing hired WooCommerce specialists",
  },
  "hire-learndash-developers": {
    src: unsplash("1509062522246-3755977927d7"),
    alt: "Instructor teaching in a classroom, representing hired LearnDash LMS specialists",
  },
  "wordpress-re-design": {
    src: "/services/wordpress-re-design.jpg",
    alt: "Website design and code shown side by side on a desktop, representing a WordPress redesign",
  },
  "landing-page-redesign": {
    src: "/services/landing-page-redesign.jpg",
    alt: "Marketing landing page on a laptop screen, representing landing page redesign",
  },
  "wordpress-speed-optimization": {
    src: "/services/wordpress-speed-optimization.jpg",
    alt: "Page load time and bounce-rate analytics, representing WordPress speed optimization",
  },
  "woocommerce-speed-optimization": {
    src: "/services/woocommerce-speed-optimization.jpg",
    alt: "Person entering card details on a laptop, representing faster WooCommerce checkout performance",
  },
  "wordpress-api-development": {
    src: "/services/wordpress-api-development.jpg",
    alt: "Server racks and network cabling, representing WordPress API and integration development",
  },
  "wordpress-ai-automation": {
    src: "/services/wordpress-ai-automation.jpg",
    alt: "Stylized AI lettering in a digital network, representing WordPress AI automation",
  },
  "wordpress-seo-services": {
    src: unsplash("1743796055664-3473eedab36e"),
    alt: "Magnifying glass beside a laptop, representing WordPress search engine optimization",
  },
};

const fallback = serviceCardImages["custom-websites"];

export function getServiceCardImage(slug: string) {
  return (serviceCardImages[slug] ?? fallback).src;
}

export function getServiceCardAlt(slug: string, title: string) {
  return serviceCardImages[slug]?.alt ?? title;
}
