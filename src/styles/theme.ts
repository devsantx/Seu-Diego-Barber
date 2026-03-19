const RGB = {
  gold: "201,162,74",
  white: "255,255,255",
  black: "0,0,0",
  green: "107,196,107",
  red: "255,107,107",
};

const rgba = (rgb: string, alpha: number) => `rgba(${rgb},${alpha})`;

export const COLORS = {
  gold: "#C9A24A",
  goldDark: "#8E6B2C",
  goldDeep: "#59431F",
  goldLight: "#EAD38F",
  textLight: "#E5E5E5",
  textBody: "#D9D9D9",
  textMuted: "#9A9A9A",
  textMutedDark: "#5A5A5A",
  textMutedDarker: "#4A4A4A",
  textMutedDeep: "#2F2F2F",
  textMutedDarkest: "#2A2A2A",
  textMutedNearBlack: "#272727",
  textMutedAlmostBlack: "#242424",
  textMutedSoft: "#6A6A6A",
  textMutedSoft2: "#6B6B6B",
  textMutedSoft3: "#7A7A7A",
  textPanel: "#C0C0C0",
  textDisabled: "#3A3A3A",
  dark: "#151515",
  darkest: "#050505",
  darkBg: "#1A1A1A",
  accentGreen: "#6bc46b",
  accentGreenDark: "#051505",
  accentRed: "#ff6b6b",
};

export const FONTS = {
  title: "Cinzel, serif",
  body: "Raleway, sans-serif",
};

export const RGBA = {
  gold: (alpha: number) => rgba(RGB.gold, alpha),
  white: (alpha: number) => rgba(RGB.white, alpha),
  black: (alpha: number) => rgba(RGB.black, alpha),
  green: (alpha: number) => rgba(RGB.green, alpha),
  red: (alpha: number) => rgba(RGB.red, alpha),
};

export const GRADIENTS = {
  goldLineHorizontal: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
  goldLineVertical: `linear-gradient(180deg, transparent, ${COLORS.gold}, transparent)`,
  goldFill: `linear-gradient(135deg, ${COLORS.goldDark}, ${COLORS.gold})`,
  goldFillHover: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
  goldRail: `linear-gradient(90deg, ${COLORS.goldDeep}, ${COLORS.gold}, ${COLORS.goldLight})`,
  goldIntroBar: `linear-gradient(90deg, ${COLORS.goldDark}, ${COLORS.goldLight})`,
  goldScroll: `linear-gradient(180deg, ${COLORS.gold}, transparent)`,
  heroRadial: `radial-gradient(circle, ${RGBA.gold(0.05)} 0%, transparent 70%)`,
};
