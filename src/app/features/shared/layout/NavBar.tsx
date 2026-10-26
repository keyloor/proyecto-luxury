import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../components/Logo'
import '../styles/NavBar.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => {
    setIsOpen(false)
  }

  const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')

  return (
    <header className="navbar">
      <div className="container">
        <div className={isOpen ? 'navbar__inner navbar__inner--open glass' : 'navbar__inner glass'}>
          <NavLink to="/" className="navbar__brand" aria-label="Inicio" onClick={closeMenu}>
            <Logo />
          </NavLink>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={isOpen}
            aria-controls="menu-principal"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Cerrar' : 'Menú'}
          </button>

          <nav id="menu-principal" className="navbar__links" aria-label="Navegación principal">
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>
              Inicio
            </NavLink>
            <NavLink to="/apartamentos" className={linkClass} onClick={closeMenu}>
              Apartamentos
            </NavLink>
            <NavLink to="/favoritos" className={linkClass} onClick={closeMenu}>
              Favoritos
            </NavLink>
            <NavLink to="/contacto" className={linkClass} onClick={closeMenu}>
              Contacto
            </NavLink>
          </nav>

          <a className="navbar__phone" href="tel:+50640000000">
            +506 4000 0000
          </a>
        </div>
      </div>
    </header>
  )
}

export default NavBar
