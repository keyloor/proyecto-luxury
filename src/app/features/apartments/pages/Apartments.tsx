import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../types/Apartment'
import ApartmentCardList from '../components/ApartmentCardList'
import '../styles/Apartments.css'

const Apartments = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')

  if (isLoading) {
    return (
      <section className="container page-section">
        <p className="apartments-message">Cargando apartamentos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container page-section">
        <p className="apartments-message">No se pudieron cargar los apartamentos: {error}</p>
      </section>
    )
  }

  if (!data || data.length === 0) {
    return (
      <section className="container page-section">
        <p className="apartments-message">No hay apartamentos disponibles.</p>
      </section>
    )
  }

  return (
    <section className="container page-section">
      <h1 className="apartments-title">Apartamentos</h1>
      <ApartmentCardList apartments={data} />
    </section>
  )
}

export default Apartments