import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://govbins.uk",
  build: { format: "directory" },
  trailingSlash: "ignore",
});
