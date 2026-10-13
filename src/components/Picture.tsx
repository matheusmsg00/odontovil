import type { Photo } from '../config/clinic'

type PictureProps = {
  photo: Photo
  sizes: string
  className?: string
  priority?: boolean
}

/** Imagem responsiva: WebP em várias larguras com JPG original como fallback. */
export function Picture({ photo, sizes, className, priority = false }: PictureProps) {
  const srcSet = photo.widths.map((w) => `${photo.src}-${w}.webp ${w}w`).join(', ')

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        className={className}
        src={`${photo.src}.jpg`}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
