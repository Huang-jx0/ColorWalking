import { Suspense, lazy, useMemo, useState } from "react";
import { DownloadPage } from "./DownloadPage";
import { FloatingSheepPet } from "./FloatingSheepPet";
import { HomePage } from "./HomePage";
import { IpPage } from "./IpPage";
import { LuckyColorPage } from "./LuckyColorPage";
import { FuturePage } from "./FuturePage";
import { AboutPage } from "./AboutPage";
import { QUICK_ENTRIES, ROUTE_PATHS, TOP_NAV } from "./config/brandWorld";
import { DOWNLOAD_PAGE_PATH } from "./config/experience";

const BUILD_TAG = import.meta.env.VITE_BUILD_TIME ?? new Date().toISOString().slice(0, 16).replace("T", " ");
const LazyWheel = lazy(() => import("./WebLuckyWheel").then((mod) => ({ default: mod.WebLuckyWheel })));

type RouteKey = "home" | "lucky" | "ip" | "future" | "about" | "download";

function normalizePath(path: string): string {
  const p = path.replace(/\/+$/, "") || "/";
  return p;
}

function routeByPath(pathname: string): RouteKey {
  const path = normalizePath(pathname);
  if (path === ROUTE_PATHS.lucky) return "lucky";
  if (path === ROUTE_PATHS.ip) return "ip";
  if (path === ROUTE_PATHS.future) return "future";
  if (path === ROUTE_PATHS.about) return "about";
  if (path === ROUTE_PATHS.download || path === DOWNLOAD_PAGE_PATH) return "download";
  return "home";
}

export function App() {
  const [search, setSearch] = useState("");
  const route = useMemo(() => routeByPath(window.location.pathname), []);

  const searchResult = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return QUICK_ENTRIES.filter((item) => (`${item.title} ${item.hint}`).toLowerCase().includes(q)).slice(0, 4);
  }, [search]);

  const renderPage = () => {
    if (route === "download") return <DownloadPage />;
    if (route === "lucky") return <LuckyColorPage />;
    if (route === "ip") return <IpPage />;
    if (route === "future") return <FuturePage />;
    if (route === "about") return <AboutPage />;
    return (
      <HomePage
        WheelSection={
          <section id="play" className="section play-shell">
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
        }
      />
    );
  };

  return (
    <div className="page">
      <nav className="top-nav cw-top-nav">
        <a className="nav-brand" href={ROUTE_PATHS.home}>ColorWalking</a>
        <div className="nav-links">
          {TOP_NAV.map((item) => (
            <a key={item.path} href={item.path} className={normalizePath(window.location.pathname) === item.path ? "nav-active" : ""}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="cw-search-wrap">
          <input
            className="cw-search"
            placeholder="搜索：幸运色 / 小羊卷 / 下载 / 未来"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchResult.length > 0 ? (
            <div className="cw-search-panel">
              {searchResult.map((item) => (
                <a key={item.path + item.title} href={item.path}>
                  <b>{item.title}</b>
                  <small>{item.hint}</small>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </nav>

      {renderPage()}

      <footer className="footer cw-footer">
        <div className="cw-footer-grid">
          <div>
            <p><b>ColorWalking</b></p>
            <p>以幸运色为入口，以小羊卷为核心的原创陪伴 IP。</p>
          </div>
          <div>
            <p><b>站点导航</b></p>
            <p><a href="/lucky-color">Lucky Color</a> · <a href="/xiaoyangjuan">Xiaoyangjuan</a> · <a href="/future">Future</a></p>
          </div>
          <div>
            <p><b>支持与帮助</b></p>
            <p><a href="/download">下载 App</a> · <a href="/about">FAQ / 联系 / 支持</a></p>
          </div>
        </div>
        <p>© 2026 ColorWalking · 愿你每天都有一刻被轻轻安慰。</p>
        <p className="version-badge">版本更新：{BUILD_TAG}</p>
      </footer>

      <FloatingSheepPet />
    </div>
  );
}
