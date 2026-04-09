import ScrollReveal from "@/components/ScrollReveal";

const experiences = [
  {
    role: "Full Stack AI Engineer Intern",
    company: "Hirelexa Infotech Pvt. Ltd.",
    period: "Feb 2026 – Present",
    highlights: [
      "Developed role-based HRMS platform using MERN for Admins, HR, Managers, and Clients",
      "Designed 50+ REST APIs for jobs, candidates, and recruitment workflows",
      "Built AI-driven interview features with automated evaluation and pass/fail recommendations",
      "Created AI-powered bulk onboarding system supporting Excel, CSV, JSON, and image inputs",
    ],
  },
  {
    role: "Python Development Trainee",
    company: "TechOctaNet Services Pvt. Ltd.",
    period: "May 2024 – June 2024",
    highlights: [
      "Completed structured Python development training focused on automation scripting",
      "Built multiple mini-projects using modular programming patterns",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="clip">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
            Work <span className="text-primary italic font-light">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-12" />
        </ScrollReveal>

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.role} delay={i * 200} direction="left" variant="slide">
              <div className="border-l-2 border-primary/30 pl-6 relative">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                <h3 className="text-foreground text-xl font-semibold">{exp.role}</h3>
                <p className="text-primary text-sm font-medium mb-1">{exp.company}</p>
                <p className="text-muted-foreground text-xs mb-3">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-muted-foreground text-sm font-light leading-relaxed flex gap-2">
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
