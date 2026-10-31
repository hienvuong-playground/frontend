import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { departments, searchProducts } from "./products.js";
import { useCart } from "./CartContext.jsx";
import Stars from "./Stars.jsx";
import { Price } from "./Ui.jsx";
import "./SearchPage.css";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const { addItem } = useCart();
  const [added, setAdded] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const query = params.get("k") || "";
  const department = params.get("department") || "All";
  const rating = Number(params.get("rating")) || 0;
  const maxPrice = Number(params.get("price")) || Infinity;
  const sort = params.get("sort") || "featured";
  const deals = params.get("deals") === "1";
  let results = searchProducts(query, department).filter(
    (product) =>
      product.rating >= rating &&
      product.price <= maxPrice &&
      (!deals || product.originalPrice > product.price),
  );
  if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
  if (sort === "rating") results.sort((a, b) => b.rating - a.rating);
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };
  return (
    <div className="search-page">
      <div className="search-summary">
        <span>
          {results.length ? `1–${results.length} of ${results.length}` : "0"}{" "}
          results
          {query && (
            <>
              {" "}
              for <strong>“{query}”</strong>
            </>
          )}
          {deals && <strong> · Today's Deals</strong>}
        </span>
        <label>
          Sort by:{" "}
          <select
            aria-label="Sort results"
            value={sort}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
          </select>
        </label>
      </div>
      <div className="search-layout">
        <aside
          className={`search-filters ${showFilters ? "filters-open" : ""}`}
        >
          <h3>Department</h3>
          <button
            className={department === "All" ? "selected-filter" : ""}
            onClick={() => update("department", "")}
          >
            All Departments
          </button>
          {departments.map((item) => (
            <button
              key={item}
              className={department === item ? "selected-filter" : ""}
              onClick={() => update("department", item)}
            >
              {item}
            </button>
          ))}
          <h3>Customer Reviews</h3>
          <button
            className={rating === 4 ? "selected-filter" : ""}
            onClick={() => update("rating", rating ? "" : "4")}
          >
            <Stars rating={4} /> &amp; Up
          </button>
          <h3>Price</h3>
          {[
            [25, "Under $25"],
            [50, "Under $50"],
            [100, "Under $100"],
            [200, "Under $200"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={maxPrice === value ? "selected-filter" : ""}
              onClick={() => update("price", String(value))}
            >
              {label}
            </button>
          ))}
          <h3>Deals &amp; Discounts</h3>
          <label className="deal-filter">
            <input
              type="checkbox"
              checked={deals}
              onChange={(event) =>
                update("deals", event.target.checked ? "1" : "")
              }
            />{" "}
            All Discounts
          </label>
          <button
            className="text-button clear-filters"
            onClick={() => {
              const next = new URLSearchParams();
              if (query) next.set("k", query);
              setParams(next);
            }}
          >
            Clear all filters
          </button>
        </aside>
        <section className="search-results">
          <button
            className="secondary-button mobile-filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide filters" : "Filters"}
          </button>
          <h1>Results</h1>
          <p className="muted">
            Check each product page for other buying options.
          </p>
          {results.length === 0 && (
            <div className="no-results">
              <h2>No results found</h2>
              <p>Try another keyword or remove a filter.</p>
              <Link className="primary-button" to="/s">
                Browse all products
              </Link>
            </div>
          )}
          {results.map((product) => (
            <article className="search-result" key={product.id}>
              <Link className="result-image" to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
              </Link>
              <div className="result-info">
                {product.badge && (
                  <span className="choice-badge">{product.badge}</span>
                )}
                <Link className="result-title" to={`/product/${product.id}`}>
                  {product.title}
                </Link>
                <div className="result-rating">
                  <span>{product.rating}</span>
                  <Stars rating={product.rating} />
                  <Link to={`/product/${product.id}`}>
                    {product.reviews.toLocaleString()}
                  </Link>
                </div>
                <p className="result-popularity">
                  {product.reviews > 10000 ? "1K+" : "100+"} bought in past
                  month
                </p>
                {deals && (
                  <span className="deal-label">
                    <span>Limited time deal</span>
                  </span>
                )}
                <Price value={product.price} />
                <span className="muted result-list-price">
                  {" "}
                  List: <s>${product.originalPrice.toFixed(2)}</s>
                </span>
                <p className="result-delivery">
                  <strong>FREE delivery</strong> on eligible orders
                  <br />
                  Ships to your selected location
                </p>
                <div className="result-actions">
                  <button
                    className="primary-button"
                    onClick={() => {
                      addItem(product.id);
                      setAdded((previous) => [
                        ...new Set([...previous, product.id]),
                      ]);
                    }}
                  >
                    Add to Cart
                  </button>
                  {added.includes(product.id) && (
                    <Link to="/cart" className="stock" role="status">
                      ✓ Added · View Cart
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
