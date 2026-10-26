import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backdropUrl, formatYear, posterUrl } from '../lib/tmdb.js'
import RatingBadge from './RatingBadge.jsx'
import WatchlistButton from './WatchlistButton.jsx'

export default function Hero({ movies, genres = [] }) {
  const slides = movies.filter((m) => m.backdrop_path).slice(0, 5)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (paused || reduce || slides.length < 2) return
  const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000)
  return () => clearInterval(id)
}, [paused, slides.length])

  if (slides.length === 0) return null

  const current = slides[index]
  const genreNames = current.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3)

  return (
    <section
      aria-label="Film trending minggu ini"
      className="relative isolate overflow-hidden rounded-2xl"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((movie, i) => (
        <img
          key={movie.id}
          src={backdropUrl(movie.backdrop_path)}
          alt=""
          className={`absolute inset-0 -z-20 size-full object-cover object-top transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-ink/50 sm:bg-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-transparent to-transparent" />

      <div className="flex min-h-[28rem] flex-col justify-end gap-6 p-6 sm:p-10">
        <div className="max-w-xl">
          <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute">
            <span className="font-bold text-signal">Trending minggu ini</span>
            <span>{formatYear(current.release_date)}</span>
            {genreNames.length > 0 && <span>{genreNames.join(', ')}</span>}
            <RatingBadge value={current.vote_average} />
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-balance sm:text-5xl">
            {current.title}
          </h1>
          <p className="mt-4 line-clamp-3 text-paper/85">
            {current.overview || 'Sinopsis belum tersedia.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={`/movie/${current.id}`}
              className="inline-flex h-11 items-center rounded-full bg-signal px-6 text-sm font-bold text-ink hover:brightness-110"
            >
              Lihat detail
            </Link>
            <WatchlistButton movie={current} variant="full" />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-2.5" role="group" aria-label="Pilih film unggulan">
          {slides.map((movie, i) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Tampilkan ${movie.title}`}
              aria-current={i === index}
              className={`w-12 overflow-hidden rounded-lg ring-2 transition sm:w-16 ${
                i === index ? 'ring-signal' : 'opacity-60 ring-transparent hover:opacity-100'
              }`}
            >
              <img
                src={posterUrl(movie.poster_path, 'w154')}
                alt=""
                className="aspect-2/3 size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}