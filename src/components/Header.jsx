import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full px-10 py-6 flex justify-between items-center">
      
      <div className="font-cinzel text-xl text-vibora-cream">
        Vibora Ink
      </div>

      <div className="flex gap-8">
        <button
          onClick={() => navigate('/about')}
          className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] hover:opacity-70"
        >
          Sobre Mim
        </button>

        <button
          onClick={() => navigate('/')}
          className="font-vibora-ui text-sm font-semibold uppercase tracking-[0.25em] hover:opacity-70"
        >
          Home
        </button>
      </div>

    </header>
  )
}

export default Header