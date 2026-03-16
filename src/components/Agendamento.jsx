import { motion } from "framer-motion";
import { WHATSAPP_BASE_URL } from "../data/plans";

// Mensagem padrão do WhatsApp para agendamento.
const WA_SCHEDULE_MSG = encodeURIComponent(
`Olá, Seu Diego Barber! Gostaria de agendar um horário. 🗓️

*Barbeiro:* (ex: Diego, Erick, Mikael ou André)
*Data:* (ex: Segunda, 10/03 — funciona Seg a Sáb)
*Horário:* (ex: 14h)
*Serviço:* (ex: Corte / Corte + Barba / Corte + Bigode e Sobrancelha)
*Plano ativo:* (Sim — [nome do plano] / Não)

Aguardo confirmação! 😊`
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

const PriorityCard = ({ emoji, title, subtitle, desc, delay, highlight }) => (
  <motion.div
    className="card-bg p-5 relative"
    style={{
      boxShadow: highlight ? "0 0 28px rgba(201,162,74,0.10)" : "none",
      border: highlight
        ? "1px solid rgba(201,162,74,0.45)"
        : "1px solid rgba(201,162,74,0.12)",
    }}
    variants={fadeUp} custom={delay}
    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
  >
    {highlight && (
      <div
        className="absolute -top-3 left-4 px-3 py-0.5 text-[9px] font-bold tracking-[0.18em] whitespace-nowrap"
        style={{ background: "#C9A24A", color: "#151515", fontFamily: "Cinzel, serif" }}
      >
        PRIORIDADE MÁXIMA
      </div>
    )}
    <div className="flex items-start gap-4">
      <span
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg"
        style={{ border: "1px solid rgba(201,162,74,0.35)", color: "#C9A24A" }}
      >
        {emoji}
      </span>
      <div>
        <h4 className="text-xs font-bold tracking-widest mb-0.5"
          style={{ fontFamily: "Cinzel, serif", color: highlight ? "#C9A24A" : "#E5E5E5" }}>
          {title}
        </h4>
        <p className="text-[10px] tracking-wider mb-2" style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
          {subtitle}
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: "#9A9A9A", fontFamily: "Raleway, sans-serif" }}>
          {desc}
        </p>
      </div>
    </div>
  </motion.div>
);

