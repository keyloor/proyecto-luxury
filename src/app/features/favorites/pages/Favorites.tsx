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
        <p className="page-message">Cargando favoritos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container page-section">
        <p className="page-message">No se pudieron cargar los favoritos: {error}</p>
      </section>
    )
  }

  const favoriteApartments = data
    ? data.filter((apartment) => favorites.includes(apartment.id))
    : []

  return (
    <section className="container page-section">
      <header className="page-heading">
        <p className="eyebrow">Tu selección</p>
        <h1 className="page-title">Espacios para volver.</h1>
        <p className="page-intro">Guarda tus favoritos desde el detalle y compáralos aquí con calma.</p>
      </header>

      {favoriteApartments.length === 0 ? (
        <div className="favorites-empty">
          <p className="page-message">Aún no tienes apartamentos guardados.</p>
          <Link className="button button--light" to="/apartamentos">
            Ver apartamentos
          </Link>
        </div>
      ) : (
        <>
          <p className="page-intro">
            {favoriteApartments.length === 1
              ? 'Tienes 1 apartamento guardado.'
              : `Tienes ${favoriteApartments.length} apartamentos guardados.`}
          </p>
          <ApartmentCardList apartments={favoriteApartments} />
        </>
      )}
    </section>
  )
}

export default Favorites
