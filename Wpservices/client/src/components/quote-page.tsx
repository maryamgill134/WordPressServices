"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Ellipsis,
  FolderSync,
  Globe,
  GraduationCap,
  LayoutTemplate,
  Puzzle,
  RefreshCcw,
  ShoppingBag,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { InnerPageHero } from "@/components/inner-page-hero";
import { PhoneField } from "@/components/phone-field";
import { quoteLeadSchema } from "@/lib/lead-validation";
import {
  quoteBudgetOptions,
  quoteBuildingOptions,
  quoteNeedOptions,
  quoteProcessSteps,
  quoteSizeOptions,
  quoteTimelineOptions,
} from "@/data/quote-form";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const buildingIcons: Record<(typeof quoteBuildingOptions)[number]["id"], LucideIcon> = {
  "wordpress-website": Globe,
  "woocommerce-store": ShoppingBag,
  "custom-development": Code2,
  "website-redesign": RefreshCcw,
  "landing-page": LayoutTemplate,
  "wordpress-plugin": Puzzle,
  "learndash-website": GraduationCap,
  "website-migration": FolderSync,
  "website-maintenance": Wrench,
  other: Ellipsis,
};

type FieldErrors = Partial<Record<
  | "building"
  | "projectSize"
  | "needs"
  | "budget"
  | "timeline"
  | "name"
  | "email"
  | "phone"
  | "websiteUrl"
  | "referenceUrl"
  | "message"
  | "consent",
  string
