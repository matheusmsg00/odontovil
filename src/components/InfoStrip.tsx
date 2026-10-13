import { clinic } from '../config/clinic'

/** Faixa com os dados essenciais da clínica, logo abaixo da capa. */
export function InfoStrip() {
  const { address, reviews, phone } = clinic

  return (
    <section className="strip" aria-label="Informações da clínica">
      <dl className="container strip__grid">
        <div className="strip__item">
          <dt>Localização</dt>
          <dd>
            {address.city} — {address.state}
          </dd>
        </div>
        <div className="strip__item">
          <dt>Endereço</dt>
          <dd>{address.street}</dd>
        </div>
        <div className="strip__item">
          <dt>Google</dt>
          <dd>
            {reviews.rating} ★ — {reviews.count} avaliações
          </dd>
        </div>
        <div className="strip__item">
          <dt>Telefone</dt>
          <dd>
            <a href={phone.href}>{phone.display}</a>
          </dd>
        </div>
      </dl>
    </section>
  )
}
