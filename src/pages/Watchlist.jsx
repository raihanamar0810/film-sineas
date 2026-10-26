import { Bookmark } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Watchlist() {
  const { items } = useWatchlist()

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight">Watchlist-mu</h1>
      {items.length > 0 && (
        <p className="mt-2 text-mute">{items.length} film tersimpan di perangkat ini</p>
      )}

      <div className="mt-8">
        {items.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="Belum ada film tersimpan"
            text="Tekan ikon bookmark di film mana pun untuk menyimpannya di sini."
            actionLabel="Jelajahi film"
            actionTo="/browse"
          />
        ) : (
          <MovieGrid movies={items} />
        )}
      </div>
    </div>
  )
}