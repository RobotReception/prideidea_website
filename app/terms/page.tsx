import type { Metadata } from "next";
import { PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "شروط الاستخدام", description: "شروط استخدام موقع برايد آيديا.", openGraph: { title: "شروط الاستخدام", description: "شروط استخدام موقع برايد آيديا.", locale: "ar_YE", type: "website" } };

export default function TermsPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="الخصوصية والشروط" title="شروط الاستخدام" description="" /><section className="pi-page-body"><div className="pi-wrap"><div className="pi-policy-note">[تُضاف صياغة شروط الاستخدام القانونية المعتمدة قبل النشر.]</div></div></section></main></PageFrame>;
}
