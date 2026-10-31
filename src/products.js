import catalog from "./catalog.json";
export const departments = [
  ...new Set(catalog.map((product) => product.category)),
];
export function searchProducts(query = "", department = "All") {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return catalog.filter(
    (product) =>
      (department === "All" || product.category === department) &&
      words.every((word) =>
        `${product.title} ${product.brand} ${product.category} ${product.tags}`
          .toLowerCase()
          .includes(word),
      ),
  );
}
export default catalog;
