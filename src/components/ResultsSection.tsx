import { useRef } from 'react'
import { clinic, results } from '../config/clinic'
import { SectionHead } from './SectionHead'
import { WhatsAppIcon } from './icons'

type Case = (typeof results.cases)[number]

/** Comparador: a foto "depois" fica ao fundo e a "antes" é recortada até a posição da barra. */
function Compare({ item }: { item: Case }) {
  const ref = useRef<HTMLDivElement>(null)
  const label = String(item.id).padStart(2, '0')

  const img = (src: string, alt: string) => (
    <picture>
      <source type="image/webp" srcSet={`${src}-${item.width}.webp`} />
      <img src={`${src}.jpg`} alt={alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
    </picture>
  )

  return (
    <figure className="compare">
      <div className="compare__stage" ref={ref}>
        <div className="compare__after">{img(item.after, `Caso ${label}: sorriso depois do tratamento`)}</div>
        <div className="compare__before">{img(item.before, `Caso ${label}: sorriso antes do tratamento`)}</div>
        <span className="compare__tag compare__tag--before" aria-hidden="true">
          Antes
        </span>
        <span className="compare__tag compare__tag--after" aria-hidden="true">
          Depois
        </span>
        <span className="compare__handle" aria-hidden="true" />
        <input
          className="compare__range"
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          aria-label={`Comparar antes e depois do caso ${label}`}
          onInput={(event) => ref.current?.style.setProperty('--pos', `${event.currentTarget.value}%`)}
        />
      </div>
      <figcaption className="compare__caption">
        <span>Caso {label}</span>
        <span>Antes e depois</span>
      </figcaption>
    </figure>
  )
}

export function ResultsSection() {
  if (results.cases.length === 0) return null

  return (
    <section id="trabalhos" className="section results" aria-labelledby="results-title">
      <div className="container">
        <SectionHead
          id="results-title"
          title="Sorrisos que contam a nossa história."
          lead="Casos reais atendidos na Clínica Odontovil. Arraste a barra sobre cada foto para comparar o antes e o depois."
        />

        <ul className="results__grid" data-reveal>
          {results.cases.map((item) => (
            <li key={item.id}>
              <Compare item={item} />
            </li>
          ))}
        </ul>

        <div className="results__footer" data-reveal>
          <p className="note">{results.note}</p>
          {results.responsible && <p className="note">{results.responsible}</p>}
          <a className="btn btn--primary btn--lg" href={clinic.whatsapp.defaultUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Agendar consulta
          </a>
        </div>
      </div>
    </section>
  )
}
