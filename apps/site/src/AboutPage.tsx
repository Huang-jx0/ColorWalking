import { useMemo, useState } from "react";
import { FAQ_ITEMS, SUPPORT_CHANNELS } from "./config/brandWorld";

const BRAND_LOGIC = [
  {
    title: "从幸运色开始",
    desc: "先用一个小动作进入今天的节奏，这是羊卷岛的产品入口。"
  },
  {
    title: "由小羊卷承接",
    desc: "角色不是装饰，而是品牌语气、情绪表达和世界观连接器。"
  },
  {
    title: "向陪伴生态生长",
    desc: "逐步扩展到玩偶、挂饰、盲盒和更多日常陪伴内容。"
  }
] as const;

export function AboutPage() {
  const [query, setQuery] = useState("");

  const filteredFaq = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => (`${item.q} ${item.a}`).toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="brand-shell about-v2">
      <section className="section brand-panel page-head tone-mist">
        <p className="brand-kicker">About LambRoll Isle</p>
        <h1>关于羊卷岛</h1>
        <p className="brand-subtitle">羊卷岛是一个围绕原创 IP 小羊卷展开的陪伴品牌。</p>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>我们在做什么</h2>
        <p>羊卷岛不是单一工具页，也不是商城换皮。它是品牌官网、产品入口与 IP 承载站的统一体。</p>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>为什么叫 LambRoll Isle</h2>
        <p>“LambRoll”对应核心角色小羊卷，“Isle”对应颜色云岛与品牌持续成长空间。</p>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>品牌逻辑</h2>
        <div className="brand-pillars">
          {BRAND_LOGIC.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>颜色云岛与小羊卷</h2>
        <p>颜色云岛把“颜色”定义为情绪与日常节奏的信号。小羊卷把这些颜色带进你的今天，让陪伴变得可感知、可执行。</p>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>品牌主张</h2>
        <p>让陪伴有颜色。</p>
        <p>今天，也为自己抽一份幸运颜色。</p>
      </section>

      <section className="section brand-panel tone-cream">
        <h2>未来成长方向</h2>
        <p>羊卷岛会围绕小羊卷持续扩展盲盒、玩偶、挂饰与更多日常陪伴场景，先做品牌成长，不做重电商。</p>
      </section>

      <section className="section brand-panel tone-cloud">
        <h2>支持与联系</h2>
        <div className="cw-support-grid">
          {SUPPORT_CHANNELS.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <code>{item.contact}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-panel tone-mist" id="faq">
        <h2>FAQ</h2>
        <input
          className="cw-faq-search"
          placeholder="搜索问题：下载、安装、同步、周边..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>
          {filteredFaq.length === 0 ? <p>没有找到匹配问题。</p> : null}
          {filteredFaq.map((item) => (
            <details key={item.q} className="cw-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
