import { Link } from "react-router";
import Stars from "./Stars.jsx";
import { Price } from "./Ui.jsx";
export default function ProductCard({ product, deal = false }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      {deal && (
        <div className="deal-label">
          <span>
            {Math.round((1 - product.price / product.originalPrice) * 100)}% off
          </span>
          Limited time deal
        </div>
      )}
      <div className="product-title">{product.title}</div>
      <div className="product-rating">
        <Stars rating={product.rating} />
        <span className="product-reviews">
          {product.reviews.toLocaleString()}
        </span>
      </div>
      <Price value={product.price} />
    </Link>
  );
}
