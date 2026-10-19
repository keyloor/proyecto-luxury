import { Link } from 'react-router-dom'
import type { Car } from '../types/Car'
import CarFeatures from './CarFeatures'
import '../styles/CarInfo.css'

interface CarInfoProps {
  car: Car;
}

const CarInfo = ({car}: CarInfoProps) => {
  return (
    <section className="car-info">
      <Link className="text-link" to="/cars">← Volver a autos</Link>

      <p className="car-info__location">{car.location}</p>

      <h1>{car.name}</h1>

      <div className="car-info__specs">
        <span>
          <strong>{car.year}</strong> año
        </span>

        <span>
          <strong>{car.mileage.toLocaleString("es-CR")}</strong> km
        </span>

        <span>
          <strong>{car.seats}</strong> pasajeros
        </span>
      </div>

      <h2>Descripción</h2>

      <p>{car.description}</p>

      <CarFeatures features={car.features} />
    </section>
  )
}

export default CarInfo
