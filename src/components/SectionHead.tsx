import type { ReactNode } from 'react'
import { LinkIcon, SparkleIcon } from './icons'

type SectionHeadProps = {
  id: string
  title: ReactNode
  lead?: ReactNode
  badge?: { label: string; href: string }
}

/** Abertura de seção centralizada: estrela, selo opcional, título e texto de apoio. */
export function SectionHead({ id, title, lead, badge }: SectionHeadProps) {
  return (
    <div className="shead" data-reveal>
      <SparkleIcon className="shead__spark" />
      {badge && (
        <a className="badge" href={badge.href}>
          <LinkIcon width={14} height={14} />
          {badge.label}
        </a>
      )}
      <h2 id={id} className="h2">
        {title}
      </h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}
