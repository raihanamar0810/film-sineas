const messages = {
  'no-key': 'API key belum diatur. Periksa file .env lalu restart server.',
  network: 'Tidak bisa terhubung ke TMDB. Periksa koneksi internetmu.',
  auth: 'API key ditolak oleh TMDB. Periksa isi file .env.',
  'rate-limit': 'Terlalu banyak request. Tunggu sebentar lalu coba lagi.',
  'not-found': 'Film tidak ditemukan. Mungkin sudah dihapus dari TMDB.',
}

export default function ErrorState({ error, onRetry }) {
  const text = messages[error?.kind] ?? 'Terjadi kesalahan. Coba lagi.'

  return (
    <div role="alert" className="rounded-xl border border-edge bg-panel p-6 text-center">
      <p className="text-mute">{text}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-signal px-5 py-2 text-sm font-bold text-ink hover:brightness-110"
        >
          Coba lagi
        </button>
      )}
    </div>
  )
}