import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAgendamentosCliente } from "../../data/mockData";
import type { AgendamentoCliente } from "../../data/types";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

function calcularIdade(dataNasc?: string | null) {
  if (!dataNasc) return null;
  const hoje = new Date();
  const nasc = new Date(dataNasc);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade -= 1;
  return idade;
}

function formatarDataCompleta(iso?: string | null) {
  if (!iso) return "—";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatarData(iso?: string | null) {
  if (!iso) return "—";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR");
}

function diasAte(iso: string, hora: string) {
  const agora = new Date();
  const data = new Date(`${iso}T${hora}:00`);
  const diff = data.getTime() - agora.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function InfoLinha({ label, valor }: { label: string; valor?: string | null }) {
  return (
    <div className="py-2.5 border-b" style={{ borderColor: RGBA.gold(0.06) }}>
      <p className="text-[10px] tracking-[0.2em] font-semibold mb-0.5" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
        {label.toUpperCase()}
      </p>
      <p className="text-[12px]" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>
        {valor ?? "—"}
      </p>
    </div>
  );
}

function ResumoCard({ label, valor, detalhe }: { label: string; valor: string; detalhe: string }) {
  return (
    <div
      className="p-4 radius-panel"
      style={{
        background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 94%, transparent), color-mix(in srgb, var(--bg-section) 58%, transparent))",
        border: `1px solid ${RGBA.gold(0.12)}`,
        boxShadow: `0 12px 28px ${RGBA.black(0.08)}`,
      }}
    >
      <p className="text-[10px] font-bold tracking-[0.24em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
        {label}
      </p>
      <p className="text-lg font-bold mt-2" style={{ color: "var(--text-primary)", fontFamily: FONTS.title }}>
        {valor}
      </p>
      <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
        {detalhe}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { cliente } = useAuth();
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState<AgendamentoCliente[]>([]);
  const [carregandoAgendamentos, setCarregandoAgendamentos] = useState(true);

  const idade = calcularIdade(cliente?.dataNascimento);
  const plano = cliente?.plano;
  const cortesRestam = plano ? plano.cortesTotal - plano.cortesUsados : null;
  const ultimo = cliente?.ultimoAgendamento;

  useEffect(() => {
    if (!cliente) return;
    setCarregandoAgendamentos(true);
    fetchAgendamentosCliente(cliente.id).then(res => {
      setAgendamentos(res);
      setCarregandoAgendamentos(false);
    });
  }, [cliente]);

  const proximosAgendamentos = useMemo(
    () =>
      agendamentos.filter(item => {
        const dataHora = new Date(`${item.data}T${item.hora}:00`);
        return item.status === "agendado" && dataHora >= new Date();
      }),
    [agendamentos]
  );

  const proximoAgendamento = proximosAgendamentos[0] ?? null;

  let diasRestantes = null;
  if (plano?.fim) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const diff = new Date(`${plano.fim}T23:59:59`).getTime() - hoje.getTime();
    diasRestantes = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="space-y-8">
      <motion.div className="text-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-[10px] tracking-[0.3em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.body }}>
          AREA DO CLIENTE
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-widest mt-1" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
          OLA, {cliente?.nome?.split(" ")[0]?.toUpperCase() ?? "CLIENTE"}
        </h1>
        <div className="mx-auto mt-3 w-12 h-px" style={{ background: GRADIENTS.goldLineHorizontal }} />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
      >
        <ResumoCard
          label="PROXIMO HORARIO"
          valor={proximoAgendamento ? `${formatarData(proximoAgendamento.data)} - ${proximoAgendamento.hora}` : "SEM RESERVA"}
          detalhe={
            proximoAgendamento
              ? `${proximoAgendamento.servico.nome} com ${proximoAgendamento.barbeiro.nome}`
              : "Assim que um horario for confirmado ele aparece aqui."
          }
        />
        <ResumoCard
          label="STATUS DO PLANO"
          valor={plano?.ativo ? plano.nome : "SEM PLANO ATIVO"}
          detalhe={
            plano?.ativo
              ? `${cortesRestam ?? 0} corte(s) restante(s) e validade ate ${formatarData(plano.fim)}`
              : "Voce pode contratar um plano para ter prioridade e agenda recorrente."
          }
        />
        <ResumoCard
          label="PREFERENCIA"
          valor={cliente?.barbeiroFavorito?.nome ?? "SEM DEFINICAO"}
          detalhe={cliente?.servicoFavorito?.nome ? `Servico mais recorrente: ${cliente.servicoFavorito.nome}` : "Defina seus dados para personalizar o atendimento."}
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className="relative p-5 radius-panel"
          style={{
            background: "linear-gradient(180deg, var(--bg-card), color-mix(in srgb, var(--bg-section) 65%, transparent))",
            border: `1px solid ${RGBA.gold(0.15)}`,
            boxShadow: `0 18px 40px ${RGBA.black(0.12)}`,
          }}
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center cursor-pointer group"
              style={{
                background: "linear-gradient(135deg, #f7e8c7, #edd39b)",
                border: `2px solid ${RGBA.gold(0.35)}`,
                boxShadow: `0 0 24px ${RGBA.gold(0.12)}`,
              }}
              onClick={() => navigate("/portal/perfil")}
            >
              {cliente?.foto ? <img src={cliente.foto} alt="Foto" className="w-full h-full object-cover" /> : <span className="text-4xl" style={{ color: RGBA.black(0.18) }}>👤</span>}
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: RGBA.black(0.4) }}>
                <span className="text-[10px] tracking-widest" style={{ color: "#fff", fontFamily: FONTS.title }}>
                  EDITAR
                </span>
              </div>
            </div>
          </div>

          <div className="pt-16 text-center mb-4">
            <p className="text-[11px] tracking-[0.25em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
              PERFIL
            </p>
            <h2 className="text-base font-bold tracking-widest mt-1" style={{ color: "var(--text-primary)", fontFamily: FONTS.title }}>
              {cliente?.nome ?? "Cliente"}
            </h2>
            {plano?.ativo && (
              <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-bold tracking-widest" style={{ background: RGBA.gold(0.14), color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                {plano.nome.toUpperCase()}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "IDADE", valor: idade ? `${idade}a` : "—" },
              { label: "BARBEIRO", valor: cliente?.barbeiroFavorito?.nome?.split(" ")[0] ?? "—" },
              { label: "CORTE", valor: cliente?.servicoFavorito?.nome?.split(" ")[0] ?? "—" },
            ].map(s => (
              <div key={s.label} className="p-2 rounded-lg text-center" style={{ background: RGBA.gold(0.06), border: `1px solid ${RGBA.gold(0.12)}` }}>
                <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                  {s.label}
                </p>
                <p className="text-[11px] font-semibold mt-0.5 truncate" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>
                  {s.valor}
                </p>
              </div>
            ))}
          </div>

          <InfoLinha label="Data de nascimento" valor={cliente?.dataNascimento ? formatarData(cliente.dataNascimento) : "—"} />
          <InfoLinha label="Endereco" valor={cliente?.endereco} />
        </div>

        <div className="space-y-4">
          <div
            className="p-6 radius-panel relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--bg-card) 92%, transparent), color-mix(in srgb, var(--bg-section) 70%, rgba(201,162,74,0.1)))",
              border: `1px solid ${RGBA.gold(0.22)}`,
              boxShadow: `0 18px 36px ${RGBA.black(0.1)}`,
            }}
          >
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${RGBA.gold(0.06)} 0%, transparent 70%)` }} />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] font-bold tracking-[0.28em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                  PAINEL RAPIDO
                </p>
                <h3 className="text-lg font-bold tracking-widest mt-2" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
                  {proximoAgendamento ? "Seu proximo corte ja esta no radar" : "Defina seu proximo corte agora"}
                </h3>
                <p className="text-[12px] mt-2 max-w-xl leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  {proximoAgendamento
                    ? `${formatarDataCompleta(proximoAgendamento.data)} as ${proximoAgendamento.hora}, com ${proximoAgendamento.barbeiro.nome}.`
                    : "Agende com antecedencia para garantir horario e manter sua rotina em dia."}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate("/portal/agendar")} className="px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] transition-all" style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}>
                  AGENDAR AGORA
                </button>
                {!plano?.ativo && (
                  <button onClick={() => navigate("/portal/planos")} className="px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] transition-all" style={{ border: `1px solid ${RGBA.gold(0.4)}`, color: COLORS.goldDeep, fontFamily: FONTS.title, background: "transparent" }}>
                    VER PLANOS
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-4">
            <div className="p-5 radius-panel relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--bg-card) 60%, color-mix(in srgb, var(--bg-section) 52%, rgba(201,162,74,0.08)))", border: `1px solid ${RGBA.gold(0.2)}` }}>
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${RGBA.gold(0.06)} 0%, transparent 70%)` }} />

              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-bold tracking-[0.28em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                  VIGENCIA DO SEU PLANO
                </p>
                {plano?.ativo && <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest" style={{ background: RGBA.gold(0.15), color: COLORS.goldDeep, fontFamily: FONTS.title }}>ATIVO</span>}
              </div>

              {plano?.ativo ? (
                <>
                  <div className="mt-3 flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-sm font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.goldDeep }}>
                        {plano.nome}
                      </h3>
                      <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                        Valido ate {formatarData(plano.fim)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                        DIAS RESTANTES
                      </p>
                      <p className="text-3xl font-bold" style={{ color: (diasRestantes ?? 99) <= 5 ? COLORS.accentRed : COLORS.goldDeep, fontFamily: FONTS.title }}>
                        {diasRestantes ?? "—"}
                      </p>
                    </div>
                  </div>
                  {cortesRestam !== null && (
                    <div className="mt-4">
                      <div className="flex justify-between mb-1.5">
                        <p className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                          CORTES UTILIZADOS
                        </p>
                        <p className="text-[10px] font-semibold" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                          {plano.cortesUsados}/{plano.cortesTotal}
                        </p>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: RGBA.gold(0.12) }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${(plano.cortesUsados / plano.cortesTotal) * 100}%`, background: `linear-gradient(90deg, ${COLORS.goldDeep}, ${COLORS.gold})` }} />
                      </div>
                      <p className="text-[10px] mt-1.5" style={{ color: COLORS.goldDeep, fontFamily: FONTS.body }}>
                        {cortesRestam} {cortesRestam === 1 ? "corte restante" : "cortes restantes"} neste ciclo
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-[12px] mt-3" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  Voce nao possui plano ativo.{" "}
                  <button onClick={() => navigate("/portal/planos")} className="font-semibold transition-colors" style={{ color: COLORS.goldDeep }}>
                    Ver planos disponiveis →
                  </button>
                </p>
              )}
            </div>

            <div className="p-5 radius-panel" style={{ background: "var(--bg-card)", border: `1px solid ${RGBA.gold(0.15)}` }}>
              <p className="text-[10px] font-bold tracking-[0.28em] mb-3" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                ULTIMO AGENDAMENTO
              </p>
              {ultimo ? (
                <div>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                    Seu ultimo agendamento foi no dia <strong style={{ color: COLORS.goldDeep }}>{formatarData(ultimo.data)}</strong> as <strong style={{ color: COLORS.goldDeep }}>{ultimo.hora}</strong> com{" "}
                    <strong style={{ color: COLORS.goldDeep }}>{ultimo.barbeiro.nome.split(" ")[0]}</strong> - {ultimo.servico.nome}.
                  </p>
                  <div className="mt-3 p-3 radius-control flex items-start gap-2" style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.12)}` }}>
                    <span className="text-sm flex-shrink-0">💈</span>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                      <strong style={{ color: COLORS.goldDeep }}>Lembrete do corte anterior:</strong> {ultimo.servico.nome} com {ultimo.barbeiro.nome.split(" ")[0]} em {formatarDataCompleta(ultimo.data)}.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[12px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  Nenhum agendamento encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="p-6 radius-panel mt-4"
        style={{ background: "var(--bg-card)", border: `1px solid ${RGBA.gold(0.16)}`, boxShadow: `0 18px 36px ${RGBA.black(0.12)}` }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
              PROXIMO AGENDAMENTO
            </p>
            <p className="text-[11px] mt-1 max-w-xl" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
              Aqui ficam seus horarios confirmados. O objetivo e bater o olho e entender data, hora, servico e barbeiro sem esforco.
            </p>
          </div>
          <button onClick={() => navigate("/portal/agendar")} className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] radius-control" style={{ background: GRADIENTS.goldFill, color: COLORS.dark, fontFamily: FONTS.title }}>
            VER AGENDA
          </button>
        </div>

        {carregandoAgendamentos ? (
          <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
            Carregando agendamentos...
          </p>
        ) : proximosAgendamentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proximosAgendamentos.slice(0, 2).map(item => (
              <div key={item.id} className="p-4 radius-card" style={{ background: RGBA.gold(0.06), border: `1px solid ${RGBA.gold(0.14)}` }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-[11px] font-bold tracking-[0.18em]" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
                    {formatarDataCompleta(item.data)}
                  </p>
                  <span className="px-2 py-1 text-[10px] rounded-full" style={{ background: RGBA.green(0.1), color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                    EM {diasAte(item.data, item.hora)} DIA(S)
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                      HORARIO
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                      {item.hora}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                      BARBEIRO
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                      {item.barbeiro.nome}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDeep, fontFamily: FONTS.title }}>
                      SERVICO
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                      {item.servico.nome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 radius-card" style={{ background: "var(--bg-input)", border: `1px dashed ${RGBA.gold(0.24)}` }}>
            <p className="text-[11px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>
              Nenhum horario futuro marcado.
            </p>
            <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
              Quando voce confirmar um agendamento, ele passa a aparecer aqui na tela inicial.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
