"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/types";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import TaxiDashboard from "./TaxiDashboard";
import SalesDashboard from "./SalesDashboard";
import ChurnDashboard from "./ChurnDashboard";
import CkdDashboard from "./CkdDashboard";

function DashboardFor({ id }: { id: Project["id"] }) {
  switch (id) {
    case "taxi":
      return <TaxiDashboard />;
    case "sales":
      return <SalesDashboard />;
    case "churn":
      return <ChurnDashboard />;
    case "ckd":
      return <CkdDashboard />;
  }
}

export default function ProjectDashboardModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { stop, start } = useLenis();

  useEffect(() => {
    stop();
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => {
      start();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [stop, start, onClose]);

  const hasLink = project.link && project.link !== "#";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="glass relative my-auto w-full max-w-3xl rounded-[32px] p-6 md:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">
              {project.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/50">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="glass-soft shrink-0 rounded-xl p-2 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <DashboardFor id={project.id} />

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="glass-soft rounded-lg px-2.5 py-1 text-xs font-medium text-white/60"
            >
              {t}
            </span>
          ))}
          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-obsidian transition-transform hover:scale-[1.03]"
            >
              <Github className="h-3.5 w-3.5" />
              View code
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
