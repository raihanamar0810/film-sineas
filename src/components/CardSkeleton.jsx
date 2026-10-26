export default function CardSkeleton({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="aspect-2/3 animate-pulse rounded-xl bg-panel" />
      <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-panel" />
      <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-panel" />
    </div>
  )
}