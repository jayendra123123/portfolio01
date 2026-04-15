import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor: React.FC = () => {
  // Motion values to track raw mouse coordinates
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-animated values for smooth trailing effect
  const springX = useSpring(rawX, {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  });
  const springY = useSpring(rawY, {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  });

  // State to track if hovering over clickable elements
  const [isHovering, setIsHovering] = useState(false);
  const hoveringRef = useRef(false);

  // Memoized mouse move handler with requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX - 8);
    rawY.set(e.clientY - 8);
  }, [rawX, rawY]);

  // Optimized hover detection using event delegation
  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.classList.contains("clickable");

    if (isClickable && !hoveringRef.current) {
      hoveringRef.current = true;
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.classList.contains("clickable");

    if (isClickable && hoveringRef.current) {
      hoveringRef.current = false;
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    // Add event listeners with passive flag for better performance
    const options = { passive: true };
    window.addEventListener("mousemove", handleMouseMove, options);
    document.addEventListener("mouseenter", handleMouseEnter, {
      capture: true,
      ...options,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      capture: true,
      ...options,
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0"
      style={{
        x: springX,
        y: springY,
        width: "16px",
        height: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        mixBlendMode: "screen",
        zIndex: 9999,
        boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: 1000,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
    />
  );
};

export default CustomCursor;
