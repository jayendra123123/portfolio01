import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let raf: number;

    const raf_callback = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(raf_callback);
    };

    raf = requestAnimationFrame(raf_callback);

    // Prevent body scroll during Lenis operation
    const preventScroll = (e: Event) => {
      // Allow native scroll events
    };

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("scroll", preventScroll);
    };
  }, []);
};
