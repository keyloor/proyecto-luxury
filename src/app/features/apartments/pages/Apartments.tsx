import { useState } from 'react'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../types/Apartment'
import type { ApartmentFiltersState } from '../types/ApartmentFiltersState'
import ApartmentCardList from '../components/ApartmentCardList'
import SearchBar from '../components/SearchBar'
import ApartmentFilters from '../components/ApartmentFilters'
import Pagination from '../components/Pagination'
import '../styles/Apartments.css'

const ITEMS_PER_PAGE = 5

const initialFilters: ApartmentFiltersState = {
  search: '',
  location: '',
  bedrooms: '',
}

const Apartments = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')
  const [filters, setFilters] = useState<ApartmentFiltersState>(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value })
    setCurrentPage(1)
  }

  const handleLocationChange = (value: string) => {
    setFilters({ ...filters, location: value })
    setCurrentPage(1)
  }

  const handleBedroomsChange = (value: string) => {
    setFilters({ ...filters, bedrooms: value })
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <section className="container page-section">
        <p className="page-message">Cargando apartamentos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container page-section">
        <p className="page-message">No se pudieron cargar los apartamentos: {error}</p>
      </section>
    )
  }

  if (!data || data.length === 0) {
    return (
      <section className="container page-section">
        <p className="page-message">No hay apartamentos disponibles.</p>
      </section>
    )
  }

  const locations = data
    .map((apartment) => apartment.location)
    .filter((location, index, list) => list.indexOf(location) === index)

  const bedroomOptions = data
    .map((apartment) => apartment.bedrooms)
    .filter((bedrooms, index, list) => list.indexOf(bedrooms) === index)
    .sort((a, b) => a - b)

  const text = filters.search.toLowerCase()

  const filteredApartments = data.filter((apartment) => {
    const matchesSearch =
      apartment.name.toLowerCase().includes(text) ||
      apartment.location.toLowerCase().includes(text)
    const matchesLocation = filters.location === '' || apartment.location === filters.location
    const matchesBedrooms =
      filters.bedrooms === '' || apartment.bedrooms === Number(filters.bedrooms)

    return matchesSearch && matchesLocation && matchesBedrooms
  })

  const totalPages = Math.ceil(filteredApartments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const pageApartments = filteredApartments.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className="container page-section">
      <header className="page-heading">
        <p className="eyebrow">Colección Noir</p>
        <h1 className="page-title">Un espacio que va contigo.</h1>
        <p className="page-intro">Ciudad o playa. Explora las residencias y encuentra tu próximo hogar.</p>
      </header>

      <div className="apartments-toolbar panel">
        <SearchBar search={filters.search} onSearchChange={handleSearchChange} />
        <ApartmentFilters
          locations={locations}
          bedroomOptions={bedroomOptions}
          selectedLocation={filters.location}
          selectedBedrooms={filters.bedrooms}
          onLocationChange={handleLocationChange}
          onBedroomsChange={handleBedroomsChange}
        />
      </div>

      <p className="page-intro" role="status">
        {filteredApartments.length} {filteredApartments.length === 1 ? 'residencia disponible' : 'residencias disponibles'}
      </p>

      {filteredApartments.length === 0 ? (
        <p className="page-message">
          No hay apartamentos que coincidan con la búsqueda.
        </p>
      ) : (
        <>
          <ApartmentCardList apartments={pageApartments} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage(currentPage - 1)}
              onNext={() => setCurrentPage(currentPage + 1)}
            />
          )}
        </>
      )}
    </section>
  )
}

export default Apartments
