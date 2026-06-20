"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Download, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import SectionIntro from "@/components/ui/SectionIntro";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzjpkbq";
const NEEDS_SETUP = FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (NEEDS_SETUP) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const form = e.currentTarget;
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      {/* fade to deep black */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-obsidian to-obsidian" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            The Recommendation
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tightest text-white md:text-6xl">
            Hire someone who turns data into{" "}
            <span className="text-gradient-emerald">dollars and decisions.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
            I&apos;m looking for Data &amp; Business Analyst roles where messy data
            meets real business stakes. Let&apos;s talk about yours.
          </p>
          <SectionIntro
            plain="Liked what you saw? Drop me a line below or grab my resume — I reply quickly and I'd love to hear what you're working on."
            technical="Reach out via the form (wired to Formspree) or the direct channels below — email, LinkedIn, GitHub, and a downloadable resume."
            center
            className="mt-6"
          />
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — direct lines */}
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="glass group flex items-center gap-4 rounded-3xl p-5 transition-transform hover:scale-[1.01]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-indigo/20">
                <Mail className="h-5 w-5 text-accent-indigo" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/40">Email</div>
                <div className="truncate font-medium text-white">{personalInfo.email}</div>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="glass flex items-center gap-4 rounded-3xl p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-cyan/20">
                <MapPin className="h-5 w-5 text-accent-cyan" />
              </div>
              <div>
                <div className="text-xs text-white/40">Based in</div>
                <div className="font-medium text-white">{personalInfo.location} · Open to relocation</div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex flex-1 items-center justify-center gap-2 rounded-3xl p-4 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex flex-1 items-center justify-center gap-2 rounded-3xl p-4 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex flex-1 items-center justify-center gap-2 rounded-3xl p-4 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <Download className="h-4 w-4 text-accent-emerald" /> Resume
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="glass rounded-[32px] p-6 md:p-8">
            {status === "success" ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-accent-emerald" />
                <h3 className="mt-4 font-display text-xl font-bold text-white">Message sent</h3>
                <p className="mt-2 text-sm text-white/55">
                  Thanks for reaching out — I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Jane Doe" required />
                  <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-medium text-white/45">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="What problem are you trying to solve with data?"
                    className="glass-soft w-full resize-none rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.01] disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="mt-3 text-center text-xs text-[#ff8a8a]">
                    {NEEDS_SETUP
                      ? "Contact form needs a Formspree endpoint — add your form ID in ContactSection.tsx (or just email me directly above)."
                      : "Something went wrong. Please email me directly instead."}
                  </p>
                )}
              </>
            )}
          </form>
        </div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/35 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-accent-indigo to-accent-cyan" />
            <span>Engineered with intention — {personalInfo.name}</span>
          </div>
          <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/45">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="glass-soft w-full rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent-blue"
      />
    </div>
  );
}
