import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig as defaultConfig } from "../data/config";
import { supabase, isSupabaseConfigured, BUCKET_NAME } from "../lib/supabase";

export interface SiteConfigType {
  nextProcessToStart: number;
  psychologyServiceActive: boolean;
  whatsappNumber: string;
  whatsappPsychologyNumber: string;
  phoneNumber: string;
  phoneAnnex: string;
  emailInstitutional: string;
  emailClientQuery: string;
  emailApplicantQuery: string;
  flyerActive?: boolean;
  flyerTargetUrl?: string;
  flyerTitle?: string;
}

export interface PublicImageItem {
  name: string;
  relativePath: string;
  folder: string;
  size: number;
  mtime: number;
}

interface ImageOverrides {
  [originalPath: string]: string; // originalPath -> custom Data URL or Supabase CDN URL
}

export interface ReplacementPreviewData {
  targetPath: string;
  itemName?: string;
  oldImageUrl: string;
  oldFileName: string;
  oldStoragePath?: string;
  newImageUrl: string;
  newFileName: string;
  newStoragePath: string;
  finalStoragePath: string;
  newRelPath: string;
  isTempUploaded: boolean;
}

interface ConfigContextType {
  config: SiteConfigType;
  imageOverrides: ImageOverrides;
  isSupabaseActive: boolean;
  updateConfig: (newConfig: Partial<SiteConfigType>) => Promise<boolean>;
  resetConfig: () => Promise<boolean>;
  uploadImage: (targetPath: string, file: File) => Promise<boolean>;
  prepareUploadReplacement: (
    targetPath: string,
    file: File,
    itemName?: string
  ) => Promise<{ success: boolean; preview?: ReplacementPreviewData; error?: string }>;
  commitReplacement: (preview: ReplacementPreviewData) => Promise<{ success: boolean; error?: string }>;
  cancelReplacement: (preview: ReplacementPreviewData) => Promise<{ success: boolean }>;
  setCustomImageOverride: (targetPath: string, sourcePath: string) => void;
  resetImage: (targetPath: string) => Promise<void>;
  resetAllImages: () => Promise<void>;
  getImageUrl: (path: string) => string;
  fetchPublicImages: () => Promise<PublicImageItem[]>;
  renamePublicImage: (oldPath: string, newName: string) => Promise<{ success: boolean; newPath?: string; error?: string }>;
  deletePublicImage: (targetPath: string) => Promise<{ success: boolean; error?: string }>;
}

