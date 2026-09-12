export default function AnalyticsPanel({ popular, summary, loading }) {
  if (loading) {
    return (
      <div className="analytics-panel">
        <div className="loading">
          <div className="spinner" />
          <span>Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="analytics-panel" aria-labelledby="analytics-title">
      <h2 id="analytics-title" className="analytics-title">📊 Click Analytics (Last 7 Days)</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-value">{summary.totalClicks || 0}</div>
          <div className="analytics-label">Total Clicks</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-value">{summary.uniqueSessions || 0}</div>
          <div className="analytics-label">Unique Sessions</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-value">
            {summary.uniqueSessions > 0
              ? (summary.totalClicks / summary.uniqueSessions).toFixed(1)
              : 0}
          </div>
          <div className="analytics-label">Clicks per Session</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-value">{summary.topCategories.length}</div>
          <div className="analytics-label">Active Categories</div>
        </div>
      </div>

      {summary.topCategories.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
            Top Categories
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {summary.topCategories.map((cat, i) => (
              <span key={cat.category} style={{
                padding: '0.25rem 0.75rem',
                background: i === 0 ? 'rgb(37 99 235 / 0.1)' : 'var(--color-bg)',
                border: i === 0 ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '999px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: i === 0 ? 'var(--color-primary)' : 'var(--color-text)',
              }}>
                {cat.category} ({cat.clicks})
              </span>
            ))}
          </div>
        </div>
      )}

      {popular.length > 0 && (
        <div className="popular-products">
          <h3 className="popular-title">Most Clicked Products</h3>
          <div className="popular-list">
            {popular.slice(0, 5).map((item, idx) => (
              <div key={item.id} className="popular-item">
                <span className="popular-rank">{idx + 1}</span>
                <div className="popular-info">
                  <div className="popular-name">{item.name}</div>
                  <div className="popular-meta">
                    {item.category} • ${item.price.toFixed(2)} • {item.click_count} click{item.click_count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}