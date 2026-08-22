"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { CheckMark } from "@/components/check-mark";
import { PhoneField } from "@/components/phone-field";
import { contactLeadSchema } from "@/lib/lead-validation";
import { InnerPageHero } from "@/components/inner-page-hero";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const offices = [
  { country: "UAE", location: "Sahara Health Care City, Regus 524, Dubai", phone: "00971585847929", href: "tel:+971585847929" },
  { country: "Pakistan", location: "Gujranwala, Punjab", phone: "03042336926", href: "tel:+923042336926" },
  { country: "USA", location: "St. Petersburg, FL 33702", phone: "+1 (904) 243-5044", href: "tel:+19042435044" },
];

const expectations = [
  "Discovery call focused on your WordPress stack",
  "Written scope before work begins",
  "Staging review when hosting allows",
  "Post-launch support window on every project",
];

const budgets = ["$2,500–$5,000", "$5,000–$10,000", "$10,000–$20,000", "$20,000+"];

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "budget" | "message" | "consent", string>>;

export function ContactPage() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [phoneValid, setPhoneValid] = useState(true);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [startedAt, setStartedAt] = useState(() => Date.now());

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: "",
      service: "WordPress Consultation",
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
      startedAt,
    };

    const parsed = contactLeadSchema.safeParse(payload);
    const nextErrors: FieldErrors = {};
    if (!phoneValid) nextErrors.phone = "Please enter a valid WhatsApp number.";
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "name" || field === "email" || field === "phone" || field === "budget" || field === "message" || field === "consent") {
          nextErrors[field] = issue.message;
        }
      }
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setLeadStatus("error");
      setLeadMessage("Please review the highlighted fields.");
      return;
    }

    setErrors({});
    setLeadStatus("loading");
    setLeadMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
        errors?: { field: string; message: string }[];
      };
      if (!response.ok) {
        const apiErrors: FieldErrors = {};
        for (const issue of result.errors ?? []) {
          if (issue.field === "name" || issue.field === "email" || issue.field === "phone" || issue.field === "budget" || issue.field === "message" || issue.field === "consent") {
            apiErrors[issue.field] = issue.message;
          }
        }
        setErrors(apiErrors);
        throw new Error(result.message ?? "Unable to submit your request.");
      }

      form.reset();
      setStartedAt(Date.now());
      setLeadStatus("success");
      setLeadMessage(result.message ?? "Thanks! We’ll reply within one business day.");
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <div className="svc-page contact-page">
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        label="Contact"
        title="Contact Our WordPress Team"
        description="Tell us about your theme, WooCommerce store, migration, or retainer needs. We typically reply within 1–2 business days."
        primary={{ label: "Get Started", href: "#contact-form" }}
      />

      <section className="contact-shell">
        <div className="container contact-layout">
          <motion.div className="contact-studio" {...reveal}>
            <h2>Reach the Studio</h2>
            <div className="contact-channels">
              <a className="contact-channel glow-card" href="mailto:info@technologiallc.com">
                <span className="svc-card-icon"><Mail /></span>
                <div>
                  <small>Email</small>
                  <strong>info@technologiallc.com</strong>
                </div>
              </a>
              <a className="contact-channel glow-card" href="tel:+971585847929">
                <span className="svc-card-icon"><Phone /></span>
                <div>
                  <small>Phone</small>
                  <strong>00971585847929</strong>
                </div>
              </a>
            </div>

            <div className="contact-offices">
              <h3>Offices</h3>
              <div className="contact-office-grid">
                {offices.map((office) => (
                  <article className="glow-card" key={office.country}>
                    <span>{office.country}</span>
                    <p>{office.location}</p>
                    <a href={office.href}>{office.phone}</a>
                  </article>
                ))}
              </div>
            </div>

            <article className="svc-card contact-expect">
              <h3>What to expect</h3>
              <ul>
                {expectations.map((item) => (
                  <li key={item}><CheckMark size="compact" /><span>{item}</span></li>
                ))}
              </ul>
            </article>
          </motion.div>

          <motion.form id="contact-form" className="lead-form contact-form" onSubmit={submitLead} noValidate {...reveal}>
            <div className="contact-form-intro">
              <h2>Request a WordPress Consultation</h2>
              <p>Share a short brief — we usually reply within one business day.</p>
            </div>
            <div className="lead-form-row">
              <label>
                <span className="lead-field-label">Full Name *</span>
                <input className={errors.name ? "is-invalid" : undefined} name="name" required minLength={2} autoComplete="name" placeholder="Alex Morgan" aria-invalid={Boolean(errors.name)} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>
              <div className="lead-phone">
                <span className="lead-field-label">Phone <small>Optional</small></span>
                <PhoneField resetKey={startedAt} onValidityChange={setPhoneValid} />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="lead-form-row">
              <label>
                <span className="lead-field-label">Work Email *</span>
                <input className={errors.email ? "is-invalid" : undefined} name="email" required type="email" autoComplete="email" placeholder="alex@company.com" aria-invalid={Boolean(errors.email)} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
              <label>
                <span className="lead-field-label">Project Budget *</span>
                <select className={errors.budget ? "is-invalid" : undefined} name="budget" required defaultValue="" aria-invalid={Boolean(errors.budget)}>
                  <option value="" disabled>Select a budget</option>
                  {budgets.map((budget) => <option key={budget}>{budget}</option>)}
                </select>
                {errors.budget && <span className="field-error">{errors.budget}</span>}
              </label>
            </div>
            <label className="lead-field--area">
              <span className="lead-field-label">Project Brief *</span>
              <textarea className={errors.message ? "is-invalid" : undefined} name="message" required minLength={20} rows={7} placeholder="Tell us about the WordPress site, store, migration, or retainer you need help with." aria-invalid={Boolean(errors.message)} />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <label className={`consent ${errors.consent ? "is-invalid" : ""}`}>
              <input name="consent" type="checkbox" required />
              <span>I agree to the <a href="#">Privacy Policy</a> and that WPServices may use these details to respond to my inquiry.</span>
            </label>
            {errors.consent && <span className="field-error">{errors.consent}</span>}
            <button className="button lead-submit" type="submit" disabled={leadStatus === "loading"}>
              {leadStatus === "loading" ? "Sending brief..." : "Send Project Brief"} <Send />
            </button>
            {leadMessage && <p className={`lead-message lead-message--${leadStatus === "loading" ? "idle" : leadStatus}`} role="status">{leadMessage}</p>}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
