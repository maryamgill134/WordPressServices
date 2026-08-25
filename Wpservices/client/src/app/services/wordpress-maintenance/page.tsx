import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { MaintenanceDetailExtras } from "@/components/maintain-page";
import { getService } from "@/data/services";

const found = getService("maintain", "wordpress-maintenance");

export const metadata: Metadata = {
  title: "WordPress Maintenance",
  description:
    found?.service.short ??
    "Updates, backups, security, monitoring, and support on a predictable cadence.",
  alternates: { canonical: "/services/wordpress-maintenance" },
};

export default function WordpressMaintenanceRoute() {
  if (!found) notFound();
  return (
    <ServiceDetailPage category={found.category} service={found.service}>
      <MaintenanceDetailExtras faqs={found.service.faqs} />
    </ServiceDetailPage>
  );
}
