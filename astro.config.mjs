// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://emjordan.xyz",
  base: "/",
  integrations: [solidJs()],
  vite: {
    plugins: [tailwindcss()]
  }
});
