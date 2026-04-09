import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-8" />
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
            I'm a Full Stack Developer specializing in the MERN stack with a passion for
            building scalable, well-architected web applications. Currently pursuing B.Tech
            in Computer Science at Vignan Institute of Information Technology (CGPA: 8.20/10),
            graduating in 2026.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            With strong DSA fundamentals (LeetCode 1600+, 400+ problems), I bring analytical
            thinking to every project. I've built platforms with role-based workflows, geospatial
            queries, AI-driven features, and CI/CD pipelines — always focused on doing things right.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
