import { useEffect, useState } from "react";

type WheelDetail = {
  color?: { name?: string };
};

const FLOAT_LINES = [
  "小羊卷在这儿，想陪你抽今天的颜色。",
  "如果有点累，我们先慢一点点。",
  "我会在旁边，不会打扰你。",
  "今天也值得被温柔对待。"
] as const;

export function FloatingSheepPet() {
  const [bubble, setBubble] = useState(FLOAT_LINES[0]);
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const onPending = () => {
      setBubble("我在看着转盘，等你揭晓。");
      setAwake(true);
    };
    const onDraw = (e: Event) => {
      const detail = (e as CustomEvent<WheelDetail>).detail;
      const name = detail?.color?.name ?? "幸运色";
      setBubble(`抽到了「${name}」，这份颜色真适合今天。`);
      setAwake(true);
    };
    window.addEventListener("colorwalking:draw-pending", onPending);
    window.addEventListener("colorwalking:draw-updated", onDraw as EventListener);
    return () => {
      window.removeEventListener("colorwalking:draw-pending", onPending);
      window.removeEventListener("colorwalking:draw-updated", onDraw as EventListener);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = FLOAT_LINES[Math.floor(Math.random() * FLOAT_LINES.length)] ?? FLOAT_LINES[0];
      setBubble(next);
    }, 26000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={awake ? "floating-pet is-awake" : "floating-pet"} aria-live="polite">
      <a className="floating-pet-core" href="#pet" onMouseEnter={() => setAwake(true)} onMouseLeave={() => setAwake(false)}>
        <span className="floating-ear left" />
        <span className="floating-ear right" />
        <span className="floating-face">
          <i />
          <i />
          <b />
        </span>
      </a>
      <div className="floating-bubble">{bubble}</div>
    </div>
  );
}

