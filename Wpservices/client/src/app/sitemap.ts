import type { MetadataRoute } from "next";
import { allCategories, getAllServicePaths } from "@/data/services";
import { getProductPlugins } from "@/data/plugins";
import { portfolioProjects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const servicePages = [
    "/services",
    ...allCategories.map((category) => `/services/${category.slug}`),
    ...getAllServicePaths().map((path) => `/services/${path.category}/${path.service}`),
  ];
  const productPages = getProductPlugins().map((plugin) => plugin.href);

  return [
    {
      url: "https://wpservices.com",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://wpservices.com/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://wpservices.com/products",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://wpservices.com/contact",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://wpservices.com/portfolio",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...portfolioProjects.map((project) => ({
      url: `https://wpservices.com/portfolio/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...servicePages.map((path) => ({
      url: `https://wpservices.com${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/services" ? 0.8 : 0.7,
    })),
    ...productPages.map((path) => ({
      url: `https://wpservices.com${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
