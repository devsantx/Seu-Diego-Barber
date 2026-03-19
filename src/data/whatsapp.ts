// Mensagens padrão para WhatsApp. Ajuste aqui para refletir mudanças globais.
export const WA_MESSAGES = {
  schedule: encodeURIComponent(
    [
      "Olá, Seu Diego Barber! Gostaria de agendar um horário. 🗓️",
      "",
      "*Barbeiro:* (ex: Diego, Erick, Mikael ou André)",
      "*Data:* (ex: Segunda, 10/03 — funciona Seg a Sáb)",
      "*Horário:* (ex: 14h)",
      "*Serviço:* (ex: Corte / Corte + Barba / Corte + Bigode e Sobrancelha)",
      "*Plano ativo:* (Sim — [nome do plano] / Não)",
      "",
      "Aguardo confirmação! 😊",
    ].join("\n")
  ),
  info: encodeURIComponent("Olá! Gostaria de mais informações sobre a Seu Diego Barber."),
  location: encodeURIComponent("Olá! Gostaria de saber o endereço e horários da Seu Diego Barber."),
};
