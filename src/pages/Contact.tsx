import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { site } from "../data/site";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import ContactForm from "../components/ContactForm";
import Faq from "../components/Faq";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import SectionHeader from "../components/SectionHeader";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
      <Icon name={copied ? "check" : "copy"} size={14} />
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function Contact() {
  useEffect(
    () => setPageMeta("Contact", "Get in touch for IT support, a custom system, or a new website."),
    [],
  );
  const [params] = useSearchParams();
  const service = params.get("service") ?? undefined;

  return (
    <>
      <PageHeader
        crumb="Contact"
        eyebrow="Contact"
        title="Let's work together"
        lead="Need IT help or have a system or website in mind? Send a message and I'll get back to you."
      />

      <section className="section section--tight" aria-label="Contact options">
        <div className="container contact-layout">
          <div className="contact-side">
            <ul className="contact-cards">
              <li className="card contact-card" data-reveal>
                <span className="icon-box" aria-hidden="true">
                  <Icon name="mail" />
                </span>
                <div className="contact-card__body">
                  <p className="contact-card__label">Email</p>
                  <a href={`mailto:${site.email}`} className="contact-card__value">
                    {site.email}
                  </a>
                </div>
                <CopyEmail />
              </li>
              {site.phone && (
                <li className="card contact-card" data-reveal style={delay(60)}>
                  <span className="icon-box" aria-hidden="true">
                    <Icon name="phone" />
                  </span>
                  <div className="contact-card__body">
                    <p className="contact-card__label">Phone</p>
                    <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="contact-card__value">
                      {site.phone}
                    </a>
                  </div>
                </li>
              )}
              <li className="card contact-card" data-reveal style={delay(120)}>
                <span className="icon-box" aria-hidden="true">
                  <Icon name="mapPin" />
                </span>
                <div className="contact-card__body">
                  <p className="contact-card__label">Location</p>
                  <p className="contact-card__value">{site.location}</p>
                  <p className="contact-card__note">Remote anywhere · On-site in Metro Manila</p>
                </div>
              </li>
            </ul>

            <div className="card availability" data-reveal style={delay(180)}>
              <p className="availability__head">
                <span className="live-dot" aria-hidden="true" /> {site.availability}
              </p>
              <p>
                Taking on IT support clients and new system or website projects. Tell me a little about
                what you need and I'll suggest the best next step.
              </p>
              <ul className="social-list">
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
          </div>

          <div data-reveal style={delay(100)}>
            <ContactForm defaultService={service} />
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="contact-faq-title">
        <div className="container faq-layout">
          <SectionHeader eyebrow="FAQ" title="Before you ask" id="contact-faq-title" />
          <Faq limit={3} />
        </div>
      </section>
    </>
  );
}
