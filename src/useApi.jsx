import { useEffect, useState } from "react";
import { apiGet } from "./api.js";

export function useApi(path, delay = 0) {
  const [attempt, setAttempt] = useState(0);
  const key = `${path}:${attempt}`;
  const [state, setState] = useState({});
  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    let active = true;
    let timeout;
    const timer = setTimeout(async () => {
      timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const data = await apiGet(path, controller.signal);
        if (active && !controller.signal.aborted) setState({ key, data });
      } catch (error) {
        if (error.name === "AbortError")
          error = new Error("The request timed out. Try again.");
        if (active) setState({ key, error });
      } finally {
        clearTimeout(timeout);
      }
    }, delay);
    return () => {
      active = false;
      clearTimeout(timer);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [path, key, delay]);
  const current = state.key === key ? state : {};
  return {
    ...current,
    loading: Boolean(path && !current.data && !current.error),
    retry: () => setAttempt((previous) => previous + 1),
  };
}

export function ApiState({ loading, error, retry }) {
  if (loading)
    return (
      <div className="api-state" role="status">
        Loading products…
      </div>
    );
  if (!error) return null;
  return (
    <div className="api-state" role="alert">
      <p>{error.message}</p>
      <button className="secondary-button" onClick={retry}>
        Try again
      </button>
    </div>
  );
}
