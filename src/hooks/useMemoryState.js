import { useEffect, useState } from "react";

// Shared in-memory store: values survive moving between pages,
// but everything is cleared when the page is refreshed (no saving in the browser).
const store = new Map();

export default function useMemoryState(key, initialValue) {
  const [value, setValue] = useState(() => (store.has(key) ? store.get(key) : initialValue));

  useEffect(() => {
    store.set(key, value);
  }, [key, value]);

  return [value, setValue];
}
