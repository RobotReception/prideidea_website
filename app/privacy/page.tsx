import type { Metadata } from "next";
import { PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "سياسة الخصوصية", description: "سياسة الخصوصية لبرايد آيديا.", openGraph: { title: "سياسة الخصوصية", description: "سياسة الخصوصية لبرايد آيديا.", locale: "ar_YE", type: "website" } };

export default function PrivacyPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="الخصوصية والشروط" title="سياسة الخصوصية" description="" /><section className="pi-page-body"><div className="pi-wrap"><div className="pi-policy-note">[تُضاف صياغة سياسة الخصوصية القانونية المعتمدة قبل النشر.]</div></div></section></main></PageFrame>;
}
