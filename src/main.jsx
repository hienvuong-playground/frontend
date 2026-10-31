import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { CartProvider } from "./CartContext.jsx";
import { ShopProvider } from "./ShopContext.jsx";
import { CatalogProvider } from "./CatalogContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <CatalogProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CatalogProvider>
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>,
);
