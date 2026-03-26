import { useEffect, useRef, useState, type RefObject } from "react";
import type { PetPresenceEvent } from "./types";
import { canTrigger, nowMs } from "./timing";

type UsePetPresenceOptions = {
  zoneRef: RefObject<HTMLElement | null>;
  onEvent: (event: PetPresenceEvent) => void;
  nearRadius?: number;
};

type LookOffset = { x: number; y: number };

export function usePetPresence({ zoneRef, onEvent, nearRadius = 220 }: UsePetPresenceOptions): LookOffset {
  const [lookOffset, setLookOffset] = useState<LookOffset>({ x: 0, y: 0 });
  const isNearRef = useRef(false);
  const lastMoveEmitRef = useRef(0);
  const lastScrollEmitRef = useRef(0);
  const softIdleTimerRef = useRef<number | null>(null);
  const deepIdleTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const resetIdleTimers = () => {
      onEvent("USER_ACTIVE");
      if (softIdleTimerRef.current) window.clearTimeout(softIdleTimerRef.current);
      if (deepIdleTimerRef.current) window.clearTimeout(deepIdleTimerRef.current);
      softIdleTimerRef.current = window.setTimeout(() => onEvent("IDLE_SOFT"), 28000);
      deepIdleTimerRef.current = window.setTimeout(() => onEvent("IDLE_DEEP"), 70000);
    };

    const onScroll = () => {
      resetIdleTimers();
      const at = nowMs();
      if (!canTrigger(lastScrollEmitRef.current, 1200, at)) return;
      lastScrollEmitRef.current = at;
      onEvent("SCROLL_PULSE");
    };

    const onPointerMove = (evt: PointerEvent) => {
      resetIdleTimers();
      const prevPointer = lastPointerRef.current;
      lastPointerRef.current = { x: evt.clientX, y: evt.clientY };
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const root = zoneRef.current;
        if (!root) return;
        const rect = root.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = evt.clientX - cx;
        const dy = evt.clientY - cy;
        const distance = Math.hypot(dx, dy);
        const near = distance <= nearRadius;

        if (near && !isNearRef.current) onEvent("POINTER_NEAR");
        if (!near && isNearRef.current) onEvent("POINTER_LEAVE");
        isNearRef.current = near;

        if (near) {
          const at = nowMs();
          const moved = Math.abs(evt.clientX - prevPointer.x) + Math.abs(evt.clientY - prevPointer.y);
          if (moved > 2 && canTrigger(lastMoveEmitRef.current, 580, at)) {
            lastMoveEmitRef.current = at;
            onEvent("POINTER_MOVE");
          }
        }

        setLookOffset({
          x: clamp(dx / 220, -1, 1),
          y: clamp(dy / 220, -1, 1)
        });
      });
    };

    const onPointerDown = () => {
      resetIdleTimers();
      onEvent("POINTER_CLICK");
    };

    const onKeydown = () => resetIdleTimers();
    const onTouchStart = () => resetIdleTimers();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onEvent("FAREWELL");
    };
    const onPageHide = () => onEvent("FAREWELL");

    resetIdleTimers();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("keydown", onKeydown, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (softIdleTimerRef.current) window.clearTimeout(softIdleTimerRef.current);
      if (deepIdleTimerRef.current) window.clearTimeout(deepIdleTimerRef.current);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [zoneRef, onEvent, nearRadius]);

  return lookOffset;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
