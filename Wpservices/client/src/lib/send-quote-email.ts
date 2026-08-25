import nodemailer from "nodemailer";
import {
  contactLeadFieldRows,
  quoteLeadFieldRows,
  type LeadInput,
  type QuoteLeadInput,
} from "@/lib/lead-validation";

export const QUOTE_INBOX = "Info@technologiallc.com";

type InboxEmail = {
  name: string;
  email: string;
  subject: string;
  eyebrow: string;
  heading: string;
  rows: { label: string; value: string }[];
  refererPath: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inboxEmailContent(mail: InboxEmail) {
  const text = [
    `${mail.heading} was submitted on WPServices.`,
    "",
    ...mail.rows.map((row) => `${row.label}: ${row.value}`),
  ].join("\n");

  const tableRows = mail.rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e4eaf3;color:#64748b;font-size:13px;width:180px;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e4eaf3;color:#0c1222;font-size:14px;white-space:pre-wrap;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="margin:0;padding:24px;background:#f4f7fc;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4eaf3;border-radius:16px;overflow:hidden;">
        <div style="padding:20px 24px;background:#07111f;color:#fff;">
          <p style="margin:0 0 6px;color:#93c5fd;font-size:12px;letter-spacing:.08em;">${escapeHtml(mail.eyebrow)}</p>
          <h1 style="margin:0;font-size:22px;line-height:1.3;">${escapeHtml(mail.heading)}</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
      </div>
    </div>
  `;

  return { subject: mail.subject, text, html };
}

async function sendWithSmtp(mail: InboxEmail) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return false;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from = process.env.SMTP_FROM?.trim() || user;
  const { subject, text, html } = inboxEmailContent(mail);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `WPServices <${from}>`,
    to: QUOTE_INBOX,
    replyTo: mail.email,
    subject,
    text,
    html,
  });

  return true;
}

async function sendWithResend(mail: InboxEmail) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM?.trim();
  if (!from) {
    throw new Error("RESEND_FROM is required when RESEND_API_KEY is set.");
  }

  const { subject, text, html } = inboxEmailContent(mail);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [QUOTE_INBOX],
      reply_to: mail.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Resend rejected the lead email.");
  }

  return true;
}

async function sendWithFormSubmit(mail: InboxEmail, origin: string) {
  const { subject, text } = inboxEmailContent(mail);
  const payload: Record<string, string> = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    _replyto: mail.email,
    email: mail.email,
    name: mail.name,
  };

  for (const row of mail.rows) {
    payload[row.label] = row.value;
  }
  payload["Full submission"] = text;

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(QUOTE_INBOX)}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: origin,
      Referer: `${origin.replace(/\/$/, "")}${mail.refererPath.startsWith("/") ? mail.refererPath : `/${mail.refererPath}`}`,
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let result: { success?: string | boolean; message?: string } = {};
  try {
    result = JSON.parse(raw) as { success?: string | boolean; message?: string };
  } catch {
    throw new Error(raw || "Lead email delivery failed.");
  }

  const message = result.message ?? "";
  const activated = /activat/i.test(message);
  const ok = result.success === true || result.success === "true" || activated;
  if (!response.ok || !ok) {
    throw new Error(message || raw || "Lead email delivery failed.");
  }

  if (activated) {
    console.info("Inbox activation email sent to", QUOTE_INBOX);
  }

  return true;
}

async function sendInboxEmail(mail: InboxEmail, origin?: string) {
  const requestOrigin = origin?.trim() || "https://wpservices.com";
  const attempts = [
    sendWithSmtp,
    sendWithResend,
    (payload: InboxEmail) => sendWithFormSubmit(payload, requestOrigin),
  ];
  const errors: unknown[] = [];

  for (const attempt of attempts) {
    try {
      if (await attempt(mail)) return;
    } catch (error) {
      errors.push(error);
      console.error("Lead email attempt failed", error);
    }
  }

  const detail = errors
    .map((error) => (error instanceof Error ? error.message : String(error)))
    .filter(Boolean)
    .join(" ");
  throw new Error(detail || "Lead email delivery is not configured.");
}

export async function sendQuoteLeadEmail(data: QuoteLeadInput, origin?: string) {
  await sendInboxEmail(
    {
      name: data.name,
      email: data.email,
      subject: `New Get a Free Quote request from ${data.name.trim()}`,
      eyebrow: "GET A FREE QUOTE",
      heading: "New quote request",
      rows: quoteLeadFieldRows(data),
      refererPath: "/get-a-free-quote",
    },
    origin,
  );
}

export async function sendContactLeadEmail(data: LeadInput, origin?: string, refererPath = "/contact") {
  const isConsultation = data.service.trim() === "WordPress Consultation";
  await sendInboxEmail(
    {
      name: data.name,
      email: data.email,
      subject: isConsultation
        ? `New WordPress Consultation request from ${data.name.trim()}`
        : `New project request from ${data.name.trim()}`,
      eyebrow: isConsultation ? "REQUEST A WORDPRESS CONSULTATION" : "START YOUR PROJECT",
      heading: isConsultation ? "New consultation request" : "New project request",
      rows: contactLeadFieldRows(data),
      refererPath,
    },
    origin,
  );
}
