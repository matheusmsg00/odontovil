import { useEffect, useRef } from 'react'
import { clinic, whatsappLink } from '../config/clinic'
import { Logo } from './Logo'
import { Picture } from './Picture'
import { PinIcon, StarIcon, WhatsAppIcon } from './icons'

/** Mesma condição do CSS em que a foto ocupa a tela inteira (computador). */
const FULLSCREEN_QUERY = '(min-width: 960px) and (min-aspect-ratio: 1075 / 976)'
/** Dente adesivado na porta de vidro central, em pixels da foto original (1075×976). */
const DOOR_TOOTH = { x: 650, y: 560, width: 81, height: 126 }
/** Deve acompanhar o `object-position` vertical da foto no CSS. */
const OBJECT_POSITION_Y = 0.32
/** Altura do menu fixo (--nav-h): a logo termina centralizada na área visível abaixo dele. */
const NAV_HEIGHT = 72

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)
const smooth = (value: number) => value * value * (3 - 2 * value)

/**
 * Ao rolar, a "câmera" aproxima da fachada em direção ao dente da porta.
 * A logo (vetor) fica presa sobre o adesivo e acompanha o zoom, enquanto a foto
 * se dissolve antes de perder qualidade. Com a logo no centro, as informações
 * entram pelas laterais: texto à esquerda, botões e avaliação à direita.
 */
function useLogoReveal() {
  const trackRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const asideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const photo = photoRef.current
    const logo = logoRef.current
    const copy = copyRef.current
    const aside = asideRef.current
    if (!track || !photo || !logo || !copy || !aside) return

    const fullscreen = window.matchMedia(FULLSCREEN_QUERY)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (!fullscreen.matches || reduce.matches) {
        photo.style.opacity = ''
        photo.style.transform = ''
        logo.style.opacity = ''
        logo.style.transform = ''
        for (const el of [copy, aside]) {
          el.style.opacity = ''
          el.style.transform = ''
          el.style.visibility = ''
        }
        return
      }

      const width = photo.offsetWidth
      const height = photo.offsetHeight
      const scale = Math.max(width / 1075, height / 976)
      const offsetX = (width - 1075 * scale) * 0.5
      const offsetY = (height - 976 * scale) * OBJECT_POSITION_Y

      const travel = track.offsetHeight - height
      const progress = clamp01(-track.getBoundingClientRect().top / travel)
      const move = smooth(clamp01(progress / 0.75))

      // Dente da porta na tela, antes do zoom
      const toothX = offsetX + DOOR_TOOTH.x * scale
      const toothY = offsetY + DOOR_TOOTH.y * scale
      const toothHeight = DOOR_TOOTH.height * scale

      // Zoom da câmera: começa em 1 e termina com o dente do tamanho final da logo
      const logoWidth = logo.offsetWidth
      const logoHeight = logo.offsetHeight
      const zoom = Math.pow(logoHeight / toothHeight, move)

      // O dente desliza até o centro da área visível enquanto a câmera aproxima
      const centerX = toothX + (width / 2 - toothX) * move
      const centerY = toothY + ((height + NAV_HEIGHT) / 2 - toothY) * move

      photo.style.transform = `translate(${centerX - toothX * zoom}px, ${centerY - toothY * zoom}px) scale(${zoom})`
      photo.style.opacity = String(1 - smooth(clamp01((move - 0.15) / 0.6)))

      const logoScale = (toothHeight * zoom) / logoHeight
      // O adesivo aparece mais estreito na foto (ângulo da câmera); a logo começa
      // com a mesma proporção e se endireita quando a foto já se dissolveu.
      const startSquash = DOOR_TOOTH.width / DOOR_TOOTH.height / (logoWidth / logoHeight)
      const squash = startSquash + (1 - startSquash) * smooth(clamp01((move - 0.35) / 0.5))
      logo.style.transform = `translate(${centerX - logoWidth / 2}px, ${centerY - logoHeight / 2}px) scale(${logoScale * squash}, ${logoScale})`
      logo.style.opacity = String(clamp01(progress / 0.06))

      // Com a logo no centro, as informações deslizam das laterais para dentro
      const reveal = smooth(clamp01((progress - 0.7) / 0.2))
      const shift = (1 - reveal) * 80
      copy.style.opacity = String(reveal)
      copy.style.transform = `translateX(${-shift}px)`
      aside.style.opacity = String(reveal)
      aside.style.transform = `translateX(${shift}px)`
      // Botões invisíveis não podem receber clique nem foco
      aside.style.visibility = reveal > 0 ? 'visible' : 'hidden'
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    fullscreen.addEventListener('change', schedule)
    reduce.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      fullscreen.removeEventListener('change', schedule)
      reduce.removeEventListener('change', schedule)
    }
  }, [])

  return { trackRef, photoRef, logoRef, copyRef, asideRef }
}

export function Hero() {
  const { trackRef, photoRef, logoRef, copyRef, asideRef } = useLogoReveal()

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__media" ref={trackRef}>
        <div className="hero__frame">
          <div className="hero__layer" ref={photoRef}>
            <Picture photo={clinic.photos.heroFacade} sizes="100vw" className="hero__img" priority />
          </div>
          <div className="hero__logo" ref={logoRef}>
            <Logo />
          </div>

          <div className="hero__content">
            <div className="hero__copy" ref={copyRef}>
              <p className="hero__place">
                <PinIcon width={16} height={16} />
                {clinic.tagline}
              </p>
              <h1 id="hero-title" className="hero__title">
                Seu sorriso merece cuidado e atenção.
              </h1>
              <p className="hero__lead">
                Na Clínica Odontovil, acreditamos que um atendimento atencioso faz toda a diferença na experiência de
                cuidar do sorriso.
              </p>
            </div>

            <div className="hero__aside" ref={asideRef}>
              <div className="hero__actions">
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappLink(clinic.whatsapp.messages.hero)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Agendar consulta
                </a>
                <a className="btn btn--ghost-light btn--lg" href="#clinica">
                  Conheça a clínica
                </a>
              </div>
              <a className="hero__rating" href="#avaliacoes">
                <span className="hero__rating-score">
                  {clinic.reviews.rating} <StarIcon width={16} height={16} />
                </span>
                <span className="hero__rating-sep" aria-hidden="true" />
                <span>
                  {clinic.reviews.count} avaliações no Google
                  <small>Nota pública do perfil da clínica</small>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
