"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import StakeholderToggle from "@/components/ui/StakeholderToggle";

const navItems = [
  { label: "Impact", href: "#hero" },
  { label: "Process", href: "#flagship" },
  { label: "Playground", href: "#playground" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function GlassNav() {
  const { scrollTo } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (href: string) => {
    setMobileOpen(false);
    scrollTo(href, { offset: -20 });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => go("#hero")}
            className="flex items-center gap-2.5"
            aria-label="Shubh Mehta — Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-indigo to-accent-cyan shadow-glow-blue">
              <span className="font-display text-sm font-bold text-white">SM</span>
            </div>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-white/80 sm:block">
              Shubh Mehta
            </span>
          </button>

          {/* Center links */}
          <div
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 md:flex ${
              scrolled ? "glass-nav" : ""
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-white/55 transition-colors hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: toggle + CTA + mobile trigger */}
          <div className="flex items-center gap-3">
            <StakeholderToggle className="hidden lg:inline-flex" />
            <button
              onClick={() => go("#contact")}
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03] sm:block"
            >
              Let&apos;s Talk
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="glass-soft rounded-xl p-2 text-white/70 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            <div
              className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -24, scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass absolute inset-x-4 top-4 rounded-[28px] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display font-semibold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="glass-soft rounded-xl p-2 text-white/70"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => go(item.href)}
                    className="glass-soft rounded-2xl px-5 py-4 text-left text-base font-medium text-white"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-5">
                <StakeholderToggle className="w-full justify-center" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
