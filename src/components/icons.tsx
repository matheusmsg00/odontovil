import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export const WhatsAppIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 32 32" fill="currentColor" stroke="none" {...props}>
    <path d="M16.04 3C9.14 3 3.53 8.6 3.53 15.5c0 2.2.58 4.36 1.68 6.26L3.43 28.3l6.7-1.76a12.47 12.47 0 0 0 5.9 1.5h.01c6.9 0 12.5-5.6 12.51-12.5 0-3.34-1.3-6.48-3.66-8.84A12.42 12.42 0 0 0 16.04 3Zm0 22.9h-.01a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-3.97 1.04 1.06-3.87-.25-.4a10.36 10.36 0 0 1-1.59-5.5c0-5.73 4.67-10.4 10.45-10.4 2.78 0 5.4 1.09 7.37 3.06a10.33 10.33 0 0 1 3.05 7.36c0 5.74-4.67 10.4-10.43 10.4Zm5.72-7.79c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.7.16-.21.31-.81 1.02-.99 1.22-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.52-1.55-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.55.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.83.39-.28.31-1.09 1.06-1.09 2.6 0 1.53 1.11 3.01 1.27 3.22.16.2 2.19 3.34 5.3 4.69.74.32 1.32.51 1.77.65.74.24 1.42.2 1.95.12.6-.09 1.85-.76 2.11-1.49.26-.72.26-1.35.18-1.48-.08-.13-.28-.2-.6-.36Z" />
  </svg>
)

export const PhoneIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 4h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  </svg>
)

export const InstagramIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
)

export const PinIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)

export const ClockIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const ChatIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4.5 18.5V7a2.5 2.5 0 0 1 2.5-2.5h10A2.5 2.5 0 0 1 19.5 7v6.5A2.5 2.5 0 0 1 17 16H8l-3.5 2.5Z" />
  </svg>
)

export const ImageIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m20.5 16-5-5-8 8" />
  </svg>
)

export const StarIcon = (props: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <path d="m12 3.2 2.6 5.5 6 .7-4.4 4.1 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.7L12 3.2Z" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ChevronIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const SparkleIcon = (props: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5Z" />
  </svg>
)

export const LinkIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
)

export const Stars =({ className }: { className?: string }) => (
  <span className={className} aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} />
    ))}
  </span>
)
