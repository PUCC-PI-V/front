import barbara from '@/assets/barbara.jpg'
import barbaraa from '@/assets/barbaraa.jpeg'

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

const BIO = `Nascida em 1999, sempre fui apaixonada por arte. Aos 4 anos, criei meu primeiro gibi e, durante a adolescência, explorei diferentes estilos — esboços, realismo, aquarela, acrílica… tudo o que pudesse traduzir o que eu sentia em formas e cores.

Por um tempo, a vida me levou por outros caminhos. Atuei por quatro anos na área de biomedicina, mas algo em mim sempre pedia mais arte, mais liberdade.

Em outubro de 2023, ao marcar uma sessão de tatuagem com minha irmã e uma grande amiga — tatuadora e artista plástica —, encontrei o empurrão que faltava para mergulhar no mundo da tattoo. Com pouco mais de uma semana de aulas básicas e práticas, tatuei pela primeira vez em pele humana: o braço da própria professora. Ao contrário do que dizem sobre iniciantes, a tatuagem ficou linda — e naquele momento entendi que tinha encontrado meu propósito.

Pouco depois, uma viagem a Portugal mudou minha vida. Passei por Mafra, Lisboa, Sintra, Paço de Arcos e, por fim, Covilhã. Foram quinze meses intensos, de muito aprendizado e amadurecimento. Apesar da saudade da família e das noites difíceis, cada sorriso dos meus clientes me lembrava por que eu escolhi esse caminho: ver minha arte se tornando parte da história de alguém.

No fim de 2024, voltei ao Brasil com bagagem, coragem e ainda mais paixão pela arte de tatuar. Hoje, com garra e gratidão, meu maior desejo é levar minha arte para o mundo, eternizando histórias — a minha e a sua — na pele.`

function AboutImage() {
  return (
    <div className="relative mx-auto h-[280px] w-[180px] shrink-0 overflow-hidden rounded-3xl border border-vibora-cream/30 shadow-2xl shadow-black/40 sm:h-[360px] sm:w-[220px] lg:h-[420px] lg:w-[250px]">
      <img
        src={barbara}
        alt="Arte da tatuadora"
        className="size-full object-cover object-[62%_center]"
      />
    </div>
  )
}

function AboutImagee() {
  return (
    <div className="relative mx-auto h-[280px] w-[180px] shrink-0 overflow-hidden rounded-3xl border border-vibora-cream/30 shadow-2xl shadow-black/40 sm:h-[360px] sm:w-[220px] lg:h-[420px] lg:w-[250px]">
      <img
        src={barbaraa}
        alt="Arte da tatuadora"
        className="size-full object-cover object-[62%_center]"
      />
    </div>
  )
}

function About() {
  return (
    <main className="min-h-[calc(100dvh-4.5rem)] px-4 py-8 text-vibora-cream sm:px-6 sm:py-10 lg:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-cinzel text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl">
            Vibora Ink
          </h1>
          <OrnamentDivider />
          <h2 className="font-vibora-ui text-base font-semibold uppercase tracking-[0.2em] text-vibora-cream/90 sm:text-lg sm:tracking-[0.3em]">
            Sobre a Artista
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8 lg:mt-10 lg:flex-row lg:items-start lg:justify-center lg:gap-12 xl:gap-16">
          <AboutImage />

          <div className="w-full max-w-2xl lg:max-w-xl xl:max-w-2xl">
            <div className="max-h-[50vh] overflow-y-auto rounded-2xl border border-vibora-cream/30 bg-vibora-cream/5 px-5 py-5 backdrop-blur-sm sm:max-h-[55vh] sm:px-8 sm:py-6 lg:max-h-[420px]">
              <p className="whitespace-pre-line text-center font-vibora-ui text-base leading-8 text-vibora-cream-muted sm:text-lg sm:leading-9 md:text-xl md:leading-10">
                {BIO}
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <AboutImagee />
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
