import { COLOR_PALETTE } from "@colorwalking/shared";
import { WebLuckyWheel } from "./WebLuckyWheel";

export function App() {
  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="tag">每日幸运色仪式感</p>
          <h1>ColorWalking</h1>
          <p className="slogan">Walk in color, walk in mood.</p>
          <p className="desc">
            一个面向大众的幸运色转盘 App。每天点击一次，抽取今天的情绪主色，带着更轻盈的心情出发。
          </p>
          <div className="actions">
            <a className="cta" href="#play">开始 ColorWalking</a>
            <a className="ghost-btn" href="#apk-guide">查看 APK 安装</a>
          </div>
        </div>
        <div className="sheep-card">
          <img src="/brand-logo.svg" alt="五彩斑斓的小羊卷" />
        </div>
      </header>

      <section id="features" className="section">
        <h2>产品亮点</h2>
        <div className="grid">
          <article>
            <h3>稳定旋转</h3>
            <p>圆盘围绕固定圆心旋转，不晃动，点击圆盘或中心都可触发。</p>
          </article>
          <article>
            <h3>多彩抽取</h3>
            <p>内置原创色盘与鼓励文案，快速得到属于你的今日幸运色。</p>
          </article>
          <article>
            <h3>本地记录</h3>
            <p>保留最近抽取历史，形成每日好心情打卡习惯。</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>幸运色样本</h2>
        <div className="palette">
          {COLOR_PALETTE.map((item) => (
            <div key={item.id} className="chip">
              <span style={{ backgroundColor: item.hex }} />
              <b>{item.name}</b>
              <small>{item.hex}</small>
            </div>
          ))}
        </div>
      </section>

      <section id="start-now" className="section start-card">
        <h2>立即开始</h2>
        <p>点击下面按钮，快速进入 ColorWalking 体验。</p>
        <div className="start-actions">
          <a className="cta" href="#play">
            打开网页版
          </a>
          <a className="ghost-btn" href="exp://192.168.149.196:8081">
            打开手机调试版
          </a>
        </div>
      </section>

      <WebLuckyWheel />

      <section id="apk-guide" className="section start-card">
        <h2>Android 安装包（APK）</h2>
        <p>在项目根目录执行打包脚本，构建完成后会给出 APK 下载链接：</p>
        <pre>
          <code>powershell -ExecutionPolicy Bypass -File .\scripts\build-android-apk.ps1</code>
        </pre>
      </section>

      <footer className="footer">
        <p>IP 角色：五彩斑斓的小羊卷</p>
        <p>© 2026 ColorWalking. All rights reserved. 原创内容受版权保护。</p>
      </footer>
    </div>
  );
}