const StepItem = ({ num, title, desc, delay }) => (
  <motion.div
    className="flex gap-4"
    variants={fadeUp} custom={delay}
    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
  >
    <div
      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
      style={{
        background: "rgba(201,162,74,0.1)",
        border: "1px solid rgba(201,162,74,0.3)",
        color: "#C9A24A",
        fontFamily: "Cinzel, serif",
      }}
    >
      {num}
    </div>
    <div className="pt-1">
      <h4 className="text-xs font-semibold tracking-wider mb-1"
        style={{ fontFamily: "Raleway, sans-serif", color: "#E5E5E5" }}>
        {title}
      </h4>
      <p className="text-[11px] leading-relaxed" style={{ color: "#9A9A9A", fontFamily: "Raleway, sans-serif" }}>
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function Agendamento() {
  return (
    <section
      id="agendamento"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #070707 0%, #0e0e0e 50%, #070707 100%)" }}
    >
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-32 hidden lg:block"
        style={{ background: "linear-gradient(180deg, transparent, #C9A24A, transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <motion.div
          className="text-center mb-14"
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3" style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
            — RESERVE SEU HORÁRIO —
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest"
            style={{ fontFamily: "Cinzel, serif", color: "#E5E5E5" }}>
            AGENDAMENTO
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #C9A24A, transparent)" }} />
        </motion.div>

        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={fadeUp} custom={0.1}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-sm"
            style={{ background: "rgba(201,162,74,0.07)", border: "1px solid rgba(201,162,74,0.2)" }}
          >
            <span style={{ color: "#C9A24A" }}>📱</span>
            <span className="text-[11px] font-semibold tracking-widest"
              style={{ color: "#C9A24A", fontFamily: "Cinzel, serif" }}>
              AGENDAMENTO VIA WHATSAPP
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4"
            style={{ color: "#D9D9D9", fontFamily: "Raleway, sans-serif" }}>
            Todos os agendamentos da <strong style={{ color: "#C9A24A" }}>Seu Diego Barber</strong> são
            realizados diretamente pelo WhatsApp. Esse modelo garante atendimento rápido, personalizado
            e sem complicações — você fala com a gente, confirma o horário e está pronto!
          </p>
          <p className="text-sm leading-relaxed"
            style={{ color: "#9A9A9A", fontFamily: "Raleway, sans-serif" }}>
            Em breve, nosso sistema de agendamento online estará disponível diretamente aqui no site.
          </p>
        </motion.div>

        <motion.h3
          className="text-[11px] font-bold tracking-[0.25em] mb-6 text-center"
          style={{ fontFamily: "Cinzel, serif", color: "#8E6B2C" }}
          variants={fadeUp} custom={0.2}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          COMO FUNCIONA
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <div className="space-y-6">
            <StepItem num="1" delay={0.3}
              title="Entre em contato pelo WhatsApp"
              desc="Mande uma mensagem para a gente. Informe o serviço desejado, o barbeiro e os dias e horários de preferência."
            />
            <StepItem num="2" delay={0.4}
              title="Escolha seu horário"
              desc="Verificamos a agenda e confirmamos o melhor horário disponível para você com o barbeiro de preferência."
            />
          </div>
          <div className="space-y-6">
            <StepItem num="3" delay={0.5}
              title="Confirme o agendamento"
              desc="Após confirmação, seu horário fica reservado. Atendemos de segunda a sábado — domingo é dia de descanso."
            />
            <StepItem num="4" delay={0.6}
              title="Apareça e fique na régua!"
              desc="Chegue no horário combinado e aproveite a experiência completa da Seu Diego Barber. Simples assim."
            />
          </div>
        </div>

        <motion.h3
          className="text-[11px] font-bold tracking-[0.25em] mb-6 text-center"
          style={{ fontFamily: "Cinzel, serif", color: "#8E6B2C" }}
          variants={fadeUp} custom={0.3}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          ORDEM DE PRIORIDADE
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          <PriorityCard
            emoji="👑" delay={0.4} highlight={true}
            title="ASSINANTES DE PLANOS"
            subtitle="Abertura: toda segunda-feira"
            desc="Clientes com plano ativo têm prioridade total. A partir de segunda-feira podem reservar seus horários para a semana, com dias exclusivos conforme o plano escolhido."
          />
          <PriorityCard
            emoji="📅" delay={0.5} highlight={false}
            title="DIAS EXCLUSIVOS"
            subtitle="Seg a Qui ou Seg a Sáb"
            desc="Dependendo do plano, você tem acesso exclusivo à agenda em determinados dias da semana, garantindo mais disponibilidade e praticidade."
          />
          <PriorityCard
            emoji="🗓️" delay={0.6} highlight={false}
            title="CLIENTES EM GERAL"
            subtitle="Abertura: toda terça-feira"
            desc="Para quem ainda não é assinante, a agenda abre toda terça-feira para a semana corrente. Uma ótima chance de experimentar antes de assinar."
          />
        </div>

        <motion.div
          className="p-5 rounded-sm mb-12 flex items-start gap-3"
          style={{ background: "rgba(201,162,74,0.05)", border: "1px solid rgba(201,162,74,0.18)" }}
          variants={fadeUp} custom={0.5}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="text-[11px] leading-relaxed" style={{ color: "#C0C0C0", fontFamily: "Raleway, sans-serif" }}>
            <strong style={{ color: "#C9A24A" }}>Importante:</strong> Horários não confirmados podem ser
            redistribuídos. Caso precise cancelar ou remarcar, avise com antecedência pelo WhatsApp.
            O respeito ao horário garante uma boa experiência para todos os clientes.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp} custom={0.6}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <a
            href={`${WHATSAPP_BASE_URL}?text=${WA_SCHEDULE_MSG}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-gold-filled w-full sm:w-auto px-10 text-center"
            style={{ textDecoration: "none" }}
          >
            AGENDAR PELO WHATSAPP
          </a>
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
