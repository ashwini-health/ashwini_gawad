// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark base
        midnight: {
          50: "#e8e8ef",
          100: "#c5c5d3",
          200: "#9e9eb5",
          300: "#777797",
          400: "#595980",
          500: "#3b3b69",
          600: "#353561",
          700: "#2d2d56",
          800: "#26264c",
          900: "#19193a",
          950: "#0c0c1a",
        },
        // Premium gold accent
        gold: {
          50: "#fdf9ef",
          100: "#f9f0d4",
          200: "#f2dfa5",
          300: "#e8c865",
          400: "#e2b93e",
          500: "#d4a229",
          600: "#bc811e",
          700: "#9c611c",
          800: "#804d1e",
          900: "#6a401c",
          950: "#3d200c",
        },
        // Medical teal
        teal: {
          50: "#effefb",
          100: "#c7fff4",
          200: "#90ffea",
          300: "#51f7dc",
          400: "#1de4ca",
          500: "#05c8b0",
          600: "#00a190",
          700: "#058076",
          800: "#0a655f",
          900: "#0d534e",
          950: "#003332",
        },
        // Danger/urgency
        danger: {
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        // Neutral
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "serif"],
        heading: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(232, 200, 101, 0.15)" },
          "100%": { boxShadow: "0 0 40px rgba(232, 200, 101, 0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [typography],
};

export default config;
