import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppNavigation } from '@/navigation/navigation'
import { getOrcamentoById } from '@/scripts/Request/get/getOrçamento'
import { enviarPromptIA } from '@/scripts/Request/ia/prompt'
import { submitOrcamento } from '@/scripts/Request/orcamento/submit'
import {
  calcularOrcamento,
  DIFICULDADES,
  estimarAreaCm2,
  estimarTempoHoras,
  materiaisSugeridos,
  normalizarDificuldade,
  montarPayloadOrcamento,
  valoresDeCalculateInfo,
  valoresPadraoCalculo,
} from '@/utils/budgetCalculate'
import { extrairRespostaIA, montarContextoTatuagem } from '@/utils/iaPrompt'

function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function Campo({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-vibora-ui text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">
        {label}
      </span>
      {children}
      {hint && (
        <span className="font-vibora-ui text-xs text-neutral-400">{hint}</span>
      )}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-vibora-bg/15 bg-white px-4 py-2.5 font-vibora-ui text-vibora-bg outline-none transition-colors focus:border-vibora-bg/40 focus:ring-2 focus:ring-vibora-bg/10'

const textareaIAClass =
  'w-full resize-y rounded-xl border border-vibora-cream/25 bg-vibora-ink/40 px-4 py-3 font-vibora-ui text-sm text-vibora-cream placeholder:text-vibora-cream-muted/50 outline-none transition-colors focus:border-vibora-gold/50 focus:ring-1 focus:ring-vibora-gold/30'

function LinhaResumo({ label, valor, destaque }) {
  return (
    <div className={`flex flex-col gap-1 font-vibora-ui sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${destaque ? 'text-base font-semibold' : 'text-sm text-neutral-600'}`}>
      <span className="break-words">{label}</span>
      <span className={`shrink-0 ${destaque ? 'font-cinzel text-lg font-bold text-vibora-bg sm:text-xl' : 'text-vibora-bg'}`}>
        {valor}
      </span>
    </div>
  )
}

function Dado({ label, valor }) {
  return (
    <p>
      <span className="text-neutral-500">{label}:</span>{' '}
      <strong>{valor || '—'}</strong>
    </p>
  )
}

function CalculatePage() {
  const { id } = useParams()
  const { goToAdminPanel } = useAppNavigation()

  const [pedido, setPedido] = useState(null)
  const [calculateInfo, setCalculateInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [precoTintaCm2, setPrecoTintaCm2] = useState('20')
  const [areaCm2, setAreaCm2] = useState('')
  const [materiais, setMateriais] = useState('45')
  const [valorHora, setValorHora] = useState('120')
  const [tempoHoras, setTempoHoras] = useState('')
  const [taxaFixa, setTaxaFixa] = useState('30')
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState('medio')
  const [sombreamento, setSombreamento] = useState(false)
  const [colorido, setColorido] = useState(false)
  const [perguntaIA, setPerguntaIA] = useState('')
  const [respostaIA, setRespostaIA] = useState('')
  const [iaLoading, setIaLoading] = useState(false)
  const [iaError, setIaError] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  useEffect(() => {
    let cancelled = false

    async function carregarPedido() {
      const token = localStorage.getItem('adminToken')

      if (!token) {
        setError('Token não encontrado.')
        setLoading(false)
        return
      }

      try {
        const data = await getOrcamentoById(token, id)
        if (!cancelled) {
          const tattoInfo = data.tatto_info ?? data
          const calcInfo = data.calculate_info ?? null

          setPedido(tattoInfo)
          setCalculateInfo(calcInfo)

          const valores = calcInfo
            ? valoresDeCalculateInfo(calcInfo)
            : valoresPadraoCalculo(tattoInfo)

          setPrecoTintaCm2(valores.precoTintaCm2)
          setAreaCm2(valores.areaCm2)
          setMateriais(valores.materiais)
          setTaxaFixa(valores.taxaFixa)
          setValorHora(valores.valorHora)
          setTempoHoras(valores.tempoHoras)
          setDificuldadeSelecionada(valores.dificuldadeKey)
          setSombreamento(Boolean(tattoInfo.sombreamento))
          setColorido(Boolean(tattoInfo.colorido))
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar orçamento.')
          setPedido(null)
          setCalculateInfo(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    carregarPedido()

    return () => {
      cancelled = true
    }
  }, [id])

  const dificuldadeIA = pedido ? normalizarDificuldade(pedido.dificuldade) : 'medio'
  const dificuldadeIAInfo = DIFICULDADES[dificuldadeIA] ?? DIFICULDADES.medio
  const dificuldade = DIFICULDADES[dificuldadeSelecionada] ?? DIFICULDADES.medio

  const calculo = useMemo(() => {
    if (!pedido) {
      return {
        custoTinta: 0,
        custoMaoObra: 0,
        mats: 0,
        taxa: 0,
        ajusteSombra: 0,
        ajusteCor: 0,
        subtotal: 0,
        total: 0,
        mult: dificuldade.mult,
        dificuldade,
      }
    }

    return calcularOrcamento({
      precoTintaCm2,
      areaCm2,
      materiais,
      valorHora,
      tempoHoras,
      taxaFixa,
      dificuldadeKey: dificuldadeSelecionada,
      sombreamento,
      colorido,
    })
  }, [pedido, precoTintaCm2, areaCm2, materiais, valorHora, tempoHoras, taxaFixa, dificuldadeSelecionada, dificuldade, sombreamento, colorido])

  async function handleConfirmarOrcamento() {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      setSubmitError('Token não encontrado.')
      return
    }

    setSubmitLoading(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const payload = montarPayloadOrcamento({
        pedido,
        calculateInfo,
        form: {
          precoTintaCm2,
          areaCm2,
          materiais,
          taxaFixa,
          valorHora,
          tempoHoras,
          dificuldadeKey: dificuldadeSelecionada,
          sombreamento,
          colorido,
        },
        totalReais: calculo.total,
      })

      await submitOrcamento(token, payload)
      setSubmitSuccess(`Orçamento confirmado — ${formatBRL(calculo.total)}`)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao confirmar orçamento.')
    } finally {
      setSubmitLoading(false)
    }
  }

  async function handlePerguntarIA() {
    if (!perguntaIA.trim()) {
      setIaError('Escreva uma pergunta antes de enviar.')
      return
    }

    setIaLoading(true)
    setIaError('')
    setRespostaIA('')

    try {
      const data = await enviarPromptIA({
        input: perguntaIA.trim(),
        contexto: montarContextoTatuagem({ ...pedido, sombreamento, colorido }),
      })
      setRespostaIA(extrairRespostaIA(data))
    } catch (err) {
      setIaError(err instanceof Error ? err.message : 'Erro ao consultar a IA.')
    } finally {
      setIaLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vibora-page font-vibora-ui text-neutral-500">
        Carregando orçamento...
      </div>
    )
  }

  if (error || !pedido) {
    return (
      <div className="min-h-screen bg-vibora-page px-4 py-10">
        <div className="mx-auto max-w-lg rounded-xl border border-red-300/40 bg-red-50 px-4 py-3 text-center font-vibora-ui text-sm text-red-800">
          {error || 'Orçamento não encontrado.'}
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={goToAdminPanel}
            className="rounded-full border border-vibora-bg/30 bg-white px-5 py-2 font-vibora-ui text-sm font-semibold uppercase tracking-[0.15em] text-vibora-bg"
          >
            ← Voltar ao painel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vibora-page text-vibora-bg">
      <div className="h-1 bg-vibora-bg" aria-hidden />

      <header className="border-b border-vibora-bg/8 bg-white/70 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-cinzel text-xl font-bold sm:text-2xl lg:text-3xl">Vibora Ink</p>
            <p className="font-vibora-ui text-xs uppercase tracking-[0.2em] text-neutral-500 sm:text-sm">
              Cálculo de orçamento
            </p>
          </div>
          <button
            type="button"
            onClick={goToAdminPanel}
            className="w-full rounded-full border border-vibora-bg/30 bg-white px-5 py-2 font-vibora-ui text-xs font-semibold uppercase tracking-[0.12em] text-vibora-bg transition-colors hover:border-vibora-bg hover:bg-vibora-bg hover:text-vibora-cream sm:w-auto sm:py-1.5 sm:text-sm sm:tracking-[0.15em]"
          >
            ← Voltar ao painel
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="flex flex-col gap-6">
            <div className="rounded-2xl border border-vibora-bg/10 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="font-cinzel text-xl font-bold">Dados do pedido</h2>
              <div className="mt-5 space-y-3 font-vibora-ui text-sm">
                <Dado label="Cliente" valor={pedido.nome || pedido.cliente} />
                <Dado label="E-mail" valor={pedido.email} />
                <Dado label="Telefone" valor={pedido.telefone} />
                <Dado label="Data do pedido" valor={pedido.data} />
                <Dado label="Área do corpo" valor={pedido.area} />
                <Dado label="Local" valor={pedido.local} />
                <Dado label="Estilo" valor={pedido.estilo} />
                <Dado label="Tamanho" valor={pedido.tamanho} />
                <Dado label="Sombreamento (cliente)" valor={pedido.sombreamento ? 'Sim' : 'Não'} />
                <Dado label="Colorido (cliente)" valor={pedido.colorido ? 'Sim' : 'Não'} />
                <Dado label="Estimativa IA" valor={pedido.valor} />
              </div>
              <blockquote className="mt-5 border-l-2 border-vibora-gold/50 pl-4">
                <p className="font-vibora-ui italic leading-relaxed text-neutral-600">
                  “{pedido.ideia}”
                </p>
              </blockquote>
            </div>

            <div className="rounded-2xl border border-vibora-bg/10 bg-vibora-bg p-4 text-vibora-cream shadow-md sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-cinzel text-xl font-bold">Análise da IA</h2>
                <span className={`rounded-full border px-3 py-1 font-vibora-ui text-xs font-semibold uppercase tracking-wider ${dificuldadeIAInfo.cor}`}>
                  {pedido.dificuldade || dificuldadeIAInfo.label}
                </span>
              </div>
              <p className="mt-4 font-vibora-ui text-sm leading-relaxed text-vibora-cream/85">
                {pedido.justificativaIA}
              </p>
              <p className="mt-4 font-vibora-ui text-xs text-vibora-cream-muted">
                Multiplicador sugerido pela IA: <strong className="text-vibora-gold">×{dificuldadeIAInfo.mult}</strong>
              </p>

              <div className="mt-6 border-t border-vibora-cream/15 pt-5">
                <label htmlFor="pergunta-ia" className="font-vibora-ui text-xs font-semibold uppercase tracking-[0.15em] text-vibora-cream-muted">
                  Pergunta à IA
                </label>
                <p className="mt-1 font-vibora-ui text-xs text-vibora-cream-muted/80">
                  Use como contexto extra sobre esta tatuagem.
                </p>
                <textarea
                  id="pergunta-ia"
                  rows={3}
                  value={perguntaIA}
                  onChange={(e) => setPerguntaIA(e.target.value)}
                  disabled={iaLoading}
                  placeholder="Ex.: Considerar sessão dupla? Cliente tem pele sensível?"
                  className={`mt-3 ${textareaIAClass}`}
                />
                <button
                  type="button"
                  onClick={handlePerguntarIA}
                  disabled={iaLoading || !perguntaIA.trim()}
                  className="mt-3 w-full rounded-full border border-vibora-gold/50 bg-vibora-gold/10 px-5 py-2 font-vibora-ui text-xs font-semibold uppercase tracking-[0.15em] text-vibora-cream transition-colors hover:bg-vibora-gold/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {iaLoading ? 'Consultando IA...' : 'Perguntar à IA'}
                </button>

                {iaError && (
                  <p className="mt-3 rounded-lg border border-red-400/30 bg-red-950/30 px-3 py-2 font-vibora-ui text-xs text-red-200">
                    {iaError}
                  </p>
                )}

                {respostaIA && (
                  <div className="mt-4 rounded-xl border border-vibora-cream/20 bg-black/25 px-4 py-3">
                    <p className="font-vibora-ui text-[0.65rem] uppercase tracking-[0.2em] text-vibora-gold">
                      Resposta
                    </p>
                    <p className="mt-2 whitespace-pre-wrap font-vibora-ui text-sm leading-relaxed text-vibora-cream/90">
                      {respostaIA}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="rounded-2xl border border-vibora-bg/10 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="font-cinzel text-xl font-bold">Parâmetros de cálculo</h2>
              <p className="mt-2 font-vibora-ui text-sm text-neutral-500">
                {calculateInfo
                  ? `Orçamento salvo em ${calculateInfo.data} — valor: ${calculateInfo.valor}. Ajuste se necessário.`
                  : 'Valores sugeridos com base no pedido. Ajuste conforme necessário.'}
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Campo label="Tinta (R$/cm²)" hint="Sugestão: R$ 20 por cm²">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="20"
                    value={precoTintaCm2}
                    onChange={(e) => setPrecoTintaCm2(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Área (cm²)" hint={`Estimada pelo tamanho (${pedido.tamanho})`}>
                  <input
                    type="number"
                    min="0"
                    placeholder={String(estimarAreaCm2(pedido.tamanho))}
                    value={areaCm2}
                    onChange={(e) => setAreaCm2(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Materiais (R$)" hint={colorido ? 'Sugestão maior por colorido' : 'Agulhas, filmes, produtos...'}>
                  <input
                    type="number"
                    min="0"
                    placeholder={materiaisSugeridos(colorido)}
                    value={materiais}
                    onChange={(e) => setMateriais(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Taxa fixa (R$)" hint="Limpeza, descartáveis...">
                  <input
                    type="number"
                    min="0"
                    placeholder="30"
                    value={taxaFixa}
                    onChange={(e) => setTaxaFixa(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Valor hora (R$/h)" hint="Sugestão: R$ 120/h">
                  <input
                    type="number"
                    min="0"
                    placeholder="120"
                    value={valorHora}
                    onChange={(e) => setValorHora(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo
                  label="Tempo estimado (h)"
                  hint={`Sugerido: ${estimarTempoHoras(pedido.tamanho, sombreamento, colorido)}h`}
                >
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder={String(estimarTempoHoras(pedido.tamanho, sombreamento, colorido))}
                    value={tempoHoras}
                    onChange={(e) => setTempoHoras(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo
                  label="Dificuldade"
                  hint={`Sugerida pela IA: ${pedido.dificuldade || dificuldadeIAInfo.label} (×${dificuldadeIAInfo.mult})`}
                >
                  <select
                    value={dificuldadeSelecionada}
                    onChange={(e) => setDificuldadeSelecionada(e.target.value)}
                    className={inputClass}
                  >
                    {Object.entries(DIFICULDADES).map(([key, { label, mult }]) => (
                      <option key={key} value={key}>
                        {label} (×{mult})
                      </option>
                    ))}
                  </select>
                </Campo>

                <div className="flex flex-col gap-5">
                  <Campo label="Sombreamento" hint="Defina se a tattoo terá sombra (+10% no cálculo)">
                    <label className="flex h-11 cursor-pointer items-center gap-3 sm:h-12">
                      <input
                        type="checkbox"
                        checked={sombreamento}
                        onChange={(e) => setSombreamento(e.target.checked)}
                        className="h-5 w-5 accent-vibora-bg"
                      />
                      <span className="font-vibora-ui text-sm text-vibora-bg">
                        {sombreamento ? 'Com sombreamento' : 'Sem sombreamento'}
                      </span>
                    </label>
                  </Campo>

                  <Campo label="Colorido" hint="Defina se a tattoo será colorida (+15% no cálculo)">
                    <label className="flex h-11 cursor-pointer items-center gap-3 sm:h-12">
                      <input
                        type="checkbox"
                        checked={colorido}
                        onChange={(e) => setColorido(e.target.checked)}
                        className="h-5 w-5 accent-vibora-bg"
                      />
                      <span className="font-vibora-ui text-sm text-vibora-bg">
                        {colorido ? 'Colorida' : 'Sem cor'}
                      </span>
                    </label>
                  </Campo>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-vibora-gold/30 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="font-cinzel text-xl font-bold">Resultado</h2>

              <div className="mt-5 space-y-3">
                <LinhaResumo
                  label={`Tinta (${areaCm2 || '—'} cm² × R$ ${precoTintaCm2})`}
                  valor={formatBRL(calculo.custoTinta)}
                />
                <LinhaResumo label="Materiais" valor={formatBRL(calculo.mats)} />
                <LinhaResumo label="Taxa fixa" valor={formatBRL(calculo.taxa)} />
                <LinhaResumo
                  label={`Mão de obra (${tempoHoras || '—'}h × R$ ${valorHora}/h)`}
                  valor={formatBRL(calculo.custoMaoObra)}
                />
                {sombreamento && (
                  <LinhaResumo label="Ajuste sombreamento (+10%)" valor={formatBRL(calculo.ajusteSombra)} />
                )}
                {colorido && (
                  <LinhaResumo label="Ajuste colorido (+15%)" valor={formatBRL(calculo.ajusteCor)} />
                )}
                <div className="h-px bg-vibora-bg/10" aria-hidden />
                <LinhaResumo label="Subtotal" valor={formatBRL(calculo.subtotal)} />
                <LinhaResumo
                  label={`Dificuldade — ${dificuldade.label} (×${dificuldade.mult})`}
                  valor={formatBRL(calculo.total - calculo.subtotal)}
                />
                <div className="h-px bg-vibora-bg/15" aria-hidden />
                <LinhaResumo label="Valor final" valor={formatBRL(calculo.total)} destaque />
              </div>

              {submitError && (
                <p className="mt-5 rounded-lg border border-red-300/40 bg-red-50 px-4 py-3 text-center font-vibora-ui text-sm text-red-800">
                  {submitError}
                </p>
              )}

              {submitSuccess && (
                <p className="mt-5 rounded-lg border border-emerald-300/40 bg-emerald-50 px-4 py-3 text-center font-vibora-ui text-sm text-emerald-800">
                  {submitSuccess}
                </p>
              )}

              <button
                type="button"
                onClick={handleConfirmarOrcamento}
                disabled={submitLoading}
                className="mt-6 w-full rounded-full border border-vibora-bg bg-vibora-bg py-3 font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-vibora-cream transition-colors hover:bg-vibora-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitLoading ? 'Confirmando...' : 'Confirmar orçamento'}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default CalculatePage
