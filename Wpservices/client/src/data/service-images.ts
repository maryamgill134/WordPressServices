export const serviceCardImages: Record<string, string> = {
  "custom-websites": "/services/custom-websites.jpg",
  "wordpress-setup": "/services/wordpress-setup.jpg",
  "woocommerce-setup": "/services/woocommerce-setup.jpg",
  "learndash-setup": "/services/learndash-setup.jpg",
  "woocommerce-development": "/services/woocommerce-development.jpg",
  "learndash-development": "/services/learndash-development.jpg",
  "wordpress-customization": "/services/wordpress-customization.jpg",
  "woocommerce-customization": "/services/woocommerce-customization.jpg",
  "learndash-customization": "/services/learndash-customization.jpg",
  "plugin-development": "/services/plugin-development.jpg",
  "migrate-to-wordpress": "/services/migrate-to-wordpress.jpg",
  "migrate-to-woocommerce": "/services/migrate-to-woocommerce.jpg",
  "migrate-to-learndash": "/services/migrate-to-learndash.jpg",
  "wordpress-maintenance": "/services/wordpress-maintenance.jpg",
  "website-management": "/services/website-management.jpg",
  "hire-wordpress-developers": "/services/hire-wordpress-developers.jpg",
  "hire-woocommerce-developers": "/services/hire-woocommerce-developers.jpg",
  "hire-learndash-developers": "/services/hire-learndash-developers.jpg",
  "wordpress-re-design": "/services/wordpress-re-design.jpg",
  "landing-page-redesign": "/services/landing-page-redesign.jpg",
  "wordpress-speed-optimization": "/services/wordpress-speed-optimization.jpg",
  "woocommerce-speed-optimization": "/services/woocommerce-speed-optimization.jpg",
  "wordpress-api-development": "/services/wordpress-api-development.jpg",
  "wordpress-ai-automation": "/services/wordpress-ai-automation.jpg",
  "wordpress-seo-services": "/services/wordpress-seo-services.jpg",
};

export function getServiceCardImage(slug: string) {
  return serviceCardImages[slug] ?? "/services/custom-websites.jpg";
}
