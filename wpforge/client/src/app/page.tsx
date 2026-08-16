import { LandingPage } from "@/components/landing-page";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "WPServices",
    url: "https://wpservices.com",
    email: "hello@wpservices.com",
    description:
      "Custom WordPress development, maintenance, SEO, performance, and security.",
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <LandingPage />
    </>
  );
}
