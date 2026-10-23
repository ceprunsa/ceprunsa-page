import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  X,
  Share2,
  Check,
} from "lucide-react";
import { fetchNoticias } from "../lib/noticiasService";
import type { Noticia } from "../types";

// Fallback news in case Supabase is offline or loading takes time
const fallbackNoticias: Noticia[] = [
  {
    id: "dd74fd50-390f-4181-9c8a-75e88a9e2319",
    title: "Apertura de Inscripciones - CEPRUNSA",
    subtitle: "Inicio del proceso de inscripciones para el Ciclo Quintos",
    date: "22 de octubre de 2026",
    imageUrl: "/images/procesos/ceprunsa_ciclo_quintos.png",
    summary:
      "Se comunica a la comunidad estudiantil y público en general que se da inicio al proceso de inscripciones para el CEPRUNSA Ciclo Quintos, dirigido a estudiantes de 5to de secundaria.",
    sourceUrl: "https://admision.unsa.edu.pe",
    category: "Convocatoria",
    featured: true,
  },
  {
    id: "0e080fc8-a6d6-4e3d-8ba6-35e61323d2ef",
    title: "CEPRUNSA ofrece 695 vacantes de ingreso directo en su segunda fase",
    subtitle: "Vacantes de ingreso directo a la Universidad Nacional de San Agustín",
    date: "Octubre de 2026",
    imageUrl: "/images/home/home_image.jpeg",
    summary:
      "Acceder a una de las vacantes de ingreso directo a la UNSA es la oportunidad que ofrece CEPRUNSA en sus diferentes programas profesionales.",
    sourceUrl: "https://www.unsa.edu.pe",
    category: "Admisión",
    featured: true,
  },
  {
    id: "67fee697-beb6-4a6e-aa6e-5bfe7205fe1e",
    title: "CEPRUNSA celebra 27 años y ostenta sello mundial de calidad",
    subtitle: "Acreditación y certificación de calidad internacional ISO 9001:2015",
    date: "22 de octubre de 2026",
    imageUrl: "/images/home/ceprunsa_local.jpeg",
    summary:
      "El centro preuniversitario de la UNSA renueva su compromiso de excelencia académica recibiendo la certificación ISO 9001:2015, validando sus procesos de formación.",
    sourceUrl: "https://admision.unsa.edu.pe",
    category: "Institucional",
    featured: true,
  },
];

export const HomeNoticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadNews = async () => {
      try {
        const data = await fetchNoticias();
        if (isMounted) {
          if (data && data.length > 0) {
            setNoticias(data.slice(0, 3));
          } else {
            setNoticias(fallbackNoticias);
          }
        }
      } catch (err) {
        console.error("Error loading home news:", err);
        if (isMounted) setNoticias(fallbackNoticias);
      }
    };
    loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopy = (noticia: Noticia) => {
    const url = noticia.sourceUrl || `${window.location.origin}/noticias`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const displayItems = noticias.length > 0 ? noticias.slice(0, 3) : fallbackNoticias;

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-100/90 via-slate-50 to-white border-b border-slate-200/70 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            {/* Title */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0E2F56]">
              Noticias <span className="text-[#6A1B29]">Recientes</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Mantente informado con los comunicados oficiales, convocatorias y novedades del centro preuniversitario.
            </p>
          </div>

          {/* Link to all news */}
          <div className="shrink-0">
            <Link
              to="/noticias"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-accent-700 hover:border-accent-600 hover:shadow-md transition-all duration-300 text-sm font-semibold group cursor-pointer"
            >
              <span>Ver todas las noticias</span>
              <ArrowRight size={16} className="text-accent-700 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* News Cards Grid: 3 concise items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayItems.map((item, index) => (
            <article
              key={item.id || index}
              onClick={() => setSelectedNoticia(item)}
              className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl || "/images/home/home_image.jpeg"}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/home/home_image.jpeg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Category Badge */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {item.category || "Institucional"}
                </span>

                {/* Date on image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-xs font-medium text-white/95 drop-shadow">
                  <Calendar size={13} className="text-accent-400" />
                  <span>{item.date || "Fecha reciente"}</span>
                </div>
              </div>

              {/* Text Body: Brief and Concise */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-accent-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.subtitle || item.summary}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-accent-700 group-hover:text-accent-800 transition">
                    <span>Leer más</span>
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">CEPRUNSA</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Quick View Article Modal */}
      {selectedNoticia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedNoticia(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-56 sm:h-72 w-full bg-slate-900 shrink-0">
              <img
                src={selectedNoticia.imageUrl || "/images/home/home_image.jpeg"}
                alt={selectedNoticia.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/home/home_image.jpeg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedNoticia(null)}
                aria-label="Cerrar modal"
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Category & Date on Image */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-white">
                <span className="px-3 py-1 rounded-full bg-accent-700 text-xs font-bold uppercase tracking-wider shadow">
                  {selectedNoticia.category || "Institucional"}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
                  <Calendar size={14} />
                  <span>{selectedNoticia.date || "Fecha reciente"}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 flex-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {selectedNoticia.title}
              </h2>

              {selectedNoticia.subtitle && (
                <p className="text-sm sm:text-base font-semibold text-primary-800 leading-relaxed border-l-4 border-accent-600 pl-3.5 py-1 bg-accent-50/60 rounded-r-lg">
                  {selectedNoticia.subtitle}
                </p>
              )}

              <div className="text-slate-700 text-sm leading-relaxed space-y-3 whitespace-pre-line font-normal">
                {selectedNoticia.summary}
              </div>

              {selectedNoticia.content && selectedNoticia.content.trim() !== selectedNoticia.summary.trim() && (
                <div className="text-slate-700 text-sm leading-relaxed space-y-3 whitespace-pre-line font-normal pt-3 border-t border-slate-100">
                  {selectedNoticia.content}
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleCopy(selectedNoticia)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
                  <span>{copiedLink ? "¡Enlace copiado!" : "Compartir noticia"}</span>
                </button>

                <div className="flex items-center gap-2">
                  {selectedNoticia.sourceUrl && (
                    <a
                      href={selectedNoticia.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition shadow-sm cursor-pointer"
                    >
                      <span>Fuente oficial</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  <Link
                    to="/noticias"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-700 hover:bg-accent-800 text-white text-xs sm:text-sm font-semibold transition shadow-sm shadow-accent-950/20 cursor-pointer"
                  >
                    <span>Ver más noticias</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeNoticias;
