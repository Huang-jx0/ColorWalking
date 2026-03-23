import { COLOR_PALETTE, type ColorItem } from "./colors";

export type DrawResult = {
  id: string;
  color: ColorItem;
  index: number;
  drawnAt: string;
  dayKey: string;
};

export type DrawEngine = {
  draw: () => DrawResult;
  palette: ColorItem[];
};

export function formatDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function createDrawEngine(
  palette: ColorItem[] = COLOR_PALETTE,
  random: () => number = Math.random
): DrawEngine {
  if (!palette.length) {
    throw new Error("Color palette cannot be empty.");
  }

  return {
    palette,
    draw: () => {
      const index = Math.floor(random() * palette.length);
      const now = new Date();
      return {
        id: `${now.getTime()}-${index}`,
        color: palette[index],
        index,
        drawnAt: now.toISOString(),
        dayKey: formatDayKey(now)
      };
    }
  };
}
