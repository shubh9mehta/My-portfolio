import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep obsidian base
        obsidian: "#020204",
        "obsidian-soft": "#0A0A0C",
        "obsidian-card": "#0E0E12",
        // Accent palette
        accent: {
          blue: "#3B82F6",
          indigo: "#6366F1",
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          emerald: "#10B981",
          amber: "#F59E0B",
        },
      },
      fontFamily: {
        // SF Pro Display via the Apple system stack, Inter as cross-platform fallback
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        kpi: "-0.05em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseRing: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        blink: "blink 1s step-end infinite",
        "pulse-ring": "pulseRing 3s ease-in-out infinite",
      },
      boxShadow: {
        glass:
          "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-hover":
          "0 16px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
        "glow-blue": "0 0 50px rgba(59,130,246,0.25)",
        "glow-emerald": "0 0 50px rgba(16,185,129,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
