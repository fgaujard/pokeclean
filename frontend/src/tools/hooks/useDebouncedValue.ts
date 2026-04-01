import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour créer une valeur debouncée
 * Retourne la valeur immédiate, une fonction pour la modifier, et la valeur debouncée
 * @param initialValue - La valeur initiale
 * @param delay - Le délai en millisecondes (par défaut 500ms)
 * @returns Un tuple [valeur immédiate, setter, valeur debouncée]
 * @example
 * const [search, setSearch, debouncedSearch] = useDebouncedValue("", 500);
 * // search = valeur pour l'input (mise à jour immédiate)
 * // setSearch = fonction pour modifier search
 * // debouncedSearch = valeur debouncée pour l'API
 */
export function useDebouncedValue<T>(
  initialValue: T,
  delay: number = 500
): [T, (value: T) => void, T] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue];
}
