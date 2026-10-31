import { Link } from 'react-router';
import products from './products.js';
import Stars from './Stars.jsx';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home">
      <div className="home-hero">
        <h2>Deals of the day</h2>
        <p>Up to 40% off top picks</p>
      </div>

      <div className="home-grid">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="product-card">
            <div className="product-image">{p.emoji}</div>
            <div className="product-title">{p.title}</div>
            <div className="product-rating">
              <Stars rating={p.rating} />
              <span className="product-reviews">{p.reviews.toLocaleString()}</span>
            </div>
            <div className="product-price">${p.price.toFixed(2)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
