import { Link } from 'react-router-dom'
import type { Apartment } from '../types/Apartment'
import '../styles/ApartmentCard.css'

interface ApartmentCardProps {
  apartment: Apartment
}

const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  return (
    <article className="apartment-card">
      <img
        className="apartment-card-image"
        src={apartment.image}
        alt={`Foto de ${apartment.name}`}
      />

      <div className="apartment-card-body">
        <p className="apartment-card-location">{apartment.location}</p>
        <h2 className="apartment-card-name">{apartment.name}</h2>

        <ul className="apartment-card-features">
          <li>{apartment.bedrooms} hab.</li>
          <li>{apartment.bathrooms} baños</li>
          <li>{apartment.area} m²</li>
        </ul>

        <p className="apartment-card-price">
          ${apartment.price.toLocaleString('es-CR')} <span>/ mes</span>
        </p>

        <Link className="apartment-card-link" to={`/apartamentos/${apartment.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default ApartmentCard