import '../styles/ApartmentFilters.css'

interface ApartmentFiltersProps {
  locations: string[]
  bedroomOptions: number[]
  selectedLocation: string
  selectedBedrooms: string
  onLocationChange: (value: string) => void
  onBedroomsChange: (value: string) => void
}

const ApartmentFilters = ({
  locations,
  bedroomOptions,
  selectedLocation,
  selectedBedrooms,
  onLocationChange,
  onBedroomsChange,
}: ApartmentFiltersProps) => {
  return (
    <div className="apartment-filters">
      <div className="apartment-filter field">
        <label htmlFor="location">Ubicación</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(event) => onLocationChange(event.target.value)}
        >
          <option value="">Todas</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="apartment-filter field">
        <label htmlFor="bedrooms">Habitaciones</label>
        <select
          id="bedrooms"
          value={selectedBedrooms}
          onChange={(event) => onBedroomsChange(event.target.value)}
        >
          <option value="">Todas</option>
          {bedroomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ApartmentFilters
