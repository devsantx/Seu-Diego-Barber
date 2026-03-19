// Número oficial da barbearia (DDI + DDD + número).
import type { Plan } from "./types";

export const WHATSAPP_NUMBER = "5511999999999";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const plans: Plan[] = [
  {
    id: 1,
    name: "PLANO ESSENCIAL",
    tagline: "O equilíbrio perfeito entre frequência e qualidade",
    shortDesc: "Para manter o visual na régua toda semana, com prioridade e dias exclusivos.",
    features: [
      "1 corte a cada 7 dias",
      "Horários reservados o mês todo",
      "Agendamento prioritário",
      "Dias exclusivos de Seg a Quinta",
      "Video Game liberado qualquer dia",
    ],
    price: "R$ 85,00",
    period: "/mês",
    highlight: false,
    whatsappMsg: "Olá! Tenho interesse no *Plano Essencial* da Seu Diego Barber. Podem me passar mais informações?",
  },
  {
    id: 2,
    name: "PLANO VIP",
    tagline: "Máximo cuidado, para estar sempre impecável",
    shortDesc: "Corte semanal com bigode e sobrancelha, mais vantagens e desconto em produtos.",
    features: [
      "1 corte + Bigode e Sobrancelha a cada 7 dias",
      "Horários reservados o mês todo",
      "Agendamento prioritário",
      "Dias exclusivos de Seg a Quinta",
      "Video Game liberado qualquer dia",
      "Desconto de 10% em produtos",
    ],
    price: "R$ 100,00",
    period: "/mês",
    highlight: false,
    whatsappMsg: "Olá! Tenho interesse no *Plano VIP* da Seu Diego Barber. Podem me passar mais informações?",
  },
  {
    id: 3,
    name: "PLANO CLASSICO",
    tagline: "Cuide do seu filho — e seja o pai mais estiloso",
    shortDesc: "Plano para pai + filho com benefícios completos e 1 emergência no mês.",
    features: [
      "1 corte + Bigode e Sobrancelha a cada 7 dias",
      "Horários reservados o mês todo",
      "Agendamento prioritário",
      "Dias exclusivos de Seg a Sábado",
      "Video Game liberado qualquer dia",
      "Desconto de 10% em produtos",
      "Direito a 1 emergência no mês",
    ],
    price: "R$ 120,00",
    period: "/mês",
    highlight: true,
    badge: "MAIS POPULAR",
    whatsappMsg: "Olá! Tenho interesse no *Plano Clássico* da Seu Diego Barber. Podem me passar mais informações?",
  },
  {
    id: 4,
    name: "PLANO PREMIUM",
    tagline: "Sua equipe bem cuidada, sempre",
    shortDesc: "Corte e barba semanais, benefícios completos e 2 emergências no mês.",
    features: [
      "1 corte + Barba a cada 7 dias",
      "Horários reservados o mês todo",
      "Agendamento prioritário",
      "Dias exclusivos de Seg a Sábado",
      "Video Game liberado qualquer dia",
      "Desconto de 10% em produtos",
      "Direito a 2 emergências no mês",
    ],
    price: "R$ 150,00",
    period: "",
    highlight: false,
    whatsappMsg: "Olá! Tenho interesse no *Plano Premium* da Seu Diego Barber. Podem me passar mais informações?",
  },
];
