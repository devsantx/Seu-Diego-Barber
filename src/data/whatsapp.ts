// Mensagens padrão para WhatsApp. Ajuste aqui para refletir mudanças globais.
export const WA_MESSAGES = {
  schedule: encodeURIComponent(
    [
      "Ola, equipe Seu Diego Barber! Gostaria de solicitar um agendamento.",
      "",
      "Preenchi abaixo para facilitar:",
      "",
      "Nome:",
      "Barbeiro desejado:",
      "Data desejada:",
      "Horario desejado:",
      "Servico desejado:",
      "Tenho plano ativo? Se sim, qual:",
      "Observacao importante:",
      "",
      "Se tiver algum horario mais proximo disponivel, podem me avisar tambem. Obrigado!",
    ].join("\n")
  ),
  info: encodeURIComponent("Ola! Gostaria de mais informacoes sobre a Seu Diego Barber."),
  location: encodeURIComponent("Ola! Gostaria de saber o endereco e os horarios da Seu Diego Barber."),
};
