// Arquivo legado (não utilizado no site atual).

export const WHATSAPP_NUMBER = '5511999999999' // ALTERE para o número real da barbearia
export const WHATSAPP_MESSAGE_PLANS = 'Olá! Gostaria de saber mais sobre os planos da Seu Diego Barber.'

export const plans = [
  {
    id: 1,
    name: 'Plano Clássico',
    tagline: 'O essencial com excelência',
    shortDesc:
      'Para quem busca qualidade no corte com a frequência certa. Inclui 2 cortes por mês com todos os nossos profissionais.',
    features: [
      '2 cortes por mês',
      'Finalização com produtos premium',
      'Agendamento prioritário',
      'Válido por 30 dias',
    ],
    price: 'R$ 89,90/mês',
    highlight: false,
  },
  {
    id: 2,
    name: 'Plano Premium',
    tagline: 'Corte + Barba completa',
    shortDesc:
      'A combinação perfeita para quem cuida do visual por completo. Corte e barba inclusos com atendimento diferenciado.',
    features: [
      '2 cortes por mês',
      '2 barba completa por mês',
      'Finalização com produtos premium',
      'Sobrancelha inclusa',
      'Agendamento prioritário',
      'Válido por 30 dias',
    ],
    price: 'R$ 149,90/mês',
    highlight: true,
  },
  {
    id: 3,
    name: 'Plano VIP',
    tagline: 'Experiência exclusiva total',
    shortDesc:
      'O plano completo para o homem que valoriza cada detalhe. Tratamento VIP com serviços ilimitados e benefícios exclusivos.',
    features: [
      'Cortes ilimitados',
      'Barba completa ilimitada',
      'Sobrancelha inclusa',
      'Hidratação capilar mensal',
      'Desconto em produtos',
      'Agendamento VIP 24h antecedência',
      'Bebida cortesia em cada visita',
    ],
    price: 'R$ 229,90/mês',
    highlight: false,
  },
  {
    id: 4,
    name: 'Plano Duplo',
    tagline: 'Pai e filho juntos',
    shortDesc:
      'Perfeito para pai e filho se cuidarem juntos. Dois planos clássicos com desconto especial para a família.',
    features: [
      '2 cortes por mês cada',
      'Válido para 2 pessoas',
      'Finalização com produtos premium',
      'Agendamentos no mesmo horário',
      'Desconto especial de família',
    ],
    price: 'R$ 149,90/mês',
    highlight: false,
  },
  {
    id: 5,
    name: 'Plano Black',
    tagline: 'Para quem não abre mão do melhor',
    shortDesc:
      'O plano mais completo e exclusivo da Seu Diego Barber. Atendimento personalizado com os melhores profissionais.',
    features: [
      'Serviços ilimitados',
      'Atendimento exclusivo com Diego',
      'Todos os serviços inclusos',
      'Produtos especiais por conta da barbearia',
      'Acesso a horários exclusivos',
      'Bebida premium cortesia',
      'Brindes e surpresas mensais',
    ],
    price: 'R$ 349,90/mês',
    highlight: false,
  },
]

export const teamMembers = [
  {
    id: 1,
    name: 'Diego Melo',
    role: 'Fundador & Master Barber',
    bio: 'Diego é o fundador da barbearia e um barbeiro apaixonado pela profissão. Com mais de 8 anos de experiência, traz uma visão única de estilo clássico e moderno, combinando técnica e criatividade em cada atendimento.',
    image: null,
  },
  {
    id: 2,
    name: 'Rafael Costa',
    role: 'Senior Barber',
    bio: 'Rafael é especialista em cortes modernos e degradê. Com anos de experiência, domina as técnicas mais atuais do mercado, garantindo um resultado impecável em cada visita.',
    image: null,
  },
  {
    id: 3,
    name: 'Lucas Oliveira',
    role: 'Barber & Estilista',
    bio: 'Lucas combina barbear clássico com as tendências mais atuais. Especializado em barba e acabamentos, é referência em técnica e atendimento personalizado.',
    image: null,
  },
  {
    id: 4,
    name: 'Mateus Santos',
    role: 'Barber',
    bio: 'Mateus é o profissional mais versátil da equipe. Atende desde os estilos mais clássicos até os mais modernos, sempre com muita habilidade e dedicação ao cliente.',
    image: null,
  },
]

export const faqItems = [
  {
    q: 'Como funciona o sistema de planos?',
    a: 'Os planos são mensais e renováveis automaticamente. Você tem direito a todos os serviços descritos no plano escolhido durante o período de 30 dias. Para contratar, basta entrar em contato pelo WhatsApp.',
  },
  {
    q: 'Preciso agendar mesmo com plano ativo?',
    a: 'Sim, o agendamento é necessário para garantir que você seja atendido no melhor horário. Clientes com plano têm prioridade no agendamento e podem reservar com antecedência.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos PIX, cartões de débito e crédito, e dinheiro. Para pagamento do plano, fazemos a cobrança mensal via PIX ou cartão.',
  },
  {
    q: 'Posso cancelar o plano quando quiser?',
    a: 'Sim! Você pode cancelar o plano a qualquer momento, sem multa. O cancelamento é válido para o próximo ciclo mensal, ou seja, você aproveita o período já pago normalmente.',
  },
  {
    q: 'Os serviços do plano expiram se não forem usados?',
    a: 'Sim, os serviços incluídos no plano são válidos dentro do ciclo de 30 dias e não acumulam para o mês seguinte. Por isso, aproveite ao máximo!',
  },
  {
    q: 'A barbearia atende crianças?',
    a: 'Sim! Atendemos crianças a partir de 5 anos. O Plano Duplo é perfeito para pai e filho. Crianças menores de 5 anos têm atendimento a combinar diretamente com a equipe.',
  },
]
