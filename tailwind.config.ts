import tailwindcssForms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "rgb(239 68 68 / 0.1)",
          "100": "#FF7E7E",
          "200": "#F85E5E",
          "300": "#EF4444",
        },
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F7F7F7",
          "200": "#f9f9f9",
          DEFAULT: "#FFFFFF",
        },
        accent: "var(--accent)",
        card: "var(--bg-card)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [tailwindcssForms],
} satisfies Config;
