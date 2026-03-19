import { motion } from "framer-motion";
import LogoFull from "./LogoFull";
import { COLORS, FONTS, GRADIENTS } from "../styles/theme";

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: GRADIENTS.heroRadial }}
      />

      {[
        "top-[15%] left-[8%] border-t border-l",
        "top-[15%] right-[8%] border-t border-r",
        "bottom-[15%] left-[8%] border-b border-l",
        "bottom-[15%] right-[8%] border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:block w-10 h-10 opacity-25 ${cls}`}
          style={{ borderColor: COLORS.gold }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ delay: 2.2 + i * 0.05, duration: 0.5 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center pt-24 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoFull className="w-40 sm:w-52 md:w-60" />
        </motion.div>

        <motion.div
          className="w-20 h-px"
          style={{ background: GRADIENTS.goldLineHorizontal }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        />

        <motion.p
          className="text-[11px] tracking-[0.3em] font-light"
          style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.05, duration: 0.6 }}
        >
          ESTILO · TÉCNICA · IDENTIDADE
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => scrollTo("planos")}
            className="btn-gold w-full sm:w-44 text-center"
          >
            VER PLANOS
          </button>

          <button
            onClick={() => scrollTo("agendamento")}
            className="btn-gold-filled w-full sm:w-44 text-center"
          >
            AGENDAR
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 2.6 }}
      >
        <motion.div
          className="w-px h-10"
          style={{ background: GRADIENTS.goldScroll }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
        />
        <span
          className="text-[9px] tracking-[0.25em] font-light"
          style={{ color: COLORS.gold, fontFamily: FONTS.body }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
