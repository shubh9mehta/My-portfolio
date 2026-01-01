import { useEffect, useMemo, useState } from "react";
import { Database } from "lucide-react";

const Navbar = () => {
  const navItems = useMemo(() => ["Work", "Skills", "Projects", "Contact"], []);
  const sectionIds = useMemo(() => navItems.map((i) => i.toLowerCase()), [navItems]);

  const [activeSection, setActiveSection] = useState("work");

  useEffect(() => {
    const NAV_OFFSET = 96; // adjust if your navbar height changes

    const getActive = () => {
      // Find first section whose top is above the navbar and whose bottom is below it
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top - NAV_OFFSET;
        const bottom = rect.bottom - NAV_OFFSET;

        if (top <= 0 && bottom > 0) return id;
      }

      // Edge case: if you're above the first section, default to first
      return sectionIds[0];
    };

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = getActive();
        setActiveSection((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };

    // Run once on load
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#work" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Database className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-semibold tracking-tight">SM</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <a
                key={item}
                href={`#${id}`}
                className={[
                  "px-3 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-teal-200 bg-teal-500/10 border border-teal-500/25"
                    : "text-slate-400 hover:text-teal-300 hover:bg-slate-800/30",
                ].join(" ")}
              >
                {item}
              </a>
            );
          })}

          <a
            href="#contact"
            className="ml-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-400 hover:bg-teal-500/20 transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button (still placeholder) */}
        <button className="md:hidden p-2 text-slate-400" aria-label="Open menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
