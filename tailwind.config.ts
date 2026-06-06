import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050706",
        graphite: "#111615",
        steel: "#1b2423",
        stone: "#b9b1a4",
        parchment: "#f3eee4",
        cyan: "#38bdf8",
        amber: "#d89a3a",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 60px rgba(56, 189, 248, 0.14)",
        amber: "0 0 44px rgba(216, 154, 58, 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
