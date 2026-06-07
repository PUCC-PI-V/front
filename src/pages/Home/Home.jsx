import Button from '@/components/Button'
import caveirao from '@/assets/caveiraomtfoda.jpg'
import Header from '@/components/Header'

function Home() {
  const handleOrcamento = () => {
    console.log('Solicitar orçamento')
  }

  return (
    <>
      <main className="flex h-[calc(100vh-80px)] items-center justify-center px-10">
        
        <div className="flex w-full max-w-7xl items-center justify-between gap-20">
          
          {/* Lado esquerdo */}
          <section className="flex max-w-xl flex-col items-start">
            <h1 className="font-cinzel text-6xl font-bold text-vibora-cream">
              Vibora Ink
            </h1>

            <p className="mt-6 font-vibora-ui text-2xl leading-relaxed text-vibora-cream-muted">
              Cada pele conta uma história.
              <br />
              Qual é a sua?
            </p>

            <div className="mt-12">
              <Button
                text="SOLICITAR ORÇAMENTO"
                onClick={handleOrcamento}
              />
            </div>
          </section>

          {/* Lado direito */}
          <section>
            <img
              src={caveirao}
              alt="Arte da tatuadora"
              className="w-72 scale-150 rounded-2xl border-[652929] border-1 shadow-2xl"
            />
          </section>

        </div>
      </main>
    </>
  )
}

export default Home