import { useRef, useState } from 'react'
import caveirao from '@/assets/caveiraomtfoda.jpg'
import fundo from '@/assets/fundo.png'
import { submitBudget } from '@/scripts/Request/budget/submit'
import { montarPayloadBudget } from '@/utils/formTattoo'

function OrnamentDivider() {
  return (
    <div className="my-4 flex w-full max-w-sm items-center gap-3" aria-hidden>
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

function FormRow({ label, htmlFor, children }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4">
      <label
        htmlFor={htmlFor}
        className="font-vibora-ui text-sm font-semibold uppercase tracking-wider text-vibora-cream"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const fieldClass =
  'h-11 w-full rounded-md border border-vibora-cream/30 bg-black/20 px-4 font-vibora-ui text-vibora-cream outline-none transition-colors focus:border-vibora-cream/60 sm:h-12'

const TAMANHOS = ['Pequena', 'Média', 'Grande', 'Fechamento']
const AREAS = ['Braço', 'Antebraço', 'Perna', 'Costela', 'Peito', 'Costas']

function FormTattoo() {
  const telefoneRef = useRef(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [sombreamento, setSombreamento] = useState(false)
  const [colorido, setColorido] = useState(false)
  const [estilo, setEstilo] = useState('')
  const [areaTatuada, setAreaTatuada] = useState('')
  const [regiaoEspecifica, setRegiaoEspecifica] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function normalizarTelefone(valor) {
    return String(valor ?? '').replace(/\D/g, '').slice(0, 11)
  }

  function handleTelefoneInput(e) {
    e.target.value = normalizarTelefone(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const telefoneEnviado = normalizarTelefone(telefoneRef.current?.value)

    if (telefoneEnviado.length < 10 || telefoneEnviado.length > 11) {
      setError('Informe um telefone válido com DDD (10 ou 11 dígitos).')
      return
    }

    if (!tamanho || !areaTatuada) {
      setError('Selecione o tamanho e a área tatuada.')
      return
    }

    setLoading(true)

    try {
      const payload = montarPayloadBudget({
        nome,
        telefone: telefoneEnviado,
        email,
        tamanho,
        sombreamento,
        colorido,
        estilo,
        areaTatuada,
        regiaoEspecifica,
        descricao,
      })

      await submitBudget(payload)
      setSuccess('Orçamento enviado com sucesso! Entraremos em contato em breve.')
      setNome('')
      if (telefoneRef.current) telefoneRef.current.value = ''
      setEmail('')
      setTamanho('')
      setSombreamento(false)
      setColorido(false)
      setEstilo('')
      setAreaTatuada('')
      setRegiaoEspecifica('')
      setDescricao('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar orçamento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-[calc(100dvh-4.5rem)] px-4 py-8 text-vibora-cream sm:px-6 sm:py-10 lg:px-10"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16">
        <div className="relative hidden h-[420px] w-[220px] shrink-0 overflow-hidden rounded-3xl border border-vibora-cream/30 lg:block xl:h-[520px] xl:w-[240px]">
          <img src={caveirao} alt="Tattoo" className="size-full object-cover object-[62%_center]" />
        </div>

        <section className="w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <h1 className="font-cinzel text-center text-3xl font-bold sm:text-4xl md:text-5xl">
              Solicite seu orçamento
            </h1>
            <OrnamentDivider />
          </div>

          <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5" onSubmit={handleSubmit}>
            <FormRow label="Nome" htmlFor="nome">
              <input
                id="nome"
                type="text"
                placeholder="Insira seu nome"
                className={fieldClass}
                minLength={3}
                maxLength={45}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </FormRow>

            <FormRow label="Telefone" htmlFor="telefone">
              <input
                ref={telefoneRef}
                id="telefone"
                name="telefone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="DDD + número, somente dígitos"
                className={fieldClass}
                defaultValue=""
                onInput={handleTelefoneInput}
                required
              />
            </FormRow>

            <FormRow label="Email" htmlFor="email">
              <input
                id="email"
                type="email"
                placeholder="Ex: email@gmail.com"
                className={fieldClass}
                minLength={5}
                maxLength={45}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormRow>

            <FormRow label="Tamanho" htmlFor="tamanho">
              <select
                id="tamanho"
                className={fieldClass}
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {TAMANHOS.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            </FormRow>

            <FormRow label="Sombreamento" htmlFor="sombreamento">
              <input
                id="sombreamento"
                type="checkbox"
                className="h-5 w-5 accent-vibora-cream"
                checked={sombreamento}
                onChange={(e) => setSombreamento(e.target.checked)}
              />
            </FormRow>

            <FormRow label="Colorido" htmlFor="colorido">
              <input
                id="colorido"
                type="checkbox"
                className="h-5 w-5 accent-vibora-cream"
                checked={colorido}
                onChange={(e) => setColorido(e.target.checked)}
              />
            </FormRow>

            <FormRow label="Estilo de tattoo" htmlFor="estilo">
              <input
                id="estilo"
                type="text"
                placeholder="Ex: realismo, fine line, blackwork..."
                className={fieldClass}
                minLength={3}
                maxLength={45}
                value={estilo}
                onChange={(e) => setEstilo(e.target.value)}
                required
              />
            </FormRow>

            <FormRow label="Área tatuada" htmlFor="area-tatuada">
              <select
                id="area-tatuada"
                className={fieldClass}
                value={areaTatuada}
                onChange={(e) => setAreaTatuada(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {AREAS.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            </FormRow>

            <FormRow label="Região específica" htmlFor="regiao-especifica">
              <input
                id="regiao-especifica"
                type="text"
                placeholder="Ex: parte interna do antebraço..."
                className={fieldClass}
                minLength={3}
                maxLength={45}
                value={regiaoEspecifica}
                onChange={(e) => setRegiaoEspecifica(e.target.value)}
                required
              />
            </FormRow>

            <FormRow label="Descrição" htmlFor="descricao">
              <input
                id="descricao"
                type="text"
                placeholder="Ex: Pássaro realista com flores ao redor..."
                className={fieldClass}
                minLength={3}
                maxLength={256}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </FormRow>

            {error && (
              <p className="rounded-lg border border-red-400/40 bg-red-950/40 px-4 py-3 text-center font-vibora-ui text-sm text-red-200">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-lg border border-emerald-400/40 bg-emerald-950/40 px-4 py-3 text-center font-vibora-ui text-sm text-emerald-200">
                {success}
              </p>
            )}

            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl border border-vibora-cream/40 px-8 py-3.5 font-vibora-ui text-base transition hover:bg-vibora-cream/10 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[16rem] sm:px-10 sm:py-4 sm:text-lg"
              >
                {loading ? 'ENVIANDO...' : 'AVANÇAR'}
              </button>
            </div>
          </form>
        </section>

        <div className="relative hidden h-[420px] w-[220px] shrink-0 overflow-hidden rounded-3xl border border-vibora-cream/30 xl:block xl:h-[520px] xl:w-[240px]">
          <img src={caveirao} alt="Tattoo" className="size-full object-cover object-[62%_center]" />
        </div>
      </div>
    </main>
  )
}

export default FormTattoo
