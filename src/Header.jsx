import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCart } from "./CartContext.jsx";
import { useShop } from "./ShopContext.jsx";
import { departments, searchProducts } from "./products.js";
import { Brand, Icon, Modal } from "./Ui.jsx";
import "./Header.css";

export default function Header() {
  const { count } = useCart();
  const { name, setName, country, setCountry } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get("k") || "",
  );
  const [department, setDepartment] = useState(
    () => new URLSearchParams(location.search).get("department") || "All",
  );
  const [dialog, setDialog] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [draftName, setDraftName] = useState("");
  const search = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("k", query.trim());
    if (department !== "All") params.set("department", department);
    setShowSuggestions(false);
    navigate(`/s?${params}`);
  };
  const suggestions =
    query.trim().length > 1
      ? searchProducts(query, department).slice(0, 5)
      : [];
  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-logo" aria-label="Amazon home">
          <Brand />
        </Link>
        <button
          className="header-item header-delivery"
          onClick={() => setDialog("location")}
        >
          <Icon name="pin" size={17} />
          <span>
            <span className="header-line1 muted-line">Deliver to</span>
            <span className="header-line2">{country}</span>
          </span>
        </button>
        <div className="header-search-wrap">
          <form className="header-search" role="search" onSubmit={search}>
            <select
              className="header-search-category"
              aria-label="Search department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              style={{ width: department === "All" ? 52 : 135 }}
            >
              <option>All</option>
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input
              className="header-search-input"
              type="search"
              autoComplete="off"
              placeholder="Search Amazon"
              aria-label="Search Amazon"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setShowSuggestions(false);
              }}
            />
            <button
              className="header-search-button"
              type="submit"
              aria-label="Search"
            >
              <Icon name="search" size={25} />
            </button>
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setShowSuggestions(false)}
                >
                  <Icon name="search" size={15} />
                  <span>{product.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button
          className="header-item header-language"
          onClick={() => setDialog("language")}
          aria-label="Language and currency"
        >
          <span>
            🇺🇸 <strong>EN</strong>
            <span className="header-caret" />
          </span>
        </button>
        <div className="header-account">
          <button
            className="header-item"
            onClick={() => {
              setDraftName(name);
              setDialog("signin");
            }}
          >
            <span className="header-line1">Hello, {name || "sign in"}</span>
            <span className="header-line2">
              Account &amp; Lists
              <span className="header-caret" />
            </span>
          </button>
          <div className="account-popover">
            <button
              className="primary-button full-width"
              onClick={() => {
                setDraftName(name);
                setDialog("signin");
              }}
            >
              {name ? "Switch profile" : "Sign in"}
            </button>
            <p className="muted">
              {name
                ? `Welcome, ${name}`
                : "New customer? Create a demo profile."}
            </p>
            <hr />
            <h3>Your Account</h3>
            <Link to="/orders">Your Orders</Link>
            <Link to="/cart">Your Cart</Link>
            <Link to="/info/customer-service">Customer Service</Link>
            {name && (
              <button className="text-button" onClick={() => setName("")}>
                Sign out
              </button>
            )}
          </div>
        </div>
        <Link to="/orders" className="header-item header-orders">
          <span className="header-line1">Returns</span>
          <span className="header-line2">&amp; Orders</span>
        </Link>
        <Link
          to="/cart"
          className="header-item header-cart"
          aria-label={`${count} items in cart`}
        >
          <span className="header-cart-count">{count}</span>
          <Icon name="cart" size={38} />
          <span className="header-line2">Cart</span>
        </Link>
      </div>
      <nav className="header-nav" aria-label="Shopping navigation">
        <button
          className="header-nav-link header-nav-all"
          onClick={() => setDialog("menu")}
        >
          <Icon name="menu" size={17} />
          All
        </button>
        <Link className="header-nav-link" to="/info/prime-video">
          Prime Video
        </Link>
        <Link className="header-nav-link" to="/s?deals=1">
          Coupons
        </Link>
        <Link className="header-nav-link" to="/info/customer-service">
          Customer Service
        </Link>
        <Link className="header-nav-link" to="/s?deals=1">
          Today's Deals
        </Link>
        <Link className="header-nav-link" to="/info/registry">
          Registry
        </Link>
        <Link className="header-nav-link" to="/info/gift-cards">
          Gift Cards
        </Link>
        <Link className="header-nav-link" to="/info/sell">
          Sell
        </Link>
      </nav>
      {dialog === "menu" && (
        <Modal
          className="department-drawer"
          title={`Hello, ${name || "sign in"}`}
          onClose={() => setDialog(null)}
        >
          <h3>Shop by Department</h3>
          {departments.map((item) => (
            <Link
              key={item}
              to={`/s?department=${encodeURIComponent(item)}`}
              className="drawer-link"
            >
              {item}
              <Icon name="chevron" size={16} />
            </Link>
          ))}
          <hr />
          <h3>Programs &amp; Features</h3>
          <Link className="drawer-link" to="/s?deals=1">
            Today's Deals
          </Link>
          <Link className="drawer-link" to="/cart">
            Shopping Cart
          </Link>
          <Link className="drawer-link" to="/orders">
            Your Orders
          </Link>
          <hr />
          <h3>Help &amp; Settings</h3>
          <button className="drawer-link" onClick={() => setDialog("location")}>
            Your country: {country}
          </button>
          <Link className="drawer-link" to="/info/customer-service">
            Customer Service
          </Link>
        </Modal>
      )}
      {dialog === "location" && (
        <Modal title="Choose your location" onClose={() => setDialog(null)}>
          <p className="muted">
            Choose where you want to shop. Delivery details in this demo are
            illustrative.
          </p>
          <label className="field">
            Country/Region
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
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
          <button
            className="primary-button full-width"
            onClick={() => setDialog(null)}
          >
            Done
          </button>
        </Modal>
      )}
      {dialog === "language" && (
        <Modal title="Language & currency" onClose={() => setDialog(null)}>
          <p>
            <strong>English — EN</strong>
          </p>
          <p className="muted">
            Prices in this demo are shown in US Dollars (USD).
          </p>
          <button
            className="primary-button full-width"
            onClick={() => setDialog(null)}
          >
            Done
          </button>
        </Modal>
      )}
      {dialog === "signin" && (
        <Modal
          title="Sign in to your demo profile"
          onClose={() => setDialog(null)}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setName(draftName.trim());
              setDialog(null);
            }}
          >
            <p className="muted">
              Use any name to try the shopping experience. No password needed.
            </p>
            <label className="field">
              Your name
              <input
                autoFocus
                required
                maxLength={30}
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
              />
            </label>
            <button className="primary-button full-width">Continue</button>
          </form>
        </Modal>
      )}
    </header>
  );
}
