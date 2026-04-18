import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  /**
   * `clip` used to rely on `clip-path` (expensive to animate).
   * It now uses an overflow-hidden wrapper + transform-only animation for 60fps.
   */
  variant?: "fade" | "clip" | "slide";
}

const EASE = "cubic-bezier(0.16,1,0.3,1)";

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  variant = "fade",
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  });

  const distance = variant === "slide" ? 60 : variant === "clip" ? 90 : 30;

  const offset = (() => {
    switch (direction) {
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "up":
      default:
        return { x: 0, y: distance };
    }
  })();

  const animatedStyle: React.CSSProperties = {
    transform: isVisible
      ? "translate3d(0, 0, 0)"
      : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    opacity: isVisible ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: variant === "clip" ? "1000ms" : "800ms",
    transitionTimingFunction: EASE,
    transitionDelay: `${delay}ms`,
    // Only hint compositing while animating in.
    willChange: isVisible ? undefined : ("transform, opacity" as const),
  };

  if (variant === "clip") {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        <div style={animatedStyle}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(className)} style={animatedStyle}>
      {children}
    </div>
  );
};

export default ScrollReveal;
