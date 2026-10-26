import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, SearchX } from 'lucide-react'
import { searchMovies } from '../lib/tmdb.js'
import { usePaginatedMovies } from '../hooks/usePaginatedMovies.js'
import PaginatedResults from '../components/PaginatedResults.jsx'
import EmptyState from '../components/EmptyState.jsx'

const EMPTY_RESULT = { results: [], total_pages: 1, total_results: 0 }

export default function Search() {
  const [params] = useSearchParams()
  const query = (params.get('q') || '').trim()

  // Hook harus dipanggil di setiap render, jadi pengecekan "query kosong" dilakukan di dalam fetcher
  const result = usePaginatedMovies(
    (page, signal) => (query ? searchMovies(query, page, signal) : Promise.resolve(EMPTY_RESULT)),
    [query],
  )

  if (!query) {
    return (
      <EmptyState
        icon={SearchIcon}
        title="Cari film favoritmu"
        text="Ketik judul di kotak pencarian di atas, misalnya “Inception” atau “Spirited Away”."
      />
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Hasil untuk “{query}”
      </h1>
      {result.status !== 'loading' && result.items.length > 0 && (
        <p className="mt-2 text-mute">
          {result.totalResults.toLocaleString('id-ID')} film ditemukan
        </p>
      )}

      <div className="mt-8">
        <PaginatedResults
          result={result}
          emptyState={
            <EmptyState
              icon={SearchX}
              title={`Tidak ada film untuk “${query}”`}
              text="Periksa ejaannya atau coba judul yang lebih pendek."
              actionLabel="Jelajahi semua film"
              actionTo="/browse"
            />
          }
        />
      </div>
    </div>
  )
}