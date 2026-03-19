import { motion } from "framer-motion";
import { COLORS, FONTS, GRADIENTS } from "../styles/theme";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Edite os textos da seção aqui.
const PARAGRAFOS = [
  "Fundada em 2017 pelo barbeiro Diego Melo, a Seu Diego Barber surgiu com o propósito de transformar o conceito de barbearia tradicional, oferecendo muito mais do que serviços estéticos. Desde o início, nosso foco sempre foi proporcionar uma experiência diferenciada, unindo técnica, estilo e um atendimento verdadeiramente personalizado.",
  "Acreditamos que cada cliente possui sua própria identidade, e por isso dedicamos atenção a cada detalhe do atendimento, desde a recepção até o resultado final. Trabalhamos com profissionais altamente capacitados, que estão em constante atualização para acompanhar as tendências do mercado, sem perder a essência e a tradição da barbearia clássica.",
  "Utilizamos produtos de alta qualidade e seguimos padrões rigorosos de higiene e organização, garantindo segurança, conforto e excelência em todos os serviços. Nosso espaço foi cuidadosamente planejado para oferecer um ambiente moderno, acolhedor e funcional, onde o cliente pode relaxar, se sentir confiante e vivenciar um momento exclusivo.",
  "Mais do que uma barbearia, a Seu Diego Barber é um espaço de cuidado, estilo e identidade. Nosso compromisso é entregar resultados que superem expectativas, fortalecendo a autoestima e a satisfação de cada cliente que confia no nosso trabalho.",
];

export default function About() {
  return (
    <section
      id="sobre"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-32 hidden lg:block"
        style={{ background: GRADIENTS.goldLineVertical }}
      />

      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3"
            style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
            — CONHEÇA A NOSSA HISTÓRIA —
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest"
            style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
            SOBRE NOSSA BARBEARIA
          </h2>
          <div className="mx-auto mt-4 w-16 h-[1px]"
            style={{ background: GRADIENTS.goldLineHorizontal }}
          />
        </motion.div>

        {PARAGRAFOS.map((texto, i) => (
          <motion.p
            key={i}
            className="text-sm leading-relaxed mb-5 text-justify"
            style={{ color: COLORS.textBody, fontFamily: FONTS.body, fontWeight: 400 }}
            variants={fadeUp}
            custom={i * 0.5 + 0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {texto}
          </motion.p>
        ))}
      </div>

      <div className="section-divider mt-16 mx-auto max-w-xs" />
    </section>
  );
}
