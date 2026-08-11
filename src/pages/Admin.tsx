import React, { useState, useRef } from "react";
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
} from "lucide-react";
import { useConfig } from "../context/ConfigContext";

// Target image definitions with metadata for the Admin UI
interface ImageItem {
  id: string;
  name: string;
  category: "logos" | "home" | "headers" | "authorities";
  path: string;
  description: string;
}

const SITE_IMAGES: ImageItem[] = [
  // Logos
  {
    id: "logo-white",
    name: "Logo CEPRUNSA Blanco",
    category: "logos",
    path: "/logo-ceprunsa-white.png",
    description: "Logo del encabezado y pie de página en fondo oscuro",
  },
  {
    id: "logo-color",
    name: "Logo CEPRUNSA Color",
    category: "logos",
    path: "/logo-ceprunsa.png",
    description: "Logo institucional a color",
  },
  // Home & Banners
  {
    id: "banner-quintos",
    name: "Banner Ciclo Quintos",
    category: "home",
    path: "/ceprunsa_ciclo_quintos.png",
    description: "Banner destacado en Inicio y sección de Procesos",
  },
  {
    id: "home-estudiantes",
    name: "Estudiantes CEPRUNSA",
    category: "home",
    path: "/ceprunsa-estudiantes-demo.jpg",
    description: "Imagen de carrusel / hero en página de Inicio",
  },
  {
    id: "home-local",
    name: "Local CEPRUNSA",
    category: "home",
    path: "/ceprunsa_local.jpeg",
    description: "Foto del campus / local principal en Inicio",
  },
  // Headers de Páginas
  {
    id: "header-clases",
    name: "Header Acceso a Clases",
    category: "headers",
    path: "/acceso-clases-header.png",
    description: "Cabecera superior de la guía de clases virtuales",
  },
  {
    id: "header-pago",
    name: "Header Pago de Cuotas",
    category: "headers",
    path: "/pago-cuotas-header.png",
    description: "Cabecera superior de la guía de pagos",
  },
  {
    id: "header-documentos",
    name: "Header Documentos Oficiales",
    category: "headers",
    path: "/documentos-oficiales-header.png",
    description: "Cabecera superior del reglamento y vacantes",
  },
  {
    id: "header-psicologia",
    name: "Header Consultorio Psicológico",
    category: "headers",
    path: "/consultorio-psicologico-header.png",
    description: "Cabecera de la sección de apoyo psicológico",
  },
  // Autoridades
  {
    id: "auth-arnaldo",
    name: "Dr. Arnaldo Valdivia",
    category: "authorities",
    path: "/DR-ARNALDO.jpg",
    description: "Foto de la autoridad institucional en Nosotros",
  },
  {
    id: "auth-maria",
    name: "Dra. María Elena",
    category: "authorities",
    path: "/DRA-MARIA-ELENA-2.jpg",
    description: "Foto de la autoridad institucional en Nosotros",
  },
  {
    id: "auth-jose",
    name: "Dr. José",
    category: "authorities",
    path: "/DR-JOSE.jpg",
    description: "Foto de la autoridad institucional en Nosotros",
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

  // Tabs state
  const [activeTab, setActiveTab] = useState<"config" | "images">("config");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [carreraSearch, setCarreraSearch] = useState("");

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Context config
  const { config, updateConfig, resetConfig, uploadImage, resetImage, resetAllImages, getImageUrl, imageOverrides } =
    useConfig();

  // Local config form state
  const [formConfig, setFormConfig] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  // Sync formConfig with config when context loads or updates
  React.useEffect(() => {
    setFormConfig(config);
  }, [config]);

  // Drag hover states for dropzones
  const [dragOverPath, setDragOverPath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customTargetPublicPath, setCustomTargetPublicPath] = useState("");

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
      showToast("Configuración guardada exitosamente y actualizada en todo el sitio.");
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

  const handleDropFile = async (targetPath: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Por favor arrastra un archivo de imagen válido (.jpg, .png, .jpeg, .webp, .svg)", "error");
      return;
    }

    showToast(`Guardando imagen en public${targetPath}...`);
    const success = await uploadImage(targetPath, file);
    if (success) {
      showToast(`Imagen reemplazada correctamente y guardada en public (${file.name})`);
    } else {
      showToast("Error al procesar la imagen.", "error");
    }
  };

  // Filtered images for tab 2
  const filteredImages = SITE_IMAGES.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      carreraSearch.trim() === "" ||
      item.name.toLowerCase().includes(carreraSearch.toLowerCase()) ||
      item.path.toLowerCase().includes(carreraSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Custom generic upload handler
  const handleCustomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = customTargetPublicPath.trim() || "/" + file.name;
    const formattedPath = path.startsWith("/") ? path : "/" + path;
    await handleDropFile(formattedPath, file);
    setCustomTargetPublicPath("");
  };

  // ----------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-800 to-primary-600 shadow-lg text-white mb-2">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Acceso Administrativo</h1>
            <p className="text-sm text-slate-400">Ingresa tus credenciales para administrar CEPRUNSA</p>
          </div>

          {loginError && (
            <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm animate-fade-in">
              <AlertCircle size={18} className="shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
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
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
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
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-600 hover:to-primary-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-primary-700/30 transition-all duration-200 cursor-pointer text-sm"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-700/50">
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-bounce ${toastMessage.type === "success"
              ? "bg-emerald-900/90 border-emerald-500/50 text-emerald-200"
              : "bg-red-900/90 border-red-500/50 text-red-200"
            }`}
        >
          {toastMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Panel de Administración</h1>
              <p className="text-xs text-slate-400">Gestión de CEPRUNSA - config.ts e imágenes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Administrador Activo
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-sm font-medium transition cursor-pointer"
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
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${activeTab === "config"
                ? "bg-primary-700 text-white shadow-lg shadow-primary-900/40"
                : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            <Settings size={18} />
            <span>Configuración Global (config.ts)</span>
          </button>

          <button
            onClick={() => setActiveTab("images")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${activeTab === "images"
                ? "bg-primary-700 text-white shadow-lg shadow-primary-900/40"
                : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            <ImageIcon size={18} />
            <span>Gestión de Imágenes (Drag & Drop)</span>
            {Object.keys(imageOverrides).length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                {Object.keys(imageOverrides).length} editadas
              </span>
            )}
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: CONFIGURATION EDITOR (config.ts)              */}
        {/* ---------------------------------------------------- */}
        {activeTab === "config" && (
          <form onSubmit={handleSaveConfig} className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileCode className="text-primary-400" size={22} />
                    Editar Parámetros de `src/data/config.ts`
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Los cambios guardados aquí actualizarán los contactos y estados en todo el sitio web al instante.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetConfig}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Restablecer
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-600 hover:to-primary-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-900/50 transition cursor-pointer disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </div>

              {/* Grid Section 1: Process & Psychological Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Process Selection */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm">
                    <Building size={18} />
                    <span>Proceso Académico Prioritario (nextProcessToStart)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Define cuál proceso de admisión se resalta como "Próximo a iniciar" en el banner de Inicio.
                  </p>

                  <select
                    value={formConfig.nextProcessToStart}
                    onChange={(e) => handleConfigChange("nextProcessToStart", Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition"
                  >
                    <option value={1}>1 - CEPRUNSA I Fase</option>
                    <option value={2}>2 - CEPRUNSA Ciclo Quintos</option>
                    <option value={3}>3 - CEPRUNSA II Fase</option>
                    <option value={4}>4 - Proceso Extraordinario</option>
                  </select>
                </div>

                {/* Consultorio Psicológico Switch */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm">
                    <HelpCircle size={18} />
                    <span>Estado del Consultorio Psicológico (psychologyServiceActive)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Habilita o deshabilita la atención y botones de reserva del Consultorio Psicológico.
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleConfigChange("psychologyServiceActive", !formConfig.psychologyServiceActive)
                      }
                      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formConfig.psychologyServiceActive ? "bg-emerald-600" : "bg-slate-700"
                        }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${formConfig.psychologyServiceActive ? "translate-x-7" : "translate-x-0"
                          }`}
                      />
                    </button>

                    <span
                      className={`text-sm font-semibold ${formConfig.psychologyServiceActive ? "text-emerald-400" : "text-slate-400"
                        }`}
                    >
                      {formConfig.psychologyServiceActive ? "Servicio Activo" : "Servicio Inactivo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid Section 2: Contact Numbers */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Phone size={18} className="text-primary-400" />
                  <span>Números de Contacto</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">
                      WhatsApp Atención Principal
                    </label>
                    <input
                      type="text"
                      value={formConfig.whatsappNumber}
                      onChange={(e) => handleConfigChange("whatsappNumber", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">
                      WhatsApp Psicología
                    </label>
                    <input
                      type="text"
                      value={formConfig.whatsappPsychologyNumber}
                      onChange={(e) => handleConfigChange("whatsappPsychologyNumber", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">Teléfono Fijo Oficina</label>
                    <input
                      type="text"
                      value={formConfig.phoneNumber}
                      onChange={(e) => handleConfigChange("phoneNumber", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">Anexo Telefónico</label>
                    <input
                      type="text"
                      value={formConfig.phoneAnnex}
                      onChange={(e) => handleConfigChange("phoneAnnex", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Section 3: Email Addresses */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Mail size={18} className="text-primary-400" />
                  <span>Correos Electrónicos</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">Correo Institucional</label>
                    <input
                      type="email"
                      value={formConfig.emailInstitutional}
                      onChange={(e) => handleConfigChange("emailInstitutional", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">Atención al Cliente</label>
                    <input
                      type="email"
                      value={formConfig.emailClientQuery}
                      onChange={(e) => handleConfigChange("emailClientQuery", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1.5">Atención al Postulante</label>
                    <input
                      type="email"
                      value={formConfig.emailApplicantQuery}
                      onChange={(e) => handleConfigChange("emailApplicantQuery", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: DRAG & DROP IMAGE MANAGER                      */}
        {/* ---------------------------------------------------- */}
        {activeTab === "images" && (
          <div className="space-y-6">
            {/* Header & Controls Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <UploadCloud className="text-primary-400" size={22} />
                    Gestor de Imágenes de Páginas (Drag & Drop)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Arrastra una nueva imagen sobre cualquiera de los recuadros para reemplazar la foto original en las
                    páginas del sitio y guardarla en <code className="text-amber-300">public/</code>.
                  </p>
                </div>

                {Object.keys(imageOverrides).length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("¿Deseas restablecer TODAS las imágenes reemplazadas a sus versiones originales?")) {
                        resetAllImages();
                        showToast("Todas las imágenes fueron restablecidas.");
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Restablecer Todas las Imágenes
                  </button>
                )}
              </div>

              {/* Category Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "Todas" },
                    { id: "logos", label: "Logos" },
                    { id: "home", label: "Inicio-Carrusel" },
                    { id: "headers", label: "Encabezados Páginas" },
                    { id: "authorities", label: "Autoridades" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${selectedCategory === cat.id
                          ? "bg-primary-700 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="sm:ml-auto relative w-full sm:w-64">
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar imagen por nombre..."
                    value={carreraSearch}
                    onChange={(e) => setCarreraSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Custom Generic Drag & Drop Upload Zone */}
            <div className="bg-slate-900/60 border border-dashed border-slate-700 hover:border-primary-500 rounded-2xl p-5 transition space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <UploadCloud size={16} className="text-primary-400" />
                    Subir Cualquier Imagen Personalizada a <code className="text-amber-300 text-xs">/public</code>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Si quieres subir un nuevo archivo a la carpeta public con un nombre específico:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nombre en public (ej: mi-foto.png)"
                    value={customTargetPublicPath}
                    onChange={(e) => setCustomTargetPublicPath(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none w-56"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 bg-primary-700 hover:bg-primary-600 text-white text-xs font-semibold rounded-xl cursor-pointer transition shrink-0"
                  >
                    Seleccionar Archivo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCustomUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Grid of Editable Site Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredImages.map((item) => {
                const currentUrl = getImageUrl(item.path);
                const isOverridden = !!imageOverrides[item.path];
                const isHovered = dragOverPath === item.path;

                return (
                  <div
                    key={item.id}
                    className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between ${isHovered
                        ? "border-primary-500 ring-2 ring-primary-500/40 bg-slate-800"
                        : isOverridden
                          ? "border-amber-500/60 bg-slate-900/90 shadow-amber-900/10 shadow-lg"
                          : "border-slate-800"
                      }`}
                  >
                    {/* Top Info */}
                    <div className="p-4 space-y-1 border-b border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{item.name}</span>
                        {isOverridden ? (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                            Modificada
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-400 text-[10px]">
                            Original
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{item.description}</p>
                      <code className="block text-[10px] text-slate-500 truncate bg-slate-950 px-2 py-1 rounded">
                        public{item.path}
                      </code>
                    </div>

                    {/* Image Preview & Dropzone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverPath(item.path);
                      }}
                      onDragLeave={() => setDragOverPath(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverPath(null);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleDropFile(item.path, file);
                      }}
                      className="relative h-44 bg-slate-950 flex flex-col items-center justify-center p-3 text-center group cursor-pointer border-b border-slate-800"
                    >
                      {/* Image element preview */}
                      <img
                        src={currentUrl}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                        onError={(e) => {
                          // Fallback if image fails to display
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />

                      {/* Drop Overlay */}
                      <div
                        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 transition-opacity ${isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                      >
                        <UploadCloud
                          size={32}
                          className={`mb-2 ${isHovered ? "text-emerald-400 animate-bounce" : "text-primary-400"}`}
                        />
                        <span className="text-xs font-semibold text-white">
                          {isHovered ? "¡Suelta el archivo aquí!" : "Arrastra y suelta tu imagen aquí"}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1">o haz clic para explorar</span>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDropFile(item.path, file);
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-3 bg-slate-950/60 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500 truncate">Soporta PNG, JPG, WEBP</span>

                      {isOverridden && (
                        <button
                          onClick={() => {
                            resetImage(item.path);
                            showToast(`Imagen ${item.name} restablecida a la versión original.`);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium rounded-lg transition cursor-pointer"
                        >
                          <RotateCcw size={12} />
                          Restablecer
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
