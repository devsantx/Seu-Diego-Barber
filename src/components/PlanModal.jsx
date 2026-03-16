import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { WHATSAPP_BASE_URL } from "../data/plans";
export default function PlanModal({ plan, onClose }) {

  // Evita scroll do fundo enquanto o modal estiver aberto.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Permite fechar com a tecla Escape.
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!plan) return null;

  // Mensagem personalizada por plano (definida em src/data/plans.js).
  const waLink = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(plan.whatsappMsg)}`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-md sm:max-w-lg rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1e1e1e 0%, #0d0d0d 100%)",
            border: "1px solid rgba(201,162,74,0.3)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,162,74,0.05)",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="h-[3px] w-full"
            style={{ background: "linear-gradient(90deg, #59431F, #C9A24A, #EAD38F)" }}
          />

          <div className="px-7 py-6 border-b" style={{ borderColor: "rgba(201,162,74,0.1)" }}>
            <div className="flex items-start justify-between">
              <div>
                {plan.badge && (
                  <span className="inline-block px-2.5 py-1 text-[9px] font-bold tracking-[0.2em] mb-2"
                    style={{ background: "#C9A24A", color: "#151515", fontFamily: "Cinzel, serif" }}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-bold tracking-widest"
                  style={{ fontFamily: "Cinzel, serif", color: "#E5E5E5" }}>
                  {plan.name}
                </h3>
                <p className="text-sm mt-1 leading-relaxed"
                  style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
                  {plan.tagline}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-xl leading-none ml-4 mt-1 transition-colors duration-200"
                style={{ color: "#2F2F2F" }}
                onMouseEnter={e => e.currentTarget.style.color = "#C9A24A"}
                onMouseLeave={e => e.currentTarget.style.color = "#2F2F2F"}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="px-7 py-6">
            <p className="text-sm leading-relaxed mb-5"
              style={{ color: "#D9D9D9", fontFamily: "Raleway, sans-serif" }}>
              {plan.shortDesc}
            </p>

            <div className="space-y-2 mb-7">
              {plan.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm mt-[1px] flex-shrink-0" style={{ color: "#C9A24A" }}>✓</span>
                  <span className="text-sm"
                    style={{ color: "#D9D9D9", fontFamily: "Raleway, sans-serif" }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-1 mb-7">
              <span className="text-3xl font-bold gradient-gold"
                style={{ fontFamily: "Cinzel, serif" }}>
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm"
                  style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
                  {plan.period}
                </span>
              )}
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-filled w-full text-center block"
              style={{ textDecoration: "none" }}
            >
              ASSINAR PELO WHATSAPP
            </a>

            <p className="text-center text-[9px] mt-3"
              style={{ color: "#3A3A3A", fontFamily: "Raleway, sans-serif" }}>
              Você será redirecionado ao WhatsApp da barbearia
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
