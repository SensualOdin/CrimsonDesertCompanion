/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          ring: "hsl(var(--sidebar-ring))",
        },
        tip: "hsl(var(--tip))",
        warning: "hsl(var(--warning))",
        location: "hsl(var(--location))",
        stat: "hsl(var(--stat))",
        crimson: {
          DEFAULT: "hsl(var(--crimson))",
          dark: "hsl(var(--crimson-dark))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          light: "hsl(var(--gold-light))",
          muted: "hsl(var(--gold-muted))",
        },
        bark: {
          DEFAULT: "hsl(var(--bark))",
          deep: "hsl(var(--bark-deep))",
          light: "hsl(var(--bark-light))",
        },
        parchment: {
          DEFAULT: "hsl(var(--parchment))",
          light: "hsl(var(--parchment-light))",
          warm: "hsl(var(--parchment-warm))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          light: "hsl(var(--ink-light))",
          faded: "hsl(var(--ink-faded))",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Alegreya'", "Georgia", "serif"],
        sans: ["'Alegreya Sans'", "system-ui", "sans-serif"],
      },
      keyframes: {
        "hl-flash": {
          "0%, 100%": { background: "inherit" },
          "50%": { background: "rgba(184,134,11,.18)", borderLeftColor: "#b8860b" },
        },
      },
      animation: {
        "hl-flash": "hl-flash 0.7s ease 2",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
