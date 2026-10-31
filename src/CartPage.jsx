import { Link } from "react-router";
import { useCart } from "./CartContext.jsx";
import { useCatalog } from "./CatalogContext.jsx";
import { Icon } from "./Ui.jsx";
import "./CartPage.css";

export default function CartPage() {
  const { products } = useCatalog();
  const {
    items,
    saved,
    count,
    subtotal,
    setQty,
    removeItem,
    saveItem,
    addItem,
    removeSaved,
  } = useCart();
  const subtotalText = (
    <>
      Subtotal ({count} {count === 1 ? "item" : "items"}):{" "}
      <strong>${subtotal.toFixed(2)}</strong>
    </>
  );
  return (
    <div className="cart-background">
      <div className="cart">
        <div>
          <section className="cart-lines">
            {items.length === 0 ? (
              <div className="cart-empty">
                <div className="empty-cart-icon">
                  <Icon name="cart" size={100} />
                </div>
                <div>
                  <h1>Your Amazon Cart is empty</h1>
                  <Link to="/s?deals=1">Shop today's deals</Link>
                  <div>
                    <Link className="primary-button" to="/s">
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1>Shopping Cart</h1>
                <p className="cart-price-label muted">Price</p>
                {items.map(({ id, qty }) => {
                  const product = products.find((item) => item.id === id);
                  return (
                    <article className="cart-line" key={id}>
                      <Link className="cart-line-image" to={`/product/${id}`}>
                        <img src={product.image} alt={product.title} />
                      </Link>
                      <div className="cart-line-info">
                        <Link className="cart-line-title" to={`/product/${id}`}>
                          {product.title}
                        </Link>
                        <div className="stock cart-line-stock">In Stock</div>
                        <p className="muted cart-shipping">
                          Eligible for FREE Shipping
                        </p>
                        <label className="cart-gift">
                          <input type="checkbox" /> This is a gift
                        </label>
                        <p className="cart-color">
                          <strong>Color:</strong> {product.color}
                        </p>
                        <div className="cart-line-actions">
                          <div className="quantity-stepper">
                            <button
                              aria-label={`Decrease quantity of ${product.title}`}
                              onClick={() => setQty(id, qty - 1)}
                            >
                              {qty === 1 ? (
                                <Icon name="close" size={12} />
                              ) : (
                                "−"
                              )}
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              aria-label={`Quantity for ${product.title}`}
                              value={qty}
                              onChange={(event) => {
                                if (event.target.value)
                                  setQty(id, Number(event.target.value));
                              }}
                            />
                            <button
                              disabled={qty >= 99}
                              aria-label={`Increase quantity of ${product.title}`}
                              onClick={() => setQty(id, qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-button"
                            onClick={() => removeItem(id)}
                          >
                            Delete
                          </button>
                          <button
                            className="text-button"
                            onClick={() => saveItem(id)}
                          >
                            Save for later
                          </button>
                        </div>
                      </div>
                      <strong className="cart-line-price">
                        ${product.price.toFixed(2)}
                      </strong>
                    </article>
                  );
                })}
                <div className="cart-subtotal-line">{subtotalText}</div>
              </>
            )}
          </section>
          {saved.length > 0 && (
            <section className="cart-lines saved-items">
              <h2>Saved for later ({saved.length} items)</h2>
              {saved.map((id) => {
                const product = products.find((item) => item.id === id);
                return (
                  <article className="cart-line" key={id}>
                    <Link className="cart-line-image" to={`/product/${id}`}>
                      <img src={product.image} alt={product.title} />
                    </Link>
                    <div className="cart-line-info">
                      <Link className="cart-line-title" to={`/product/${id}`}>
                        {product.title}
                      </Link>
                      <p className="stock">In Stock</p>
                      <strong>${product.price.toFixed(2)}</strong>
                      <div className="cart-line-actions">
                        <button
                          className="secondary-button"
                          onClick={() => addItem(id)}
                        >
                          Move to Cart
                        </button>
                        <button
                          className="text-button"
                          onClick={() => removeSaved(id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
          <p className="cart-note muted">
            The price and availability of items are sample data. Your cart is
            saved in this browser.
          </p>
        </div>
        <aside className="cart-aside">
          {items.length > 0 && (
            <section className="cart-checkout">
              <p className="stock cart-free-delivery">
                <Icon name="check" size={16} /> Your order qualifies for FREE
                Shipping.
              </p>
              <div className="cart-subtotal-line">{subtotalText}</div>
              <label className="cart-gift">
                <input type="checkbox" /> This order contains a gift
              </label>
              <Link className="primary-button full-width" to="/checkout">
                Proceed to checkout
              </Link>
            </section>
          )}
          <section className="cart-recommendations">
            <h3>Customers who bought items in your cart also bought</h3>
            {products.slice(0, 3).map((product) => (
              <div key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt="" />
                </Link>
                <div>
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                  <strong>${product.price.toFixed(2)}</strong>
                  <button
                    className="primary-button"
                    onClick={() => addItem(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
}
