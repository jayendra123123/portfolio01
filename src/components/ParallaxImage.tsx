import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  startTrigger?: string;
  endTrigger?: string;
  className?: string;
}

/**
 * Parallax Avatar Component
 * Image moves UP as user scrolls DOWN with smooth scrubbing effect
 */
export const ParallaxImage = ({
  src,
  alt,
  speed = 1,
  startTrigger = "top center",
  endTrigger = "bottom center",
  className = "",
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    scrollTriggerRef.current?.kill();

    gsap.to(image, {
      scrollTrigger: {
        trigger: container,
        start: startTrigger,
        end: endTrigger,
        scrub: 1,
        markers: false,
      },
      y: -150 * speed,
      ease: "none",
      overwrite: "auto",
    });

    return () => {
      gsap.killTweensOf(image);
      scrollTriggerRef.current?.kill();
    };
  }, [speed, startTrigger, endTrigger]);

  return (
    <div
      ref={containerRef}
      className={`parallax-avatar-container ${className}`}
      style={{
        width: "100%",
        height: "auto",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="parallax-avatar-image"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
    </div>
  );
};

export default ParallaxImage;
