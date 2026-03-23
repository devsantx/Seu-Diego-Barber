export interface Plan {
  id: number;
  name: string;
  tagline: string;
  shortDesc: string;
  features: string[];
  price: string;
  period?: string;
  highlight: boolean;
  whatsappMsg: string;
  badge?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Barbeiro {
  id: number;
  nome: string;
  cargo: string;
}

export interface Servico {
  id: number;
  nome: string;
  preco: number;
  duracao?: number;
  cobertosPlanos?: number[];
}

export interface PlanoMock {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

export interface PlanoCliente {
  id: number;
  nome: string;
  inicio: string;
  fim: string;
  cortesTotal: number;
  cortesUsados: number;
  ativo: boolean;
}

export interface UltimoAgendamento {
  id: number;
  data: string;
  hora: string;
  barbeiro: { id: number; nome: string };
  servico: { id: number; nome: string };
  status: string;
}

export interface AgendamentoCliente {
  id: number;
  data: string;
  hora: string;
  barbeiro: { id: number; nome: string };
  servico: { id: number; nome: string };
  observacao?: string;
  status: "agendado" | "concluido" | "cancelado";
}

export interface HistoricoItem {
  id: number;
  data: string;
  hora: string;
  barbeiro: { nome: string };
  servico: { nome: string };
  valor: number;
  comPlano: boolean;
}

export interface HorarioDisponivel {
  hora: string;
  disponivel: boolean;
}

export interface AgendamentoPayload {
  clienteId: number;
  barbeiroId: number;
  servicoId?: number;
  data: string;
  hora: string;
  observacao: string;
}

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  dataNascimento?: string;
  foto: string | null;
  endereco?: string;
  barbeiroFavorito: Barbeiro | null;
  servicoFavorito: Servico | null;
  plano: PlanoCliente | null;
  ultimoAgendamento: UltimoAgendamento | null;
}

export interface CadastroPayload {
  nome: string;
  telefone: string;
  senha: string;
}

export type LoginResponse =
  | { sucesso: true; token: string; cliente: Cliente }
  | { sucesso: false; erro: string };

export type CadastroResponse =
  | { sucesso: true; token: string; cliente: Cliente }
  | { sucesso: false; erro?: string };

export interface AuthContextValue {
  cliente: Cliente | null;
  token: string | null;
  carregando: boolean;
  login: (telefone: string, senha: string) => Promise<LoginResponse>;
  cadastro: (dados: CadastroPayload) => Promise<CadastroResponse>;
  logout: () => void;
  atualizarCliente: (novos: Partial<Cliente>) => void;
}
