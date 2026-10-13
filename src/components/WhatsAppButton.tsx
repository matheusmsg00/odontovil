import { useEffect, useState } from 'react'
import { clinic } from '../config/clinic'
import { WhatsAppIcon } from './icons'

/** Aparece depois que o visitante sai da capa, que já tem o botão de agendamento. */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`wa-float${visible ? ' is-visible' : ''}`}
      href={clinic.whatsapp.defaultUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp (abre em nova aba)"
    >
      <WhatsAppIcon width={30} height={30} />
    </a>
  )
}
