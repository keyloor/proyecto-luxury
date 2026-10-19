import { Link } from "react-router-dom"
import "../styles/NotFound.css"

const NotFound = () => {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <span className="not-found__code" aria-hidden="true">404</span>

      <p className="eyebrow">Error 404 · Fuera de ruta</p>

      <h1 id="not-found-title" className="not-found__title">Esta página no existe</h1>

      <p className="not-found__text">
        La dirección puede haber cambiado o estar escrita incorrectamente.
        Retoma el camino y descubre tu próximo auto.
      </p>

      <div className="not-found__actions">
        <Link className="btn btn--dark" to="/">Volver al inicio</Link>

        <Link className="btn btn--ghost" to="/cars">
          Explorar colección <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default NotFound
