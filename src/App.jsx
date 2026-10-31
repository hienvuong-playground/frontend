import { Routes, Route } from 'react-router';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import ProductPage from './ProductPage.jsx';
import CartPage from './CartPage.jsx';
import Footer from './Footer.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ScrollToTop from './ScrollToTop.jsx';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
