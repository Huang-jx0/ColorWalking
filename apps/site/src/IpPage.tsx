import { IP_GALLERY, IP_WORLD, SHEEP_QUOTES } from "./config/brandWorld";

const CHARACTER_PROFILE = [
  { label: "身份", value: "颜色云岛信使" },
  { label: "定位", value: "羊卷岛核心 IP" },
  { label: "风格", value: "温柔、安静、柔软" },
  { label: "能力", value: "把今日幸运色带到你身边" }
] as const;

const COMPANION_SCENES = [
  {
    title: "工作陪伴",
    detail: "放在桌边，不打扰你，只在你抬头时给你一个轻提醒。"
  },
  {
    title: "睡前陪伴",
    detail: "在床头灯旁，像一句慢慢放下今天的晚安。"
  },
  {
    title: "通勤陪伴",
    detail: "在匆忙的时间缝隙里，提醒你给自己留一点呼吸。"
  }
] as const;

const COLLECTIBLE_HINTS = [
  "陪伴玩偶：以日常场景为核心，不做喧闹造型。",
  "幸运色挂饰：把当天颜色带进通勤和书包。",
  "盲盒企划：围绕季节与情绪主题逐步展开。"
] as const;

export function IpPage() {
  return (
    <div className="brand-shell ip-v2">
      <section className="section brand-panel page-head tone-mist">
        <p className="brand-kicker">LambRoll Isle · Core IP</p>
        <h1>认识小羊卷</h1>
        <p className="brand-subtitle">小羊卷不是装饰角色，而是羊卷岛品牌的核心 IP 与情绪陪伴入口。</p>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>角色档案</h2>
        <p>{IP_WORLD.intro}</p>
        <div className="ip-profile-grid">
          {CHARACTER_PROFILE.map((item) => (
            <article key={item.label}>
              <small>{item.label}</small>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>性格与气质</h2>
        <div className="cw-chip-row">
          {IP_WORLD.personality.map((item) => (
            <span key={item} className="cw-chip-lite">{item}</span>
          ))}
        </div>
        <p style={{ marginTop: 12 }}>它不喧闹，不催促，更像一份安静但持续存在的陪伴。</p>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>世界观关系</h2>
        <ul className="cw-list">
          {IP_WORLD.lore.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>陪伴场景</h2>
        <div className="ip-scenes">
          {COMPANION_SCENES.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>视觉资产展示</h2>
        <div className="cw-ip-gallery">
          {IP_GALLERY.map((item) => (
            <article key={item.title}>
              <b>{item.title}</b>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>小羊卷语气样本</h2>
        <div className="cw-quote-grid">
          {SHEEP_QUOTES.map((item) => (
            <blockquote key={item}>“{item}”</blockquote>
          ))}
        </div>
      </section>

      <section className="section brand-panel tone-mist">
        <h2>收藏向预告</h2>
        <ul className="cw-list">
          {COLLECTIBLE_HINTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="start-actions" style={{ marginTop: 12 }}>
          <a className="ghost-btn" href="/companion-plush">查看陪伴玩偶系列</a>
          <a className="ghost-btn" href="/future">查看未来陪伴页</a>
        </div>
      </section>
    </div>
  );
}
