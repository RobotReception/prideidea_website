"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "../content";
import { fill } from "../content/lang";

export default function ContactForm({ t, email }: { t: Dictionary["contactForm"]; email: string }) {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setError(t.error);
      setNotice("");
      return;
    }
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "");
    const subject = fill(t.mailSubject, { name: value("name"), organization: value("organization") });
    const body = [
      `${t.name}: ${value("name")}`,
      `${t.organization}: ${value("organization")}`,
      `${t.role}: ${value("role")}`,
      `${t.email}: ${value("email")}`,
      `${t.phone}: ${value("phone")}`,
      `${t.sector}: ${value("sector")}`,
      `${t.interest}: ${value("interest")}`,
      "", t.mailMessageLabel, value("message"),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setError("");
    setNotice(fill(t.success, { email }));
  }
  return <form className="pi-contact-form" onSubmit={submit} noValidate>
    <div className="pi-form-grid">
      <label>{t.name}<input name="name" autoComplete="name" required minLength={2} placeholder={t.namePlaceholder} /></label>
      <label>{t.organization}<input name="organization" autoComplete="organization" required placeholder={t.organizationPlaceholder} /></label>
      <label>{t.role}<input name="role" autoComplete="organization-title" required placeholder={t.rolePlaceholder} /></label>
      <label>{t.email}<input name="email" type="email" autoComplete="email" required placeholder={t.emailPlaceholder} dir="ltr" /></label>
      <label>{t.phone}<input name="phone" type="tel" autoComplete="tel" required minLength={7} placeholder={t.phonePlaceholder} dir="ltr" /></label>
      <label>{t.sector}<select name="sector" required defaultValue=""><option value="" disabled>{t.sectorPlaceholder}</option>{t.sectors.map((sector) => <option key={sector}>{sector}</option>)}</select></label>
      <label>{t.interest}<select name="interest" required defaultValue=""><option value="" disabled>{t.interestPlaceholder}</option>{t.interests.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="pi-form-wide">{t.message}<textarea name="message" required minLength={10} rows={5} placeholder={t.messagePlaceholder} /></label>
    </div>
    {error && <p className="pi-form-message is-error" role="alert">{error}</p>}
    {notice && <p className="pi-form-message is-success" role="status">{notice}</p>}
    <button className="pi-button" type="submit">{t.submit}</button>
  </form>;
}
