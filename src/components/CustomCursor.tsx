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

  const rafRef = useRef<number | null>(null);
  const latestPosRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      latestPosRef.current.x = e.clientX - 8;
      latestPosRef.current.y = e.clientY - 8;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        rawX.set(latestPosRef.current.x);
        rawY.set(latestPosRef.current.y);
      });
    },
    [rawX, rawY]
  );

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
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
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
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "50%",
        zIndex: 9999,
        willChange: "transform",
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
