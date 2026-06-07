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

function Login() {
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

  const inputClass =
    'w-full rounded-xl border border-vibora-cream/40 bg-transparent px-4 py-2.5 font-vibora-ui text-vibora-cream placeholder:text-vibora-cream-muted/60 outline-none transition-colors focus:border-vibora-cream focus:ring-1 focus:ring-vibora-cream/30'

  const labelClass =
    'font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-vibora-cream'

  return (
    <main className="flex h-dvh max-h-dvh flex-col overflow-hidden text-vibora-cream">
      <header className="shrink-0 px-6 pt-6 sm:px-10">
        <button
          type="button"
          onClick={goHome}
          className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] text-vibora-cream transition-opacity hover:opacity-70"
        >
          Home
        </button>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-6">
        <section className="flex w-full flex-col items-center">
          <h1 className="font-cinzel text-center text-4xl font-bold tracking-wide sm:text-5xl">
            Vibora Ink
          </h1>

          <OrnamentDivider />

          <p className="font-vibora-ui text-center text-lg font-semibold uppercase tracking-[0.15em] text-vibora-cream/90">
            Painel de controle
          </p>
          <p className="mt-2 text-center font-vibora-ui text-base text-vibora-cream-muted">
            Seja bem-vinda. Entre com suas credenciais.
          </p>

          <form
            className="mt-10 w-full space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              goHome()
            }}
          >
            <div className="grid items-center gap-3 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
              <label htmlFor="email" className={`${labelClass} sm:text-right`}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className={inputClass}
              />
            </div>

            <div className="grid items-center gap-3 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
              <label htmlFor="password" className={`${labelClass} sm:text-right`}>
                Senha
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="min-w-[10rem] rounded-full border border-vibora-cream bg-transparent px-10 py-2.5 font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] text-vibora-cream transition-colors hover:bg-vibora-cream/10 focus:outline-none focus:ring-1 focus:ring-vibora-cream/50"
              >
                Entrar
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Login
