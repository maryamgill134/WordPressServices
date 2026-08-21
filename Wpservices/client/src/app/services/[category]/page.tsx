import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/service-pages";
import { allCategories, getCategory } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return allCategories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category);
  if (!category) return { title: "Services" };
  return {
    title: category.title,
    description: category.summary,
  };
}

export default function ServiceCategoryRoute({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
