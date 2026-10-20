import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useConfig } from "../context/ConfigContext";

interface FlyerModalProps {
  imagePath?: string;
  targetUrl?: string;
  altText?: string;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({
  imagePath = "/images/procesos/flyer/ceprunsa-segunda-fase-flyer1.jpg",
  targetUrl = "/procesos?proceso=ceprunsa-2",
  altText = "Flyer informativo CEPRUNSA II Fase - Clic para ver detalles",
}) => {
  const { getImageUrl } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Open modal on mount with a smooth slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const resolvedImageSrc = getImageUrl(imagePath);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="flyer-popup-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
    >
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg my-auto transform transition-all duration-300 animate-scaleUp">
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-slate-800 hover:text-red-600 hover:bg-slate-50 shadow-2xl border-2 border-slate-100 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-accent-500/30"
          aria-label="Cerrar ventana informativa"
        >
          <X size={22} className="stroke-[2.5]" />
        </button>

        {/* Clickable Flyer Card */}
        <Link
          to={targetUrl}
          onClick={() => setIsOpen(false)}
          className="group block relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 hover:ring-accent-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-accent-500/20"
        >
          {/* Badge indicator */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-700/90 hover:bg-accent-600 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg border border-white/20">
            <Sparkles size={14} className="text-yellow-300 animate-pulse" />
            <span>NUEVO PROCESO</span>
          </div>

          {/* Flyer Image */}
          <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden max-h-[72vh] sm:max-h-[75vh]">
            <img
              src={resolvedImageSrc}
              alt={altText}
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-auto max-h-[72vh] sm:max-h-[75vh] object-contain transition-all duration-500 group-hover:scale-[1.02] ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            {!isLoaded && (
              <div className="h-96 w-full flex items-center justify-center text-slate-400">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-accent-600 border-t-transparent" />
              </div>
            )}
          </div>

          {/* Call-to-action bottom bar */}
          <div className="bg-gradient-to-r from-accent-700 via-accent-800 to-primary-900 px-4 py-3 sm:py-3.5 text-white flex items-center justify-between gap-3 border-t border-white/10 group-hover:from-accent-600 group-hover:to-primary-800 transition-colors">
            <div className="text-left">
              <span id="flyer-popup-title" className="block text-xs uppercase tracking-wider text-accent-200 font-semibold">
                CEPRUNSA II Fase 2027
              </span>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">
                Haz clic para ver requisitos y cronograma
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-accent-700 transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FlyerModal;
