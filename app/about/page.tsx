import type { Metadata } from "next";
import { CtaBand, ContentText, PageFrame, PageIntro, Placeholder } from "../site/shared";

export const metadata: Metadata = { title: "من نحن", description: "تعرف على قصة ورؤية ورسالة برايد آيديا لأنظمة الذكاء الاصطناعي من صنعاء.", openGraph: { title: "من نحن", description: "برايد آيديا لأنظمة الذكاء الاصطناعي من صنعاء.", locale: "ar_YE", type: "website" } };
const values = ["الابتكار: نبحث دائمًا عن طريقة أذكى لحل المشكلة.", "الجودة: لا نسلّم إلا ما نثق بأنه يعمل.", "المسؤولية: نتعامل مع بيانات عملائنا بأمانة كاملة.", "التطوير المستمر: نتعلم ونحسّن حلولنا بعد كل مشروع.", "الشغف والالتزام: نلتزم بنجاح عملائنا كأنه نجاحنا.", "الواقعية: نبني حلولًا قابلة للتشغيل، لا نماذج للعرض فقط."];

export default function AboutPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="من نحن" title="مستقبلٌ يُبنى بذكاء، ويُلهم بالفخر" description="نؤمن أن الذكاء الاصطناعي ليس رفاهية تقنية، بل أداة عملية تغيّر طريقة عمل المؤسسات وخدمتها لعملائها." />
    <section className="pi-page-body"><div className="pi-wrap">
      <section className="pi-content-section"><h2>قصتنا</h2><p>انطلقت برايد آيديا لأنظمة الذكاء الاصطناعي من صنعاء عام 2023، وتأسست رسميًا في يناير 2024، من قناعة بأن المؤسسات العربية تستحق حلول ذكاء اصطناعي تفهم لغتها وبيئتها واحتياجاتها.</p><p>بدأنا بسؤال بسيط: لماذا تضيع رسائل العملاء، وتتكرر الأسئلة نفسها، وتُنجز الإجراءات يدويًا رغم توفر التقنية؟ ومن هذا السؤال بنينا مساعدين رقميين ومنصات ذكية تعمل اليوم لدى مؤسسات في قطاعي التعليم والمال.</p><div className="pi-policy-note"><ContentText text="[رقم الترخيص وتاريخه، ووصف «أول شركة يمنية مرخصة» بعد إرفاق الوثيقة الرسمية.]" /></div></section>
      <section className="pi-content-section"><h2>رؤيتنا</h2><p>أن نكون من الشركات الرائدة في اليمن والمنطقة في تقديم حلول ذكاء اصطناعي مؤسسية عربية، قابلة للتشغيل والتوسع.</p></section>
      <section className="pi-content-section"><h2>رسالتنا</h2><p>تسخير الذكاء الاصطناعي والأتمتة لتحسين أعمال المؤسسات، وتحويل معرفتها الداخلية إلى مساعدين رقميين يقدّمون خدمة أسرع وأدق.</p></section>
      <section className="pi-content-section"><h2>قيمنا</h2><ul className="pi-list">{values.map((value) => <li key={value}>{value}</li>)}</ul></section>
      <section className="pi-content-section"><h2>القيادة</h2><h3>محمد الشيبلي — المؤسس والرئيس التنفيذي</h3><p>يقود رؤية الشركة واستراتيجيتها وتطوير منتجاتها، ويشرف على حلول النماذج اللغوية الكبيرة واسترجاع المعرفة (RAG) وبناء الشراكات المؤسسية. له حضور في نشر ثقافة الذكاء الاصطناعي من خلال التدريب والأندية الجامعية.</p><div className="pi-policy-note"><ContentText text="[صورة شخصية + رابط LinkedIn]" /></div><p><Placeholder>[أعضاء الفريق الآخرون، إن رغبتم بإظهارهم.]</Placeholder></p></section>
      <section className="pi-content-section"><h2>نبني الكفاءات كما نبني الأنظمة</h2><p>نؤمن أن التحول الذكي يبدأ بالناس. لذلك نساهم في تدريب الطلاب والموظفين على الذكاء الاصطناعي، ودعم الأندية الجامعية المتخصصة.</p><ul className="pi-list"><li><ContentText text="[نحو 670] مستفيدًا من البرامج التدريبية." /></li><li><ContentText text="المساهمة في تأسيس نادي الذكاء الاصطناعي بجامعة الرازي، [ونحو 359] طالبًا مستفيدًا." /></li><li>تأسيس نادي نهج للذكاء الاصطناعي عام 2023.</li></ul></section>
    </div></section><div className="pi-wrap"><CtaBand title="لنبنِ معًا مستقبل مؤسستك" button="تواصل معنا" /></div>
  </main></PageFrame>;
}
