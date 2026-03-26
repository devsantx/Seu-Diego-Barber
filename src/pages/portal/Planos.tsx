import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PLANOS, mockHistorico } from "../../data/mockData";
import type { PlanoMock, PlanoCliente } from "../../data/types";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

const BENEFICIOS_EXTRAS: Record<number, string[]> = {
  1: ["1 corte a cada 7 dias", "Horarios reservados no mes", "Agendamento prioritario", "Dias exclusivos Seg-Qui", "Video game liberado"],
  2: ["Bigode e sobrancelha inclusos", "Desconto de 10% em produtos"],
  3: ["Dias exclusivos ate Sabado", "1 emergencia por mes"],
  4: ["Barba inclusa no corte", "2 emergencias por mes no total"],
};

const TODOS_BENEFICIOS: Record<number, string[]> = {
  1: BENEFICIOS_EXTRAS[1],
  2: [...BENEFICIOS_EXTRAS[1], ...BENEFICIOS_EXTRAS[2]],
  3: [...BENEFICIOS_EXTRAS[1], ...BENEFICIOS_EXTRAS[2], ...BENEFICIOS_EXTRAS[3]],
  4: [...BENEFICIOS_EXTRAS[1], ...BENEFICIOS_EXTRAS[2], ...BENEFICIOS_EXTRAS[3], ...BENEFICIOS_EXTRAS[4]],
};

