import ScrollReveal from "@/components/ScrollReveal";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Food Donation Platform",
    description:
      "Full-stack platform connecting food donors with NGOs. Role-based donation lifecycle with MongoDB geospatial indexing for 20km radius search.",
    tags: ["MERN", "MongoDB", "Firebase", "Google Maps"],
    github: "https://github.com/jayendra123123",
    liveLink: "https://github.com",
    image: "/images/leftover_to_lifeline.png",
  },
  {
    title: "Plant Disease Identifier",
    description:
      "AI-powered web app detecting plant diseases from uploaded images using Gemini API. Three-step workflow reducing manual inspection by 40%.",
    tags: ["React", "Gemini API", "CI/CD", "Vercel"],
    github: "https://github.com/jayendra123123",
    liveLink: "https://github.com",
    image: "/images/plant_disease_detection.png",
  },
  {
    title: "Movie Meter",
    description:
      "Full-stack movie discovery platform with scalable REST API. TMDB integration with optimized search and client-side caching reducing API requests by 45%.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/jayendra123123",
    liveLink: "https://github.com",
    image: "/images/movie-review.png",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="clip">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
            Featured <span className="text-primary italic font-light">Works</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-16" />
        </ScrollReveal>

        <div className="space-y-20">
          {projects.map((project, i) => (
            <ScrollReveal 
              key={project.title} 
              delay={i * 150} 
              direction={i % 2 === 0 ? "left" : "right"}
              variant="slide"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image/Visual Section */}
                <div className={`relative group cursor-pointer ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div
                    className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <ArrowUpRight className="w-12 h-12 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">View Project</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="md:pr-4">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors group">
                        {project.title}
                        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </h3>
                    </a>

                    <p className="text-muted-foreground text-base font-light leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:border-primary hover:text-primary transition-colors font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group font-medium"
                      >
                        <Github size={18} />
                        <span className="group-hover:underline">GitHub</span>
                      </a>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group font-medium"
                      >
                        <ExternalLink size={18} />
                        <span className="group-hover:underline">Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
