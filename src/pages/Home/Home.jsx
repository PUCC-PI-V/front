import Button from "@/components/Button";

import caveirao from "@/assets/tatuagem.jpeg";

import { useAppNavigation } from "@/navigation/navigation";

function Home() {
  const { goToFormTattoo } = useAppNavigation();

  return (
    <main className="flex min-h-[calc(100dvh-4.5rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 xl:gap-20">
        <section className="flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="font-cinzel text-4xl font-bold text-vibora-cream sm:text-5xl lg:text-6xl">
            Vibora Ink
          </h1>

          <p className="mt-4 font-vibora-ui text-lg leading-relaxed text-vibora-cream-muted sm:mt-6 sm:text-xl lg:text-2xl">
            Cada pele conta uma história.
            <br />
            Qual é a sua?
          </p>

          <div className="mt-8 w-full sm:mt-10 sm:w-auto lg:mt-12">
            <Button text="SOLICITAR ORÇAMENTO" onClick={goToFormTattoo} />
          </div>
        </section>

        <section className="flex w-full shrink-0 justify-center lg:w-auto">
          <div className="relative h-[320px] w-[200px] overflow-hidden rounded-3xl border border-vibora-cream/30 shadow-2xl shadow-black/50 sm:h-[400px] sm:w-[220px] lg:h-[480px] lg:w-[250px] xl:h-[520px] xl:w-[280px]">
            <img
              src={caveirao}
              alt="Arte da tatuadora"
              className="size-full object-cover object-[62%_center]"
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-vibora-cream/15"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent"
              aria-hidden
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
