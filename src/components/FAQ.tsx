import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../data/faq";
import type { FAQItem as FAQItemType } from "../data/types";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../styles/theme";

type FAQItemProps = {
  item: FAQItemType;
  index: number;
};

function FAQItem({ item, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="card-bg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <button
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs font-semibold leading-snug flex-1"
          style={{ fontFamily: FONTS.body, color: open ? COLORS.gold : COLORS.textLight }}>
          {item.question}
        </span>
        <motion.span
          className="flex-shrink-0 text-base leading-none"
          style={{ color: COLORS.gold }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 pt-0 border-t"
              style={{ borderColor: RGBA.gold(0.1) }}>
              <p className="text-xs leading-relaxed pt-3"
                style={{ color: COLORS.textBody, fontFamily: FONTS.body }}>
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3"
            style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
            — DÚVIDAS FREQUENTES —
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest"
            style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
            FAQ
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]"
            style={{ background: GRADIENTS.goldLineHorizontal }}
          />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
