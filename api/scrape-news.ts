import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://aafdsjspuqmajlwpvpfq.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZmRzanNwdXFtYWpsd3B2cGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MDExODMsImV4cCI6MjEwODA3NzE4M30.i-WCPRQGd8v8HxghuoObTAXQvrbEYHY7e-4KQTbRvqg";

/**
 * Downloads an external image and uploads it into Supabase Storage under images/noticias/
 */
export async function uploadExternalImageToSupabase(imgUrl: string): Promise<string> {
  if (!imgUrl || !imgUrl.startsWith("http")) return imgUrl;

  // If already hosted on our Supabase bucket, return directly
  if (imgUrl.includes("supabase.co") && imgUrl.includes("ceprunsa-images")) {
    return imgUrl;
  }

  try {
    const res = await fetch(imgUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (!res.ok) return imgUrl;

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = res.headers.get("content-type") || "image/jpeg";

    let ext = "jpg";
    if (contentType.includes("png")) ext = "png";
    else if (contentType.includes("webp")) ext = "webp";
    else if (contentType.includes("svg")) ext = "svg";
    else if (contentType.includes("gif")) ext = "gif";
    else {
      const match = imgUrl.split("?")[0].match(/\.(png|jpg|jpeg|webp|svg|gif)$/i);
      if (match) ext = match[1].toLowerCase();
    }

    const cleanName =
      imgUrl
        .split("?")[0]
        .split("/")
        .pop()
        ?.replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .slice(0, 35) || "noticia";

    const filePath = `images/noticias/${Date.now()}_${cleanName}.${ext}`;

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { error: uploadError } = await supabase.storage
      .from("ceprunsa-images")
      .upload(filePath, buffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.warn("Storage upload warning:", uploadError.message);
      return imgUrl;
    }

    const { data } = supabase.storage.from("ceprunsa-images").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err: any) {
    console.warn("Could not upload external image to Supabase Storage:", err?.message);
    return imgUrl;
  }
}

export default async function handler(req: any, res: any) {
  // Configure CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Use POST." });
  }

  try {
    const { url, imageUrl: directImageUrl } = req.body || {};

    // Allow directly uploading an external image URL to Supabase Storage
    if (directImageUrl && !url) {
      const publicUrl = await uploadExternalImageToSupabase(directImageUrl);
      return res.status(200).json({ success: true, publicUrl });
    }

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Se requiere un parámetro 'url' válido." });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.trim());
      if (!parsedUrl.protocol.startsWith("http")) {
        throw new Error("Protocolo inválido");
      }
    } catch {
      return res.status(400).json({ error: "La URL ingresada no tiene un formato válido (debe empezar con http:// o https://)." });
    }

    // Fetch the target web page with standard browser headers
    const response = await fetch(parsedUrl.href, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `No se pudo acceder a la página web (HTTP ${response.status}). Verifique la URL e intente nuevamente.`,
      });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. EXTRAER TÍTULO
    let title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $(".entry-title, .post-title, h1.tit-page, h2.tit-page, h1").first().text().trim() ||
      $("title").text().trim();

    if (title) {
      // Limpiar duplicaciones típicas de WordPress o sufijos concatenados
      const parts = title.split(/\s*[–\-|]\s*/);
      if (parts.length > 1 && parts[0].trim().length >= 6) {
        title = parts[0].trim();
      }

      // Limpiar sufijos típicos institucionales al final
      title = title
        .replace(/\s*[–\-|]\s*(?:UNSA|Universidad Nacional de San Agustín(?: de Arequipa)?|CEPRUNSA).*$/i, "")
        .replace(/Leer M[aá]s$/i, "")
        .trim();
    }

    // 2. EXTRAER RESUMEN / PÁRRAFOS
    let summary =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");

    if (!summary || summary.trim().length < 20) {
      const paragraphs: string[] = [];
      $("article p, .entry-content p, .post-content p, main p, p").each((_, el) => {
        const text = $(el).text().trim();
        if (
          text.length > 35 &&
          !text.toLowerCase().includes("copyright") &&
          !text.toLowerCase().includes("todos los derechos") &&
          !text.toLowerCase().includes("política de privacidad")
        ) {
          paragraphs.push(text);
        }
      });
      if (paragraphs.length > 0) {
        summary = paragraphs.slice(0, 3).join("\n\n");
      }
    }

    if (summary) {
      summary = summary.replace(/\s+/g, " ").trim();
    }

    // 3. EXTRAER SUBTÍTULO
    let subtitle = "";
    const h2Elements = $("article h2, .entry-content h2, main h2, h2, h3").filter((_, el) => {
      const text = $(el).text().trim();
      return (
        text.length > 15 &&
        text.length < 160 &&
        !text.toLowerCase().includes("buscar") &&
        !text.toLowerCase().includes("menú") &&
        !text.toLowerCase().includes("área de") &&
        !text.toLowerCase().includes("comentarios")
      );
    });

    if (h2Elements.length > 0) {
      subtitle = $(h2Elements[0]).text().trim();
    } else if (summary && summary.length > 25) {
      const firstSentence = summary.split(/[.!?]\s+/)[0];
      if (firstSentence && firstSentence.length <= 150) {
        subtitle = firstSentence;
      } else {
        subtitle = summary.slice(0, 110) + "...";
      }
    }

    // 4. EXTRAER IMAGEN
    let imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[property="og:image:url"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content");

    if (!imageUrl) {
      // Buscar imagen dentro del contenido
      const contentImg = $(
        'img[src*="/wp-content/uploads/"], article img, .entry-content img, .post-content img, main img, img.img-responsive'
      )
        .filter((_, el) => {
          const src = $(el).attr("src") || "";
          return (
            !src.toLowerCase().includes("logo") &&
            !src.toLowerCase().includes("icon") &&
            !src.toLowerCase().includes("avatar") &&
            !src.toLowerCase().includes("reclamaciones")
          );
        })
        .first()
        .attr("src");

      if (contentImg) {
        imageUrl = contentImg;
      }
    }

    // Convertir a URL absoluta
    if (imageUrl) {
      try {
        imageUrl = new URL(imageUrl, parsedUrl.href).href;
      } catch {
        // mantener como estaba
      }
    }

    // Descargar y guardar automáticamente la imagen en Supabase Storage (images/noticias/)
    if (imageUrl && !imageUrl.includes("supabase.co/storage")) {
      imageUrl = await uploadExternalImageToSupabase(imageUrl);
    }

    // 5. EXTRAER FECHA
    let date =
      $('meta[property="article:published_time"]').attr("content") ||
      $('meta[name="publish-date"]').attr("content") ||
      $("time").attr("datetime") ||
      $("time").first().text().trim() ||
      $(".published, .entry-date, .post-date, .date").first().text().trim();

    if (date && date.includes("T")) {
      try {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate.toLocaleDateString("es-PE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
      } catch {
        // mantener
      }
    }

    if (!date && imageUrl) {
      const match = imageUrl.match(/\/uploads\/(\d{4})\/(\d{2})\//);
      if (match) {
        const months = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const monthNum = parseInt(match[2], 10) - 1;
        if (monthNum >= 0 && monthNum < 12) {
          date = `${months[monthNum]} de ${match[1]}`;
        }
      }
    }

    if (!date) {
      const now = new Date();
      date = now.toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

    // 6. CATEGORÍA
    let category = $('meta[property="article:section"]').attr("content") || "Institucional";
    if (category.length > 30) category = "Institucional";

    return res.status(200).json({
      title: title || "Sin título",
      subtitle: subtitle || "",
      date: date || "",
      imageUrl: imageUrl || "",
      summary: summary || "",
      sourceUrl: parsedUrl.href,
      category,
    });
  } catch (error: any) {
    console.error("Scraper Error:", error);
    return res.status(500).json({
      error: "Error al extraer metadata: " + (error?.message || "Error desconocido"),
    });
  }
}
