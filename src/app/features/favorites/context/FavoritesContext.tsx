import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const STORAGE_KEY = 'favoritos'

interface FavoritesContextValue {
  favorites: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
}

interface FavoritesProviderProps {
  children: ReactNode
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const readFavorites = (): number[] => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved === null) {
    return []
  }

  try {
    const parsed: number[] = JSON.parse(saved)
    return parsed
  } catch {
    return []
  }
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<number[]>(readFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (id: number) => favorites.includes(id)

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)

  if (context === null) {
    throw new Error('useFavorites tiene que usarse dentro de FavoritesProvider')
  }

  return context
}
