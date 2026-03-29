import { FUTURE_LABS } from "./config/brandWorld";

export function FuturePage() {
  return (
    <div className="cw-page-stack">
      <section className="section cw-card">
        <h2>Future / 陪伴未来</h2>
        <p>这一页是 ColorWalking 的商业延展承载层，先展示方向，后续逐步落地预约、发售与活动。</p>
      </section>

      <section className="section">
        <div className="cw-future-grid">
          {FUTURE_LABS.map((item) => (
            <article key={item.title} className="cw-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cw-card">
        <h2>阶段计划</h2>
        <p>Phase 1：官网展示与概念验证</p>
        <p>Phase 2：数字周边与预约机制</p>
        <p>Phase 3：AI 陪伴 + 轻具身终端探索</p>
      </section>
    </div>
  );
}
