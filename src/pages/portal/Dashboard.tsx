import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

function calcularIdade(dataNasc?: string | null) {
  if (!dataNasc) return null;
  const hoje = new Date();
  const nasc = new Date(dataNasc);
  let idade  = hoje.getFullYear() - nasc.getFullYear();
  const m    = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

function formatarData(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

type InfoLinhaProps = {
  label: string;
  valor?: string | null;
};

function InfoLinha({ label, valor }: InfoLinhaProps) {
  return (
    <div className="py-2.5 border-b" style={{ borderColor: RGBA.gold(0.06) }}>
      <p className="text-[10px] tracking-[0.2em] font-semibold mb-0.5"
        style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
        {label.toUpperCase()}
      </p>
      <p className="text-[12px]" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>
        {valor ?? "—"}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { cliente } = useAuth();
  const navigate    = useNavigate();

  const idade        = calcularIdade(cliente?.dataNascimento);
  const plano        = cliente?.plano;
  const cortesRestam = plano ? plano.cortesTotal - plano.cortesUsados : null;
  const ultimo       = cliente?.ultimoAgendamento;

  // Calcula dias restantes do plano a partir da data de vencimento
  let diasRestantes = null;
  if (plano?.fim) {
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const fimDia = new Date(plano.fim + "T23:59:59");
    const diff = fimDia - hoje;
    diasRestantes = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.3em]"
          style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
          SEU DIEGO BARBER
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-widest mt-1"
          style={{ fontFamily: FONTS.title, color: COLORS.textLight }}>
          OLÁ, {cliente?.nome?.split(" ")[0]?.toUpperCase() ?? "CLIENTE"}
        </h1>
        <div className="mx-auto mt-3 w-12 h-px"
          style={{ background: GRADIENTS.goldLineHorizontal }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <motion.div
          className="relative p-5 rounded-2xl"
          style={{
            background: `linear-gradient(180deg, ${RGBA.white(0.03)}, ${RGBA.black(0.35)})`,
            border: `1px solid ${RGBA.gold(0.15)}`,
            boxShadow: `0 18px 40px ${RGBA.black(0.45)}`,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center cursor-pointer group"
              style={{
                background: "linear-gradient(135deg, #1e1e1e, #2a2a2a)",
                border: `2px solid ${RGBA.gold(0.35)}`,
                boxShadow: `0 0 24px ${RGBA.gold(0.12)}`,
              }}
              onClick={() => navigate("/portal/perfil")}
            >
              {cliente?.foto ? (
                <img src={cliente.foto} alt="Foto de perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl select-none" style={{ color: RGBA.gold(0.2) }}>👤</span>
              )}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: RGBA.black(0.55) }}
              >
                <span className="text-[10px] tracking-widest" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>EDITAR</span>
              </div>
            </div>
          </div>

          <div className="pt-16 text-center">
            <p className="text-[11px] tracking-[0.25em]"
              style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
              PERFIL
            </p>
            <h2 className="text-lg font-bold tracking-widest mt-1"
              style={{ color: COLORS.textLight, fontFamily: FONTS.title }}>
              {cliente?.nome ?? "Cliente"}
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg text-center" style={{ background: RGBA.gold(0.06), border: `1px solid ${RGBA.gold(0.12)}` }}>
              <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>IDADE</p>
              <p className="text-[12px]" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>{idade ? `${idade} anos` : "—"}</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: RGBA.gold(0.06), border: `1px solid ${RGBA.gold(0.12)}` }}>
              <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>BARBEIRO</p>
              <p className="text-[12px]" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>{cliente?.barbeiroFavorito?.nome ?? "—"}</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: RGBA.gold(0.06), border: `1px solid ${RGBA.gold(0.12)}` }}>
              <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>CORTE</p>
              <p className="text-[12px]" style={{ color: COLORS.textLight, fontFamily: FONTS.body }}>{cliente?.servicoFavorito?.nome ?? "—"}</p>
            </div>
          </div>

          <div className="mt-4">
            <InfoLinha
              label="Data de nascimento"
              valor={cliente?.dataNascimento
                ? new Date(cliente.dataNascimento + "T12:00:00").toLocaleDateString("pt-BR")
                : "—"}
            />
            <InfoLinha label="Endereço" valor={cliente?.endereco} />
          </div>
        </motion.div>

        <div className="grid gap-4">
          <motion.div
            className="p-5 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(17,17,17,0.95) 60%, rgba(22,18,8,0.95))",
              border: `1px solid ${RGBA.gold(0.2)}`,
              boxShadow: `0 18px 40px ${RGBA.black(0.35)}`,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${RGBA.gold(0.06)} 0%, transparent 70%)` }} />

            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold tracking-[0.28em]"
                style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
                VIGÊNCIA DO SEU PLANO
              </p>
              {plano?.ativo && (
                <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest"
                  style={{ background: RGBA.gold(0.15), color: COLORS.gold, fontFamily: FONTS.title }}>
                  PLANO ATIVO
                </span>
              )}
            </div>

            {plano?.ativo ? (
              <div className="mt-3 flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-sm font-bold tracking-widest"
                    style={{ fontFamily: FONTS.title, color: COLORS.gold }}>
                    {plano.nome}
                  </h3>
                  <p className="text-[11px] mt-0.5" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
                    Válido até {formatarData(plano.fim)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>DIAS RESTANTES</p>
                  <p className="text-3xl font-bold"
                    style={{ color: diasRestantes <= 5 ? COLORS.accentRed : COLORS.gold, fontFamily: FONTS.title }}>
                    {diasRestantes ?? "—"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-[12px]" style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
                  Você não possui nenhum plano ativo.{" "}
                  <button
                    onClick={() => navigate("/portal/planos#planos")}
                    className="font-semibold transition-colors duration-200"
                    style={{ color: COLORS.gold }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  >
                    Ver planos disponíveis →
                  </button>
                </p>
              </div>
            )}

            {plano?.ativo && cortesRestam !== null && (
              <div className="mt-4">
                <div className="flex justify-between mb-1.5">
                  <p className="text-[10px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                    CORTES UTILIZADOS
                  </p>
                  <p className="text-[10px] font-semibold" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
                    {plano.cortesUsados}/{plano.cortesTotal}
                  </p>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: RGBA.gold(0.1) }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(plano.cortesUsados / plano.cortesTotal) * 100}%`,
                      background: `linear-gradient(90deg, ${COLORS.goldDark}, ${COLORS.gold})`,
                    }}
                  />
                </div>
                <p className="text-[10px] mt-1.5" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
                  {cortesRestam} {cortesRestam === 1 ? "corte restante" : "cortes restantes"} neste ciclo
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            className="p-5 rounded-2xl"
            style={{
              background: `linear-gradient(180deg, ${RGBA.white(0.02)}, ${RGBA.black(0.35)})`,
              border: `1px solid ${RGBA.gold(0.15)}`,
              boxShadow: `0 16px 36px ${RGBA.black(0.35)}`,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <p className="text-[10px] font-bold tracking-[0.28em] mb-3"
              style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
              ÚLTIMO AGENDAMENTO
            </p>

            {ultimo ? (
              <p className="text-[12px]" style={{ color: COLORS.textBody, fontFamily: FONTS.body, lineHeight: 1.7 }}>
                Seu último agendamento foi no dia{" "}
                <strong style={{ color: COLORS.gold }}>
                  {new Date(ultimo.data + "T12:00:00").toLocaleDateString("pt-BR")}
                </strong>{" "}
                às{" "}
                <strong style={{ color: COLORS.gold }}>{ultimo.hora}</strong>{" "}
                com o barbeiro{" "}
                <strong style={{ color: COLORS.gold }}>{ultimo.barbeiro.nome.split(" ")[0]}</strong>
                {" "}— {ultimo.servico.nome}.
              </p>
            ) : (
              <p className="text-[12px]" style={{ color: COLORS.textMutedDark, fontFamily: FONTS.body }}>
                Nenhum agendamento encontrado.
              </p>
            )}
          </motion.div>

          <motion.div
            className="p-5 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${RGBA.gold(0.12)}, ${RGBA.black(0.5)})`,
              border: `1px solid ${RGBA.gold(0.25)}`,
              boxShadow: `0 18px 40px ${RGBA.black(0.35)}`,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="text-[10px] font-bold tracking-[0.28em] mb-3"
              style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
              AGENDE O SEU PRÓXIMO CORTE
            </p>

            <p className="text-[12px] mb-4"
              style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
              {plano?.ativo
                ? `Você tem ${cortesRestam} corte(s) disponível(is) no plano. Agende agora para garantir seu horário!`
                : "Para agendar o seu próximo corte, clique abaixo para ser redirecionado."}
            </p>

            <button
              onClick={() => navigate("/portal/agendar")}
              className="px-8 py-2.5 text-[11px] font-bold tracking-[0.2em] transition-all duration-300"
              style={{
                background: GRADIENTS.goldFill,
                color: COLORS.dark,
                fontFamily: FONTS.title,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              AGENDAR
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
