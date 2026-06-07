import { useEffect } from 'react'
import { useAppNavigation } from '@/navigation/navigation'
import caveirao from '@/assets/caveiraomtfoda.jpg'
import fundo from '@/assets/fundo.png'

function OrnamentDivider() {
  return (
    <div className="my-8 flex w-full max-w-sm items-center gap-3" aria-hidden>
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

function About() {
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

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center px-6 pb-10">
        <section className="flex flex-col items-center">
          <h1 className="font-cinzel text-center text-4xl font-bold tracking-wide sm:text-5xl">
            Vibora Ink
          </h1>

          <OrnamentDivider />

          <h2 className="font-vibora-ui text-center text-lg font-semibold uppercase tracking-[0.30em] text-vibora-cream/90">
            Sobre a Artista
          </h2>

          <div className="mt-10 flex flex-col items-center lg:flex-row">
            <img
              src={caveirao}
              alt="Arte da tatuadora"
              className="w-96 scale-200 rounded-xl border-[652929] border-1 shadow-lg lg:mr-48"
            />

            <div className="max-w-3xl">
              <div className="h-[500px] overflow-y-auto rounded-2xl border border-vibora-cream/30 bg-vibora-cream/5 px-8 py-6 backdrop-blur-sm">
                <p className="text-center font-vibora-ui text-2xl leading-10 text-vibora-cream-muted">
                  Nascida em 1999, sempre fui apaixonada por arte. Aos 4 anos, criei meu primeiro gibi e, durante a adolescência, explorei diferentes estilos — esboços, realismo, aquarela, acrílica… tudo o que pudesse traduzir o que eu sentia em formas e cores.

                  <br />
                  <br />

                  Por um tempo, a vida me levou por outros caminhos. Atuei por quatro anos na área de biomedicina, mas algo em mim sempre pedia mais arte, mais liberdade.

                  <br />
                  <br />

                  Em outubro de 2023, ao marcar uma sessão de tatuagem com minha irmã e uma grande amiga — tatuadora e artista plástica —, encontrei o empurrão que faltava para mergulhar no mundo da tattoo. Com pouco mais de uma semana de aulas básicas e práticas, tatuei pela primeira vez em pele humana: o braço da própria professora. Ao contrário do que dizem sobre iniciantes, a tatuagem ficou linda — e naquele momento entendi que tinha encontrado meu propósito.

                  <br />
                  <br />

                  Pouco depois, uma viagem a Portugal mudou minha vida. Passei por Mafra, Lisboa, Sintra, Paço de Arcos e, por fim, Covilhã. Foram quinze meses intensos, de muito aprendizado e amadurecimento. Apesar da saudade da família e das noites difíceis, cada sorriso dos meus clientes me lembrava por que eu escolhi esse caminho: ver minha arte se tornando parte da história de alguém.


                  <br />
                  <br />

                  No fim de 2024, voltei ao Brasil com bagagem, coragem e ainda mais paixão pela arte de tatuar. Hoje, com garra e gratidão, meu maior desejo é levar minha arte para o mundo, eternizando histórias — a minha e a sua — na pele.
                </p>
              </div>
            </div>

            <img
              src={caveirao}
              alt="Arte da tatuadora"
              className="w-96 scale-200 rounded-xl border-[652929] border-1 shadow-lg lg:ml-48"
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default About