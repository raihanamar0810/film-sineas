import { Bookmark } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'

// variant "icon": tombol bulat kecil di kartu. variant "full": tombol dengan teks.
export default function WatchlistButton({ movie, variant = 'icon', className = '' }) {
  const { has, toggle } = useWatchlist()
  const saved = has(movie.id)
  const label = saved ? 'Hapus dari watchlist' : 'Tambah ke watchlist'

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggle(movie)}
        aria-pressed={saved}
        className={`inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-bold transition-colors ${
          saved
            ? 'border-signal bg-signal/10 text-signal'
            : 'border-edge bg-panel hover:border-mute'
        } ${className}`}
      >
        <Bookmark className={`size-4 ${saved ? 'fill-signal' : ''}`} aria-hidden="true" />
        {saved ? 'Ada di watchlist' : 'Tambah ke watchlist'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => toggle(movie)}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-full bg-ink/80 transition-colors hover:bg-ink sm:size-8 ${className}`}
    >
      <Bookmark
        className={`size-5 sm:size-4 ${saved ? 'fill-signal text-signal' : 'text-paper'}`}
        aria-hidden="true"
      />
    </button>
  )
}