import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import '../styles/Footer.css'

const year = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo />

        <nav className="footer__links" aria-label="Enlaces del pie de página">
          <Link to="/apartamentos">Apartamentos</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </div>

      <p className="container footer__copyright">
        © {year} Apartamentos Noir · Proyecto académico
      </p>
    </footer>
  )
}

export default Footer
