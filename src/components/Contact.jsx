import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
  return (
    <section id="contact" className="relative py-20 md:py-32 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Let’s work together
        </h2>

        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-base sm:text-lg">
          Open to Data Analyst and Business Analyst roles in the US.
          Happy to discuss how I can drive measurable impact for your team.
        </p>

        {/* Contact cards */}
        <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center justify-center gap-2 p-4 bg-slate-800/60 border border-slate-700 rounded-xl hover:border-teal-500/30 transition-all"
          >
            <Mail className="w-5 h-5 text-teal-400" />
            <span className="text-slate-300 text-sm">Email</span>
          </a>

          <a
            href={`tel:${personalInfo.phone}`}
            className="flex items-center justify-center gap-2 p-4 bg-slate-800/60 border border-slate-700 rounded-xl hover:border-cyan-500/30 transition-all"
          >
            <Phone className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300 text-sm">Call</span>
          </a>

          <div className="flex items-center justify-center gap-2 p-4 bg-slate-800/60 border border-slate-700 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300 text-sm">{personalInfo.location}</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href={`mailto:${personalInfo.email}?subject=Job Opportunity`}
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-slate-950 font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Resume download (FORCED FILENAME) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="ShubhMehta_Analyst_Resume.pdf"
            className="w-full sm:w-auto px-8 py-4 border border-slate-700 rounded-xl text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Resume
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-teal-400 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-teal-400 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
