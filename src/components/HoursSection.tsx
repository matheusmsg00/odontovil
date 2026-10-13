import { useEffect, useState } from 'react'
import { clinic, weekdayLabels, whatsappLink, type Weekday } from '../config/clinic'
import { ClockIcon, WhatsAppIcon } from './icons'

/** Ordem de exibição e correspondência com o dia da semana do `Intl` (0 = domingo). */
const ORDER: Weekday[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']
const BY_INDEX: Weekday[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
const SHORT: Record<Weekday, string> = {
  segunda: 'Seg',
  terca: 'Ter',
  quarta: 'Qua',
  quinta: 'Qui',
  sexta: 'Sex',
  sabado: 'Sáb',
  domingo: 'Dom',
}

/** Régua das 07:00 às 19:00. */
const SCALE_START = 7 * 60
const SCALE_END = 19 * 60
const TICKS = [8, 10, 12, 14, 16, 18]

const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
const toPercent = (minutes: number) => ((minutes - SCALE_START) / (SCALE_END - SCALE_START)) * 100

/** Dia e minuto atuais no fuso de Vilhena, independente do fuso do visitante. */
function nowInClinic() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: clinic.hours.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { dayIndex, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

type Status = { open: boolean; text: string }

function getStatus(dayIndex: number, minutes: number): Status {
  const week = clinic.hours.week
  const today = week[BY_INDEX[dayIndex]]

  const current = today.find((p) => minutes >= toMinutes(p.opens) && minutes < toMinutes(p.closes))
  if (current) return { open: true, text: `Aberta agora, fecha às ${current.closes}` }

  const laterToday = today.find((p) => toMinutes(p.opens) > minutes)
  if (laterToday) return { open: false, text: `Fechada agora, abre às ${laterToday.opens}` }

  for (let offset = 1; offset <= 7; offset++) {
    const day = BY_INDEX[(dayIndex + offset) % 7]
    const first = week[day][0]
    if (first) {
      const when = offset === 1 ? 'amanhã' : weekdayLabels[day].toLowerCase()
      return { open: false, text: `Fechada agora, abre ${when} às ${first.opens}` }
    }
  }
  return { open: false, text: 'Fechada agora' }
}

function useClinicClock() {
  const [now, setNow] = useState(nowInClinic)
  useEffect(() => {
    const id = window.setInterval(() => setNow(nowInClinic()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export function HoursSection() {
  const { dayIndex, minutes } = useClinicClock()
  const todayKey = BY_INDEX[dayIndex]
  const status = getStatus(dayIndex, minutes)
  const nowInScale = minutes >= SCALE_START && minutes <= SCALE_END

  return (
    <div className="week" role="group" aria-labelledby="hours-title" data-reveal>
      <div className="week__head">
        <div>
          <h3 id="hours-title" className="week__title">
            <ClockIcon width={22} height={22} />
            Planeje sua visita.
          </h3>
          <p className="week__lead">Atendimento de segunda a sábado, com pausa para o almoço nos dias úteis.</p>
        </div>
        <p className={`week__status${status.open ? ' is-open' : ''}`} role="status">
          <span className="week__dot" aria-hidden="true" />
          {status.text}
        </p>
      </div>

      <ol className="week__days">
        {ORDER.map((day) => {
          const periods = clinic.hours.week[day]
          const isToday = day === todayKey
          const label = periods.length
            ? periods.map((p) => `${p.opens} às ${p.closes}`).join(' e ')
            : 'Fechado'

          return (
            <li key={day} className={`week__row${isToday ? ' is-today' : ''}${periods.length ? '' : ' is-closed'}`}>
              <span className="week__day">
                <abbr title={weekdayLabels[day]}>{SHORT[day]}</abbr>
                <span className="week__day-full">{weekdayLabels[day]}</span>
                {isToday && <span className="week__today">Hoje</span>}
              </span>

              <span className="week__track" aria-hidden="true">
                {periods.map((p) => (
                  <span
                    key={p.opens}
                    className="week__bar"
                    style={{
                      left: `${toPercent(toMinutes(p.opens))}%`,
                      width: `${toPercent(toMinutes(p.closes)) - toPercent(toMinutes(p.opens))}%`,
                    }}
                  />
                ))}
                {isToday && nowInScale && <span className="week__now" style={{ left: `${toPercent(minutes)}%` }} />}
              </span>

              <span className="week__time">{label}</span>
            </li>
          )
        })}
      </ol>

      <div className="week__scale" aria-hidden="true">
        <span />
        <span className="week__ticks">
          {TICKS.map((h) => (
            <span key={h} style={{ left: `${toPercent(h * 60)}%` }}>
              {String(h).padStart(2, '0')}h
            </span>
          ))}
        </span>
        <span />
      </div>

      <div className="week__foot">
        <p className="note">Em feriados o horário pode mudar. Se tiver dúvida, fale com a equipe antes da visita.</p>
        <a
          className="btn btn--outline"
          href={whatsappLink(clinic.whatsapp.messages.hours)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Consultar horário pelo WhatsApp
        </a>
      </div>
    </div>
  )
}
