/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Paleta institucional UNSA
        primary: {
          DEFAULT: "#1a2855",
          foreground: "#ffffff",
          50: "#f4f6fb",
          100: "#e6eaf4",
          200: "#c9d1e5",
          300: "#a6b2d1",
          400: "#7485b1",
          500: "#3a4875",
          600: "#263865",
          700: "#1a2855",
          800: "#141f43",
          900: "#0f1733",
          950: "#080d1f",
        },

        // Rojo granate del logo como color de acento
        accent: {
          DEFAULT: "#7a1a2b",
          foreground: "#ffffff",
          50: "#fef2f4",
          100: "#fde2e7",
          200: "#fbc9d4",
          300: "#f7a3b4",
          400: "#b85f70",
          500: "#9a3a4b",
          600: "#8a2538",
          700: "#7a1a2b",
          800: "#641522",
          900: "#4f101c",
          950: "#310811",
        },

        // Grises neutros basados en la paleta sugerida
        secondary: {
          DEFAULT: "#888b8d",
          foreground: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#c9cbcc",
          400: "#a8abad",
          500: "#888b8d",
          600: "#64686a",
          700: "#484c4e",
          800: "#404040",
          900: "#262626",
          950: "#171717",
        },

        // Negro para textos y elementos de contraste
        dark: {
          DEFAULT: "#000000", // Negro de la paleta sugerida
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#000000", // Negro puro
        },

        // Colores adicionales del logo para detalles
        burgundy: {
          DEFAULT: "#7a1a2b",
          light: "#9a3a4b",
        },

        // Colores de estado manteniendo la formalidad
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },

        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },

        // Colores de utilidad
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 28px -18px rgba(26, 40, 85, 0.28)",
        medium:
          "0 16px 36px -20px rgba(26, 40, 85, 0.32)",
        large:
          "0 24px 56px -24px rgba(26, 40, 85, 0.38)",
        glow: "0 0 20px rgba(29, 34, 64, 0.15)",
        "glow-red": "0 0 20px rgba(96, 16, 32, 0.15)",
        "glow-accent": "0 0 20px rgba(96, 16, 32, 0.15)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".clip-header": {
          "clip-path": "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
        },
        ".clip-header-reverse": {
          "clip-path": "polygon(5% 0, 100% 0, 100% 100%, 0 100%)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
