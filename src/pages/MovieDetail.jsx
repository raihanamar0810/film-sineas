import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clapperboard, Play, User } from 'lucide-react'
import {
  backdropUrl,
  formatDate,
  formatMoney,
  formatRuntime,
  formatYear,
  getMovie,
  posterUrl,
  profileUrl,
} from '../lib/tmdb.js'
import { useFetch } from '../hooks/useFetch.js'
import RatingBadge from '../components/RatingBadge.jsx'
import MovieCard from '../components/MovieCard.jsx'
import TrailerModal from '../components/TrailerModal.jsx'
import WatchlistButton from '../components/WatchlistButton.jsx'
import ErrorState from '../components/ErrorState.jsx'

function DetailSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-8 md:flex-row" aria-hidden="true">
      <div className="aspect-2/3 w-52 shrink-0 self-center rounded-2xl bg-panel md:w-72 md:self-start" />
      <div className="flex-1 space-y-4">
        <div className="h-10 w-2/3 rounded bg-panel" />
        <div className="h-4 w-1/3 rounded bg-panel" />
        <div className="h-24 w-full rounded bg-panel" />
      </div>
    </div>
  )
}

export default function MovieDetail() {
  const { id } = useParams()
  const { data: movie, loading, error, retry } = useFetch(
    (signal) => getMovie(id, signal),
    [id],
  )
  const [trailerOpen, setTrailerOpen] = useState(false)

  if (loading) return <DetailSkeleton />
  if (error) return <ErrorState error={error} onRetry={retry} />

  const trailer = movie.videos.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer',
  )
  const director = movie.credits.crew.find((p) => p.job === 'Director')
  const cast = movie.credits.cast.slice(0, 12)
  const similar = movie.similar.results.filter((m) => m.poster_path).slice(0, 12)
  const poster = posterUrl(movie.poster_path)
  const backdrop = backdropUrl(movie.backdrop_path)

  const facts = [
    ['Tanggal rilis', formatDate(movie.release_date)],
    ['Sutradara', director?.name],
    ['Status', movie.status],
    ['Bahasa asli', movie.original_language?.toUpperCase()],
    ['Anggaran', formatMoney(movie.budget)],
    ['Pendapatan', formatMoney(movie.revenue)],
  ].filter(([, value]) => value)

  return (
    <div className="space-y-12">
      <section className="relative isolate overflow-hidden rounded-2xl">
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 -z-20 size-full object-cover object-top"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-ink/80" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/40 to-ink/60" />

        <div className="flex flex-col gap-8 p-6 sm:p-10 md:flex-row">
          <div className="w-52 shrink-0 self-center md:w-72 md:self-start">
            {poster ? (
              <img
                src={poster}
                alt={`Poster ${movie.title}`}
                className="w-full rounded-2xl shadow-2xl ring-1 ring-edge"
              />
            ) : (
              <div className="grid aspect-2/3 place-items-center rounded-2xl bg-panel text-mute ring-1 ring-edge">
                <Clapperboard className="size-10" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-5xl">
              {movie.title}{' '}
              <span className="font-medium text-mute">({formatYear(movie.release_date)})</span>
            </h1>
            {movie.tagline && <p className="mt-2 text-lg italic text-mute">{movie.tagline}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <RatingBadge value={movie.vote_average} className="bg-panel!" />
              {formatRuntime(movie.runtime) && <span>{formatRuntime(movie.runtime)}</span>}
              {movie.vote_count > 0 && (
                <span className="text-mute">{movie.vote_count.toLocaleString('id-ID')} suara</span>
              )}
            </div>

            {movie.genres.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <li key={g.id}>
                    <Link
                      to={`/browse?genre=${g.id}`}
                      className="inline-block rounded-full border border-edge px-3 py-1 text-sm text-mute hover:border-signal hover:text-signal"
                    >
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <h2 className="mt-8 text-xl font-bold">Sinopsis</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-paper/90">
              {movie.overview || 'Sinopsis belum tersedia.'}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {trailer && (
                <button
                  type="button"
                  onClick={() => setTrailerOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-6 text-sm font-bold text-ink hover:brightness-110"
                >
                  <Play className="size-4 fill-ink" aria-hidden="true" />
                  Tonton trailer
                </button>
              )}
              <WatchlistButton movie={movie} variant="full" />
            </div>

            {facts.length > 0 && (
              <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm text-mute">{label}</dt>
                    <dd className="mt-0.5 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {cast.length > 0 && (
        <section aria-label="Pemeran">
          <h2 className="mb-5 text-2xl font-bold">Pemeran</h2>
          <ul className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {cast.map((person) => (
              <li key={person.credit_id} className="w-28 shrink-0 sm:w-32">
                {person.profile_path ? (
                  <img
                    src={profileUrl(person.profile_path)}
                    alt={person.name}
                    loading="lazy"
                    className="aspect-2/3 w-full rounded-xl object-cover ring-1 ring-edge"
                  />
                ) : (
                  <div className="grid aspect-2/3 w-full place-items-center rounded-xl bg-panel text-mute ring-1 ring-edge">
                    <User className="size-8" aria-hidden="true" />
                  </div>
                )}
                <p className="mt-2 line-clamp-1 text-sm font-bold">{person.name}</p>
                <p className="line-clamp-1 text-sm text-mute">{person.character}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

            {similar.length > 0 && (
        <section aria-label="Film serupa">
          <h2 className="mb-5 text-2xl font-bold">Film serupa</h2>
          <ul className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {similar.map((m) => (
              <li key={m.id} className="w-36 shrink-0 sm:w-44">
                <MovieCard movie={m} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {trailerOpen && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          title={movie.title}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  )
}