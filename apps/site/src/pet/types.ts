export type PetPresenceState =
  | "enter"
  | "idle"
  | "notice"
  | "curious"
  | "happy"
  | "comfort"
  | "sleepy"
  | "farewell";

export type PetPresenceEvent =
  | "BOOT"
  | "ENTER_DONE"
  | "POINTER_NEAR"
  | "POINTER_MOVE"
  | "POINTER_LEAVE"
  | "POINTER_CLICK"
  | "DRAW_PENDING"
  | "DRAW_SUCCESS"
  | "IDLE_SOFT"
  | "IDLE_DEEP"
  | "USER_ACTIVE"
  | "SCROLL_PULSE"
  | "FAREWELL"
  | "STATE_TIMEOUT";

export type MessageBucket =
  | "enterMessages"
  | "noticeMessages"
  | "curiousMessages"
  | "clickMessages"
  | "happyMessages"
  | "comfortMessages"
  | "sleepyMessages"
  | "luckyColorMessages"
  | "repeatVisitMessages"
  | "farewellMessages";
