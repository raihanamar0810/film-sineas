import { getGenres, getTrending } from '../lib/tmdb.js'
import { useFetch } from '../hooks/useFetch.js'
import Hero from '../components/Hero.jsx'
import MovieRow from '../components/MovieRow.jsx'
import ErrorState from '../components/ErrorState.jsx'

export default function Home() {
  const trending = useFetch((signal) => getTrending(signal), [])
  const genres = useFetch((signal) => getGenres(signal), [])

  return (
    <div className="space-y-12">
      {trending.loading && (
        <div className="min-h-[28rem] animate-pulse rounded-2xl bg-panel" />
      )}
      {trending.error && (
        <ErrorState error={trending.error} onRetry={trending.retry} />
      )}
      {trending.data && (
        <Hero movies={trending.data.results} genres={genres.data?.genres} />
      )}

      <MovieRow title="Popular now" category="popular" />
      <MovieRow title="Now playing" category="now_playing" />
      <MovieRow title="Top rated" category="top_rated" />
      <MovieRow title="Coming soon" category="upcoming" />
    </div>
  )
}