import { useEffect, useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Parallax intensity. 1 = default, 0.5 = subtle, 1.5 = stronger */
  speed?: number;
  /** GSAP-compatible strings kept for API compatibility (limited parsing). */
  startTrigger?: string;
  /** GSAP-compatible strings kept for API compatibility (limited parsing). */
  endTrigger?: string;
  className?: string;
}

type TriggerPoint = "top" | "center" | "bottom";

type ParsedTrigger = {
  element: TriggerPoint;
  viewport: TriggerPoint;
};

const parseTrigger = (value: string | undefined, fallback: ParsedTrigger): ParsedTrigger => {
  if (!value) return fallback;
  const [elementRaw, viewportRaw] = value.trim().toLowerCase().split(/\s+/);

  const toPoint = (v: string | undefined): TriggerPoint | null => {
    if (v === "top" || v === "center" || v === "bottom") return v;
    return null;
  };

  const element = toPoint(elementRaw) ?? fallback.element;
  const viewport = toPoint(viewportRaw) ?? fallback.viewport;
  return { element, viewport };
};

const elementOffset = (point: TriggerPoint, rect: DOMRect): number => {
  switch (point) {
    case "top":
      return 0;
    case "center":
      return rect.height / 2;
    case "bottom":
      return rect.height;
  }
};

const viewportCoord = (point: TriggerPoint, viewportHeight: number): number => {
  switch (point) {
    case "top":
      return 0;
    case "center":
      return viewportHeight / 2;
    case "bottom":
      return viewportHeight;
  }
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Lightweight parallax image.
 * - No ScrollTrigger / no per-scroll React state updates
 * - Uses passive scroll listeners + requestAnimationFrame
 * - Runs only while near the viewport via IntersectionObserver
 */
export const ParallaxImage = ({
  src,
  alt,
  speed = 1,
  className = "",
  startTrigger,
  endTrigger,
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Respect reduced-motion and avoid running continuous scroll work.
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) return;

    const start = parseTrigger(startTrigger, { element: "top", viewport: "center" });
    const end = parseTrigger(endTrigger, { element: "bottom", viewport: "center" });

    let rafId: number | null = null;
    let ticking = false;
    let listening = false;

    const update = () => {
      ticking = false;

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      const startTop = viewportCoord(start.viewport, vh) - elementOffset(start.element, rect);
      const endTop = viewportCoord(end.viewport, vh) - elementOffset(end.element, rect);
      const denom = startTop - endTop;

      // Progress from start alignment (0) to end alignment (1).
      const progress = denom === 0 ? 0 : clamp01((startTop - rect.top) / denom);
      const y = -150 * speed * progress;

      image.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    const onScroll = () => requestUpdate();
    const onResize = () => requestUpdate();

    const startListening = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      requestUpdate();
    };

    const stopListening = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      ticking = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startListening();
        else stopListening();
      },
      {
        root: null,
        threshold: 0,
        // Start tracking a bit before entering the viewport.
        rootMargin: "200px 0px 200px 0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      stopListening();
    };
  }, [speed, startTrigger, endTrigger]);

  return (
    <div ref={containerRef} className={`parallax-avatar-container ${className}`.trim()}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="parallax-avatar-image"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ParallaxImage;
