import { useState } from "react";
import { motion } from "framer-motion";
import { plans } from "../data/plans";
import PlanModal from "./PlanModal";
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

function PlanCard({ plan, index, onSelect }) {
  return (
    <motion.div
      className="card-bg transition-all duration-300 cursor-pointer group relative h-full flex flex-col"
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(plan)}
      style={{ boxShadow: plan.highlight ? "0 0 30px rgba(201,162,74,0.12)" : "none" }}
    >
      {plan.highlight && (
        <div className="absolute inset-0 border rounded-sm pointer-events-none"
          style={{ borderColor: "rgba(201,162,74,0.5)" }} />
      )}

      {plan.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[9px] font-bold tracking-[0.18em] whitespace-nowrap"
          style={{ background: "#C9A24A", color: "#151515", fontFamily: "Cinzel, serif" }}
        >
          {plan.badge}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="w-8 h-[2px] mb-4"
          style={{ background: plan.highlight ? "linear-gradient(90deg, #8E6B2C, #EAD38F)" : "rgba(201,162,74,0.3)" }}
        />

        <h3 className="text-xs font-bold tracking-widest mb-2"
          style={{ fontFamily: "Cinzel, serif", color: "#E5E5E5" }}>
          {plan.name}
        </h3>

        <p className="text-[11px] leading-relaxed mb-4"
          style={{ color: "#9A9A9A", fontFamily: "Raleway, sans-serif" }}>
          {plan.shortDesc}
        </p>

        <div className="space-y-1 mb-5 flex-1">
          {plan.features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-[10px] flex-shrink-0 mt-[1px]" style={{ color: "#C9A24A" }}>✓</span>
              <span className="text-[11px]" style={{ color: "#C0C0C0", fontFamily: "Raleway, sans-serif" }}>{f}</span>
            </div>
          ))}
          {plan.features.length > 3 && (
            <p className="text-[10px] pl-[18px]" style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
              + {plan.features.length - 3} benefícios...
            </p>
          )}
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-lg font-bold gradient-gold" style={{ fontFamily: "Cinzel, serif" }}>
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-[10px]" style={{ color: "#8E6B2C" }}>{plan.period}</span>
          )}
        </div>

        <button
          className="w-full py-2 text-[10px] font-semibold tracking-[0.15em] border transition-all duration-300 mt-auto"
          style={{ borderColor: "rgba(201,162,74,0.4)", color: "#C9A24A", fontFamily: "Cinzel, serif" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#C9A24A"; e.currentTarget.style.color = "#151515"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A24A"; }}
        >
          SAIBA MAIS
        </button>
      </div>
    </motion.div>
  );
}

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section
      id="planos"
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #060606 0%, #0f0f0f 50%, #060606 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3"
            style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
            — ESCOLHA O SEU —
          </p>
          <h2 className="text-base sm:text-xl font-bold tracking-widest leading-snug"
            style={{ fontFamily: "Cinzel, serif", color: "#E5E5E5" }}>
            ASSINE UM DE NOSSOS PLANOS E VENHA
            <br className="hidden sm:block" />
            <span className="gradient-gold"> FICAR BONITO PARA TEU BOYZINHO OU PARA TUA BOYZINHA</span>
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, #C9A24A, transparent)" }}
          />
        </motion.div>

        {/* Mobile: 1 coluna; sm+: 2 colunas. O último ímpar é centralizado. */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
          {plans.map((plan, i) => {
            const isLastOdd = plans.length % 2 !== 0 && i === plans.length - 1;
            return (
              <div key={plan.id} className={isLastOdd ? "sm:col-span-2 sm:max-w-sm sm:mx-auto sm:w-full" : ""}>
                <PlanCard plan={plan} index={i} onSelect={setSelectedPlan} />
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-5">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} onSelect={setSelectedPlan} />
            ))}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}

      <div className="section-divider mt-20 mx-auto max-w-xs" />
    </section>
  );
}
