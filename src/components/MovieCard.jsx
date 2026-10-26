import { Link } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'
import { formatYear, posterUrl } from '../lib/tmdb.js'
import RatingBadge from './RatingBadge.jsx'
import WatchlistButton from './WatchlistButton.jsx'

export default function MovieCard({ movie, className = '' }) {
  const poster = posterUrl(movie.poster_path, 'w342')

  return (
    <article className={`group relative ${className}`}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-panel ring-1 ring-edge">
          {poster ? (
            <img
              src={poster}
              alt="Poster ${movie.title}"
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center text-mute">
              <Clapperboard className="size-8" aria-hidden="true" />
              <span className="text-sm">Poster tidak tersedia</span>
            </div>
          )}
          <RatingBadge value={movie.vote_average} className="absolute bottom-2 left-2" />
        </div>
        <h3 className="mt-3 line-clamp-1 text-sm font-bold group-hover:text-signal">{movie.title}</h3>
        <p className="text-sm text-mute">{formatYear(movie.release_date)}</p>
      </Link>

      <WatchlistButton movie={movie} className="absolute right-2 top-2" />
    </article>
  )
}