import { HOME_BRAND_GROWTH_PREVIEW } from "../data/productShowcase";

const SUPPORT_SEQUENCE = [
  { label: "01", text: "Lucky Color · 色彩盲盒" },
  { label: "02", text: "Companion Plush · 日常伴侣" }
];

export function ProductPreviewSection() {
  const { hero, supportA, supportB } = HOME_BRAND_GROWTH_PREVIEW;
  const supportItems = [supportA, supportB];

  return (
    <section id="future" className="section future-section">
      <div className="future-growth-card">
        <div className="future-main-visual">
          <div className="future-main-frame">
            <img src={hero.src} alt={hero.alt} loading="lazy" decoding="async" />
            <div className="future-main-label">主视觉 · Lucky Color 系列</div>
            <div className="future-main-overlay" />
          </div>
          <div className="future-main-caption">
            <p>奶油色调 + 雾蓝背景，将主视觉置于留白里，形成轻柔的品牌叙事。</p>
            <span>4:3 画幅 · 建议尺寸 ≥ 560px · 提供足够呼吸空间</span>
          </div>
        </div>

        <div className="future-growth-content">
          <div className="future-brand-mark">
            <img src="/brand-icon.svg" alt="LambRoll Isle icon" loading="lazy" decoding="async" />
            <p>LambRoll Isle · 羊卷岛</p>
          </div>
          <p className="future-kicker">Brand Growth Preview</p>
          <h2>小羊卷正在慢慢走进你的生活。</h2>
          <p className="future-body">
            从官网到 App，羊卷岛以柔雾色调捕捉日常。盲盒投射惊喜、挂件与围巾串起陪伴，每一次触碰都让 IP 更具延展性。
          </p>
          <p className="future-close">让色彩与氛围，在可延展的形象里缓缓落到每一只小羊卷身边。</p>

          <div className="future-support-column">
            {supportItems.map((item, index) => (
              <figure key={item.id} className="future-support-item">
                <div className="future-support-index">{SUPPORT_SEQUENCE[index].label}</div>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <figcaption>
                  <strong>{SUPPORT_SEQUENCE[index].text}</strong>
                  <span>{index === 0 ? "盲盒主线" : "伴侣情境"}</span>
                </figcaption>
              </figure>
            ))}
            <div className="future-support-rail" />
          </div>

          <div className="future-series-pills">
            <span>Lucky Color · 色彩预告</span>
            <span>Companion Plush · 轻陪伴</span>
            <span>Charm / Packaging · 形象延展</span>
          </div>

          <a className="future-cta" href="#pet">
            让小羊卷陪你
          </a>
        </div>
      </div>
    </section>
  );
}