>>;

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function QuotePage() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { initial: false as const } : fadeUp;
  const [building, setBuilding] = useState<string[]>([]);
  const [projectSize, setProjectSize] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());

  function scrollToFirstError(nextErrors: FieldErrors) {
    const order: (keyof FieldErrors)[] = [
      "building",
      "projectSize",
      "needs",
      "budget",
      "timeline",
      "name",
      "email",
      "phone",
      "websiteUrl",
      "referenceUrl",
      "message",
      "consent",
    ];
    const first = order.find((key) => nextErrors[key]);
    if (!first) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`quote-${first}`)?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      building,
      projectSize,
      needs,
      budget,
      timeline,
      websiteUrl: String(formData.get("websiteUrl") ?? ""),
      referenceUrl: String(formData.get("referenceUrl") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
      startedAt,
    };

    const parsed = quoteLeadSchema.safeParse(payload);
    const nextErrors: FieldErrors = {};
    if (!phoneValid) nextErrors.phone = "Please enter a valid WhatsApp number.";
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "");
        if (
          field === "building"
          || field === "projectSize"
          || field === "needs"
          || field === "budget"
          || field === "timeline"
          || field === "name"
          || field === "email"
          || field === "phone"
          || field === "websiteUrl"
          || field === "referenceUrl"
          || field === "message"
          || field === "consent"
        ) {
          if (!nextErrors[field]) nextErrors[field] = issue.message;
        }
      }
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setFormMessage("Please review the highlighted fields.");
      scrollToFirstError(nextErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    setFormMessage("");

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
          const field = issue.field.split(".")[0];
          if (
            field === "building"
            || field === "projectSize"
            || field === "needs"
            || field === "budget"
            || field === "timeline"
            || field === "name"
            || field === "email"
            || field === "phone"
            || field === "websiteUrl"
            || field === "referenceUrl"
            || field === "message"
            || field === "consent"
          ) {
            apiErrors[field] = issue.message;
          }
        }
        setErrors(apiErrors);
        throw new Error(result.message ?? "Unable to submit your request.");
      }

      form.reset();
      setBuilding([]);
      setProjectSize("");
      setNeeds([]);
      setBudget("");
      setTimeline("");
      setStartedAt(Date.now());
      setStatus("success");
      setFormMessage("");
    } catch (error) {
      setStatus("error");
      setFormMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <div className="quote-page">
      <InnerPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Get a Free Quote" },
        ]}
        label="GET A FREE QUOTE"
        title="Let's Build Something Great Together."
        description="Tell us about your project, goals, and requirements. We'll review your information and get back to you with the right solution."
        primary={false}
        secondary={false}
      />

      <section className="quote-stage">
        <div className="container quote-layout">
          <motion.aside className="quote-sidebar" {...reveal} aria-label="How this works">
            <p className="eyebrow">HOW THIS WORKS</p>
            <p className="quote-sidebar-intro">Share a few details about your project. We&apos;ll review them and reply with a clear next step.</p>
            <ol className="quote-steps">
              {quoteProcessSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="quote-trust">No obligation. We&apos;ll reply within one business day.</p>
          </motion.aside>

          {status === "success" ? (
            <motion.div className="lead-form quote-form quote-success" {...reveal} role="status">
              <span className="eyebrow">QUOTE RECEIVED</span>
              <h2>Thank You!</h2>
              <p>We&apos;ve received your project details. Our team will review your request and get back to you shortly.</p>
              <Link className="button" href="/">Back to Home</Link>
            </motion.div>
          ) : (
            <motion.form className="lead-form quote-form" onSubmit={submitQuote} noValidate {...reveal}>
              <fieldset className={`quote-block${errors.building ? " is-invalid" : ""}`} id="quote-building">
                <legend>
                  <span>01</span>
                  <span>
                    <strong>What are you building?</strong>
                    <small>Select one or more options.</small>
                  </span>
                </legend>
                <div className="quote-build-grid">
                  {quoteBuildingOptions.map((option) => {
                    const Icon = buildingIcons[option.id];
                    const selected = building.includes(option.label);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`quote-choice${selected ? " is-selected" : ""}`}
                        aria-pressed={selected}
                        onClick={() => {
                          setBuilding((current) => toggleValue(current, option.label));
                          setErrors((current) => ({ ...current, building: undefined }));
                        }}
                      >
                        <span className="quote-choice-icon"><Icon aria-hidden="true" /></span>
                        <span className="quote-choice-copy">
                          <strong>{option.label}</strong>
                          <small>{option.text}</small>
                        </span>
                        <span className="quote-choice-mark" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
                {errors.building && <p className="field-error">{errors.building}</p>}
              </fieldset>

              <fieldset className={`quote-block${errors.projectSize ? " is-invalid" : ""}`} id="quote-projectSize">
                <legend>
                  <span>02</span>
                  <span>
                    <strong>How big is the project?</strong>
                    <small>Choose the closest fit.</small>
                  </span>
                </legend>
                <div className="quote-pills">
                  {quoteSizeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`quote-pill${projectSize === option ? " is-selected" : ""}`}
                      aria-pressed={projectSize === option}
                      onClick={() => {
                        setProjectSize(option);
                        setErrors((current) => ({ ...current, projectSize: undefined }));
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.projectSize && <p className="field-error">{errors.projectSize}</p>}
              </fieldset>

              <fieldset className={`quote-block${errors.needs ? " is-invalid" : ""}`} id="quote-needs">
                <legend>
                  <span>03</span>
                  <span>
                    <strong>What do you need?</strong>
                    <small>Select every service that applies.</small>
                  </span>
                </legend>
                <div className="quote-pills">
                  {quoteNeedOptions.map((option) => {
                    const selected = needs.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`quote-pill${selected ? " is-selected" : ""}`}
                        aria-pressed={selected}
                        onClick={() => {
                          setNeeds((current) => toggleValue(current, option));
                          setErrors((current) => ({ ...current, needs: undefined }));
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors.needs && <p className="field-error">{errors.needs}</p>}
              </fieldset>

              <fieldset className={`quote-block${errors.budget ? " is-invalid" : ""}`} id="quote-budget">
                <legend>
                  <span>04</span>
                  <span>
                    <strong>Budget / investment range</strong>
                    <small>This helps us recommend the right approach.</small>
                  </span>
                </legend>
                <div className="quote-pills">
                  {quoteBudgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`quote-pill${budget === option ? " is-selected" : ""}`}
                      aria-pressed={budget === option}
                      onClick={() => {
                        setBudget(option);
                        setErrors((current) => ({ ...current, budget: undefined }));
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.budget && <p className="field-error">{errors.budget}</p>}
              </fieldset>

              <fieldset className={`quote-block${errors.timeline ? " is-invalid" : ""}`} id="quote-timeline">
                <legend>
                  <span>05</span>
                  <span>
                    <strong>Project timeline</strong>
                    <small>When do you want the project to go live?</small>
                  </span>
                </legend>
                <div className="quote-pills">
                  {quoteTimelineOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`quote-pill${timeline === option ? " is-selected" : ""}`}
                      aria-pressed={timeline === option}
                      onClick={() => {
                        setTimeline(option);
                        setErrors((current) => ({ ...current, timeline: undefined }));
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.timeline && <p className="field-error">{errors.timeline}</p>}
              </fieldset>

              <fieldset className="quote-block" id="quote-name">
                <legend>
                  <span>06</span>
                  <span>
                    <strong>Your details</strong>
                    <small>We&apos;ll use this to follow up on your request.</small>
                  </span>
                </legend>
                <div className="lead-form-row">
                  <label>
                    <span className="lead-field-label">Full name <small>*</small></span>
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      className={errors.name ? "is-invalid" : undefined}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                  </label>
                  <label id="quote-email">
                    <span className="lead-field-label">Email <small>*</small></span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="alex@company.com"
                      className={errors.email ? "is-invalid" : undefined}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </label>
                </div>
                <div className="lead-form-row">
                  <div className="lead-phone" id="quote-phone">
                    <span className="lead-field-label">Phone / WhatsApp</span>
                    <PhoneField resetKey={startedAt} onValidityChange={setPhoneValid} />
                    {errors.phone && <p className="field-error">{errors.phone}</p>}
                  </div>
                  <label>
                    <span className="lead-field-label">Company / Brand</span>
                    <input name="company" autoComplete="organization" placeholder="Company name" />
                  </label>
                </div>
                <label id="quote-websiteUrl">
                  <span className="lead-field-label">Website URL</span>
                  <input
                    name="websiteUrl"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="https://yourwebsite.com"
                    className={errors.websiteUrl ? "is-invalid" : undefined}
                    aria-invalid={Boolean(errors.websiteUrl)}
                  />
                  {errors.websiteUrl && <p className="field-error">{errors.websiteUrl}</p>}
                </label>
              </fieldset>

              <fieldset className="quote-block" id="quote-message">
                <legend>
                  <span>07</span>
                  <span>
                    <strong>Project details</strong>
                    <small>The more context you share, the better we can help.</small>
                  </span>
                </legend>
                <label className="lead-field--area">
                  <span className="lead-field-label">Tell us about your project <small>*</small></span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your business, project goals, required features, target audience, existing website, or anything else that will help us understand your project."
                    className={errors.message ? "is-invalid" : undefined}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && <p className="field-error">{errors.message}</p>}
                </label>
                <label id="quote-referenceUrl">
                  <span className="lead-field-label">Reference / Website URL</span>
                  <input
                    name="referenceUrl"
                    inputMode="url"
                    placeholder="https://example.com"
                    className={errors.referenceUrl ? "is-invalid" : undefined}
                    aria-invalid={Boolean(errors.referenceUrl)}
                  />
                  {errors.referenceUrl && <p className="field-error">{errors.referenceUrl}</p>}
                </label>
              </fieldset>

              <div className="quote-submit">
                <div className="honeypot" aria-hidden="true">
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
                <label className="consent" id="quote-consent">
                  <input name="consent" type="checkbox" />
                  <span>I agree that WPServices may use these details to respond to my inquiry.</span>
                </label>
                {errors.consent && <p className="field-error">{errors.consent}</p>}
                <button className="button lead-submit" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send My Quote"}
                </button>
                {formMessage && <p className={`lead-message lead-message--${status}`} role="status">{formMessage}</p>}
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
