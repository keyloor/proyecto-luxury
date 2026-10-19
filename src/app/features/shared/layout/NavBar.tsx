import { NavLink } from 'react-router-dom'
import Logo from '../components/Logo'
import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink
          to="/"
          className="navbar__brand"
          aria-label="K Motors — Inicio"
        >
          <Logo />
        </NavLink>

        <nav className="navbar__links" aria-label="Navegación principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/cars"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Autos
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contacto
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
