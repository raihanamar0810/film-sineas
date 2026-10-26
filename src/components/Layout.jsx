import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'

const linkClass = ({ isActive }) =>
  isActive ? 'text-signal' : 'text-mute hover:text-paper'

export default function Layout() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { items } = useWatchlist()
  const [query, setQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const q = pathname === '/search' ? new URLSearchParams(search).get('q') : ''
    setQuery(q || '')
  }, [pathname, search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-edge">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-3">
          <Link to="/" className="text-xl font-bold">
            Film Sineas
          </Link>
          <nav className="flex gap-5 text-sm font-medium">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/browse" className={linkClass}>
              Browse
            </NavLink>
            <NavLink to="/watchlist" className={linkClass}>
              Watchlist
              {items.length > 0 && (
                <span className="ml-1.5 rounded-full bg-signal px-1.5 text-xs font-bold text-ink">
                  {items.length}
                </span>
              )}
            </NavLink>
          </nav>

          <form onSubmit={handleSubmit} role="search" className="w-full sm:ml-auto sm:w-72">
            <label htmlFor="search" className="sr-only">
              Cari film
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mute"
                aria-hidden="true"
              />
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari film"
                className="h-10 w-full rounded-full border border-edge bg-panel pl-10 pr-4 text-sm placeholder:text-mute focus:border-signal focus:outline-none"
              />
            </div>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-edge">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-mute">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <Link to="/about" className="hover:text-paper">
              Tentang dan atribusi
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Film Sineas. Dibuat oleh Raihan Amar.</p>
        </div>
      </footer>
    </div>
  )
}