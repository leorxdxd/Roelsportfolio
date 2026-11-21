import { useState, type FormEvent } from "react";
import { services } from "../data/content";
import { site } from "../data/site";
import Icon from "./Icon";

type Status = "idle" | "sending" | "sent" | "error";

const OPTIONS = [...services.map((s) => s.title), "Something else"];

/**
 * Contact form handled by Netlify Forms (no backend, no API keys).
 * The matching hidden form lives in index.html so Netlify can detect it.
 */
export default function ContactForm({ defaultService }: { defaultService?: string }) {
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

  if (status === "sent") {
    return (
      <div className="card contact-form contact-form--done" role="status">
        <span className="icon-box icon-box--lg icon-box--success" aria-hidden="true">
          <Icon name="checkCircle" size={26} />
        </span>
        <h2>Message sent!</h2>
        <p>Thanks for reaching out. I'll get back to you as soon as I can.</p>
        <button type="button" className="btn btn--secondary" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="card contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
    >
      <div>
        <h2 id="contact-form-title" className="contact-form__title">
          Send a message
        </h2>
        <p className="contact-form__sub">Fields marked * are required.</p>
      </div>

      <input type="hidden" name="form-name" value="contact" />
      <p className="visually-hidden">
        <label>
          Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <fieldset className="field">
        <legend>What do you need help with?</legend>
        <div className="choice-grid">
          {OPTIONS.map((o) => (
            <label key={o} className="choice">
              <input
                type="radio"
                name="service"
                value={o}
                defaultChecked={o === (defaultService ?? OPTIONS[0])}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="cf-message">Message *</label>
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
        {status === "error" && (
          <span className="form-status--err">
            Sorry, the message couldn't be sent. Please email me at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </span>
        )}
      </p>
    </form>
  );
}
