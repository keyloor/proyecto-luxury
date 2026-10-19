import type { Apartment } from '../types/Apartment'
import ApartmentCard from './ApartmentCard'
import '../styles/ApartmentCardList.css'

interface ApartmentCardListProps {
  apartments: Apartment[];
}

const ApartmentCardList = ({apartments}: ApartmentCardListProps) => {
  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  )
}

export default ApartmentCardList
