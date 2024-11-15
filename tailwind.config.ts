import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
      },
      animation: {
        'gradient-1': 'gradient1 15s ease infinite',
        'gradient-2': 'gradient2 15s ease infinite',
        'gradient-3': 'gradient3 15s ease infinite',
      },
      keyframes: {
        gradient1: {
          '0%, 100%': { 
            transform: 'translate(-50%, 0%) scale(1)',
          },
          '50%': { 
            transform: 'translate(-50%, 10%) scale(1.1)',
          },
        },
        gradient2: {
          '0%, 100%': { 
            transform: 'translate(0%, 0%) scale(1)',
          },
          '50%': { 
            transform: 'translate(10%, -10%) scale(0.95)',
          },
        },
        gradient3: {
          '0%, 100%': { 
            transform: 'translate(0%, 0%) scale(1)',
          },
          '50%': { 
            transform: 'translate(-10%, 10%) scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
