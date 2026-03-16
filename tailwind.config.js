/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["\"JetBrains Mono\"", "\"Fira Code\"", "Consolas", "Monaco", "\"Courier New\"", "monospace"],
      },
      // Note: Animations, keyframes, and shadows are now defined in src/styles/global.css using the @theme block
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,
  },
}
