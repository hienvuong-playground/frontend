import { useRef } from "react";
import { Link } from "react-router";
import products from "./products.js";
import storefront from "./storefront.json";
import ProductCard from "./ProductCard.jsx";
import { Icon } from "./Ui.jsx";
import "./HomePage.css";

function ProductShelf({ title, items, deal = false }) {
  const shelf = useRef(null);
  return (
    <section className="product-shelf">
      <div className="shelf-heading">
        <h2>{title}</h2>
        <Link to={deal ? "/s?deals=1" : "/s?department=Electronics"}>
          See more
        </Link>
        <div className="shelf-controls">
          <button
            aria-label={`Previous ${title}`}
            className="secondary-button"
            onClick={() =>
              shelf.current.scrollBy({ left: -700, behavior: "smooth" })
            }
          >
            ‹
          </button>
          <button
            aria-label={`Next ${title}`}
            className="secondary-button"
            onClick={() =>
              shelf.current.scrollBy({ left: 700, behavior: "smooth" })
            }
          >
            ›
          </button>
        </div>
      </div>
      <div className="product-shelf-track" ref={shelf}>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} deal={deal} />
        ))}
      </div>
    </section>
  );
}
export default function HomePage() {
  const carousel = useRef(null);
  return (
    <div className="home">
      <section className="promo-carousel" aria-label="Featured departments">
        <div className="promo-track" ref={carousel}>
          {storefront.promos.map((promo) => (
            <Link
              key={promo.title}
              className="promo-card"
              to={`/s?department=${encodeURIComponent(promo.department)}`}
            >
              <img
                src={promo.image}
                alt=""
                fetchpriority={promo === storefront.promos[0] ? "high" : "auto"}
              />
              <h2>{promo.title}</h2>
            </Link>
          ))}
        </div>
        <button
          className="carousel-arrow carousel-prev"
          aria-label="Previous featured departments"
          onClick={() =>
            carousel.current.scrollBy({ left: -600, behavior: "smooth" })
          }
        >
          ‹
        </button>
        <button
          className="carousel-arrow carousel-next"
          aria-label="Next featured departments"
          onClick={() =>
            carousel.current.scrollBy({ left: 600, behavior: "smooth" })
          }
        >
          ›
        </button>
      </section>
      <div className="category-grid">
        {storefront.categories.map((category) => (
          <section className="category-card" key={category.title}>
            <h2>{category.title}</h2>
            <div className="category-items">
              {category.items.map((item) => (
                <Link
                  to={`/s?k=${encodeURIComponent(item.query)}`}
                  key={item.label}
                >
                  <div className="category-image">
                    <img src={item.image} alt={item.label} loading="lazy" />
                  </div>
                  <span>
                    {item.label.replace(/\b\w/g, (letter) =>
                      letter.toUpperCase(),
                    )}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              className="category-more"
              to={`/s?department=${encodeURIComponent(category.department)}`}
            >
              Shop more
              <Icon name="chevron" size={13} />
            </Link>
          </section>
        ))}
      </div>
      <ProductShelf
        title="Best Sellers in Electronics"
        items={products.slice(0, 12)}
      />
      <ProductShelf
        title="Deals you might like"
        items={[
          products[1],
          products[5],
          products[7],
          products[12],
          products[21],
          products[31],
        ]}
        deal
      />
      <section className="home-signin">
        <h2>Discover your next favorite</h2>
        <Link className="primary-button" to="/s">
          Explore all products
        </Link>
        <p>Shop electronics, home essentials, and more.</p>
      </section>
    </div>
  );
}
