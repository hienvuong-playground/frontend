import { Link, useNavigate, useSearchParams } from "react-router";
import { useCart } from "./CartContext.jsx";
import { useShop } from "./ShopContext.jsx";
import products from "./products.js";
import { Icon } from "./Ui.jsx";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { items, count, subtotal, clearCart } = useCart();
  const { name, country, addOrder } = useShop();
  const navigate = useNavigate();
  if (items.length === 0)
    return (
      <div className="page-container">
        <h1>Your cart is empty</h1>
        <Link className="primary-button" to="/s">
          Continue shopping
        </Link>
      </div>
    );
  const placeOrder = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const order = {
      id: `DEMO-${Date.now()}`,
      date: new Date().toISOString(),
      name: data.get("name"),
      total: subtotal,
      items: items.map((item) => ({ ...item })),
    };
    addOrder(order);
    clearCart();
    navigate(`/orders?placed=${order.id}`);
  };
  return (
    <div className="page-container checkout-page">
      <h1>
        Checkout <span>({count} items)</span>
      </h1>
      <p className="demo-checkout-note">
        Demo checkout — no payment or real order will be made.
      </p>
      <form onSubmit={placeOrder} className="checkout-layout">
        <div>
          <section className="checkout-section">
            <h2>
              1 <span>Shipping address</span>
            </h2>
            <div className="checkout-fields">
              <label className="field">
                Full name
                <input
                  name="name"
                  defaultValue={name}
                  required
                  maxLength={80}
                  autoComplete="name"
                />
              </label>
              <label className="field">
                Country/Region
                <select name="country" defaultValue={country}>
                  {[
                    "Vietnam",
                    "United States",
                    "United Kingdom",
                    "Japan",
                    "Australia",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                Street address
                <input
                  name="address"
                  required
                  autoComplete="street-address"
                  placeholder="Use a sample address"
                  maxLength={160}
                />
              </label>
              <label className="field">
                City
                <input
                  name="city"
                  required
                  maxLength={80}
                  autoComplete="address-level2"
                />
              </label>
            </div>
          </section>
          <section className="checkout-section">
            <h2>
              2 <span>Payment method</span>
            </h2>
            <p>
              <Icon name="check" size={16} /> Demo payment — $0 charged
            </p>
          </section>
          <section className="checkout-section">
            <h2>
              3 <span>Review items</span>
            </h2>
            {items.map((item) => {
              const product = products.find((p) => p.id === item.id);
              return (
                <div className="checkout-item" key={item.id}>
                  <img src={product.image} alt="" />
                  <div>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                    <p>
                      <strong>${product.price.toFixed(2)}</strong> · Quantity:{" "}
                      {item.qty}
                    </p>
                    <p className="stock">In Stock</p>
                  </div>
                </div>
              );
            })}
            <Link to="/cart">Change your cart</Link>
          </section>
        </div>
        <aside className="checkout-summary">
          <button className="primary-button full-width">
            Place demo order
          </button>
          <p className="muted">Try the order flow with sample information.</p>
          <hr />
          <h2>Order Summary</h2>
          <div>
            <span>Items ({count}):</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Shipping &amp; handling:</span>
            <span>$0.00</span>
          </div>
          <hr />
          <div className="checkout-total">
            <strong>Order total:</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </aside>
      </form>
    </div>
  );
}
export function OrdersPage() {
  const { orders } = useShop();
  const [params] = useSearchParams();
  return (
    <div className="page-container orders-page">
      {params.has("placed") && (
        <div className="order-confirmation" role="status">
          <Icon name="check" size={28} />
          <div>
            <h2>Thank you! Your demo order has been placed.</h2>
            <p>No payment was charged.</p>
          </div>
        </div>
      )}
      <h1>Your Orders</h1>
      <div className="orders-tabs">
        Orders <span>{orders.length}</span>
      </div>
      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>You haven't placed any demo orders yet.</h2>
          <Link className="primary-button" to="/s">
            Start shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <section className="order-card" key={order.id}>
            <header>
              <div>
                <span>ORDER PLACED</span>
                <strong>
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </strong>
              </div>
              <div>
                <span>TOTAL</span>
                <strong>${order.total.toFixed(2)}</strong>
              </div>
              <div>
                <span>SHIP TO</span>
                <strong>{order.name}</strong>
              </div>
              <div className="order-id">ORDER # {order.id}</div>
            </header>
            <div className="order-body">
              <h2>Demo order confirmed</h2>
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.id);
                if (!product) return null;
                return (
                  <div className="checkout-item" key={item.id}>
                    <img src={product.image} alt="" />
                    <div>
                      <Link to={`/product/${item.id}`}>{product.title}</Link>
                      <p>Quantity: {item.qty}</p>
                      <Link
                        className="primary-button"
                        to={`/product/${item.id}`}
                      >
                        Buy it again
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
