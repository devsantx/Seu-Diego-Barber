// ============================================================
// DADOS MOCK — Substituir pelas chamadas reais à API PHP
// ============================================================

import type {
  Barbeiro,
  Servico,
  PlanoMock,
  Cliente,
  AgendamentoCliente,
  HistoricoItem,
  HorarioDisponivel,
  AgendamentoPayload,
  LoginResponse,
  CadastroResponse,
} from "./types";

const delay = (ms = 400) => new Promise<void>(r => setTimeout(r, ms));

export const BARBEIROS: Barbeiro[] = [
  { id: 1, nome: "Diego",  cargo: "Fundador & Master Barber" },
  { id: 2, nome: "Erick",  cargo: "Barber Especialista" },
  { id: 3, nome: "Mikael", cargo: "Barber Especialista" },
  { id: 4, nome: "André",  cargo: "Barber Junior" },
];

export const SERVICOS: Servico[] = [
  { id: 1, nome: "Corte",                        preco: 35,  duracao: 30, cobertosPlanos: [1,2,3,4] },
  { id: 2, nome: "Corte + Barba",                preco: 55,  duracao: 45, cobertosPlanos: [1,2,3,4] },
  { id: 3, nome: "Corte + Bigode e Sobrancelha", preco: 50,  duracao: 40, cobertosPlanos: [2,3,4] },
  { id: 4, nome: "Barba",                        preco: 25,  duracao: 20, cobertosPlanos: [1,2,3,4] },
  { id: 5, nome: "Hidratação Capilar",           preco: 40,  duracao: 30, cobertosPlanos: [] },
];

export const PLANOS: PlanoMock[] = [
  { id: 1, nome: "Plano Essencial", preco: 85,  descricao: "1 corte a cada 7 dias, horários reservados" },
  { id: 2, nome: "Plano VIP",       preco: 100, descricao: "Corte + bigode/sobrancelha a cada 7 dias" },
  { id: 3, nome: "Plano Clássico",  preco: 120, descricao: "Corte + bigode/sobrancelha + 1 emergência" },
  { id: 4, nome: "Plano Premium",   preco: 150, descricao: "Corte + barba a cada 7 dias + 2 emergências" },
];

// ── Usuário COM plano ──────────────────────────────────────────
export const mockClienteComPlano: Cliente = {
  id: 1,
  nome: "Lucas Ferreira",
  telefone: "81987654321",
  dataNascimento: "1998-07-15",
  foto: null,
  endereco: "Rua das Flores, 42 — Boa Viagem, Recife/PE",
  barbeiroFavorito: { id: 1, nome: "Diego",  cargo: "Fundador & Master Barber" },
  servicoFavorito:  { id: 2, nome: "Corte + Barba", preco: 55 },
  plano: {
    id: 1, nome: "Plano Essencial",
    inicio: "2026-03-01", fim: "2026-03-31",
    cortesTotal: 4, cortesUsados: 2, ativo: true,
  },
  ultimoAgendamento: {
    id: 10, data: "2026-03-10", hora: "14:00",
    barbeiro: { id: 1, nome: "Diego" },
    servico:  { id: 2, nome: "Corte + Barba" },
    status: "concluido",
  },
};

// ── Usuário SEM plano ──────────────────────────────────────────
export const mockClienteSemPlano: Cliente = {
  id: 2,
  nome: "Carlos Souza",
  telefone: "81912345678",
  dataNascimento: "2000-03-22",
  foto: null,
  endereco: "Av. Boa Viagem, 500 — Recife/PE",
  barbeiroFavorito: { id: 2, nome: "Erick", cargo: "Barber Especialista" },
  servicoFavorito:  { id: 1, nome: "Corte", preco: 35 },
  plano: null,
  ultimoAgendamento: {
    id: 7, data: "2026-02-20", hora: "10:00",
    barbeiro: { id: 2, nome: "Erick" },
    servico:  { id: 1, nome: "Corte" },
    status: "concluido",
  },
};

// Histórico compartilhado para os dois usuários de teste
export const mockHistorico: HistoricoItem[] = [
  { id: 10, data: "2026-03-10", hora: "14:00", barbeiro: { nome: "Diego" },  servico: { nome: "Corte + Barba" },                valor: 0,  comPlano: true  },
  { id: 9,  data: "2026-03-03", hora: "10:00", barbeiro: { nome: "Diego" },  servico: { nome: "Corte + Barba" },                valor: 0,  comPlano: true  },
  { id: 8,  data: "2026-02-25", hora: "15:00", barbeiro: { nome: "Erick" },  servico: { nome: "Corte" },                        valor: 35, comPlano: false },
  { id: 7,  data: "2026-02-17", hora: "11:00", barbeiro: { nome: "Diego" },  servico: { nome: "Corte + Barba" },                valor: 55, comPlano: false },
  { id: 6,  data: "2026-02-10", hora: "09:00", barbeiro: { nome: "Diego" },  servico: { nome: "Corte + Barba" },                valor: 55, comPlano: false },
  { id: 5,  data: "2026-02-03", hora: "14:00", barbeiro: { nome: "Mikael" }, servico: { nome: "Corte + Bigode e Sobrancelha" }, valor: 50, comPlano: false },
];

