import type { MetadataRoute } from "next";
import { allCategories, getAllServicePaths } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const servicePages = [
    "/services",
    ...allCategories.map((category) => `/services/${category.slug}`),
    ...getAllServicePaths().map((path) => `/services/${path.category}/${path.service}`),
  ];

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
    ...servicePages.map((path) => ({
      url: `https://wpservices.com${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/services" ? 0.8 : 0.7,
    })),
  ];
}
