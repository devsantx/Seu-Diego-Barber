import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Theme = "dark" | "light";
interface ThemeContextValue { theme: Theme; toggle: () => void; isDark: boolean; }
const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {}, isDark: true });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("sdb_theme");
    // Detecta preferência do sistema operacional
    if (!saved) return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    return (saved as Theme) ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sdb_theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }
