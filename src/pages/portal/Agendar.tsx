import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { BARBEIROS, SERVICOS, fetchHorariosDisponiveis, criarAgendamento } from "../../data/mockData";
import type { Barbeiro, Servico } from "../../data/types";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS_SEMANA = ["D","S","T","Q","Q","S","S"];
type Horario = { hora: string; disponivel: boolean };

export default function Agendar() {
  const { cliente } = useAuth();
  const plano = cliente?.plano;

  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const fimPlano = plano?.ativo && plano?.fim ? new Date(plano.fim + "T23:59:59") : null;
  const limiteSemPlano = (() => {
    const d = new Date(hoje);
    const delta = (6 - d.getDay() + 7) % 7; // sábado da semana atual
    d.setDate(d.getDate() + delta);
    return d;
  })();
  // Limite de agendamento: fim do plano ou sábado da semana atual (sem plano)
  const limiteAgendamento = fimPlano ?? limiteSemPlano;
  const [mesAtual, setMesAtual]       = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [dataSel, setDataSel]         = useState<Date | null>(null);
  const [horarioSel, setHorarioSel]   = useState<string | null>(null);
  const [barbeiroSel, setBarbeiroSel] = useState<Barbeiro | null>(cliente?.barbeiroFavorito ?? null);
  const [servicoSel, setServicoSel]   = useState("");
  const [observacao, setObservacao]   = useState("");
  const [horarios, setHorarios]       = useState<Horario[]>([]);
  const [loadH, setLoadH]             = useState(false);
  const [confirmado, setConfirmado]   = useState(false);
  const [salvando, setSalvando]       = useState(false);

  useEffect(() => {
    if (!dataSel || !barbeiroSel) return;
    setLoadH(true); setHorarioSel(null);
    const iso = `${dataSel.getFullYear()}-${String(dataSel.getMonth()+1).padStart(2,"0")}-${String(dataSel.getDate()).padStart(2,"0")}`;
    fetchHorariosDisponiveis(barbeiroSel.id, iso).then(res => { setHorarios(res); setLoadH(false); });
  }, [dataSel, barbeiroSel]);

  useEffect(() => {
    if (dataSel && dataSel > limiteAgendamento) {
      setDataSel(null);
      setHorarioSel(null);
    }
  }, [dataSel, limiteAgendamento]);

  function celulasMes(): Array<Date | null> {
    const prim = new Date(mesAtual);
    const ult  = new Date(mesAtual.getFullYear(), mesAtual.getMonth()+1, 0);
    const cel  = [];
    for (let i = 0; i < prim.getDay(); i++) cel.push(null);
    for (let d = 1; d <= ult.getDate(); d++) cel.push(new Date(mesAtual.getFullYear(), mesAtual.getMonth(), d));
    return cel;
  }

  function disp(d: Date) { return d.getDay() !== 0 && d >= hoje && d <= limiteAgendamento; }
  function iso(d: Date)  { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }

  async function confirmar() {
    const serv = (SERVICOS as Servico[]).find(s => s.nome === servicoSel);
    if (!cliente || !barbeiroSel || !dataSel || !horarioSel) return;
    setSalvando(true);
    await criarAgendamento({ clienteId: cliente.id, barbeiroId: barbeiroSel.id, servicoId: serv?.id, data: iso(dataSel), hora: horarioSel, observacao });
    setSalvando(false); setConfirmado(true);
  }

  const podeContinuar = Boolean(dataSel && horarioSel && barbeiroSel && servicoSel);

  if (confirmado) {
    if (!barbeiroSel || !dataSel || !horarioSel) return null;
    const waMSG = encodeURIComponent(`Olá! Agendei pelo portal:\n*Barbeiro:* ${barbeiroSel.nome}\n*Data:* ${dataSel.toLocaleDateString("pt-BR")}\n*Horário:* ${horarioSel}\n*Serviço:* ${servicoSel}\n*Obs:* ${observacao||"Nenhuma"}`);
    return (
      <motion.div className="flex flex-col items-center text-center py-20 gap-5"
        initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}>
        <span className="text-6xl">✅</span>
        <h2 className="text-xl font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>AGENDADO!</h2>
        <p className="text-sm" style={{ color: COLORS.textBody, fontFamily: FONTS.body }}>
          {dataSel.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})} às {horarioSel}<br/>
          {servicoSel} com {barbeiroSel.nome}
        </p>
        <a href={`https://wa.me/5581986333846?text=${waMSG}`} target="_blank" rel="noopener noreferrer"
          className="px-8 py-3 text-[11px] font-bold tracking-widest"
          style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title, textDecoration:"none" }}>
          CONFIRMAR NO WHATSAPP
        </a>
        <button onClick={() => { setConfirmado(false); setDataSel(null); setHorarioSel(null); setServicoSel(""); setObservacao(""); }}
          className="text-[11px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
          Fazer outro agendamento
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.h1 className="text-2xl font-bold tracking-widest text-center mb-8"
        style={{ fontFamily: FONTS.title, color: COLORS.textLight }}
        initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        AGENDAMENTO
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}>

          <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
            ESCOLHA O DIA DO CORTE:
          </p>

          {!plano?.ativo && (
            <div className="mb-3 p-2.5 text-[10px] card-bg" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
              ℹ️ Sem plano: agenda abre toda <strong>terça-feira</strong>.
            </div>
          )}

          <div className="p-3 card-bg">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth()-1, 1))}
                className="w-7 h-7 flex items-center justify-center text-base transition-colors rounded"
                style={{ color: COLORS.textMutedDark }}
                onMouseEnter={e=>e.currentTarget.style.color = COLORS.gold} onMouseLeave={e=>e.currentTarget.style.color = COLORS.textMutedDark}>‹</button>
              <p className="text-[11px] font-bold tracking-[0.12em]" style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
                {MESES[mesAtual.getMonth()].substring(0,3).toUpperCase()} {mesAtual.getFullYear()}
              </p>
              <button onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth()+1, 1))}
                className="w-7 h-7 flex items-center justify-center text-base transition-colors rounded"
                style={{ color: COLORS.textMutedDark }}
                onMouseEnter={e=>e.currentTarget.style.color = COLORS.gold} onMouseLeave={e=>e.currentTarget.style.color = COLORS.textMutedDark}>›</button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-0.5">
              {DIAS_SEMANA.map((d,i) => (
                <div key={i} className="text-center text-[9px] py-0.5 font-semibold"
                  style={{ color: i===0 ? COLORS.textDisabled : COLORS.textMutedDarker, fontFamily: FONTS.body }}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {celulasMes().map((data, i) => {
                if (!data) return <div key={i} className="aspect-square" />;
                const ok  = disp(data);
                const sel = dataSel?.toDateString() === data.toDateString();
                return (
                  <button key={i} disabled={!ok} onClick={() => setDataSel(data)}
                    className="aspect-square flex items-center justify-center text-[11px] font-medium rounded-sm transition-all duration-150"
                    style={{
                      background: sel ? COLORS.gold : ok ? RGBA.gold(0.04) : "transparent",
                      color:      sel ? COLORS.dark : ok ? COLORS.textLight : COLORS.textMutedNearBlack,
                      border:     sel ? "none" : ok ? `1px solid ${RGBA.gold(0.08)}` : "none",
                      cursor:     ok ? "pointer" : "not-allowed",
                      fontFamily: FONTS.body,
                      textDecoration: data.getDay()===0 ? "line-through" : "none",
                    }}>
                    {data.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] font-bold tracking-widest mt-4 mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
            HORÁRIOS DISPONÍVEIS:
          </p>
          <div className="p-3 card-bg" style={{ minHeight:"72px" }}>
            {!dataSel ? (
              <p className="text-[10px] text-center py-3" style={{ color: COLORS.textDisabled, fontFamily: FONTS.body }}>Selecione uma data</p>
            ) : loadH ? (
              <p className="text-[10px] text-center py-3" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>Carregando...</p>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-1">
                {horarios.map(({ hora, disponivel }) => (
                  <button key={hora} disabled={!disponivel} onClick={() => setHorarioSel(hora)}
                    className="py-1.5 text-[10px] font-semibold rounded-sm transition-all"
                    style={{
                      background: horarioSel===hora ? COLORS.gold : disponivel ? RGBA.gold(0.05) : "transparent",
                      color:      horarioSel===hora ? COLORS.dark : disponivel ? COLORS.textLight : COLORS.textMutedAlmostBlack,
                      border:     horarioSel===hora ? "none" : disponivel ? `1px solid ${RGBA.gold(0.12)}` : "1px solid transparent",
                      cursor:     disponivel ? "pointer" : "not-allowed",
                      fontFamily: FONTS.body,
                      textDecoration: !disponivel ? "line-through" : "none",
                    }}>
                    {hora}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 }} className="space-y-5">

          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              ESCOLHA O BARBEIRO:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BARBEIROS.map(b => {
                const sel = barbeiroSel?.id === b.id;
                const fav = b.id === cliente?.barbeiroFavorito?.id;
                return (
                  <button key={b.id} onClick={() => setBarbeiroSel(b)}
                    className="py-2.5 text-[10px] font-bold tracking-wider transition-all duration-200 relative"
                    style={{
                      background: sel ? RGBA.gold(0.15) : RGBA.white(0.03),
                      border:     sel ? `1px solid ${RGBA.gold(0.5)}` : `1px solid ${RGBA.gold(0.12)}`,
                      color:      sel ? COLORS.gold : COLORS.textBody,
                      fontFamily: FONTS.title,
                    }}>
                    {b.nome.split(" ")[0].toUpperCase()}
                    {fav && !sel && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: COLORS.gold }} />}
                  </button>
                );
              })}
            </div>
            {barbeiroSel && (
              <p className="text-[10px] mt-1" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
                {barbeiroSel.cargo}{barbeiroSel.id === cliente?.barbeiroFavorito?.id && " · ✦ Favorito"}
              </p>
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              CORTE DESEJADO:
            </p>
            <div className="relative">
              <select value={servicoSel} onChange={e => setServicoSel(e.target.value)}
                className="w-full px-4 py-3 text-[11px] font-semibold tracking-widest outline-none appearance-none cursor-pointer"
                style={{ background: RGBA.white(0.04), border:`1px solid ${RGBA.gold(0.2)}`, color: servicoSel ? COLORS.textLight : COLORS.textMutedDarker, fontFamily: FONTS.title }}>
                <option value="" disabled>SELECIONE O CORTE:</option>
                {SERVICOS.map(s => {
                  const coberto = plano?.ativo && s.cobertosPlanos.includes(plano.id);
                  return <option key={s.id} value={s.nome}>{s.nome} — {coberto?"COBERTO PELO PLANO":`R$ ${s.preco}`}</option>;
                })}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]" style={{ color: COLORS.gold }}>▼</div>
            </div>
            {servicoSel && (() => {
              const s = SERVICOS.find(x => x.nome === servicoSel);
              const coberto = plano?.ativo && s?.cobertosPlanos.includes(plano.id);
              return (
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[9px] px-2 py-0.5 tracking-widest"
                    style={{ background: coberto ? RGBA.green(0.1) : RGBA.gold(0.08), color: coberto ? COLORS.accentGreen : COLORS.gold, fontFamily: FONTS.title }}>
                    {coberto?"✓ COBERTO PELO PLANO":`R$ ${s?.preco}`}
                  </span>
                  <span className="text-[10px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>⏱ {s?.duracao} min</span>
                </div>
              );
            })()}
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              OBSERVAÇÕES SOBRE O CORTE?
            </p>
            <textarea value={observacao} onChange={e => setObservacao(e.target.value)} rows={3}
              placeholder="Escreva observações sobre o corte:"
              className="w-full px-4 py-3 text-[11px] outline-none resize-none transition-all"
              style={{ background: RGBA.white(0.03), border:`1px solid ${RGBA.gold(0.12)}`, color: COLORS.textBody, fontFamily: FONTS.body }}
              onFocus={e=>e.target.style.borderColor = RGBA.gold(0.4)}
              onBlur={e=>e.target.style.borderColor = RGBA.gold(0.12)}
            />
          </div>

          <button disabled={!podeContinuar||salvando} onClick={confirmar}
            className="w-full py-3.5 text-[11px] font-bold tracking-[0.2em] transition-all duration-300"
            style={{
              background: podeContinuar ? GRADIENTS.goldFill : COLORS.darkBg,
              color:      podeContinuar ? COLORS.dark : COLORS.textDisabled,
              fontFamily: FONTS.title,
              cursor:     podeContinuar?"pointer":"not-allowed",
            }}>
            {salvando?"CONFIRMANDO...":"✓ CONFIRMAR AGENDAMENTO"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

