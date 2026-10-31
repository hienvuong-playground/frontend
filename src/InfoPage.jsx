import { Link, useParams } from "react-router";
export default function InfoPage() {
  const { slug } = useParams();
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="page-container info-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>{title}</span>
      </div>
      <h1>{title}</h1>
      <p>
        This is an Amazon-inspired shopping demo. Explore the catalog, manage
        your cart, and try a demo checkout.
      </p>
      <hr />
      <h2>What do you need help with?</h2>
      <div className="help-links">
        <Link className="secondary-button" to="/orders">
          Your Orders
        </Link>
        <Link className="secondary-button" to="/cart">
          Your Cart
        </Link>
        <Link className="secondary-button" to="/s">
          Find a product
        </Link>
      </div>
      <h3>Shopping in this demo</h3>
      <p>
        Your cart and demo orders are saved in this browser. You can change
        quantities, delete products, and save items for later from your cart.
      </p>
      <p>
        No real purchases, payments, returns, or account registration are
        processed.
      </p>
    </div>
  );
}
