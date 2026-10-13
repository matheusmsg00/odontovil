import { clinic, whatsappLink } from '../config/clinic'
import { Logo } from './Logo'
import { Picture } from './Picture'

export function HighlightSection() {
  return (
    <section className="highlight" aria-labelledby="highlight-title">
      <div className="highlight__media" data-reveal>
        <Picture photo={clinic.photos.reception} sizes="(min-width: 960px) 60vw, 100vw" className="highlight__img" />
        <p className="highlight__credit">
          <Logo className="highlight__credit-logo" />
          <span className="highlight__credit-name">{clinic.dentist.name}</span>
          <span className="highlight__credit-cro">{clinic.dentist.cro}</span>
        </p>
      </div>
      <div className="highlight__panel" data-reveal>
        <h2 id="highlight-title" className="h2">
          Um atendimento que faz a diferença.
        </h2>
        <p className="lead">
          Conheça a Clínica Odontovil e entre em contato com a equipe para obter informações sobre consultas e
          atendimento.
        </p>
        <a
          className="btn btn--light btn--lg"
          href={whatsappLink(clinic.whatsapp.messages.general)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale com a Odontovil
        </a>
      </div>
    </section>
  )
}
