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

const PALETTE = {
  woolTop: "#fffdf8",
  woolMid: "#fbf9f4",
  woolShade: "#efeae0",
  woolShadeDeep: "#e5dfd4",
  lineFace: "#d5deea",
  earOuter: "#f6f1e8",
  earInner: "#f6d9df",
  eye: "#24324f",
  eyeLight: "#8aa2c9",
  blush: "#f6bbc8",
  blushSoft: "#f9d7de",
  tail: "#ddd5c8",
  leg: "#d7dfed"
} as const;

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
  tuftY: number;
  earY: number;
  scarfSwing: number;
} {
  if (frame === "idle_b") return { face: "open", mouth: "neutral", turn: "front", bodyY: 1, headY: 0, squishX: 1, squishY: 1, blush: 0.88, eyeShift: 0, tuftY: 1, earY: 1, scarfSwing: 1 };
  if (frame === "blink_a" || frame === "blink_b") return { face: "blink", mouth: "neutral", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.88, eyeShift: 0, tuftY: 0, earY: 0, scarfSwing: 0 };
  if (frame === "happy_a") return { face: "open", mouth: "smile", turn: "front", bodyY: -1, headY: -1, squishX: 1.01, squishY: 0.99, blush: 1, eyeShift: 0, tuftY: -1, earY: -1, scarfSwing: -1 };
  if (frame === "happy_b") return { face: "open", mouth: "smile", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 1, eyeShift: 0, tuftY: 0, earY: 0, scarfSwing: 1 };
  if (frame === "expecting_a") return { face: "open", mouth: "tiny_o", turn: "front", bodyY: -1, headY: -1, squishX: 1, squishY: 1, blush: 0.9, eyeShift: 1, tuftY: -1, earY: -1, scarfSwing: -1 };
  if (frame === "expecting_b") return { face: "open", mouth: "tiny_o", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.9, eyeShift: -1, tuftY: 0, earY: 0, scarfSwing: 1 };
  if (frame === "curious_a") return { face: "open", mouth: "neutral", turn: "right", bodyY: 0, headY: -1, squishX: 1, squishY: 1, blush: 0.9, eyeShift: 1, tuftY: -1, earY: -1, scarfSwing: -1 };
  if (frame === "comfort_a") return { face: "open", mouth: "comfort", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.8, eyeShift: 0, tuftY: 1, earY: 1, scarfSwing: 0 };
  if (frame === "sleepy_a") return { face: "sleep", mouth: "comfort", turn: "front", bodyY: 0, headY: 1, squishX: 1, squishY: 1, blush: 0.76, eyeShift: 0, tuftY: 1, earY: 1, scarfSwing: 0 };
  if (frame === "sleepy_b") return { face: "blink", mouth: "comfort", turn: "front", bodyY: 1, headY: 1, squishX: 1.01, squishY: 0.99, blush: 0.76, eyeShift: 0, tuftY: 2, earY: 1, scarfSwing: 1 };
  if (frame === "press_a") return { face: "open", mouth: "neutral", turn: "front", bodyY: 2, headY: 2, squishX: 1.08, squishY: 0.92, blush: 0.86, eyeShift: 0, tuftY: 1, earY: 2, scarfSwing: 0 };
  if (frame === "press_b") return { face: "blink", mouth: "neutral", turn: "front", bodyY: 1, headY: 1, squishX: 1.05, squishY: 0.95, blush: 0.86, eyeShift: 0, tuftY: 1, earY: 1, scarfSwing: 1 };
  if (frame === "jump_a") return { face: "open", mouth: "smile", turn: "front", bodyY: 2, headY: 1, squishX: 1.08, squishY: 0.92, blush: 1, eyeShift: 0, tuftY: 0, earY: 1, scarfSwing: 1 };
  if (frame === "jump_b") return { face: "open", mouth: "smile", turn: "front", bodyY: -3, headY: -3, squishX: 0.94, squishY: 1.08, blush: 1, eyeShift: 0, tuftY: -2, earY: -2, scarfSwing: -1 };
  if (frame === "jump_c") return { face: "open", mouth: "smile", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.95, eyeShift: 0, tuftY: 0, earY: 0, scarfSwing: 0 };
  if (frame === "notice_a") return { face: "open", mouth: "neutral", turn: "front", bodyY: -1, headY: -2, squishX: 1, squishY: 1, blush: 0.96, eyeShift: 1, tuftY: -1, earY: -1, scarfSwing: -1 };
  if (frame === "notice_b") return { face: "open", mouth: "neutral", turn: "front", bodyY: 0, headY: -1, squishX: 1, squishY: 1, blush: 0.96, eyeShift: -1, tuftY: 0, earY: -1, scarfSwing: 1 };
  if (frame === "turn_left") return { face: "open", mouth: "neutral", turn: "left", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.85, eyeShift: -1, tuftY: 0, earY: 0, scarfSwing: -1 };
  if (frame === "turn_right") return { face: "open", mouth: "neutral", turn: "right", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.85, eyeShift: 1, tuftY: 0, earY: 0, scarfSwing: 1 };
  if (frame === "back_a") return { face: "open", mouth: "neutral", turn: "back", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0, eyeShift: 0, tuftY: 0, earY: 0, scarfSwing: 0 };
  if (frame === "back_look") return { face: "open", mouth: "neutral", turn: "back_look", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.72, eyeShift: -1, tuftY: 0, earY: 0, scarfSwing: -1 };
  return { face: "open", mouth: "neutral", turn: "front", bodyY: 0, headY: 0, squishX: 1, squishY: 1, blush: 0.88, eyeShift: 0, tuftY: 0, earY: 0, scarfSwing: 0 };
}

