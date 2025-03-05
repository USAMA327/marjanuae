import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");
export default {
  content: [
    "./src/*.html",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '1300px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#101828",
        brand: {
          25: "#F2F7FF",
          50: "#ECF3FF",
          100: "#DDE9FF",
          200: "#C2D6FF",
          300: "#9CB9FF",
          400: "#7592FF",
          500: "#465FFF",
          600: "#3641F5",
          700: "#2A31D8",
          800: "#252DAE",
          900: "#262E89",
          950: "#161950",
        },
        "blue-light": {
          25: "#F5FBFF",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#B9E6FE",
          300: "#7CD4FD",
          400: "#36BFFA",
          500: "#0BA5EC",
          600: "#0086C9",
          700: "#026AA2",
          800: "#065986",
          900: "#0B4A6F",
          950: "#062C41",
        },
        gray: {
          dark: "#1A2231",
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
          950: "#0C111D",
        },
        orange: {
          25: "#FFFAF5",
          50: "#FFF6ED",
          100: "#FFEAD5",
          200: "#FDDCAB",
          300: "#FEB273",
          400: "#FD853A",
          500: "#FB6514",
          600: "#EC4A0A",
          700: "#C4320A",
          800: "#9C2A10",
          900: "#7E2410",
          950: "#511C10",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
          950: "#053321",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
          950: "#55160C",
        },
        warning: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
          950: "#4E1D09",
        },
        
      },
      backgroundImage: {
        'soft-gray-blue': 'linear-gradient(to right, #F1F1F3, #9CAEB9)',
        'neutral-muted-blue': 'linear-gradient(to right, #C1C1C7, #90A4B9)',
      },
      fontFamily: {
        sans: ["var(--font-sora-sans)", "sans-serif"],
        serif: ["var(--font-el-messiri-sans)", "serif"],
        mono: ["var(--font-sora-mono)", "monospace"],
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
} satisfies Config;
