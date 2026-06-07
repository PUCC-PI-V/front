import { useAppNavigation } from '@/navigation/navigation'

const ORCAMENTOS = [
  {
    id: 1,
    nome: 'Marina Costa',
    email: 'marina@email.com',
    ideia: 'Leão realista no antebraço direito, preto e cinza, com olhar intenso.',
    valor: 'R$ 850,00',
    status: 'novo',
    data: '04/06/2026',
  },
  {
    id: 2,
    nome: 'Lucas Ferreira',
    email: 'lucas.f@email.com',
    ideia: 'Serpente enrolada no punho, estilo old school, vermelho e preto.',
    valor: 'R$ 620,00',
    status: 'analise',
    data: '03/06/2026',
  },
  {
    id: 3,
    nome: 'Beatriz Almeida',
    email: 'bia.almeida@email.com',
    ideia: 'Flor de lótus na clavícula, traço fino, somente contorno.',
    valor: 'R$ 380,00',
    status: 'respondido',
    data: '02/06/2026',
  },
  {
    id: 4,
    nome: 'Thiago Rocha',
    email: 'thiago.r@email.com',
    ideia: 'Mandala geométrica nas costas, tamanho médio, preto sólido.',
    valor: 'R$ 1.200,00',
    status: 'novo',
    data: '04/06/2026',
  },
]

const STATUS = {
  novo: { label: 'Novo', dot: 'bg-vibora-cream' },
  analise: { label: 'Em análise', dot: 'bg-vibora-gold' },
  respondido: { label: 'Respondido', dot: 'bg-vibora-cream/40' },
}

function OrnamentDivider() {
  return (
    <div className="my-5 flex w-24 items-center gap-2" aria-hidden>
      <span className="h-px flex-1 bg-vibora-bg/20" />
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-vibora-gold" fill="currentColor">
        <path d="M12 2c-1.5 2.5-4 4-7 4 2 1.5 3.5 4 3.5 7.5 0-2 1-4.5 3.5-6.5 2.5 2 3.5 4.5 3.5 6.5 0-3.5 1.5-6 3.5-7.5-3 0-5.5-1.5-7-4z" />
      </svg>
      <span className="h-px flex-1 bg-vibora-bg/20" />
    </div>
  )
}

function StatusBadge({ status }) {
  const config = STATUS[status] ?? STATUS.novo
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-vibora-cream/25 bg-vibora-ink/30 px-3 py-1 font-vibora-ui text-xs font-semibold uppercase tracking-wider text-vibora-cream">
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden />
      {config.label}
    </span>
  )
}

function StatPill({ value, label, highlight }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-5 py-3 ${
        highlight
          ? 'border-vibora-gold/35 bg-white shadow-sm'
          : 'border-vibora-bg/10 bg-white/80'
      }`}
    >
      <span
        className={`font-cinzel text-3xl font-bold leading-none ${
          highlight ? 'text-vibora-gold' : 'text-vibora-bg'
        }`}
      >
        {value}
      </span>
      <span className="font-vibora-ui text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </span>
    </div>
  )
}

function OrcamentoCard({ orcamento, destaque, onAbrir }) {
  const inicial = orcamento.nome.charAt(0)

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onAbrir}
      onKeyDown={(e) => e.key === 'Enter' && onAbrir()}
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-vibora-bg text-vibora-cream shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-vibora-bg/25 focus:outline-none focus:ring-2 focus:ring-vibora-gold/50 ${
        destaque ? 'ring-2 ring-vibora-gold/60 ring-offset-2 ring-offset-vibora-page' : ''
      }`}
    >
      {destaque && (
        <div className="bg-vibora-gold/90 px-4 py-1.5 text-center font-vibora-ui text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-vibora-bg">
          Recém-chegado
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-5 sm:p-5">
        <header className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-vibora-gold/50 bg-vibora-ink/50 font-cinzel text-lg font-bold text-vibora-gold"
            aria-hidden
          >
            {inicial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="font-vibora-ui text-lg font-semibold leading-tight">
                {orcamento.nome}
              </h2>
              <StatusBadge status={orcamento.status} />
            </div>
            <p className="mt-1 truncate font-vibora-ui text-sm text-vibora-cream-muted">
              {orcamento.email}
            </p>
          </div>
        </header>

        <blockquote className="flex-1 border-l-2 border-vibora-gold/40 pl-4">
          <p className="line-clamp-3 font-vibora-ui text-base italic leading-relaxed text-vibora-cream/85">
            {orcamento.ideia}
          </p>
        </blockquote>

        <footer className="flex flex-col gap-3 rounded-xl bg-black/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="font-vibora-ui text-[0.65rem] uppercase tracking-[0.25em] text-vibora-cream-muted">
              Estimativa IA
            </p>
            <p className="font-cinzel text-xl font-bold text-vibora-gold">
              {orcamento.valor}
            </p>
          </div>
          <time className="shrink-0 rounded-full border border-vibora-cream/20 px-3 py-1 font-vibora-ui text-xs text-vibora-cream-muted">
            {orcamento.data}
          </time>
        </footer>
      </div>
    </article>
  )
}

function AdminPanel() {
  const { goHome, goToAdminLogin, goToCalculate } = useAppNavigation()

  const novos = ORCAMENTOS.filter((o) => o.status === 'novo').length
  const destaqueId = ORCAMENTOS.find((o) => o.status === 'novo')?.id

  return (
    <div className="min-h-screen bg-vibora-page text-vibora-bg">
      <div className="h-1 bg-vibora-bg" aria-hidden />

      <header className="border-b border-vibora-bg/8 bg-white/70 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-cinzel text-xl font-bold sm:text-2xl lg:text-3xl">Vibora Ink</p>
            <p className="font-vibora-ui text-xs uppercase tracking-[0.2em] text-neutral-500 sm:text-sm">
              Painel de orçamentos
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 sm:justify-end sm:gap-5">
            <button
              type="button"
              onClick={goHome}
              className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-vibora-bg"
            >
              Site
            </button>
            <button
              type="button"
              onClick={goToAdminLogin}
              className="rounded-full border border-vibora-bg/30 bg-white px-5 py-1.5 font-vibora-ui text-sm font-semibold uppercase tracking-[0.15em] text-vibora-bg transition-colors hover:border-vibora-bg hover:bg-vibora-bg hover:text-vibora-cream"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <section className="mb-8 sm:mb-10">
          <h1 className="font-cinzel text-2xl font-bold sm:text-3xl lg:text-4xl">Orçamentos</h1>
          <OrnamentDivider />
          <p className="max-w-lg font-vibora-ui text-base text-neutral-500 sm:text-lg">
            Histórias na fila da agulha — pedidos enviados pelos clientes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatPill value={ORCAMENTOS.length} label="Total" />
            <StatPill value={novos} label="Novos" highlight />
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          {ORCAMENTOS.map((orcamento) => (
            <OrcamentoCard
              key={orcamento.id}
              orcamento={orcamento}
              destaque={orcamento.id === destaqueId}
              onAbrir={() => goToCalculate(orcamento.id)}
            />
          ))}
        </section>

        <p className="mt-14 text-center font-vibora-ui text-sm italic text-neutral-400">
          Dados de exemplo — quando o back-end estiver pronto, os cards virão da API.
        </p>
      </main>
    </div>
  )
}

export default AdminPanel
