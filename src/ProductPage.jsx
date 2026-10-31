import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useCart } from "./CartContext.jsx";
import { useShop } from "./ShopContext.jsx";
import { useCatalog } from "./CatalogContext.jsx";
import { useApi, ApiState } from "./useApi.jsx";
import Stars from "./Stars.jsx";
import ProductCard from "./ProductCard.jsx";
import { Icon, Modal, Price } from "./Ui.jsx";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const request = useApi(`/products/${encodeURIComponent(id)}`);
  if (request.error?.status === 404)
    return (
      <div className="not-found">
        <h1>Product not found</h1>
        <Link to="/s">Browse all products</Link>
      </div>
    );
  if (!request.data) return <ApiState {...request} />;
  return <ProductDetail key={id} product={request.data.product} />;
}
function ProductDetail({ product }) {
  const { products } = useCatalog();
  const { addItem } = useCart();
  const { country } = useShop();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <Link to={`/s?department=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>›</span>
        <span>{product.brand}</span>
      </div>
      {added && (
        <div className="added-banner" role="status">
          <Icon name="check" size={24} />
          <strong>Added to Cart</strong>
          <Link className="secondary-button" to="/cart">
            Go to Cart
          </Link>
          <Link className="primary-button" to="/checkout">
            Proceed to checkout
          </Link>
        </div>
      )}
      <div className="product-page">
        <div className="product-gallery">
          <button
            className="product-thumbnail"
            onClick={() => setZoom(true)}
            aria-label="Enlarge product image"
          >
            <img src={product.image} alt="" />
          </button>
          <button
            className="product-main-image"
            onClick={() => setZoom(true)}
            aria-label={`Enlarge image of ${product.title}`}
          >
            <img src={product.image} alt={product.title} />
          </button>
          <p className="muted gallery-hint">
            Click image to open expanded view
          </p>
        </div>
        <div className="product-page-info">
          <h1>{product.title}</h1>
          <Link to={`/s?k=${encodeURIComponent(product.brand)}`}>
            Visit the {product.brand} Store
          </Link>
          <div className="product-page-rating">
            <span>{product.rating}</span>
            <Stars rating={product.rating} />
            <a href="#customer-reviews">
              {product.reviews.toLocaleString()} ratings
            </a>
          </div>
          {product.badge && (
            <span className="choice-badge">{product.badge}</span>
          )}
          <p className="muted popularity">
            {product.reviews > 10000 ? "1K+" : "100+"} bought in past month
          </p>
          <hr />
          <div className="detail-price">
            <span className="discount">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
            <Price value={product.price} />
          </div>
          <p className="muted list-price">
            List Price: <s>${product.originalPrice.toFixed(2)}</s>
          </p>
          <p>FREE Returns</p>
          <p>
            <strong>Color:</strong> {product.color}
          </p>
          <dl className="product-specs">
            <dt>Brand</dt>
            <dd>{product.brand}</dd>
            <dt>Color</dt>
            <dd>{product.color}</dd>
            <dt>Category</dt>
            <dd>{product.category}</dd>
          </dl>
          <hr />
          <h2>About this item</h2>
          <ul>
            {product.about.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <aside className="buy-box">
          <Price value={product.price} />
          <p>
            <a href="#delivery-details">FREE delivery</a> on eligible orders.
          </p>
          <p>Or fastest delivery available at checkout.</p>
          <p className="buy-box-location">
            <Icon name="pin" size={15} /> Deliver to {country}
          </p>
          <div className="stock buy-box-stock">
            {product.stock ? "In Stock" : "Currently unavailable"}
          </div>
          <label className="buy-box-quantity">
            Quantity:{" "}
            <select
              value={qty}
              aria-label="Quantity"
              onChange={(event) => setQty(Number(event.target.value))}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (value) => (
                  <option key={value}>{value}</option>
                ),
              )}
            </select>
          </label>
          <button
            className="primary-button full-width"
            disabled={!product.stock}
            onClick={() => {
              addItem(product.id, qty);
              setAdded(true);
            }}
          >
            Add to Cart
          </button>
          <button
            className="orange-button full-width"
            disabled={!product.stock}
            onClick={() => {
              addItem(product.id, qty);
              navigate("/checkout");
            }}
          >
            Buy Now
          </button>
          <dl className="seller-details">
            <dt>Ships from</dt>
            <dd>Amazon Demo</dd>
            <dt>Sold by</dt>
            <dd>Amazon Demo</dd>
            <dt>Returns</dt>
            <dd>30-day return policy</dd>
            <dt>Payment</dt>
            <dd>Demo checkout only</dd>
          </dl>
          <hr />
          <Link className="secondary-button full-width" to="/cart">
            View your cart
          </Link>
        </aside>
      </div>
      <section className="detail-delivery" id="delivery-details">
        <h2>Product details &amp; delivery</h2>
        <p>
          Available to shop in {country}. Prices, stock, and delivery
          information are sample data for this frontend demo.
        </p>
      </section>
      <section className="detail-reviews" id="customer-reviews">
        <h2>Customer reviews</h2>
        <div>
          <Stars rating={product.rating} />{" "}
          <strong>{product.rating} out of 5</strong>
        </div>
        <p className="muted">
          {product.reviews.toLocaleString()} sample ratings
        </p>
        {[5, 4, 3, 2, 1].map((stars, index) => (
          <div className="review-bar" key={stars}>
            <span>{stars} star</span>
            <div>
              <span style={{ width: `${[72, 18, 6, 2, 2][index]}%` }} />
            </div>
            <span>{[72, 18, 6, 2, 2][index]}%</span>
          </div>
        ))}
      </section>
      <section className="related-products">
        <h2>Products you might also like</h2>
        <div className="product-shelf-track">
          {products
            .filter(
              (item) =>
                item.id !== product.id && item.category === product.category,
            )
            .slice(0, 6)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
      {zoom && (
        <Modal
          title={product.title}
          className="image-modal"
          onClose={() => setZoom(false)}
        >
          <img src={product.image} alt={product.title} />
        </Modal>
      )}
    </div>
  );
}
