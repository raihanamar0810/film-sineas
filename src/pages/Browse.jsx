import { useSearchParams } from 'react-router-dom'
import { Film } from 'lucide-react'
import { discoverMovies, getGenres } from '../lib/tmdb.js'
import { useFetch } from '../hooks/useFetch.js'
import { usePaginatedMovies } from '../hooks/usePaginatedMovies.js'
import PaginatedResults from '../components/PaginatedResults.jsx'
import EmptyState from '../components/EmptyState.jsx'

const SORTS = {
  popular: { label: 'Terpopuler', value: 'popularity.desc' },
  rating: { label: 'Rating tertinggi', value: 'vote_average.desc' },
  newest: { label: 'Terbaru', value: 'primary_release_date.desc' },
}

export default function Browse() {
  const [params, setParams] = useSearchParams()
  const genre = params.get('genre') || ''
  const sortKey = SORTS[params.get('sort')] ? params.get('sort') : 'popular'

  const genres = useFetch((signal) => getGenres(signal), [])

  const result = usePaginatedMovies(
    (page, signal) => discoverMovies({ genre, sort: SORTS[sortKey].value, page }, signal),
    [genre, sortKey],
  )

  // Tulis filter ke URL, bukan ke useState
  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const chipClass = (active) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-signal bg-signal text-ink'
        : 'border-edge text-mute hover:border-mute hover:text-paper'
    }`

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Jelajahi film</h1>
        <div>
          <label htmlFor="sort" className="mb-1.5 block text-sm text-mute">
            Urutkan
          </label>
          <select
            id="sort"
            value={sortKey}
            onChange={(e) => update('sort', e.target.value === 'popular' ? '' : e.target.value)}
            className="h-10 w-full rounded-full border border-edge bg-panel px-4 text-sm focus:border-signal focus:outline-none sm:w-52"
          >
            {Object.entries(SORTS).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        role="group"
        aria-label="Saring berdasarkan genre"
        className="no-scrollbar -mx-4 mt-6 mb-8 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button
          type="button"
          onClick={() => update('genre', '')}
          aria-pressed={!genre}
          className={chipClass(!genre)}
        >
          Semua genre
        </button>
        {genres.data?.genres.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => update('genre', String(g.id))}
            aria-pressed={genre === String(g.id)}
            className={chipClass(genre === String(g.id))}
          >
            {g.name}
          </button>
        ))}
      </div>

      <PaginatedResults
        result={result}
        emptyState={
          <EmptyState
            icon={Film}
            title="Tidak ada film yang cocok"
            text="Coba genre atau urutan lain."
            actionLabel="Hapus filter"
            actionTo="/browse"
          />
        }
      />
    </div>
  )
}