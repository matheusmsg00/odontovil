import { carePhotos, clinic } from '../config/clinic'
import { Picture } from './Picture'
import { SectionHead } from './SectionHead'

export function InstitutionalSection() {
  const { about, reviews } = clinic

  return (
    <section id="clinica" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about-title" title="Cuidado que começa no atendimento." lead={about.intro} />

        <div className="about__grid">
          <ul className="mosaic" aria-label="Fotos de atendimentos na clínica" data-reveal>
            {carePhotos.map((photo, index) => (
              <li key={photo.src} className={`mosaic__item mosaic__item--${index + 1}`}>
                <Picture photo={photo} sizes="(min-width: 960px) 24vw, 50vw" className="mosaic__img" />
              </li>
            ))}
          </ul>

          <div className="about__text" data-reveal>
            {about.foundedYear && <p className="about__meta">Desde {about.foundedYear}</p>}
            {about.history && <p>{about.history}</p>}
            {about.education && <p>{about.education}</p>}

            {about.structure.length > 0 && (
              <ul className="about__list">
                {about.structure.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {about.team.length > 0 && (
              <div className="about__team">
                <h3 className="h3">Equipe</h3>
                <ul>
                  {about.team.map((member) => (
                    <li key={member.name}>
                      <strong>{member.name}</strong>
                      <span>
                        {member.role}
                        {member.registry ? `, ${member.registry}` : ''}
                      </span>
                      {member.bio && <p>{member.bio}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <figure className="about__voices">
              <h3 className="h3">O que os pacientes relatam</h3>
              <ul className="about__list">
                {reviews.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <figcaption className="note">Percepções que aparecem nas avaliações públicas da clínica no Google.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
