import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import FilterToolbar from './components/FilterToolbar';
import Pagination from './components/Pagination';
import AnalyticsPanel from './components/AnalyticsPanel';
import { useProducts } from './hooks/useProducts';
import { useClickTracking } from './hooks/useProducts';
import { useAnalytics } from './hooks/useProducts';

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const limit = 12;

  const { products, total, categories, loading, error } = useProducts({
    search,
    category,
    sort,
    order,
    page,
    limit,
  });

  const { track } = useClickTracking();
  const { popular, summary, loading: analyticsLoading } = useAnalytics(7);

  const totalPages = Math.ceil(total / limit);

  const handleProductClick = (productId, eventType) => {
    track(productId, eventType);
  };

  const handleSearchSubmit = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSortChange = (s) => {
    setSort(s);
    setPage(1);
  };

  const handleOrderChange = (o) => {
    setOrder(o);
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const debouncedSearch = useMemo(() => search, [search]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo" aria-label="ProductHub Home">
            <span className="logo-icon">PH</span>
            ProductHub
          </a>
          <SearchBar value={debouncedSearch} onChange={handleSearchSubmit} placeholder="Search products by name or description..." />
        </div>
      </header>

      <main className="main">
        <div className="container">
          {error && (
            <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', color: '#dc2626', marginBottom: '1rem' }}>
              Error loading products: {error}
            </div>
          )}

          <FilterToolbar
            categories={categories}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            sort={sort}
            onSortChange={handleSortChange}
            order={order}
            onOrderChange={handleOrderChange}
            total={total}
            page={page}
            totalPages={totalPages}
          />

          {loading ? (
            <div className="loading">
              <div className="spinner" />
              <span>Loading products...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="product-grid" role="list" aria-label="Products">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                    onView={(id) => track(id, 'view')}
                  />
                ))}
              </div>

              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}

          <AnalyticsPanel popular={popular} summary={summary} loading={analyticsLoading} />
        </div>
      </main>
    </div>
  );
}