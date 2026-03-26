import { useMemo } from "react";

export const PIXEL_SHEEP_FRAMES = [
  "idle_a",
  "idle_b",
  "blink_a",
  "blink_b",
  "happy_a",
  "happy_b",
  "expecting_a",
  "expecting_b",
  "curious_a",
  "comfort_a",
  "sleepy_a",
  "sleepy_b",
  "press_a",
  "press_b",
  "jump_a",
  "jump_b",
  "jump_c",
  "notice_a",
  "notice_b",
  "turn_left",
  "turn_right",
  "back_a",
  "back_look"
] as const;

export type PixelSheepFrame = (typeof PIXEL_SHEEP_FRAMES)[number];

type Props = {
  frame: PixelSheepFrame;
  scarfColor: string;
  size?: number;
  className?: string;
};

type FaceMode = "open" | "blink" | "sleep";
type MouthMode = "neutral" | "smile" | "tiny_o" | "comfort";
type TurnMode = "front" | "left" | "right" | "back" | "back_look";

function clampHexColor(input: string): string {
  const clean = input.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(clean)) return clean;
  return "#7ea9df";
}

function framePreset(frame: PixelSheepFrame): {
  face: FaceMode;
  mouth: MouthMode;
  turn: TurnMode;
  bodyY: number;
  headY: number;
  squishX: number;
  squishY: number;
  blush: number;
  eyeShift: number;
} {
  if (frame === "idle_b") return { face: "open", mouth: "neutral", turn: "front", bodyY: 1, headY: 0, squishX: 1, squishY: 1, blush: 0.88, eyeShift: 0 };
  if (frame === "blink_a" || frame === "blink_b") return { face: "blink", mouth: "neutral", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.88, eyeShift: 0 };
  if (frame === "happy_a") return { face: "open", mouth: "smile", turn: "front", bodyY: -1, headY: -1, squishX: 1.01, squishY: 0.99, blush: 1, eyeShift: 0 };
  if (frame === "happy_b") return { face: "open", mouth: "smile", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 1, eyeShift: 0 };
  if (frame === "expecting_a") return { face: "open", mouth: "tiny_o", turn: "front", bodyY: -1, headY: -1, squishX: 1, squishY: 1, blush: 0.9, eyeShift: 1 };
  if (frame === "expecting_b") return { face: "open", mouth: "tiny_o", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.9, eyeShift: -1 };
  if (frame === "curious_a") return { face: "open", mouth: "neutral", turn: "right", bodyY: 0, headY: -1, squishX: 1, squishY: 1, blush: 0.9, eyeShift: 1 };
  if (frame === "comfort_a") return { face: "open", mouth: "comfort", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.8, eyeShift: 0 };
  if (frame === "sleepy_a") return { face: "sleep", mouth: "comfort", turn: "front", bodyY: 0, headY: 1, squishX: 1, squishY: 1, blush: 0.76, eyeShift: 0 };
  if (frame === "sleepy_b") return { face: "blink", mouth: "comfort", turn: "front", bodyY: 1, headY: 1, squishX: 1.01, squishY: 0.99, blush: 0.76, eyeShift: 0 };
  if (frame === "press_a") return { face: "open", mouth: "neutral", turn: "front", bodyY: 2, headY: 2, squishX: 1.08, squishY: 0.92, blush: 0.86, eyeShift: 0 };
  if (frame === "press_b") return { face: "blink", mouth: "neutral", turn: "front", bodyY: 1, headY: 1, squishX: 1.05, squishY: 0.95, blush: 0.86, eyeShift: 0 };
  if (frame === "jump_a") return { face: "open", mouth: "smile", turn: "front", bodyY: 2, headY: 1, squishX: 1.08, squishY: 0.92, blush: 1, eyeShift: 0 };
  if (frame === "jump_b") return { face: "open", mouth: "smile", turn: "front", bodyY: -3, headY: -3, squishX: 0.94, squishY: 1.08, blush: 1, eyeShift: 0 };
  if (frame === "jump_c") return { face: "open", mouth: "smile", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.95, eyeShift: 0 };
  if (frame === "notice_a") return { face: "open", mouth: "neutral", turn: "front", bodyY: -1, headY: -2, squishX: 1, squishY: 1, blush: 0.96, eyeShift: 1 };
  if (frame === "notice_b") return { face: "open", mouth: "neutral", turn: "front", bodyY: 0, headY: -1, squishX: 1, squishY: 1, blush: 0.96, eyeShift: -1 };
  if (frame === "turn_left") return { face: "open", mouth: "neutral", turn: "left", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.85, eyeShift: -1 };
  if (frame === "turn_right") return { face: "open", mouth: "neutral", turn: "right", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.85, eyeShift: 1 };
  if (frame === "back_a") return { face: "open", mouth: "neutral", turn: "back", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0, eyeShift: 0 };
  if (frame === "back_look") return { face: "open", mouth: "neutral", turn: "back_look", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.72, eyeShift: -1 };
  return { face: "open", mouth: "neutral", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.88, eyeShift: 0 };
}

