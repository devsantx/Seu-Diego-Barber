import { motion } from "framer-motion";
import { WHATSAPP_BASE_URL } from "../data/plans";
import { WA_MESSAGES } from "../data/whatsapp";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../styles/theme";

// Texto base do WhatsApp centralizado em src/data/whatsapp.ts.

// Animação padrão para entradas suaves.
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

type PriorityCardProps = {
  emoji: string;
  title: string;
  subtitle: string;
  desc: string;
  highlight?: boolean;
};

type StepItemProps = {
  num: string;
  title: string;
  desc: string;
};

type SectionTitleProps = {
  children: string;
  delay: number;
};

// Conteúdo centralizado em dados para facilitar manutenção sem mexer no layout.
const STEP_ITEMS: StepItemProps[] = [
  {
    num: "1",
    title: "Entre em contato pelo WhatsApp",
    desc: "Mande uma mensagem para a gente. Informe o serviço desejado, o barbeiro e os dias e horários de preferência.",
  },
  {
    num: "2",
    title: "Escolha seu horário",
    desc: "Verificamos a agenda e confirmamos o melhor horário disponível para você com o barbeiro de preferência.",
  },
  {
    num: "3",
    title: "Confirme o agendamento",
    desc: "Após confirmação, seu horário fica reservado. Atendemos de segunda a sábado — domingo é dia de descanso.",
  },
  {
    num: "4",
    title: "Apareça e fique na régua!",
    desc: "Chegue no horário combinado e aproveite a experiência completa da Seu Diego Barber. Simples assim.",
  },
];

const PRIORITY_CARDS: PriorityCardProps[] = [
  {
    emoji: "👑",
    title: "ASSINANTES DE PLANOS",
    subtitle: "Abertura: toda segunda-feira",
    desc: "Clientes com plano ativo têm prioridade total. A partir de segunda-feira podem reservar seus horários para a semana, com dias exclusivos conforme o plano escolhido.",
    highlight: true,
  },
  {
    emoji: "🗓️",
    title: "DIAS EXCLUSIVOS",
    subtitle: "Seg a Qui ou Seg a Sáb",
    desc: "Dependendo do plano, você tem acesso exclusivo à agenda em determinados dias da semana, garantindo mais disponibilidade e praticidade.",
  },
  {
    emoji: "📆",
    title: "CLIENTES EM GERAL",
    subtitle: "Abertura: toda terça-feira",
    desc: "Para quem ainda não é assinante, a agenda abre toda terça-feira para a semana corrente. Uma ótima chance de experimentar antes de assinar.",
  },
];

const PriorityCard = ({
  emoji,
  title,
  subtitle,
  desc,
  highlight,
  delay = 0,
}: PriorityCardProps & { delay?: number }) => (
  <motion.div
    className="card-bg p-5 relative"
    style={{
      boxShadow: highlight ? `0 0 28px ${RGBA.gold(0.1)}` : "none",
      border: highlight ? `1px solid ${RGBA.gold(0.45)}` : `1px solid ${RGBA.gold(0.12)}`,
    }}
    variants={fadeUp}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {highlight && (
      <div
        className="absolute -top-3 left-4 px-3 py-0.5 text-[9px] font-bold tracking-[0.18em] whitespace-nowrap"
        style={{ background: COLORS.gold, color: COLORS.dark, fontFamily: FONTS.title }}
      >
        PRIORIDADE MÁXIMA
      </div>
    )}
    <div className="flex items-start gap-4">
      <span
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg"
        style={{ border: `1px solid ${RGBA.gold(0.35)}`, color: COLORS.gold }}
      >
        {emoji}
      </span>
      <div>
        <h4
          className="text-xs font-bold tracking-widest mb-0.5"
          style={{ fontFamily: FONTS.title, color: highlight ? COLORS.gold : COLORS.textLight }}
        >
          {title}
        </h4>
        <p className="text-[10px] tracking-wider mb-2" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
          {subtitle}
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
          {desc}
        </p>
      </div>
    </div>
  </motion.div>
);

