import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <section className="container page-section not-found">
      <h1>Esta página no existe</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}

export default NotFound
