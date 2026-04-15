import React, { Suspense } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import "./styles/ParallaxImage.css";
import "./styles/Hero.css";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-hero-bg" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
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
            I build things that work.
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

        {/* Right Avatar - Only visible on larger screens */}
        {/* <div
          className="hero-avatar-wrapper pointer-events-auto opacity-0 animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <ParallaxImage 
            src="/images/person.png"
            alt="Jayendra - Full Stack Developer"
            speed={1}
            className="hero-avatar"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
