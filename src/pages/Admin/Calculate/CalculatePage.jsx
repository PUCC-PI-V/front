import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppNavigation } from '@/navigation/navigation'

const DIFICULDADES = {
  facil: { label: 'Fácil', mult: 1, cor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  medio: { label: 'Médio', mult: 1.15, cor: 'bg-amber-100 text-amber-800 border-amber-200' },
  dificil: { label: 'Difícil', mult: 1.3, cor: 'bg-orange-100 text-orange-800 border-orange-200' },
  muito_dificil: { label: 'Muito difícil', mult: 1.5, cor: 'bg-red-100 text-red-800 border-red-200' },
}

const PEDIDOS = {
  1: {
    nome: 'Marina Costa',
    email: 'marina@email.com',
    data: '04/06/2026',
    ideia: 'Leão realista no antebraço direito, preto e cinza, com olhar intenso.',
    local: 'Antebraço direito',
    estilo: 'Realismo',
    tamanho: 'Médio (~12×8 cm)',
    areaCm2: 96,
    tempoSugerido: 4,
    dificuldade: 'dificil',
    justificativaIA:
      'Realismo com sombreamento denso exige alto detalhamento e múltiplas camadas de cinza. A área do antebraço permite boa leitura, mas o olhar intenso aumenta o tempo de refinamento.',
  },
  2: {
    nome: 'Lucas Ferreira',
    email: 'lucas.f@email.com',
    data: '03/06/2026',
    ideia: 'Serpente enrolada no punho, estilo old school, vermelho e preto.',
    local: 'Punho',
    estilo: 'Old school',
    tamanho: 'Pequeno (~8×6 cm)',
    areaCm2: 48,
    tempoSugerido: 2.5,
    dificuldade: 'medio',
    justificativaIA:
      'Old school com paleta limitada facilita a execução, porém a curvatura do punho pede atenção no encaixe da serpente. Contornos grossos reduzem tempo em relação a estilos mais detalhados.',
  },
  3: {
    nome: 'Beatriz Almeida',
    email: 'bia.almeida@email.com',
    data: '02/06/2026',
    ideia: 'Flor de lótus na clavícula, traço fino, somente contorno.',
    local: 'Clavícula',
    estilo: 'Fine line',
    tamanho: 'Pequeno (~5×4 cm)',
    areaCm2: 20,
    tempoSugerido: 1.5,
    dificuldade: 'facil',
    justificativaIA:
      'Somente contorno em área pequena, com pouca complexidade de sombra. Fine line na clavícula requer precisão, mas o tempo total permanece baixo pelo tamanho reduzido.',
  },
  4: {
    nome: 'Thiago Rocha',
    email: 'thiago.r@email.com',
    data: '04/06/2026',
    ideia: 'Mandala geométrica nas costas, tamanho médio, preto sólido.',
    local: 'Costas (centro)',
    estilo: 'Geométrico',
    tamanho: 'Grande (~18×18 cm)',
    areaCm2: 324,
    tempoSugerido: 6,
    dificuldade: 'muito_dificil',
    justificativaIA:
      'Mandala grande com simetria rigorosa e repetição de padrões. Área extensa nas costas aumenta tempo de sessão e exige precisão milimétrica em todo o perímetro.',
  },
}

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

function LinhaResumo({ label, valor, destaque }) {
  return (
    <div className={`flex items-center justify-between gap-4 font-vibora-ui ${destaque ? 'text-base font-semibold' : 'text-sm text-neutral-600'}`}>
      <span>{label}</span>
      <span className={destaque ? 'font-cinzel text-xl font-bold text-vibora-bg' : 'text-vibora-bg'}>
        {valor}
      </span>
    </div>
  )
}

function CalculatePage() {
  const { id } = useParams()
  const { goToAdminPanel } = useAppNavigation()
  const pedido = PEDIDOS[id] ?? PEDIDOS[1]
  const dificuldade = DIFICULDADES[pedido.dificuldade] ?? DIFICULDADES.medio

  const [precoTintaCm2, setPrecoTintaCm2] = useState('20')
  const [areaCm2, setAreaCm2] = useState(String(pedido.areaCm2))
  const [materiais, setMateriais] = useState('45')
  const [valorHora, setValorHora] = useState('120')
  const [tempoHoras, setTempoHoras] = useState(String(pedido.tempoSugerido))
  const [taxaFixa, setTaxaFixa] = useState('30')

  const calculo = useMemo(() => {
    const tinta = Number(precoTintaCm2) || 0
    const area = Number(areaCm2) || 0
    const mats = Number(materiais) || 0
    const hora = Number(valorHora) || 0
    const tempo = Number(tempoHoras) || 0
    const taxa = Number(taxaFixa) || 0

    const custoTinta = tinta * area
    const custoMaoObra = hora * tempo
    const subtotal = custoTinta + mats + custoMaoObra + taxa
    const total = subtotal * dificuldade.mult

    return { custoTinta, custoMaoObra, mats, taxa, subtotal, total, mult: dificuldade.mult }
  }, [precoTintaCm2, areaCm2, materiais, valorHora, tempoHoras, taxaFixa, dificuldade.mult])

  return (
    <div className="min-h-screen bg-vibora-page text-vibora-bg">
      <div className="h-1 bg-vibora-bg" aria-hidden />

      <header className="border-b border-vibora-bg/8 bg-white/70 px-6 py-5 backdrop-blur-sm sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-cinzel text-2xl font-bold sm:text-3xl">Vibora Ink</p>
            <p className="font-vibora-ui text-sm uppercase tracking-[0.2em] text-neutral-500">
              Cálculo de orçamento
            </p>
          </div>
          <button
            type="button"
            onClick={goToAdminPanel}
            className="rounded-full border border-vibora-bg/30 bg-white px-5 py-1.5 font-vibora-ui text-sm font-semibold uppercase tracking-[0.15em] text-vibora-bg transition-colors hover:border-vibora-bg hover:bg-vibora-bg hover:text-vibora-cream"
          >
            ← Voltar ao painel
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Dados do pedido + IA */}
          <section className="flex flex-col gap-6">
            <div className="rounded-2xl border border-vibora-bg/10 bg-white p-6 shadow-sm">
              <h2 className="font-cinzel text-xl font-bold">Dados do pedido</h2>
              <div className="mt-5 space-y-3 font-vibora-ui text-sm">
                <p><span className="text-neutral-500">Cliente:</span> <strong>{pedido.nome}</strong></p>
                <p><span className="text-neutral-500">E-mail:</span> {pedido.email}</p>
                <p><span className="text-neutral-500">Data:</span> {pedido.data}</p>
                <p><span className="text-neutral-500">Local:</span> {pedido.local}</p>
                <p><span className="text-neutral-500">Estilo:</span> {pedido.estilo}</p>
                <p><span className="text-neutral-500">Tamanho:</span> {pedido.tamanho}</p>
              </div>
              <blockquote className="mt-5 border-l-2 border-vibora-gold/50 pl-4">
                <p className="font-vibora-ui italic leading-relaxed text-neutral-600">
                  “{pedido.ideia}”
                </p>
              </blockquote>
            </div>

            <div className="rounded-2xl border border-vibora-bg/10 bg-vibora-bg p-6 text-vibora-cream shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-cinzel text-xl font-bold">Análise da IA</h2>
                <span className={`rounded-full border px-3 py-1 font-vibora-ui text-xs font-semibold uppercase tracking-wider ${dificuldade.cor}`}>
                  {dificuldade.label}
                </span>
              </div>
              <p className="mt-4 font-vibora-ui text-sm leading-relaxed text-vibora-cream/85">
                {pedido.justificativaIA}
              </p>
              <p className="mt-4 font-vibora-ui text-xs text-vibora-cream-muted">
                Multiplicador de dificuldade aplicado: <strong className="text-vibora-gold">×{dificuldade.mult}</strong>
              </p>
            </div>
          </section>

          {/* Calculadora */}
          <section className="flex flex-col gap-6">
            <div className="rounded-2xl border border-vibora-bg/10 bg-white p-6 shadow-sm">
              <h2 className="font-cinzel text-xl font-bold">Parâmetros de cálculo</h2>
              <p className="mt-2 font-vibora-ui text-sm text-neutral-500">
                Ajuste os valores dos materiais e tempo. O total é calculado automaticamente.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Campo label="Tinta (R$/cm²)" hint="Ex.: R$ 20 por cm²">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={precoTintaCm2}
                    onChange={(e) => setPrecoTintaCm2(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Área (cm²)" hint="Sugerido pela IA">
                  <input
                    type="number"
                    min="0"
                    value={areaCm2}
                    onChange={(e) => setAreaCm2(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Materiais (R$)" hint="Agulhas, filmes, produtos...">
                  <input
                    type="number"
                    min="0"
                    value={materiais}
                    onChange={(e) => setMateriais(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Taxa fixa (R$)" hint="Limpeza, descartáveis...">
                  <input
                    type="number"
                    min="0"
                    value={taxaFixa}
                    onChange={(e) => setTaxaFixa(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Valor hora (R$/h)" hint="Sua hora de trabalho">
                  <input
                    type="number"
                    min="0"
                    value={valorHora}
                    onChange={(e) => setValorHora(e.target.value)}
                    className={inputClass}
                  />
                </Campo>

                <Campo label="Tempo estimado (h)" hint="Sugerido pela IA">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={tempoHoras}
                    onChange={(e) => setTempoHoras(e.target.value)}
                    className={inputClass}
                  />
                </Campo>
              </div>
            </div>

            <div className="rounded-2xl border border-vibora-gold/30 bg-white p-6 shadow-sm">
              <h2 className="font-cinzel text-xl font-bold">Resultado</h2>

              <div className="mt-5 space-y-3">
                <LinhaResumo
                  label={`Tinta (${areaCm2} cm² × R$ ${precoTintaCm2})`}
                  valor={formatBRL(calculo.custoTinta)}
                />
                <LinhaResumo label="Materiais" valor={formatBRL(calculo.mats)} />
                <LinhaResumo label="Taxa fixa" valor={formatBRL(calculo.taxa)} />
                <LinhaResumo
                  label={`Mão de obra (${tempoHoras}h × R$ ${valorHora}/h)`}
                  valor={formatBRL(calculo.custoMaoObra)}
                />
                <div className="h-px bg-vibora-bg/10" aria-hidden />
                <LinhaResumo label="Subtotal" valor={formatBRL(calculo.subtotal)} />
                <LinhaResumo
                  label={`Ajuste — ${dificuldade.label} (×${dificuldade.mult})`}
                  valor={formatBRL(calculo.total - calculo.subtotal)}
                />
                <div className="h-px bg-vibora-bg/15" aria-hidden />
                <LinhaResumo label="Valor final" valor={formatBRL(calculo.total)} destaque />
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-full border border-vibora-bg bg-vibora-bg py-3 font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-vibora-cream transition-colors hover:bg-vibora-ink"
              >
                Confirmar orçamento
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default CalculatePage
