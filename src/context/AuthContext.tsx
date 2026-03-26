import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { fazerLogin, fazerCadastro } from "../data/mockData";
import type { Cliente, AuthContextValue, CadastroPayload, LoginResponse, CadastroResponse } from "../data/types";

const AuthContext = createContext<AuthContextValue | null>(null);

function atualizarAnoData(iso?: string | null) {
  if (!iso) return iso;
  return iso.startsWith("2025-") ? iso.replace(/^2025-/, "2026-") : iso;
}

function normalizarDatasCliente(cliente: Cliente | null) {
  if (!cliente) return cliente;
  const plano = cliente.plano
    ? { ...cliente.plano, inicio: atualizarAnoData(cliente.plano.inicio), fim: atualizarAnoData(cliente.plano.fim) }
    : cliente.plano;
  const ultimoAgendamento = cliente.ultimoAgendamento
    ? { ...cliente.ultimoAgendamento, data: atualizarAnoData(cliente.ultimoAgendamento.data) }
    : cliente.ultimoAgendamento;
  return { ...cliente, plano, ultimoAgendamento };
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [cliente, setCliente]           = useState<Cliente | null>(null);
  const [token, setToken]               = useState<string | null>(null);
  const [carregando, setCarregando]     = useState(true);

  // Restaura sessão salva ao recarregar a página
  useEffect(() => {
    const t = sessionStorage.getItem("sdb_token");
    const c = sessionStorage.getItem("sdb_cliente");
    localStorage.removeItem("sdb_token");
    localStorage.removeItem("sdb_cliente");
    if (t && c) {
      const normalizado = normalizarDatasCliente(JSON.parse(c));
      setToken(t);
      setCliente(normalizado);
      sessionStorage.setItem("sdb_cliente", JSON.stringify(normalizado));
    }
    setCarregando(false);
  }, []);

  async function login(telefone: string, senha: string) {
    const res = (await fazerLogin(telefone, senha)) as LoginResponse;
    if (res.sucesso) {
      setToken(res.token);
      setCliente(res.cliente);
      sessionStorage.setItem("sdb_token", res.token);
      sessionStorage.setItem("sdb_cliente", JSON.stringify(res.cliente));
    }
    return res;
  }

  async function cadastro(dados: CadastroPayload) {
    const res = (await fazerCadastro(dados)) as CadastroResponse;
    if (res.sucesso) {
      setToken(res.token);
      setCliente(res.cliente);
      sessionStorage.setItem("sdb_token", res.token);
      sessionStorage.setItem("sdb_cliente", JSON.stringify(res.cliente));
    }
    return res;
  }

  function logout() {
    setToken(null); setCliente(null);
    sessionStorage.removeItem("sdb_token");
    sessionStorage.removeItem("sdb_cliente");
  }

  // Atualiza os dados do cliente localmente após edição de perfil
  function atualizarCliente(novos: Partial<Cliente>) {
    if (!cliente) return;
    const at = { ...cliente, ...novos } as Cliente;
    setCliente(at);
    sessionStorage.setItem("sdb_cliente", JSON.stringify(at));
  }

  return (
    <AuthContext.Provider value={{ cliente, token, carregando, login, cadastro, logout, atualizarCliente }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
