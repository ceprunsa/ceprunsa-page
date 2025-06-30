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

        // Colores principales basados en el logo CEPRUNSA
        primary: {
          DEFAULT: "#1D2240", // Azul marino del logo
          foreground: "#ffffff",
          50: "#f8f9fb",
          100: "#f1f3f7",
          200: "#e3e7ef",
          300: "#d1d7e3",
          400: "#9ca6c0",
          500: "#1D2240", // Color principal del logo
          600: "#1a1e39",
          700: "#171a32",
          800: "#14162b",
          900: "#0f1120",
          950: "#0a0c18",
        },

        // Rojo granate del logo como color de acento
        accent: {
          DEFAULT: "#601020", // Paleta sugerida - rojo granate
          foreground: "#ffffff",
          50: "#fef2f4",
          100: "#fde2e7",
          200: "#fbc9d4",
          300: "#f7a3b4",
          400: "#f06d8a",
          500: "#e53e64",
          600: "#d12651",
          700: "#b01a42",
          800: "#94173d",
          900: "#601020", // Color sugerido
          950: "#4a0c19",
        },

        // Grises neutros basados en la paleta sugerida
        secondary: {
          DEFAULT: "#9F9797", // Gris de la paleta sugerida
          foreground: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#9F9797", // Color sugerido
          600: "#737373",
          700: "#525252",
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
          DEFAULT: "#590F23", // Rojo oscuro del logo
          light: "#731436", // Rojo medio del logo
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
        soft: "0 2px 15px -3px rgba(29, 34, 64, 0.07), 0 10px 20px -2px rgba(29, 34, 64, 0.04)",
        medium:
          "0 4px 25px -5px rgba(29, 34, 64, 0.1), 0 10px 10px -5px rgba(29, 34, 64, 0.04)",
        large:
          "0 10px 40px -10px rgba(29, 34, 64, 0.15), 0 20px 25px -5px rgba(29, 34, 64, 0.1)",
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
