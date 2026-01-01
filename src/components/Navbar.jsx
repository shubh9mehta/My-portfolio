// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { Database, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavClick = (href) => {
    setOpen(false);
    // Let the menu close first, then jump
    setTimeout(() => {
      window.location.hash = href;
    }, 0);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center">
            <Database className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-semibold tracking-tight">SM</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-slate-400 hover:text-teal-400 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-400 hover:bg-teal-500/20 transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-teal-400 transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay + sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />

          <div className="absolute top-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-200 font-semibold">Menu</span>
              <button
                className="p-2 text-slate-300 hover:text-teal-400 transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 hover:border-teal-500/30 hover:text-teal-300 transition-all"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-200 hover:bg-teal-500/25 transition-all font-semibold"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
