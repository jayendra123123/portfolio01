import React, { Suspense, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import "./styles/Hero.css";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const HERO_ROLES = [
  "Full Stack Developer",
  "Tech Enthusiast",
  "Problem Solver",
  "Software Engineer",
] as const;

function HeroRoleTypewriter({
  active,
  startDelayMs = 550,
}: {
  active: boolean;
  startDelayMs?: number;
}) {
  const [ready, setReady] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState(HERO_ROLES[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setReady(false);
      setRoleIndex(0);
      setDeleting(false);
      setTyped(HERO_ROLES[0] ?? "");
      return;
    }

    setRoleIndex(0);
    setDeleting(false);
    setTyped("");

    const t = window.setTimeout(() => {
      setReady(true);
    }, startDelayMs);

    return () => {
      window.clearTimeout(t);
    };
  }, [active, startDelayMs]);

  useEffect(() => {
    if (!active || !ready) return;

    const current = HERO_ROLES[roleIndex] ?? "";
    if (!current) return;

    const atFull = typed === current;
    const atEmpty = typed === "";

    const TYPE_MS = 60;
    const DELETE_MS = 40;
    const HOLD_MS = 900;
    const SWITCH_MS = 220;

    const delay = !deleting
      ? atFull
        ? HOLD_MS
        : TYPE_MS
      : atEmpty
        ? SWITCH_MS
        : DELETE_MS;

    const t = window.setTimeout(() => {
      if (!deleting) {
        if (atFull) {
          setDeleting(true);
          return;
        }
        setTyped(current.slice(0, typed.length + 1));
        return;
      }

      if (atEmpty) {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % HERO_ROLES.length);
        return;
      }

      setTyped(current.slice(0, typed.length - 1));
    }, delay);

    return () => {
      window.clearTimeout(t);
    };
  }, [active, ready, roleIndex, typed, deleting]);

  return (
    <span className="inline-flex items-baseline">
      <span aria-hidden="true" className="inline-block whitespace-nowrap align-bottom">
        {typed.length > 0 ? typed : "\u00A0"}
      </span>

      {active ? (
        <span
          aria-hidden="true"
          className="ml-[0.25em] inline-block h-[1.05em] w-[0.1em] rounded-full bg-primary/70 opacity-0 motion-safe:animate-caret-blink motion-reduce:hidden"
          style={{ animationDelay: `${startDelayMs}ms` }}
        />
      ) : null}
    </span>
  );
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [renderSpline, setRenderSpline] = useState(false);

  const splineAppRef = useRef<Application | null>(null);
  const scrollPauseRef = useRef<{ paused: boolean; resumeTimer: number | null }>({
    paused: false,
    resumeTimer: null,
  });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const motionAllowed = () => !(media?.matches ?? false);

    // Start enabled when in view (and motion allowed).
    setRenderSpline(motionAllowed());

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRenderSpline(Boolean(entry?.isIntersecting) && motionAllowed());
      },
      {
        root: null,
        threshold: 0,
        // Keep it mounted slightly before/after the hero is visible.
        rootMargin: "200px 0px 200px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // If Spline is mounted, pause its render loop while the user scrolls.
  // This keeps scrolling + text animations smooth without changing the visual design
  // (the last rendered frame remains on the canvas).
  useEffect(() => {
    if (!renderSpline) {
      // Ensure we don't retain references to disposed runtime instances.
      splineAppRef.current = null;
      if (scrollPauseRef.current.resumeTimer !== null) {
        window.clearTimeout(scrollPauseRef.current.resumeTimer);
        scrollPauseRef.current.resumeTimer = null;
      }
      scrollPauseRef.current.paused = false;
      return;
    }

    const pause = () => {
      const app = splineAppRef.current;
      if (!app) return;
      if (scrollPauseRef.current.paused) return;
      scrollPauseRef.current.paused = true;
      app.stop();
    };

    const resume = () => {
      const app = splineAppRef.current;
      if (!app) return;
      scrollPauseRef.current.paused = false;
      app.play();
    };

    const onScroll = () => {
      pause();

      if (scrollPauseRef.current.resumeTimer !== null) {
        window.clearTimeout(scrollPauseRef.current.resumeTimer);
      }

      // Resume shortly after scrolling stops.
      scrollPauseRef.current.resumeTimer = window.setTimeout(() => {
        scrollPauseRef.current.resumeTimer = null;
        if (document.visibilityState === "hidden") return;
        resume();
      }, 120);
    };

    const onVisibilityChange = () => {
      const app = splineAppRef.current;
      if (!app) return;

      if (document.visibilityState === "hidden") {
        app.stop();
        return;
      }

      // If we're not in the middle of a scroll pause, resume.
      if (!scrollPauseRef.current.paused) {
        app.play();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (scrollPauseRef.current.resumeTimer !== null) {
        window.clearTimeout(scrollPauseRef.current.resumeTimer);
        scrollPauseRef.current.resumeTimer = null;
      }
      scrollPauseRef.current.paused = false;
    };
  }, [renderSpline]);

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-screen flex items-end bg-hero-bg overflow-hidden"
    >
      {/* Spline 3D Background (unmounted when offscreen to avoid constant rAF work) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {renderSpline ? (
          <Suspense fallback={<div className="w-full h-full bg-hero-bg" />}>
            <Spline
              scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
              className="w-full h-full"
              onLoad={(app) => {
                splineAppRef.current = app;
                // Avoid global event listeners since this is decorative.
                app.setGlobalEvents(false);

                // If the page is hidden or we're mid-scroll, keep it paused.
                if (
                  document.visibilityState === "hidden" ||
                  scrollPauseRef.current.paused
                ) {
                  app.stop();
                }
              }}
            />
          </Suspense>
        ) : (
          <div className="w-full h-full bg-hero-bg" />
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-hero-bg via-hero-bg/60 to-transparent" />

      {/* Content Wrapper - Flex layout for left text and right image */}
      <div className="hero-content-wrapper">
        {/* Left Content */}
        <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-lg px-6 md:px-10 pb-10 md:pb-10 pt-32">
          <h1
            className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            JAYENDRA<span className="text-primary"> DEV</span>
          </h1>

          <p
            className="text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="sr-only">{HERO_ROLES.join(", ")}</span>
            <HeroRoleTypewriter active={renderSpline} startDelayMs={550} />
          </p>

          <p
            className="text-muted-foreground text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            Full-stack MERN developer crafting scalable web apps with AI integration,
            role-based architectures, and clean APIs. From concept to deployment — done right.
          </p>

          <div
            className="flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            <a
              href="mailto:jayendramalla26@gmail.com"
              className="pointer-events-auto bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97]"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="pointer-events-auto bg-foreground text-background px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-90 transition-all active:scale-[0.97]"
            >
              My Work
            </a>
          </div>

          <p
            className="text-muted-foreground/60 text-xs font-light mt-4 md:mt-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.85s" }}
          >
            LeetCode 1600+ · 400+ problems solved · MERN Stack · AI Integration
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
