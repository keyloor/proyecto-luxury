import { Link } from 'react-router-dom'
import type { Apartment } from '../types/Apartment'
import '../styles/ApartmentCard.css'

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard = ({apartment}: ApartmentCardProps) => {
  return (
    <article className="apartment-card">
      <div className="apartment-card__media">
        <img src={apartment.image} alt={`Foto de ${apartment.name}`} />

        <span className="apartment-card__location">{apartment.location}</span>
      </div>

      <div className="apartment-card__body">
        <h3 className="apartment-card__name">{apartment.name}</h3>

        <div className="apartment-card__specs">
          <span>{apartment.bedrooms} hab.</span>

          <span>{apartment.bathrooms} {apartment.bathrooms === 1 ? "baño" : "baños"}</span>

          <span>{apartment.area} m²</span>
        </div>

        <div className="apartment-card__footer">
          <strong className="apartment-card__price">
            USD {apartment.price.toLocaleString("es-CR")} <small>/ mes</small>
          </strong>

          <Link className="text-link" to={`/apartamentos/${apartment.id}`}>Ver detalle →</Link>
        </div>
      </div>
    </article>
  )
}

export default ApartmentCard
