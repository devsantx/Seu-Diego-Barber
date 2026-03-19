import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { PLANOS } from "../../data/mockData";
import { useLocation } from "react-router-dom";
import type { PlanoMock, PlanoCliente } from "../../data/types";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

// Modal de upgrade/assinatura de plano
type PlanoModalProps = {
  plano: PlanoMock;
  planoAtual: PlanoCliente | null | undefined;
  onClose: () => void;
};

function PlanoModal({ plano, planoAtual, onClose }: PlanoModalProps) {
  const isUpgrade  = planoAtual && plano.id > planoAtual.id;
  const isDowngrade = planoAtual && plano.id < planoAtual.id;
  const isAtual    = planoAtual?.id === plano.id;

  const waMSG = encodeURIComponent(
    isAtual
      ? `Olá! Gostaria de renovar o *${plano.nome}* da Seu Diego Barber.`
      : isUpgrade
      ? `Olá! Gostaria de fazer o upgrade do meu plano para o *${plano.nome}*.`
      : `Olá! Gostaria de saber mais sobre o *${plano.nome}* da Seu Diego Barber.`
  );

  const recursos: Record<number, string[]> = {
    1: ["1 corte a cada 7 dias","Horários reservados o mês todo","Agendamento prioritário","Dias exclusivos Seg–Qui","Vídeo game liberado"],
    2: ["Corte + Bigode e Sobrancelha a cada 7 dias","Horários reservados o mês todo","Agendamento prioritário","Dias exclusivos Seg–Qui","Vídeo game liberado","Desconto 10% em produtos"],
    3: ["Corte + Bigode e Sobrancelha a cada 7 dias","Horários reservados o mês todo","Agendamento prioritário","Dias exclusivos Seg–Sáb","Vídeo game liberado","Desconto 10% em produtos","1 emergência no mês"],
    4: ["Corte + Barba a cada 7 dias","Horários reservados o mês todo","Agendamento prioritário","Dias exclusivos Seg–Sáb","Vídeo game liberado","Desconto 10% em produtos","2 emergências no mês"],
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
      <div className="absolute inset-0" style={{ background: RGBA.black(0.85), backdropFilter:"blur(6px)" }} onClick={onClose} />
      <motion.div className="relative w-full max-w-sm overflow-hidden"
        style={{ background:"linear-gradient(160deg,#1e1e1e,#0d0d0d)", border:`1px solid ${RGBA.gold(0.3)}`, boxShadow:`0 25px 60px ${RGBA.black(0.7)}` }}
        initial={{ opacity:0, scale:0.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.9 }} transition={{ type:"spring", stiffness:300, damping:30 }}>
        <div className="h-[3px]" style={{ background: GRADIENTS.goldRail }} />
        <div className="px-6 py-5 border-b" style={{ borderColor: RGBA.gold(0.1) }}>
          <div className="flex items-start justify-between">
            <div>
              {isUpgrade && <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest mb-2" style={{ background: RGBA.green(0.15), color: COLORS.accentGreen, fontFamily: FONTS.title }}>UPGRADE</span>}
              {isAtual && <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest mb-2" style={{ background: RGBA.gold(0.15), color: COLORS.gold, fontFamily: FONTS.title }}>PLANO ATUAL</span>}
              <h3 className="text-base font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>{plano.nome}</h3>
              <p className="text-xs mt-1" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>{plano.descricao}</p>
            </div>
            <button onClick={onClose} className="text-lg ml-4 mt-1 transition-colors" style={{ color: COLORS.textDisabled }}
              onMouseEnter={e=>e.currentTarget.style.color=COLORS.gold} onMouseLeave={e=>e.currentTarget.style.color=COLORS.textDisabled}>✕</button>
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-1.5 mb-5">
            {(recursos[plano.id]||[]).map((r,i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[11px] flex-shrink-0 mt-[1px]" style={{ color: COLORS.gold }}>✓</span>
                <span className="text-[11px]" style={{ color: COLORS.textBody, fontFamily: FONTS.body }}>{r}</span>
              </div>
            ))}
          </div>
          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-2xl font-bold gradient-gold" style={{ fontFamily: FONTS.title }}>R$ {plano.preco}</span>
            <span className="text-xs" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>/mês</span>
          </div>
          <a href={`https://wa.me/5581986333846?text=${waMSG}`} target="_blank" rel="noopener noreferrer"
            className="w-full block text-center py-3 text-[11px] font-bold tracking-widest transition-all"
            style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title, textDecoration:"none" }}>
            {isAtual ? "RENOVAR PELO WHATSAPP" : isUpgrade ? "FAZER UPGRADE" : "ASSINAR PELO WHATSAPP"}
          </a>
          <p className="text-center text-[9px] mt-2" style={{ color: COLORS.textDisabled, fontFamily: FONTS.body }}>
            Você será redirecionado ao WhatsApp da barbearia
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Planos() {
  const { cliente }     = useAuth();
  const planoAtual      = cliente?.plano;
  const [modal, setModal] = useState<PlanoMock | null>(null);
  const { hash } = useLocation();

  // Métricas de economia para quem não tem plano
  const totalGasto = 195; // simulado

  useEffect(() => {
    if (hash === "#planos") {
      const alvo = document.getElementById("planos");
      if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash]);

  return (
    <div>
      <motion.h1 className="text-2xl font-bold tracking-widest text-center mb-3"
        style={{ fontFamily: FONTS.title, color: COLORS.textLight }}
        initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        SEU PLANO
      </motion.h1>

      {/* Card do plano atual */}
      {planoAtual?.ativo ? (
        <motion.div className="p-5 mb-7 relative overflow-hidden"
          style={{ background:"linear-gradient(135deg,#111,#141008)", border:`1px solid ${RGBA.gold(0.3)}` }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{ background:`radial-gradient(circle,${RGBA.gold(0.05)} 0%,transparent 70%)` }} />
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest mb-2"
                style={{ background: RGBA.gold(0.15), color: COLORS.gold, fontFamily: FONTS.title }}>PLANO ATIVO</span>
              <h3 className="text-lg font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>{planoAtual.nome}</h3>
              <p className="text-[11px] mt-1" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
                {planoAtual.cortesUsados}/{planoAtual.cortesTotal} cortes utilizados neste ciclo
              </p>
            </div>
            <button onClick={() => setModal(PLANOS.find(p => p.id === planoAtual.id))}
              className="px-4 py-2 text-[10px] font-bold tracking-widest transition-all"
              style={{ border:`1px solid ${RGBA.gold(0.35)}`, color: COLORS.gold, fontFamily: FONTS.title }}
              onMouseEnter={e=>e.currentTarget.style.background = RGBA.gold(0.08)}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              VER DETALHES
            </button>
          </div>
          <div className="mt-4 w-full h-1.5 rounded-full" style={{ background: RGBA.gold(0.1) }}>
            <div className="h-full rounded-full" style={{ width:`${(planoAtual.cortesUsados/planoAtual.cortesTotal)*100}%`, background:`linear-gradient(90deg,${COLORS.goldDark},${COLORS.gold})` }} />
          </div>
        </motion.div>
      ) : (
        <motion.div className="p-5 mb-7"
          style={{ background: RGBA.white(0.02), border:`1px dashed ${RGBA.gold(0.2)}` }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}>
          <h3 className="text-sm font-bold tracking-widest mb-2" style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
            Você ainda não tem um plano ativo
          </h3>
          <p className="text-[11px] mb-3" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
            Com base nos seus últimos cortes, você gastou <strong style={{ color: COLORS.gold }}>R$ {totalGasto}</strong> pagando avulso.
          </p>
          <div className="p-3" style={{ background: RGBA.green(0.06), border:`1px solid ${RGBA.green(0.15)}` }}>
            <p className="text-[11px]" style={{ color: COLORS.accentGreen, fontFamily: FONTS.body }}>
              💡 Com o Plano Essencial por <strong>R$ 85/mês</strong>, você já teria economizado nesse período!
            </p>
          </div>
        </motion.div>
      )}

      {/* Label */}
      <p id="planos" className="text-[10px] font-bold tracking-[0.25em] mb-4"
        style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
        {planoAtual?.ativo ? "FAZER UPGRADE / COMPARAR PLANOS:" : "PLANOS DISPONÍVEIS:"}
      </p>

      {/* Grid de planos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLANOS.map((p, i) => {
          const isAtual   = planoAtual?.id === p.id;
          const isUpgrade = planoAtual && p.id > planoAtual.id;
          return (
            <motion.div key={p.id}
              className="p-4 cursor-pointer transition-all duration-200 relative"
              style={{
                background: isAtual ? RGBA.gold(0.07) : RGBA.white(0.02),
                border:     isAtual ? `1px solid ${RGBA.gold(0.35)}` : `1px solid ${RGBA.gold(0.1)}`,
                boxShadow:  isUpgrade ? `0 0 20px ${RGBA.green(0.06)}` : "none",
              }}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.1 + i*0.07 }}
              whileHover={{ y:-2 }}
              onClick={() => setModal(p)}
            >
              {isUpgrade && (
                <div className="absolute -top-2.5 left-3 px-2 py-0.5 text-[8px] font-bold tracking-widest"
                  style={{ background: RGBA.green(0.9), color: COLORS.accentGreenDark, fontFamily: FONTS.title }}>
                  UPGRADE DISPONÍVEL ↑
                </div>
              )}
              {isAtual && (
                <div className="absolute -top-2.5 left-3 px-2 py-0.5 text-[8px] font-bold tracking-widest"
                  style={{ background: COLORS.gold, color: COLORS.dark, fontFamily: FONTS.title }}>
                  SEU PLANO ATUAL
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold tracking-widest"
                    style={{ color: isAtual ? COLORS.gold : COLORS.textLight, fontFamily: FONTS.title }}>{p.nome}</h4>
                  <p className="text-[10px] mt-0.5" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>{p.descricao}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-base font-bold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>R$ {p.preco}</p>
                  <p className="text-[9px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>/mês</p>
                </div>
              </div>
              <p className="text-[10px] mt-3 text-right tracking-wider" style={{ color: isAtual ? COLORS.gold : COLORS.goldDark, fontFamily: FONTS.title }}>
                {isAtual ? "VER DETALHES →" : isUpgrade ? "FAZER UPGRADE →" : "ASSINAR →"}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && <PlanoModal plano={modal} planoAtual={planoAtual} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
}
