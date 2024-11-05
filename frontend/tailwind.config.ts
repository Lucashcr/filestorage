import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#5F26C5",
        accent: "#7F46E5",
        secondary: "#5B2777",
        success: "#059669",
        error: "#DC6060",
        info: "#5593EB",
        warning: "#DAB84C",
      },
    },
  },
  plugins: [],
};
export default config;