function PlanoModal({ plano, planoAtual, onClose }: { plano: PlanoMock; planoAtual: PlanoCliente | null | undefined; onClose: () => void }) {
  const isUpgrade = !!planoAtual && plano.id > planoAtual.id;
  const isAtual = planoAtual?.id === plano.id;
  const ganhosMais = isUpgrade ? BENEFICIOS_EXTRAS[plano.id] ?? [] : [];

  const waMSG = encodeURIComponent(
    isAtual
      ? `Olá! Gostaria de renovar o *${plano.nome}*.`
      : isUpgrade
        ? `Olá! Gostaria de fazer upgrade do meu plano para o *${plano.nome}*.`
        : `Olá! Gostaria de assinar o *${plano.nome}*.`
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0" style={{ background: RGBA.black(0.85), backdropFilter: "blur(6px)" }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(160deg, var(--bg-card), color-mix(in srgb, var(--bg-section) 76%, transparent))", border: `1px solid ${RGBA.gold(0.3)}`, boxShadow: `0 25px 60px ${RGBA.black(0.35)}` }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-[3px]" style={{ background: GRADIENTS.goldRail }} />
        <div className="px-6 py-5 border-b" style={{ borderColor: RGBA.gold(0.1) }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              {isUpgrade && <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest mb-2" style={{ background: RGBA.green(0.15), color: COLORS.accentGreen, fontFamily: FONTS.title }}>UPGRADE</span>}
              {isAtual && <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest mb-2" style={{ background: RGBA.gold(0.15), color: COLORS.gold, fontFamily: FONTS.title }}>PLANO ATUAL</span>}
              <h3 className="text-base font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>{plano.nome}</h3>
              <p className="text-xs mt-1" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>{plano.descricao}</p>
            </div>
            <button onClick={onClose} className="text-lg transition-colors" style={{ color: COLORS.textDisabled }}>×</button>
          </div>
        </div>

        <div className="px-6 py-5">
          {isUpgrade && ganhosMais.length > 0 && (
            <div className="mb-4 p-3 rounded-xl" style={{ background: RGBA.green(0.06), border: `1px solid ${RGBA.green(0.2)}` }}>
              <p className="text-[10px] font-bold tracking-widest mb-2" style={{ color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                O QUE VOCE GANHA
              </p>
              <div className="space-y-1.5">
                {ganhosMais.map(item => (
                  <p key={item} className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                    + {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1.5 mb-5">
            {(TODOS_BENEFICIOS[plano.id] ?? []).map(item => (
              <p key={item} className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                • {item}
              </p>
            ))}
          </div>

          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-2xl font-bold gradient-gold" style={{ fontFamily: FONTS.title }}>R$ {plano.preco}</span>
            <span className="text-xs" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>/mes</span>
          </div>

          <a
            href={`https://wa.me/5581986333846?text=${waMSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-3 text-[11px] font-bold tracking-widest transition-all"
            style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title, textDecoration: "none" }}
          >
            {isAtual ? "RENOVAR PELO WHATSAPP" : isUpgrade ? "FAZER UPGRADE" : "ASSINAR PELO WHATSAPP"}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ResumoPlano({ titulo, valor, descricao }: { titulo: string; valor: string; descricao: string }) {
  return (
    <div className="p-4 rounded-2xl" style={{ background: "var(--bg-card)", border: `1px solid ${RGBA.gold(0.12)}`, boxShadow: `0 12px 28px ${RGBA.black(0.06)}` }}>
      <p className="text-[10px] font-bold tracking-[0.24em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>{titulo}</p>
      <p className="text-lg font-bold mt-2" style={{ color: "var(--text-primary)", fontFamily: FONTS.title }}>{valor}</p>
      <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>{descricao}</p>
    </div>
  );
}

export default function Planos() {
  const { cliente } = useAuth();
  const planoAtual = cliente?.plano;
  const [modal, setModal] = useState<PlanoMock | null>(null);
  const { hash } = useLocation();

  const avulsos = mockHistorico.filter(a => !a.comPlano);
  const valorMedioCorte = avulsos.length > 0 ? Math.round(avulsos.reduce((s, a) => s + a.valor, 0) / avulsos.length) : 55;
  const totalCortes = mockHistorico.length;
  const proximoPlano = planoAtual ? PLANOS.find(p => p.id === planoAtual.id + 1) ?? null : PLANOS[0];

  useEffect(() => {
    if (hash === "#planos") document.getElementById("planos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div>
      <motion.h1 className="text-2xl font-bold tracking-widest text-center mb-2" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        MEUS PLANOS
      </motion.h1>
      <motion.p className="text-center text-[11px] mb-8" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        Area do Cliente — Seu Diego Barber
      </motion.p>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <ResumoPlano
          titulo="PLANO ATUAL"
          valor={planoAtual?.ativo ? planoAtual.nome : "SEM ASSINATURA"}
          descricao={planoAtual?.ativo ? `${planoAtual.cortesUsados}/${planoAtual.cortesTotal} cortes utilizados no ciclo.` : "Compare as opcoes e escolha o formato ideal para sua rotina."}
        />
        <ResumoPlano
          titulo="GASTO MEDIO"
          valor={`R$ ${valorMedioCorte}`}
          descricao="Estimativa do corte avulso com base no historico usado para demonstracao no portal."
        />
        <ResumoPlano
          titulo="RECOMENDACAO"
          valor={proximoPlano?.nome ?? "PLANO ESSENCIAL"}
          descricao={planoAtual?.ativo ? "Proximo nivel sugerido para ampliar beneficios e flexibilidade." : "Melhor ponto de partida para garantir consistencia na agenda."}
        />
      </motion.div>

      {planoAtual?.ativo ? (
        <motion.div
          className="p-6 mb-7 relative overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(135deg, var(--bg-card), color-mix(in srgb, var(--bg-section) 58%, rgba(201,162,74,0.08)))", border: `1px solid ${RGBA.gold(0.3)}`, boxShadow: `0 18px 36px ${RGBA.black(0.1)}` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${RGBA.gold(0.05)} 0%, transparent 70%)` }} />

          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest mb-2" style={{ background: RGBA.gold(0.15), color: COLORS.gold, fontFamily: FONTS.title }}>PLANO ATIVO</span>
              <h3 className="text-lg font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>{planoAtual.nome}</h3>
              <p className="text-[11px] mt-1 max-w-xl" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                {planoAtual.cortesUsados}/{planoAtual.cortesTotal} cortes utilizados neste ciclo. Use este painel para acompanhar consumo e comparar upgrades.
              </p>
            </div>
            <button onClick={() => setModal(PLANOS.find(p => p.id === planoAtual.id) ?? null)} className="px-4 py-2 text-[10px] font-bold tracking-widest transition-all" style={{ border: `1px solid ${RGBA.gold(0.35)}`, color: COLORS.gold, fontFamily: FONTS.title }}>
              VER DETALHES
            </button>
          </div>

          {planoAtual.id < Math.max(...PLANOS.map(p => p.id)) && (() => {
            const proxPlano = PLANOS.find(p => p.id === planoAtual.id + 1);
            const diferencaMensal = proxPlano ? proxPlano.preco - (PLANOS.find(p => p.id === planoAtual.id)?.preco ?? 0) : 0;
            const beneficiosExtras = BENEFICIOS_EXTRAS[planoAtual.id + 1] ?? [];

            return proxPlano ? (
              <div className="mt-4 p-4 rounded-xl" style={{ background: RGBA.green(0.05), border: `1px solid ${RGBA.green(0.15)}` }}>
                <p className="text-[10px] font-bold tracking-widest mb-1" style={{ color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                  UPGRADE DISPONIVEL — {proxPlano.nome}
                </p>
                <p className="text-[11px] mb-3" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                  Por apenas <strong style={{ color: COLORS.accentGreen }}>+R$ {diferencaMensal}/mes</strong> voce ganha mais comodidade e beneficios extras.
                </p>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {beneficiosExtras.map(item => (
                    <p key={item} className="text-[10px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                      + {item}
                    </p>
                  ))}
                </div>
                <button onClick={() => setModal(proxPlano)} className="mt-4 px-4 py-2 text-[10px] font-bold tracking-widest transition-all" style={{ background: RGBA.green(0.1), border: `1px solid ${RGBA.green(0.3)}`, color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                  FAZER UPGRADE
                </button>
              </div>
            ) : null;
          })()}
        </motion.div>
      ) : (
        <motion.div
          className="p-6 mb-7 rounded-2xl"
          style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 95%, transparent), color-mix(in srgb, var(--bg-section) 65%, transparent))", border: `1px dashed ${RGBA.gold(0.25)}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm font-bold tracking-widest mb-2" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
            Voce ainda nao tem um plano ativo
          </p>
          <p className="text-[11px] mb-3 max-w-2xl" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
            Com base no historico de demonstracao, voce pagou <strong style={{ color: COLORS.gold }}>R$ {mockHistorico.filter(a => !a.comPlano).reduce((s, a) => s + a.valor, 0)}</strong> em cortes avulsos. Um plano faz mais sentido para quem quer previsibilidade e prioridade.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {PLANOS.map(p => {
              const econom = Math.max(0, Math.round(totalCortes * valorMedioCorte - p.preco * Math.ceil(totalCortes / 4)));
              return econom > 0 ? (
                <div key={p.id} className="p-3 rounded-xl flex items-center justify-between gap-3" style={{ background: RGBA.green(0.05), border: `1px solid ${RGBA.green(0.12)}` }}>
                  <span className="text-[10px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>{p.nome}</span>
                  <span className="text-[10px]" style={{ color: COLORS.accentGreen, fontFamily: FONTS.body }}>
                    Economizaria R$ {econom}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      )}

      <p id="planos" className="text-[10px] font-bold tracking-[0.25em] mb-4" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
        {planoAtual?.ativo ? "COMPARAR PLANOS / FAZER UPGRADE:" : "PLANOS DISPONIVEIS:"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLANOS.map((p, i) => {
          const isAtual = planoAtual?.id === p.id;
          const isUpgrade = !!planoAtual && p.id > planoAtual.id;
          const isAbaixo = !!planoAtual && p.id < planoAtual.id;
          const economiaSePlano = Math.max(0, Math.round(totalCortes * valorMedioCorte - p.preco * Math.ceil(totalCortes / 4)));

          return (
            <motion.div
              key={p.id}
              className="p-5 cursor-pointer transition-all relative rounded-2xl min-h-[230px] flex flex-col"
              style={{
                background: isAtual ? "color-mix(in srgb, var(--bg-card) 86%, rgba(201,162,74,0.08))" : "var(--bg-card)",
                border: isAtual ? `1px solid ${RGBA.gold(0.35)}` : `1px solid ${RGBA.gold(0.1)}`,
                opacity: isAbaixo ? 0.6 : 1,
                boxShadow: isAtual ? `0 16px 32px ${RGBA.gold(0.08)}` : `0 12px 26px ${RGBA.black(0.06)}`,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isAbaixo ? 0.6 : 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              whileHover={{ y: isAbaixo ? 0 : -2 }}
              onClick={() => setModal(p)}
            >
              {isUpgrade && (
                <div className="absolute -top-2.5 left-3 px-2 py-0.5 text-[8px] font-bold tracking-widest" style={{ background: RGBA.green(0.9), color: COLORS.accentGreenDark, fontFamily: FONTS.title }}>
                  UPGRADE DISPONIVEL
                </div>
              )}
              {isAtual && (
                <div className="absolute -top-2.5 left-3 px-2 py-0.5 text-[8px] font-bold tracking-widest" style={{ background: COLORS.gold, color: COLORS.dark, fontFamily: FONTS.title }}>
                  SEU PLANO ATUAL
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold tracking-widest" style={{ color: isAtual ? COLORS.gold : "var(--text-primary)", fontFamily: FONTS.title }}>{p.nome}</h4>
                  <p className="text-[10px] mt-1 leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>{p.descricao}</p>

                  {!planoAtual?.ativo && economiaSePlano > 0 && (
                    <p className="text-[10px] mt-2 font-semibold" style={{ color: COLORS.accentGreen, fontFamily: FONTS.body }}>
                      Economizaria R$ {economiaSePlano}
                    </p>
                  )}

                  <div className="mt-3 space-y-1">
                    {(isUpgrade ? BENEFICIOS_EXTRAS[p.id] ?? [] : TODOS_BENEFICIOS[p.id].slice(0, 2)).map(item => (
                      <p key={item} className="text-[9px] leading-relaxed" style={{ color: isUpgrade ? COLORS.accentGreen : "var(--text-body)", fontFamily: FONTS.body }}>
                        {isUpgrade ? "+ " : "• "}{item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-base font-bold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>R$ {p.preco}</p>
                  <p className="text-[9px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>/mes</p>
                </div>
              </div>

              <p className="text-[10px] mt-auto pt-5 text-right tracking-wider" style={{ color: isAtual ? COLORS.gold : isUpgrade ? COLORS.accentGreen : COLORS.goldDark, fontFamily: FONTS.title }}>
                {isAtual ? "VER DETALHES →" : isUpgrade ? "FAZER UPGRADE →" : isAbaixo ? "VER PLANO →" : "ASSINAR →"}
              </p>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {modal && <PlanoModal plano={modal} planoAtual={planoAtual} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
}
