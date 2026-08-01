const services = [
  { number: "01", title: "منصات المحادثات الذكية", text: "إدارة موحّدة لمحادثات العملاء عبر واتساب والقنوات الرقمية، مع ردود ذكية وتحويل سلس للموظفين." },
  { number: "02", title: "المساعدون الرقميون", text: "مساعدون مؤسسيون يفهمون المعرفة الداخلية، يجيبون بدقة، ويساندون فرق العمل والعملاء على مدار الساعة." },
  { number: "03", title: "الأتمتة والتكامل", text: "ربط الأنظمة وتبسيط الإجراءات المتكررة وتحويل سير العمل إلى عمليات ذكية قابلة للقياس والتوسع." },
  { number: "04", title: "الهوية والامتثال", text: "حلول للتحقق الإلكتروني من الهوية، وفحص العملاء، وتعزيز الامتثال مع مراعاة سيادة البيانات." },
];

const products = [
  { name: "DarAI", label: "المنتج الرئيسي", title: "خدمة عملاء أذكى، من منصة واحدة.", text: "منصة متكاملة لإدارة المحادثات، والرد الذكي، والموظفين، والأتمتة، والتحليلات، والتكامل مع أنظمة المؤسسة.", tone: "featured" },
  { name: "PrideScreen", label: "الامتثال", title: "فحص أسرع وقرارات أوضح.", text: "أدوات ذكية لفحص العملاء ودعم إجراءات الامتثال المؤسسي بكفاءة أعلى.", tone: "" },
  { name: "PridePass", label: "الهوية الرقمية", title: "تحقق رقمي موثوق.", text: "تجربة تحقق إلكتروني مرنة تساعد المؤسسات على تقديم خدمات آمنة وسلسة.", tone: "" },
];

const advantages = ["عربية من الأساس", "خصوصية وسيادة للبيانات", "تكامل مع أنظمتك الحالية", "حلول قابلة للتخصيص"];

export default function Home() {
  return (
    <main dir="rtl">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="برايد آيديا - الرئيسية">
          <img src="/prideidea-logo.png" alt="برايد آيديا لأنظمة الذكاء الاصطناعي" />
        </a>
        <nav aria-label="التنقل الرئيسي">
          <a href="#solutions">الحلول</a>
          <a href="#products">المنتجات</a>
          <a href="#about">عن الشركة</a>
          <a href="#security">الأمان</a>
        </nav>
        <a className="button button-small" href="#contact">ابدأ مشروعك <span>↖</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <div className="eyebrow"><i /> ذكاء مؤسسي يُبنى هنا</div>
          <h1>حلول ذكاء اصطناعي<br /><em>مصممة للمؤسسات.</em></h1>
          <p>نحوّل تحديات مؤسستك إلى أنظمة ذكية تعمل من أجلك — باللغة العربية، بمرونة عالية، وبسيادة كاملة على بياناتك.</p>
          <div className="hero-actions">
            <a className="button" href="#contact">ناقش احتياجك معنا <span>↖</span></a>
            <a className="text-link" href="#products">اكتشف منتجاتنا <span>←</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="منظومة ذكاء اصطناعي مترابطة">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core"><span>PI</span><small>AI CORE</small></div>
          <div className="data-tag tag-one">أتمتة العمليات <b>●</b></div>
          <div className="data-tag tag-two">معرفة مؤسسية <b>●</b></div>
          <div className="data-tag tag-three">تحليلات ذكية <b>●</b></div>
          <div className="dot d1" /><div className="dot d2" /><div className="dot d3" />
        </div>
        <div className="hero-foot"><span>صنع في اليمن — للعالم العربي</span><span className="scroll">مرّر للاستكشاف ↓</span></div>
      </section>

      <section className="trust-strip" aria-label="قيمنا الأساسية">
        {advantages.map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}
      </section>

      <section className="section intro" id="about">
        <div className="section-kicker">من نحن</div>
        <div>
          <h2>نبني ذكاءً يفهم<br />مؤسستك وسوقك.</h2>
          <p>برايد آيديا شركة تقنية يمنية متخصصة في تطوير منتجات وحلول الذكاء الاصطناعي المؤسسية باللغة العربية. نجمع بين الذكاء الاصطناعي، والأتمتة، والتكامل لنصنع أثرًا تشغيليًا حقيقيًا.</p>
          <a className="text-link dark" href="#solutions">تعرّف على قدراتنا <span>←</span></a>
        </div>
      </section>

      <section className="section services" id="solutions">
        <div className="section-heading">
          <div><div className="section-kicker light">ماذا نقدم</div><h2>من التحدي إلى<br />حل يعمل.</h2></div>
          <p>حلول عملية قابلة للتخصيص والتكامل والنشر بالطريقة التي تناسب بيئة مؤسستك.</p>
        </div>
        <div className="service-grid">
          {services.map(service => (
            <article key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className="service-icon">✦</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section products" id="products">
        <div className="section-heading light-bg">
          <div><div className="section-kicker">منتجاتنا</div><h2>منتجات عربية.<br />جاهزة للأثر.</h2></div>
          <p>منظومة منتجات تعالج احتياجات حقيقية في خدمة العملاء والهوية والامتثال.</p>
        </div>
        <div className="product-grid">
          {products.map(product => (
            <article className={product.tone} key={product.name}>
              <div className="product-top"><span>{product.label}</span><b>↖</b></div>
              <div className="product-mark">{product.name}</div>
              <h3>{product.title}</h3>
              <p>{product.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="security" id="security">
        <div className="security-copy">
          <div className="section-kicker light">الأمان والخصوصية</div>
          <h2>بياناتك.<br />ضمن سيطرتك.</h2>
          <p>نصمم حلولنا للمؤسسات التي لا تقبل المساومة على الخصوصية. من عزل البيانات وتشفير الاتصالات إلى صلاحيات الوصول وسجلات العمليات.</p>
        </div>
        <div className="deployments">
          <div><span>01</span><h3>سحابة آمنة</h3><p>تشغيل مرن عبر بنيتنا السحابية مع قابلية التوسع.</p></div>
          <div><span>02</span><h3>سحابة خاصة</h3><p>بيئة منفصلة تلائم متطلبات مؤسستك الأمنية.</p></div>
          <div><span>03</span><h3>داخل مؤسستك</h3><p>نشر كامل على خوادمك لسيادة قصوى على البيانات.</p></div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="section-kicker">لنبدأ</div>
        <h2>لديك تحدٍ مؤسسي؟<br /><em>لنحوّله إلى نظام ذكي.</em></h2>
        <p>شاركنا احتياجك، وسنساعدك في تحديد الحل الأنسب وخارطة الطريق نحو تشغيله.</p>
        <a className="button" href="mailto:info@prideidea.com">تواصل مع فريقنا <span>↖</span></a>
      </section>

      <footer>
        <div className="footer-brand"><img src="/prideidea-logo.png" alt="" /><p>مستقبل يُبنى بذكاء<br />ويُلهم بالفخر.</p></div>
        <div><h4>استكشف</h4><a href="#solutions">الحلول</a><a href="#products">المنتجات</a><a href="#about">عن الشركة</a></div>
        <div><h4>تواصل</h4><a href="mailto:info@prideidea.com">info@prideidea.com</a><span>اليمن</span></div>
        <div className="footer-bottom"><span>© 2026 برايد آيديا. جميع الحقوق محفوظة.</span><span>ذكاء مؤسسي. تشغيل أذكى. أثر أكبر.</span></div>
      </footer>
    </main>
  );
}
