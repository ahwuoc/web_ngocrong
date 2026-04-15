import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff8c00",
        secondary: "#1e293b",
        accent: "#5865f2",
        game: {
          border: "#222222",
          gold: {
            light: "#fcf6ba",
            dark: "#b38728",
          },
          purple: "#d597fa",
          blue: "#90cdf4",
          cyan: "#42e4f5",
          red: "#ff6b6b",
          orange: "#ff6b35",
        },
        glass: {
          DEFAULT: "rgba(13, 19, 28, 0.85)",
          border: "rgba(255, 255, 255, 0.12)",
        }
      },
      fontFamily: {
        bangers: ["Bangers", "cursive"],
        avengeance: ["Avengeance", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 15px rgba(255, 140, 0, 0.4)",
        "gold-heavy": "0 0 30px rgba(255, 140, 0, 0.6)",
        game: "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        game: "3px",
      },
      borderRadius: {
        game: "16px",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
        "game-bg": "url('/assets/frontend/home/v1/images/bg-content.jpg')",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
