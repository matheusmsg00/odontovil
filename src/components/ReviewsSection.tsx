import { clinic, reviewsUrl } from '../config/clinic'
import { SparkleIcon, Stars } from './icons'

export function ReviewsSection() {
  const { reviews } = clinic

  return (
    <section id="avaliacoes" className="section reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews__head" data-reveal>
          <SparkleIcon className="shead__spark" />
          <div className="reviews__score">
            <p className="reviews__number" aria-hidden="true">
              {reviews.rating}
            </p>
            <div>
              <Stars className="stars" />
              <h2 id="reviews-title" className="reviews__title">
                <span className="sr-only">Nota {reviews.rating} de 5, com </span>
                {reviews.count} avaliações no Google
              </h2>
              <p className="note">
                {reviews.source}. Nota e total informados conforme o perfil público da clínica.
              </p>
            </div>
          </div>
          <a className="btn btn--outline" href={reviewsUrl} target="_blank" rel="noopener noreferrer">
            Ver avaliações no Google
          </a>
        </div>

        <ul className="reviews__list" aria-label="Relatos de pacientes publicados no Google">
          {reviews.testimonials.map((item) => (
            <li key={item.text} className="quote" data-reveal>
              <blockquote>
                <p>{item.text}</p>
              </blockquote>
              <p className="quote__source">{item.source}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
