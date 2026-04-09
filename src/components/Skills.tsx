const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Languages",
    skills: ["C++", "Python", "Java"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "Vercel", "Postman", "VS Code"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">
          Tech <span className="text-primary">Stack</span>
        </h2>
        <div className="w-16 h-1 bg-primary mb-12" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-sm bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
