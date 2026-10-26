import { Star } from 'lucide-react'

export default function RatingBadge({ value, className = '' }) {
  // Film yang belum rilis rating-nya 0, jadi tidak ditampilkan
  if (!value) return null

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-ink/80 px-1.5 py-0.5 text-xs font-bold ${className}`}
    >
      <Star className="size-3 fill-gold text-gold" aria-hidden="true" />
      {value.toFixed(1)}
    </span>
  )
}