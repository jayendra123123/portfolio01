import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"text" | "counter" | "reveal" | "done">("text");
  const [count, setCount] = useState(0);

  // Phase 1: Show text lines with stagger
  useEffect(() => {
    const timer = setTimeout(() => setPhase("counter"), 800);
    return () => clearTimeout(timer);
  }, []);

  // Phase 2: Count up
  useEffect(() => {
    if (phase !== "counter") return;
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const inc = prev < 40 ? 4 : prev < 80 ? 3 : 2;
        return Math.min(prev + inc, 100);
      });
    }, 25);
    return () => clearInterval(interval);
  }, [phase]);

  // Phase 3: Reveal out
  useEffect(() => {
    if (count === 100) {
      setTimeout(() => setPhase("reveal"), 400);
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1400);
    }
  }, [count, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-hero-bg flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "reveal"
          ? "clip-path-reveal-out"
          : ""
      }`}
      style={
        phase === "reveal"
          ? { clipPath: "inset(0 0 100% 0)" }
          : { clipPath: "inset(0 0 0% 0)" }
      }
    >
      {/* Top label */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <p
          className="text-muted-foreground/50 text-[10px] tracking-[0.4em] uppercase overflow-hidden"
        >
          <span
            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: phase === "text" && count === 0 ? "translateY(100%)" : "translateY(0)",
              opacity: phase === "text" && count === 0 ? 0 : 1,
              transitionDelay: "0.1s",
            }}
          >
            DEVELOPER PORTFOLIO · 2026
          </span>
        </p>
      </div>

      {/* Center name */}
      <div className="flex flex-col items-center gap-2">
        <div className="overflow-hidden">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-foreground uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: phase === "text" && count === 0 ? "translateY(110%)" : "translateY(0)",
              opacity: phase === "text" && count === 0 ? 0 : 1,
              transitionDelay: "0.2s",
            }}
          >
            M <span className="text-primary italic font-light">Jayendra</span>
          </h1>
        </div>

        <div className="overflow-hidden">
          <p
            className="text-muted-foreground text-sm md:text-base tracking-[0.2em] uppercase font-light transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: phase === "text" && count === 0 ? "translateY(110%)" : "translateY(0)",
              opacity: phase === "text" && count === 0 ? 0 : 1,
              transitionDelay: "0.35s",
            }}
          >
            Full Stack Developer
          </p>
        </div>
      </div>

      {/* Bottom counter */}
      <div className="absolute bottom-8 right-10">
        <span className="text-foreground/30 text-7xl md:text-9xl font-bold tabular-nums tracking-tight">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/30">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
