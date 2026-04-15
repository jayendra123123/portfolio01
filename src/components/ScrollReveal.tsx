import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  variant?: "fade" | "clip" | "slide";
}

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

  const getHiddenStyles = (): React.CSSProperties => {
    if (variant === "clip") {
      return {
        clipPath:
          direction === "up"
            ? "inset(100% 0 0 0)"
            : direction === "left"
            ? "inset(0 100% 0 0)"
            : "inset(0 0 0 100%)",
        opacity: 0,
        willChange: "clip-path, opacity",
      };
    }
    if (variant === "slide") {
      const translate =
        direction === "up"
          ? "translateY(60px)"
          : direction === "left"
          ? "translateX(60px)"
          : "translateX(-60px)";
      return {
        transform: translate,
        opacity: 0,
        willChange: "transform, opacity",
      };
    }
    // fade (default) - removed blur for better performance
    const translate =
      direction === "up"
        ? "translateY(30px)"
        : direction === "left"
        ? "translateX(30px)"
        : "translateX(-30px)";
    return {
      transform: translate,
      opacity: 0,
      willChange: "transform, opacity",
    };
  };

  const getVisibleStyles = (): React.CSSProperties => {
    if (variant === "clip") {
      return { clipPath: "inset(0 0 0 0)", opacity: 1 };
    }
    return { transform: "translate(0)", opacity: 1 };
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
      style={{
        ...(isVisible ? getVisibleStyles() : getHiddenStyles()),
        transitionDuration: variant === "clip" ? "1s" : "0.8s",
        transitionDelay: `${delay}ms`,
        // Enable GPU acceleration
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
