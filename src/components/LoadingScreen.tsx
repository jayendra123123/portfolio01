import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating progress
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setPhase("reveal"), 300);
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1200);
    }
  }, [progress, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-hero-bg flex flex-col items-center justify-center transition-all duration-700 ${
        phase === "reveal" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-12 overflow-hidden">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-[-0.05em] uppercase"
          style={{
            animation: "loader-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <span className="text-foreground">JAYENDRA</span>
          <span className="text-primary"> DEV</span>
        </h1>
      </div>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-[2px] bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="text-muted-foreground text-xs tracking-[0.3em] mt-4 font-light tabular-nums">
        {progress}%
      </p>
    </div>
  );
};

export default LoadingScreen;
