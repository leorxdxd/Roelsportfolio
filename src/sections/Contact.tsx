import { useState, type FormEvent } from "react";
import { site } from "../data/site";
import Icon from "../components/Icon";
import SectionHeader from "../components/SectionHeader";

type Status = "idle" | "sending" | "sent" | "error";

const SERVICE_OPTIONS = [
  "IT technical support",
  "Custom system development",
  "Website development",
  "General IT assistance",
  "Something else",
];

/**
 * Contact form handled by Netlify Forms (no backend, no API keys).
 * The matching hidden form lives in index.html so Netlify can detect it.
 */
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let's work together"
            id="contact-title"
            lead="Need IT help or have a system or website in mind? Send a message and I'll get back to you."
          />

          <ul className="contact-methods">
            <li>
              <span className="icon-box" aria-hidden="true">
                <Icon name="mail" />
              </span>
              <div>
                <p className="contact-methods__label">Email</p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </li>
            {site.phone && (
              <li>
                <span className="icon-box" aria-hidden="true">
                  <Icon name="phone" />
                </span>
                <div>
                  <p className="contact-methods__label">Phone</p>
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
                </div>
              </li>
            )}
            <li>
              <span className="icon-box" aria-hidden="true">
                <Icon name="mapPin" />
              </span>
              <div>
                <p className="contact-methods__label">Location</p>
                <p>{site.location} · Remote & on-site</p>
              </div>
            </li>
          </ul>

          <ul className="social-list social-list--spaced" aria-label="Social links">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  className="icon-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                >
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="card contact-form"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="visually-hidden">
            <label>
              Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="form-row">
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>

          <div className="field">
            <label htmlFor="cf-service">What do you need help with?</label>
            <select id="cf-service" name="service" defaultValue={SERVICE_OPTIONS[0]}>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              rows={5}
              required
              placeholder="Tell me a bit about your project or IT concern."
            />
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
            {status !== "sending" && <Icon name="send" size={18} />}
          </button>

          <p className="form-status" role="status" aria-live="polite">
            {status === "sent" && (
              <span className="form-status--ok">Thanks! Your message was sent. I'll reply soon.</span>
            )}
            {status === "error" && (
              <span className="form-status--err">
                Sorry, the message couldn't be sent. Please email me at{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
