import { Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./Header.jsx";
import HomePage from "./HomePage.jsx";
import SearchPage from "./SearchPage.jsx";
import ProductPage from "./ProductPage.jsx";
import CartPage from "./CartPage.jsx";
import CheckoutPage, { OrdersPage } from "./CheckoutPage.jsx";
import InfoPage from "./InfoPage.jsx";
import Footer from "./Footer.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
export default function App() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    document.title =
      pathname === "/"
        ? "Amazon.com. Spend less. Smile more. — Demo"
        : "Amazon Shopping — Demo";
  }, [pathname]);
  return (
    <>
      <ScrollToTop />
      <Header key={`${pathname}${search}`} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/s" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/info/:slug" element={<InfoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
