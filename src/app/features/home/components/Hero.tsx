import '../styles/Hero.css'

const tags = ['Diseño contemporáneo', 'Seguridad 24/7', 'Vistas abiertas']

const Hero = () => {
  return (
    <section className="hero">
      <img className="hero__image" src="/images/portada-cielo.webp" alt="" />
      <h1 className="hero__title">Noir</h1>
      <img
        className="hero__tower"
        src="/images/portada-edificio.webp"
        alt="Torre residencial de vidrio bajo un cielo nublado"
      />
      <div className="hero__shade"></div>

      <ul className="hero__tags">
        {tags.map((tag) => (
          <li key={tag} className="hero__tag tag glass">
            {tag}
          </li>
        ))}
      </ul>

      <div className="hero__bottom">
        <div className="hero__text">
          <p className="hero__subtitle-main">Residencias de lujo</p>
          <p className="hero__subtitle">Ciudad y playa en Costa Rica</p>
        </div>

        <a href="#destacados" className="button button--light hero__cta">
          Ver destacados <span className="hero__cta-icon">↓</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
