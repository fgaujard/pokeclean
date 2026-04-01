import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface UseScrollEndCallbackOptions {
  /**
   * Callback à exécuter quand l'utilisateur atteint la fin du scroll
   */
  onScrollEnd: () => void;
  /**
   * Si true, le callback ne sera pas exécuté
   */
  disabled?: boolean;
  /**
   * Marge en pixels avant la fin pour déclencher le callback (par défaut 100px)
   */
  rootMargin?: string;
  /**
   * Seuil de visibilité pour déclencher l'observer (par défaut 0.1)
   */
  threshold?: number;
  /**
   * Conteneur de scroll personnalisé (optionnel)
   */
  scrollContainer?: RefObject<HTMLElement | HTMLDivElement>;
}

/**
 * Hook personnalisé pour détecter quand l'utilisateur atteint la fin du scroll
 * Utilise IntersectionObserver pour une détection performante
 *
 * @returns Une ref à attacher à l'élément cible qui déclenchera le callback
 */
export function useScrollEndCallback({
  onScrollEnd,
  disabled = false,
  rootMargin = "100px",
  threshold = 0.1,
  scrollContainer,
}: UseScrollEndCallbackOptions) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onScrollEnd();
        }
      },
      {
        root: scrollContainer?.current || null,
        rootMargin,
        threshold,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [onScrollEnd, disabled, rootMargin, threshold, scrollContainer]);

  return observerTarget;
}
