import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <section className="container not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Esta página no existe</h1>
      <p className="not-found__text">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
      <Link to="/" className="button button--light">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
