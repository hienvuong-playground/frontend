const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export async function apiGet(path, signal) {
  const response = await fetch(`${baseUrl}/api${path}`, { signal });
  if (!response.ok) {
    const error = new Error(
      response.status === 404
        ? "Product not found."
        : "Could not load products. Try again.",
    );
    error.status = response.status;
    throw error;
  }
  return response.json();
}
