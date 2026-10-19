import { Link } from 'react-router-dom'
import CardCarList from '../../cars/components/CardCarList'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import cars from "../../../../../public/data/cars.json"
import '../styles/Home.css'

const Home = () => {

const featuredCars = cars.filter((car) => car.featured).slice(0, 3);

  return (
    <main>
      <Hero />

      <section className="featured">
        <p className="eyebrow">Selección destacada</p>

        <h2 className="featured__title">Conozca la colección</h2>

        <Link className="text-link featured__all" to="/cars">Ver todos los autos →</Link>

        <CardCarList cars={featuredCars} />

        <Experience />
      </section>
    </main>
  )
}

export default Home
