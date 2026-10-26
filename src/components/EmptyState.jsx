import { Link } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, text, actionLabel, actionTo }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      {Icon && <Icon className="size-10 text-mute" aria-hidden="true" />}
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      {text && <p className="mt-2 text-mute">{text}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-5 inline-flex h-10 items-center rounded-full bg-signal px-5 text-sm font-bold text-ink hover:brightness-110"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}