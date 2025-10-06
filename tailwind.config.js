/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbf9",
          100: "#e6f6f1",
          200: "#c7ebe0",
          300: "#9edbcc",
          400: "#69c4b0",
          500: "#3da792", // primary
          600: "#2d8877",
          700: "#276e62",
          800: "#235951",
          900: "#1f4a43",
        },
      },
    },
  },
  plugins: [],
};
