/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [""JetBrains Mono"", ""Fira Code"", "Consolas", "Monaco", ""Courier New"", "monospace"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "scan": "scan 15s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "terminal-glow": "0 0 20px rgba(122, 162, 247, 0.3)",
        "terminal-glow-lg": "0 0 30px rgba(122, 162, 247, 0.4), 0 0 50px rgba(122, 162, 247, 0.2)",
      },
      colors: {
        "terminal-blue": "#7aa2f7",
        "terminal-cyan": "#7dcfff",
        "terminal-green": "#9ece6a",
        "terminal-yellow": "#e0af68",
        "terminal-orange": "#ff9e64",
        "terminal-red": "#f7768e",
        "terminal-magenta": "#bb9af7",
        "terminal-purple": "#9d7cd8",
        "terminal-border": "#3b4261",
        "terminal-comment": "#565f89",
        "terminal-bg": "#24283b",
        "terminal-bg-dark": "#1a1b26",
        "terminal-bg-darker": "#16161e",
        "terminal-fg": "#c0caf5",
        "terminal-fg-dark": "#a9b1d6",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    styled: true,
    base: true,
    utils: true,
    logs: false,
  },
}
