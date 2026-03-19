import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import LogoNavbar from "../LogoNavbar";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

// Navegação principal do portal
const NAV_LINKS = [
  { path: "/portal",           label: "INÍCIO",    end: true  },
  { path: "/portal/agendar",   label: "AGENDAR",   end: false },
  { path: "/portal/historico", label: "HISTÓRICO", end: false },
  { path: "/portal/planos",    label: "SEU PLANO", end: false },
  { path: "/portal/perfil",    label: "PERFIL",    end: false },
];

// Hook para rolar ao topo sempre que a rota mudar
function useScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}

export default function PortalLayout() {
  const { cliente, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollTop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu ao navegar
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Trava scroll quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function sair() { logout(); navigate("/entrar"); }

  const primeiroNome = cliente?.nome?.split(" ")[0]?.toUpperCase() ?? "CLIENTE";

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── NAVBAR FLUTUANTE (mesmo padrão da landing page) ── */}
      <motion.div
        className="fixed top-4 left-0 w-full flex justify-center z-50 px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full max-w-[1100px] h-[68px] flex items-center justify-between px-5 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled ? "rgba(21,21,21,0.98)" : COLORS.dark,
            boxShadow: scrolled
              ? `0 8px 32px ${RGBA.black(0.5)}, 0 0 0 1px ${RGBA.gold(0.15)}`
              : `0 4px 24px ${RGBA.black(0.4)}, 0 0 0 1px ${RGBA.gold(0.1)}`,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Logo */}
          <NavLink to="/portal" className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity">
            <LogoNavbar />
          </NavLink>

          {/* Links centralizados — desktop */}
          <div className="hidden lg:flex items-center gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className="relative text-[10.5px] font-semibold tracking-[0.13em] pb-1 transition-colors duration-200 whitespace-nowrap"
                style={({ isActive }) => ({
                  fontFamily: FONTS.body,
                  color: isActive ? COLORS.gold : COLORS.textBody,
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="portal-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: GRADIENTS.goldIntroBar }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Botão SAIR — desktop */}
          <button
            onClick={sair}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-[10.5px] font-bold tracking-[0.14em] transition-all duration-300 rounded-sm"
            style={{ border: `1px solid ${RGBA.gold(0.35)}`, color: COLORS.gold, fontFamily: FONTS.title }}
            onMouseEnter={e => e.currentTarget.style.background = RGBA.gold(0.08)}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            SAIR →
          </button>

          {/* Hambúrguer — mobile */}
          <button
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full flex-col gap-[5px]"
            style={{ background: RGBA.gold(0.1) }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span key={i} className="block w-5 h-[2px] origin-center" style={{ background: COLORS.gold }}
                animate={{
                  rotate:  menuOpen ? (i===0?45:i===2?-45:0) : 0,
                  y:       menuOpen ? (i===0?7:i===2?-7:0) : 0,
                  opacity: menuOpen && i===1 ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.div>

      {/* ── DROPDOWN MOBILE ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed z-40 left-0 w-full flex justify-center px-4"
            style={{ top: "88px" }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="w-full max-w-[1100px] rounded-2xl overflow-hidden"
              style={{
                background: "rgba(18,18,18,0.98)",
                boxShadow: `0 12px 40px ${RGBA.black(0.6)}, 0 0 0 1px ${RGBA.gold(0.12)}`,
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Saudação */}
              <div className="px-6 pt-4 pb-2 border-b" style={{ borderColor: RGBA.gold(0.07) }}>
                <p className="text-[10px] tracking-widest" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                  BEM-VINDO,
                </p>
                <p className="text-sm font-bold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
                  {primeiroNome}
                </p>
                {cliente?.plano?.ativo && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold tracking-widest"
                    style={{ background: RGBA.gold(0.12), color: COLORS.gold, fontFamily: FONTS.title }}>
                    {cliente.plano.nome.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="px-6 pt-3 pb-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive = link.end
                    ? location.pathname === link.path
                    : location.pathname.startsWith(link.path);
                  return (
                    <motion.div key={link.path}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <NavLink
                        to={link.path}
                        end={link.end}
                        className="flex items-center justify-between py-3 text-[11px] font-semibold tracking-[0.15em] border-b"
                        style={{ borderColor: RGBA.gold(0.07), fontFamily: FONTS.body, color: isActive ? COLORS.gold : COLORS.textBody }}
                      >
                        {link.label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLORS.gold }} />}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Sair */}
              <div className="px-4 pb-4 pt-2">
                <button onClick={sair}
                  className="w-full py-3 text-[11px] font-bold tracking-[0.18em] rounded-sm border transition-all"
                  style={{ borderColor: RGBA.gold(0.3), color: COLORS.gold, fontFamily: FONTS.title }}
                  onMouseEnter={e => e.currentTarget.style.background = RGBA.gold(0.07)}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  SAIR DO PORTAL →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo — com padding para a navbar flutuante */}
      <main className="flex-1 pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
