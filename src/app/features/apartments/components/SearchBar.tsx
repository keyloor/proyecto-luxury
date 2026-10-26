import '../styles/SearchBar.css'

interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
}

const SearchBar = ({ search, onSearchChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        type="text"
        placeholder="Nombre o ubicación"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar