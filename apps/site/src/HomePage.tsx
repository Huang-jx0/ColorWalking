import { type ReactNode } from "react";
import { COMPANION_PLUSH_ITEMS, FUTURE_LABS, IP_WORLD } from "./config/brandWorld";
import { BRAND_COPY, DOWNLOAD_PAGE_PATH } from "./config/experience";

type Props = {
  WheelSection: ReactNode;
};

const HOME_HERO_TAGS = ["幸运色", "小羊卷", "颜色云岛", "轻仪式感"] as const;

export function HomePage({ WheelSection }: Props) {
  return (
    <div className="brand-shell home-focus-page">
      <header className="home-focus-hero">
        <div className="home-focus-copy">
          <p className="home-focus-kicker">羊卷岛  让陪伴有颜色</p>
          <h1>今天，也为自己抽一份幸运颜色。</h1>
          <p className="home-focus-subtitle">
            在黑白灰的日常里，让小羊卷为你送来一点颜色、一点期待，和一点温柔陪伴。
          </p>
          <div className="home-focus-tags">
            {HOME_HERO_TAGS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="actions">
            <a className="cta" href="/lucky-color">抽取今日幸运色</a>
            <a className="ghost-btn" href="/xiaoyangjuan">认识小羊卷</a>
          </div>
          <p className="home-focus-note">一个围绕原创 IP小羊卷展开的陪伴品牌</p>
        </div>

        <aside className="home-focus-art sheep-card">
          <img src="/brand-logo.svg" alt="羊卷岛与小羊卷品牌视觉" loading="eager" decoding="async" />
          <p className="hero-art-note">小羊卷会把属于今天的幸运颜色，轻轻送到你身边。</p>
        </aside>
      </header>

      <section className="section brand-panel tone-cloud home-section-intro">
        <h2>这里是羊卷岛。</h2>
        <p>
          羊卷岛是一个围绕原创 IP小羊卷展开的陪伴品牌。
          我们从幸运色出发，把颜色、角色和日常陪伴连接在一起，想让每个人的生活里，多一点柔软，也多一点颜色。
        </p>
      </section>

      <section className="section brand-panel tone-mist home-section-lucky" id="home-lucky-entry">
        <h2>领取今天的幸运颜色</h2>
        <p>
          每天来这里，抽取一份属于今天的幸运颜色。
          它可能是一点平静、一点勇气、一点元气，也可能只是提醒你：今天也可以柔软一点。
        </p>
        <div className="start-actions">
          <a className="cta" href="/lucky-color">开始抽取</a>
          <a className="ghost-btn" href="#play">进入网页转盘</a>
        </div>
        {WheelSection}
      </section>

      <section className="section brand-panel tone-cream home-section-ip">
        <h2>认识小羊卷</h2>
        <p>
          小羊卷来自颜色云岛，是一只会把幸运颜色送到你身边的小羊。
          它软乎乎、安静、温柔，不会打扰你，只会在你需要的时候，轻轻陪你一下。
        </p>
        <div className="cw-chip-row" style={{ marginTop: 10 }}>
          {IP_WORLD.personality.map((item) => (
            <span key={item} className="cw-chip-lite">{item}</span>
          ))}
        </div>
        <div className="start-actions" style={{ marginTop: 14 }}>
          <a className="ghost-btn" href="/xiaoyangjuan">进入小羊卷页面</a>
        </div>
      </section>

      <section className="section brand-panel tone-cloud home-section-world">
        <h2>颜色云岛，正在向你发来今天的颜色。</h2>
        <p>
          在羊卷岛的世界里，颜色不只是视觉元素，也是一种关于平静、柔软、希望和陪伴的温柔信号。
        </p>
        <ul className="cw-list">
          {IP_WORLD.lore.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section brand-panel tone-mist home-section-download" id="home-download-entry">
        <h2>把羊卷岛带在身边</h2>
        <p>
          在手机上，也能随时领取今天的幸运颜色。
          和小羊卷一起，把每天的小小治愈装进口袋里。
        </p>
        <div className="start-actions">
          <a className="cta" href={DOWNLOAD_PAGE_PATH}>前往下载页</a>
          <a className="ghost-btn" href="/download/app.apk">直接下载 APK</a>
        </div>
      </section>

      <section className="section brand-panel tone-cream home-section-future">
        <h2>小羊卷，正在慢慢走进你的生活。</h2>
        <p>
          从网页和 App 开始，羊卷岛也会逐步带来更多围绕小羊卷的日常陪伴：玩偶、挂饰、盲盒、幸运色系列周边，以及更多可以被拥有、被放在身边的小小陪伴。
        </p>
        <div className="grid">
          {FUTURE_LABS.slice(0, 3).map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="plush-mini-grid" style={{ marginTop: 12 }}>
          {COMPANION_PLUSH_ITEMS.slice(0, 2).map((item) => (
            <article key={item.name} className="plush-mini-item">
              <b>{item.name}</b>
              <p>{item.packLine}</p>
            </article>
          ))}
        </div>
        <div className="start-actions" style={{ marginTop: 14 }}>
          <a className="ghost-btn" href="/future">查看更多未来计划</a>
          <a className="ghost-btn" href="/companion-plush">查看陪伴玩偶系列</a>
        </div>
      </section>

      <section className="section brand-panel tone-mist brand-closing home-section-closing">
        <h2>{BRAND_COPY.slogan}</h2>
        <p>
          羊卷岛想做的，不只是一个抽幸运色的页面，而是一个围绕小羊卷展开的、关于颜色与陪伴的品牌世界。
        </p>
      </section>
    </div>
  );
}
