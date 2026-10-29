import { Link } from 'react-router-dom'
import type { Apartment } from '../types/Apartment'
import '../styles/ApartmentCard.css'

interface ApartmentCardProps {
  apartment: Apartment
}

const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  return (
    <article className="apartment-card panel">
      <img
        className="apartment-card-image"
        src={apartment.image}
        alt={`Foto de ${apartment.name}`}
        width={1200}
        height={900}
      />

      <div className="apartment-card-body">
        <p className="eyebrow">{apartment.location}</p>
        <h2 className="apartment-card-name">{apartment.name}</h2>

        <ul className="apartment-card-features">
          <li>{apartment.bedrooms} hab.</li>
          <li>{apartment.bathrooms} {apartment.bathrooms === 1 ? 'baño' : 'baños'}</li>
          <li>{apartment.area} m²</li>
        </ul>

        <p className="apartment-card-price">
          ${apartment.price.toLocaleString('es-CR')} <span>/ mes</span>
        </p>

        <Link className="button button--glass glass apartment-card-link" to={`/apartamentos/${apartment.id}`}>
          Ver apartamento <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

export default ApartmentCard
