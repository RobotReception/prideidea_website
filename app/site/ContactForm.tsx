"use client";

import { FormEvent, useState } from "react";

const sectors = ["التعليم والجامعات", "البنوك والمحافظ الإلكترونية", "الاتصالات", "الجهات الحكومية والخدمية", "الصحة", "التجارة والمتاجر الإلكترونية", "الفعاليات والمؤتمرات", "أخرى"];

export default function ContactForm() {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setError("تحقّق من الحقول المطلوبة ومن صحة البريد الإلكتروني ورقم الهاتف، ثم أعد المحاولة.");
      setNotice("");
      return;
    }
    const data = new FormData(form);
    const subject = `طلب تواصل من ${String(data.get("name"))} — ${String(data.get("organization"))}`;
    const body = [
      `الاسم الكامل: ${data.get("name")}`,
      `الجهة: ${data.get("organization")}`,
      `المسمى الوظيفي: ${data.get("role")}`,
      `البريد الإلكتروني: ${data.get("email")}`,
      `رقم الهاتف: ${data.get("phone")}`,
      `القطاع: ${data.get("sector")}`,
      `مجال الاهتمام: ${data.get("interest")}`,
      "", "الرسالة:", String(data.get("message")),
    ].join("\n");
    window.location.href = `mailto:info@prideidea.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setError("");
    setNotice("جهّزنا رسالة طلبك في تطبيق البريد. راجعها ثم أرسلها لإتمام التواصل. إذا لم يُفتح التطبيق، أرسل رسالتك مباشرة إلى info@prideidea.com.");
  }
  return <form className="pi-contact-form" onSubmit={submit} noValidate>
    <div className="pi-form-grid">
      <label>الاسم الكامل<input name="name" autoComplete="name" required minLength={2} placeholder="اكتب اسمك" /></label>
      <label>اسم الجهة<input name="organization" autoComplete="organization" required placeholder="اسم المؤسسة" /></label>
      <label>المسمى الوظيفي<input name="role" autoComplete="organization-title" required placeholder="المسمى الوظيفي" /></label>
      <label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" required placeholder="name@company.com" dir="ltr" /></label>
      <label>رقم الهاتف<input name="phone" type="tel" autoComplete="tel" required minLength={7} placeholder="+967" dir="ltr" /></label>
      <label>القطاع<select name="sector" required defaultValue=""><option value="" disabled>اختر القطاع</option>{sectors.map((sector) => <option key={sector}>{sector}</option>)}</select></label>
      <label>مجال الاهتمام<select name="interest" required defaultValue=""><option value="" disabled>اختر مجال الاهتمام</option>{["خدمة", "منتج", "تدريب", "شراكة"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="pi-form-wide">رسالتك<textarea name="message" required minLength={10} rows={5} placeholder="أخبرنا عن التحدي الذي تواجهه" /></label>
    </div>
    {error && <p className="pi-form-message is-error" role="alert">{error}</p>}
    {notice && <p className="pi-form-message is-success" role="status">{notice}</p>}
    <button className="pi-button" type="submit">أرسل طلبك</button>
  </form>;
}
