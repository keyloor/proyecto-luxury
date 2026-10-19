import { Link } from 'react-router-dom'
import type { Car } from '../types/Car'
import '../styles/CarPurchaseCard.css'

interface CarPurchaseCardProps {
  car: Car;
}

const CarPurchaseCard = ({car}: CarPurchaseCardProps) => {
  return (
    <aside className="container purchase-card">
      <p className="purchase-card__label">Precio de venta</p>

      <h2 className="purchase-card__price">
        USD {car.price.toLocaleString("es-CR")}
      </h2>

      <p className="purchase-card__description">
        Precio ilustrativo para este ejercicio académico.
      </p>

      <Link
        className="purchase-card__button purchase-card__button--primary"
        to={`/contact?car=${encodeURIComponent(car.name)}`}
      >
        Solicitar información
      </Link>

      {/* El botón de favoritos queda pendiente de conectar con el estado de favoritos. */}
    </aside>
  )
}

export default CarPurchaseCard
