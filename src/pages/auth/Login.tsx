import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import LogoFull from "../../components/LogoFull";
import ThemeToggle from "../../components/ThemeToggle";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

function fmt(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return `(${n}`;
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

const DEV_USERS = [
  { label: "Com Plano (Lucas)", tel: "(81) 98765-4321", senha: "1234" },
  { label: "Sem Plano (Carlos)", tel: "(81) 91234-5678", senha: "1234" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [load, setLoad] = useState(false);
  const [devOpen, setDevOpen] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    const t = tel.replace(/\D/g, "");

    if (t.length < 10) {
      setErro("Informe um telefone valido.");
      return;
    }

    if (!senha) {
      setErro("Informe sua senha.");
      return;
    }

    setLoad(true);
    const res = await login(t, senha);
    setLoad(false);

    if (res.sucesso) navigate("/portal");
    else setErro(res.erro);
  }

  function usarDevUser(u: { tel: string; senha: string }) {
    setTel(u.tel);
    setSenha(u.senha);
    setErro("");
    setDevOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-5 right-5">
        <ThemeToggle compact />
      </div>

      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <LogoFull className="w-36 sm:w-44" />
      </motion.div>

      <motion.div
        className="w-full max-w-[380px] overflow-hidden radius-panel"
        style={{
          background: "linear-gradient(160deg, var(--bg-card), color-mix(in srgb, var(--bg-section) 78%, transparent))",
          border: `1px solid ${RGBA.gold(0.25)}`,
          boxShadow: `0 24px 60px ${RGBA.black(0.28)}`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="h-[2px]" style={{ background: GRADIENTS.goldRail }} />
        <div className="p-8">
          <h1 className="text-center text-lg font-bold tracking-[0.2em] mb-7" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
            ACESSE SUA CONTA
          </h1>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="tel"
              value={tel}
              onChange={e => setTel(fmt(e.target.value))}
              placeholder="LOGIN"
              maxLength={15}
              className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 radius-control"
              style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.2)}`, color: "var(--text-primary)", fontFamily: FONTS.body }}
              onFocus={e => {
                e.target.style.borderColor = RGBA.gold(0.55);
              }}
              onBlur={e => {
                e.target.style.borderColor = RGBA.gold(0.2);
              }}
            />
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="SENHA"
              className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 radius-control"
              style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.2)}`, color: "var(--text-primary)", fontFamily: FONTS.body }}
              onFocus={e => {
                e.target.style.borderColor = RGBA.gold(0.55);
              }}
              onBlur={e => {
                e.target.style.borderColor = RGBA.gold(0.2);
              }}
            />

            {erro && (
              <p className="text-[11px] text-center py-2 px-3 radius-control" style={{ color: COLORS.accentRed, background: RGBA.red(0.07), fontFamily: FONTS.body }}>
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={load}
              className="w-full py-3.5 text-[11px] font-bold tracking-[0.22em] transition-all duration-300 mt-1 radius-control"
              style={{
                background: load ? RGBA.gold(0.4) : GRADIENTS.goldFill,
                color: COLORS.dark,
                fontFamily: FONTS.title,
                cursor: load ? "not-allowed" : "pointer",
              }}
            >
              {load ? "ENTRANDO..." : "ENTRAR"}
            </button>
          </form>

          <p className="text-center text-[10px] mt-4 tracking-widest cursor-pointer transition-colors" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
            ESQUECEU A SENHA?
          </p>

          <div className="mt-5 radius-control overflow-hidden" style={{ border: `1px solid ${RGBA.gold(0.1)}` }}>
            <button
              onClick={() => setDevOpen(!devOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-[10px] font-semibold tracking-widest transition-all"
              style={{ background: RGBA.gold(0.04), color: "var(--text-muted)", fontFamily: FONTS.title }}
            >
              <span>MODO DESENVOLVIMENTO</span>
              <motion.span animate={{ rotate: devOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-[8px]">
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {devOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 space-y-2">
                    <p className="text-[10px] text-center mb-2" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                      Clique para preencher automaticamente:
                    </p>
                    {DEV_USERS.map((u, i) => (
                      <button
                        key={i}
                        onClick={() => usarDevUser(u)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-all duration-200 radius-control"
                        style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.1)}` }}
                      >
                        <div>
                          <p className="text-[10px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
                            {u.label}
                          </p>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                            Tel: {u.tel} · Senha: {u.senha}
                          </p>
                        </div>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>→</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-[11px] mt-5" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
            Nao tem conta? <Link to="/cadastro" className="font-semibold" style={{ color: COLORS.gold }}>Criar conta</Link>
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Link to="/" className="mt-6 block text-[10px] tracking-widest transition-colors" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
          ← VOLTAR AO SITE
        </Link>
      </motion.div>
    </div>
  );
}
