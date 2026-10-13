import { clinic } from '../config/clinic'
import { SectionHead } from './SectionHead'
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from './icons'

export function ContactSection() {
  return (
    <section id="contato" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead
          id="contact-title"
          title="Entre em contato com a Clínica Odontovil."
          lead="Entre em contato com nossa equipe para esclarecer dúvidas e solicitar informações sobre o agendamento."
        />

        <ul className="contact__grid" data-reveal>
          <li className="channel">
            <PhoneIcon width={26} height={26} />
            <h3 className="channel__label">Telefone</h3>
            <p className="channel__value">{clinic.phone.display}</p>
            <a className="btn btn--light" href={clinic.phone.href}>
              Ligar agora
            </a>
          </li>
          <li className="channel">
            <WhatsAppIcon width={26} height={26} />
            <h3 className="channel__label">WhatsApp</h3>
            <p className="channel__value">{clinic.whatsapp.display}</p>
            <a className="btn btn--light" href={clinic.whatsapp.defaultUrl} target="_blank" rel="noopener noreferrer">
              Agendar pelo WhatsApp
            </a>
          </li>
          <li className="channel">
            <InstagramIcon width={26} height={26} />
            <h3 className="channel__label">Instagram</h3>
            <p className="channel__value">{clinic.instagram.handle}</p>
            <a className="btn btn--ghost-light" href={clinic.instagram.url} target="_blank" rel="noopener noreferrer">
              Acompanhe a clínica no Instagram
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
