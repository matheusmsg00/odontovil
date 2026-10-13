import { clinic } from '../config/clinic'
import { HoursSection } from './HoursSection'
import { PinIcon } from './icons'

export function LocationSection() {
  const { address, maps } = clinic

  return (
    <section id="localizacao" className="section location" aria-labelledby="location-title">
      <div className="container location__grid">
        <div className="location__info" data-reveal>
          <h2 id="location-title" className="h2">
            Estamos em Vilhena.
          </h2>
          <address className="location__address">
            <PinIcon width={22} height={22} />
            <span>
              {address.street}
              <br />
              {address.neighborhood}
              <br />
              {address.city} — {address.state}
              <br />
              CEP {address.postalCode}
            </span>
          </address>
          <a className="btn btn--primary" href={maps.directionsUrl} target="_blank" rel="noopener noreferrer">
            Como chegar
          </a>
        </div>

        <div className="location__map" data-reveal>
          <iframe
            title={`Mapa com a localização da ${clinic.name}: ${address.full}`}
            src={maps.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <div className="container location__hours">
        <HoursSection />
      </div>
    </section>
  )
}
