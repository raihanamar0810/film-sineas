import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'film-sineas:watchlist'
const WatchlistContext = createContext(null)

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return [] // isi rusak atau storage diblokir: mulai dari kosong
  }
}

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(readStorage)

  // Setiap daftar berubah, simpan ulang ke browser
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage penuh atau diblokir: watchlist tetap jalan selama halaman terbuka
    }
  }, [items])

  const has = (id) => items.some((m) => m.id === id)

  const toggle = (movie) => {
    setItems((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id) // sudah ada: hapus
      }
      // belum ada: simpan data secukupnya saja, taruh paling depan
      const { id, title, poster_path, backdrop_path, vote_average, release_date } = movie
      return [{ id, title, poster_path, backdrop_path, vote_average, release_date }, ...prev]
    })
  }

  return (
    <WatchlistContext.Provider value={{ items, has, toggle }}>
      {children}
    </WatchlistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist harus dipakai di dalam <WatchlistProvider>')
  return ctx
}