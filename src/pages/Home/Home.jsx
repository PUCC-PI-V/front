
import Button from '@/components/Button'
import caveirao from '../../assets/caveiraomtfoda.jpg'

function Home() {
  const handleClick = () => {
    alert("o jogo")
  }

  return (
    <>    
    <section className="flex flex-row max-w-screen-2xl mx-auto justify-center items-center">
      <div className="flex flex-row justify-center items-center max-w-screen-2xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">ViboraInk</h1>
          <p className="text-lg">Cada pele conta uma história. Qual é a sua?</p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={caveirao} alt="caveirao" />
         </div>
         <div className="rounded-lg overflow-hidden">
          <img src={caveirao} alt="caveirao" />
         </div>
         <div className="rounded-lg overflow-hidden">
          <img src={caveirao} alt="caveirao" />
         </div>
      </div>
    </section>
    </>
  )
}

export default Home



