import { FAQ_ITEMS } from "./config/brandWorld";

export function AboutPage() {
  return (
    <div className="cw-page-stack">
      <section className="section cw-card">
        <h2>About ColorWalking</h2>
        <p>ColorWalking 是以幸运色为入口、以小羊卷为核心角色、以轻陪伴为体验核心的原创 IP 项目。</p>
      </section>

      <section className="section cw-card">
        <h2>帮助与支持</h2>
        <div className="cw-support-grid">
          <article>
            <h3>下载与安装</h3>
            <p>如下载后无法安装，请先确认系统允许未知来源安装。</p>
          </article>
          <article>
            <h3>体验反馈</h3>
            <p>你可以通过 GitHub Issues 反馈功能建议与视觉偏好。</p>
          </article>
          <article>
            <h3>品牌合作</h3>
            <p>周边联名、内容联动与合作咨询可先通过仓库主页联系。</p>
          </article>
        </div>
      </section>

      <section className="section cw-card">
        <h2>FAQ</h2>
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="cw-faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
