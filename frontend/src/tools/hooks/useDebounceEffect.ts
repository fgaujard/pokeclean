import { useEffect, useRef } from "react";

/**
 * Hook personnalisé pour exécuter une fonction après un délai lorsque les dépendances changent
 * Fonctionne comme useEffect mais avec un debounce
 * @param callback - La fonction à exécuter après le délai
 * @param delay - Le délai en millisecondes (par défaut 500ms)
 * @param dependencies - Tableau de dépendances (comme useEffect)
 * @example
 * useDebounceEffect(() => {
 *   // Code à exécuter après le délai
 * }, 300, [searchQuery]);
 */
export function useDebounceEffect(
  callback: () => void,
  delay: number = 500,
  dependencies: unknown[] = []
): void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Annule le timeout précédent s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Crée un nouveau timeout
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    // Cleanup au démontage ou avant la prochaine exécution
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, delay]);
}
