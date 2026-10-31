import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') ?? '[]'));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (id, qty) =>
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { id, qty }]
    );

  const setQty = (id, qty) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return <CartContext.Provider value={{ items, count, addItem, setQty, removeItem }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
