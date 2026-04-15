/**
 * Performance optimization utilities for scroll and animations
 * Ensures 60fps smooth scrolling and animations
 */

/**
 * Cubic bezier easing functions optimized for smooth motion
 */
export const easing = {
  // Smooth deceleration
  easeOut: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  // Smooth acceleration then deceleration
  easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
  // Custom smooth curve close to expo
  smoothExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  // Fastest smooth curve
  snappy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

/**
 * Performance-optimized animation config for Framer Motion
 * Uses GPU acceleration and 60fps target
 */
export const motionConfig = {
  // Smooth scroll reveal animations
  scrollReveal: {
    type: "tween",
    duration: 0.8,
    ease: "easeOut",
    // Use transform instead of top/left for GPU acceleration
  },
  // Subtle entrance animations
  fadeIn: {
    type: "spring",
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
  // Snappy hover effects
  hover: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 1,
  },
};

/**
 * Debounce function for scroll events
 * Prevents excessive callback firing during scroll
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Request animation frame debounce
 * For performance-critical operations that should sync with repaint
 */
export const rafDebounce = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null;

  return function (...args: Parameters<T>) {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => func(...args));
  };
};

/**
 * GPU acceleration styles
 * Apply to elements that will be animated frequently
 */
export const gpuAcceleration = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  perspective: 1000,
} as const;

/**
 * Optimized transition styles for smooth animations
 * Use transform and opacity for best performance
 */
export const optimizedTransition = {
  transform: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  opacity: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
} as const;
