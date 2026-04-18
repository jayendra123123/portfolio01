import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="clip" direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
            About <span className="text-primary italic font-light">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-8" />
        </ScrollReveal>

        {/* Responsive layout
            - Mobile: stack (text first)
            - Desktop: 2 columns with image on the left
            - Image height matches the text column height (no fixed heights)
        */}
        <div className="flex flex-col lg:flex-row lg:gap-12 gap-10">
          {/* Image (left on desktop) */}
          <div className="order-2 lg:order-1 lg:basis-5/12 lg:shrink-0">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-[4/5] lg:aspect-auto lg:h-full">
              <img
                src="/images/person.png"
                alt="Jayendra - Full Stack Developer"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text (right on desktop) */}
          <div className="order-1 lg:order-2 lg:flex-1">
            <ScrollReveal variant="slide" delay={150}>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                I'm a Full Stack Developer specializing in the MERN stack with a passion for
                building scalable, well-architected web applications. Currently pursuing B.Tech
                in Computer Science at Vignan Institute of Information Technology (CGPA: 8.20/10),
                graduating in 2026.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="slide" delay={300}>
              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                With strong DSA fundamentals (LeetCode 1600+, 400+ problems), I bring analytical
                thinking to every project. I've built platforms with role-based workflows, geospatial
                queries, AI-driven features, and CI/CD pipelines — always focused on doing things right.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
