import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import LogoFull from "../../components/LogoFull";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

function fmt(v: string) {
  const n = v.replace(/\D/g,"").slice(0,11);
  if (n.length <= 2) return `(${n}`;
  if (n.length <= 7) return `(${n.slice(0,2)}) ${n.slice(2)}`;
  return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
}

const inputStyle = {
  background: RGBA.white(0.06),
  border: `1px solid ${RGBA.gold(0.2)}`,
  color: COLORS.textLight,
  fontFamily: FONTS.body,
};

export default function Cadastro() {
  const { cadastro } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm] = useState({ nome: "", telefone: "", senha: "", confirmar: "" });
  const [erro, setErro]   = useState("");
  const [load, setLoad]   = useState(false);

  const set = (k: "nome" | "telefone" | "senha" | "confirmar", v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErro("");
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErro("");
    if (!form.nome.trim())                           { setErro("Informe seu nome completo."); return; }
    if (form.telefone.replace(/\D/g,"").length < 10) { setErro("Telefone inválido."); return; }
    if (form.senha.length < 6)                       { setErro("Senha deve ter ao menos 6 caracteres."); return; }
    if (form.senha !== form.confirmar)               { setErro("As senhas não coincidem."); return; }
    setLoad(true);
    const res = await cadastro({ nome: form.nome.trim(), telefone: form.telefone.replace(/\D/g,""), senha: form.senha });
    setLoad(false);
    if (res.sucesso) navigate("/portal");
    else setErro(res.erro ?? "Erro ao criar conta.");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">

      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <LogoFull className="w-32 sm:w-40" />
      </motion.div>

      <motion.div
        className="w-full max-w-[380px] overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a1a1a, #0d0d0d)", border: `1px solid ${RGBA.gold(0.25)}`, boxShadow: `0 24px 60px ${RGBA.black(0.7)}` }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        <div className="h-[2px]" style={{ background: GRADIENTS.goldRail }} />
        <div className="p-8">
          <h1 className="text-center text-lg font-bold tracking-[0.2em] mb-7"
            style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
            CRIAR CONTA
          </h1>

          <form onSubmit={submit} className="space-y-3">
            {[
              { key: "nome",      placeholder: "NOME COMPLETO",  type: "text",     val: form.nome,      fn: v => set("nome", v) },
              { key: "telefone",  placeholder: "TELEFONE (LOGIN)", type: "tel",   val: form.telefone,  fn: v => set("telefone", fmt(v)) },
              { key: "senha",     placeholder: "SENHA",           type: "password", val: form.senha,    fn: v => set("senha", v) },
              { key: "confirmar", placeholder: "CONFIRMAR SENHA", type: "password", val: form.confirmar, fn: v => set("confirmar", v) },
            ].map(f => (
              <input key={f.key} type={f.type} value={f.val} onChange={e => f.fn(e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = RGBA.gold(0.55)}
                onBlur={e  => e.target.style.borderColor = RGBA.gold(0.2)}
              />
            ))}

            {erro && (
              <p className="text-[11px] text-center py-2 px-3"
                style={{ color: COLORS.accentRed, background: RGBA.red(0.07), fontFamily: FONTS.body }}>
                {erro}
              </p>
            )}

            <button type="submit" disabled={load}
              className="w-full py-3.5 text-[11px] font-bold tracking-[0.22em] mt-1 transition-all"
              style={{ background: load ? RGBA.gold(0.4) : GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}>
              {load ? "CRIANDO..." : "CRIAR CONTA"}
            </button>
          </form>

          <p className="text-center text-[11px] mt-5" style={{ color: COLORS.textMutedDarker, fontFamily: FONTS.body }}>
            Já tem conta?{" "}
            <Link to="/entrar" className="font-semibold" style={{ color: COLORS.gold }}>Entrar</Link>
          </p>
        </div>
      </motion.div>

      <Link to="/" className="mt-6 block text-[10px] tracking-widest transition-colors"
        style={{ color: COLORS.textMutedDarkest, fontFamily: FONTS.body }}
        onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
        onMouseLeave={e => e.currentTarget.style.color = COLORS.textMutedDarkest}>
        ← VOLTAR AO SITE
      </Link>
    </div>
  );
}
