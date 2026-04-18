import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import CurvedSectionConnector from "@/components/CurvedSectionConnector";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <CurvedSectionConnector className="bg-secondary/30" variant="arc" direction="down" bend={0.75} />
      <Skills />
      <CurvedSectionConnector
        className="bg-background"
        variant="arc"
        direction="down"
        bend={0.75}
        fromFill="hsl(var(--secondary) / 0.3)"
      />
      <Contact />
    </div>
  );
};

export default Index;
