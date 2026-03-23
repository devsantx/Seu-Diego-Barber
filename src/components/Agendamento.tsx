import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { WHATSAPP_BASE_URL } from "../data/plans";
import { WA_MESSAGES } from "../data/whatsapp";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../styles/theme";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

const STEP_ITEMS = [
  { num: "1", title: "Acesse sua conta", desc: "Entre na sua area do cliente pelo botao Entrar. Se nao tiver cadastro, criar e rapido e gratuito." },
  { num: "2", title: "Escolha o dia e horario", desc: "No calendario online veja os dias disponiveis conforme o seu plano e escolha o horario que melhor encaixa na sua rotina." },
  { num: "3", title: "Confirme o agendamento", desc: "Apos confirmar, a barbearia recebe o pedido pelo WhatsApp e voce acompanha tudo de forma mais pratica." },
  { num: "4", title: "Apareca e fique na regua", desc: "Chegue no horario e aproveite a experiencia completa. Se precisar cancelar ou remarcar, avise com antecedencia." },
];

const PRIORITY_CARDS = [
  {
    emoji: "👑",
    highlight: true,
    title: "ASSINANTES DE PLANOS",
    subtitle: "Abertura: toda segunda-feira",
    desc: "Clientes com plano ativo tem prioridade total. A partir de segunda podem reservar horarios da semana, com dias exclusivos conforme o plano.",
  },
  {
    emoji: "📅",
    highlight: false,
    title: "DIAS EXCLUSIVOS",
    subtitle: "Seg a Qui ou Seg a Sab",
    desc: "Dependendo do plano voce tem acesso exclusivo a agenda em determinados dias da semana, garantindo mais disponibilidade.",
  },
  {
    emoji: "🗓️",
    highlight: false,
    title: "CLIENTES EM GERAL",
    subtitle: "Abertura: toda terca-feira",
    desc: "Para quem ainda nao e assinante, a agenda abre toda terca-feira para a semana corrente. Uma otima chance de experimentar.",
  },
];

export default function Agendamento() {
  const { cliente } = useAuth();
  const navigate = useNavigate();

  const irParaAgendamento = () => navigate(cliente ? "/portal/agendar" : "/entrar");

  return (
    <section id="agendamento" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-32 hidden lg:block" style={{ background: GRADIENTS.goldLineVertical }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <p className="text-[10px] tracking-[0.35em] mb-3" style={{ color: COLORS.goldDeep, fontFamily: FONTS.body }}>
            RESERVE SEU HORARIO
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
            AGENDAMENTO
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]" style={{ background: GRADIENTS.goldLineHorizontal }} />
        </motion.div>

        <motion.div className="text-center mb-10 max-w-2xl mx-auto" variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-sm" style={{ background: RGBA.gold(0.07), border: `1px solid ${RGBA.gold(0.2)}` }}>
            <span style={{ color: COLORS.gold }}>💻</span>
            <span className="text-[11px] font-semibold tracking-widest" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              SISTEMA DE AGENDAMENTO ONLINE
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
            A <strong style={{ color: COLORS.gold }}>Seu Diego Barber</strong> conta com um sistema de agendamento online para facilitar sua vida. Crie sua conta, acesse sua area do cliente e agende seu corte em poucos cliques.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
            Tambem e possivel agendar pelo WhatsApp caso prefira falar diretamente com a equipe.
          </p>
        </motion.div>

        <motion.h3 className="text-[11px] font-bold tracking-[0.25em] mb-6 text-center" style={{ fontFamily: FONTS.title, color: COLORS.goldDeep }} variants={fadeUp} custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          COMO AGENDAR ONLINE
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {STEP_ITEMS.map((item, i) => (
            <motion.div key={i} className="flex gap-4" variants={fadeUp} custom={0.3 + i * 0.1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: RGBA.gold(0.1), border: `1px solid ${RGBA.gold(0.3)}`, color: COLORS.gold, fontFamily: FONTS.title }}>
                {item.num}
              </div>
              <div className="pt-1">
                <h4 className="text-xs font-semibold tracking-wider mb-1" style={{ fontFamily: FONTS.body, color: "var(--text-primary)" }}>
                  {item.title}
                </h4>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h3 className="text-[11px] font-bold tracking-[0.25em] mb-6 text-center" style={{ fontFamily: FONTS.title, color: COLORS.goldDeep }} variants={fadeUp} custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          ORDEM DE PRIORIDADE
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {PRIORITY_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="card-bg p-5 relative"
              style={{ boxShadow: card.highlight ? `0 0 28px ${RGBA.gold(0.1)}` : "none", border: card.highlight ? `1px solid ${RGBA.gold(0.45)}` : undefined }}
              variants={fadeUp}
              custom={0.4 + i * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {card.highlight && (
                <div className="absolute -top-3 left-4 px-3 py-0.5 text-[9px] font-bold tracking-[0.18em] whitespace-nowrap" style={{ background: COLORS.gold, color: COLORS.dark, fontFamily: FONTS.title }}>
                  PRIORIDADE MAXIMA
                </div>
              )}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ border: `1px solid ${RGBA.gold(0.35)}`, color: COLORS.gold }}>
                  {card.emoji}
                </span>
                <div>
                  <h4 className="text-xs font-bold tracking-widest mb-0.5" style={{ fontFamily: FONTS.title, color: card.highlight ? COLORS.gold : "var(--text-primary)" }}>
                    {card.title}
                  </h4>
                  <p className="text-[10px] tracking-wider mb-2" style={{ color: COLORS.goldDeep, fontFamily: FONTS.body }}>
                    {card.subtitle}
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="p-5 rounded-sm mb-12 flex items-start gap-3" style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.18)}` }} variants={fadeUp} custom={0.5} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
            <strong style={{ color: COLORS.gold }}>Importante:</strong> horarios nao confirmados podem ser redistribuidos. Caso precise cancelar ou remarcar, avise com antecedencia. A barbearia funciona de <strong style={{ color: COLORS.gold }}>segunda a sabado</strong>.
          </p>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={fadeUp} custom={0.6} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <button onClick={irParaAgendamento} className="btn-gold-filled w-full sm:w-auto px-10 text-center">
            {cliente ? "IR PARA MEUS AGENDAMENTOS" : "CRIAR CONTA E AGENDAR"}
          </button>
          <a href={`${WHATSAPP_BASE_URL}?text=${WA_MESSAGES.schedule}`} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto px-10 text-center" style={{ textDecoration: "none" }}>
            AGENDAR PELO WHATSAPP
          </a>
        </motion.div>
      </div>

      <div className="section-divider mt-20 mx-auto max-w-xs" />
    </section>
  );
}
