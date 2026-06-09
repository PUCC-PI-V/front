import { useState } from 'react'
import caveirao from '@/assets/caveiraomtfoda.jpg'
import fundo from '@/assets/fundo.png'

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

function FormRow({ label, children }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4">
      <label className="font-vibora-ui text-sm font-semibold uppercase tracking-wider text-vibora-cream">
        {label}
      </label>
      {children}
    </div>
  )
}

const fieldClass =
  'h-11 w-full rounded-md border border-vibora-cream/30 bg-black/20 px-4 font-vibora-ui text-vibora-cream outline-none transition-colors focus:border-vibora-cream/60 sm:h-12'

function FormTattoo() {
  const [tamanho, setTamanho] = useState('')
  const [areaTatuada, setAreaTatuada] = useState('')

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

          <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">

          <FormRow label="Nome">
              <input
                type="text"
                placeholder="Insira seu nome"
                className={fieldClass}
                minLength={3}
                maxLength={45}
              />
            </FormRow>
          
            <FormRow label="Telefone">
              <input
                type="text"
                placeholder="Ex: (11) 99999-9999"
                className={fieldClass}
                minLength={11}
                maxLength={11}
              />
            </FormRow>

            <FormRow label="Tamanho">
              <select
                value={tamanho}
                onChange={(event) => setTamanho(event.target.value)}
                className={`${fieldClass} ${tamanho ? 'text-vibora-cream' : 'text-black'}`}
              >
                <option value="" disabled className="text-black hover:text-vibora-cream">
                  Selecione
                </option>
                <option value="Pequena" className={tamanho === 'Pequena' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Pequena
                </option>
                <option value="Média" className={tamanho === 'Média' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Média
                </option>
                <option value="Grande" className={tamanho === 'Grande' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Grande
                </option>
                <option value="Fechamento" className={tamanho === 'Fechamento' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Fechamento
                </option>
              </select>
            </FormRow>

            <FormRow label="Sombreamento">
              <input type="checkbox" className="h-5 w-5 accent-vibora-cream" />
            </FormRow>

            <FormRow label="Colorido">
              <input type="checkbox" className="h-5 w-5 accent-vibora-cream" />
            </FormRow>

            <FormRow label="Estilo de tattoo">
              <input
                type="text"
                placeholder="Ex: realismo, fine line, blackwork..."
                className={fieldClass}
                minLength={3}
                maxLength={45}
              />
            </FormRow>

            <FormRow label="Área tatuada">
              <select
                value={areaTatuada}
                onChange={(event) => setAreaTatuada(event.target.value)}
                className={`${fieldClass} ${areaTatuada ? 'text-vibora-cream' : 'text-black'}`}
              >
                <option value="" disabled className="text-black hover:text-vibora-cream">
                  Selecione
                </option>
                <option value="Braço" className={areaTatuada === 'Braço' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Braço
                </option>
                <option value="Antebraço" className={areaTatuada === 'Antebraço' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Antebraço
                </option>
                <option value="Perna" className={areaTatuada === 'Perna' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Perna
                </option>
                <option value="Costela" className={areaTatuada === 'Costela' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Costela
                </option>
                <option value="Peito" className={areaTatuada === 'Peito' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Peito
                </option>
                <option value="Costas" className={areaTatuada === 'Costas' ? 'text-vibora-cream' : 'text-black hover:text-vibora-cream'}>
                  Costas
                </option>
              </select>
            </FormRow>

            <FormRow label="Região específica">
              <input
                type="text"
                placeholder="Ex: parte interna do antebraço..."
                className={fieldClass}
                minLength={3}
                maxLength={45}
              />
            </FormRow>

            <FormRow label="Descrição">
              <input
                type="text"
                placeholder="Ex: Pássaro realista com flores ao redor..."
                className={fieldClass}
                minLength={3}
                maxLength={256}
              />
            </FormRow>

            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                type="submit"
                className="w-full rounded-2xl border border-vibora-cream/40 px-8 py-3.5 font-vibora-ui text-base transition hover:bg-vibora-cream/10 sm:w-auto sm:min-w-[16rem] sm:px-10 sm:py-4 sm:text-lg"
              >
                AVANÇAR
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
