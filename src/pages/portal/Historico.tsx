import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { mockHistorico } from "../../data/mockData";
import { COLORS, FONTS, RGBA } from "../../styles/theme";

function fmtData(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"numeric" });
}

export default function Historico() {
  const { cliente } = useAuth();

  const totalGasto  = mockHistorico.filter(a => !a.comPlano).reduce((s,a) => s + a.valor, 0);
  const totalCortes = mockHistorico.length;
  const comPlano    = mockHistorico.filter(a => a.comPlano).length;

  return (
    <div>
      <motion.h1 className="text-2xl font-bold tracking-widest text-center mb-8"
        style={{ fontFamily: FONTS.title, color: COLORS.textLight }}
        initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        HISTÓRICO DE CORTES
      </motion.h1>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label:"TOTAL DE CORTES",   valor: totalCortes },
          { label:"COM PLANO",         valor: comPlano },
          { label:"GASTO SEM PLANO",   valor: `R$ ${totalGasto}` },
          { label:"CORTES AVULSOS",    valor: totalCortes - comPlano },
        ].map((m,i) => (
          <motion.div key={m.label} className="p-3"
            style={{ background: RGBA.white(0.03), border:`1px solid ${RGBA.gold(0.1)}` }}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.07 }}>
            <p className="text-[9px] tracking-widest" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.title }}>{m.label}</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>{m.valor}</p>
          </motion.div>
        ))}
      </div>

      {/* Lista de cortes */}
      <div className="space-y-2">
        {mockHistorico.map((a, i) => (
          <motion.div key={a.id} className="flex items-center gap-4 p-4"
            style={{ background: RGBA.white(0.02), border:`1px solid ${RGBA.gold(0.07)}` }}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
              style={{ background: RGBA.green(0.08), border:`1px solid ${RGBA.green(0.15)}`, color: COLORS.accentGreen }}>✓</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>{a.servico.nome}</p>
              <p className="text-[10px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                {fmtData(a.data)} às {a.hora} · {a.barbeiro.nome}
              </p>
            </div>
            {a.comPlano
              ? <span className="text-[9px] px-2 py-0.5 flex-shrink-0" style={{ background: RGBA.green(0.1), color: COLORS.accentGreen, fontFamily: FONTS.title }}>PLANO</span>
              : <p className="text-[11px] font-semibold flex-shrink-0" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>R$ {a.valor}</p>
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
}
