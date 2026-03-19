// Navbar da landing page — igual à versão atual do usuário,
// com o botão ENTRAR redirecionando para /entrar (portal de login).

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LogoNavbar from "./LogoNavbar";
import { WHATSAPP_BASE_URL } from "../data/plans";
import { WA_MESSAGES } from "../data/whatsapp";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../styles/theme";

const NAV_LINKS = [
  { label: "INÍCIO",       id: "inicio" },
  { label: "SOBRE NÓS",   id: "sobre" },
  { label: "PLANOS",      id: "planos" },
  { label: "AGENDAMENTO", id: "agendamento" },
  { label: "EQUIPE",      id: "equipe" },
  { label: "LOCALIZAÇÃO", id: "localizacao" },
  { label: "FAQ",         id: "faq" },
];

export default function Navbar() {
  const [active, setActive]           = useState("inicio");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [agendaPopup, setAgendaPopup] = useState(false);
  const popupRef  = useRef<HTMLDivElement | null>(null);
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 130;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && y >= el.offsetTop) { setActive(NAV_LINKS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (popupRef.current && target && !popupRef.current.contains(target)) setAgendaPopup(false);
    };
    if (agendaPopup) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [agendaPopup]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); setAgendaPopup(false);
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
          <button onClick={() => scrollTo("inicio")} className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity">
            <LogoNavbar />
          </button>

          {/* Desktop nav centralizado */}
          <div className="hidden lg:flex items-center justify-center gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-[10.5px] font-semibold tracking-[0.13em] pb-1 transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: FONTS.body, color: active === link.id ? COLORS.gold : COLORS.textBody }}
              >
                {link.label}
                {active === link.id && (
                  <motion.div layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: GRADIENTS.goldIntroBar }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop: AGENDAR popup + ENTRAR */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Popup de agendamento */}
            <div className="relative" ref={popupRef}>
              <button
                onClick={() => setAgendaPopup(!agendaPopup)}
                className="px-4 py-[8px] text-[10.5px] font-bold tracking-[0.14em] rounded-sm border transition-all duration-300 flex items-center gap-2"
                style={{
                  borderColor: agendaPopup ? COLORS.goldLight : COLORS.gold,
                  color: agendaPopup ? COLORS.goldLight : COLORS.gold,
                  fontFamily: FONTS.title,
                  background: agendaPopup ? RGBA.gold(0.08) : "transparent",
                }}
              >
                AGENDAR
                <motion.span animate={{ rotate: agendaPopup ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-[8px] leading-none">▼</motion.span>
              </button>

              <AnimatePresence>
                {agendaPopup && (
                  <motion.div
                    className="absolute right-0 mt-3 w-64 rounded-xl overflow-hidden z-[100]"
                    style={{
                      background: "linear-gradient(160deg, #1e1e1e, #111)",
                      border: `1px solid ${RGBA.gold(0.25)}`,
                      boxShadow: `0 16px 48px ${RGBA.black(0.7)}`,
                    }}
                    initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.18 }}
                  >
                    <div className="h-[2px]" style={{ background: GRADIENTS.goldRail }} />
                    <div className="p-4">
                      <p
                        className="text-[10px] font-semibold tracking-[0.18em] mb-4 text-center"
                        style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}
                      >
                        O QUE DESEJA FAZER?
                      </p>
                      <button onClick={() => scrollTo("agendamento")} className="w-full flex items-start gap-3 p-3 rounded-lg mb-2 text-left transition-all"
                        style={{ background: RGBA.white(0.03) }}
                        onMouseEnter={e => e.currentTarget.style.background = RGBA.gold(0.07)}
                        onMouseLeave={e => e.currentTarget.style.background = RGBA.white(0.03)}>
                        <span className="text-base flex-shrink-0">📋</span>
                        <div>
                          <p className="text-[11px] font-semibold" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>Entender como funciona</p>
                          <p className="text-[10px]" style={{ color: COLORS.textMutedSoft, fontFamily: FONTS.body }}>Ver regras, prioridades e horários</p>
                        </div>
                      </button>
                      <div className="h-px my-2" style={{ background: RGBA.gold(0.08) }} />
                      <a href={`${WHATSAPP_BASE_URL}?text=${WA_MESSAGES.schedule}`} target="_blank" rel="noopener noreferrer"
                        className="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all"
                        style={{ background: RGBA.gold(0.06), textDecoration: "none" }}
                        onMouseEnter={e => e.currentTarget.style.background = RGBA.gold(0.12)}
                        onMouseLeave={e => e.currentTarget.style.background = RGBA.gold(0.06)}
                        onClick={() => setAgendaPopup(false)}>
                        <span className="text-base flex-shrink-0">📲</span>
                        <div>
                          <p className="text-[11px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.body }}>Agendar agora</p>
                          <p className="text-[10px]" style={{ color: COLORS.textMutedSoft, fontFamily: FONTS.body }}>Ir direto ao WhatsApp</p>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botão ENTRAR — vai para o portal de login */}
            <button
              onClick={() => navigate("/entrar")}
              className="px-5 py-[8px] text-[10.5px] font-bold tracking-[0.14em] rounded-sm transition-all duration-300"
              style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              ENTRAR
            </button>
          </div>

          {/* Hambúrguer mobile */}
          <button className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full z-10 flex-col gap-[5px]"
            style={{ background: RGBA.gold(0.1) }} onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="block w-5 h-[2px] origin-center" style={{ background: COLORS.gold }}
                animate={{ rotate: menuOpen ? (i===0?45:i===2?-45:0):0, y: menuOpen?(i===0?7:i===2?-7:0):0, opacity: menuOpen&&i===1?0:1 }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.div>

      {/* Menu mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed z-40 left-0 w-full flex justify-center px-4" style={{ top: "88px" }}
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="w-full max-w-[1100px] rounded-2xl overflow-hidden"
              style={{
                background: "rgba(18,18,18,0.98)",
                boxShadow: `0 12px 40px ${RGBA.black(0.6)}, 0 0 0 1px ${RGBA.gold(0.12)}`,
                backdropFilter: "blur(16px)",
              }}>
              <div className="px-6 pt-5 pb-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button key={link.id} onClick={() => scrollTo(link.id)}
                    className="flex w-full items-center justify-between py-3 text-[11px] font-semibold tracking-[0.15em] border-b"
                    style={{
                      color: active===link.id ? COLORS.gold : COLORS.textBody,
                      borderColor: RGBA.gold(0.07),
                      fontFamily: FONTS.body,
                    }}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    {link.label}
                    {active === link.id && <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.gold }} />}
                  </motion.button>
                ))}
              </div>
              <div className="mx-4 my-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${RGBA.gold(0.18)}` }}>
                <div className="px-4 py-2.5" style={{ background: RGBA.gold(0.06), borderBottom: `1px solid ${RGBA.gold(0.1)}` }}>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-center" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>✂️ AGENDAR HORÁRIO</p>
                </div>
                <button onClick={() => scrollTo("agendamento")} className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                  style={{ borderBottom: `1px solid ${RGBA.gold(0.07)}` }}
                  onMouseEnter={e => e.currentTarget.style.background = RGBA.gold(0.04)}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <span className="text-base">📋</span>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>Como funciona o agendamento?</p>
                    <p className="text-[10px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>Regras, prioridades e dias disponíveis</p>
                  </div>
                  <span className="ml-auto text-[12px]" style={{ color: COLORS.textDisabled }}>›</span>
                </button>
                <a href={`${WHATSAPP_BASE_URL}?text=${WA_MESSAGES.schedule}`} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left" style={{ textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = RGBA.gold(0.06)}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}
                  onClick={() => setMenuOpen(false)}>
                  <span className="text-base">📲</span>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.body }}>Quero agendar agora</p>
                    <p className="text-[10px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>Abre o WhatsApp da barbearia</p>
                  </div>
                  <span className="ml-auto text-[12px]" style={{ color: COLORS.gold }}>›</span>
                </a>
              </div>
              {/* Entrar no mobile */}
              <div className="px-4 pb-4">
                <button onClick={() => { navigate("/entrar"); setMenuOpen(false); }}
                  className="w-full py-3 text-[11px] font-bold tracking-[0.18em]"
                  style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}>
                  ENTRAR NO PORTAL
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
