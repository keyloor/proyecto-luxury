import { useState } from 'react'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../types/Apartment'
import ApartmentCardList from '../components/ApartmentCardList'
import SearchBar from '../components/SearchBar'
import ApartmentFilters from '../components/ApartmentFilters'
import Pagination from '../components/Pagination'
import '../styles/Apartments.css'

const ITEMS_PER_PAGE = 5

const Apartments = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')
  const [search, setSearch] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedBedrooms, setSelectedBedrooms] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value)
    setCurrentPage(1)
  }

  const handleBedroomsChange = (value: string) => {
    setSelectedBedrooms(value)
    setCurrentPage(1)
  }

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

  const locations = data
    .map((apartment) => apartment.location)
    .filter((location, index, list) => list.indexOf(location) === index)

  const bedroomOptions = data
    .map((apartment) => apartment.bedrooms)
    .filter((bedrooms, index, list) => list.indexOf(bedrooms) === index)
    .sort((a, b) => a - b)

  const text = search.toLowerCase()

  const filteredApartments = data.filter((apartment) => {
    const matchesSearch =
      apartment.name.toLowerCase().includes(text) ||
      apartment.location.toLowerCase().includes(text)
    const matchesLocation = selectedLocation === '' || apartment.location === selectedLocation
    const matchesBedrooms =
      selectedBedrooms === '' || apartment.bedrooms === Number(selectedBedrooms)

    return matchesSearch && matchesLocation && matchesBedrooms
  })

  const totalPages = Math.ceil(filteredApartments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const pageApartments = filteredApartments.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className="container page-section">
      <h1 className="apartments-title">Apartamentos</h1>

      <div className="apartments-toolbar">
        <SearchBar search={search} onSearchChange={handleSearchChange} />
        <ApartmentFilters
          locations={locations}
          bedroomOptions={bedroomOptions}
          selectedLocation={selectedLocation}
          selectedBedrooms={selectedBedrooms}
          onLocationChange={handleLocationChange}
          onBedroomsChange={handleBedroomsChange}
        />
      </div>

      {filteredApartments.length === 0 ? (
        <p className="apartments-message">
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