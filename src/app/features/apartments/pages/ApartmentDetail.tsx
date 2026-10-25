import { useParams } from 'react-router-dom'

const ApartmentDetail = () => {
  const { id } = useParams()

  return (
    <section className="container page-section">
      <h1>Apartamento {id}</h1>
    </section>
  )
}

export default ApartmentDetail
