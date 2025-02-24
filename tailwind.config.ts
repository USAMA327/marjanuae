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
  
        'md': '800px',
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
        secondary:"var(--secondary)"
        
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
