import { useEffect } from 'react'
import { useAppNavigation } from '@/navigation/navigation'

function OrnamentDivider() {
  return (
    <div className="my-8 flex w-full max-w-sm items-center gap-3" aria-hidden>
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

  useEffect(() => {
    const html = document.documentElement
    const prevHtml = html.style.overflow
    const prevBody = document.body.style.overflow
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  return (
    <main className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-vibora-bg text-vibora-cream">
      <header className="shrink-0 px-6 pt-6 sm:px-10">
        <button
          type="button"
          onClick={goHome}
          className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] text-vibora-cream transition-opacity hover:opacity-70"
        >
          Home
        </button>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-6 text-center">
        <p className="font-cinzel text-7xl font-bold tracking-wide sm:text-8xl">404</p>

        <OrnamentDivider />

        <h1 className="font-cinzel text-2xl font-bold tracking-wide sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-sm font-vibora-ui text-lg text-vibora-cream-muted">
          O caminho que você buscou não existe ou foi movido. Volte ao início e
          continue sua história na pele.
        </p>

        <button
          type="button"
          onClick={goHome}
          className="mt-10 min-w-[12rem] rounded-full border border-vibora-cream bg-transparent px-10 py-2.5 font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] text-vibora-cream transition-colors hover:bg-vibora-cream/10 focus:outline-none focus:ring-1 focus:ring-vibora-cream/50"
        >
          Voltar ao início
        </button>
      </div>
    </main>
  )
}
