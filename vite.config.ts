import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

function getPublicImages(publicDir: string, currentDir: string = ""): Array<{ name: string; relativePath: string; folder: string; size: number; mtime: number }> {
  let results: Array<{ name: string; relativePath: string; folder: string; size: number; mtime: number }> = [];
  const targetDir = path.join(publicDir, currentDir);
  if (!fs.existsSync(targetDir)) return results;

  const files = fs.readdirSync(targetDir, { withFileTypes: true });
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico", ".bmp", ".avif"];

  for (const file of files) {
    const relPath = path.join(currentDir, file.name).replace(/\\/g, "/");
    const fullPath = path.join(publicDir, relPath);

    if (file.isDirectory()) {
      results = results.concat(getPublicImages(publicDir, relPath));
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const stats = fs.statSync(fullPath);
        const relativeUrl = relPath.startsWith("/") ? relPath : "/" + relPath;
        const folderUrl = path.dirname(relativeUrl).replace(/\\/g, "/");

        results.push({
          name: file.name,
          relativePath: relativeUrl,
          folder: folderUrl,
          size: stats.size,
          mtime: stats.mtimeMs,
        });
      }
    }
  }
  return results;
}

function getSafeFullPath(publicDir: string, relativePath: string): string | null {
  const cleanPath = relativePath.startsWith("/") ? relativePath.substring(1) : relativePath;
  const resolved = path.resolve(publicDir, cleanPath);
  if (resolved.startsWith(publicDir)) {
    return resolved;
  }
  return null;
}

function adminApiPlugin(): Plugin {
  return {
    name: "admin-api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const publicDir = path.resolve(__dirname, "public");

        if (req.url === "/api/admin/list-public-images" && req.method === "GET") {
          try {
            const images = getPublicImages(publicDir);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, images }));
          } catch (err) {
            console.error("Error listing public images:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to list images" }));
          }
          return;
        }

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

        if (req.url === "/api/admin/rename-image" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { oldPath, newName } = JSON.parse(body);
              if (!oldPath || !newName) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Missing parameters" }));
                return;
              }

              const oldFullPath = getSafeFullPath(publicDir, oldPath);
              if (!oldFullPath || !fs.existsSync(oldFullPath)) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: "Source file not found" }));
                return;
              }

              const folder = path.dirname(oldFullPath);
              const sanitizedNewName = path.basename(newName.trim());
              const newFullPath = path.join(folder, sanitizedNewName);

              if (!newFullPath.startsWith(publicDir)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid new path" }));
                return;
              }

              fs.renameSync(oldFullPath, newFullPath);

              const relOldDir = path.dirname(oldPath).replace(/\\/g, "/");
              const newRelPath = (relOldDir === "/" ? "/" : relOldDir + "/") + sanitizedNewName;

              console.log(`[Admin Plugin] Renamed image: ${oldPath} -> ${newRelPath}`);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, oldPath, newPath: newRelPath }));
            } catch (err) {
              console.error("Error renaming image:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to rename image" }));
            }
          });
          return;
        }

        if (req.url === "/api/admin/delete-image" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { targetPath } = JSON.parse(body);
              if (!targetPath) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Missing targetPath parameter" }));
                return;
              }

              const fullPath = getSafeFullPath(publicDir, targetPath);
              if (!fullPath || !fs.existsSync(fullPath)) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: "File not found" }));
                return;
              }

              fs.unlinkSync(fullPath);
              console.log(`[Admin Plugin] Deleted image: ${targetPath}`);

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, path: targetPath }));
            } catch (err) {
              console.error("Error deleting image:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to delete image" }));
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

              let relativePath = targetPath;
              if (!relativePath || relativePath === "custom") {
                relativePath = "/" + fileName;
              }

              const destPath = getSafeFullPath(publicDir, relativePath);
              if (!destPath) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid path destination" }));
                return;
              }

              // Ensure directory exists
              const dir = path.dirname(destPath);
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }

              fs.writeFileSync(destPath, buffer);
              console.log(`[Admin Plugin] Saved image to public/${relativePath}`);

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