export function PixelSheepSprite({ frame, scarfColor, size = 64, className = "" }: Props) {
  const preset = framePreset(frame);
  const scarf = useMemo(() => clampHexColor(scarfColor), [scarfColor]);

  if (preset.turn === "back" || preset.turn === "back_look") {
    const look = preset.turn === "back_look";
    const backScarfTailX = 34 + preset.scarfSwing;
    const backTuftY = preset.tuftY;
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label="pixel sheep back"
        shapeRendering="crispEdges"
        className={`pixel-sheep ${className}`.trim()}
      >
        <rect x="16" y="34" width="32" height="20" fill={PALETTE.woolMid} />
        <rect x="14" y="38" width="36" height="14" fill={PALETTE.woolMid} />
        <rect x="16" y="48" width="32" height="6" fill={PALETTE.woolShade} />
        <rect x="48" y="41" width="6" height="4" fill={PALETTE.tail} />

        <rect x="18" y="34" width="28" height="6" fill={scarf} />
        <rect x="20" y="40" width="23" height="2" fill={scarf} />
        <rect x={backScarfTailX} y="39" width="5" height="8" fill={scarf} />

        <rect x="12" y="14" width="40" height="28" fill={PALETTE.woolMid} />
        <rect x="10" y="18" width="44" height="20" fill={PALETTE.woolMid} />
        <rect x="12" y="30" width="40" height="12" fill={PALETTE.woolShade} />

        <rect x="15" y={11 + backTuftY} width="9" height="6" fill={PALETTE.woolTop} />
        <rect x="23" y={8 + backTuftY} width="8" height="8" fill={PALETTE.woolTop} />
        <rect x="31" y={8 + backTuftY} width="8" height="8" fill={PALETTE.woolTop} />
        <rect x="39" y={11 + backTuftY} width="9" height="6" fill={PALETTE.woolTop} />
        <rect x="26" y={6 + backTuftY} width="12" height="4" fill={PALETTE.woolTop} />

        <rect x="8" y="20" width="6" height="10" fill={PALETTE.earOuter} />
        <rect x="50" y="20" width="6" height="10" fill={PALETTE.earOuter} />

        {look ? (
          <>
            <rect x="20" y="27" width="2" height="2" fill={PALETTE.eye} />
            <rect x="18" y="33" width="4" height="2" fill={PALETTE.blush} opacity="0.56" />
            <rect x="24" y="33" width="4" height="1" fill={PALETTE.eye} />
          </>
        ) : null}
      </svg>
    );
  }

  const faceX = preset.turn === "left" ? 26 : preset.turn === "right" ? 30 : 28;
  const eyeBaseLeft = preset.turn === "left" ? 24 : preset.turn === "right" ? 36 : 26;
  const eyeBaseRight = preset.turn === "left" ? 30 : preset.turn === "right" ? 40 : 36;
  const eyeShift = preset.eyeShift;
  const gy = 36 + preset.headY;
  const leftEarY = 21 + preset.earY;
  const rightEarY = 21 + preset.earY;
  const tuftY = preset.tuftY;
  const scarfTailX = 34 + preset.scarfSwing;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="pixel sheep"
      shapeRendering="crispEdges"
      className={`pixel-sheep ${className}`.trim()}
    >
      <g transform={`translate(0 ${preset.bodyY}) scale(${preset.squishX} ${preset.squishY})`}>
        <rect x="18" y="46" width="6" height="8" fill={PALETTE.leg} />
        <rect x="40" y="46" width="6" height="8" fill={PALETTE.leg} />

        <rect x="16" y="36" width="32" height="18" fill={PALETTE.woolMid} />
        <rect x="14" y="40" width="36" height="12" fill={PALETTE.woolMid} />
        <rect x="16" y="48" width="32" height="6" fill={PALETTE.woolShade} />
        <rect x="18" y="52" width="28" height="2" fill={PALETTE.woolShadeDeep} />
        <rect x="49" y="41" width="4" height="5" fill={PALETTE.woolShade} />
        <rect x="52" y="42" width="3" height="4" fill={PALETTE.tail} />

        <rect x="18" y="34" width="28" height="6" fill={scarf} />
        <rect x="20" y="40" width="23" height="2" fill={scarf} />
        <rect x={scarfTailX} y="39" width="5" height="8" fill={scarf} />
        <rect x="19" y="35" width="27" height="1" fill="#ffffff66" />
      </g>

      <g transform={`translate(0 ${preset.headY})`}>
        <rect x="12" y="14" width="40" height="28" fill={PALETTE.woolMid} />
        <rect x="10" y="18" width="44" height="20" fill={PALETTE.woolMid} />
        <rect x="12" y="30" width="40" height="12" fill={PALETTE.woolShade} />
        <rect x="14" y="34" width="36" height="8" fill={PALETTE.woolShadeDeep} opacity="0.24" />

        <rect x="9" y={leftEarY} width="6" height="9" fill={PALETTE.earOuter} />
        <rect x="49" y={rightEarY} width="6" height="9" fill={PALETTE.earOuter} />
        <rect x="10" y={leftEarY + 2} width="4" height="5" fill={PALETTE.earInner} opacity="0.7" />
        <rect x="50" y={rightEarY + 2} width="4" height="5" fill={PALETTE.earInner} opacity="0.7" />

        <rect x="15" y={11 + tuftY} width="9" height="6" fill={PALETTE.woolTop} />
        <rect x="23" y={8 + tuftY} width="8" height="8" fill={PALETTE.woolTop} />
        <rect x="31" y={8 + tuftY} width="8" height="8" fill={PALETTE.woolTop} />
        <rect x="39" y={11 + tuftY} width="9" height="6" fill={PALETTE.woolTop} />
        <rect x="26" y={6 + tuftY} width="12" height="4" fill={PALETTE.woolTop} />
        <rect x="18" y={13 + tuftY} width="28" height="2" fill="#ffffff77" />

        <rect x={faceX} y={gy} width="8" height="8" fill="#faf8f3" />
        <rect x={faceX - 1} y={gy + 1} width="10" height="6" fill="#f8f4ed" />
        <rect x={faceX} y={gy + 1} width="8" height="6" fill="#fbf8f2" />
        <rect x={faceX - 1} y={gy} width="1" height="8" fill={PALETTE.lineFace} />
        <rect x={faceX + 8} y={gy} width="1" height="8" fill={PALETTE.lineFace} />
        <rect x={faceX} y={gy + 8} width="8" height="1" fill={PALETTE.lineFace} />

        {preset.face === "blink" || preset.face === "sleep" ? (
          <>
            <rect x={eyeBaseLeft + eyeShift} y="28" width="2" height="1" fill={PALETTE.eye} />
            <rect x={eyeBaseRight + eyeShift} y="28" width="2" height="1" fill={PALETTE.eye} />
          </>
        ) : (
          <>
            <rect x={eyeBaseLeft + eyeShift} y="27" width="2" height="2" fill={PALETTE.eye} />
            <rect x={eyeBaseRight + eyeShift} y="27" width="2" height="2" fill={PALETTE.eye} />
            <rect x={eyeBaseLeft + eyeShift} y="27" width="1" height="1" fill={PALETTE.eyeLight} />
            <rect x={eyeBaseRight + eyeShift} y="27" width="1" height="1" fill={PALETTE.eyeLight} />
          </>
        )}

        <rect x="22" y="33" width="6" height="2" fill={PALETTE.blushSoft} opacity={Math.min(1, preset.blush * 0.76)} />
        <rect x="23" y="34" width="4" height="2" fill={PALETTE.blush} opacity={preset.blush} />
        <rect x="36" y="33" width="6" height="2" fill={PALETTE.blushSoft} opacity={Math.min(1, preset.blush * 0.76)} />
        <rect x="37" y="34" width="4" height="2" fill={PALETTE.blush} opacity={preset.blush} />

        {preset.mouth === "smile" ? (
          <>
            <rect x="30" y="40" width="4" height="1" fill={PALETTE.eye} />
            <rect x="29" y="41" width="6" height="1" fill={PALETTE.eye} />
            <rect x="30" y="42" width="4" height="1" fill={PALETTE.eye} />
          </>
        ) : preset.mouth === "tiny_o" ? (
          <rect x="31" y="41" width="2" height="2" fill={PALETTE.eye} />
        ) : preset.mouth === "comfort" ? (
          <>
            <rect x="30" y="41" width="4" height="1" fill={PALETTE.eye} />
            <rect x="31" y="42" width="2" height="1" fill={PALETTE.eye} />
          </>
        ) : (
          <>
            <rect x="31" y="41" width="2" height="1" fill={PALETTE.eye} />
            <rect x="30" y="42" width="4" height="1" fill={PALETTE.eye} />
          </>
        )}
      </g>
    </svg>
  );
}
