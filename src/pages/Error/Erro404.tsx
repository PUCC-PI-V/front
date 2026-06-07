import { useAppNavigation } from '@/navigation/navigation'

function OrnamentDivider() {
  return (
    <div className="my-6 flex w-full max-w-sm items-center gap-3 sm:my-8" aria-hidden>
      <span className="h-px flex-1 bg-vibora-cream/35" />
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-vibora-cream/70"
        fill="currentColor"
      >
        <path d="M12 2c-1.5 2.5-4 4-7 4 2 1.5 3.5 4 3.5 7.5 0-2 1-4.5 3.5-6.5 2.5 2 3.5 4.5 3.5 6.5 0-3.5 1.5-6 3.5-7.5-3 0-5.5-1.5-7-4zm0 20c1.5-2.5 4-4 7-4-2-1.5-3.5-4-3.5-7.5 0 2-1 4.5-3.5 6.5-2.5-2-3.5-4.5-3.5-6.5 0 3.5-1.5 6-3.5 7.5 3 0 5.5 1.5 7 4z" />
      </svg>
      <span className="h-px flex-1 bg-vibora-cream/35" />
    </div>
  )
}

export default function Erro404() {
  const { goHome } = useAppNavigation()

  return (
    <main className="flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center bg-vibora-bg px-4 py-10 text-vibora-cream sm:px-6">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <p className="font-cinzel text-6xl font-bold tracking-wide sm:text-7xl md:text-8xl">404</p>

        <OrnamentDivider />

        <h1 className="font-cinzel text-xl font-bold tracking-wide sm:text-2xl md:text-3xl">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-sm font-vibora-ui text-base text-vibora-cream-muted sm:text-lg">
          O caminho que você buscou não existe ou foi movido. Volte ao início e
          continue sua história na pele.
        </p>

        <button
          type="button"
          onClick={goHome}
          className="mt-8 w-full min-w-0 rounded-full border border-vibora-cream bg-transparent px-8 py-2.5 font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-vibora-cream transition-colors hover:bg-vibora-cream/10 focus:outline-none focus:ring-1 focus:ring-vibora-cream/50 sm:mt-10 sm:w-auto sm:min-w-[12rem] sm:px-10 sm:tracking-[0.25em]"
        >
          Voltar ao início
        </button>
      </div>
    </main>
  )
}
