import { useState } from 'react'
import cars from '../../../../../public/data/cars.json'
import SearchBar from '../../shared/components/SearchBar'
import Pagination from '../../shared/components/Pagination'
import CardCarList from '../components/CardCarList'
import '../styles/Cars.css'

const Cars = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <main className="container cars-page">
      <h1>Todos los autos</h1>
      <SearchBar search={search} onSearchChange={handleSearchChange} />
      {filteredCars.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
          onNext={() =>
            setCurrentPage((page) => Math.max(1, Math.min(totalPages, page + 1)))
          }
        />
      )}
      {filteredCars.length > 0 ? (
        <CardCarList cars={currentCars} />
      ) : (
        <p className="cars-page__empty" role="status">
          No encontramos autos con ese nombre. Prueba con otra búsqueda.
        </p>
      )}
    </main>
  )
}

export default Cars
