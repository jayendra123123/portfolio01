import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useLenis();

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
      <Skills />
      <Contact />
    </div>
  );
};

export default Index;
