import type { Car } from "../types/Car";
import CardCar from "./CardCar"
import "../styles/CardCarList.css"

interface CardListProps {
  cars: Car[];
}

const CardCarList = ({cars}: CardListProps) => {
  return (
    <div className="card-list">
      {cars.map((car) => (
        <CardCar key={car.id} car={car} />
      ))}
    </div>
  )
}

export default CardCarList
