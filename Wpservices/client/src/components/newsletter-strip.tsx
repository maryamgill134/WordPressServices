"use client";

import { FormEvent, useRef, useState } from "react";
import { NEWSLETTER_MESSAGES, validateNewsletterEmail } from "@/lib/newsletter";

type NewsletterStatus = "idle" | "loading" | "success" | "exists" | "error";

export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [message, setMessage] = useState("");
  const inFlight = useRef(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const parsed = validateNewsletterEmail(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.message);
      return;
    }

    inFlight.current = true;
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.email }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (response.status === 201) {
        setEmail("");
        setStatus("success");
        setMessage(result?.message ?? NEWSLETTER_MESSAGES.created);
        return;
      }

      if (response.status === 409) {
        setStatus("exists");
        setMessage(result?.message ?? NEWSLETTER_MESSAGES.exists);
        return;
      }

      if (response.status === 400) {
        setStatus("error");
        setMessage(result?.message ?? NEWSLETTER_MESSAGES.invalid);
        return;
      }

      setStatus("error");
      setMessage(result?.message ?? NEWSLETTER_MESSAGES.failed);
    } catch {
      setStatus("error");
      setMessage(NEWSLETTER_MESSAGES.failed);
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div>
          <span>Stay Updated with WordPress Tips</span>
          <p>Join our newsletter and get the latest tips, guides, and WordPress insights.</p>
        </div>
        <div className="newsletter-form-wrap">
          <form onSubmit={subscribe} noValidate>
            <label className="newsletter-field">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                disabled={status === "loading"}
                aria-invalid={status === "error"}
                aria-describedby={message ? "newsletter-message" : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== "idle" && status !== "loading") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
              />
            </label>
            <button type="submit" disabled={status === "loading"} aria-busy={status === "loading"}>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message ? (
            <p
              id="newsletter-message"
              className={`newsletter-message newsletter-message--${status === "success" || status === "exists" ? "success" : "error"}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
