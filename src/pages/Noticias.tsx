import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  ExternalLink,
  ChevronRight,
  Newspaper,
  Sparkles,
  Share2,
  X,
  Check,
  ArrowRight,
  Clock,
} from "lucide-react";
import { fetchNoticias } from "../lib/noticiasService";
import type { Noticia } from "../types";

const CATEGORIES = ["Todas", "Institucional", "Admisión", "Académico", "Comunicados"];

const Noticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [activeArticle, setActiveArticle] = useState<Noticia | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchNoticias();
        setNoticias(data);
      } catch (err) {
        console.error("Error loading noticias:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filtered news items
  const filteredNoticias = useMemo(() => {
    return noticias.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [noticias, selectedCategory, searchQuery]);

  // Featured article (first featured or first item)
  const featuredArticle = useMemo(() => {
    if (selectedCategory !== "Todas" || searchQuery.trim() !== "") {
      return null;
    }
    return noticias.find((n) => n.featured) || noticias[0] || null;
  }, [noticias, selectedCategory, searchQuery]);

  // Regular grid articles (excluding featured if displayed)
  const gridArticles = useMemo(() => {
    if (featuredArticle && selectedCategory === "Todas" && searchQuery.trim() === "") {
      return filteredNoticias.filter((n) => n.id !== featuredArticle.id);
    }
    return filteredNoticias;
  }, [filteredNoticias, featuredArticle, selectedCategory, searchQuery]);

  const handleCopyShare = (article: Noticia) => {
    const url = article.sourceUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950 text-white py-16 md:py-24">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Glowing light accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-primary-200/80 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} className="text-primary-400" />
            <span className="text-accent-400 font-semibold">Noticias y Actualidad</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-accent-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles size={14} className="text-accent-400 animate-pulse" />
              <span>Prensa y Comunicación Oficial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Noticias y Novedades <span className="text-accent-400">CEPRUNSA</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-primary-100/90 leading-relaxed max-w-2xl">
              Entérate de las últimas informaciones sobre convocatorias, cronogramas de admisión,
              actividades académicas y la vida universitaria de la UNSA.
            </p>
          </div>

          {/* Search bar and Filters */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por palabra clave, título o contenido..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/95 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-lg shadow-black/10 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-accent-600 text-white shadow-md shadow-accent-950/30 scale-105"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA                                             */}
      {/* ============================================================ */}
      <main className="container-custom py-12 md:py-16 flex-1 space-y-12">
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent-600 border-t-transparent mb-4" />
            <p className="text-slate-500 font-medium">Cargando noticias y comunicados...</p>
          </div>
        ) : filteredNoticias.length === 0 ? (
          /* Empty state */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Newspaper size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">No se encontraron noticias</h2>
            <p className="text-slate-500 text-sm">
              No hay publicaciones que coincidan con &ldquo;{searchQuery}&rdquo; en la categoría seleccionada.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todas");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-700 hover:bg-accent-800 text-white text-sm font-semibold transition cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <>
            {/* ---------------------------------------------------- */}
            {/* FEATURED STORY HERO CARD                            */}
            {/* ---------------------------------------------------- */}
            {featuredArticle && (
              <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Image side */}
                  <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-slate-900">
                    <img
                      src={featuredArticle.imageUrl || "/images/home/home_image.jpeg"}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/home/home_image.jpeg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-accent-700/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                        Destacado
                      </span>
                      {featuredArticle.category && (
                        <span className="px-3 py-1 rounded-full bg-slate-900/80 text-primary-200 text-xs font-semibold backdrop-blur-md">
                          {featuredArticle.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Calendar size={14} className="text-accent-600" />
                        <span>{featuredArticle.date || "Fecha reciente"}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug group-hover:text-accent-700 transition-colors">
                        {featuredArticle.title}
                      </h2>

                      {featuredArticle.subtitle && (
                        <p className="text-sm font-semibold text-primary-700 leading-relaxed">
                          {featuredArticle.subtitle}
                        </p>
                      )}

                      <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                      <button
                        onClick={() => setActiveArticle(featuredArticle)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-700 hover:bg-accent-800 text-white font-semibold text-sm transition shadow-md shadow-accent-950/20 cursor-pointer"
                      >
                        <span>Leer nota completa</span>
                        <ArrowRight size={16} />
                      </button>

                      {featuredArticle.sourceUrl && (
                        <a
                          href={featuredArticle.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-accent-700 transition"
                          title="Ver enlace original"
                        >
                          <span>Fuente UNSA</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* GRID OF NEWS ARTICLES                                */}
            {/* ---------------------------------------------------- */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {selectedCategory === "Todas" ? "Todas las Publicaciones" : `Noticias: ${selectedCategory}`}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Mostrando {gridArticles.length} {gridArticles.length === 1 ? "artículo" : "artículos"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={article.imageUrl || "/images/home/home_image.jpeg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/home/home_image.jpeg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Category Badge */}
                      {article.category && (
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/85 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                          {article.category}
                        </span>
                      )}

                      {article.featured && (
                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-accent-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                          Destacado
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <Clock size={13} className="text-accent-600" />
                          <span>{article.date || "Fecha reciente"}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-accent-700 transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Subtitle / summary */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {article.subtitle || article.summary}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                        <button
                          onClick={() => setActiveArticle(article)}
                          className="inline-flex items-center gap-1.5 text-accent-700 hover:text-accent-800 transition cursor-pointer"
                        >
                          <span>Ver detalle</span>
                          <ChevronRight size={15} />
                        </button>

                        {article.sourceUrl && (
                          <a
                            href={article.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 transition"
                            title="Abrir fuente original"
                          >
                            <span>Fuente</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* ============================================================ */}
      {/* ARTICLE READER MODAL                                         */}
      {/* ============================================================ */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-900 shrink-0">
              <img
                src={activeArticle.imageUrl || "/images/home/home_image.jpeg"}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/home/home_image.jpeg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Category & Date on Image */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-white">
                <div className="flex items-center gap-2">
                  {activeArticle.category && (
                    <span className="px-3 py-1 rounded-full bg-accent-700 text-xs font-bold uppercase tracking-wider shadow">
                      {activeArticle.category}
                    </span>
                  )}
                  {activeArticle.featured && (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-xs font-bold uppercase tracking-wider text-slate-900 shadow">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
                  <Calendar size={14} />
                  <span>{activeArticle.date || "Fecha reciente"}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              {activeArticle.subtitle && (
                <p className="text-base sm:text-lg font-medium text-primary-800 leading-relaxed border-l-4 border-accent-600 pl-4 py-1 bg-accent-50/50 rounded-r-xl">
                  {activeArticle.subtitle}
                </p>
              )}

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {activeArticle.summary}
              </div>

              {activeArticle.content && activeArticle.content.trim() !== activeArticle.summary.trim() && (
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal pt-4 border-t border-slate-100">
                  {activeArticle.content}
                </div>
              )}

              {/* Actions & Source Bar */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleCopyShare(activeArticle)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
                  <span>{copiedLink ? "¡Enlace copiado!" : "Compartir noticia"}</span>
                </button>

                {activeArticle.sourceUrl && (
                  <a
                    href={activeArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-700 hover:bg-accent-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-accent-950/20 transition cursor-pointer"
                  >
                    <span>Ver publicación original</span>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Noticias;
