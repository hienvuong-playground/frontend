import { Link } from 'react-router';
import './Header.css';

const NAV_LINKS = ["Today's Deals", 'Customer Service', 'Registry', 'Gift Cards', 'Sell'];

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-logo">
          playmart
        </Link>

        <a href="#" className="header-item">
          <span className="header-line1">Deliver to</span>
          <span className="header-line2">Vietnam</span>
        </a>

        <form className="header-search" onSubmit={(e) => e.preventDefault()}>
          <select className="header-search-category">
            <option>All</option>
          </select>
          <input className="header-search-input" type="text" placeholder="Search playmart" />
          <button className="header-search-button" type="submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </button>
        </form>

        <a href="#" className="header-item">
          <span className="header-line1">Hello, sign in</span>
          <span className="header-line2">Account &amp; Lists</span>
        </a>

        <a href="#" className="header-item">
          <span className="header-line1">Returns</span>
          <span className="header-line2">&amp; Orders</span>
        </a>

        <a href="#" className="header-item header-cart">
          <span className="header-cart-count">0</span>
          <svg width="32" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.5 12h12l2-8H6.2" />
          </svg>
          <span className="header-line2">Cart</span>
        </a>
      </div>

      <nav className="header-nav">
        <a href="#" className="header-nav-link">
          ☰ All
        </a>
        {NAV_LINKS.map((label) => (
          <a key={label} href="#" className="header-nav-link">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
