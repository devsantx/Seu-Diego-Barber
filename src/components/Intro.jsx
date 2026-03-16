import { motion } from "framer-motion";
import LogoFull from "./LogoFull";

export default function Intro({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#050505" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9A24A, transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoFull className="w-48 sm:w-64" />
        </motion.div>

        <motion.div
          className="mt-10 w-32 h-[1px] overflow-hidden"
          style={{ background: "rgba(201,162,74,0.2)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, #8E6B2C, #EAD38F)" }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9A24A, transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
}
