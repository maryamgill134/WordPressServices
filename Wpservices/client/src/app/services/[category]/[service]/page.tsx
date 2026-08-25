import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { getAllServicePaths, getService } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllServicePaths().filter(
    (path) => !(path.category === "maintain" && path.service === "wordpress-maintenance"),
  );
}

export function generateMetadata({ params }: { params: { category: string; service: string } }): Metadata {
  const found = getService(params.category, params.service);
  if (!found) return { title: "Services" };
  return {
    title: found.service.title,
    description: found.service.short,
  };
}

export default function ServiceDetailRoute({ params }: { params: { category: string; service: string } }) {
  const found = getService(params.category, params.service);
  if (!found) notFound();
  return <ServiceDetailPage category={found.category} service={found.service} />;
}
