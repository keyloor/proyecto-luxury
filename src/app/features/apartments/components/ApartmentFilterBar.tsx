import '../styles/ApartmentFilterBar.css'

interface ApartmentFilterBarProps {
  location: string;
  bedrooms: number;
  locations: string[];
  onLocationChange: (value: string) => void;
  onBedroomsChange: (value: number) => void;
}

const ApartmentFilterBar = ({
  location,
  bedrooms,
  locations,
  onLocationChange,
  onBedroomsChange,
}: ApartmentFilterBarProps) => {
  return (
    <div className="filter-bar">
      <label className="filter-bar__field">
        <span>Ubicación</span>
        <select value={location} onChange={(e) => onLocationChange(e.target.value)}>
          <option value="">Todas</option>
          {locations.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <label className="filter-bar__field">
        <span>Habitaciones</span>
        <select value={bedrooms} onChange={(e) => onBedroomsChange(Number(e.target.value))}>
          <option value={0}>Cualquiera</option>
          <option value={1}>1 o más</option>
          <option value={2}>2 o más</option>
          <option value={3}>3 o más</option>
          <option value={4}>4 o más</option>
        </select>
      </label>
    </div>
  )
}

export default ApartmentFilterBar
