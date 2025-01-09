/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",  // Custom background color
        foreground: "var(--foreground)",  // Custom foreground color
        // Fallbacks or additional colors
        black: "#171717",
        white: "#ffffff",
        gray: {
          100: "#f0f0f0",
          200: "#e0e0e0",
          500: "#a0a0a0",
          900: "#171717",  // Dark Gray for stronger text
        },
      },
    },
  },
  plugins: [],
};