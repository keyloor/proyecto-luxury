import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../types/Apartment'
import '../styles/ApartmentDetail.css'

const ApartmentDetail = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')

  if (isLoading) {
    return (
      <section className="container page-section">
        <p className="apartment-detail-message">Cargando apartamento...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container page-section">
        <p className="apartment-detail-message">No se pudo cargar el apartamento: {error}</p>
      </section>
    )
  }

  const apartment = data?.find((item) => item.id === Number(id))

  if (!apartment) {
    return (
      <section className="container page-section">
        <p className="apartment-detail-message">No encontramos este apartamento.</p>
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
        />

        <div className="apartment-detail-info">
          <p className="apartment-detail-location">{apartment.location}</p>
          <h1 className="apartment-detail-name">{apartment.name}</h1>

          <p className="apartment-detail-price">
            ${apartment.price.toLocaleString('es-CR')} <span>/ mes</span>
          </p>

          <ul className="apartment-detail-features">
            <li>
              <strong>{apartment.bedrooms}</strong> habitaciones
            </li>
            <li>
              <strong>{apartment.bathrooms}</strong> baños
            </li>
            <li>
              <strong>{apartment.area}</strong> m²
            </li>
          </ul>

          <p className="apartment-detail-description">{apartment.description}</p>

          <div className="apartment-detail-amenities">
            <h2>Amenidades</h2>
            <ul>
              {apartment.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>

          <Link
            className="apartment-detail-contact"
            to={`/contacto?propiedad=${encodeURIComponent(apartment.name)}`}
          >
            Consultar por este apartamento
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ApartmentDetail