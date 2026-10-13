import { useEffect, useState } from 'react'
import { clinic, navLinks } from '../config/clinic'
import { CloseIcon } from './icons'
import { Logo } from './Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.documentElement.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const close = () => setOpen(false)
  const solid = scrolled || open

  return (
    <header className={`nav${solid ? ' nav--solid' : ''}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="nav__inner container">
        <a className="nav__brand" href="#inicio" onClick={close} aria-label="Clínica Odontovil, voltar ao início">
          <Logo className="nav__logo" />
          Odontovil
        </a>

        <nav id="menu-principal" className={`nav__menu${open ? ' is-open' : ''}`} aria-label="Principal">
          <ul className="nav__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary nav__cta"
            href={clinic.whatsapp.defaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            Agendar consulta
          </a>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon width={24} height={24} /> : <span className="nav__burger" aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
