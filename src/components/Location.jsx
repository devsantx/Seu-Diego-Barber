import { motion } from "framer-motion";
import { WHATSAPP_BASE_URL } from "../data/plans";

const INFO_MSG = encodeURIComponent("Olá! Gostaria de saber o endereço e horários da Seu Diego Barber.");

export default function Location() {
  return (
    <section
      id="localizacao"
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #060606 0%, #0f0f0f 100%)" }}
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
            — VENHA NOS VISITAR —
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest"
            style={{ fontFamily: "Cinzel, serif", color: "#E5E5E5" }}>
            LOCALIZAÇÃO
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, #C9A24A, transparent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Atualize o src do iframe quando o endereço mudar. */}
          <motion.div
            className="w-full aspect-[4/3] overflow-hidden"
            style={{ border: "1px solid rgba(201,162,74,0.2)" }}
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

          {/* Atualize endereço/horários aqui e mantenha o Footer sincronizado. */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {[
              {
                icon: "📍",
                title: "ENDEREÇO",
                lines: ["Rua Córrego do Bartolomeu, 170 — Morro da Conceição", "Recife — PE, CEP 52280-850"],
              },
              {
                icon: "🕐",
                title: "HORÁRIOS",
                lines: ["Seg a Sex: 09h — 20h", "Sábado: 09h — 20h", "Domingo: Fechado"],
              },
              {
                icon: "📱",
                title: "CONTATO",
                lines: ["WhatsApp: (81) 98633-3846"],
                link: `${WHATSAPP_BASE_URL}?text=${INFO_MSG}`,
              },
            ].map((item, i) => (
              <div key={i} className="p-4 card-bg">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.2em] mb-1.5"
                      style={{ fontFamily: "Cinzel, serif", color: "#C9A24A" }}>
                      {item.title}
                    </h4>
                    {item.lines.map((line, j) => (
                      item.link ? (
                        <a key={j} href={item.link} target="_blank" rel="noopener noreferrer"
                          className="block text-xs hover:underline"
                          style={{ color: "#D9D9D9", fontFamily: "Raleway, sans-serif" }}>
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-xs"
                          style={{ color: "#D9D9D9", fontFamily: "Raleway, sans-serif" }}>
                          {line}
                        </p>
                      )
                    ))}
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
