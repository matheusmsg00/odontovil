import type { ReactNode } from 'react'
import { clinic, whatsappLink } from '../config/clinic'
import { SectionHead } from './SectionHead'
import { ChatIcon, ChevronIcon, ImageIcon, PhoneIcon, WhatsAppIcon } from './icons'

type Shortcut = {
  title: string
  text: string
  action: string
  href: string
  icon: ReactNode
  external?: boolean
}

const shortcuts: Shortcut[] = [
  {
    title: 'Informações sobre consultas',
    text: 'Tire dúvidas sobre agendamento e disponibilidade diretamente com a equipe.',
    action: 'Perguntar pelo WhatsApp',
    href: whatsappLink(clinic.whatsapp.messages.atendimento),
    icon: <ChatIcon />,
    external: true,
  },
  {
    title: 'Nossos trabalhos',
    text: 'Veja casos reais de antes e depois atendidos pela equipe.',
    action: 'Ver trabalhos',
    href: '#trabalhos',
    icon: <ImageIcon />,
  },
  {
    title: 'Fale com a equipe',
    text: `Prefere ligar? A clínica atende pelo telefone ${clinic.phone.display}.`,
    action: 'Ligar para a clínica',
    href: clinic.phone.href,
    icon: <PhoneIcon />,
  },
]

export function AtendimentoSection() {
  const hasServices = clinic.services.length > 0

  return (
    <section id="atendimento" className="section care" aria-labelledby="care-title">
      <div className="container">
        <SectionHead
          id="care-title"
          title="Estamos aqui para ajudar você."
          badge={{ label: 'Ver nossos trabalhos', href: '#trabalhos' }}
          lead="O primeiro passo é uma conversa. Escolha o canal mais confortável para você e fale com a equipe da Odontovil."
        />

        {hasServices && (
          <ul className="care__services" data-reveal>
            {clinic.services.map((service) => (
              <li key={service.title}>
                <h3 className="h3">{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        )}

        <ul className="care__grid" data-reveal>
          {shortcuts.map((item, index) => (
            <li key={item.title}>
              <a
                className="care__item"
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="care__icon">{item.icon}</span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.text}</p>
                <span className="care__action">
                  {item.action}
                  <ChevronIcon width={16} height={16} />
                </span>
                <span className="care__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="care__cta" data-reveal>
          <a
            className="btn btn--primary btn--lg"
            href={whatsappLink(clinic.whatsapp.messages.atendimento)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Consultar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
