import { useState } from 'react'
import { useAppNavigation } from '@/navigation/navigation'
import { loginAdmin } from '@/scripts/Request/Admin/Login'
import { clearTokenValidationCache } from '@/scripts/Request/Admin/Token'

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

function Login() {
  const { goToAdminPanel } = useAppNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inputClass =
    'w-full rounded-xl border border-vibora-cream/40 bg-transparent px-4 py-2.5 font-vibora-ui text-vibora-cream placeholder:text-vibora-cream-muted/60 outline-none transition-colors focus:border-vibora-cream focus:ring-1 focus:ring-vibora-cream/30'

  const labelClass =
    'font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-vibora-cream'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Preencha email e senha.')
      return
    }

    setLoading(true)

    try {
      const data = await loginAdmin({ email: email.trim(), password })
      const token = data.token ?? data.access_token ?? data.accessToken

      if (token) {
        clearTokenValidationCache()
        localStorage.setItem('adminToken', token)
      }

      if (data.user) {
        localStorage.setItem('adminUser', JSON.stringify(data.user))
      }

      goToAdminPanel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-vibora-cream sm:px-6">
      <section className="flex w-full max-w-lg flex-col items-center">
        <h1 className="font-cinzel text-center text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl">
          Vibora Ink
        </h1>

        <OrnamentDivider />

        <p className="font-vibora-ui text-center text-base font-semibold uppercase tracking-[0.15em] text-vibora-cream/90 sm:text-lg">
          Painel de controle
        </p>
        <p className="mt-2 text-center font-vibora-ui text-sm text-vibora-cream-muted sm:text-base">
          Seja bem-vinda. Entre com suas credenciais.
        </p>

        <form
          className="mt-8 w-full space-y-5 sm:mt-10 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid items-center gap-2 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
            <label htmlFor="email" className={`${labelClass} sm:text-right`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className={inputClass}
            />
          </div>

          <div className="grid items-center gap-2 sm:grid-cols-[5.5rem_1fr] sm:gap-x-6">
            <label htmlFor="password" className={`${labelClass} sm:text-right`}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className={inputClass}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/40 bg-red-950/30 px-4 py-3 text-center font-vibora-ui text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full min-w-0 rounded-full border border-vibora-cream bg-transparent px-8 py-2.5 font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em] text-vibora-cream transition-colors hover:bg-vibora-cream/10 focus:outline-none focus:ring-1 focus:ring-vibora-cream/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[10rem] sm:px-10 sm:tracking-[0.25em]"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login
