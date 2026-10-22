import { supabase, isSupabaseConfigured, BUCKET_NAME } from "./supabase";
import type { Noticia } from "../types";

const LOCAL_STORAGE_KEY = "ceprunsa_noticias_custom";

/**
 * Validates if an ID is a valid PostgreSQL UUID
 */
export function isValidUUID(id?: string): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// Helper to get local stored override noticias
function getLocalNoticias(): Noticia[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Filter out any legacy mock items (noticia-1, noticia-2, etc.)
        const realItems = parsed.filter((item: any) => isValidUUID(item?.id));
        if (realItems.length !== parsed.length) {
          setLocalNoticias(realItems);
        }
        return realItems;
      }
    }
  } catch (e) {
    console.warn("Error reading local noticias cache:", e);
  }
  return [];
}

// Helper to save local stored noticias
function setLocalNoticias(noticias: Noticia[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(noticias));
  } catch (e) {
    console.warn("Error saving local noticias cache:", e);
  }
}

/**
 * Upload an external image URL to Supabase Storage under images/noticias/
 */
export async function uploadExternalImageViaApi(imageUrl: string): Promise<string> {
  if (!imageUrl || !imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.includes("supabase.co") && imageUrl.includes("ceprunsa-images")) {
    return imageUrl;
  }

  try {
    const res = await fetch("/api/scrape-news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.publicUrl) return data.publicUrl;
    }
  } catch (err) {
    console.warn("Could not upload external image to Supabase Storage:", err);
  }
  return imageUrl;
}

/**
 * Fetch all news articles from Supabase or fallback to local cache
 */
export async function fetchNoticias(): Promise<Noticia[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        // Map database fields (snake_case) to Noticia object (camelCase)
        const mapped: Noticia[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle || "",
          date: item.date || "",
          imageUrl: item.image_url || "",
          summary: item.summary || "",
          sourceUrl: item.source_url || "",
          category: item.category || "Institucional",
          featured: Boolean(item.featured),
          content: item.content || "",
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));

        // Always save and return the real Supabase state
        setLocalNoticias(mapped);
        return mapped;
      } else if (error) {
        console.warn("Supabase query error (falling back to cache):", error.message);
      }
    } catch (err) {
      console.warn("Supabase network error:", err);
    }
  }

  // Fallback to local storage (only real UUID items)
  return getLocalNoticias();
}

/**
 * Insert or update a news item in Supabase and local cache
 */
export async function saveNoticia(item: Partial<Noticia>): Promise<{ success: boolean; data?: Noticia; error?: string }> {
  // Only treat as editing in Supabase if it has a valid database UUID
  const isEditingInDb = Boolean(item.id && isValidUUID(item.id));
  const now = new Date().toISOString();

  // If imageUrl is external, automatically save it into Supabase Storage images/noticias/
  let finalImageUrl = item.imageUrl?.trim() || "";
  if (finalImageUrl.startsWith("http") && !finalImageUrl.includes("supabase.co")) {
    finalImageUrl = await uploadExternalImageViaApi(finalImageUrl);
  }

  // Payload strictly matching the columns in public.noticias table
  const dbPayload = {
    title: item.title?.trim() || "Sin título",
    subtitle: item.subtitle?.trim() || "",
    date: item.date?.trim() || new Date().toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }),
    image_url: finalImageUrl,
    summary: item.summary?.trim() || "",
    source_url: item.sourceUrl?.trim() || "",
    category: item.category || "Institucional",
    featured: Boolean(item.featured),
    updated_at: now,
  };

  let savedNoticia: Noticia | null = null;

  if (isSupabaseConfigured) {
    try {
      if (isEditingInDb && item.id) {
        const { data, error } = await supabase
          .from("noticias")
          .update(dbPayload)
          .eq("id", item.id)
          .select()
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          savedNoticia = {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            date: data.date,
            imageUrl: data.image_url,
            summary: data.summary,
            sourceUrl: data.source_url,
            category: data.category,
            featured: data.featured,
            content: data.content || "",
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
        }
      } else {
        // Insert as new record
        const { data, error } = await supabase
          .from("noticias")
          .insert([
            {
              ...dbPayload,
              created_at: now,
            },
          ])
          .select()
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          savedNoticia = {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            date: data.date,
            imageUrl: data.image_url,
            summary: data.summary,
            sourceUrl: data.source_url,
            category: data.category,
            featured: data.featured,
            content: data.content || "",
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
        }
      }
    } catch (err: any) {
      console.error("Error saving to Supabase:", err?.message);
      return { success: false, error: err?.message || "Error al guardar en Supabase" };
    }
  }

  // Fallback if Supabase is not configured
  if (!savedNoticia) {
    const localId = item.id || `noticia-${Date.now()}`;
    savedNoticia = {
      id: localId,
      title: dbPayload.title,
      subtitle: dbPayload.subtitle,
      date: dbPayload.date,
      imageUrl: dbPayload.image_url,
      summary: dbPayload.summary,
      sourceUrl: dbPayload.source_url,
      category: dbPayload.category,
      featured: dbPayload.featured,
      content: "",
      created_at: now,
      updated_at: now,
    };
  }

  // Update local cache
  const localList = getLocalNoticias();
  const index = localList.findIndex((n) => n.id === item.id || n.id === savedNoticia!.id);
  if (index >= 0) {
    localList[index] = savedNoticia;
  } else {
    localList.unshift(savedNoticia);
  }
  setLocalNoticias(localList);

  return { success: true, data: savedNoticia };
}

