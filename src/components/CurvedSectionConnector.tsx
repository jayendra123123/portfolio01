import { useId, useMemo } from "react";

import { cn } from "@/lib/utils";

type CurveVariant = "arc" | "wave";

type CurveDirection = "down" | "up";

export type CurvedSectionConnectorProps = {
  /**
   * Wrapper classes. Typically include the NEXT section background
   * (e.g. `bg-secondary/30`) so the bottom blends into the next section.
   */
  className?: string;

  /** Controls the connector height (responsive by default). */
  heightClassName?: string;

  /** SVG path style. */
  variant?: CurveVariant;

  /** Whether the curve bulges down into the next section or up toward the previous one. */
  direction?: CurveDirection;

  /**
   * 0..1 curvature amount.
   * - 0 = almost flat
   * - 1 = strongest bend (still subtle)
   */
  bend?: number;

  /** Fill color for the previous section background. */
  fromFill?: string;

  /** Draw a subtle accent stroke along the curve. */
  showStroke?: boolean;

  /** Optional one-time stroke draw animation (disabled for reduced-motion). */
  animateStroke?: boolean;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function CurvedSectionConnector({
  className,
  heightClassName = "h-[clamp(2.5rem,6vw,4.75rem)]",
  variant = "arc",
  direction = "down",
  bend = 0.75,
  fromFill = "hsl(var(--background))",
  showStroke = true,
  animateStroke = false,
}: CurvedSectionConnectorProps) {
  const rawId = useId();
  const gradientId = useMemo(() => `curve-grad-${rawId.replace(/:/g, "")}`, [rawId]);

  // Normalized SVG space (0..100). The curve sits at `edgeY` and bends by `amplitude`.
  const edgeY = 62;
  const amplitude = clamp(36 * clamp01(bend), 0, 40);
  const signedAmp = direction === "down" ? amplitude : -amplitude;

  const controlY = clamp(edgeY + signedAmp, 0, 100);

  const fillPath = useMemo(() => {
    if (variant === "wave") {
      const c1y = clamp(edgeY + signedAmp, 0, 100);
      const c2y = clamp(edgeY - signedAmp, 0, 100);

      // Start from top-left, go to top-right, then down to edgeY,
      // then draw two cubic segments back to the left.
      return [
        "M0 0",
        "H100",
        `V${edgeY}`,
        `C87.5 ${c1y} 62.5 ${c2y} 50 ${edgeY}`,
        `C37.5 ${c1y} 12.5 ${c2y} 0 ${edgeY}`,
        "Z",
      ].join(" ");
    }

    // Arc: a single smooth bulge.
    return [
      "M0 0",
      "H100",
      `V${edgeY}`,
      `C75 ${controlY} 25 ${controlY} 0 ${edgeY}`,
      "Z",
    ].join(" ");
  }, [variant, edgeY, signedAmp, controlY]);

  const strokePath = useMemo(() => {
    if (variant === "wave") {
      const c1y = clamp(edgeY + signedAmp, 0, 100);
      const c2y = clamp(edgeY - signedAmp, 0, 100);
      return [
        `M0 ${edgeY}`,
        `C12.5 ${c2y} 37.5 ${c1y} 50 ${edgeY}`,
        `C62.5 ${c2y} 87.5 ${c1y} 100 ${edgeY}`,
      ].join(" ");
    }

    return [`M0 ${edgeY}`, `C25 ${controlY} 75 ${controlY} 100 ${edgeY}`].join(" ");
  }, [variant, edgeY, signedAmp, controlY]);

  return (
    <div
      aria-hidden="true"
      className={cn("w-full overflow-hidden", heightClassName, className)}
    >
      <svg
        className="block h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Previous section fill */}
        <path d={fillPath} fill={fromFill} />

        {/* Accent stroke */}
        {showStroke ? (
          <path
            d={strokePath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            className={cn(
              "opacity-80",
              animateStroke &&
                "[stroke-dasharray:260] [stroke-dashoffset:260] motion-safe:animate-curve-draw motion-reduce:animate-none"
            )}
          />
        ) : null}
      </svg>
    </div>
  );
}
