import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#02114f",
          50: "#e8eaf3",
          100: "#c5cade",
          200: "#9ea7c8",
          300: "#7784b2",
          400: "#5968a2",
          500: "#3b4d91",
          600: "#2e3f80",
          700: "#1f2f6d",
          800: "#12205a",
          900: "#02114f",
          950: "#010b38",
        },
        accent: {
          orange: "#f97316",
          green: "#22c55e",
          teal: "#14b8a6",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
        sidebar: "4px 0 24px rgba(2,17,79,0.15)",
      },
      animation: {
        "slide-in": "slideIn 0.2s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
