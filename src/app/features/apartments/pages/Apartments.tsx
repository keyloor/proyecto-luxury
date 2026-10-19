import { useState } from 'react'
import { useFetch } from '../../shared/hooks/useFetch'
import SearchBar from '../../shared/components/SearchBar'
import Pagination from '../../shared/components/Pagination'
import ApartmentFilterBar from '../components/ApartmentFilterBar'
import ApartmentCardList from '../components/ApartmentCardList'
import type { Apartment } from '../types/Apartment'
import type { ApartmentFilters } from '../types/ApartmentFilters'
import '../styles/Apartments.css'

const Apartments = () => {
  const { data, isLoading, error } = useFetch<Apartment[]>("/data/apartments.json");

  const [filters, setFilters] = useState<ApartmentFilters>({
    search: "",
    location: "",
    bedrooms: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const apartmentsPerPage = 5;

  const apartments = data ?? [];

  // Ubicaciones sin repetir, para las opciones del filtro
  const locations = apartments
    .map((apartment) => apartment.location)
    .filter((location, index, list) => list.indexOf(location) === index);

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value });
    setCurrentPage(1);
  };

  const handleLocationChange = (value: string) => {
    setFilters({ ...filters, location: value });
    setCurrentPage(1);
  };

  const handleBedroomsChange = (value: number) => {
    setFilters({ ...filters, bedrooms: value });
    setCurrentPage(1);
  };

  // filter devuelve un arreglo nuevo: el original no se modifica
  const filteredApartments = apartments.filter((apartment) =>
    apartment.name.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.location === "" || apartment.location === filters.location) &&
    apartment.bedrooms >= filters.bedrooms,
  );
  const totalPages = Math.ceil(filteredApartments.length / apartmentsPerPage);
  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const currentApartments = filteredApartments.slice(indexOfFirstApartment, indexOfLastApartment);

  if (isLoading) {
    return (
      <p className="status-message page-section container">
        Cargando apartamentos...
      </p>
    );
  }

  if (error) {
    return (
      <p
        role="alert"
        className="status-message status-message--error page-section container"
      >
        {error}
      </p>
    );
  }

  return (
    <section className="container apartments-page">
      <h1>Apartamentos</h1>

      <div className="apartments-page__filters">
        <SearchBar search={filters.search} onSearchChange={handleSearchChange} />
        <ApartmentFilterBar
          location={filters.location}
          bedrooms={filters.bedrooms}
          locations={locations}
          onLocationChange={handleLocationChange}
          onBedroomsChange={handleBedroomsChange}
        />
      </div>

      {filteredApartments.length > 0 ? (
        <>
          <ApartmentCardList apartments={currentApartments} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() =>
              setCurrentPage((page) => Math.max(1, Math.min(totalPages, page + 1)))
            }
          />
        </>
      ) : (
        <p className="apartments-page__empty" role="status">
          No encontramos apartamentos con esos filtros. Pruebe con otra búsqueda.
        </p>
      )}
    </section>
  )
}

export default Apartments
