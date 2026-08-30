/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b10",
        panel: "#14141c",
        fg: "#f2f2ed",
        muted: "#9d9da8",
        line: "rgba(242, 242, 237, 0.1)",
        accent: "#cbff4d",
        violet: "#8d7bff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
