import { Link } from 'react-router-dom'
import type { Car } from '../types/Car'
import '../styles/CardCar.css'

interface CardCarProps {
  car: Car;
}

const CardCar = ({car}: CardCarProps) => {
  return (
    <article className="car-card">
      <div className="car-card__media">
        <img src={car.image} alt={`Ilustración de ${car.name}`} />

        <span className="car-card__type">{car.type}</span>
        <span className="car-card__fav" aria-hidden="true">♡</span>
      </div>

      <div className="car-card__body">
        <p className="car-card__location">{car.location}</p>
        <h3 className="car-card__name">{car.name}</h3>

        <div className="car-card__specs">
          <span>{car.year}</span>

          <span>{car.mileage.toLocaleString("es-CR")} km</span>

          <span>{car.seats} pasajeros</span>
        </div>

        <div className="car-card__footer">
          <strong className="car-card__price">USD {car.price.toLocaleString("es-CR")}</strong>

          <Link className="text-link" to={`/cars/${car.id}`}>Ver detalle →</Link>
        </div>
      </div>
    </article>
  )
}

export default CardCar
