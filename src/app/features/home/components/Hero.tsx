import { Link } from "react-router-dom"
import "../styles/Hero.css"


const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero__content">
        <p className="eyebrow">K Motors · Costa Rica</p>

        <h1 className="hero__title">El auto que mueve sus planes</h1>

        <p className="hero__text">
          Una colección de vehículos para explorar a su ritmo, comparar
          características y elegir su favorito.
        </p>

        <div className="hero__actions">
          <Link className="btn btn--light" to="/cars">Explorar autos</Link>

          <Link className="btn btn--ghost-light" to="/contact">Hablar con un asesor</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
