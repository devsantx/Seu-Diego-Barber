import { motion } from "framer-motion";
import LogoFull from "./LogoFull";
import { WHATSAPP_BASE_URL } from "../data/plans";
import { WA_MESSAGES } from "../data/whatsapp";
import { COLORS, FONTS, RGBA } from "../styles/theme";

// Atualize estes arrays junto com Navbar e Location quando mudar navegacao ou horario.
const NAV_LINKS = [
  { label: "Inicio", id: "inicio" },
  { label: "Sobre Nos", id: "sobre" },
  { label: "Planos", id: "planos" },
  { label: "Agendamento", id: "agendamento" },
  { label: "Equipe", id: "equipe" },
  { label: "Localizacao", id: "localizacao" },
  { label: "FAQ", id: "faq" },
];

const HORARIOS = [
  { dia: "Segunda - Sexta", hora: "09h as 20h", fechado: false },
  { dia: "Sabado", hora: "09h as 20h", fechado: false },
  { dia: "Domingo", hora: "Fechado", fechado: true },
];

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const waLink = `${WHATSAPP_BASE_URL}?text=${WA_MESSAGES.info}`;

  return (
    <footer style={{ background: COLORS.darkBg, borderTop: `1px solid ${RGBA.gold(0.1)}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex flex-col items-center lg:items-start gap-2 flex-shrink-0 w-full lg:w-[170px] lg:self-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden">
              <LogoFull className="w-full h-auto" style={{ transform: "scale(1.3) translate(-18%, -18%)", transformOrigin: "top left" }} />
            </div>

            <p className="text-[11px] leading-relaxed text-center lg:text-left" style={{ color: COLORS.textMutedDarker, fontFamily: FONTS.body }}>
              Estilo, tecnica e atendimento personalizado desde 2017.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-[0.16em] px-4 py-2 rounded-sm border transition-all duration-300 mt-1"
              style={{ borderColor: RGBA.gold(0.3), color: COLORS.gold, fontFamily: FONTS.title, textDecoration: "none" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = RGBA.gold(0.08);
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              FALE CONOSCO
            </a>
          </div>

          <div className="hidden lg:block w-px self-stretch flex-shrink-0" style={{ background: `linear-gradient(180deg, transparent, ${RGBA.gold(0.18)}, transparent)` }} />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-center sm:text-left">
            <div className="grid grid-cols-2 gap-6 sm:contents">
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.22em] mb-4" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>
                  NAVEGACAO
                </h4>
                <nav className="space-y-2.5">
                  {NAV_LINKS.map(link => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="block w-full sm:w-auto text-[11px] transition-colors duration-200 text-center sm:text-left"
                      style={{ color: COLORS.textMutedDarker, fontFamily: FONTS.body }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = COLORS.gold;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = COLORS.textMutedDarker;
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.22em] mb-4" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>
                  HORARIOS
                </h4>
                <div className="space-y-2.5">
                  {HORARIOS.map(({ dia, hora, fechado }) => (
                    <div key={dia}>
                      <p className="text-[11px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                        {dia}
                      </p>
                      <p className="text-[11px] font-semibold" style={{ color: fechado ? COLORS.textDisabled : COLORS.textPanel, fontFamily: FONTS.body }}>
                        {hora}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.22em] mb-4" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>
                CONTATO
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                    WhatsApp
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold transition-colors duration-200"
                    style={{ color: COLORS.textPanel, fontFamily: FONTS.body }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = COLORS.gold;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = COLORS.textPanel;
                    }}
                  >
                    (81) 98633-3846
                  </a>
                </div>

                <div>
                  <p className="text-[11px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/seudiegobarber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold transition-colors duration-200"
                    style={{ color: COLORS.textPanel, fontFamily: FONTS.body }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = COLORS.gold;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = COLORS.textPanel;
                    }}
                  >
                    @seudiegobarber
                  </a>
                </div>

                <div>
                  <p className="text-[11px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                    Endereco
                  </p>
                  <p className="text-[11px]" style={{ color: COLORS.textPanel, fontFamily: FONTS.body, lineHeight: 1.6 }}>
                    R. Corrego do Bartolomeu, 170
                    <br />
                    Morro da Conceicao - Recife/PE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: `1px solid ${RGBA.gold(0.06)}` }}>
        <p className="text-[10px] text-center sm:text-left" style={{ color: COLORS.textMutedSoft2, fontFamily: FONTS.body }}>
          © {new Date().getFullYear()} Seu Diego Barber · Todos os direitos reservados.
        </p>
        <button
          onClick={() => scrollTo("inicio")}
          className="text-[10px] tracking-[0.18em] transition-colors duration-200 flex items-center gap-1.5"
          style={{ color: COLORS.textMutedSoft3, fontFamily: FONTS.title }}
          onMouseEnter={e => {
            e.currentTarget.style.color = COLORS.gold;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = COLORS.textMutedSoft3;
          }}
        >
          VOLTAR AO TOPO ↑
        </button>
      </div>
    </footer>
  );
}
