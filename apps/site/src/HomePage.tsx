import { type ReactNode } from "react";
import { SheepPetGarden } from "./SheepPetGarden";
import { COMPANION_PLUSH_ITEMS, FUTURE_LABS, IP_WORLD } from "./config/brandWorld";
import { BRAND_COPY, DOWNLOAD_PAGE_PATH } from "./config/experience";

type Props = {
  WheelSection: ReactNode;
};

const HERO_SIGNATURES = ["幸运色", "小羊卷", "颜色云岛", "轻仪式感"] as const;

const BRAND_PROMISE = [
  {
    title: "每天一份幸运颜色",
    desc: "不是压力任务，而是温柔提醒。"
  },
  {
    title: "小羊卷在场陪伴",
    desc: "不吵闹、不打断，但一直在。"
  },
  {
    title: "从官网到 App 一致",
    desc: "同一语气、同一体验节奏。"
  }
] as const;

export function HomePage({ WheelSection }: Props) {
  return (
    <div className="brand-shell home-v6">
      <header className="brand-hero">
        <div className="brand-hero-copy">
          <p className="brand-kicker">{BRAND_COPY.heroTag}</p>
          <h1>{BRAND_COPY.heroTitle}</h1>
          <p className="brand-subtitle">{BRAND_COPY.heroDesc}</p>
          <div className="hero-signatures">
            {HERO_SIGNATURES.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="brand-note">{BRAND_COPY.slogan}</p>
          <div className="actions">
            <a className="cta" href="/lucky-color">抽取今日幸运色</a>
            <a className="ghost-btn" href="/xiaoyangjuan">认识小羊卷</a>
          </div>
        </div>

        <div className="brand-hero-art sheep-card">
          <img src="/brand-logo.svg" alt="LambRoll Isle 羊卷岛品牌视觉" loading="eager" decoding="async" />
          <p className="hero-art-note">{BRAND_COPY.heroNote}</p>
          <div className="hero-art-sign">
            {BRAND_PROMISE.map((item) => (
              <article key={item.title}>
                <b>{item.title}</b>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </header>

      <section className="section brand-panel tone-mist">
        <h2>这里是羊卷岛</h2>
        <p>{BRAND_COPY.oneLiner}</p>
        <div className="home-headline-strip">
          <span>品牌站</span>
          <span>产品入口</span>
          <span>IP 承载</span>
          <span>未来成长</span>
        </div>
        <p>
          在这里，你会先看到今天的幸运色入口，再认识小羊卷和它所在的颜色云岛，
          最后看到这个品牌如何一步步长成更完整的陪伴世界。
        </p>
      </section>

      <section className="section brand-panel tone-cloud" id="home-lucky-entry">
        <h2>今日幸运色主入口</h2>
        <p>{BRAND_COPY.productSlogan}</p>
        <div className="start-actions">
          <a className="cta" href="/lucky-color">开始抽取</a>
          <a className="ghost-btn" href="#play">进入网页转盘</a>
        </div>
      </section>

      {WheelSection}

      <section className="section brand-panel tone-cream">
        <h2>小羊卷：品牌核心 IP</h2>
        <p>{IP_WORLD.intro}</p>
        <div className="cw-chip-row" style={{ marginTop: 10 }}>
          {IP_WORLD.personality.map((item) => (
            <span key={item} className="cw-chip-lite">{item}</span>
          ))}
        </div>
        <div className="start-actions" style={{ marginTop: 14 }}>
          <a className="ghost-btn" href="/xiaoyangjuan">进入小羊卷页面</a>
        </div>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>颜色云岛</h2>
        <p>幸运色不是装饰，而是帮助你和当下情绪对齐的温柔信号。</p>
        <ul className="cw-list">
          {IP_WORLD.lore.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section brand-panel tone-mist" id="home-download-entry">
        <h2>下载 App</h2>
        <p>Android 版本已可用。网页与 App 保持同一套语气与体验节奏。</p>
        <div className="start-actions">
          <a className="cta" href={DOWNLOAD_PAGE_PATH}>前往下载页</a>
          <a className="ghost-btn" href="/download/app.apk">直接下载 APK</a>
        </div>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>未来周边与成长预告</h2>
        <p>先做轻量承载，不做重商城。让用户看到羊卷岛正在稳定成长。</p>
        <div className="grid">
          {FUTURE_LABS.slice(0, 3).map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="start-actions" style={{ marginTop: 14 }}>
          <a className="ghost-btn" href="/future">查看更多未来计划</a>
        </div>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>小羊卷陪伴玩偶系列</h2>
        <p>把小羊卷，轻轻放进日常里。</p>
        <div className="plush-mini-grid">
          {COMPANION_PLUSH_ITEMS.map((item) => (
            <article key={item.name} className="plush-mini-item">
              <b>{item.name}</b>
              <p>{item.packLine}</p>
            </article>
          ))}
        </div>
        <div className="start-actions" style={{ marginTop: 14 }}>
          <a className="ghost-btn" href="/companion-plush">查看系列设定</a>
        </div>
      </section>

      <section className="section brand-panel brand-closing tone-mist">
        <h2>{BRAND_COPY.slogan}</h2>
        <p>LambRoll Isle（羊卷岛）希望把颜色变成陪伴，把陪伴带进日常。</p>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>小羊卷桌宠体验</h2>
        <p>网页端已开放桌宠互动，和小羊卷打招呼、互动、散步，让陪伴更具体。</p>
      </section>

      <SheepPetGarden />
    </div>
  );
}
