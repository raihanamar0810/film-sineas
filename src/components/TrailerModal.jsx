import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function TrailerModal({ videoKey, title, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // klik di area gelap (di luar video) menutup jendela
        if (e.target === ref.current) ref.current.close()
      }}
      aria-label={`Trailer ${title}`}
      className="m-auto w-[min(92vw,64rem,calc((100dvh_-_5rem)_*_16_/_9))] overflow-hidden rounded-2xl bg-ink p-0 text-paper backdrop:bg-black/80"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <h2 className="line-clamp-1 font-bold">{title}</h2>
        <button
          type="button"
          onClick={() => ref.current.close()}
          aria-label="Tutup trailer"
          className="grid size-10 place-items-center rounded-full hover:bg-panel focus-visible:outline-2 focus-visible:outline-signal"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
          title={`Trailer ${title}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="size-full"
        />
      </div>
    </dialog>
  )
}