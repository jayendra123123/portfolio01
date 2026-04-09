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
  const { ref, isVisible } = useScrollReveal(0.1);

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
      };
    }
    if (variant === "slide") {
      const translate =
        direction === "up"
          ? "translateY(60px)"
          : direction === "left"
          ? "translateX(60px)"
          : "translateX(-60px)";
      return { transform: translate, opacity: 0 };
    }
    // fade (default)
    const translate =
      direction === "up"
        ? "translateY(30px)"
        : direction === "left"
        ? "translateX(30px)"
        : "translateX(-30px)";
    return { transform: translate, opacity: 0, filter: "blur(2px)" };
  };

  const getVisibleStyles = (): React.CSSProperties => {
    if (variant === "clip") {
      return { clipPath: "inset(0 0 0 0)", opacity: 1 };
    }
    return { transform: "translate(0)", opacity: 1, filter: "blur(0)" };
  };

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-[cubic-bezier(0.16,1,0.3,1)]", className)}
      style={{
        ...(isVisible ? getVisibleStyles() : getHiddenStyles()),
        transitionDuration: variant === "clip" ? "1s" : "0.8s",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