const STORAGE_KEY = "sdb_agendamentos";

const mockAgendamentosPorCliente: Record<number, AgendamentoCliente[]> = {
  1: [
    {
      id: 101,
      data: "2026-03-26",
      hora: "15:30",
      barbeiro: { id: 1, nome: "Diego" },
      servico: { id: 2, nome: "Corte + Barba" },
      observacao: "Preferência por acabamento mais alinhado na barba.",
      status: "agendado",
    },
    {
      id: 102,
      data: "2026-03-29",
      hora: "10:00",
      barbeiro: { id: 1, nome: "Diego" },
      servico: { id: 1, nome: "Corte" },
      observacao: "",
      status: "agendado",
    },
  ],
  2: [],
};

function normalizarAgendamentoCliente(clienteId: number, agendamento: AgendamentoCliente) {
  return {
    ...agendamento,
    status: agendamento.status ?? "agendado",
    observacao: agendamento.observacao ?? "",
    barbeiro: agendamento.barbeiro ?? { id: 0, nome: "A definir" },
    servico: agendamento.servico ?? { id: 0, nome: "Corte" },
    id: agendamento.id ?? Math.floor(Math.random() * 1000) + clienteId * 100,
  };
}

function lerAgendamentosStorage(): Record<number, AgendamentoCliente[]> {
  if (typeof window === "undefined") return mockAgendamentosPorCliente;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return mockAgendamentosPorCliente;

  try {
    const parsed = JSON.parse(raw) as Record<string, AgendamentoCliente[]>;
    return Object.fromEntries(
      Object.entries(parsed).map(([clienteId, agendamentos]) => [
        Number(clienteId),
        (agendamentos ?? []).map(agendamento =>
          normalizarAgendamentoCliente(Number(clienteId), agendamento)
        ),
      ])
    );
  } catch {
    return mockAgendamentosPorCliente;
  }
}

function salvarAgendamentosStorage(data: Record<number, AgendamentoCliente[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function fetchAgendamentosCliente(clienteId: number): Promise<AgendamentoCliente[]> {
  const data = lerAgendamentosStorage();
  const agendamentos = data[clienteId] ?? mockAgendamentosPorCliente[clienteId] ?? [];
  return delay(250).then(() =>
    [...agendamentos].sort((a, b) =>
      `${a.data}T${a.hora}`.localeCompare(`${b.data}T${b.hora}`)
    )
  );
}

export async function fetchHorariosDisponiveis(barbeiroId: number, data: string): Promise<HorarioDisponivel[]> {
  await delay(300);
  const dia = new Date(data + "T12:00:00").getDay();
  const todos = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30"];
  const ocupados = dia === 6 ? ["09:00","10:30","14:00","15:30"] : ["09:30","11:00","14:30","16:00","17:00"];
  return todos.map(h => ({ hora: h, disponivel: !ocupados.includes(h) }));
}

export async function criarAgendamento(payload: AgendamentoPayload) {
  await delay(600);
  const servico = SERVICOS.find(item => item.id === payload.servicoId) ?? SERVICOS[0];
  const barbeiro = BARBEIROS.find(item => item.id === payload.barbeiroId) ?? BARBEIROS[0];
  const novoAgendamento: AgendamentoCliente = {
    id: Math.floor(Math.random() * 1000) + 100,
    data: payload.data,
    hora: payload.hora,
    barbeiro: { id: barbeiro.id, nome: barbeiro.nome },
    servico: { id: servico.id, nome: servico.nome },
    observacao: payload.observacao,
    status: "agendado",
  };

  const data = lerAgendamentosStorage();
  data[payload.clienteId] = [...(data[payload.clienteId] ?? []), novoAgendamento];
  salvarAgendamentosStorage(data);

  return { sucesso: true, agendamentoId: novoAgendamento.id, ...payload };
}

// Login: telefone "11111111111" = sem plano, qualquer outro + "1234" = com plano
export async function fazerLogin(telefone: string, senha: string): Promise<LoginResponse> {
  await delay(500);
  if (senha !== "1234") return { sucesso: false, erro: "Telefone ou senha incorretos." };
  const cliente = telefone === "81912345678" ? mockClienteSemPlano : mockClienteComPlano;
  return { sucesso: true, token: "mock-jwt-token", cliente };
}

export async function fazerCadastro(dados: { nome: string; telefone: string; senha: string }): Promise<CadastroResponse> {
  await delay(600);
  return { sucesso: true, token: "mock-jwt-token", cliente: { id: 99, ...dados, plano: null, barbeiroFavorito: null, servicoFavorito: null, ultimoAgendamento: null } };
}
