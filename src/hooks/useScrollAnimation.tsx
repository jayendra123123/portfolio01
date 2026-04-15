import { useEffect, useRef, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

/**
 * High-performance scroll animation hook using IntersectionObserver
 * Optimized for 60fps scrolling with GPU acceleration
 * Usage: Works with transform3d and will-change for best performance
 */
export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    onEnter,
    onExit,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            onEnter?.();
          }
        } else {
          hasTriggeredRef.current = false;
          onExit?.();
        }
      });
    },
    [onEnter, onExit]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection]);

  return ref;
};
