import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Read .env file manually
const envPath = path.resolve(rootDir, ".env");
if (!fs.existsSync(envPath)) {
  console.error("❌ No se encontró el archivo .env en la raíz del proyecto.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
let supabaseUrl = "";
let supabaseAnonKey = "";

for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (trimmed.startsWith("VITE_SUPABASE_URL=")) {
    supabaseUrl = trimmed.substring("VITE_SUPABASE_URL=".length).trim();
  } else if (trimmed.startsWith("VITE_SUPABASE_ANON_KEY=")) {
    supabaseAnonKey = trimmed.substring("VITE_SUPABASE_ANON_KEY=".length).trim();
  }
}

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project-id")) {
  console.error("❌ Faltan las credenciales VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env.");
  process.exit(1);
}

console.log("🔗 Conectando a Supabase:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const BUCKET_NAME = "ceprunsa-images";

// 2. MIME Type helper
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".gif":
      return "image/gif";
    case ".ico":
      return "image/x-icon";
    case ".avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

// 3. Scan directory recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  }
  return arrayOfFiles;
}

async function main() {
  console.log(`\n🚀 Iniciando subida de imágenes a Supabase (Bucket: "${BUCKET_NAME}")...\n`);

  // Verify bucket access or create
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.warn("⚠️ Aviso al listar buckets:", bucketError.message);
  } else {
    const exists = buckets.some((b) => b.name === BUCKET_NAME);
    if (!exists) {
      console.log(`📦 Creando bucket público "${BUCKET_NAME}"...`);
      const { error: createErr } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
      });
      if (createErr) {
        console.warn(`⚠️ No se pudo crear bucket directamente (puede requerir SQL o permisos):`, createErr.message);
      } else {
        console.log(`✅ Bucket "${BUCKET_NAME}" creado correctamente.`);
      }
    } else {
      console.log(`✅ Bucket "${BUCKET_NAME}" verificado.`);
    }
  }

  // Find all images in public/
  const publicDir = path.resolve(rootDir, "public");
  const allImageFiles = getAllFiles(publicDir);

  console.log(`📸 Se encontraron ${allImageFiles.length} imágenes para sincronizar.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allImageFiles.length; i++) {
    const filePath = allImageFiles[i];
    const relFromPublic = path.relative(publicDir, filePath).replace(/\\/g, "/");
    const targetPath = "/" + relFromPublic; // e.g. /images/home/ceprunsa-estudiantes-demo.jpg
    const storagePath = relFromPublic;     // e.g. images/home/ceprunsa-estudiantes-demo.jpg
    const fileName = path.basename(filePath);
    const mimeType = getMimeType(filePath);

    try {
      const fileBuffer = fs.readFileSync(filePath);

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (uploadError) {
        console.error(`❌ [${i + 1}/${allImageFiles.length}] Error subiendo ${fileName}:`, uploadError.message);
        failCount++;
        continue;
      }

      // Get public CDN URL
      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
      const publicUrl = urlData.publicUrl;

      // Upsert to site_images table
      const { error: dbError } = await supabase.from("site_images").upsert({
        id: targetPath,
        target_path: targetPath,
        image_url: publicUrl,
        name: fileName,
        updated_at: new Date().toISOString(),
      });

      if (dbError) {
        // Just log if DB table not created yet, storage is what matters
        console.warn(`⚠️ Alerta DB para ${fileName}:`, dbError.message);
      }

      successCount++;
      console.log(`✅ [${i + 1}/${allImageFiles.length}] ${fileName} -> Subida exitosa`);
    } catch (err) {
      console.error(`❌ Error inesperado con ${fileName}:`, err.message);
      failCount++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 Sincronización finalizada:`);
  console.log(`   ✅ Exitosas: ${successCount}`);
  if (failCount > 0) {
    console.log(`   ❌ Fallidas: ${failCount}`);
  }
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error("Error fatal en el script:", err);
  process.exit(1);
});
