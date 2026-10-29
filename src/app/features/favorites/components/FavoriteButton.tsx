import { useFavorites } from '../context/FavoritesContext'

interface FavoriteButtonProps {
  id: number
}

const FavoriteButton = ({ id }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      type="button"
      className={active ? 'button button--light' : 'button button--glass glass'}
      onClick={() => toggleFavorite(id)}
      aria-pressed={active}
      aria-label={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <span aria-hidden="true">{active ? '♥' : '♡'}</span>
      {active ? 'En favoritos' : 'Guardar'}
    </button>
  )
}

export default FavoriteButton
