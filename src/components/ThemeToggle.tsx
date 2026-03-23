import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

// Botão de alternância dark/light — pode ser inserido em qualquer navbar
export default function ThemeToggle({
  compact = false,
  iconOnly = false,
}: {
  compact?: boolean;
  iconOnly?: boolean;
}) {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className="flex items-center gap-1.5 transition-all duration-200"
      style={{
        padding: iconOnly ? "8px" : compact ? "6px 10px" : "8px 14px",
        borderRadius: "999px",
        minWidth: iconOnly ? "40px" : undefined,
        minHeight: "40px",
        justifyContent: "center",
        border: `1px solid rgba(201,162,74,${isDark ? 0.25 : 0.4})`,
        background: isDark ? "rgba(201,162,74,0.07)" : "rgba(201,162,74,0.12)",
        color: "#C9A24A",
        fontFamily: "Cinzel, serif",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        cursor: "pointer",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(201,162,74,0.18)"}
      onMouseLeave={e => e.currentTarget.style.background = isDark ? "rgba(201,162,74,0.07)" : "rgba(201,162,74,0.12)"}
      >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ fontSize: "13px", lineHeight: 1 }}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.span>
      {!compact && !iconOnly && (
        <span>{isDark ? "MODO CLARO" : "MODO ESCURO"}</span>
      )}
    </button>
  );
}
