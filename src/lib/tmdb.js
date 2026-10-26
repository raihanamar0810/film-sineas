const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const LANGUAGE = 'en-US'

export class ApiError extends Error {
  constructor(message, kind) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind // 'no-key' | 'network' | 'auth' | 'not-found' | 'rate-limit' | 'server'
  }
}

// Satu pintu untuk semua request ke TMDB
async function request(endpoint, params = {}, signal) {
  if (!API_KEY) {
    throw new ApiError('API key belum diatur', 'no-key')
  }

  const url = new URL(BASE_URL + endpoint)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', LANGUAGE)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  let response
  try {
    response = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err // dibatalkan sengaja, bukan error jaringan
    throw new ApiError('Tidak bisa terhubung ke TMDB', 'network')
  }

  if (!response.ok) {
    if (response.status === 401) throw new ApiError('API key ditolak', 'auth')
    if (response.status === 404) throw new ApiError('Data tidak ditemukan', 'not-found')
    if (response.status === 429) throw new ApiError('Terlalu banyak request', 'rate-limit')
    throw new ApiError('Server TMDB bermasalah', 'server')
  }

  return response.json()
}

// ---------- Langkah 1.4: endpoint ----------
export const getTrending = (signal) => request('/trending/movie/week', {}, signal)

// category: popular | now_playing | top_rated | upcoming
export const getMovieList = (category, page = 1, signal) =>
  request(`/movie/${category}`, { page }, signal)

export const getGenres = (signal) => request('/genre/movie/list', {}, signal)

export const searchMovies = (query, page = 1, signal) =>
  request('/search/movie', { query, page }, signal)

// Satu panggilan sekaligus membawa pemeran, video, dan film serupa
export const getMovie = (id, signal) =>
  request(`/movie/${id}`, { append_to_response: 'credits,videos,similar' }, signal)

// ---------- Langkah 1.4: helper ----------
export function posterUrl(path, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function backdropUrl(path, size = 'w1280') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function profileUrl(path, size = 'w185') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function formatYear(date) {
  if (!date) return 'TBA'
  return date.slice(0, 4)
}

export function formatRuntime(minutes) {
  if (!minutes) return null
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours ? `${hours}h ${mins}m` : `${mins}m`
}

export function formatDate(date) {
  if (!date) return 'TBA'
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatMoney(value) {
  if (!value) return null
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const discoverMovies = ({ genre, sort = 'popularity.desc', page = 1 }, signal) => {
  const today = new Date().toISOString().slice(0, 10)
  return request(
    '/discover/movie',
    {
      with_genres: genre,
      sort_by: sort,
      page,
      include_adult: false,
      // Tanpa batas ini, film dengan 1-2 suara bisa bernilai 10/10 dan menempati urutan teratas
      'vote_count.gte': sort.startsWith('vote_average') ? 300 : undefined,
      // Urutan "terbaru" hanya untuk film yang sudah rilis, bukan yang baru dijadwalkan
      'primary_release_date.lte': sort.startsWith('primary_release_date') ? today : undefined,
    },
    signal,
  )
}