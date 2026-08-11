import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

function adminApiPlugin(): Plugin {
  return {
    name: "admin-api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/admin/save-config" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              const configFilePath = path.resolve(__dirname, "src/data/config.ts");

              const content = `/**
 * Configuración global del sitio web de CEPRUNSA
 * Permite controlar estados, números de contacto y visualizaciones desde un solo lugar.
 */
export const siteConfig = ${JSON.stringify(data, null, 2)};
`;
              fs.writeFileSync(configFilePath, content, "utf-8");
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error("Error writing config.ts:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to save config" }));
            }
          });
          return;
        }

        if (req.url === "/api/admin/upload-image" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { targetPath, fileName, base64Data } = JSON.parse(body);
              if (!base64Data) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Missing image data" }));
                return;
              }

              // Extract base64 payload
              const base64Image = base64Data.split(";base64,").pop();
              const buffer = Buffer.from(base64Image, "base64");

              // Determine destination relative to public directory
              // If targetPath is like "/logo-ceprunsa-white.png" -> public/logo-ceprunsa-white.png
              // If targetPath is like "/images/carreras/agronomia-800x260.jpg" -> public/images/carreras/agronomia-800x260.jpg
              let relativePath = targetPath;
              if (!relativePath || relativePath === "custom") {
                relativePath = "/" + fileName;
              }

              // Remove leading slash if present
              const cleanPath = relativePath.startsWith("/") ? relativePath.substring(1) : relativePath;
              const destPath = path.resolve(__dirname, "public", cleanPath);

              // Ensure directory exists
              const dir = path.dirname(destPath);
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }

              fs.writeFileSync(destPath, buffer);
              console.log(`[Admin Plugin] Saved image to public/${cleanPath}`);

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, publicUrl: relativePath }));
            } catch (err) {
              console.error("Error writing image to public:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to save image" }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
