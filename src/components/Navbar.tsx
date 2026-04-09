import { Button } from "@/components/ui/button";

const navLinks = ["About", "Projects", "Experience", "Skills", "Contact"];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
      <a href="#" className="text-foreground text-xl font-semibold tracking-tight">
        JAYENDRA
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
          >
            {link}
          </a>
        ))}
      </div>

      <Button
        variant="navCta"
        size="lg"
        className="hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6"
        asChild
      >
        <a href="mailto:jayendramalla26@gmail.com">Get in Touch</a>
      </Button>
    </nav>
  );
};

export default Navbar;
