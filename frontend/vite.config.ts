import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEFAULT_PORT = "3001";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT || DEFAULT_PORT),
    },
    preview: {
      port: parseInt(env.VITE_PORT || DEFAULT_PORT),
    },
  };
});
