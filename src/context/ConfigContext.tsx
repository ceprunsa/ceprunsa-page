import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig as defaultConfig } from "../data/config";

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
}

export interface PublicImageItem {
  name: string;
  relativePath: string;
  folder: string;
  size: number;
  mtime: number;
}

interface ImageOverrides {
  [originalPath: string]: string; // originalPath -> custom Data URL or relative URL in public
}

interface ConfigContextType {
  config: SiteConfigType;
  imageOverrides: ImageOverrides;
  updateConfig: (newConfig: Partial<SiteConfigType>) => Promise<boolean>;
  resetConfig: () => Promise<boolean>;
  uploadImage: (targetPath: string, file: File) => Promise<boolean>;
  setCustomImageOverride: (targetPath: string, sourcePath: string) => void;
  resetImage: (targetPath: string) => void;
  resetAllImages: () => void;
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

  // Save config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Error saving config to localStorage:", e);
    }
  }, [config]);

  // Save image overrides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imageOverrides));
    } catch (e) {
      console.error("Error saving image overrides to localStorage:", e);
    }
  }, [imageOverrides]);

  const updateConfig = async (newConfig: Partial<SiteConfigType>): Promise<boolean> => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);

    // Also attempt server sync if running in Vite dev server with API endpoint
    try {
      const res = await fetch("/api/admin/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) {
        console.warn("Server side config save returned non-ok status, fallback to local storage only.");
      }
    } catch (err) {
      // Ignore network errors when running in pure static/prod build
    }
    return true;
  };

  const resetConfig = async (): Promise<boolean> => {
    setConfig(defaultConfig);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    try {
      await fetch("/api/admin/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultConfig),
      });
    } catch (err) {
      // Ignore server error
    }
    return true;
  };

  const uploadImage = async (targetPath: string, file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          resolve(false);
          return;
        }

        // Store dataUrl locally for immediate client preview & offline persistence
        setImageOverrides((prev) => ({
          ...prev,
          [targetPath]: dataUrl,
        }));

        // Send to backend API to write to public/ directory physically if server endpoint available
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
              // If saved successfully to public, update override to point to real public path
              setImageOverrides((prev) => ({
                ...prev,
                [targetPath]: data.publicUrl + "?t=" + Date.now(),
              }));
            }
          }
        } catch (err) {
          console.warn("Could not save image to public folder via server API. Falling back to local dataUrl state.", err);
        }

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
  };

  const resetImage = (targetPath: string) => {
    setImageOverrides((prev) => {
      const next = { ...prev };
      delete next[targetPath];
      return next;
    });
  };

  const resetAllImages = () => {
    setImageOverrides({});
    localStorage.removeItem(IMAGES_STORAGE_KEY);
  };

  const getImageUrl = (path: string): string => {
    if (!path) return "";
    return imageOverrides[path] || path;
  };

  const fetchPublicImages = async (): Promise<PublicImageItem[]> => {
    try {
      const res = await fetch("/api/admin/list-public-images");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.images)) {
          return data.images;
        }
      }
    } catch (err) {
      console.warn("Could not fetch public images from server API:", err);
    }
    return [];
  };

  const renamePublicImage = async (
    oldPath: string,
    newName: string
  ): Promise<{ success: boolean; newPath?: string; error?: string }> => {
    try {
      const res = await fetch("/api/admin/rename-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPath, newName }),
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
    try {
      const res = await fetch("/api/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPath }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        resetImage(targetPath);
        return { success: true };
      }
      return { success: false, error: data.error || "Failed to delete" };
    } catch (err) {
      console.error("Error calling delete-image API:", err);
      return { success: false, error: "Network error" };
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        imageOverrides,
        updateConfig,
        resetConfig,
        uploadImage,
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
