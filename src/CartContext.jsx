import { createContext, useContext, useEffect, useState } from "react";
import { useCatalog } from "./CatalogContext.jsx";
import { readStorage, writeStorage } from "./storage.js";

const CartContext = createContext(null);
const clamp = (qty) => Math.min(99, Math.max(1, Math.floor(Number(qty) || 1)));
export function CartProvider({ children }) {
  const { products } = useCatalog();
  const validIds = new Set(products.map((product) => product.id));
  const [items, setItems] = useState(() => {
    const stored = readStorage("cart", []);
    return Array.isArray(stored)
      ? stored
          .filter((item) => item && validIds.has(item.id))
          .map((item) => ({ id: item.id, qty: clamp(item.qty) }))
      : [];
  });
  const [saved, setSaved] = useState(() => {
    const stored = readStorage("amazon-saved", []);
    return Array.isArray(stored) ? stored.filter((id) => validIds.has(id)) : [];
  });
  useEffect(() => writeStorage("cart", items), [items]);
  useEffect(() => writeStorage("amazon-saved", saved), [saved]);
  const addItem = (id, qty = 1) => {
    if (!validIds.has(id)) return;
    setItems((previous) =>
      previous.some((item) => item.id === id)
        ? previous.map((item) =>
            item.id === id
              ? { ...item, qty: clamp(item.qty + clamp(qty)) }
              : item,
          )
        : [...previous, { id, qty: clamp(qty) }],
    );
    setSaved((previous) => previous.filter((savedId) => savedId !== id));
  };
  const removeItem = (id) =>
    setItems((previous) => previous.filter((item) => item.id !== id));
  const setQty = (id, qty) =>
    Number(qty) <= 0
      ? removeItem(id)
      : setItems((previous) =>
          previous.map((item) =>
            item.id === id ? { ...item, qty: clamp(qty) } : item,
          ),
        );
  const saveItem = (id) => {
    removeItem(id);
    setSaved((previous) => [...new Set([...previous, id])]);
  };
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce(
    (sum, item) =>
      sum + products.find((product) => product.id === item.id).price * item.qty,
    0,
  );
  return (
    <CartContext.Provider
      value={{
        items,
        saved,
        count,
        subtotal,
        addItem,
        setQty,
        removeItem,
        saveItem,
        clearCart: () => setItems([]),
        removeSaved: (id) =>
          setSaved((previous) => previous.filter((savedId) => savedId !== id)),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
