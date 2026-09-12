export default function ProductCard({ product, onClick, onView }) {
  const handleImageClick = (e) => {
    e.stopPropagation();
    onView?.(product.id);
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
      onClick?.(product.id, 'card_click');
    }
  };

  const handleButtonClick = (e, eventType) => {
    e.stopPropagation();
    onClick?.(product.id, eventType);
  };

  const stockStatus = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : '';

  return (
    <article className="product-card" onClick={handleCardClick}>
      <img
        className="product-image"
        src={product.image_url}
        alt={product.name}
        loading="lazy"
        onClick={handleImageClick}
      />
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div>
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span className={`product-stock ${stockStatus}`} style={{ marginLeft: '0.5rem' }}>
              {product.stock === 0 ? 'Out of stock' : product.stock < 10 ? `Only ${product.stock} left` : 'In stock'}
            </span>
          </div>
          <button
            className="btn btn-primary"
            onClick={(e) => handleButtonClick(e, 'add_to_cart')}
            disabled={product.stock === 0}
            aria-label={product.stock === 0 ? 'Out of stock' : `Add ${product.name} to cart`}
          >
            {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}