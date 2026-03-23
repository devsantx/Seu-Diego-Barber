import { motion } from "framer-motion";
import { WHATSAPP_BASE_URL } from "../data/plans";
import { WA_MESSAGES } from "../data/whatsapp";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../styles/theme";

const LOCATION_ITEMS = [
  {
    icon: "📍",
    title: "ENDERECO",
    lines: ["Rua Corrego do Bartolomeu, 170 - Morro da Conceicao", "Recife - PE, CEP 52280-850"],
  },
  {
    icon: "🕐",
    title: "HORARIOS",
    lines: ["Seg a Sex: 09h - 20h", "Sabado: 09h - 20h", "Domingo: Fechado"],
  },
  {
    icon: "📱",
    title: "CONTATO",
    lines: ["WhatsApp: (81) 98633-3846"],
    link: `${WHATSAPP_BASE_URL}?text=${WA_MESSAGES.location}`,
  },
];

export default function Location() {
  return (
    <section id="localizacao" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3" style={{ color: COLORS.goldDeep, fontFamily: FONTS.body }}>
            VENHA NOS VISITAR
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
            LOCALIZACAO
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]" style={{ background: GRADIENTS.goldLineHorizontal }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            className="w-full aspect-[4/3] overflow-hidden"
            style={{ border: `1px solid ${RGBA.gold(0.2)}` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1772752675314!5m2!1spt-BR!2sbr!6m8!1m7!1s1O-PcGyLppLVHB8T3xyFcA!2m2!1d-8.022484853404357!2d-34.91162526368883!3f54.25688760972341!4f11.678201270021859!5f0.7820865974627469"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa da Seu Diego Barber"
            />
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {LOCATION_ITEMS.map(item => (
              <div key={item.title} className="p-4 card-bg">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.2em] mb-1.5" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>
                      {item.title}
                    </h4>
                    {item.lines.map((line, j) =>
                      item.link ? (
                        <a key={j} href={item.link} target="_blank" rel="noopener noreferrer" className="block text-xs hover:underline" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-xs" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-20 mx-auto max-w-xs" />
    </section>
  );
}