export function PixelSheepSprite({ frame, scarfColor, size = 64, className = "" }: Props) {
  const preset = framePreset(frame);
  const scarf = useMemo(() => clampHexColor(scarfColor), [scarfColor]);

  if (preset.turn === "back" || preset.turn === "back_look") {
    const look = preset.turn === "back_look";
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label="像素小羊卷背面"
        shapeRendering="crispEdges"
        className={`pixel-sheep ${className}`.trim()}
      >
        <rect x="14" y="34" width="36" height="20" fill="#f6f4ef" />
        <rect x="14" y="46" width="36" height="8" fill="#ece8df" />
        <rect x="49" y="41" width="5" height="4" fill="#d8d2c6" />

        <rect x="18" y="34" width="28" height="8" fill={scarf} />
        <rect x="34" y="40" width="5" height="8" fill={scarf} />

        <rect x="12" y="14" width="40" height="30" fill="#fbf9f4" />
        <rect x="12" y="30" width="40" height="14" fill="#efeae0" />
        <rect x="16" y="10" width="8" height="6" fill="#fffdf8" />
        <rect x="24" y="8" width="8" height="8" fill="#fffdf8" />
        <rect x="32" y="8" width="8" height="8" fill="#fffdf8" />
        <rect x="40" y="10" width="8" height="6" fill="#fffdf8" />
        <rect x="26" y="6" width="12" height="4" fill="#fffcf7" />
        <rect x="8" y="20" width="8" height="10" fill="#f6f1e8" />
        <rect x="48" y="20" width="8" height="10" fill="#f6f1e8" />

        {look ? (
          <>
            <rect x="20" y="27" width="3" height="3" fill="#1f2a44" />
            <rect x="18" y="33" width="4" height="2" fill="#f7b9c2" opacity="0.7" />
            <rect x="24" y="33" width="4" height="1" fill="#1f2a44" />
          </>
        ) : null}
      </svg>
    );
  }

  const faceX = preset.turn === "left" ? 27 : preset.turn === "right" ? 29 : 28;
  const eyeBaseLeft = preset.turn === "left" ? 24 : preset.turn === "right" ? 36 : 26;
  const eyeBaseRight = preset.turn === "left" ? 30 : preset.turn === "right" ? 40 : 36;
  const eyeShift = preset.eyeShift;
  const gx = 32;
  const gy = 36 + preset.headY;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="像素小羊卷"
      shapeRendering="crispEdges"
      className={`pixel-sheep ${className}`.trim()}
    >
      <g transform={`translate(0 ${preset.bodyY}) scale(${preset.squishX} ${preset.squishY})`}>
        <rect x="17" y="42" width="6" height="8" fill="#d7dfed" />
        <rect x="41" y="42" width="6" height="8" fill="#d7dfed" />
        <rect x="14" y="34" width="36" height="20" fill="#f6f4ef" />
        <rect x="14" y="46" width="36" height="8" fill="#ece8df" />
        <rect x="50" y="40" width="4" height="6" fill="#ece8df" />
        <rect x="52" y="42" width="4" height="4" fill="#d8d2c6" />
        <rect x="18" y="34" width="28" height="8" fill={scarf} />
        <rect x="34" y="40" width="5" height="8" fill={scarf} />
        <rect x="19" y="35" width="27" height="1" fill="#ffffff66" />
      </g>

      <g transform={`translate(0 ${preset.headY})`}>
        <rect x="12" y="14" width="40" height="30" fill="#fbf9f4" />
        <rect x="12" y="30" width="40" height="14" fill="#efeae0" />
        <rect x="8" y="20" width="8" height="10" fill="#f6f1e8" />
        <rect x="48" y="20" width="8" height="10" fill="#f6f1e8" />
        <rect x="10" y="22" width="4" height="6" fill="#f7dfe5" />
        <rect x="50" y="22" width="4" height="6" fill="#f7dfe5" />
        <rect x="16" y="10" width="8" height="6" fill="#fffdf8" />
        <rect x="24" y="8" width="8" height="8" fill="#fffdf8" />
        <rect x="32" y="8" width="8" height="8" fill="#fffdf8" />
        <rect x="40" y="10" width="8" height="6" fill="#fffdf8" />
        <rect x="26" y="6" width="12" height="4" fill="#fffcf7" />

        <rect x={faceX} y={gy} width="8" height="8" fill="#f9f7f1" />

        {preset.face === "blink" || preset.face === "sleep" ? (
          <>
            <rect x={eyeBaseLeft + eyeShift} y="28" width="3" height="1" fill="#1f2a44" />
            <rect x={eyeBaseRight + eyeShift} y="28" width="3" height="1" fill="#1f2a44" />
          </>
        ) : (
          <>
            <rect x={eyeBaseLeft + eyeShift} y="27" width="3" height="3" fill="#1f2a44" />
            <rect x={eyeBaseRight + eyeShift} y="27" width="3" height="3" fill="#1f2a44" />
          </>
        )}

        <rect x="23" y="33" width="5" height="3" fill="#f7b9c2" opacity={preset.blush} />
        <rect x="37" y="33" width="5" height="3" fill="#f7b9c2" opacity={preset.blush} />

        {preset.mouth === "smile" ? (
          <>
            <rect x="30" y="41" width="4" height="1" fill="#1f2a44" />
            <rect x="29" y="42" width="6" height="1" fill="#1f2a44" />
            <rect x="28" y="43" width="8" height="1" fill="#1f2a44" />
          </>
        ) : preset.mouth === "tiny_o" ? (
          <rect x="31" y="41" width="2" height="2" fill="#1f2a44" />
        ) : preset.mouth === "comfort" ? (
          <>
            <rect x="30" y="41" width="4" height="1" fill="#1f2a44" />
            <rect x="29" y="42" width="6" height="1" fill="#1f2a44" />
          </>
        ) : (
          <>
            <rect x="31" y="41" width="2" height="1" fill="#1f2a44" />
            <rect x="30" y="42" width="4" height="1" fill="#1f2a44" />
          </>
        )}
      </g>
    </svg>
  );
}

