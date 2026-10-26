import { getMovieList } from '../lib/tmdb.js'
import { useFetch } from '../hooks/useFetch.js'
import MovieCard from './MovieCard.jsx'
import CardSkeleton from './CardSkeleton.jsx'
import ErrorState from './ErrorState.jsx'

const cardWidth = 'w-36 shrink-0 sm:w-44'

export default function MovieRow({ title, category }) {
  const { data, loading, error, retry } = useFetch(
    (signal) => getMovieList(category, 1, signal),
    [category],
  )

  return (
    <section aria-label={title}>
      <h2 className="mb-5 text-2xl font-bold">{title}</h2>

      {error ? (
        <ErrorState error={error} onRetry={retry} />
      ) : (
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
          {loading
            ? Array.from({ length: 8 }, (_, i) => <CardSkeleton key={i} className={cardWidth} />)
            : data.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} className={cardWidth} />
              ))}
        </div>
      )}
    </section>
  )
}