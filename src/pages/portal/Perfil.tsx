import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { mockHistorico } from "../../data/mockData";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

function fmtData(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"numeric" });
}

function calcIdade(nasc?: string | null) {
  if (!nasc) return null;
  const h=new Date(), n=new Date(nasc+"T12:00:00");
  let a=h.getFullYear()-n.getFullYear();
  if(h.getMonth()<n.getMonth()||(h.getMonth()===n.getMonth()&&h.getDate()<n.getDate())) a--;
  return a;
}

type CampoInfoProps = {
  label: string;
  valor?: string | null;
};

function CampoInfo({ label, valor }: CampoInfoProps) {
  return (
    <div className="py-2 border-b" style={{ borderColor: RGBA.gold(0.07) }}>
      <p className="text-[9px] font-bold tracking-widest" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>{label}</p>
      <p className="text-[11px] mt-0.5" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>{valor ?? "—"}</p>
    </div>
  );
}

export default function Perfil() {
  const { cliente, atualizarCliente } = useAuth();
  const fotoRef = useRef<HTMLInputElement | null>(null);

  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [ok, setOk]             = useState(false);
  const [foto, setFoto]         = useState(cliente?.foto ?? null);

  const [form, setForm] = useState({
    nome:           cliente?.nome ?? "",
    dataNascimento: cliente?.dataNascimento ?? "",
    endereco:       cliente?.endereco ?? "",
  });
  type FormState = typeof form;

  // Métricas de barbeiro favorito
  const contBarbeiros = mockHistorico.reduce<Record<string, number>>((acc, a) => {
    acc[a.barbeiro.nome] = (acc[a.barbeiro.nome]||0)+1; return acc;
  }, {});
  const [bTop, qtd] = Object.entries(contBarbeiros).sort((a,b)=>b[1]-a[1])[0] ?? ["—",0];
  const contServicos = mockHistorico.filter(a=>a.barbeiro.nome===bTop).reduce<Record<string, number>>((acc,a)=>{
    acc[a.servico.nome]=(acc[a.servico.nome]||0)+1; return acc;
  },{});
  const [sTop] = Object.entries(contServicos).sort((a,b)=>b[1]-a[1])[0] ?? ["—"];

  const ultimosCortes = mockHistorico.slice(0, 3);
  const idade = calcIdade(cliente?.dataNascimento);

  function handleFoto(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      const result = ev.target?.result ?? null;
      setFoto(result as string | null);
      atualizarCliente({ foto: result as string | null });
    };
    r.readAsDataURL(f);
  }

  async function salvar() {
    setSalvando(true);
    await new Promise(r => setTimeout(r, 500));
    atualizarCliente(form);
    setSalvando(false); setEditando(false); setOk(true);
    setTimeout(() => setOk(false), 3000);
  }

  return (
    <div>
      <motion.h1 className="text-2xl font-bold tracking-widest text-center mb-8"
        style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}
        initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        PERFIL
      </motion.h1>

      {ok && (
        <div className="mb-5 p-3 text-[11px] text-center"
          style={{ background: RGBA.green(0.07), border:`1px solid ${RGBA.green(0.2)}`, color: COLORS.accentGreen, fontFamily: FONTS.body }}>
          ✅ Dados salvos com sucesso!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* COLUNA ESQUERDA */}
        <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}>
          <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
            HISTÓRICO DE CORTES:
          </p>
          <div className="space-y-2 mb-6">
            {ultimosCortes.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3"
                style={{ background: "var(--bg-input)", border:`1px solid ${RGBA.gold(0.07)}` }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]"
                  style={{ background: RGBA.green(0.08), border:`1px solid ${RGBA.green(0.15)}`, color: COLORS.accentGreen }}>✓</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>{a.servico.nome}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>{fmtData(a.data)} · {a.barbeiro.nome}</p>
                </div>
                {a.comPlano
                  ? <span className="text-[9px] px-1.5 py-0.5 flex-shrink-0" style={{ background: RGBA.green(0.1), color: COLORS.accentGreen, fontFamily: FONTS.title }}>PLANO</span>
                  : <p className="text-[11px] font-semibold flex-shrink-0" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>R$ {a.valor}</p>
                }
              </div>
            ))}
          </div>

          <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
            BARBEIRO FAVORITO:
          </p>
          <div className="flex items-start gap-4 p-4"
            style={{ background: "var(--bg-input)", border:`1px solid ${RGBA.gold(0.12)}` }}>
            <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: RGBA.gold(0.06), border:`1px solid ${RGBA.gold(0.15)}` }}>
              <span className="text-xl opacity-30">✂️</span>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
                {bTop.toUpperCase()}
              </p>
              <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                Você já cortou com <strong style={{ color: COLORS.gold }}>{bTop}</strong>{" "}
                <strong style={{ color: COLORS.gold }}>{qtd}</strong>{" "}
                {qtd===1?"vez":"vezes"} e o seu corte preferido é o{" "}
                <strong style={{ color: COLORS.gold }}>{sTop}</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* COLUNA DIREITA */}
        <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold tracking-widest" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              INFORMAÇÕES PESSOAIS:
            </p>
            {!editando && (
              <button onClick={() => setEditando(true)}
                className="text-[10px] font-semibold tracking-wider flex items-center gap-1 px-3 py-1.5 transition-all"
                style={{ border:`1px solid ${RGBA.gold(0.25)}`, color: COLORS.gold, fontFamily: FONTS.body }}
                onMouseEnter={e=>e.currentTarget.style.background = RGBA.gold(0.07)}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                EDITAR ✎
              </button>
            )}
          </div>

          <div className="p-5" style={{ background: "var(--bg-input)", border:`1px solid ${RGBA.gold(0.1)}` }}>
            {/* Foto */}
            <div className="flex justify-center mb-5">
              <div className="relative cursor-pointer group" onClick={() => fotoRef.current?.click()}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                  style={{ background: RGBA.gold(0.06), border:`2px solid ${RGBA.gold(0.2)}` }}>
                  {foto
                    ? <img src={foto} alt="Foto" className="w-full h-full object-cover" />
                    : <span className="text-3xl opacity-30">👤</span>
                  }
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    style={{ background: RGBA.black(0.5) }}>
                    <span className="text-sm">📷</span>
                  </div>
                </div>
                <input ref={fotoRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />
              </div>
            </div>

            {editando ? (
              <div className="space-y-3">
                {[
                  { key:"nome",           label:"NOME COMPLETO",    type:"text", ph:"Seu nome" },
                  { key:"dataNascimento", label:"DATA DE NASCIMENTO", type:"date", ph:"" },
                  { key:"endereco",       label:"ENDEREÇO",          type:"text", ph:"Rua, número — Bairro" },
                ].map(c => (
                  <div key={c.key}>
                    <label className="block text-[9px] font-bold tracking-widest mb-1"
                      style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>{c.label}</label>
                    <input type={c.type} value={form[c.key as keyof FormState]} onChange={e => setForm(f=>({...f,[c.key]:e.target.value}))}
                      placeholder={c.ph}
                      className="w-full px-3 py-2.5 text-[11px] outline-none transition-all"
                      style={{ background: "var(--bg-input)", border:`1px solid ${RGBA.gold(0.18)}`, color: "var(--text-primary)", fontFamily: FONTS.body }}
                      onFocus={e=>e.target.style.borderColor = RGBA.gold(0.5)}
                      onBlur={e=>e.target.style.borderColor = RGBA.gold(0.18)}
                    />
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <button onClick={salvar} disabled={salvando}
                    className="flex-1 py-2.5 text-[10px] font-bold tracking-widest"
                    style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}>
                    {salvando?"SALVANDO...":"SALVAR"}
                  </button>
                  <button onClick={() => setEditando(false)}
                    className="px-4 py-2.5 text-[10px] font-semibold"
                    style={{ border:`1px solid ${RGBA.gold(0.2)}`, color: "var(--text-muted)", fontFamily: FONTS.body }}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <CampoInfo label="NOME"               valor={cliente?.nome} />
                <CampoInfo label="IDADE"              valor={idade ? `${idade} anos` : "—"} />
                <CampoInfo label="DATA DE NASCIMENTO" valor={fmtData(cliente?.dataNascimento)} />
                <CampoInfo label="BARBEIRO"           valor={cliente?.barbeiroFavorito?.nome} />
                <CampoInfo label="CORTE"              valor={cliente?.servicoFavorito?.nome} />
                <CampoInfo label="ENDEREÇO"           valor={cliente?.endereco} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
