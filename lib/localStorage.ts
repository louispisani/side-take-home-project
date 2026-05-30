export const getStorage = <T>(
  key: string,
  fallback: T
): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : fallback;
};

export const setStorage = (
  key: string,
  value: unknown
) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
};