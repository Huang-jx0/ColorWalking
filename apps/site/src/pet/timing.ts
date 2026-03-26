export function nowMs(): number {
  return Date.now();
}

export function randomInRange(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min));
}

export function canTrigger(lastAt: number, cooldownMs: number, at = nowMs()): boolean {
  return at - lastAt >= cooldownMs;
}

