export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5;
  let start = Math.max(1, page - Math.floor(showPages / 2));
  let end = Math.min(totalPages, start + showPages - 1);

  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {start > 1 && (
        <>
          <button className="page-btn" onClick={() => onPageChange(1)} aria-label="Page 1">1</button>
          {start > 2 && <span className="page-btn" style={{ pointerEvents: 'none', borderColor: 'transparent', background: 'transparent' }} aria-hidden="true">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="page-btn" style={{ pointerEvents: 'none', borderColor: 'transparent', background: 'transparent' }} aria-hidden="true">…</span>}
          <button className="page-btn" onClick={() => onPageChange(totalPages)} aria-label={`Page ${totalPages}`}>{totalPages}</button>
        </>
      )}

      <button
        className="page-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}