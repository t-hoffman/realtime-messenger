/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
  "tailwindCSS.includeLanguages": {
    javascript: "javascript",
    typescript: "typescript",
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
  },
};
