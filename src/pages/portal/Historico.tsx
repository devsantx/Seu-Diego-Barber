// Área do Cliente — Histórico de cortes com métricas de economia.

import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { mockHistorico, PLANOS } from "../../data/mockData";
import { COLORS, FONTS, RGBA } from "../../styles/theme";

function fmtData(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"numeric" });
}

export default function Historico() {
  const { cliente } = useAuth();
  const planoAtual  = cliente?.plano;

  // ── Cálculos de economia ──
  const totalCortes    = mockHistorico.length;
  const gastosAvulsos  = mockHistorico.filter(a => !a.comPlano).reduce((s, a) => s + a.valor, 0);
  const cortesComPlano = mockHistorico.filter(a => a.comPlano).length;
  const cortesAvulsos  = mockHistorico.filter(a => !a.comPlano);

  // Valor médio cobrado por corte avulso
  const valorMedioCorte = cortesAvulsos.length > 0
    ? Math.round(cortesAvulsos.reduce((s, a) => s + a.valor, 0) / cortesAvulsos.length)
    : 55;

  // Economia real: cortes feitos com plano × valor médio do corte avulso − custo do plano
  const economiaMensal = planoAtual?.ativo
    ? Math.max(0, Math.round(cortesComPlano * valorMedioCorte - (PLANOS.find(p => p.id === planoAtual.id)?.preco ?? 0)))
    : 0;

  // Simulação: se não tem plano ou está no plano mais básico,
  // calcular quanto economizaria no melhor plano custo/benefício (Essencial)
  const planoEssencial = PLANOS.find(p => p.nome.includes("Essencial"));
  const economiaPotencial = planoEssencial
    ? Math.max(0, Math.round(totalCortes * valorMedioCorte - planoEssencial.preco))
    : 0;

  // Simulação: economia se tivesse o plano atual desde o início
  const economiaTotal = planoAtual?.ativo
    ? Math.max(0, Math.round(
        mockHistorico.length * valorMedioCorte -
        ((PLANOS.find(p => p.id === planoAtual.id)?.preco ?? 0) * Math.ceil(mockHistorico.length / 4))
      ))
    : 0;

  return (
    <div>
      <motion.h1 className="text-2xl font-bold tracking-widest text-center mb-2"
        style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        HISTÓRICO DE CORTES
      </motion.h1>
      <motion.p className="text-center text-[11px] mb-8"
        style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        Área do Cliente — Seu Diego Barber
      </motion.p>

      {/* ── Métricas rápidas ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "TOTAL DE CORTES",  valor: totalCortes,        cor: COLORS.gold },
          { label: "COM PLANO",        valor: cortesComPlano,      cor: COLORS.accentGreen },
          { label: "AVULSOS",          valor: totalCortes - cortesComPlano, cor: COLORS.gold },
          { label: "GASTO AVULSO",     valor: `R$ ${gastosAvulsos}`, cor: "#ff9a4a" },
        ].map((m, i) => (
          <motion.div key={m.label} className="p-3 card-bg"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <p className="text-[9px] tracking-widest" style={{ color: "var(--text-muted)", fontFamily: FONTS.title }}>{m.label}</p>
            <p className="text-base font-bold mt-0.5" style={{ color: m.cor, fontFamily: FONTS.title }}>{m.valor}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Bloco de economia ── */}
      {planoAtual?.ativo ? (
        <motion.div className="p-5 mb-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--bg-card), rgba(107,196,107,0.05))", border: `1px solid ${RGBA.green(0.25)}` }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${RGBA.green(0.08)} 0%, transparent 70%)` }} />
          <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: COLORS.accentGreen, fontFamily: FONTS.title }}>
            💰 SUA ECONOMIA COM O PLANO
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>Economia este ciclo</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                R$ {economiaMensal}
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                {cortesComPlano} cortes × R$ {valorMedioCorte} − plano
              </p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>Economia total estimada</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                R$ {Math.max(0, economiaTotal)}
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                Se tivesse com plano desde o início
              </p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>Pagaria avulso</p>
              <p className="text-2xl font-bold" style={{ color: "#ff9a4a", fontFamily: FONTS.title }}>
                R$ {totalCortes * valorMedioCorte}
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                {totalCortes} cortes × R$ {valorMedioCorte} (avulso)
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div className="p-5 mb-6"
          style={{ background: "var(--bg-card)", border: `1px dashed ${RGBA.gold(0.25)}` }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
            💡 QUANTO VOCÊ PODERIA ECONOMIZAR?
          </p>
          <p className="text-[12px] mb-3" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
            Você gastou <strong style={{ color: "#ff9a4a" }}>R$ {gastosAvulsos}</strong> pagando{" "}
            {totalCortes} cortes avulsos. Com um plano, a conta seria bem diferente:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {PLANOS.map(p => {
              const economiaSePlano = Math.max(0, Math.round(totalCortes * valorMedioCorte - p.preco * Math.ceil(totalCortes / 4)));
              return (
                <div key={p.id} className="p-3 radius-control"
                  style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.12)}` }}>
                  <p className="text-[10px] font-bold tracking-wider" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>{p.nome}</p>
                  <p className="text-[10px] mb-1" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>{p.descricao}</p>
                  {economiaSePlano > 0 ? (
                    <p className="text-[11px] font-semibold" style={{ color: COLORS.accentGreen, fontFamily: FONTS.body }}>
                      ✓ Economia de <strong>R$ {economiaSePlano}</strong>
                    </p>
                  ) : (
                    <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                      Para maior frequência de cortes
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {economiaPotencial > 0 && (
            <div className="p-3 radius-control" style={{ background: RGBA.green(0.07), border: `1px solid ${RGBA.green(0.2)}` }}>
              <p className="text-[11px]" style={{ color: COLORS.accentGreen, fontFamily: FONTS.body }}>
                💚 Com o <strong>Plano Essencial</strong> você teria economizado{" "}
                <strong>R$ {economiaPotencial}</strong> no total!
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* ── Lista de cortes ── */}
      <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
        TODOS OS CORTES
      </p>
      <div className="space-y-2">
        {mockHistorico.map((a, i) => (
          <motion.div key={a.id} className="flex items-center gap-4 p-4 card-bg"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
              style={{ background: RGBA.green(0.08), border: `1px solid ${RGBA.green(0.15)}`, color: COLORS.accentGreen }}>✓</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>{a.servico.nome}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                {fmtData(a.data)} às {a.hora} · {a.barbeiro.nome}
              </p>
            </div>
            {a.comPlano
              ? <span className="text-[9px] px-2 py-0.5 flex-shrink-0"
                  style={{ background: RGBA.green(0.1), color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                  PLANO
                </span>
              : <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>R$ {a.valor}</p>
                  <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>avulso</p>
                </div>
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
}
