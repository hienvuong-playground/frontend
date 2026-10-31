import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useCart } from './CartContext.jsx';
import products from './products.js';
import Stars from './Stars.jsx';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-page-missing">
        <h2>Product not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-page-image">{product.emoji}</div>

      <div className="product-page-info">
        <h1>{product.title}</h1>
        <div className="product-page-rating">
          {product.rating} <Stars rating={product.rating} />
          <span className="product-reviews">{product.reviews.toLocaleString()} ratings</span>
        </div>
        <hr />
        <div className="product-page-price">${product.price.toFixed(2)}</div>
        <hr />
        <h3>About this item</h3>
        <ul>
          {product.about.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="buy-box">
        <div className="product-page-price">${product.price.toFixed(2)}</div>
        <div className="buy-box-stock">In Stock</div>
        <select className="buy-box-qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              Quantity: {n}
            </option>
          ))}
        </select>
        <button
          className="buy-box-button buy-box-add"
          onClick={() => {
            addItem(product.id, qty);
            setAdded(true);
          }}
        >
          Add to Cart
        </button>
        {added && <div className="buy-box-added">✓ Added to Cart</div>}
        <button
          className="buy-box-button buy-box-buy"
          onClick={() => {
            addItem(product.id, qty);
            navigate('/cart');
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
