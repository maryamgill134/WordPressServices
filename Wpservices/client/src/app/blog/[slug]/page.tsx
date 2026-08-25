import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticlePage } from "@/components/insight-article-page";
import { getInsight, insights } from "@/data/insights";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getInsight(params.slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default function InsightArticleRoute({ params }: { params: { slug: string } }) {
  const article = getInsight(params.slug);
  if (!article) notFound();
  return <InsightArticlePage article={article} />;
}
