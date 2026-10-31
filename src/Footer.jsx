import { Link } from 'react-router';
import './Footer.css';

const COLUMNS = [
  { title: 'Get to Know Us', links: ['Careers', 'About playmart', 'Investor Relations'] },
  { title: 'Make Money with Us', links: ['Sell products', 'Become an Affiliate', 'Advertise your products'] },
  { title: 'Payment Products', links: ['Business Card', 'Shop with Points', 'Reload Your Balance'] },
  { title: 'Let Us Help You', links: ['Your Account', 'Your Orders', 'Shipping Rates', 'Help'] },
];

function Footer() {
  return (
    <footer className="footer">
      <button className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </button>

      <div className="footer-columns">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((label) => (
              <a key={label} href="#">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <Link to="/" className="footer-logo">
          playmart
        </Link>
        <span>A learning project, not a real store.</span>
      </div>
    </footer>
  );
}

export default Footer;
