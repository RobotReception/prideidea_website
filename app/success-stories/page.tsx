import type { Metadata } from "next";
import { CtaBand, ContentText, PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "قصص النجاح", description: "نتائج نفخر بها من حلول برايد آيديا للذكاء الاصطناعي المؤسسي.", openGraph: { title: "قصص النجاح", description: "نقيس نجاحنا بما يتغير فعلًا في مؤسسات عملائنا.", locale: "ar_YE", type: "website" } };

export default function SuccessStoriesPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="قصص النجاح" title="نتائج نفخر بها" description="نقيس نجاحنا بما يتغير فعلًا في مؤسسات عملائنا." />
    <section className="pi-page-body"><div className="pi-wrap">
      <article className="pi-content-section"><p className="pi-eyebrow">التعليم والجامعات</p><h2>وضّاح الرازي — جامعة الرازي</h2><p><strong>العميل:</strong> جامعة الرازي، مؤسسة تعليم عالٍ.</p><p><strong>التحدي:</strong> آلاف الاستفسارات من الطلاب والزوار عبر قنوات متعددة، خصوصًا في مواسم التسجيل، مع فريق محدود للرد.</p><p><strong>الحل:</strong> بنينا «وضّاح»، مساعدًا ذكيًا يعرف لوائح الجامعة وخدماتها، ويخدم الطلاب والزوار عبر واتساب وفيسبوك وإنستغرام والموقع الإلكتروني. يجيب عن الاستفسارات الأكاديمية، ويوجّه الطلاب في التسجيل، ويستقبل الزوار رقميًا.</p><h3>النتائج</h3><ul className="pi-list"><li><ContentText text="[أكثر من 5,000] محادثة." /></li><li><ContentText text="تحسّن [بنحو 65%] في كفاءة الاستجابة." /></li><li><ContentText text="خدمة متاحة على مدار الساعة عبر [خمس] قنوات." /></li></ul><p className="pi-policy-note"><ContentText text="[كلمة من مسؤول في الجامعة، بعد الحصول عليها.]" /></p></article>
      <article className="pi-content-section is-soft"><h2>مؤسسة مالية</h2><p className="pi-policy-note"><ContentText text="[تُنشر بعد موافقة العميل على ذكر اسمه، وحسم حالة المشروع: تجريبي أم مكتمل.]" /></p><p><strong>العميل:</strong> <ContentText text="[اسم المؤسسة أو وصف عام: «مؤسسة مصرفية يمنية»]." /></p><p><strong>التحدي:</strong> <ContentText text="[...]" /></p><p><strong>الحل:</strong> <ContentText text="[...]" /></p><p><strong>النتائج:</strong> <ContentText text="[...]" /></p></article>
    </div></section><div className="pi-wrap"><CtaBand title="هل تريد أن تكون قصة نجاحنا القادمة؟" button="تحدّث مع خبير" /></div>
  </main></PageFrame>;
}
