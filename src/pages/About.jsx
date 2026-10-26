const stack = ['React', 'Vite', 'Tailwind CSS', 'React Router', 'TMDB API']

export default function About() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-extrabold tracking-tight">Tentang Film Sineas</h1>
      <p className="mt-4 leading-relaxed text-paper/90">
        Film Sineas adalah project portofolio front end untuk menjelajahi film: melihat film
        yang sedang ramai, mencari judul, menonton trailer, dan menyimpan watchlist. Project
        ini dibuat untuk belajar, tidak dijual, dan tidak memuat iklan.
      </p>

      <h2 className="mt-10 text-xl font-bold">Dibuat dengan</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {stack.map((item) => (
          <li key={item} className="rounded-full border border-edge px-3 py-1 text-sm text-mute">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-bold">Sumber data</h2>
      <div className="mt-4 rounded-xl border border-edge bg-panel p-5">
        <img src="/tmdb-logo.svg" alt="Logo TMDB" className="h-5 w-auto" />
        <p className="mt-4 text-sm leading-relaxed text-mute">
          This product uses the TMDB API but is not endorsed or certified by TMDB. Data film
          dan gambar berasal dari TMDB. Poster dan trailer adalah milik pemegang haknya
          masing-masing, dan trailer diputar lewat YouTube.
        </p>
      </div>
    </div>
  )
}