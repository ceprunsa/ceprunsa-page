import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Lock,
  User,
  Save,
  RotateCcw,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Search,
  FileCode,
  Building,
  Phone,
  Mail,
  HelpCircle,
  Edit3,
  Trash2,
  RefreshCw,
  Folder,
  Grid,
  List,
  Plus,
  X,
  Copy,
  Check,
  FileImage,
  AlertTriangle,
} from "lucide-react";
import { useConfig, type PublicImageItem } from "../context/ConfigContext";

// Target image definitions categorized by Page for Admin Quick Reference
export type PageCategory = "home" | "nosotros" | "carreras" | "procesos" | "guias" | "global";

interface ImageItem {
  id: string;
  name: string;
  page: PageCategory;
  pageName: string;
  section: string;
  path: string;
  description: string;
}

const SITE_IMAGES: ImageItem[] = [
  // 🌐 GLOBAL / LOGOS
  {
    id: "logo-white",
    name: "Logo CEPRUNSA Blanco",
    page: "global",
    pageName: "Global / Marca",
    section: "Logos Institucionales",
    path: "/images/global/logo-ceprunsa-white.png",
    description: "Logo del encabezado y pie de página en fondo oscuro",
  },
  {
    id: "logo-color",
    name: "Logo CEPRUNSA Color",
    page: "global",
    pageName: "Global / Marca",
    section: "Logos Institucionales",
    path: "/images/global/logo-ceprunsa.png",
    description: "Logo institucional a color para fondos claros",
  },
  {
    id: "app-conocet",
    name: "Logo App ConóceT",
    page: "global",
    pageName: "Global / Marca",
    section: "Aplicación Móvil ConóceT",
    path: "/images/global/conocet-app-logo.png",
    description: "Icono oficial de la aplicación móvil ConóceT UNSA",
  },
  {
    id: "app-qr",
    name: "Código QR App ConóceT",
    page: "global",
    pageName: "Global / Marca",
    section: "Aplicación Móvil ConóceT",
    path: "/images/global/conocet-qr.png",
    description: "Código QR para descarga directa de la app móvil",
  },

  // 🏠 INICIO (HOME)
  {
    id: "home-hero",
    name: "Carrusel Slide 1 - Estudiantes UNSA",
    page: "home",
    pageName: "Inicio",
    section: "Carrusel Principal (Hero)",
    path: "/images/home/ceprunsa-estudiantes-demo.jpg",
    description: "Imagen destacada del banner / hero principal en la página de Inicio",
  },
  {
    id: "home-slide-2",
    name: "Carrusel Slide 2 - Campus Arequipa",
    page: "home",
    pageName: "Inicio",
    section: "Carrusel Principal (Hero)",
    path: "/images/home/home_image.jpeg",
    description: "Fotografía panorámica del campus universitario en el carrusel principal",
  },
  {
    id: "home-slide-3",
    name: "Carrusel Slide 3 - Local Central",
    page: "home",
    pageName: "Inicio",
    section: "Carrusel Principal (Hero)",
    path: "/images/home/ceprunsa_local.jpeg",
    description: "Fotografía institucional de las instalaciones en el carrusel principal",
  },
  {
    id: "home-slide-4",
    name: "Carrusel Slide 4 - Ciclo Quintos",
    page: "home",
    pageName: "Inicio",
    section: "Carrusel Principal (Hero)",
    path: "/images/procesos/ceprunsa_ciclo_quintos.png",
    description: "Afiche promocional del Ciclo Quintos destacado en el carrusel",
  },
  {
    id: "home-ingresa-quintos",
    name: "Tarjeta Ciclo Quintos",
    page: "home",
    pageName: "Inicio",
    section: "Ingresa a la UNSA por CEPRUNSA",
    path: "/images/procesos/ceprunsa_ciclo_quintos.png",
    description: "Imagen destacada en la tarjeta del Ciclo Quintos en Inicio",
  },
  {
    id: "home-ingresa-estudiantes",
    name: "Tarjeta Estudiantes UNSA",
    page: "home",
    pageName: "Inicio",
    section: "Ingresa a la UNSA por CEPRUNSA",
    path: "/images/home/ceprunsa-estudiantes-demo.jpg",
    description: "Imagen ilustrativa en la tarjeta informativa de inscripciones",
  },
  {
    id: "home-testimonio-ana",
    name: "Testimonio: Ana María Torres",
    page: "home",
    pageName: "Inicio",
    section: "Conoce los Testimonios",
    path: "/images/home/student_ana.jpg",
    description: "Fotografía de la ingresante Ana María Torres (1er Puesto Medicina Humana)",
  },
  {
    id: "home-testimonio-carlos",
    name: "Testimonio: Carlos Eduardo",
    page: "home",
    pageName: "Inicio",
    section: "Conoce los Testimonios",
    path: "/images/home/student_carlos.jpg",
    description: "Fotografía del ingresante Carlos Eduardo Mendoza (1er Puesto Ingeniería Civil)",
  },
  {
    id: "home-testimonio-maria",
    name: "Testimonio: María Fernanda",
    page: "home",
    pageName: "Inicio",
    section: "Conoce los Testimonios",
    path: "/images/home/student_maria.jpg",
    description: "Fotografía de la ingresante María Fernanda Quispe (1er Puesto Derecho)",
  },

  // 👥 NOSOTROS
  {
    id: "nosotros-local",
    name: "CEPRUNSA Local Principal",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Portada & Sede Principal",
    path: "/images/nosotros/ceprunsa-local.jpg",
    description: "Imagen del local y campus principal en la página Nosotros",
  },
  {
    id: "nosotros-mision",
    name: "Misión y Visión",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Misión y Visión",
    path: "/images/nosotros/mision-vision.jpg",
    description: "Ilustración de la sección Misión y Visión institucional",
  },
  {
    id: "nosotros-iso",
    name: "Certificación ISO 9001",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Calidad ISO 9001",
    path: "/images/nosotros/iso-9001.jpg",
    description: "Sello y distintivo de Sistema de Gestión de Calidad ISO 9001:2015",
  },
  {
    id: "nosotros-metodologia",
    name: "Nuestra Metodología",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Nuestra Metodología",
    path: "/images/nosotros/metodologia.jpg",
    description: "Imagen ilustrativa de la metodología de enseñanza y aprendizaje",
  },
  {
    id: "auth-arnaldo",
    name: "Dr. Arnaldo Valdivia (Presidente)",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Directorio y Autoridades",
    path: "/images/nosotros/DR-ARNALDO.jpg",
    description: "Fotografía del Presidente del Directorio de CEPRUNSA",
  },
  {
    id: "auth-maria",
    name: "Dra. María Elena (Dir. Académica)",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Directorio y Autoridades",
    path: "/images/nosotros/DRA-MARIA-ELENA-2.jpg",
    description: "Fotografía de la Directora Académica de CEPRUNSA",
  },
  {
    id: "auth-jose",
    name: "Dr. José (Dir. Administrativo)",
    page: "nosotros",
    pageName: "Nosotros",
    section: "Directorio y Autoridades",
    path: "/images/nosotros/DR-JOSE.jpg",
    description: "Fotografía del Director Administrativo de CEPRUNSA",
  },

  // 🎓 CARRERAS PROFESIONALES
  {
    id: "carreras-conocet-logo",
    name: "Logo App ConóceT (Vocacional)",
    page: "carreras",
    pageName: "Carreras",
    section: "Tarjeta ConóceT (Vocacional)",
    path: "/images/global/conocet-app-logo.png",
    description: "Icono oficial de la app de orientación vocacional en la página de Carreras",
  },
  {
    id: "carreras-conocet-qr",
    name: "Código QR App ConóceT",
    page: "carreras",
    pageName: "Carreras",
    section: "Tarjeta ConóceT (Vocacional)",
    path: "/images/global/conocet-qr.png",
    description: "Código QR para descargar la app móvil en la sección de Carreras",
  },

  // 📚 PROCESOS DE ADMISIÓN
  {
    id: "proceso-quintos",
    name: "Afiche Ciclo Quintos 2026",
    page: "procesos",
    pageName: "Procesos",
    section: "Portadas de Procesos de Admisión",
    path: "/images/procesos/ceprunsa_ciclo_quintos.png",
    description: "Banner promocional y afiche informativo del Ciclo Quintos",
  },
  {
    id: "proceso-fase1",
    name: "Afiche CEPRUNSA I Fase 2026",
    page: "procesos",
    pageName: "Procesos",
    section: "Portadas de Procesos de Admisión",
    path: "/images/procesos/ceprunsa_i_fase.jpg",
    description: "Afiche y portada del proceso de admisión CEPRUNSA I Fase",
  },
  {
    id: "proceso-fase2",
    name: "Afiche CEPRUNSA II Fase 2026",
    page: "procesos",
    pageName: "Procesos",
    section: "Portadas de Procesos de Admisión",
    path: "/images/procesos/ceprunsa_ii_fase.jpg",
    description: "Afiche y portada del proceso de admisión CEPRUNSA II Fase",
  },
  {
    id: "proceso-extraordinario",
    name: "Afiche Ciclo Extraordinario 2026",
    page: "procesos",
    pageName: "Procesos",
    section: "Portadas de Procesos de Admisión",
    path: "/images/procesos/proceso_extraordinario.jpg",
    description: "Afiche y portada del proceso de admisión Ciclo Extraordinario",
  },
  {
    id: "proceso-estudiantes",
    name: "Ilustración Estudiantes CEPRUNSA",
    page: "procesos",
    pageName: "Procesos",
    section: "Ilustración Informativa",
    path: "/images/home/ceprunsa-estudiantes-demo.jpg",
    description: "Ilustración informativa para tarjetas de procesos de admisión",
  },

  // 📖 GUÍAS DEL ESTUDIANTE
  {
    id: "header-clases",
    name: "Header Acceso a Clases",
    page: "guias",
    pageName: "Guías",
    section: "Encabezados de Sección",
    path: "/images/guias/acceso-clases-header.png",
    description: "Cabecera de la guía interactiva de acceso a aulas y clases virtuales",
  },
  {
    id: "header-pago",
    name: "Header Pago de Cuotas",
    page: "guias",
    pageName: "Guías",
    section: "Encabezados de Sección",
    path: "/images/guias/pago-cuotas-header.png",
    description: "Cabecera de la guía de pagos en banco y plataforma virtual",
  },
  {
    id: "header-documentos",
    name: "Header Documentos Oficiales",
    page: "guias",
    pageName: "Guías",
    section: "Encabezados de Sección",
    path: "/images/guias/documentos-oficiales-header.png",
    description: "Cabecera de la guía con reglamentos, vacantes y estatutos",
  },
  {
    id: "header-psicologia",
    name: "Header Consultorio Psicológico",
    page: "guias",
    pageName: "Guías",
    section: "Encabezados de Sección",
    path: "/images/guias/consultorio-psicologico-header.png",
    description: "Cabecera de la guía de orientación y soporte psicológico",
  },
];

