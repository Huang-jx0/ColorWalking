import type { PetPresenceEvent, PetPresenceState } from "./types";

export type PresenceContext = {
  hasDrawToday: boolean;
};

export function nextPresenceState(
  current: PetPresenceState,
  event: PetPresenceEvent,
  context: PresenceContext
): PetPresenceState {
  if (event === "BOOT") return "enter";
  if (event === "FAREWELL") return "farewell";
  if (event === "DRAW_SUCCESS") return "happy";
  if (event === "DRAW_PENDING") return "notice";
  if (event === "POINTER_CLICK") return "notice";

  if (event === "ENTER_DONE" && current === "enter") return "idle";

  if (event === "POINTER_NEAR") {
    if (current === "sleepy" || current === "comfort" || current === "idle") return "notice";
    return current;
  }

  if (event === "POINTER_MOVE") {
    if (current === "notice" || current === "idle" || current === "comfort" || current === "sleepy") return "curious";
    return current;
  }

  if (event === "POINTER_LEAVE") {
    if (current === "notice" || current === "curious") return fallbackCalmState(context);
    return current;
  }

  if (event === "IDLE_SOFT") {
    if (current === "idle" || current === "notice" || current === "curious") return "comfort";
    return current;
  }

  if (event === "IDLE_DEEP") {
    if (current === "comfort" || current === "idle") return "sleepy";
    return current;
  }

  if (event === "USER_ACTIVE") {
    if (current === "sleepy" || current === "comfort") return "notice";
    if (current === "farewell") return fallbackCalmState(context);
    return current;
  }

  if (event === "SCROLL_PULSE") {
    if (current === "idle" || current === "comfort" || current === "sleepy") return "curious";
    return current;
  }

  if (event === "STATE_TIMEOUT") {
    if (current === "happy") return fallbackCalmState(context);
    if (current === "notice" || current === "curious" || current === "farewell") return fallbackCalmState(context);
    return current;
  }

  return current;
}

function fallbackCalmState(context: PresenceContext): PetPresenceState {
  return context.hasDrawToday ? "comfort" : "idle";
}

export function presenceStateDurationMs(state: PetPresenceState): number | null {
  if (state === "enter") return 950;
  if (state === "notice") return 1500;
  if (state === "curious") return 1700;
  if (state === "happy") return 2600;
  if (state === "farewell") return 1200;
  return null;
}

