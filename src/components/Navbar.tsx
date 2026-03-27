import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LogoNavbar from "./LogoNavbar";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../styles/theme";

const NAV_LINKS = [
  { label: "INICIO", id: "inicio" },
  { label: "SOBRE NOS", id: "sobre" },
  { label: "PLANOS", id: "planos" },
  { label: "AGENDAMENTO", id: "agendamento" },
  { label: "EQUIPE", id: "equipe" },
  { label: "LOCALIZACAO", id: "localizacao" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar() {
  const { cliente } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 130;

      for (let i = NAV_LINKS.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && y >= el.offsetTop) {
          setActive(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const entrarNoPortal = () => {
    setMenuOpen(false);
    navigate("/entrar");
  };

  const abrirAgendamento = () => {
    setMenuOpen(false);
    navigate(cliente ? "/portal/agendar" : "/entrar");
  };

  return (
    <>
      <motion.div
        className="fixed top-4 left-0 w-full flex justify-center items-center z-50 px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full max-w-[1100px] h-[68px] flex items-center justify-between px-5 radius-panel transition-all duration-300"
          style={{
            background: scrolled ? "color-mix(in srgb, var(--bg-navbar) 92%, transparent)" : "var(--bg-navbar)",
            boxShadow: scrolled
              ? `0 8px 32px ${RGBA.black(0.5)}, 0 0 0 1px ${RGBA.gold(0.15)}`
              : `0 4px 24px ${RGBA.black(0.4)}, 0 0 0 1px ${RGBA.gold(0.1)}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <button onClick={() => scrollTo("inicio")} className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity">
            <LogoNavbar />
          </button>

          <div className="hidden lg:flex items-center justify-center gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-[10.5px] font-semibold tracking-[0.13em] pb-1 transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: FONTS.body, color: active === link.id ? COLORS.gold : "var(--text-body)" }}
              >
                {link.label}
                {active === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: GRADIENTS.goldIntroBar }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <ThemeToggle compact />
            <button
              onClick={entrarNoPortal}
              className="px-5 py-[8px] text-[10.5px] font-bold tracking-[0.14em] radius-control transition-all duration-300"
              style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              ENTRAR
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle iconOnly />
            <button
              className="relative flex items-center justify-center w-10 h-10 rounded-full z-10 flex-col gap-[5px]"
              style={{ background: RGBA.gold(0.1) }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="block w-5 h-[2px] origin-center"
                  style={{ background: COLORS.gold }}
                  animate={{
                    rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed z-40 left-0 w-full flex justify-center px-4"
            style={{ top: "88px" }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="w-full max-w-[1100px] radius-panel overflow-hidden"
              style={{
                background: "color-mix(in srgb, var(--bg-card) 96%, transparent)",
                boxShadow: `0 12px 40px ${RGBA.black(0.35)}, 0 0 0 1px ${RGBA.gold(0.12)}`,
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-6 pt-5 pb-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="flex w-full items-center justify-between py-3 text-[11px] font-semibold tracking-[0.15em] border-b"
                    style={{ color: active === link.id ? COLORS.gold : "var(--text-body)", borderColor: RGBA.gold(0.07), fontFamily: FONTS.body }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {link.label}
                    {active === link.id && <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.gold }} />}
                  </motion.button>
                ))}
              </div>

              <div className="mx-4 mt-3 mb-2 radius-card overflow-hidden" style={{ border: `1px solid ${RGBA.gold(0.18)}` }}>
                <div className="px-4 py-2.5" style={{ background: RGBA.gold(0.06), borderBottom: `1px solid ${RGBA.gold(0.1)}` }}>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-center" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
                    PORTAL DE AGENDAMENTO
                  </p>
                </div>
                <button
                  onClick={abrirAgendamento}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                  style={{ borderBottom: `1px solid ${RGBA.gold(0.07)}` }}
                >
                  <span className="text-base">📆</span>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.body }}>
                      {cliente ? "Abrir meus agendamentos" : "Entrar para agendar"}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                      Escolha dia, horario, servico e barbeiro
                    </p>
                  </div>
                  <span className="ml-auto text-[12px]" style={{ color: COLORS.gold }}>›</span>
                </button>
                <button onClick={() => scrollTo("agendamento")} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
                  <span className="text-base">📋</span>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                      Como funciona o agendamento?
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                      Regras, prioridades e horarios
                    </p>
                  </div>
                  <span className="ml-auto text-[12px]" style={{ color: "var(--text-disabled)" }}>›</span>
                </button>
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={entrarNoPortal}
                  className="w-full py-3 text-[11px] font-bold tracking-[0.18em]"
                  style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}
                >
                  ENTRAR PARA AGENDAR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