const Admin: React.FC = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("ceprunsa_admin_auth") === "true";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<"presets" | "config">("presets");

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Context config & images
  const {
    config,
    updateConfig,
    resetConfig,
    uploadImage,
    setCustomImageOverride,
    resetImage,
    getImageUrl,
    imageOverrides,
    fetchPublicImages,
    renamePublicImage,
    deletePublicImage,
  } = useConfig();

  // Local config form state
  const [formConfig, setFormConfig] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  // Public images explorer state
  const [publicImages, setPublicImages] = useState<PublicImageItem[]>([]);

  // Modals state
  const [renameModalItem, setRenameModalItem] = useState<PublicImageItem | null>(null);
  const [renameInput, setRenameInput] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  const [deleteModalItem, setDeleteModalItem] = useState<PublicImageItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newImageFolder, setNewImageFolder] = useState("/");
  const [newImageCustomName, setNewImageCustomName] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [isUploadingNew, setIsUploadingNew] = useState(false);

  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Drag hover states for dropzones
  const [dragOverPath, setDragOverPath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Presets tab filter state & view mode
  const [presetImages, setPresetImages] = useState<ImageItem[]>(SITE_IMAGES);
  const [selectedPresetPage, setSelectedPresetPage] = useState<string>("home");
  const [selectedPresetSection, setSelectedPresetSection] = useState<string>("all");
  const [presetSearch, setPresetSearch] = useState("");
  const [presetViewMode, setPresetViewMode] = useState<"grid" | "list">("grid");

  const handlePresetPageChange = (pageId: string) => {
    setSelectedPresetPage(pageId);
    setSelectedPresetSection("all");
  };

  // Replace Modal state (picker from public/ folder or file upload)
  const [replaceModalItem, setReplaceModalItem] = useState<ImageItem | null>(null);
  const [replaceModalTab, setReplaceModalTab] = useState<"picker" | "upload">("picker");
  const [pickerFolder, setPickerFolder] = useState<string>("all");
  const [pickerSearch, setPickerSearch] = useState<string>("");
  const [selectedPublicImagePath, setSelectedPublicImagePath] = useState<string | null>(null);

  const openReplaceModal = (item: ImageItem) => {
    setReplaceModalItem(item);
    setSelectedPublicImagePath(null);
    setReplaceModalTab("picker");
  };

  // Sync formConfig with config
  useEffect(() => {
    setFormConfig(config);
  }, [config]);

  // Load public images on mount
  const loadPublicImages = async () => {
    try {
      const images = await fetchPublicImages();
      setPublicImages(images);
    } catch (err) {
      showToast("Error al cargar imágenes de public", "error");
    }
  };

  // Load public images on mount
  useEffect(() => {
    loadPublicImages();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === "admin" && passwordInput.trim() === "ceprunsa2026$$") {
      setIsAuthenticated(true);
      sessionStorage.setItem("ceprunsa_admin_auth", "true");
      setLoginError("");
      showToast("¡Sesión iniciada como Administrador!");
    } else {
      setLoginError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ceprunsa_admin_auth");
    showToast("Sesión cerrada correctamente.");
  };

  const handleConfigChange = (field: keyof typeof formConfig, value: any) => {
    setFormConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateConfig(formConfig);
      showToast("Configuración guardada exitosamente.");
    } catch (err) {
      showToast("Ocurrió un error al guardar la configuración.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetConfig = async () => {
    if (window.confirm("¿Deseas restablecer toda la configuración a los valores por defecto?")) {
      await resetConfig();
      showToast("Configuración restablecida por defecto.");
    }
  };

  // Replace image handler
  const handleReplaceFile = async (targetPath: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Por favor selecciona un archivo de imagen válido (.png, .jpg, .webp, .svg, etc.)", "error");
      return;
    }

    showToast(`Reemplazando imagen ${targetPath}...`);
    const success = await uploadImage(targetPath, file);
    if (success) {
      showToast(`Imagen reemplazada correctamente en public${targetPath}`);
      await loadPublicImages();
    } else {
      showToast("Error al reemplazar la imagen.", "error");
    }
  };

  // Rename modal submit
  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameModalItem || !renameInput.trim()) return;

    setIsRenaming(true);
    const result = await renamePublicImage(renameModalItem.relativePath, renameInput.trim());
    setIsRenaming(false);

    if (result.success) {
      const newPath = result.newPath || renameInput.trim();
      showToast(`Imagen renombrada a "${newPath}"`);
      setPresetImages((prev) =>
        prev.map((item) => (item.path === renameModalItem.relativePath ? { ...item, path: newPath } : item))
      );
      setRenameModalItem(null);
      setRenameInput("");
      await loadPublicImages();
    } else {
      showToast(`Error al renombrar: ${result.error || "No se pudo cambiar el nombre"}`, "error");
    }
  };

  // Delete modal submit
  const handleDeleteSubmit = async () => {
    if (!deleteModalItem) return;

    setIsDeleting(true);
    const result = await deletePublicImage(deleteModalItem.relativePath);
    setIsDeleting(false);

    if (result.success) {
      showToast(`Imagen "${deleteModalItem.name}" eliminada de public/`);
      setPresetImages((prev) => prev.filter((item) => item.path !== deleteModalItem.relativePath));
      setDeleteModalItem(null);
      await loadPublicImages();
    } else {
      showToast(`Error al eliminar: ${result.error || "No se pudo eliminar la imagen"}`, "error");
    }
  };

  // Helper to open rename modal for preset item
  const openRenameModalForPreset = (item: ImageItem) => {
    const filename = item.path.split("/").pop() || item.name;
    const folder = item.path.substring(0, item.path.lastIndexOf("/")) || "/";
    setRenameModalItem({
      relativePath: item.path,
      name: filename,
      folder: folder,
      size: 0,
      mtime: Date.now(),
    });
    setRenameInput(filename);
  };

  // Helper to open delete modal for preset item
  const openDeleteModalForPreset = (item: ImageItem) => {
    const filename = item.path.split("/").pop() || item.name;
    const folder = item.path.substring(0, item.path.lastIndexOf("/")) || "/";
    setDeleteModalItem({
      relativePath: item.path,
      name: filename,
      folder: folder,
      size: 0,
      mtime: Date.now(),
    });
  };

  // Upload new image modal submit
  const handleUploadNewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageFile) {
      showToast("Por favor selecciona un archivo de imagen.", "error");
      return;
    }

    setIsUploadingNew(true);
    const fileName = newImageCustomName.trim() || newImageFile.name;
    const folder = newImageFolder.endsWith("/") ? newImageFolder : newImageFolder + "/";
    const targetPath = folder === "/" ? "/" + fileName : folder + fileName;

    const success = await uploadImage(targetPath, newImageFile);
    setIsUploadingNew(false);

    if (success) {
      showToast(`Nueva imagen subida correctamente en public${targetPath}`);
      setUploadModalOpen(false);
      setNewImageFile(null);
      setNewImageCustomName("");
      await loadPublicImages();
    } else {
      showToast("Error al subir la nueva imagen.", "error");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    showToast(`Ruta copiada: ${text}`);
    setTimeout(() => setCopiedPath(null), 3000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const availableFolders = Array.from(new Set(publicImages.map((img) => img.folder))).sort();

  // Helper to format carrera image names nicely
  const formatCarreraName = (filename: string) => {
    const base = filename.replace(/\.[^/.]+$/, "");
    const cleaned = base
      .replace(/-\d+x\d+$/i, "")
      .replace(/-e\d+$/i, "")
      .replace(/_/g, " ")
      .replace(/-/g, " ");
    const words = cleaned.split(" ").filter(Boolean);
    const capitalized = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    return `Portada: ${capitalized || filename}`;
  };

  // Dynamically include all images from public/images/carreras
  const carrerasPublicImages = useMemo(() => {
    return publicImages
      .filter((img) => img.folder === "images/carreras" || img.relativePath.startsWith("/images/carreras/"))
      .map((img) => ({
        id: `carrera-dynamic-${img.relativePath}`,
        name: formatCarreraName(img.name),
        page: "carreras" as PageCategory,
        pageName: "Carreras",
        section: "Portadas por Escuela Profesional",
        path: img.relativePath,
        description: `Imagen de cabecera de la escuela / carrera (${img.name})`,
      }));
  }, [publicImages]);

  // Combine static presets with dynamic public/images/carreras images
  const allPresets = useMemo(() => {
    const existingPaths = new Set(presetImages.map((p) => p.path));
    const extraCarreras = carrerasPublicImages.filter((c) => !existingPaths.has(c.path));
    return [...presetImages, ...extraCarreras];
  }, [presetImages, carrerasPublicImages]);

  // Available sections for the selected page
  const availablePresetSections = useMemo(() => {
    const pageFiltered = selectedPresetPage === "all" ? allPresets : allPresets.filter((item) => item.page === selectedPresetPage);
    const set = new Set(pageFiltered.map((item) => item.section));
    return Array.from(set).sort();
  }, [allPresets, selectedPresetPage]);

  // Filtered preset images for tab 3
  const filteredPresets = useMemo(() => {
    return allPresets.filter((item) => {
      const matchesPage = selectedPresetPage === "all" || item.page === selectedPresetPage;
      const matchesSection = selectedPresetSection === "all" || item.section === selectedPresetSection;
      const matchesSearch =
        presetSearch.trim() === "" ||
        item.name.toLowerCase().includes(presetSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(presetSearch.toLowerCase()) ||
        item.section.toLowerCase().includes(presetSearch.toLowerCase()) ||
        item.path.toLowerCase().includes(presetSearch.toLowerCase());
      return matchesPage && matchesSection && matchesSearch;
    });
  }, [allPresets, selectedPresetPage, selectedPresetSection, presetSearch]);

  // Grouped presets by section for organized display
  const groupedPresets = useMemo(() => {
    const groups: { [sectionName: string]: ImageItem[] } = {};
    filteredPresets.forEach((item) => {
      const sec = item.section || "General";
      if (!groups[sec]) groups[sec] = [];
      groups[sec].push(item);
    });
    return groups;
  }, [filteredPresets]);

  // ----------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-700 shadow-md text-white mb-2">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Acceso Administrativo</h1>
            <p className="text-sm text-slate-500">Ingresa tus credenciales para administrar CEPRUNSA</p>
          </div>

          {loginError && (
            <div className="flex items-center gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fade-in">
              <AlertCircle size={18} className="shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Usuario
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Usuario"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-accent-700 focus:ring-2 focus:ring-accent-700/20 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-accent-700 focus:ring-2 focus:ring-accent-700/20 text-slate-900 text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-accent-700 hover:bg-accent-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-sm"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-200">
            CEPRUNSA &copy; Panel de Administración Privado
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD (When authenticated)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-bounce ${toastMessage.type === "success"
            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
            : "bg-red-50 border-red-300 text-red-800"
            }`}
        >
          {toastMessage.type === "success" ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertCircle size={18} className="text-red-600" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 backdrop-blur-md px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-700 flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Panel de Administración</h1>
              <p className="text-xs text-slate-500">Gestión de CEPRUNSA - Configuración e Imágenes `public/`</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Administrador Activo
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-sm font-medium transition cursor-pointer"
            >
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("presets")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${activeTab === "presets"
                ? "bg-accent-700 text-white shadow-md shadow-accent-950/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
          >
            <ImageIcon size={18} />
            <span>Imágenes Clave del Sitio Web por Página</span>
            {Object.keys(imageOverrides).length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 border border-amber-300 text-amber-800 font-bold">
                {Object.keys(imageOverrides).length} editadas
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${activeTab === "config"
                ? "bg-accent-700 text-white shadow-md shadow-accent-950/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
          >
            <Settings size={18} />
            <span>Configuración Global (config.ts)</span>
          </button>
        </div>



        {/* ---------------------------------------------------- */}
        {/* TAB 2: CONFIGURATION EDITOR (config.ts)              */}
        {/* ---------------------------------------------------- */}
        {activeTab === "config" && (
          <form onSubmit={handleSaveConfig} className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileCode className="text-accent-700" size={22} />
                    Editar Parámetros de `src/data/config.ts`
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Los cambios guardados aquí actualizarán los contactos y estados en todo el sitio web al instante.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetConfig}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Restablecer
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-700 hover:bg-accent-800 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent-950/20 transition cursor-pointer disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </div>

              {/* Grid Section 1: Process & Psychological Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-accent-700 font-bold text-sm">
                    <Building size={18} />
                    <span>Proceso Académico Prioritario (nextProcessToStart)</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Define cuál proceso de admisión se resalta como "Próximo a iniciar" en el banner de Inicio.
                  </p>

                  <select
                    value={formConfig.nextProcessToStart}
                    onChange={(e) => handleConfigChange("nextProcessToStart", Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:border-accent-700 focus:ring-1 focus:ring-accent-700 outline-none transition"
                  >
                    <option value={1}>1 - CEPRUNSA I Fase</option>
                    <option value={2}>2 - CEPRUNSA Ciclo Quintos</option>
                    <option value={3}>3 - CEPRUNSA II Fase</option>
                    <option value={4}>4 - Proceso Extraordinario</option>
                  </select>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-accent-700 font-bold text-sm">
                    <HelpCircle size={18} />
                    <span>Estado del Consultorio Psicológico (psychologyServiceActive)</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Habilita o deshabilita la atención y botones de reserva del Consultorio Psicológico.
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleConfigChange("psychologyServiceActive", !formConfig.psychologyServiceActive)
                      }
                      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formConfig.psychologyServiceActive ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${formConfig.psychologyServiceActive ? "translate-x-7" : "translate-x-0"
                          }`}
                      />
                    </button>

                    <span
                      className={`text-sm font-semibold ${formConfig.psychologyServiceActive ? "text-emerald-700" : "text-slate-500"
                        }`}
                    >
                      {formConfig.psychologyServiceActive ? "Servicio Activo" : "Servicio Inactivo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid Section 2: Contact Numbers */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Phone size={18} className="text-accent-700" />
                  <span>Números de Contacto</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">
                      WhatsApp Atención Principal
                    </label>
                    <input
                      type="text"
                      value={formConfig.whatsappNumber}
                      onChange={(e) => handleConfigChange("whatsappNumber", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">
                      WhatsApp Psicología
                    </label>
                    <input
                      type="text"
                      value={formConfig.whatsappPsychologyNumber}
                      onChange={(e) => handleConfigChange("whatsappPsychologyNumber", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">Teléfono Fijo Oficina</label>
                    <input
                      type="text"
                      value={formConfig.phoneNumber}
                      onChange={(e) => handleConfigChange("phoneNumber", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">Anexo Telefónico</label>
                    <input
                      type="text"
                      value={formConfig.phoneAnnex}
                      onChange={(e) => handleConfigChange("phoneAnnex", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Section 3: Email Addresses */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Mail size={18} className="text-accent-700" />
                  <span>Correos Electrónicos</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">Correo Institucional</label>
                    <input
                      type="email"
                      value={formConfig.emailInstitutional}
                      onChange={(e) => handleConfigChange("emailInstitutional", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">Atención al Cliente</label>
                    <input
                      type="email"
                      value={formConfig.emailClientQuery}
                      onChange={(e) => handleConfigChange("emailClientQuery", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 font-semibold mb-1.5">Atención al Postulante</label>
                    <input
                      type="email"
                      value={formConfig.emailApplicantQuery}
                      onChange={(e) => handleConfigChange("emailApplicantQuery", e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:border-accent-700 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: FEATURED PRESET IMAGES BY PAGE               */}
        {/* ---------------------------------------------------- */}
        {activeTab === "presets" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="text-accent-700" size={22} />
                    Gestión de Imágenes por Página
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Administra, reemplaza, renombra y elimina las imágenes de cada sección del sitio web.
                  </p>
                </div>
              </div>

              {/* Page Filter Tabs, Search Bar & View Mode Toggle */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "home", label: "Inicio", badge: allPresets.filter((i) => i.page === "home").length },
                      { id: "nosotros", label: "Nosotros", badge: allPresets.filter((i) => i.page === "nosotros").length },
                      { id: "carreras", label: "Carreras", badge: allPresets.filter((i) => i.page === "carreras").length },
                      { id: "procesos", label: "Procesos", badge: allPresets.filter((i) => i.page === "procesos").length },
                      { id: "guias", label: "Guías", badge: allPresets.filter((i) => i.page === "guias").length },
                      { id: "global", label: "Global / Logos", badge: allPresets.filter((i) => i.page === "global").length },
                    ].map((pageTab) => (
                      <button
                        key={pageTab.id}
                        onClick={() => handlePresetPageChange(pageTab.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedPresetPage === pageTab.id
                            ? "bg-accent-700 text-white shadow-md shadow-accent-950/20"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                          }`}
                      >
                        <span>{pageTab.label}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedPresetPage === pageTab.id ? "bg-accent-900/80 text-white" : "bg-slate-200 text-slate-600"
                            }`}
                        >
                          {pageTab.badge}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="lg:ml-auto flex items-center gap-2.5">
                    {/* View mode switcher */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                      <button
                        type="button"
                        onClick={() => setPresetViewMode("grid")}
                        title="Vista de Cuadrícula"
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${presetViewMode === "grid"
                            ? "bg-accent-700 text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        <Grid size={15} />
                        <span className="hidden sm:inline">Cuadrícula</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPresetViewMode("list")}
                        title="Vista de Lista"
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${presetViewMode === "list"
                            ? "bg-accent-700 text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        <List size={15} />
                        <span className="hidden sm:inline">Lista</span>
                      </button>
                    </div>

                    <div className="relative w-full sm:w-60">
                      <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, sección o ruta..."
                        value={presetSearch}
                        onChange={(e) => setPresetSearch(e.target.value)}
                        className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-xl pl-9 pr-3 py-2 focus:border-accent-700 focus:ring-1 focus:ring-accent-700 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Filter Pills */}
                {availablePresetSections.length > 1 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Sección de Página:</span>
                    <button
                      type="button"
                      onClick={() => setSelectedPresetSection("all")}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedPresetSection === "all"
                          ? "bg-slate-800 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                        }`}
                    >
                      Todas ({allPresets.filter((i) => selectedPresetPage === "all" || i.page === selectedPresetPage).length})
                    </button>
                    {availablePresetSections.map((secName) => {
                      const count = allPresets.filter(
                        (i) => (selectedPresetPage === "all" || i.page === selectedPresetPage) && i.section === secName
                      ).length;
                      return (
                        <button
                          key={secName}
                          type="button"
                          onClick={() => setSelectedPresetSection(secName)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${selectedPresetSection === secName
                              ? "bg-accent-700 text-white shadow-sm shadow-accent-950/20"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                            }`}
                        >
                          <span>{secName}</span>
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200/80 text-slate-700">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Content Display: Grouped by Section */}
            {filteredPresets.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
                <FileImage size={40} className="mx-auto mb-3 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700">No se encontraron imágenes en esta sección</p>
                <p className="text-xs text-slate-400 mt-1">Prueba seleccionando otra sección, otra página o borrando el filtro de búsqueda.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedPresets).map(([sectionTitle, items]) => (
                  <div key={sectionTitle} className="space-y-4">
                    {/* Section Header Banner */}
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-5 bg-accent-700 rounded-full"></div>
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide">{sectionTitle}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
                          {items.length} {items.length === 1 ? "imagen" : "imágenes"}
                        </span>
                      </div>
                    </div>

                    {presetViewMode === "list" ? (
                      /* LIST VIEW FOR SECTION */
                      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 shadow-xs">
                        {items.map((item) => {
                          const currentUrl = getImageUrl(item.path);
                          const isOverridden = !!imageOverrides[item.path];

                          return (
                            <div
                              key={item.id}
                              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition"
                            >
                              <div className="flex items-center gap-4 min-w-0">
                                {/* Thumbnail preview with replace dropzone */}
                                <div
                                  onClick={() => openReplaceModal(item)}
                                  title="Haz clic para reemplazar la imagen"
                                  className="relative w-20 h-20 shrink-0 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 group cursor-pointer"
                                >
                                  <img
                                    src={currentUrl}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain rounded"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <UploadCloud size={22} className="text-white" />
                                  </div>
                                </div>

                                {/* Text info */}
                                <div className="space-y-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                                      {item.pageName}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md bg-accent-50 border border-accent-200 text-accent-800 text-[10px] font-semibold">
                                      {item.section}
                                    </span>
                                    <h3 className="text-[11px] font-semibold text-slate-800 truncate">{item.name}</h3>
                                    {isOverridden ? (
                                      <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-bold">
                                        Modificada
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-500 text-[10px]">
                                        Original
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>

                                  <div className="flex items-center gap-2">
                                    <code className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate max-w-md">
                                      public{item.path}
                                    </code>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(item.path)}
                                      title="Copiar ruta"
                                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                                    >
                                      {copiedPath === item.path ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Action buttons */}
                              <div className="flex flex-wrap items-center gap-2 shrink-0 md:justify-end">
                                <button
                                  type="button"
                                  onClick={() => openReplaceModal(item)}
                                  title="Reemplazar imagen escogiendo de public/ o subiendo archivo"
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-700 hover:bg-accent-800 text-white text-[11px] font-semibold rounded-xl shadow-xs transition cursor-pointer"
                                >
                                  <UploadCloud size={13} />
                                  <span>Reemplazar</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openRenameModalForPreset(item)}
                                  title="Cambiar nombre de la imagen"
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium rounded-xl border border-slate-200 transition cursor-pointer"
                                >
                                  <Edit3 size={13} className="text-amber-600" />
                                  <span>Renombrar</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openDeleteModalForPreset(item)}
                                  title="Eliminar archivo de imagen"
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-medium rounded-xl border border-red-200 transition cursor-pointer"
                                >
                                  <Trash2 size={13} />
                                  <span>Borrar</span>
                                </button>

                                {isOverridden && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      resetImage(item.path);
                                      showToast(`Imagen ${item.name} restablecida a la versión original.`);
                                    }}
                                    title="Restablecer a versión original"
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-medium rounded-xl border border-amber-200 transition cursor-pointer"
                                  >
                                    <RotateCcw size={12} />
                                    <span>Restablecer</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* GRID VIEW FOR SECTION */
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map((item) => {
                          const currentUrl = getImageUrl(item.path);
                          const isOverridden = !!imageOverrides[item.path];
                          const isHovered = dragOverPath === item.path;

                          return (
                            <div
                              key={item.id}
                              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs ${isHovered
                                  ? "border-accent-700 ring-2 ring-accent-700/20 bg-accent-50/10"
                                  : isOverridden
                                    ? "border-amber-300 bg-amber-50/10 shadow-sm"
                                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                                }`}
                            >
                              {/* Top Info Header */}
                              <div className="p-4 space-y-2 border-b border-slate-100">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                                      {item.pageName}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md bg-accent-50 border border-accent-200 text-accent-800 text-[10px] font-semibold">
                                      {item.section}
                                    </span>
                                  </div>
                                  {isOverridden ? (
                                    <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-bold shrink-0">
                                      Modificada
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-500 text-[10px] shrink-0">
                                      Original
                                    </span>
                                  )}
                                </div>

                                <div>
                                  <h3 className="text-[11px] font-semibold text-slate-800">{item.name}</h3>
                                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{item.description}</p>
                                </div>

                                <div className="flex items-center justify-between gap-2 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-200">
                                  <code className="text-[10px] text-slate-600 truncate">public{item.path}</code>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(item.path)}
                                    title="Copiar ruta"
                                    className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                                  >
                                    {copiedPath === item.path ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                  </button>
                                </div>
                              </div>

                              {/* Image Preview & Dropzone */}
                              <div
                                onClick={() => openReplaceModal(item)}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragOverPath(item.path);
                                }}
                                onDragLeave={() => setDragOverPath(null)}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  setDragOverPath(null);
                                  const file = e.dataTransfer.files?.[0];
                                  if (file) handleReplaceFile(item.path, file);
                                }}
                                className="relative h-44 bg-slate-100 flex flex-col items-center justify-center p-3 text-center group cursor-pointer border-b border-slate-200"
                              >
                                <img
                                  src={currentUrl}
                                  alt={item.name}
                                  className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />

                                <div
                                  className={`absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 transition-opacity ${isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    }`}
                                >
                                  <UploadCloud
                                    size={32}
                                    className={`mb-2 ${isHovered ? "text-emerald-400 animate-bounce" : "text-white"}`}
                                  />
                                  <span className="text-xs font-semibold text-white">
                                    {isHovered ? "¡Suelta la imagen aquí!" : "Haz clic para reemplazar la imagen"}
                                  </span>
                                  <span className="text-[10px] text-slate-300 mt-1">Escoge de public/ o sube un archivo</span>
                                </div>
                              </div>

                              {/* Bottom Actions */}
                              <div className="p-3 bg-slate-50/80 flex flex-wrap items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openReplaceModal(item)}
                                    title="Reemplazar imagen escogiendo de public/ o subiendo archivo"
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-accent-700 hover:bg-accent-800 text-white text-[11px] font-semibold rounded-lg shadow-xs transition cursor-pointer"
                                  >
                                    <UploadCloud size={12} />
                                    <span>Cambiar</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openRenameModalForPreset(item)}
                                    title="Cambiar nombre"
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium rounded-lg border border-slate-200 transition cursor-pointer"
                                  >
                                    <Edit3 size={12} className="text-amber-600" />
                                    <span>Renombrar</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openDeleteModalForPreset(item)}
                                    title="Borrar imagen"
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-medium rounded-lg border border-red-200 transition cursor-pointer"
                                  >
                                    <Trash2 size={12} />
                                    <span>Borrar</span>
                                  </button>
                                </div>

                                {isOverridden && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      resetImage(item.path);
                                      showToast(`Imagen ${item.name} restablecida a la versión original.`);
                                    }}
                                    title="Restablecer"
                                    className="flex items-center gap-1 px-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-medium rounded-lg border border-amber-200 transition cursor-pointer"
                                  >
                                    <RotateCcw size={11} />
                                    <span>Restablecer</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ---------------------------------------------------- */}
        {/* REPLACE IMAGE MODAL (Select from public/ or Upload)   */}
        {/* ---------------------------------------------------- */}
        {replaceModalItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <UploadCloud className="text-accent-700" size={22} />
                    Reemplazar Imagen: <span className="text-accent-700 font-semibold">{replaceModalItem.name}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Selecciona una imagen existente de la carpeta <code className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">public/</code> o sube un archivo nuevo.
                  </p>
                </div>
                <button
                  onClick={() => setReplaceModalItem(null)}
                  className="text-slate-400 hover:text-slate-800 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mode Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
                <button
                  type="button"
                  onClick={() => setReplaceModalTab("picker")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold border-b-2 transition cursor-pointer ${replaceModalTab === "picker"
                      ? "border-accent-700 bg-white text-accent-700 shadow-xs"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                  <Folder size={15} />
                  <span>Escoger de la Carpeta public/</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReplaceModalTab("upload")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold border-b-2 transition cursor-pointer ${replaceModalTab === "upload"
                      ? "border-accent-700 bg-white text-accent-700 shadow-xs"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                  <UploadCloud size={15} />
                  <span>Subir Archivo desde tu Equipo</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-white">
                {replaceModalTab === "picker" ? (
                  /* TAB 1: PICK FROM PUBLIC/ FOLDER */
                  <div className="space-y-4">
                    {/* Filters & Search */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {["all", ...availableFolders].map((fld) => (
                          <button
                            key={fld}
                            type="button"
                            onClick={() => setPickerFolder(fld)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${pickerFolder === fld
                                ? "bg-accent-700 text-white font-semibold shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                              }`}
                          >
                            {fld === "all" ? "Todas las Carpetas" : fld}
                          </button>
                        ))}
                      </div>

                      <div className="sm:ml-auto relative w-full sm:w-60">
                        <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Buscar imagen..."
                          value={pickerSearch}
                          onChange={(e) => setPickerSearch(e.target.value)}
                          className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-xl pl-9 pr-3 py-2 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/20 outline-none"
                        />
                      </div>
                    </div>

                    {/* Image Grid Selector */}
                    {publicImages.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 text-xs">
                        Cargando imágenes de public/...
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-80 overflow-y-auto p-1">
                        {publicImages
                          .filter((img) => {
                            const matchFld = pickerFolder === "all" || img.folder === pickerFolder;
                            const matchSrc =
                              pickerSearch.trim() === "" ||
                              img.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
                              img.relativePath.toLowerCase().includes(pickerSearch.toLowerCase());
                            return matchFld && matchSrc;
                          })
                          .map((img) => {
                            const isSelected = selectedPublicImagePath === img.relativePath;
                            return (
                              <button
                                key={img.relativePath}
                                type="button"
                                onClick={() => setSelectedPublicImagePath(img.relativePath)}
                                className={`relative group bg-white border rounded-xl overflow-hidden p-2 text-left transition cursor-pointer flex flex-col justify-between h-36 ${isSelected
                                    ? "border-accent-700 ring-2 ring-accent-700/30 bg-accent-50/50 shadow-md"
                                    : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                                  }`}
                              >
                                <div className="h-20 w-full flex items-center justify-center bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                                  <img
                                    src={img.relativePath}
                                    alt={img.name}
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                </div>
                                <div className="mt-1.5 space-y-0.5">
                                  <p className="text-[11px] font-semibold text-slate-800 truncate">{img.name}</p>
                                  <p className="text-[9px] text-slate-500 truncate">public{img.relativePath}</p>
                                </div>
                                {isSelected && (
                                  <div className="absolute top-2 right-2 bg-accent-700 text-white rounded-full p-1 shadow-md">
                                    <Check size={12} />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ) : (
                  /* TAB 2: UPLOAD FROM DEVICE */
                  <div className="py-6 space-y-4">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file && replaceModalItem) {
                          handleReplaceFile(replaceModalItem.path, file);
                          setReplaceModalItem(null);
                        }
                      }}
                      className="border-2 border-dashed border-slate-300 hover:border-accent-700 rounded-2xl p-10 text-center bg-slate-50 hover:bg-slate-100/50 transition cursor-pointer group"
                    >
                      <UploadCloud size={40} className="mx-auto mb-3 text-accent-700 group-hover:scale-110 transition" />
                      <p className="text-sm font-semibold text-slate-900">Haz clic o arrastra un archivo desde tu equipo</p>
                      <p className="text-xs text-slate-500 mt-1">Formatos soportados: PNG, JPG, WEBP, SVG</p>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && replaceModalItem) {
                            handleReplaceFile(replaceModalItem.path, file);
                            setReplaceModalItem(null);
                          }
                        }}
                        className="hidden"
                        id="replace-modal-file-input"
                      />
                      <label
                        htmlFor="replace-modal-file-input"
                        className="mt-4 inline-block px-4 py-2 bg-accent-700 hover:bg-accent-800 text-white text-xs font-semibold rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Examinar Archivos
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  {selectedPublicImagePath ? (
                    <span className="text-emerald-700 font-semibold truncate max-w-md block">
                      Seleccionado: public{selectedPublicImagePath}
                    </span>
                  ) : (
                    "Selecciona una imagen para continuar"
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReplaceModalItem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-200/80 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Cancelar
                  </button>

                  {replaceModalTab === "picker" && (
                    <button
                      type="button"
                      disabled={!selectedPublicImagePath}
                      onClick={() => {
                        if (replaceModalItem && selectedPublicImagePath) {
                          setCustomImageOverride(replaceModalItem.path, selectedPublicImagePath);
                          showToast(`Imagen ${replaceModalItem.name} reemplazada con public${selectedPublicImagePath}`);
                          setReplaceModalItem(null);
                        }
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-accent-700 hover:bg-accent-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer shadow-md shadow-accent-950/20"
                    >
                      Aplicar Reemplazo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* MODAL 1: EDIT IMAGE NAME (RENOMBRAR)                 */}
      {/* ---------------------------------------------------- */}
      {renameModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit3 size={18} className="text-accent-700" />
                Renombrar Archivo de Imagen
              </h3>
              <button
                onClick={() => setRenameModalItem(null)}
                className="text-slate-400 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="h-14 w-14 bg-white rounded border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={getImageUrl(renameModalItem.relativePath)}
                  alt={renameModalItem.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-semibold text-slate-500 block">Nombre actual:</span>
                <code className="text-xs text-accent-800 font-mono font-semibold block truncate">{renameModalItem.name}</code>
                <span className="text-[10px] text-slate-500 block truncate">Carpeta: public{renameModalItem.folder}</span>
              </div>
            </div>

            <form onSubmit={handleRenameSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Nuevo Nombre del Archivo
                </label>
                <input
                  type="text"
                  required
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  placeholder="ejemplo: mi-imagen-actualizada.png"
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:border-accent-700 focus:ring-2 focus:ring-accent-700/20 outline-none font-mono"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <span>
                  El archivo se renombrará físicamente en el disco dentro de <code className="text-amber-800 font-semibold">public{renameModalItem.folder}</code>. Conserva la extensión del archivo.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRenameModalItem(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isRenaming}
                  className="px-5 py-2.5 bg-accent-700 hover:bg-accent-800 text-white rounded-xl text-xs font-semibold shadow-md transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isRenaming && <RefreshCw size={14} className="animate-spin" />}
                  <span>{isRenaming ? "Renombrando..." : "Guardar Nuevo Nombre"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 2: DELETE IMAGE CONFIRMATION (BORRAR)          */}
      {/* ---------------------------------------------------- */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" />
                ¿Eliminar Imagen de public/?
              </h3>
              <button
                onClick={() => setDeleteModalItem(null)}
                className="text-slate-400 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-white rounded border border-red-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={getImageUrl(deleteModalItem.relativePath)}
                    alt={deleteModalItem.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-slate-900 truncate block">{deleteModalItem.name}</span>
                  <code className="text-xs text-red-700 font-mono font-semibold block truncate">public{deleteModalItem.relativePath}</code>
                  <span className="text-[10px] text-slate-500 block">{formatBytes(deleteModalItem.size)}</span>
                </div>
              </div>

              <p className="text-xs text-red-800 leading-relaxed font-medium">
                ⚠️ **Esta acción es irreversible**. El archivo se eliminará de forma permanente del disco duro en el servidor.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalItem(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-900/20 transition disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting && <RefreshCw size={14} className="animate-spin" />}
                <span>{isDeleting ? "Eliminando..." : "Eliminar Definitivamente"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 3: UPLOAD NEW IMAGE (SUBIR NUEVA IMAGEN)       */}
      {/* ---------------------------------------------------- */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus size={18} className="text-accent-700" />
                Subir Nueva Imagen a public/
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadNewSubmit} className="space-y-4">
              {/* Folder Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Carpeta de Destino en public/
                </label>
                <select
                  value={newImageFolder}
                  onChange={(e) => setNewImageFolder(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-accent-700 focus:ring-2 focus:ring-accent-700/20"
                >
                  <option value="/">/ (Directorio Raíz de public)</option>
                  {availableFolders.filter((f) => f !== "/").map((folder) => (
                    <option key={folder} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Filename (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Personalizado del Archivo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="ejemplo: mi-nueva-foto.png (Si se deja vacío usará el nombre original)"
                  value={newImageCustomName}
                  onChange={(e) => setNewImageCustomName(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent-700 focus:ring-2 focus:ring-accent-700/20 font-mono text-xs"
                />
              </div>

              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Seleccionar Archivo de Imagen
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${newImageFile
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-300 hover:border-accent-700 bg-slate-50 hover:bg-slate-100/50"
                    }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setNewImageFile(file);
                    }}
                    className="hidden"
                  />

                  {newImageFile ? (
                    <div className="space-y-2">
                      <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                      <span className="block text-xs font-bold text-slate-900">{newImageFile.name}</span>
                      <span className="block text-[10px] text-emerald-700 font-semibold">{formatBytes(newImageFile.size)}</span>
                      <span className="inline-block text-[10px] text-slate-500 underline">Haz clic para cambiar de archivo</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <UploadCloud size={36} className="mx-auto text-accent-700" />
                      <span className="block text-xs font-semibold text-slate-900">Haz clic o arrastra una imagen aquí</span>
                      <span className="block text-[10px] text-slate-500">PNG, JPG, WEBP, SVG, GIF (máx. 10MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isUploadingNew || !newImageFile}
                  className="px-5 py-2.5 bg-accent-700 hover:bg-accent-800 text-white rounded-xl text-xs font-semibold shadow-md shadow-accent-950/20 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isUploadingNew && <RefreshCw size={14} className="animate-spin" />}
                  <span>{isUploadingNew ? "Subiendo..." : "Subir a public/"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
