import { Link } from 'react-router';
import { useCart } from './CartContext.jsx';
import products from './products.js';
import './CartPage.css';

function CartPage() {
  const { items, count, setQty, removeItem } = useCart();

  const lines = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }));
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  if (lines.length === 0) {
    return (
      <div className="cart cart-empty">
        <h2>Your playmart Cart is empty</h2>
        <Link to="/">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-lines">
        <h1>Shopping Cart</h1>
        {lines.map(({ id, qty, product }) => (
          <div key={id} className="cart-line">
            <Link to={`/product/${id}`} className="cart-line-image">
              {product.emoji}
            </Link>
            <div className="cart-line-info">
              <Link to={`/product/${id}`} className="cart-line-title">
                {product.title}
              </Link>
              <div className="cart-line-stock">In Stock</div>
              <div className="cart-line-actions">
                <select value={qty} onChange={(e) => setQty(id, Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      Qty: {n}
                    </option>
                  ))}
                </select>
                <button className="cart-line-delete" onClick={() => removeItem(id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="cart-line-price">${product.price.toFixed(2)}</div>
          </div>
        ))}
        <div className="cart-subtotal-line">
          Subtotal ({count} {count === 1 ? 'item' : 'items'}): <strong>${subtotal.toFixed(2)}</strong>
        </div>
      </div>

      <div className="cart-checkout">
        <div className="cart-subtotal-line">
          Subtotal ({count} {count === 1 ? 'item' : 'items'}): <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <button className="cart-checkout-button">Proceed to checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
