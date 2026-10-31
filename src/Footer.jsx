import { Link } from "react-router";
import { Brand, Icon } from "./Ui.jsx";
import { useShop } from "./ShopContext.jsx";
import "./Footer.css";
const columns = [
  {
    title: "Get to Know Us",
    links: [
      "Careers",
      "Blog",
      "About Amazon",
      "Investor Relations",
      "Amazon Devices",
      "Amazon Science",
    ],
  },
  {
    title: "Make Money with Us",
    links: [
      "Sell products on Amazon",
      "Sell on Amazon Business",
      "Sell apps on Amazon",
      "Become an Affiliate",
      "Advertise Your Products",
      "Self-Publish with Us",
      "Host an Amazon Hub",
    ],
  },
  {
    title: "Amazon Payment Products",
    links: [
      "Amazon Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Amazon Currency Converter",
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      "Your Account",
      "Your Orders",
      "Shipping Rates & Policies",
      "Returns & Replacements",
      "Manage Your Content and Devices",
      "Help",
    ],
  },
];
const services = [
  ["Amazon Music", "Stream millions of songs"],
  ["Amazon Ads", "Reach customers wherever they spend their time"],
  ["6pm", "Score deals on fashion brands"],
  ["AbeBooks", "Books, art & collectibles"],
  ["ACX", "Audiobook Publishing Made Easy"],
  ["Sell on Amazon", "Start a Selling Account"],
  ["Veeqo", "Shipping Software Inventory Management"],
  ["Amazon Business", "Everything For Your Business"],
  ["AmazonGlobal", "Ship Orders Internationally"],
  ["Amazon Web Services", "Scalable Cloud Computing Services"],
  ["Audible", "Listen to Books & Original Audio Performances"],
  ["Box Office Mojo", "Find Movie Box Office Data"],
  ["Goodreads", "Book reviews & recommendations"],
  ["IMDb", "Movies, TV & Celebrities"],
];
const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export default function Footer() {
  const { country } = useShop();
  return (
    <footer className="footer">
      <button
        className="footer-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>
      <div className="footer-main">
        <div className="footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((label) => (
                <Link
                  key={label}
                  to={
                    label === "Your Orders"
                      ? "/orders"
                      : `/info/${toSlug(label)}`
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-settings">
          <Link to="/" aria-label="Amazon home">
            <Brand />
          </Link>
          <span>
            <Icon name="globe" size={14} /> English
          </span>
          <span>$ USD — U.S. Dollar</span>
          <span>
            <Icon name="globe" size={14} /> {country}
          </span>
        </div>
      </div>
      <div className="footer-services">
        {services.map(([title, description]) => (
          <Link key={title} to={`/info/${toSlug(title)}`}>
            <strong>{title}</strong>
            <span>{description}</span>
          </Link>
        ))}
      </div>
      <div className="footer-legal">
        <div>
          <Link to="/info/conditions-of-use">Conditions of Use</Link>
          <Link to="/info/privacy-notice">Privacy Notice</Link>
          <Link to="/info/consumer-health-data-privacy-disclosure">
            Consumer Health Data Privacy Disclosure
          </Link>
          <Link to="/info/ads-privacy-choices">Your Ads Privacy Choices</Link>
        </div>
        <p>Amazon-inspired frontend demo. No real purchases.</p>
      </div>
    </footer>
  );
}