const StepItem = ({ num, title, desc, delay = 0 }: StepItemProps & { delay?: number }) => (
  <motion.div
    className="flex gap-4"
    variants={fadeUp}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div
      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
      style={{
        background: RGBA.gold(0.1),
        border: `1px solid ${RGBA.gold(0.3)}`,
        color: COLORS.gold,
        fontFamily: FONTS.title,
      }}
    >
      {num}
    </div>
    <div className="pt-1">
      <h4 className="text-xs font-semibold tracking-wider mb-1" style={{ fontFamily: FONTS.body, color: COLORS.textLight }}>
        {title}
      </h4>
      <p className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
        {desc}
      </p>
    </div>
  </motion.div>
);

const SectionTitle = ({ children, delay }: SectionTitleProps) => (
  <motion.h3
    className="text-[11px] font-bold tracking-[0.25em] mb-6 text-center"
    style={{ fontFamily: FONTS.title, color: COLORS.goldDark }}
    variants={fadeUp}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {children}
  </motion.h3>
);

export default function Agendamento() {
  return (
    <section id="agendamento" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-32 hidden lg:block"
        style={{ background: GRADIENTS.goldLineVertical }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
            — RESERVE SEU HORÁRIO —
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
            AGENDAMENTO
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]" style={{ background: GRADIENTS.goldLineHorizontal }} />
        </motion.div>

        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-sm"
            style={{ background: RGBA.gold(0.07), border: `1px solid ${RGBA.gold(0.2)}` }}
          >
            <span style={{ color: COLORS.gold }}>📱</span>
            <span className="text-[11px] font-semibold tracking-widest" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              AGENDAMENTO VIA WHATSAPP
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: COLORS.textBody, fontFamily: FONTS.body }}>
            Todos os agendamentos da <strong style={{ color: COLORS.gold }}>Seu Diego Barber</strong> são realizados diretamente
            pelo WhatsApp. Esse modelo garante atendimento rápido, personalizado e sem complicações — você fala com a gente,
            confirma o horário e está pronto!
          </p>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
            Em breve, nosso sistema de agendamento online estará disponível diretamente aqui no site.
          </p>
        </motion.div>

        <SectionTitle delay={0.2}>COMO FUNCIONA</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <div className="space-y-6">
            {STEP_ITEMS.slice(0, 2).map((item, index) => (
              <StepItem key={item.title} {...item} delay={0.3 + index * 0.1} />
            ))}
          </div>
          <div className="space-y-6">
            {STEP_ITEMS.slice(2).map((item, index) => (
              <StepItem key={item.title} {...item} delay={0.5 + index * 0.1} />
            ))}
          </div>
        </div>

        <SectionTitle delay={0.3}>ORDEM DE PRIORIDADE</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {PRIORITY_CARDS.map((card, index) => (
            <PriorityCard key={card.title} {...card} delay={0.4 + index * 0.1} />
          ))}
        </div>

        <motion.div
          className="p-5 rounded-sm mb-12 flex items-start gap-3"
          style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.18)}` }}
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="text-[11px] leading-relaxed" style={{ color: COLORS.textPanel, fontFamily: FONTS.body }}>
            <strong style={{ color: COLORS.gold }}>Importante:</strong> Horários não confirmados podem ser redistribuídos. Caso precise
            cancelar ou remarcar, avise com antecedência pelo WhatsApp. O respeito ao horário garante uma boa experiência para todos
            os clientes.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* CTA principal de agendamento; mantém o texto do WhatsApp em um único lugar. */}
          <a
            href={`${WHATSAPP_BASE_URL}?text=${WA_MESSAGES.schedule}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-filled w-full sm:w-auto px-10 text-center"
            style={{ textDecoration: "none" }}
          >
            AGENDAR PELO WHATSAPP
          </a>
          {/* CTA secundário para ancorar na seção de planos. */}
          <button
            onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold w-full sm:w-auto px-10 text-center"
          >
            VER PLANOS
          </button>
        </motion.div>
      </div>

      <div className="section-divider mt-20 mx-auto max-w-xs" />
    </section>
  );
}
