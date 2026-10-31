import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import ProductPage from './ProductPage.jsx';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error: could not reach backend'));
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <p className="backend-status">Backend: {message}</p>
    </>
  );
}

export default App;
