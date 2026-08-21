import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProjectPage } from "@/components/portfolio-project-page";
import { getPortfolioProject, portfolioProjects } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getPortfolioProject(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.theme,
  };
}

export default function PortfolioProjectRoute({ params }: { params: { slug: string } }) {
  const project = getPortfolioProject(params.slug);
  if (!project) notFound();
  return <PortfolioProjectPage project={project} />;
}