/**
 * Delete a news item by ID and remove its image from Supabase Storage (images/noticias/)
 */
export async function deleteNoticia(id: string): Promise<{ success: boolean; error?: string }> {
  let imageUrlToDelete: string | null = null;

  // Check image URL in local cache
  const localItem = getLocalNoticias().find((n) => n.id === id);
  if (localItem?.imageUrl) {
    imageUrlToDelete = localItem.imageUrl;
  }

  // Only attempt delete in Supabase if ID is a valid database UUID
  if (isSupabaseConfigured && isValidUUID(id)) {
    try {
      // If we don't have the image URL yet, fetch it from Supabase before deleting the row
      if (!imageUrlToDelete) {
        const { data } = await supabase.from("noticias").select("image_url").eq("id", id).maybeSingle();
        if (data?.image_url) {
          imageUrlToDelete = data.image_url;
        }
      }

      // If image is stored in Supabase Storage bucket, delete it
      if (imageUrlToDelete && imageUrlToDelete.includes("ceprunsa-images")) {
        const marker = "/ceprunsa-images/";
        const idx = imageUrlToDelete.indexOf(marker);
        if (idx !== -1) {
          const rawPath = imageUrlToDelete.substring(idx + marker.length).split("?")[0];
          const storagePath = decodeURIComponent(rawPath);
          if (storagePath) {
            const { error: removeErr } = await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
            if (removeErr) {
              console.warn("Could not delete image from Supabase Storage:", removeErr.message);
            } else {
              console.log("Successfully deleted image from storage bucket:", storagePath);
            }
          }
        }
      }

      const { error } = await supabase.from("noticias").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete error:", error.message);
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      console.error("Supabase delete network error:", err?.message);
      return { success: false, error: err?.message };
    }
  }

  // Always remove from local cache
  const localList = getLocalNoticias().filter((n) => n.id !== id);
  setLocalNoticias(localList);

  return { success: true };
}

/**
 * Upload an image file to Supabase Storage in the ceprunsa-images bucket under images/noticias/
 */
export async function uploadNoticiaImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isSupabaseConfigured) {
    const localUrl = URL.createObjectURL(file);
    return { success: true, url: localUrl };
  }

  try {
    const fileExt = file.name.split(".").pop();
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const filePath = `images/noticias/${Date.now()}_${cleanFileName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return { success: true, url: data.publicUrl };
  } catch (err: any) {
    console.error("Storage upload error:", err);
    return { success: false, error: err.message || "Error al subir la imagen a Supabase Storage." };
  }
}

/**
 * Call the backend serverless endpoint to extract metadata from a URL
 */
export async function extractMetadataFromUrl(url: string): Promise<{
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  summary: string;
  sourceUrl: string;
  category?: string;
}> {
  const response = await fetch("/api/scrape-news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Error en el servidor al extraer la URL (${response.status})`);
  }

  return await response.json();
}
