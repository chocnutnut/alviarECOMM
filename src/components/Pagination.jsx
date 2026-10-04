import PropTypes from 'prop-types'

export default function Pagination({
  page,
  pageCount,
  onPageChange,
  label = 'Product pages',
}) {
  if (pageCount < 1) {
    return null
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav aria-label={label} className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:text-zinc-400"
      >
        Previous
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === page ? 'page' : undefined}
          className={`h-10 w-10 rounded-full text-sm font-medium ${
            pageNumber === page ? 'bg-accent text-white' : 'bg-surface text-ink ring-1 ring-line hover:bg-paper'
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className="rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:text-zinc-400"
      >
        Next
      </button>
    </nav>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  label: PropTypes.string,
}
