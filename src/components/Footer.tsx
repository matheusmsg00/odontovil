import { clinic, navLinks } from '../config/clinic'
import { StarIcon } from './icons'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__name">{clinic.name}</p>
          <p>{clinic.tagline}</p>
          <p className="footer__rating">
            <StarIcon width={16} height={16} />
            {clinic.reviews.rating} estrelas — {clinic.reviews.count} avaliações no Google
          </p>
        </div>

        <div>
          <h2 className="footer__heading">Contato</h2>
          <ul className="footer__list">
            <li>{clinic.address.full}</li>
            <li>
              <a href={clinic.phone.href}>Telefone: {clinic.phone.display}</a>
            </li>
            <li>
              <a href={clinic.whatsapp.defaultUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp: {clinic.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={clinic.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram: {clinic.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="footer__heading">Navegação</h2>
          <ul className="footer__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container footer__bottom">
        <p>
          © {year} {clinic.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
