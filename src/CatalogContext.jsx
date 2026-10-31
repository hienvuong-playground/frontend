import { createContext, useContext } from "react";
import { useApi, ApiState } from "./useApi.jsx";

const CatalogContext = createContext(null);
export function CatalogProvider({ children }) {
  const request = useApi("/catalog");
  if (!request.data) return <ApiState {...request} />;
  return (
    <CatalogContext.Provider value={request.data}>
      {children}
    </CatalogContext.Provider>
  );
}
export const useCatalog = () => useContext(CatalogContext);
