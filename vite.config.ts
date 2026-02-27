import path from "path";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/task-manager-react-client/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.ts",
    globals: true,
  },
});
