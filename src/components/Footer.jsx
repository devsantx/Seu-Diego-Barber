import { motion } from "framer-motion";
import LogoFull from "./LogoFull";
import { WHATSAPP_BASE_URL } from "../data/plans";

// Mantenha sincronizado com NAV_LINKS no Navbar.jsx.
const NAV_LINKS = [
  { label: "Início",       id: "inicio" },
  { label: "Sobre Nós",   id: "sobre" },
  { label: "Planos",      id: "planos" },
  { label: "Agendamento", id: "agendamento" },
  { label: "Equipe",      id: "equipe" },
  { label: "Localização", id: "localizacao" },
  { label: "FAQ",         id: "faq" },
];

// Ajuste horários aqui quando necessário.
const HORARIOS = [
  { dia: "Segunda — Sexta", hora: "09h às 20h", fechado: false },
  { dia: "Sábado",          hora: "09h às 20h", fechado: false },
  { dia: "Domingo",         hora: "Fechado",    fechado: true  },
];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const waLink = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre a Seu Diego Barber.")}`;

  return (
    <footer style={{ background: "#1A1A1A", borderTop: "1px solid rgba(201,162,74,0.1)" }}>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <div className="flex flex-col items-center lg:items-start gap-2 flex-shrink-0 w-full lg:w-[170px] lg:self-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden">
              <LogoFull
                className="w-full h-auto"
                style={{ transform: "scale(1.3) translate(-18%, -18%)", transformOrigin: "top left" }}
              />
            </div>

            <p
              className="text-[11px] leading-relaxed text-center lg:text-left"
              style={{ color: "#4A4A4A", fontFamily: "Raleway, sans-serif" }}
            >
              Estilo, técnica e atendimento personalizado desde 2017.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-[0.16em] px-4 py-2 rounded-sm border transition-all duration-300 mt-1"
              style={{
                borderColor: "rgba(201,162,74,0.3)",
                color: "#C9A24A",
                fontFamily: "Cinzel, serif",
                textDecoration: "none",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,162,74,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              FALE CONOSCO
            </a>
          </div>

          <div
            className="hidden lg:block w-px self-stretch flex-shrink-0"
            style={{ background: "linear-gradient(180deg, transparent, rgba(201,162,74,0.18), transparent)" }}
          />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-center sm:text-left">
            <div className="grid grid-cols-2 gap-6 sm:contents">

            <div>
              <h4
                className="text-[10px] font-bold tracking-[0.22em] mb-4"
                style={{ fontFamily: "Cinzel, serif", color: "#C9A24A" }}
              >
                NAVEGAÇÃO
              </h4>
              <nav className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full sm:w-auto text-[11px] transition-colors duration-200 text-center sm:text-left"
                    style={{ color: "#4A4A4A", fontFamily: "Raleway, sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#C9A24A"}
                    onMouseLeave={e => e.currentTarget.style.color = "#4A4A4A"}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4
                className="text-[10px] font-bold tracking-[0.22em] mb-4"
                style={{ fontFamily: "Cinzel, serif", color: "#C9A24A" }}
              >
                HORÁRIOS
              </h4>
              <div className="space-y-2.5">
                {HORARIOS.map(({ dia, hora, fechado }) => (
                  <div key={dia}>
                    <p className="text-[11px]"
                      style={{ color: "#5A5A5A", fontFamily: "Raleway, sans-serif" }}>
                      {dia}
                    </p>
                    <p className="text-[11px] font-semibold"
                      style={{ color: fechado ? "#3A3A3A" : "#C0C0C0", fontFamily: "Raleway, sans-serif" }}>
                      {hora}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <div>
              <h4
                className="text-[10px] font-bold tracking-[0.22em] mb-4"
                style={{ fontFamily: "Cinzel, serif", color: "#C9A24A" }}
              >
                CONTATO
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px]"
                    style={{ color: "#5A5A5A", fontFamily: "Raleway, sans-serif" }}>
                    WhatsApp
                  </p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] font-semibold transition-colors duration-200"
                    style={{ color: "#C0C0C0", fontFamily: "Raleway, sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#C9A24A"}
                    onMouseLeave={e => e.currentTarget.style.color = "#C0C0C0"}
                  >
                    (81) 98633-3846
                  </a>
                </div>

                <div>
                  <p className="text-[11px]"
                    style={{ color: "#5A5A5A", fontFamily: "Raleway, sans-serif" }}>
                    Instagram
                  </p>
                  <a href="https://instagram.com/seudiegobarber" target="_blank" rel="noopener noreferrer"
                    className="text-[11px] font-semibold transition-colors duration-200"
                    style={{ color: "#C0C0C0", fontFamily: "Raleway, sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#C9A24A"}
                    onMouseLeave={e => e.currentTarget.style.color = "#C0C0C0"}
                  >
                    @seudiegobarber
                  </a>
                </div>

                <div>
                  <p className="text-[11px]"
                    style={{ color: "#5A5A5A", fontFamily: "Raleway, sans-serif" }}>
                    Endereço
                  </p>
                  <p className="text-[11px]"
                    style={{ color: "#C0C0C0", fontFamily: "Raleway, sans-serif", lineHeight: 1.6 }}>
                    R. Córrego do Bartolomeu, 170<br />
                    Morro da Conceição — Recife/PE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(201,162,74,0.06)" }}
      >
        <p className="text-[10px] text-center sm:text-left"
          style={{ color: "#6B6B6B", fontFamily: "Raleway, sans-serif" }}>
          © {new Date().getFullYear()} Seu Diego Barber · Todos os direitos reservados.
        </p>
        <button
          onClick={() => scrollTo("inicio")}
          className="text-[10px] tracking-[0.18em] transition-colors duration-200 flex items-center gap-1.5"
          style={{ color: "#7A7A7A", fontFamily: "Cinzel, serif" }}
          onMouseEnter={e => e.currentTarget.style.color = "#C9A24A"}
          onMouseLeave={e => e.currentTarget.style.color = "#7A7A7A"}
        >
          VOLTAR AO TOPO ↑
        </button>
      </div>
    </footer>
  );
}
