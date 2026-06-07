import { useEffect } from 'react'
import { useAppNavigation } from '@/navigation/navigation'
import caveirao from '@/assets/caveiraomtfoda.jpg'
import fundo from '@/assets/fundo.png'

function OrnamentDivider() {
  return (
    <div className="my-4 flex w-full max-w-sm items-center gap-3">
      <span className="h-px flex-1 bg-vibora-cream/35" />

      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-vibora-cream/70"
        fill="currentColor"
      >
        <path d="M12 2c-1.5 2.5-4 4-7 4 2 1.5 3.5 4 3.5 7.5 0-2 1-4.5 3.5-6.5 2.5 2 3.5 4.5 3.5 6.5 0-3.5 1.5-6 3.5-7.5-3 0-5.5-1.5-7-4zm0 20c1.5-2.5 4-4 7-4-2-1.5-3.5-4-3.5-7.5 0 2-1 4.5-3.5 6.5-2.5-2-3.5-4.5-3.5-6.5 0 3.5-1.5-6-3.5-7.5 3 0 5.5 1.5 7 4z" />
      </svg>

      <span className="h-px flex-1 bg-vibora-cream/35" />
    </div>
  )
}

function FormTattoo() {
  const { goHome, goToAbout } = useAppNavigation()

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
    <main
      className="flex h-dvh max-h-dvh flex-col overflow-hidden text-vibora-cream"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className="shrink-0 px-6 pt-6 sm:px-10">
        <div className="flex gap-8">
          <button
            onClick={goToAbout}
            className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] transition-opacity hover:opacity-70"
          >
            Sobre Mim
          </button>

          <button
            onClick={goHome}
            className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] transition-opacity hover:opacity-70"
          >
            Home
          </button>
        </div>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center px-8 pb-8">
        <section className="flex w-full items-center justify-center gap-16">
          <img
            src={caveirao}
            alt="Tattoo"
            className="hidden h-[520px] w-[240px] rounded-3xl border border-vibora-cream/30 object-cover lg:block"
          />

          <div className="w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <h1 className="font-cinzel text-center text-5xl font-bold">
                Solicite seu orçamento
              </h1>

              <OrnamentDivider />
            </div>

            <form className="mt-8 space-y-5">
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label>Tamanho</label>

                <select className="h-12 rounded-md border border-vibora-cream/30 bg-black/20 px-4">
                  <option>Selecione</option>
                  <option>Pequena</option>
                  <option>Média</option>
                  <option>Grande</option>
                  <option>Fechamento</option>
                </select>
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label>Sombreamento</label>
                <input type="checkbox" className="h-5 w-5" />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label>Colorido</label>
                <input type="checkbox" className="h-5 w-5" />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label>Estilo de tattoo</label>

                <input
                  type="text"
                  placeholder="Ex: realismo, fine line, blackwork..."
                  className="h-12 rounded-md border border-vibora-cream/30 bg-black/20 px-4"
                />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label>Área tatuada</label>

                <select className="h-12 rounded-md border border-vibora-cream/30 bg-black/20 px-4">
                  <option>Selecione</option>
                  <option>Braço</option>
                  <option>Antebraço</option>
                  <option>Perna</option>
                  <option>Costela</option>
                  <option>Peito</option>
                  <option>Costas</option>
                </select>
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label>Região específica</label>

                <input
                  type="text"
                  placeholder="Ex: parte interna do antebraço..."
                  className="h-12 rounded-md border border-vibora-cream/30 bg-black/20 px-4"
                />
              </div>

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="w-64 rounded-2xl border border-vibora-cream/40 px-10 py-4 text-lg transition font-vibora-ui hover:bg-vibora-cream/10"
                >
                  AVANÇAR
                </button>
              </div>
            </form>
          </div>

          <img
            src={caveirao}
            alt="Tattoo"
            className="hidden h-[520px] w-[240px] rounded-3xl border border-vibora-cream/30 object-cover lg:block"
          />
        </section>
      </div>
    </main>
  )
}

export default FormTattoo