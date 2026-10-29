import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../types/Apartment'
import FavoriteButton from '../../favorites/components/FavoriteButton'
import ApartmentMap from '../components/ApartmentMap'
import '../styles/ApartmentDetail.css'

const ApartmentDetail = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')

  if (isLoading) {
    return (
      <section className="container page-section">
        <p className="page-message">Cargando apartamento...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container page-section">
        <p className="page-message">No se pudo cargar el apartamento: {error}</p>
      </section>
    )
  }

  const apartment = data?.find((item) => item.id === Number(id))

  if (!apartment) {
    return (
      <section className="container page-section">
        <p className="page-message">No encontramos este apartamento.</p>
        <Link className="apartment-detail-back" to="/apartamentos">
          ← Volver al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="container page-section">
      <Link className="apartment-detail-back" to="/apartamentos">
        ← Volver al catálogo
      </Link>

      <div className="apartment-detail">
        <img
          className="apartment-detail-image"
          src={apartment.image}
          alt={`Foto de ${apartment.name}`}
          width={1200}
          height={900}
        />

        <div className="apartment-detail-info panel">
          <p className="eyebrow">{apartment.location}</p>
          <h1 className="page-title">{apartment.name}</h1>

          <p className="apartment-detail-price">
            ${apartment.price.toLocaleString('es-CR')} <span>/ mes</span>
          </p>

          <ul className="apartment-detail-features">
            <li>
              <strong>{apartment.bedrooms}</strong> <span>{apartment.bedrooms === 1 ? 'habitación' : 'habitaciones'}</span>
            </li>
            <li>
              <strong>{apartment.bathrooms}</strong> <span>{apartment.bathrooms === 1 ? 'baño' : 'baños'}</span>
            </li>
            <li>
              <strong>{apartment.area}</strong> <span>m²</span>
            </li>
          </ul>

          <p className="apartment-detail-description">{apartment.description}</p>

          <div className="apartment-detail-amenities">
            <h2>Amenidades</h2>
            <ul>
              {apartment.amenities.map((amenity) => (
                <li key={amenity} className="tag glass">{amenity}</li>
              ))}
            </ul>
          </div>

          <div className="apartment-detail-actions">
            <Link
              className="button button--light"
              to={`/contacto?propiedad=${encodeURIComponent(apartment.name)}`}
            >
              Solicitar una visita
            </Link>
            <FavoriteButton id={apartment.id} />
          </div>
        </div>
      </div>
      <ApartmentMap location={apartment.location} />
    </section>
  )
}

export default ApartmentDetail
