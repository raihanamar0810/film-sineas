import { useEffect, useRef, useState } from 'react'

// fetchPage(page, signal) harus mengembalikan { results, total_pages, total_results }
export function usePaginatedMovies(fetchPage, deps = []) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [status, setStatus] = useState('loading') // loading | loading-more | ready | error
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const controllerRef = useRef(null)

  function load(pageToLoad, append) {
    controllerRef.current?.abort() // batalkan request sebelumnya yang masih berjalan
    const controller = new AbortController()
    controllerRef.current = controller

    setStatus(append ? 'loading-more' : 'loading')
    setError(null)

    fetchPage(pageToLoad, controller.signal)
      .then((data) => {
        setItems((prev) => {
          const merged = append ? [...prev, ...data.results] : data.results
          // TMDB kadang mengirim film yang sama di dua halaman berbeda
          return merged.filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
        })
        setPage(pageToLoad)
        setTotalPages(data.total_pages)
        setTotalResults(data.total_results)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err)
        setStatus('error')
      })
  }

  // Setiap filter berubah: kosongkan daftar, mulai dari halaman 1
  useEffect(() => {
    setItems([])
    load(1, false)
    return () => controllerRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  return {
    items,
    status,
    error,
    totalResults,
    hasMore: page < Math.min(totalPages, 500), // TMDB hanya melayani sampai halaman 500
    loadMore: () => load(page + 1, true),
    retry: () => setAttempt((n) => n + 1),
  }
}