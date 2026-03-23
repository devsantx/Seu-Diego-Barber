// ============================================================
// DESIGN TOKENS — cores, fontes e gradientes centralizados.
// Para temas light/dark, use as variáveis CSS de index.css.
// ============================================================
const RGB = {
  gold: "201,162,74",
  white: "255,255,255",
  black: "0,0,0",
  green: "107,196,107",
  red: "255,107,107",
};

const rgba = (rgb: string, alpha: number) => `rgba(${rgb},${alpha})`;

export const COLORS = {
  // Dourado
  gold: "#C9A24A",
  goldDark: "#7A541A",
  goldDeep: "#5C3E0E",
  goldLight: "#EAD38F",
  // Textos (tema dark — para light usar variáveis CSS)
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
  // Backgrounds
  dark: "#151515",
  darkest: "#050505",
  darkBg: "#1A1A1A",
  // Acentos
  accentGreen: "#6bc46b",
  accentGreenDark: "#051505",
  accentRed: "#ff6b6b",
};

export const FONTS = {
  title: "Cinzel, serif",
  body: "Raleway, sans-serif",
};

export const RGBA = {
  gold:  (a: number) => rgba(RGB.gold, a),
  white: (a: number) => rgba(RGB.white, a),
  black: (a: number) => rgba(RGB.black, a),
  green: (a: number) => rgba(RGB.green, a),
  red:   (a: number) => rgba(RGB.red, a),
};

export const GRADIENTS = {
  goldLineHorizontal: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
  goldLineVertical:   `linear-gradient(180deg, transparent, ${COLORS.gold}, transparent)`,
  goldFill:      `linear-gradient(135deg, ${COLORS.goldDark}, ${COLORS.gold})`,
  goldFillHover: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
  goldRail:      `linear-gradient(90deg, ${COLORS.goldDeep}, ${COLORS.gold}, ${COLORS.goldLight})`,
  goldIntroBar:  `linear-gradient(90deg, ${COLORS.goldDark}, ${COLORS.goldLight})`,
  goldScroll:    `linear-gradient(180deg, ${COLORS.gold}, transparent)`,
  heroRadial:    `radial-gradient(circle, ${rgba(RGB.gold, 0.05)} 0%, transparent 70%)`,
};
