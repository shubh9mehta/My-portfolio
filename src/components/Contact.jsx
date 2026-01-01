import { Mail, Linkedin, ExternalLink, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-4xl lg:text-5xl font-bold">
          Let’s talk about
          <br />
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            how I can help your team.
          </span>
        </h2>

        {/* Description */}
        <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
          I’m actively exploring Data Analyst and Business Analyst roles in the US.
          If you’re hiring or want to discuss a role, the fastest way to reach me is email.
        </p>

        {/* Primary CTA */}
        <div className="flex items-center justify-center mt-10">
          <a
            href="mailto:shubh9mehta@gmail.com?subject=Data Analyst Opportunity"
            className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-slate-950 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
        </div>

        {/* Secondary actions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <a
            href="https://www.linkedin.com/in/shubh9mehta/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-teal-400 hover:border-teal-500/30 transition-all"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-teal-400 hover:border-teal-500/30 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Resume (PDF)
          </a>
        </div>

        {/* Location (quiet credibility signal) */}
        <div className="flex items-center justify-center gap-2 mt-8 text-slate-500 text-sm">
          <MapPin className="w-4 h-4" />
          <span>United States • Open to relocation</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
