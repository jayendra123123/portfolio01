import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal variant="clip">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
            Let's <span className="text-primary italic font-light">Connect</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-8 mx-auto" />
        </ScrollReveal>
        <ScrollReveal variant="slide" delay={150}>
          <p className="text-muted-foreground text-lg font-light mb-10 max-w-xl mx-auto">
            I'm open to opportunities, collaborations, and interesting projects.
            Feel free to reach out!
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={300}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:jayendramalla26@gmail.com"
              className="bg-primary text-primary-foreground px-8 py-3 text-sm font-bold rounded-sm hover:brightness-110 transition-all active:scale-[0.97]"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/jayendra-malla-1a77b6256"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-8 py-3 text-sm font-bold rounded-sm hover:brightness-110 transition-all active:scale-[0.97]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jayendra123123"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-8 py-3 text-sm font-bold rounded-sm hover:brightness-110 transition-all active:scale-[0.97]"
            >
              GitHub
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={400}>
          <p className="text-muted-foreground/40 text-xs mt-16">
            © 2026 M Jayendra. Built with React & TypeScript.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
