import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/portfolioData';

const ProjectCard = ({ project, index }) => {
  const hasLive = project.link && project.link !== '#';
  const hasGithub = project.github && project.github !== '#';

  return (
    <div
      className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-7 md:p-8 hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Category + Metric */}
        <div className="flex items-start justify-between gap-4">
          <span className="text-teal-400 text-xs font-medium uppercase tracking-wider">
            {project.category}
          </span>

          {project.metric && (
            <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-teal-500/25 bg-teal-500/10 text-teal-300">
              {project.metric}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mt-3 group-hover:text-teal-400 transition-colors">
          {project.title}
        </h3>

        {/* Description (2-line clamp) */}
        <p className="text-slate-400 mt-3 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Highlights (max 3) */}
        <ul className="mt-4 space-y-1">
          {(project.highlights || []).slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="text-slate-500 text-xs flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">•</span>
              {highlight}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(project.tech || []).slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-800/70 border border-slate-700 rounded-lg text-xs text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          {/* Primary CTA */}
          {hasLive && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition-colors"
            >
              View project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}

          {/* Icons */}
          <div className="flex items-center gap-2">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {hasLive && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all"
                aria-label="View live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Clamp utility */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-400 text-sm font-medium uppercase tracking-widest">
            Selected Work
          </span>
          <h2 className="text-4xl font-bold mt-4">Featured Projects</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Fast-to-scan case studies showing how I turn data into decisions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/shubh9mehta/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-xl text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
