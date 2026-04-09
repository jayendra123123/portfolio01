import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    title: "Food Donation Platform",
    description:
      "Full-stack platform connecting food donors with NGOs. Role-based donation lifecycle (Available → Claimed → Picked Up → Completed). MongoDB geospatial indexing for 20km radius search, Firebase Cloud Messaging, and Google Maps integration.",
    tags: ["MERN", "MongoDB Geospatial", "Firebase", "Google Maps"],
    link: "#",
  },
  {
    title: "Plant Disease Identifier",
    description:
      "AI-powered web app detecting plant diseases from uploaded images using Gemini API. Three-step workflow (upload → analyze → diagnose) reducing manual inspection by 40%. CI/CD via GitHub Actions, deployed on Vercel with 99% uptime.",
    tags: ["React", "Gemini API", "CI/CD", "Vercel"],
    link: "#",
  },
  {
    title: "Movie Meter",
    description:
      "Full-stack movie discovery platform with scalable REST API architecture. TMDB API integration with optimized search, pagination, debounced input, and client-side caching reducing API requests by 45%.",
    tags: ["React", "Node.js", "Express", "MongoDB", "TMDB API"],
    link: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-12" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 150} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
              <Card className="bg-card border-border hover:border-primary/40 transition-colors group h-full">
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors text-lg">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