const CONFIG_STORAGE_KEY = "ceprunsa_site_config_v1";
const IMAGES_STORAGE_KEY = "ceprunsa_image_overrides_v1";

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfigType>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...defaultConfig, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Error loading saved config from localStorage:", e);
    }
    return defaultConfig;
  });

  const [imageOverrides, setImageOverrides] = useState<ImageOverrides>(() => {
    try {
      const saved = localStorage.getItem(IMAGES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading saved image overrides from localStorage:", e);
    }
    return {};
  });

  // Save config changes to localStorage as offline cache
  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Error saving config to localStorage:", e);
    }
  }, [config]);

  // Save image overrides to localStorage as offline cache
  useEffect(() => {
    try {
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imageOverrides));
    } catch (e) {
      console.error("Error saving image overrides to localStorage:", e);
    }
  }, [imageOverrides]);

  // 1. Initial Load & Realtime Sync from Supabase
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let isMounted = true;

    // Load remote config from Supabase
    const loadRemoteData = async () => {
      try {
        // Fetch config
        const { data: configData } = await supabase
          .from("site_config")
          .select("config")
          .eq("id", "global")
          .maybeSingle();

        if (isMounted && configData?.config) {
          setConfig((prev) => ({ ...prev, ...configData.config }));
        }

        // Fetch image overrides
        const { data: imagesData } = await supabase
          .from("site_images")
          .select("target_path, image_url");

        if (isMounted && imagesData && imagesData.length > 0) {
          const overrides: ImageOverrides = {};
          imagesData.forEach((row) => {
            if (row.target_path && row.image_url) {
              overrides[row.target_path] = row.image_url;
            }
          });
          setImageOverrides((prev) => ({ ...prev, ...overrides }));
        }
      } catch (err) {
        console.warn("Could not sync with Supabase on mount:", err);
      }
    };

    loadRemoteData();

    // Subscribe to realtime updates so changes propagate instantly across all clients
    const channel = supabase
      .channel("site_realtime_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_config" },
        (payload) => {
          if (payload.new && (payload.new as any).config) {
            setConfig((prev) => ({ ...prev, ...(payload.new as any).config }));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_images" },
        (payload) => {
          if (payload.eventType === "DELETE" && payload.old) {
            const oldPath = (payload.old as any).target_path;
            if (oldPath) {
              setImageOverrides((prev) => {
                const next = { ...prev };
                delete next[oldPath];
                return next;
              });
            }
          } else if (payload.new) {
            const row = payload.new as any;
            if (row.target_path && row.image_url) {
              setImageOverrides((prev) => ({
                ...prev,
                [row.target_path]: row.image_url,
              }));
            }
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const updateConfig = async (newConfig: Partial<SiteConfigType>): Promise<boolean> => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);

    // Sync to Supabase
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from("site_config").upsert({
          id: "global",
          config: updated,
          updated_at: new Date().toISOString(),
        });
        if (error) {
          console.warn("Supabase site_config upsert warning:", error);
        }
      } catch (err) {
        console.warn("Failed to sync config with Supabase:", err);
      }
    }

    // Attempt local dev server sync if running Vite middleware
    try {
      await fetch("/api/admin/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (_) {
      // Ignore network errors in static production
    }

    return true;
  };

  const resetConfig = async (): Promise<boolean> => {
    setConfig(defaultConfig);
    localStorage.removeItem(CONFIG_STORAGE_KEY);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("site_config").upsert({
          id: "global",
          config: defaultConfig,
          updated_at: new Date().toISOString(),
        });
      } catch (_) {}
    }

    try {
      await fetch("/api/admin/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultConfig),
      });
    } catch (_) {}

    return true;
  };

  const resolveStoragePath = async (
    inputPath: string
  ): Promise<{ storagePath: string; row?: any } | null> => {
    if (!inputPath) return null;
    const bucketMarker = `/${BUCKET_NAME}/`;
    if (inputPath.includes(bucketMarker)) {
      const raw = inputPath.substring(inputPath.indexOf(bucketMarker) + bucketMarker.length).split("?")[0];
      return { storagePath: decodeURIComponent(raw) };
    }

    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from("site_images")
          .select("*")
          .or(`target_path.eq.${inputPath},image_url.eq.${inputPath}`)
          .limit(1);

        if (data && data.length > 0) {
          const row = data[0];
          if (row.image_url && row.image_url.includes(bucketMarker)) {
            const raw = row.image_url.substring(row.image_url.indexOf(bucketMarker) + bucketMarker.length).split("?")[0];
            return { storagePath: decodeURIComponent(raw), row };
          }
          return { storagePath: row.target_path.replace(/^\//, ""), row };
        }
      } catch (_) {}
    }

    const clean = inputPath.replace(/^\//, "").split("?")[0];
    return { storagePath: clean };
  };

  const prepareUploadReplacement = async (
    targetPath: string,
    file: File,
    itemName?: string
  ): Promise<{ success: boolean; preview?: ReplacementPreviewData; error?: string }> => {
    if (!isSupabaseConfigured) {
      const success = await uploadImage(targetPath, file);
      return { success };
    }

    try {
      const resolved = await resolveStoragePath(targetPath);
      const oldStoragePath = resolved?.storagePath || "";

      // Determine destination folder from original image
      let folder = "";
      if (oldStoragePath.includes("/")) {
        folder = oldStoragePath.substring(0, oldStoragePath.lastIndexOf("/") + 1);
      } else if (targetPath.includes("/")) {
        const cleanTarget = targetPath.replace(/^\//, "");
        if (cleanTarget.includes("/")) {
          folder = cleanTarget.substring(0, cleanTarget.lastIndexOf("/") + 1);
        }
      }

      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const currentOldFileName = oldStoragePath.includes("/")
        ? oldStoragePath.substring(oldStoragePath.lastIndexOf("/") + 1)
        : oldStoragePath;

      const finalStoragePath = `${folder}${cleanName}`;
      // Use temp prefix if filenames match exactly to avoid premature overwriting
      const newStoragePath =
        cleanName === currentOldFileName
          ? `${folder}temp_${Date.now()}_${cleanName}`
          : finalStoragePath;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(newStoragePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error in prepareUploadReplacement:", uploadError);
        return { success: false, error: uploadError.message };
      }

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(newStoragePath);

      const oldImgUrl = imageOverrides[targetPath] || (resolved?.row?.image_url || targetPath);
      const oldCleanName = currentOldFileName || oldImgUrl.split("/").pop()?.split("?")[0] || "imagen";

      const preview: ReplacementPreviewData = {
        targetPath,
        itemName,
        oldImageUrl: oldImgUrl,
        oldFileName: decodeURIComponent(oldCleanName),
        oldStoragePath,
        newImageUrl: publicUrlData.publicUrl,
        newFileName: file.name,
        newStoragePath,
        finalStoragePath,
        newRelPath: "/" + finalStoragePath,
        isTempUploaded: true,
      };

      return { success: true, preview };
    } catch (err: any) {
      console.error("Exception in prepareUploadReplacement:", err);
      return { success: false, error: err.message || "Error al subir imagen" };
    }
  };

  const commitReplacement = async (
    preview: ReplacementPreviewData
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured) return { success: true };

    try {
      const bucketMarker = `/${BUCKET_NAME}/`;
      let finalPublicUrl = preview.newImageUrl;

      // If temp prefix was used, move to final storage path
      if (preview.newStoragePath !== preview.finalStoragePath) {
        const { error: moveErr } = await supabase.storage
          .from(BUCKET_NAME)
          .move(preview.newStoragePath, preview.finalStoragePath);

        if (!moveErr) {
          finalPublicUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(preview.finalStoragePath).data.publicUrl;
        } else {
          console.warn("Notice moving temp file to final path:", moveErr);
        }
      }

      // Delete the previous physical image from Supabase Storage
      const oldPathsToDelete = new Set<string>();
      if (
        preview.oldStoragePath &&
        preview.oldStoragePath !== preview.finalStoragePath &&
        preview.oldStoragePath !== preview.newStoragePath
      ) {
        oldPathsToDelete.add(preview.oldStoragePath);
      }
      if (preview.oldImageUrl && preview.oldImageUrl.includes(bucketMarker)) {
        const prevUrlPath = decodeURIComponent(
          preview.oldImageUrl.substring(preview.oldImageUrl.indexOf(bucketMarker) + bucketMarker.length).split("?")[0]
        );
        if (
          prevUrlPath &&
          prevUrlPath !== preview.finalStoragePath &&
          prevUrlPath !== preview.newStoragePath
        ) {
          oldPathsToDelete.add(prevUrlPath);
        }
      }

      if (oldPathsToDelete.size > 0) {
        await supabase.storage.from(BUCKET_NAME).remove(Array.from(oldPathsToDelete));
      }

      const nowIso = new Date().toISOString();

      // Clean up old row in site_images if its path is different
      if (
        preview.oldStoragePath &&
        "/" + preview.oldStoragePath !== preview.targetPath &&
        "/" + preview.oldStoragePath !== preview.newRelPath
      ) {
        await supabase.from("site_images").delete().eq("target_path", "/" + preview.oldStoragePath);
      }

      // Save mapping in site_images table
      await supabase.from("site_images").upsert({
        id: preview.targetPath,
        target_path: preview.targetPath,
        image_url: finalPublicUrl,
        name: preview.newFileName,
        updated_at: nowIso,
      });

      if (preview.newRelPath !== preview.targetPath) {
        await supabase.from("site_images").upsert({
          id: preview.newRelPath,
          target_path: preview.newRelPath,
          image_url: finalPublicUrl,
          name: preview.newFileName,
          updated_at: nowIso,
        });
      }

      // Update local state imageOverrides so the UI reflects the new image immediately
      setImageOverrides((prev) => ({
        ...prev,
        [preview.targetPath]: finalPublicUrl,
        [preview.newRelPath]: finalPublicUrl,
        [preview.finalStoragePath]: finalPublicUrl,
      }));

      return { success: true };
    } catch (err: any) {
      console.error("Error committing replacement:", err);
      return { success: false, error: err.message || "Error al confirmar reemplazo" };
    }
  };

  const cancelReplacement = async (
    preview: ReplacementPreviewData
  ): Promise<{ success: boolean }> => {
    if (!isSupabaseConfigured) return { success: true };

    try {
      // If temp uploaded, delete the newly uploaded file from Supabase Storage
      if (preview.isTempUploaded && preview.newStoragePath) {
        await supabase.storage.from(BUCKET_NAME).remove([preview.newStoragePath]);
      }
      return { success: true };
    } catch (err) {
      console.warn("Notice cancelling replacement in storage:", err);
      return { success: false };
    }
  };

  const uploadImage = async (targetPath: string, file: File): Promise<boolean> => {
    // 1. If Supabase is configured, use prepareUploadReplacement and commitReplacement
    if (isSupabaseConfigured) {
      const res = await prepareUploadReplacement(targetPath, file);
      if (res.success && res.preview) {
        const commitRes = await commitReplacement(res.preview);
        return commitRes.success;
      }
      return false;
    }

    // 2. Fallback to Local Dev Server / Data URL (Offline mode or before Supabase is connected)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          resolve(false);
          return;
        }

        setImageOverrides((prev) => ({
          ...prev,
          [targetPath]: dataUrl,
        }));

        try {
          const res = await fetch("/api/admin/upload-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              targetPath,
              fileName: file.name,
              base64Data: dataUrl,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.publicUrl) {
              setImageOverrides((prev) => ({
                ...prev,
                [targetPath]: data.publicUrl + "?t=" + Date.now(),
              }));
            }
          }
        } catch (_) {}

        resolve(true);
      };

      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  };

  const setCustomImageOverride = (targetPath: string, sourcePath: string) => {
    setImageOverrides((prev) => ({
      ...prev,
      [targetPath]: sourcePath,
    }));

    if (isSupabaseConfigured) {
      void supabase
        .from("site_images")
        .upsert({
          id: targetPath,
          target_path: targetPath,
          image_url: sourcePath,
          updated_at: new Date().toISOString(),
        })
        .then(undefined, console.warn);
    }
  };

  const resetImage = async (targetPath: string) => {
    setImageOverrides((prev) => {
      const next = { ...prev };
      delete next[targetPath];
      return next;
    });

    if (isSupabaseConfigured) {
      try {
        await supabase.from("site_images").delete().eq("target_path", targetPath);
      } catch (err) {
        console.warn("Error deleting image mapping from Supabase:", err);
      }
    }
  };

  const resetAllImages = async () => {
    setImageOverrides({});
    localStorage.removeItem(IMAGES_STORAGE_KEY);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("site_images").delete().neq("id", "");
      } catch (err) {
        console.warn("Error clearing all images in Supabase:", err);
      }
    }
  };

  const getImageUrl = (path: string): string => {
    if (!path) return "";
    return imageOverrides[path] || path;
  };

  const fetchPublicImages = async (): Promise<PublicImageItem[]> => {
    const list: PublicImageItem[] = [];

    // 1. Fetch images from Supabase site_images table
    if (isSupabaseConfigured) {
      try {
        const { data: dbImages } = await supabase
          .from("site_images")
          .select("target_path, image_url, name, updated_at")
          .order("updated_at", { ascending: false });

        if (dbImages && dbImages.length > 0) {
          const seenUrls = new Set<string>();

          dbImages.forEach((img) => {
            if (!img.image_url) return;
            const cleanUrl = img.image_url.split("?")[0];
            if (seenUrls.has(cleanUrl)) return;
            seenUrls.add(cleanUrl);

            // Determine filename from the actual image_url
            const filename = cleanUrl.split("/").pop() || img.name || "imagen";

            // Determine folder from storage URL or target_path
            const marker = `/${BUCKET_NAME}/`;
            let folder = "general";
            if (cleanUrl.includes(marker)) {
              const storageRel = decodeURIComponent(cleanUrl.substring(cleanUrl.indexOf(marker) + marker.length));
              const slashIdx = storageRel.lastIndexOf("/");
              folder = slashIdx !== -1 ? storageRel.substring(0, slashIdx) : "general";
            } else {
              const slashIdx = img.target_path.lastIndexOf("/");
              folder = slashIdx !== -1 ? img.target_path.substring(0, slashIdx).replace(/^\//, "") : "general";
            }

            list.push({
              name: decodeURIComponent(filename),
              relativePath: img.image_url,
              folder: folder || "general",
              size: 0,
              mtime: img.updated_at ? new Date(img.updated_at).getTime() : Date.now(),
            });
          });
        }
      } catch (err) {
        console.warn("Error fetching images from Supabase site_images:", err);
      }
    }

    // 2. Fallback to local public images if Supabase list is empty
    if (list.length === 0) {
      try {
        const res = await fetch("/api/admin/list-public-images");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.images)) {
            list.push(...data.images);
          }
        }
      } catch (_) {}
    }

    return list;
  };



  const renamePublicImage = async (
    oldPath: string,
    newName: string
  ): Promise<{ success: boolean; newPath?: string; error?: string }> => {
    const trimmedNewName = newName.trim();
    if (!trimmedNewName) {
      return { success: false, error: "El nuevo nombre no puede estar vacío" };
    }

    // 1. Supabase Storage move & DB update
    if (isSupabaseConfigured) {
      try {
        const resolved = await resolveStoragePath(oldPath);
        if (!resolved || !resolved.storagePath) {
          return { success: false, error: "No se encontró el archivo de origen en el almacenamiento" };
        }

        const oldStoragePath = resolved.storagePath;
        const lastSlash = oldStoragePath.lastIndexOf("/");
        const folder = lastSlash !== -1 ? oldStoragePath.substring(0, lastSlash + 1) : "";
        const currentFileName = lastSlash !== -1 ? oldStoragePath.substring(lastSlash + 1) : oldStoragePath;

        // Preserve original extension if user didn't type an extension
        const oldExtMatch = currentFileName.match(/\.[a-zA-Z0-9]+$/);
        const oldExt = oldExtMatch ? oldExtMatch[0] : "";
        let cleanName = trimmedNewName.replace(/[^a-zA-Z0-9._-]/g, "_");
        if (oldExt && !cleanName.includes(".")) {
          cleanName += oldExt;
        }

        const newStoragePath = folder + cleanName;

        if (oldStoragePath === newStoragePath) {
          return { success: true, newPath: oldPath };
        }

        // Rename in Supabase Storage
        const { error: moveError } = await supabase.storage
          .from(BUCKET_NAME)
          .move(oldStoragePath, newStoragePath);

        if (moveError) {
          console.error("Supabase storage move error:", moveError);
          return { success: false, error: moveError.message };
        }

        // Get new public URL
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(newStoragePath);
        const newPublicUrl = urlData.publicUrl;
        const newRelPath = "/" + newStoragePath;
        const nowIso = new Date().toISOString();

        // Remove old row from database to prevent duplicate entries
        if (resolved.row?.id && resolved.row.id !== newRelPath) {
          await supabase.from("site_images").delete().eq("id", resolved.row.id);
        }
        if (oldPath !== newRelPath) {
          await supabase.from("site_images").delete().eq("target_path", oldPath);
        }

        // Upsert single canonical row for the new relative path
        await supabase.from("site_images").upsert({
          id: newRelPath,
          target_path: newRelPath,
          image_url: newPublicUrl,
          name: cleanName,
          updated_at: nowIso,
        });

        // Update local image overrides cleanly
        setImageOverrides((prev) => {
          const next = { ...prev };
          delete next[oldPath];
          next[oldPath] = newPublicUrl;
          next[newRelPath] = newPublicUrl;
          next[newStoragePath] = newPublicUrl;
          next[newPublicUrl] = newPublicUrl;
          return next;
        });

        const finalReturnPath = oldPath.startsWith("http") ? newPublicUrl : newRelPath;
        return { success: true, newPath: finalReturnPath };
      } catch (err: any) {
        console.error("Error renaming in Supabase:", err);
        return { success: false, error: err.message || "Error al renombrar archivo" };
      }
    }

    // 2. Dev server fallback
    try {
      const res = await fetch("/api/admin/rename-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPath, newName: trimmedNewName }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setImageOverrides((prev) => {
          if (!prev[oldPath]) return prev;
          const next = { ...prev };
          next[data.newPath] = next[oldPath];
          delete next[oldPath];
          return next;
        });
        return { success: true, newPath: data.newPath };
      }
      return { success: false, error: data.error || "Failed to rename" };
    } catch (err) {
      console.error("Error calling rename-image API:", err);
      return { success: false, error: "Network error" };
    }
  };

  const deletePublicImage = async (targetPath: string): Promise<{ success: boolean; error?: string }> => {
    // 1. Supabase Storage & DB delete
    if (isSupabaseConfigured) {
      try {
        const resolved = await resolveStoragePath(targetPath);
        if (resolved?.storagePath) {
          await supabase.storage.from(BUCKET_NAME).remove([resolved.storagePath]);
        }
        await supabase
          .from("site_images")
          .delete()
          .or(`target_path.eq.${targetPath},image_url.eq.${targetPath},id.eq.${targetPath}`);

        await resetImage(targetPath);
        return { success: true };
      } catch (err: any) {
        console.error("Error deleting image from Supabase:", err);
        return { success: false, error: err.message || "Failed to delete" };
      }
    }

    // 2. Dev server fallback
    try {
      const res = await fetch("/api/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPath }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await resetImage(targetPath);
        return { success: true };
      }
      return { success: false, error: data.error || "Failed to delete" };
    } catch (err) {
      await resetImage(targetPath);
      return { success: true };
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        imageOverrides,
        isSupabaseActive: isSupabaseConfigured,
        updateConfig,
        resetConfig,
        uploadImage,
        prepareUploadReplacement,
        commitReplacement,
        cancelReplacement,
        setCustomImageOverride,
        resetImage,
        resetAllImages,
        getImageUrl,
        fetchPublicImages,
        renamePublicImage,
        deletePublicImage,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
