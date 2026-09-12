export default function FilterToolbar({ categories, selectedCategory, onCategoryChange, sort, onSortChange, order, onOrderChange, total, page, totalPages }) {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'created_at', label: 'Newest' },
    { value: 'stock', label: 'Availability' },
  ];

  const orderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  return (
    <div className="toolbar" role="search" aria-label="Product filters and sorting">
      <div className="toolbar-left">
        <div className="filter-group">
          <label className="filter-label" htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            className="select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="sort-by">Sort By</label>
          <select
            id="sort-by"
            className="select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort products by"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="sort-order">Order</label>
          <select
            id="sort-order"
            className="select"
            value={order}
            onChange={(e) => onOrderChange(e.target.value)}
            aria-label="Sort order"
            style={{ minWidth: '140px' }}
          >
            {orderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-count" aria-live="polite">
        Showing <strong>{total}</strong> product{total !== 1 ? 's' : ''}
        {page > 1 && <span> (page {page} of {totalPages})</span>}
      </div>
    </div>
  );
}