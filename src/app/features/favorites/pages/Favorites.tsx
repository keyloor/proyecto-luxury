import { Link } from 'react-router-dom'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../../apartments/types/Apartment'
import ApartmentCardList from '../../apartments/components/ApartmentCardList'
import { useFavorites } from '../context/FavoritesContext'
import '../styles/Favorites.css'

const Favorites = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')
  const { favorites } = useFavorites()

  if (isLoading) {
    return (
      <section className="container page-section">
        <p className="favorites-message">Cargando favoritos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container page-section">
        <p className="favorites-message">No se pudieron cargar los favoritos: {error}</p>
      </section>
    )
  }

  const favoriteApartments = data
    ? data.filter((apartment) => favorites.includes(apartment.id))
    : []

  return (
    <section className="container page-section">
      <h1 className="favorites-title">Favoritos</h1>

      {favoriteApartments.length === 0 ? (
        <div className="favorites-empty">
          <p className="favorites-message">Todavía no guardaste ningún apartamento.</p>
          <Link className="favorites-link" to="/apartamentos">
            Ver apartamentos
          </Link>
        </div>
      ) : (
        <>
          <p className="favorites-count">
            {favoriteApartments.length === 1
              ? 'Tenés 1 apartamento guardado.'
              : `Tenés ${favoriteApartments.length} apartamentos guardados.`}
          </p>
          <ApartmentCardList apartments={favoriteApartments} />
        </>
      )}
    </section>
  )
}

export default Favorites
