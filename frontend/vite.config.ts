import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEFAULT_PORT = "3001";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: parseInt(env.VITE_PORT || DEFAULT_PORT),
    },
    preview: {
      host: "0.0.0.0",
      port: parseInt(env.VITE_PORT || DEFAULT_PORT),
    },
  };
});
