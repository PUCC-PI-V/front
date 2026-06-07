import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/routes'

const NAV_ITEMS = [
  { label: 'Sobre Mim', path: ROUTES.ABOUT },
  { label: 'Home', path: ROUTES.HOME },
]

function NavLink({ label, path, isActive, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`
        relative font-vibora-ui text-sm font-semibold uppercase tracking-[0.2em]
        transition-colors duration-200
        after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-vibora-cream
        after:transition-all after:duration-300
        ${isActive
          ? 'text-vibora-cream after:w-full'
          : 'text-vibora-cream/75 after:w-0 hover:text-vibora-cream hover:after:w-full'
        }
        ${className}
      `}
    >
      {label}
    </button>
  )
}

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const goTo = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-vibora-cream/15 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
        <button
          type="button"
          onClick={() => goTo(ROUTES.HOME)}
          className="font-cinzel text-lg text-vibora-cream transition-opacity duration-200 hover:opacity-80 sm:text-xl"
        >
          Vibora Ink
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={path}
              label={label}
              path={path}
              isActive={isActive(path)}
              onClick={() => goTo(path)}
            />
          ))}
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-vibora-cream/30 text-vibora-cream transition-colors hover:border-vibora-cream/60 hover:bg-vibora-cream/5 md:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block size-4">
            <span
              className={`absolute left-0 top-0 block h-px w-4 bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 top-3 block h-px w-4 bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      <nav
        className={`overflow-hidden border-t border-vibora-cream/10 transition-all duration-300 md:hidden ${menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 border-t-transparent'}`}
        aria-label="Navegação mobile"
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={path}
              label={label}
              path={path}
              isActive={isActive(path)}
              onClick={() => goTo(path)}
              className="w-fit text-left tracking-[0.25em]"
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
