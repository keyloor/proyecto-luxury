import '../styles/ApartmentMap.css'

interface ApartmentMapProps {
  location: string
}

// Referencias geográficas consultadas en OpenStreetMap; no son direcciones de los apartamentos.
const locations = [
  { name: 'Escazú', latitude: 9.9159921, longitude: -84.1409588 },
  { name: 'Santa Ana', latitude: 9.9179767, longitude: -84.1915696 },
  { name: 'Rohrmoser', latitude: 9.9420456, longitude: -84.1139429 },
  { name: 'Curridabat', latitude: 9.9161655, longitude: -84.0308421 },
  { name: 'Belén', latitude: 9.9792975, longitude: -84.1856200 },
  { name: 'Tamarindo', latitude: 10.2984121, longitude: -85.8399505 },
  { name: 'Playa Flamingo', latitude: 10.4283957, longitude: -85.7933377 },
  { name: 'Jacó', latitude: 9.6156361, longitude: -84.6281253 },
]

const ApartmentMap = ({ location }: ApartmentMapProps) => {
  const zone = locations.find((item) => item.name === location)

  if (!zone) {
    return null
  }

  const bounds = [
    zone.longitude - 0.02,
    zone.latitude - 0.012,
    zone.longitude + 0.02,
    zone.latitude + 0.012,
  ].join(',')
  const mapUrl = `https://www.openstreetmap.org/#map=14/${zone.latitude}/${zone.longitude}`

  return (
    <section className="apartment-map panel" aria-label={`Ubicación de referencia en ${location}`}>
      <div className="apartment-map-heading">
        <div>
          <p className="eyebrow">La zona</p>
          <h2>{location}</h2>
        </div>
        <a className="button button--glass glass" href={mapUrl} target="_blank" rel="noreferrer">
          Abrir mapa <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="page-intro">
        Ubicación de referencia de la zona, no la dirección exacta del apartamento.
      </p>
      <iframe
        title={`Mapa de ${location}, Costa Rica`}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bounds)}&layer=mapnik`}
        loading="lazy"
        width="100%"
        height="320"
      />
      <p className="apartment-map-credit">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>
      </p>
    </section>
  )
}

export default ApartmentMap
