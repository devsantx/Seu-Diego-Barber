import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoNavbar from "./LogoNavbar";
import { WHATSAPP_BASE_URL } from "../data/plans";

const NAV_LINKS = [
  { label: "INÍCIO",       id: "inicio" },
  { label: "SOBRE NÓS",   id: "sobre" },
  { label: "PLANOS",      id: "planos" },
  { label: "AGENDAMENTO", id: "agendamento" },
  { label: "EQUIPE",      id: "equipe" },
  { label: "LOCALIZAÇÃO", id: "localizacao" },
  { label: "FAQ",         id: "faq" },
];

const WA_SCHEDULE_MSG = encodeURIComponent(
`Olá, Seu Diego Barber! Gostaria de agendar um horário. 🗓️

*Barbeiro:* (ex: Diego, Erick, Mikael ou André)
*Data:* (ex: Segunda, 10/03 — funciona Seg a Sáb)
*Horário:* (ex: 14h)
*Serviço:* (ex: Corte / Corte + Barba / Corte + Bigode e Sobrancelha)
*Plano ativo:* (Sim — [nome do plano] / Não)

Aguardo confirmação! 😊`
);

export default function Navbar() {
  const [active, setActive]           = useState("inicio");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [agendaPopup, setAgendaPopup] = useState(false);
  const popupRef = useRef(null);

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
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setAgendaPopup(false);
      }
    };
    if (agendaPopup) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [agendaPopup]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setAgendaPopup(false);
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
            background: scrolled ? "rgba(21,21,21,0.98)" : "#151515",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,74,0.15)"
              : "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,162,74,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <button
            onClick={() => scrollTo("inicio")}
            className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            <LogoNavbar />
          </button>

          <div className="hidden lg:flex items-center justify-center gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-[10.5px] font-semibold tracking-[0.13em] pb-1 transition-colors duration-200 whitespace-nowrap"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  color: active === link.id ? "#C9A24A" : "#D9D9D9",
                }}
              >
                {link.label}
                {active === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #8E6B2C, #EAD38F)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center flex-shrink-0" ref={popupRef}>
            <div className="relative">
              <button
                onClick={() => setAgendaPopup(!agendaPopup)}
                className="px-4 py-[8px] text-[10.5px] font-bold tracking-[0.14em] rounded-sm border transition-all duration-300 flex items-center gap-2"
                style={{
                  borderColor: agendaPopup ? "#EAD38F" : "#C9A24A",
                  color: agendaPopup ? "#EAD38F" : "#C9A24A",
                  fontFamily: "Cinzel, serif",
                  background: agendaPopup ? "rgba(201,162,74,0.08)" : "transparent",
                }}
              >
                AGENDAR
                <motion.span
                  animate={{ rotate: agendaPopup ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[8px] leading-none"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {agendaPopup && (
                  <motion.div
                    className="absolute right-0 mt-3 w-64 rounded-xl overflow-hidden z-[100]"
                    style={{
                      background: "linear-gradient(160deg, #1e1e1e, #111)",
                      border: "1px solid rgba(201,162,74,0.25)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,162,74,0.06)",
                    }}
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #59431F, #C9A24A, #EAD38F)" }} />
                    <div className="p-4">
                      <p className="text-[10px] font-semibold tracking-[0.18em] mb-4 text-center"
                        style={{ color: "#8E6B2C", fontFamily: "Cinzel, serif" }}>
                        O QUE DESEJA FAZER?
                      </p>

                      <button
                        onClick={() => scrollTo("agendamento")}
                        className="w-full flex items-start gap-3 p-3 rounded-lg mb-2 text-left transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(201,162,74,0.07)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                      >
                        <span className="text-base flex-shrink-0 mt-0.5">📋</span>
                        <div>
                          <p className="text-[11px] font-semibold"
                            style={{ color: "#E5E5E5", fontFamily: "Raleway, sans-serif" }}>
                            Entender como funciona
                          </p>
                          <p className="text-[10px] mt-0.5"
                            style={{ color: "#6A6A6A", fontFamily: "Raleway, sans-serif" }}>
                            Ver regras, prioridades e horários
                          </p>
                        </div>
                      </button>

                      <div className="h-px my-2" style={{ background: "rgba(201,162,74,0.08)" }} />

                      <a
                        href={`${WHATSAPP_BASE_URL}?text=${WA_SCHEDULE_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200"
                        style={{ background: "rgba(201,162,74,0.06)", textDecoration: "none" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(201,162,74,0.12)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(201,162,74,0.06)"}
                        onClick={() => setAgendaPopup(false)}
                      >
                        <span className="text-base flex-shrink-0 mt-0.5">📲</span>
                        <div>
                          <p className="text-[11px] font-semibold"
                            style={{ color: "#C9A24A", fontFamily: "Raleway, sans-serif" }}>
                            Agendar agora
                          </p>
                          <p className="text-[10px] mt-0.5"
                            style={{ color: "#6A6A6A", fontFamily: "Raleway, sans-serif" }}>
                            Ir direto ao WhatsApp da barbearia
                          </p>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full z-10 flex-col gap-[5px]"
            style={{ background: "rgba(201,162,74,0.1)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-5 h-[2px] origin-center"
                style={{ background: "#C9A24A" }}
                animate={{
                  rotate:  menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y:       menuOpen ? (i === 0 ? 7  : i === 2 ? -7  : 0) : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
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
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="w-full max-w-[1100px] rounded-2xl overflow-hidden"
              style={{
                background: "rgba(18,18,18,0.98)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,162,74,0.12)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-6 pt-5 pb-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="flex w-full items-center justify-between py-3 text-[11px] font-semibold tracking-[0.15em] border-b"
                    style={{
                      color: active === link.id ? "#C9A24A" : "#D9D9D9",
                      borderColor: "rgba(201,162,74,0.07)",
                      fontFamily: "Raleway, sans-serif",
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {link.label}
                    {active === link.id && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C9A24A" }} />
                    )}
                  </motion.button>
                ))}
              </div>

              <div
                className="mx-4 my-4 rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(201,162,74,0.18)" }}
              >
                <div
                  className="px-4 py-2.5"
                  style={{ background: "rgba(201,162,74,0.06)", borderBottom: "1px solid rgba(201,162,74,0.1)" }}
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] text-center"
                    style={{ color: "#8E6B2C", fontFamily: "Cinzel, serif" }}>
                    ✂️ AGENDAR HORÁRIO
                  </p>
                </div>

                <button
                  onClick={() => scrollTo("agendamento")}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200"
                  style={{ borderBottom: "1px solid rgba(201,162,74,0.07)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(201,162,74,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span className="text-base flex-shrink-0">📋</span>
                  <div>
                    <p className="text-[11px] font-semibold"
                      style={{ color: "#E5E5E5", fontFamily: "Raleway, sans-serif" }}>
                      Como funciona o agendamento?
                    </p>
                    <p className="text-[10px]" style={{ color: "#5A5A5A", fontFamily: "Raleway, sans-serif" }}>
                      Regras, prioridades e dias disponíveis
                    </p>
                  </div>
                  <span className="ml-auto text-[12px]" style={{ color: "#3A3A3A" }}>›</span>
                </button>

                <a
                  href={`${WHATSAPP_BASE_URL}?text=${WA_SCHEDULE_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200"
                  style={{ textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(201,162,74,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-base flex-shrink-0">📲</span>
                  <div>
                    <p className="text-[11px] font-semibold"
                      style={{ color: "#C9A24A", fontFamily: "Raleway, sans-serif" }}>
                      Quero agendar agora
                    </p>
                    <p className="text-[10px]" style={{ color: "#5A5A5A", fontFamily: "Raleway, sans-serif" }}>
                      Abre o WhatsApp da barbearia
                    </p>
                  </div>
                  <span className="ml-auto text-[12px]" style={{ color: "#C9A24A" }}>›</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
