import { COLOR_PALETTE } from "@colorwalking/shared";
import { Suspense, lazy } from "react";

const LazyWheel = lazy(() => import("./WebLuckyWheel").then((mod) => ({ default: mod.WebLuckyWheel })));

export function LuckyColorPage() {
  return (
    <div className="cw-page-stack">
      <section className="section cw-card">
        <h2>Lucky Color / 幸运色体系</h2>
        <p>这里不只是一个按钮，而是一整套内容系统：颜色库、寄语、moodTag、历史记录与分享。</p>
      </section>

      <section className="section cw-card">
        <h2>颜色库</h2>
        <div className="palette">
          {COLOR_PALETTE.map((item) => (
            <article key={item.id} className="cw-color-card">
              <span style={{ backgroundColor: item.hex }} />
              <b>{item.name}</b>
              <small>{item.hex}</small>
              <p>{item.message}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section play-shell">
        <Suspense
          fallback={
            <div className="play-card loading-card">
              <h2>网页幸运转盘</h2>
              <p>正在准备今天的颜色，请稍等一下。</p>
            </div>
          }
        >
          <LazyWheel />
        </Suspense>
      </section>
    </div>
  );
}
