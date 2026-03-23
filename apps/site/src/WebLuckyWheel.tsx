import { COLOR_PALETTE, createDrawEngine, type DrawResult } from "@colorwalking/shared";
import { useMemo, useState } from "react";

const HISTORY_KEY = "colorwalking.web.history.v1";
const EXTRA_ROUNDS = 6;

function buildWheelGradient(): string {
  const sector = 360 / COLOR_PALETTE.length;
  const parts: string[] = [];
  COLOR_PALETTE.forEach((c, i) => {
    const from = i * sector;
    const to = (i + 1) * sector;
    parts.push(`${c.hex} ${from}deg ${to}deg`);
  });
  return `conic-gradient(from 0deg, ${parts.join(", ")})`;
}

export function WebLuckyWheel() {
  const engine = useMemo(() => createDrawEngine(COLOR_PALETTE), []);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [history, setHistory] = useState<DrawResult[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      return (JSON.parse(raw) as DrawResult[]).slice(0, 5);
    } catch {
      return [];
    }
  });
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  const onSpin = () => {
    if (spinning) return;

    const draw = engine.draw();
    const sector = 360 / engine.palette.length;
    const targetCenter = draw.index * sector + sector / 2;
    const nextAngle = angle - EXTRA_ROUNDS * 360 - targetCenter;

    setSpinning(true);
    setAngle(nextAngle);

    window.setTimeout(() => {
      setResult(draw);
      const nextHistory = [draw, ...history].slice(0, 100);
      setHistory(nextHistory.slice(0, 5));
      localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
      setSpinning(false);
    }, 2200);
  };

  return (
    <section id="play" className="section play-card">
      <h2>网页版转盘</h2>
      <p>点击圆盘或中心按钮，立即抽取你的今日幸运色。</p>

      <div className="play-layout">
        <div className="wheel-wrap">
          <div className="wheel-pointer" />
          <button
            type="button"
            className="wheel"
            onClick={onSpin}
            style={{
              transform: `rotate(${angle}deg)`,
              transition: spinning ? "transform 2.2s cubic-bezier(0.19, 0.95, 0.2, 1)" : "none",
              background: buildWheelGradient()
            }}
            aria-label="点击转盘抽取幸运色"
          />
          <button type="button" className="wheel-center" onClick={onSpin}>
            {spinning ? "转动中" : "再抽一次"}
          </button>
        </div>

        <div className="play-result">
          <h3>抽取结果</h3>
          {result ? (
            <>
              <div className="result-swatch" style={{ background: result.color.hex }} />
              <b>{result.color.name}</b>
              <small>{result.color.hex}</small>
              <p>{result.color.message}</p>
            </>
          ) : (
            <p>点击转盘，开始今天的好心情。</p>
          )}

          <h4>最近记录</h4>
          {history.length ? (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id}>
                  <span style={{ background: item.color.hex }} />
                  <em>{item.color.name}</em>
                  <code>{item.color.hex}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p>还没有记录</p>
          )}
        </div>
      </div>
    </section>
  );
}
