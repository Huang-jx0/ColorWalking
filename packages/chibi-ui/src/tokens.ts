export const CHIBI_THEME = {
  color: {
    pageBg: "#F7F7FC",
    cardBg: "#FFFFFF",
    cardBorder: "#E8ECF8",
    primary: "#2F4B8A",
    primarySoft: "#4D80E8",
    textStrong: "#233457",
    textNormal: "#425472",
    textSoft: "#6E7FA1",
    bubbleBg: "#FBFDFF",
    bubbleBorder: "#DEE8FA",
    petCream: "#FFF9F3",
    petBlue: "#8FC4FF",
    petPink: "#F7B8C8",
    petTag: "#78C888"
  },
  radius: {
    card: 18,
    pill: 14,
    button: 10,
    avatar: 24
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16
  }
} as const;

export const CHIBI_CARD_STYLE = {
  borderRadius: CHIBI_THEME.radius.card,
  backgroundColor: CHIBI_THEME.color.cardBg,
  borderWidth: 1,
  borderColor: CHIBI_THEME.color.cardBorder,
  padding: CHIBI_THEME.spacing.lg
} as const;

export const CHIBI_PILL_STYLE = {
  borderRadius: CHIBI_THEME.radius.pill,
  borderWidth: 1,
  borderColor: "#D5DEEE",
  backgroundColor: "#FFFFFF",
  paddingVertical: 9,
  paddingHorizontal: 14
} as const;

export const CHIBI_PET_PARTS = {
  shellBorder: "#F0E3D8",
  headBorder: "#ECE3D8",
  earOuter: "#F5EDE0",
  eye: "#2A3A62",
  nose: "#2A3A62"
} as const;

export function makeChibiCard(overrides?: Record<string, unknown>) {
  return {
    ...CHIBI_CARD_STYLE,
    ...(overrides ?? {})
  };
}
