import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:jayendramalla26@gmail.com",
      icon: Mail,
    },
    {
      name: "GitHub",
      href: "https://github.com/jayendra123123",
      icon: Github,
      external: true,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/jayendra-malla-1a77b6256",
      icon: Linkedin,
      external: true,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      external: true,
    },
  ];

  return (
    <footer id="contact" className="py-20 md:py-24 px-6 md:px-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal variant="clip">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2 uppercase tracking-tight">
            Let's work <span className="text-primary italic font-light">together</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-10" />
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal variant="slide" delay={150}>
          <div className="mb-14">
            <p className="text-muted-foreground text-base font-light mb-6">
              I'm open to opportunities, collaborations, and interesting projects.
              Feel free to reach out!
            </p>
            <a
              href="mailto:jayendramalla26@gmail.com"
              className="text-foreground text-lg md:text-xl font-bold hover:text-primary transition-colors inline-flex items-center gap-2 group"
            >
              jayendramalla26@gmail.com
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Social Links */}
        <ScrollReveal variant="fade" delay={300}>
          <div className="mb-12">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
              Socials
            </h3>
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="h-px bg-border/50 my-12" />

        {/* Footer Bottom */}
        <ScrollReveal variant="fade" delay={400}>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground/60 text-xs font-light">
              © {currentYear} M Jayendra. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 text-xs font-light">
              Built with React & TypeScript
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Contact;
