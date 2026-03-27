import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BARBEIROS, SERVICOS, criarAgendamento, fetchAgendamentosCliente, fetchHorariosDisponiveis, mockHistorico } from "../../data/mockData";
import type { AgendamentoCliente, Barbeiro, Servico } from "../../data/types";
import { COLORS, FONTS, GRADIENTS, RGBA } from "../../styles/theme";

const MESES = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const WHATSAPP_NUMBER = "5581986333846";

type Horario = { hora: string; disponivel: boolean };

function formatarDataAgendamento(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function formatarDataCurta(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function diasDesde(iso?: string | null) {
  if (!iso) return null;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const data = new Date(`${iso}T12:00:00`);
  data.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((hoje.getTime() - data.getTime()) / (1000 * 60 * 60 * 24)));
}

function montarMensagemDuvida(agendamento: { barbeiro: string; data: string; hora: string; servico: string; observacao: string }) {
  return encodeURIComponent(
    [
      "Ola, equipe Seu Diego Barber!",
      "Agendei pelo sistema e queria tirar uma duvida sobre meu horario.",
      "",
      `Barbeiro: ${agendamento.barbeiro}`,
      `Data: ${agendamento.data}`,
      `Horario: ${agendamento.hora}`,
      `Servico: ${agendamento.servico}`,
      agendamento.observacao ? `Observacao enviada: ${agendamento.observacao}` : "Observacao enviada: nenhuma",
      "",
      "Minha duvida:",
    ].join("\n")
  );
}

function montarMensagemConfirmacao(agendamento: { barbeiro: string; data: string; hora: string; servico: string; observacao: string }) {
  return encodeURIComponent(
    [
      "Ola, equipe Seu Diego Barber!",
      "Acabei de registrar um agendamento pelo sistema online.",
      "",
      `Barbeiro: ${agendamento.barbeiro}`,
      `Data: ${agendamento.data}`,
      `Horario: ${agendamento.hora}`,
      `Servico: ${agendamento.servico}`,
      agendamento.observacao ? `Observacao: ${agendamento.observacao}` : "Observacao: nenhuma",
      "",
      "Podem confirmar para mim, por favor?",
    ].join("\n")
  );
}

function PosAgendamentoPopup({
  barbeiro,
  data,
  hora,
  servico,
  observacao,
  onNovo,
  onIrInicio,
}: {
  barbeiro: Barbeiro;
  data: Date;
  hora: string;
  servico: string;
  observacao: string;
  onNovo: () => void;
  onIrInicio: () => void;
}) {
  const dataFmt = data.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const payload = { barbeiro: barbeiro.nome, data: dataFmt, hora, servico, observacao };
  const msgDuvida = montarMensagemDuvida(payload);
  const msgConfirmar = montarMensagemConfirmacao(payload);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="absolute inset-0" style={{ background: RGBA.black(0.75), backdropFilter: "blur(6px)" }} />

        <motion.div
          className="relative w-full max-w-md overflow-hidden radius-panel"
          style={{
            background: "linear-gradient(160deg, var(--bg-card), color-mix(in srgb, var(--bg-section) 76%, transparent))",
            border: `1px solid ${RGBA.gold(0.3)}`,
            boxShadow: `0 24px 60px ${RGBA.black(0.35)}`,
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="h-[3px]" style={{ background: GRADIENTS.goldRail }} />
          <div className="p-6">
            <div className="text-center mb-5">
              <span className="text-5xl block mb-3">✅</span>
              <h2 className="text-lg font-bold tracking-widest" style={{ fontFamily: FONTS.title, color: COLORS.gold }}>
                AGENDAMENTO ENVIADO
              </h2>
              <p className="text-sm mt-2" style={{ color: "var(--text-body)", fontFamily: FONTS.body, lineHeight: 1.7 }}>
                <strong style={{ color: COLORS.gold }}>{dataFmt}</strong> as <strong style={{ color: COLORS.gold }}>{hora}</strong>
                <br />
                {servico} com <strong style={{ color: COLORS.gold }}>{barbeiro.nome}</strong>
              </p>
            </div>

            <p className="text-[11px] text-center mb-5" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
              Escolha o proximo passo:
            </p>

            <button
              onClick={onIrInicio}
              className="w-full flex items-start gap-3 p-4 mb-3 rounded-lg transition-all text-left"
              style={{ background: RGBA.gold(0.06), border: `1px solid ${RGBA.gold(0.2)}` }}
            >
              <span className="text-xl flex-shrink-0">🏠</span>
              <div>
                <p className="text-[12px] font-bold tracking-wider" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>Voltar ao inicio</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  Retorna para o painel inicial do portal
                </p>
              </div>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msgConfirmar}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-start gap-3 p-4 mb-3 rounded-lg transition-all text-left"
              style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.16)}`, textDecoration: "none" }}
            >
              <span className="text-xl flex-shrink-0">📲</span>
              <div>
                <p className="text-[12px] font-bold tracking-wider" style={{ color: "var(--text-primary)", fontFamily: FONTS.title }}>
                  Enviar via WhatsApp
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  Abre uma mensagem pronta para confirmar e detalhar o pedido
                </p>
              </div>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msgDuvida}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-start gap-3 p-4 mb-3 rounded-lg transition-all text-left"
              style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.12)}`, textDecoration: "none" }}
            >
              <span className="text-xl flex-shrink-0">💬</span>
              <div>
                <p className="text-[12px] font-bold tracking-wider" style={{ color: "var(--text-primary)", fontFamily: FONTS.title }}>
                  Tirar duvidas
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  Envia seus dados e deixa o campo final pronto para voce perguntar
                </p>
              </div>
            </a>

            <button
              onClick={onNovo}
              className="w-full flex items-start gap-3 p-4 rounded-lg transition-all text-left"
              style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.1)}` }}
            >
              <span className="text-xl flex-shrink-0">📅</span>
              <div>
                <p className="text-[12px] font-bold tracking-wider" style={{ color: "var(--text-primary)", fontFamily: FONTS.title }}>
                  Realizar novo agendamento
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                  Limpa o formulario e volta para o calendario
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function EtapaCard({ numero, titulo, descricao, ativo }: { numero: string; titulo: string; descricao: string; ativo: boolean }) {
  return (
    <div
      className="p-4 radius-panel"
      style={{
        background: ativo ? "color-mix(in srgb, var(--bg-card) 82%, rgba(201,162,74,0.08))" : "var(--bg-card)",
        border: `1px solid ${ativo ? RGBA.gold(0.24) : RGBA.gold(0.12)}`,
        boxShadow: ativo ? `0 14px 30px ${RGBA.gold(0.06)}` : `0 10px 24px ${RGBA.black(0.06)}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: ativo ? GRADIENTS.goldFill : RGBA.gold(0.08), color: ativo ? COLORS.dark : COLORS.gold, fontFamily: FONTS.title }}>
          {numero}
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: ativo ? COLORS.gold : "var(--text-primary)", fontFamily: FONTS.title }}>
            {titulo}
          </p>
          <p className="text-[10px] mt-1 leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
            {descricao}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Agendar() {
  const { cliente } = useAuth();
  const navigate = useNavigate();
  const plano = cliente?.plano;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const fimPlano = plano?.ativo && plano?.fim ? new Date(`${plano.fim}T23:59:59`) : null;
  const limiteSemPlano = (() => {
    const d = new Date(hoje);
    const delta = (6 - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + delta);
    return d;
  })();

  const limiteAgendamento = fimPlano ?? limiteSemPlano;
  const [mesAtual, setMesAtual] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [dataSel, setDataSel] = useState<Date | null>(null);
  const [horarioSel, setHorarioSel] = useState<string | null>(null);
  const [barbeiroSel, setBarbeiroSel] = useState<Barbeiro | null>(cliente?.barbeiroFavorito ?? null);
  const [servicoSel, setServicoSel] = useState("");
  const [observacao, setObservacao] = useState("");
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [agendamentos, setAgendamentos] = useState<AgendamentoCliente[]>([]);
  const [loadH, setLoadH] = useState(false);
  const [loadResumo, setLoadResumo] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [servicoMenuOpen, setServicoMenuOpen] = useState(false);
  const servicoMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cliente) return;
    setLoadResumo(true);
    fetchAgendamentosCliente(cliente.id).then(res => {
      setAgendamentos(res);
      setLoadResumo(false);
    });
  }, [cliente, confirmado]);

  useEffect(() => {
    if (!dataSel || !barbeiroSel) return;
    setLoadH(true);
    setHorarioSel(null);

    const iso = `${dataSel.getFullYear()}-${String(dataSel.getMonth() + 1).padStart(2, "0")}-${String(dataSel.getDate()).padStart(2, "0")}`;
    fetchHorariosDisponiveis(barbeiroSel.id, iso).then(res => {
      setHorarios(res);
      setLoadH(false);
    });
  }, [dataSel, barbeiroSel]);

  useEffect(() => {
    function fecharAoClicarFora(event: MouseEvent) {
      if (!servicoMenuRef.current?.contains(event.target as Node)) {
        setServicoMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  const proximosAgendamentos = useMemo(
    () =>
      agendamentos.filter(item => {
        const dataHora = new Date(`${item.data}T${item.hora}:00`);
        return item.status === "agendado" && dataHora >= new Date();
      }),
    [agendamentos]
  );

  const ultimoHistorico = cliente?.ultimoAgendamento ?? mockHistorico[0];
  const diasUltimoCorte = diasDesde(cliente?.ultimoAgendamento?.data ?? mockHistorico[0]?.data);
  const servicoDetalhado = SERVICOS.find(x => x.nome === servicoSel);
  const servicoCoberto = Boolean(plano?.ativo && servicoDetalhado?.cobertosPlanos?.includes(plano.id));

  function celulasMes(): Array<Date | null> {
    const prim = new Date(mesAtual);
    const ult = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0);
    const cel: Array<Date | null> = [];

    for (let i = 0; i < prim.getDay(); i += 1) cel.push(null);
    for (let d = 1; d <= ult.getDate(); d += 1) cel.push(new Date(mesAtual.getFullYear(), mesAtual.getMonth(), d));
    return cel;
  }

  function disp(d: Date) {
    return d.getDay() !== 0 && d >= hoje && d <= limiteAgendamento;
  }

  async function confirmar() {
    const serv = (SERVICOS as Servico[]).find(s => s.nome === servicoSel);
    if (!cliente || !barbeiroSel || !dataSel || !horarioSel) return;

    setSalvando(true);
    const iso = `${dataSel.getFullYear()}-${String(dataSel.getMonth() + 1).padStart(2, "0")}-${String(dataSel.getDate()).padStart(2, "0")}`;
    await criarAgendamento({
      clienteId: cliente.id,
      barbeiroId: barbeiroSel.id,
      servicoId: serv?.id,
      data: iso,
      hora: horarioSel,
      observacao,
    });

    setSalvando(false);
    setConfirmado(true);
  }

  function resetar() {
    setConfirmado(false);
    setDataSel(null);
    setHorarioSel(null);
    setServicoSel("");
    setObservacao("");
    setServicoMenuOpen(false);
  }

  const podeContinuar = Boolean(dataSel && horarioSel && barbeiroSel && servicoSel);

  return (
    <div>
      <motion.h1
        className="text-2xl font-bold tracking-widest text-center mb-2"
        style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AGENDAMENTOS
      </motion.h1>
      <motion.p
        className="text-center text-[11px] mb-8"
        style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Area do Cliente - Seu Diego Barber
      </motion.p>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}>
        <EtapaCard numero="1" titulo="ESCOLHA O DIA" descricao="Selecione uma data valida dentro da janela de agendamento." ativo={Boolean(dataSel)} />
        <EtapaCard numero="2" titulo="DEFINA O HORARIO" descricao="Depois da data, escolha um horario disponivel." ativo={Boolean(horarioSel)} />
        <EtapaCard numero="3" titulo="BARBEIRO E SERVICO" descricao="Monte o atendimento do jeito que voce realmente precisa." ativo={Boolean(barbeiroSel && servicoSel)} />
        <EtapaCard numero="4" titulo="CONFIRME O RESUMO" descricao="Revise tudo e envie o pedido com seguranca." ativo={podeContinuar} />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6 mb-8">
        <motion.div
          className="p-5 radius-panel"
          style={{ background: "var(--bg-card)", border: `1px solid ${RGBA.gold(0.15)}` }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.28em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
                PROXIMOS CORTES
              </p>
              <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                Confira o que ja esta reservado antes de marcar um novo horario.
              </p>
            </div>
            <button
              onClick={() => navigate("/portal")}
              className="px-4 py-2 text-[10px] font-bold tracking-[0.18em] radius-control"
              style={{ border: `1px solid ${RGBA.gold(0.25)}`, color: COLORS.gold, fontFamily: FONTS.title }}
            >
              VOLTAR AO INICIO
            </button>
          </div>

          {loadResumo ? (
            <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
              Carregando seus agendamentos...
            </p>
          ) : proximosAgendamentos.length > 0 ? (
            <div className="space-y-3">
              {proximosAgendamentos.slice(0, 3).map(item => (
                <div key={item.id} className="p-4 radius-card" style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.14)}` }}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <p className="text-[11px] font-bold tracking-[0.12em]" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
                      {formatarDataAgendamento(item.data)}
                    </p>
                    <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: RGBA.green(0.08), color: COLORS.accentGreen, fontFamily: FONTS.title }}>
                      {item.hora}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>SERVICO</p>
                      <p className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>{item.servico.nome}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>BARBEIRO</p>
                      <p className="text-[11px]" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>{item.barbeiro.nome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 radius-card" style={{ background: RGBA.gold(0.04), border: `1px dashed ${RGBA.gold(0.22)}` }}>
              <p className="text-[11px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>
                Nenhum proximo corte marcado.
              </p>
              <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                Selecione uma data abaixo para garantir seu proximo horario.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="p-5 radius-panel"
          style={{ background: "var(--bg-card)", border: `1px solid ${RGBA.gold(0.15)}` }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-[10px] font-bold tracking-[0.28em] mb-3" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
            RITMO DOS ULTIMOS CORTES
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 radius-card" style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.12)}` }}>
              <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>ULTIMO CORTE</p>
              <p className="text-[11px] mt-1" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>
                {ultimoHistorico ? formatarDataCurta(ultimoHistorico.data) : "Sem historico"}
              </p>
            </div>
            <div className="p-3 radius-card" style={{ background: RGBA.gold(0.05), border: `1px solid ${RGBA.gold(0.12)}` }}>
              <p className="text-[9px] tracking-[0.2em]" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>DIAS DESDE O ULTIMO</p>
              <p className="text-[11px] mt-1" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>
                {diasUltimoCorte ?? "—"} dias
              </p>
            </div>
          </div>
          {ultimoHistorico && (
            <div className="p-4 radius-card" style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.1)}` }}>
              <p className="text-[11px] font-semibold" style={{ color: "var(--text-body)", fontFamily: FONTS.body }}>
                Seu ultimo atendimento foi {formatarDataAgendamento(ultimoHistorico.data)} as {ultimoHistorico.hora}.
              </p>
              <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                Servico: {ultimoHistorico.servico.nome} · Barbeiro: {ultimoHistorico.barbeiro.nome}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
            ESCOLHA O DIA DO CORTE:
          </p>

          {!plano?.ativo && (
            <div className="mb-3 p-2.5 text-[10px] card-bg radius-card" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
              Sem plano: agenda aberta ate o sabado desta semana.
            </div>
          )}

          <div className="p-3 card-bg radius-panel">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1))}
                className="w-7 h-7 flex items-center justify-center text-base rounded transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                ‹
              </button>
              <p className="text-[11px] font-bold tracking-[0.12em]" style={{ fontFamily: FONTS.title, color: "var(--text-primary)" }}>
                {MESES[mesAtual.getMonth()].substring(0, 3).toUpperCase()} {mesAtual.getFullYear()}
              </p>
              <button
                onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1))}
                className="w-7 h-7 flex items-center justify-center text-base rounded transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-0.5">
              {DIAS_SEMANA.map((d, i) => (
                <div key={i} className="text-center text-[9px] py-0.5 font-semibold" style={{ color: i === 0 ? "var(--text-disabled)" : "var(--text-muted)", fontFamily: FONTS.body }}>
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {celulasMes().map((data, i) => {
                if (!data) return <div key={i} className="aspect-square" />;
                const ok = disp(data);
                const sel = dataSel?.toDateString() === data.toDateString();

                return (
                  <button
                    key={i}
                    disabled={!ok}
                    onClick={() => setDataSel(data)}
                    className="aspect-square flex items-center justify-center text-[11px] font-medium radius-control transition-all"
                    style={{
                      background: sel ? COLORS.gold : ok ? RGBA.gold(0.04) : "transparent",
                      color: sel ? COLORS.dark : ok ? "var(--text-primary)" : "var(--text-disabled)",
                      border: sel ? "none" : ok ? `1px solid ${RGBA.gold(0.08)}` : "none",
                      cursor: ok ? "pointer" : "not-allowed",
                      fontFamily: FONTS.body,
                      textDecoration: data.getDay() === 0 ? "line-through" : "none",
                    }}
                  >
                    {data.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] font-bold tracking-widest mt-4 mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
            HORARIOS DISPONIVEIS:
          </p>
          <div className="p-3 card-bg radius-panel" style={{ minHeight: "72px" }}>
            {!dataSel ? (
              <p className="text-[10px] text-center py-3" style={{ color: "var(--text-disabled)", fontFamily: FONTS.body }}>
                Selecione uma data acima
              </p>
            ) : loadH ? (
              <p className="text-[10px] text-center py-3" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                Carregando horarios...
              </p>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-1">
                {horarios.map(({ hora, disponivel }) => (
                  <button
                    key={hora}
                    disabled={!disponivel}
                    onClick={() => setHorarioSel(hora)}
                    className="py-1.5 text-[10px] font-semibold radius-control transition-all"
                    style={{
                      background: horarioSel === hora ? COLORS.gold : disponivel ? RGBA.gold(0.05) : "transparent",
                      color: horarioSel === hora ? COLORS.dark : disponivel ? "var(--text-primary)" : "var(--text-disabled)",
                      border: horarioSel === hora ? "none" : disponivel ? `1px solid ${RGBA.gold(0.12)}` : "1px solid transparent",
                      cursor: disponivel ? "pointer" : "not-allowed",
                      fontFamily: FONTS.body,
                      textDecoration: !disponivel ? "line-through" : "none",
                    }}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-5">
          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              ESCOLHA O BARBEIRO:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BARBEIROS.map(b => {
                const sel = barbeiroSel?.id === b.id;
                const fav = b.id === cliente?.barbeiroFavorito?.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setBarbeiroSel(b)}
                    className="py-2.5 text-[10px] font-bold tracking-wider transition-all relative radius-control"
                    style={{
                      background: sel ? RGBA.gold(0.15) : "var(--bg-input)",
                      border: sel ? `1px solid ${RGBA.gold(0.5)}` : `1px solid ${RGBA.gold(0.12)}`,
                      color: sel ? COLORS.gold : "var(--text-body)",
                      fontFamily: FONTS.title,
                    }}
                  >
                    {b.nome.split(" ")[0].toUpperCase()}
                    {fav && !sel && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: COLORS.gold }} />}
                  </button>
                );
              })}
            </div>
            {barbeiroSel && (
              <p className="text-[10px] mt-1" style={{ color: COLORS.goldDark, fontFamily: FONTS.body }}>
                {barbeiroSel.cargo}
                {barbeiroSel.id === cliente?.barbeiroFavorito?.id && " · Favorito"}
              </p>
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              SERVICO DESEJADO:
            </p>
            <div ref={servicoMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setServicoMenuOpen(valor => !valor)}
                className="w-full px-4 py-3 text-left text-[11px] font-semibold tracking-widest outline-none transition-all radius-control"
                style={{
                  background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 96%, transparent), color-mix(in srgb, var(--bg-section) 68%, transparent))",
                  border: `1px solid ${servicoMenuOpen ? RGBA.gold(0.42) : RGBA.gold(0.24)}`,
                  color: servicoSel ? "var(--text-primary)" : "var(--text-muted)",
                  fontFamily: FONTS.title,
                  boxShadow: servicoMenuOpen ? `0 16px 34px ${RGBA.black(0.18)}` : "none",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p>{servicoSel || "SELECIONE O CORTE"}</p>
                    <p className="text-[9px] mt-1 tracking-[0.18em]" style={{ color: servicoSel ? COLORS.goldDark : "var(--text-disabled)", fontFamily: FONTS.body }}>
                      {servicoSel
                        ? servicoCoberto
                          ? "COBERTO PELO PLANO"
                          : `INVESTIMENTO DE R$ ${servicoDetalhado?.preco}`
                        : "TOQUE PARA VER AS OPCOES"}
                    </p>
                  </div>
                  <span className="text-sm transition-transform" style={{ color: COLORS.gold, transform: servicoMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    V
                  </span>
                </div>
              </button>

              {servicoMenuOpen && (
                <div
                  className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 p-2 radius-card"
                  style={{
                    background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 98%, transparent), color-mix(in srgb, var(--bg-section) 84%, transparent))",
                    border: `1px solid ${RGBA.gold(0.18)}`,
                    boxShadow: `0 24px 48px ${RGBA.black(0.28)}`,
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="max-h-72 overflow-y-auto pr-1 space-y-2">
                    {SERVICOS.map(s => {
                      const coberto = plano?.ativo && s.cobertosPlanos?.includes(plano.id);
                      const ativo = servicoSel === s.nome;

                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setServicoSel(s.nome);
                            setServicoMenuOpen(false);
                          }}
                          className="w-full p-3 text-left transition-all radius-card"
                          style={{
                            background: ativo
                              ? "linear-gradient(135deg, color-mix(in srgb, rgba(201,162,74,0.22) 72%, var(--bg-card)), color-mix(in srgb, rgba(201,162,74,0.12) 60%, var(--bg-section)))"
                              : "color-mix(in srgb, var(--bg-card) 92%, transparent)",
                            border: `1px solid ${ativo ? RGBA.gold(0.34) : RGBA.gold(0.1)}`,
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-bold tracking-[0.12em]" style={{ color: ativo ? COLORS.gold : "var(--text-primary)", fontFamily: FONTS.title }}>
                                {s.nome}
                              </p>
                              <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                                Duracao aproximada: {s.duracao} min
                              </p>
                            </div>
                            <span
                              className="px-2 py-1 text-[9px] tracking-[0.16em] radius-control"
                              style={{
                                background: coberto ? RGBA.green(0.12) : RGBA.gold(0.08),
                                color: coberto ? COLORS.accentGreen : COLORS.gold,
                                fontFamily: FONTS.title,
                              }}
                            >
                              {coberto ? "PLANO" : `R$ ${s.preco}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {servicoSel && (() => {
              return (
                <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] px-2 py-0.5 tracking-widest" style={{ background: servicoCoberto ? RGBA.green(0.1) : RGBA.gold(0.08), color: servicoCoberto ? COLORS.accentGreen : COLORS.gold, fontFamily: FONTS.title }}>
                    {servicoCoberto ? "COBERTO PELO PLANO" : `R$ ${servicoDetalhado?.preco}`}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.body }}>
                    Duracao aproximada: {servicoDetalhado?.duracao} min
                  </span>
                </div>
              );
            })()}
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.title }}>
              OBSERVACOES SOBRE O CORTE?
            </p>
            <textarea
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
              rows={3}
              placeholder="Ex: quero o degrade mais fechado, prefiro barba mais alinhada..."
              className="w-full px-4 py-3 text-[11px] outline-none resize-none transition-all radius-control"
              style={{ background: "var(--bg-input)", border: `1px solid ${RGBA.gold(0.12)}`, color: "var(--text-body)", fontFamily: FONTS.body }}
              onFocus={e => {
                e.target.style.borderColor = RGBA.gold(0.4);
              }}
              onBlur={e => {
                e.target.style.borderColor = RGBA.gold(0.12);
              }}
            />
            <p className="text-[10px] mt-1" style={{ color: "var(--text-disabled)", fontFamily: FONTS.body }}>
              Opcional - o barbeiro vera essa mensagem antes do atendimento.
            </p>
          </div>

          <motion.div className="p-4 radius-panel" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 96%, transparent), color-mix(in srgb, var(--bg-section) 60%, transparent))", border: `1px solid ${RGBA.gold(0.14)}`, boxShadow: `0 16px 32px ${RGBA.black(0.08)}` }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="text-[10px] font-bold tracking-widest" style={{ color: COLORS.goldDark, fontFamily: FONTS.title }}>
                RESUMO DO AGENDAMENTO
              </p>
              <span className="text-[9px] px-2 py-1 rounded-full" style={{ background: podeContinuar ? RGBA.green(0.1) : RGBA.gold(0.08), color: podeContinuar ? COLORS.accentGreen : COLORS.gold, fontFamily: FONTS.title }}>
                {podeContinuar ? "PRONTO PARA ENVIAR" : "PREENCHA AS ETAPAS"}
              </span>
            </div>
            {[
              { l: "DATA", v: dataSel?.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" }) ?? "Selecione uma data" },
              { l: "HORARIO", v: horarioSel ?? "Selecione um horario" },
              { l: "BARBEIRO", v: barbeiroSel?.nome ?? "Escolha um barbeiro" },
              { l: "SERVICO", v: servicoSel || "Escolha um servico" },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between py-1.5 border-b" style={{ borderColor: RGBA.gold(0.06) }}>
                <span className="text-[10px]" style={{ color: "var(--text-muted)", fontFamily: FONTS.title }}>{l}</span>
                <span className="text-[10px] font-semibold text-right" style={{ color: "var(--text-primary)", fontFamily: FONTS.body }}>{v}</span>
              </div>
            ))}
          </motion.div>

          <button
            disabled={!podeContinuar || salvando}
            onClick={confirmar}
            className="w-full py-3.5 text-[11px] font-bold tracking-[0.2em] transition-all duration-300 radius-control"
            style={{
              background: podeContinuar ? GRADIENTS.goldFill : "var(--bg-card)",
              color: podeContinuar ? COLORS.dark : "var(--text-disabled)",
              fontFamily: FONTS.title,
              cursor: podeContinuar ? "pointer" : "not-allowed",
            }}
          >
            {salvando ? "CONFIRMANDO..." : "CONFIRMAR AGENDAMENTO"}
          </button>
        </motion.div>
      </div>

      {confirmado && dataSel && barbeiroSel && horarioSel && (
        <PosAgendamentoPopup
          barbeiro={barbeiroSel}
          data={dataSel}
          hora={horarioSel}
          servico={servicoSel}
          observacao={observacao}
          onNovo={resetar}
          onIrInicio={() => {
            resetar();
            navigate("/portal");
          }}
        />
      )}
    </div>
  );
}
