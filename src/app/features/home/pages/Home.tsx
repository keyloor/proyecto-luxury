import { Link } from 'react-router-dom'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../../apartments/types/Apartment'
import Hero from '../components/Hero'
import ApartmentCardList from '../../apartments/components/ApartmentCardList'
import '../styles/Home.css'

const Home = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')

  const apartments = data ?? []
  const featured = apartments.filter((apartment) => apartment.featured)
  const locations = new Set(apartments.map((apartment) => apartment.location))

  return (
    <>
      <Hero />

      <section className="container home-stats">
        <div className="home-stat">
          <p className="home-stat__number">{apartments.length}</p>
          <p className="home-stat__label">Residencias</p>
        </div>
        <div className="home-stat">
          <p className="home-stat__number">{locations.size}</p>
          <p className="home-stat__label">Ubicaciones</p>
        </div>
        <div className="home-stat">
          <p className="home-stat__number">24/7</p>
          <p className="home-stat__label">Seguridad</p>
        </div>
      </section>

      <section id="destacados" className="container home-featured">
        <div className="home-featured__header">
          <div>
            <p className="eyebrow">Selección Noir</p>
            <h2 className="home-featured__title">Apartamentos destacados</h2>
          </div>
          <Link to="/apartamentos" className="button button--glass glass">
            Ver todos
          </Link>
        </div>

        {isLoading && <p className="home-message">Cargando apartamentos...</p>}
        {error && <p className="home-message">No se pudieron cargar los apartamentos.</p>}
        {!isLoading && !error && <ApartmentCardList apartments={featured} />}
      </section>

      <section className="container">
        <div className="home-cta">
          <h2 className="home-cta__title">¿Quieres conocerlo en persona?</h2>
          <p className="home-cta__text">Agenda una visita privada, sin compromiso.</p>
          <Link to="/contacto" className="button button--light">
            Agendar visita
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
