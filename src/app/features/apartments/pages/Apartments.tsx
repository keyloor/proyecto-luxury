import { useState } from 'react'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../types/Apartment'
import ApartmentCardList from '../components/ApartmentCardList'
import SearchBar from '../components/SearchBar'
import ApartmentFilters from '../components/ApartmentFilters'
import '../styles/Apartments.css'

const Apartments = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>('/data/apartments.json')
  const [search, setSearch] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedBedrooms, setSelectedBedrooms] = useState('')

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

  return (
    <section className="container page-section">
      <h1 className="apartments-title">Apartamentos</h1>

      <div className="apartments-toolbar">
        <SearchBar search={search} onSearchChange={setSearch} />
        <ApartmentFilters
          locations={locations}
          bedroomOptions={bedroomOptions}
          selectedLocation={selectedLocation}
          selectedBedrooms={selectedBedrooms}
          onLocationChange={setSelectedLocation}
          onBedroomsChange={setSelectedBedrooms}
        />
      </div>

      {filteredApartments.length === 0 ? (
        <p className="apartments-message">
          No hay apartamentos que coincidan con la búsqueda.
        </p>
      ) : (
        <ApartmentCardList apartments={filteredApartments} />
      )}
    </section>
  )
}

export default Apartments