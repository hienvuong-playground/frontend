import { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "./storage.js";
const ShopContext = createContext(null);
export function ShopProvider({ children }) {
  const [name, setName] = useState(() => {
    const value = readStorage("amazon-name", "");
    return typeof value === "string" ? value : "";
  });
  const [country, setCountry] = useState(() => {
    const value = readStorage("amazon-country", "Vietnam");
    return typeof value === "string" ? value : "Vietnam";
  });
  const [orders, setOrders] = useState(() => {
    const value = readStorage("amazon-orders", []);
    return Array.isArray(value) ? value : [];
  });
  useEffect(() => writeStorage("amazon-name", name), [name]);
  useEffect(() => writeStorage("amazon-country", country), [country]);
  useEffect(() => writeStorage("amazon-orders", orders), [orders]);
  return (
    <ShopContext.Provider
      value={{
        name,
        setName,
        country,
        setCountry,
        orders,
        addOrder: (order) => setOrders((previous) => [order, ...previous]),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
export const useShop = () => useContext(ShopContext);
