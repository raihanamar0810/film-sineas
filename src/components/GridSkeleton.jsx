import CardSkeleton from './CardSkeleton.jsx'

export default function GridSkeleton({ count = 12 }) {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}