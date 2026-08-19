import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PluginProductPage } from "@/components/plugin-product-page";
import { getPluginBySlug, getProductPlugins } from "@/data/plugins";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProductPlugins().map((plugin) => ({
    slug: plugin.href.replace("/products/", ""),
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const plugin = getPluginBySlug(params.slug);
  if (!plugin) return { title: "Plugin" };
  return {
    title: plugin.name,
    description: plugin.overview ?? plugin.description,
  };
}

export default function PluginProductRoute({ params }: { params: { slug: string } }) {
  const plugin = getPluginBySlug(params.slug);
  if (!plugin) notFound();
  return <PluginProductPage plugin={plugin} />;
}
