import MovieGrid from './MovieGrid.jsx'
import GridSkeleton from './GridSkeleton.jsx'
import ErrorState from './ErrorState.jsx'

export default function PaginatedResults({ result, emptyState }) {
  const { items, status, error, hasMore, loadMore, retry } = result

  if (status === 'loading') return <GridSkeleton />
  if (status === 'error' && items.length === 0) return <ErrorState error={error} onRetry={retry} />
  if (items.length === 0) return emptyState

  return (
    <>
      <MovieGrid movies={items} />

      {status === 'error' && (
        <div className="mt-8">
          <ErrorState error={error} onRetry={loadMore} />
        </div>
      )}

      {hasMore && status !== 'error' && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={status === 'loading-more'}
            className="h-11 rounded-full border border-edge bg-panel px-8 text-sm font-bold hover:border-mute disabled:opacity-60"
          >
            {status === 'loading-more' ? 'Memuat…' : 'Muat lebih banyak'}
          </button>
        </div>
      )}
    </>
  )
}