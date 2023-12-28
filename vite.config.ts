import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  return {
    build: {
      outDir:
        "../oral-health-indices-monitoring-system-backend/App.API/wwwroot",
    },
    server: {
      port: 3000,
    },
    plugins: [react()],
  };
});
