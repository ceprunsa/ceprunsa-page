"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  BookOpen,
  Calendar,
  Award,
  Star,
  ChevronRight,
  GraduationCap,
  Info,
  Lightbulb,
  Filter,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";
import { processes } from "../data";
import { useConfig } from "../context/ConfigContext";

gsap.registerPlugin(ScrollTrigger);

type TabType = "general" | "beneficios" | "cronograma" | "preparacion";
type AudienceFilter = "all" | "5to" | "egresados";

const Processes: React.FC = () => {
  const { config, getImageUrl } = useConfig();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>("all");
  const catalogRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Map processes so recommended matches config.nextProcessToStart dynamically
  const activeProcesses = processes.map((p, index) => ({
    ...p,
    recommended: index + 1 === config.nextProcessToStart,
  }));

  const selectedProcessId = searchParams.get("proceso");
  const perfilParam = searchParams.get("perfil");
  const selectedProcess = activeProcesses.find((p) => p.id === selectedProcessId) || null;

  // Sync audienceFilter with URL query parameter "perfil"
  useEffect(() => {
    if (perfilParam === "5to" || perfilParam === "egresados") {
      setAudienceFilter(perfilParam as AudienceFilter);
    } else if (!perfilParam) {
      setAudienceFilter("all");
    }
  }, [perfilParam]);

  // Reset tab when switching selected process
  useEffect(() => {
    setActiveTab("general");
    if (selectedProcess) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProcessId]);

  // Scrollspy: update active nav item as user scrolls through sections
  useEffect(() => {
    if (!selectedProcess) return;

    const sectionIds: TabType[] = ["general", "beneficios", "cronograma", "preparacion"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(`section-${id}`);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveTab(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedProcess]);

  // GSAP animation for catalog cards
  useEffect(() => {
    if (!selectedProcess) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".catalog-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    }
  }, [selectedProcess]);

  // Filter processes based on audience selection
  const filteredProcesses = activeProcesses.filter((p) => {
    if (audienceFilter === "5to") return p.id !== "extraordinario";
    if (audienceFilter === "egresados") return p.id !== "ciclo-quintos";
    return true;
  });

  const handleFilterChange = (id: AudienceFilter) => {
    setAudienceFilter(id);
    const newParams = new URLSearchParams(searchParams);
    if (id === "all") {
      newParams.delete("perfil");
    } else {
      newParams.set("perfil", id);
    }
    setSearchParams(newParams);
  };

  const handleSelectProcess = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("proceso", id);
    setSearchParams(newParams);
  };

  const handleBackToCatalog = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("proceso");
    setSearchParams(newParams);
  };

  // Scroll smoothly to section card when clicking menu item
  const handleNavClick = (tabId: TabType) => {
    setActiveTab(tabId);
    const element = document.getElementById(`section-${tabId}`);
    if (element) {
      const yOffset = -90; // Adjust for sticky header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Helper to select representative icon for each benefit
  const getBenefitIcon = (benefitText: string) => {
    const text = benefitText.toLowerCase();
    if (text.includes("simulacro") || text.includes("examen")) return FileText;
    if (text.includes("lectura") || text.includes("libro")) return BookOpen;
    if (text.includes("psicológic") || text.includes("taller")) return GraduationCap;
    if (text.includes("seminario")) return Users;
    return Sparkles;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Header Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          {selectedProcess ? (
            <div>
              <button
                onClick={handleBackToCatalog}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-200 border border-white/15 backdrop-blur-sm mb-6 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Volver al catálogo de procesos
              </button>

              {/* Individual Process Image Header Banner */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <img
                  src={getImageUrl(selectedProcess.image || "/ceprunsa_ciclo_quintos.png")}
                  alt={selectedProcess.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getImageUrl("/ceprunsa_ciclo_quintos.png");
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-950 font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg">
                    {selectedProcess.title}
                  </span>
                  {selectedProcess.recommended && (
                    <span className="px-4 py-2 rounded-full bg-accent-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg animate-pulse">
                      <Star size={16} className="fill-current text-yellow-300" /> Próximo a Iniciar
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-yellow-300 font-semibold text-xs uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
                Modalidad Oficial Virtual - Ingreso Directo UNSA
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Catálogo de Procesos <span className="text-yellow-400">CEPRUNSA</span>
              </h1>
              <p className="text-primary-100 text-base sm:text-lg leading-relaxed">
                Explora las modalidades y ciclos académicos diseñados para asegurar tu vacante directa en la Universidad Nacional de San Agustín de Arequipa.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      {!selectedProcess ? (
        /* ==================== CATALOG VIEW ==================== */
        <section ref={catalogRef} className="py-12 sm:py-16">
          <div className="container-custom">

            {/* Filter Control Bar (Brief and concise options) */}
            <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-soft border border-slate-200/80">
              <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm">
                <Filter size={18} className="text-accent-700" />
                <span>Filtrar por perfil:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {[
                  { id: "all", label: "Todos los procesos" },
                  { id: "5to", label: "5° de Secundaria" },
                  { id: "egresados", label: "Secundaria Completa" },
                ].map((option) => {
                  const isActive = audienceFilter === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleFilterChange(option.id as AudienceFilter)}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-primary-900 text-white shadow-md scale-[1.02]"
                          : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {filteredProcesses.map((process) => (
                <div
                  key={process.id}
                  className="catalog-card group bg-white rounded-3xl overflow-hidden shadow-medium hover:shadow-large border border-slate-200/80 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Header Visual Banner with CEPRUNSA palette */}
                  <div className="relative h-64 sm:h-72 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-yellow-400/20 blur-xl pointer-events-none" />
                    <div className="absolute right-4 bottom-0 w-44 h-44 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
                    <div className="absolute -left-10 bottom-0 w-36 h-36 rounded-full bg-primary-600/30 blur-lg pointer-events-none" />

                    {/* Top Row: Recommended Badge if applicable */}
                    <div className="relative z-10 flex items-start justify-end">
                      {process.recommended && (
                        <span className="px-3 py-1 rounded-full bg-accent-600 text-white font-semibold text-xs flex items-center gap-1 shadow-md">
                          <Star size={12} className="fill-current text-yellow-300" /> Próximo
                        </span>
                      )}
                    </div>

                    {/* Middle Title Area */}
                    <div className="relative z-10 my-auto pt-2">
                      <span className="text-yellow-400 font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase block mb-1">
                        CEPRE / CEPRUNSA
                      </span>
                      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-none drop-shadow-sm">
                        {process.shortTitle}
                      </h2>
                      <p className="text-primary-100 text-sm font-medium mt-2 italic">
                        {process.schedule}
                      </p>
                    </div>

                    {/* Bottom Date Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-4 py-1.5 rounded-full bg-accent-700 text-white font-bold text-xs uppercase tracking-wider shadow-md border border-accent-500">
                        {process.badge}
                      </span>
                      <span className="text-xs text-yellow-300 font-semibold uppercase tracking-wide">
                        MODALIDAD VIRTUAL
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 bg-slate-50/60 flex-1 flex flex-col justify-between border-t border-slate-100">
                    <div className="space-y-4">
                      {/* Target Audience */}
                      <div className="inline-block px-3 py-1 rounded-lg bg-primary-100 text-primary-800 font-bold text-xs uppercase tracking-wide">
                        {process.targetAudience}
                      </div>

                      {/* Main Title / Headline */}
                      <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                        {process.title}: Desarrolla tu potencial
                      </h3>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Clock size={16} className="text-accent-700 flex-shrink-0" />
                        <span><strong>Duración:</strong> {process.duration}</span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                        {process.description}
                      </p>
                    </div>

                    {/* Action Button ("Más información") */}
                    <div className="mt-8 pt-4 border-t border-slate-200/70 flex items-center justify-end">
                      <button
                        onClick={() => handleSelectProcess(process.id)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Más información
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CEPRUNSA vs Examen Ordinario Section */}
            <div className="mt-20">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-900 mb-3">
                  ¿Por qué elegir <span className="text-accent-700">CEPRUNSA</span>?
                </h2>
                <p className="text-slate-600 text-base">
                  Compara los beneficios directos que ofrece CEPRUNSA en su modalidad virtual.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CEPRUNSA Card */}
                <div className="bg-gradient-to-br from-primary-900 to-primary-800 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border border-primary-700">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-yellow-400 text-yellow-950 font-bold shadow-md">
                      <Award size={28} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white">CEPRUNSA VIRTUAL</h3>
                      <p className="text-yellow-300 text-sm font-semibold">Ingreso Directo a la UNSA</p>
                    </div>
                  </div>

                  <ul className="space-y-3.5 text-sm text-primary-100">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Evaluación continua en plataforma virtual basada en el avance del dictado.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Vacantes exclusivas reservadas únicamente para alumnos de CEPRUNSA.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Planta docente oficial de catedráticos de la Universidad Nacional de San Agustín.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Simulacros virtuales continuos y talleres de desarrollo psicológico y vocacional.</span>
                    </li>
                  </ul>
                </div>

                {/* Examen Ordinario Card */}
                <div className="bg-white text-slate-800 p-8 sm:p-10 rounded-3xl shadow-medium border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-700 font-bold">
                      <BookOpen size={28} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-slate-900">Examen Ordinario</h3>
                      <p className="text-slate-500 text-sm font-semibold">Modalidad Tradicional</p>
                    </div>
                  </div>

                  <ul className="space-y-3.5 text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
                      <span>Examen único decisivo sin evaluaciones continuas previas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
                      <span>Competencia general masiva con postulantes de diversas preparaciones.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
                      <span>Sin acompañamiento académico ni tutoría vocacional oficial.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
                      <span>Temario general amplio sin certezas de ponderación diaria por unidad.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ==================== DETAILED PROCESS VIEW ==================== */
        <section ref={detailRef} className="py-10 sm:py-14">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT SIDEBAR NAVIGATION MENU (Smooth scroll to section on click) */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* CTA Button: Inscríbete aquí */}
                <a
                  href="https://sisadmision.unsa.edu.pe/pregrado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-accent-700 via-accent-800 to-accent-900 hover:from-accent-600 hover:to-accent-800 text-white font-extrabold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-accent-600 group"
                >
                  <span>Inscríbete aquí</span>
                  <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Tabs Navigation Card */}
                <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
                  <div className="p-4 bg-slate-100/70 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Menú del Proceso
                  </div>
                  <nav className="divide-y divide-slate-100">
                    {[
                      { id: "general", number: "01", label: "Información general", icon: Info },
                      { id: "beneficios", number: "02", label: "Beneficios", icon: Award },
                      { id: "cronograma", number: "03", label: "Cronograma", icon: Calendar },
                      { id: "preparacion", number: "04", label: "Preparación", icon: BookOpen },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleNavClick(tab.id as TabType)}
                          className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-200 ${
                            isActive
                              ? "bg-primary-50 text-primary-950 border-l-4 border-primary-800 pl-4 font-bold shadow-inner"
                              : "text-slate-600 hover:bg-slate-50 hover:text-primary-800"
                          }`}
                        >
                          <span className="flex items-center gap-4">
                            <span
                              className={`font-heading font-black text-2xl sm:text-3xl tracking-tight transition-colors ${
                                isActive ? "text-accent-700" : "text-slate-300"
                              }`}
                            >
                              {tab.number}
                            </span>
                            <span className="flex items-center gap-2.5 text-sm sm:text-base font-semibold">
                              <Icon
                                size={18}
                                className={isActive ? "text-primary-800" : "text-slate-400"}
                              />
                              {tab.label}
                            </span>
                          </span>
                          <ChevronRight
                            size={18}
                            className={`transition-transform ${
                              isActive ? "text-primary-800 translate-x-1" : "text-slate-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Left Side Decorative Illustration Card */}
                <div className="bg-gradient-to-br from-accent-700 to-accent-900 text-white rounded-3xl p-6 shadow-medium relative overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="w-32 h-32 mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-2 shadow-inner">
                    <img
                      src={getImageUrl("/ceprunsa_estudiantes_demo.jpg")}
                      alt="CEPRUNSA Estudiante"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <GraduationCap size={48} className="text-yellow-300" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    ¡Asegura tu ingreso!
                  </h4>
                  <p className="text-xs text-accent-100 mt-1 leading-relaxed">
                    Preparación oficial garantizada por la Universidad Nacional de San Agustín.
                  </p>
                </div>
              </div>

              {/* RIGHT MAIN DETAILS PANEL (Renders cards for all sections with smooth scroll IDs) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Banner Card Header */}
                <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white rounded-3xl p-6 sm:p-10 shadow-medium overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-yellow-400/20 blur-2xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-yellow-400 font-heading font-extrabold text-xs uppercase tracking-widest block mb-1">
                        MODALIDAD VIRTUAL UNSA
                      </span>
                      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                        {selectedProcess.title}
                      </h2>
                      <p className="text-primary-100 text-sm font-medium mt-1">
                        {selectedProcess.schedule}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <span className="inline-block px-5 py-2 rounded-full bg-accent-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg border border-accent-500">
                        {selectedProcess.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Summary Data Table (Resumen Informativo del Proceso) */}
                <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 bg-slate-100/80 border-b border-slate-200 font-heading font-bold text-base text-primary-900 flex items-center justify-between">
                    <span>Resumen Informativo del Proceso</span>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                      MODALIDAD VIRTUAL
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
                      <span className="font-bold text-slate-900 sm:col-span-1">Inversión</span>
                      <span className="text-slate-700 font-semibold text-primary-900 sm:col-span-2">
                        {selectedProcess.details.inversion}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors bg-slate-50/30">
                      <span className="font-bold text-slate-900 sm:col-span-1">Último día de pago</span>
                      <span className="text-slate-700 font-semibold text-accent-700 sm:col-span-2">
                        {selectedProcess.details.ultimoDiaPago}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors bg-slate-50/30">
                      <span className="font-bold text-slate-900 sm:col-span-1">Modalidad</span>
                      <span className="text-slate-700 font-semibold text-primary-800 sm:col-span-2">
                        {selectedProcess.details.modalidad}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
                      <span className="font-bold text-slate-900 sm:col-span-1">Inicio de clases</span>
                      <span className="text-slate-700 font-semibold text-primary-800 sm:col-span-2">
                        {selectedProcess.details.inicioClases}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors bg-slate-50/30">
                      <span className="font-bold text-slate-900 sm:col-span-1">Fin de clases</span>
                      <span className="text-slate-700 sm:col-span-2">{selectedProcess.details.finClases}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
                      <span className="font-bold text-slate-900 sm:col-span-1">Horario de clases</span>
                      <div className="text-slate-700 sm:col-span-2 space-y-1">
                        <span className="font-semibold text-primary-900 block mb-1">
                          {selectedProcess.details.horarioClases.dias}
                        </span>
                        <ul className="space-y-1 pl-1">
                          {selectedProcess.details.horarioClases.turnos.map((turno, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-800 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-600 flex-shrink-0" />
                              <span>{turno}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION CARD 1: INFORMACIÓN GENERAL */}
                <div
                  id="section-general"
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 scroll-mt-24 transition-all duration-300"
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-3">
                        <Info className="text-primary-800" size={28} />
                        Información general
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-heading text-lg font-bold text-accent-700 mb-3">
                            ¿A quién está dirigido este programa?
                          </h4>
                          <ul className="space-y-3">
                            {selectedProcess.eligibility.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-700 text-base">
                                <CheckCircle size={18} className="text-accent-700 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                            {selectedProcess.additionalEligibility?.map((item, idx) => (
                              <li key={`add-${idx}`} className="flex items-start gap-3 text-slate-700 text-base">
                                <CheckCircle size={18} className="text-accent-700 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-heading text-lg font-bold text-accent-700 mb-2">
                            ¿En qué consiste este programa?
                          </h4>
                          <p className="text-slate-700 leading-relaxed text-base">
                            {selectedProcess.details.presentacion.enQueConsiste}
                          </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-primary-50/70 border border-primary-100 text-primary-950">
                          <h5 className="font-heading font-bold text-sm text-primary-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <Lightbulb size={18} className="text-yellow-600" /> Resumen Clave
                          </h5>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {selectedProcess.details.presentacion.resumen}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION CARD 2: BENEFICIOS */}
                <div
                  id="section-beneficios"
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 scroll-mt-24 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-3">
                      <Award className="text-accent-700" size={28} />
                      Beneficios
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProcess.benefits.map((benefit, idx) => {
                        const BenefitIcon = getBenefitIcon(benefit);
                        return (
                          <div
                            key={idx}
                            className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-primary-300 hover:shadow-soft transition-all flex items-center gap-4 group"
                          >
                            <div className="p-3.5 rounded-2xl bg-primary-100 text-primary-800 font-bold flex-shrink-0 group-hover:bg-accent-100 group-hover:text-accent-800 transition-colors shadow-sm">
                              <BenefitIcon size={24} />
                            </div>
                            <span className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                              {benefit}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* SECTION CARD 3: CRONOGRAMA */}
                <div
                  id="section-cronograma"
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 scroll-mt-24 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-3">
                      <Calendar className="text-primary-800" size={28} />
                      Cronograma
                    </h3>
                    <div className="relative border-l-2 border-primary-200 ml-4 space-y-8 py-2">
                      {selectedProcess.details.cronograma.map((item, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-700 ring-4 ring-white" />
                          <span className="text-xs font-bold text-accent-700 uppercase tracking-wider block mb-1">
                            {item.date}
                          </span>
                          <h4 className="font-heading text-lg font-bold text-slate-900">
                            {item.event}
                          </h4>
                          {item.detail && (
                            <p className="text-slate-600 text-sm mt-1">
                              {item.detail}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION CARD 4: PREPARACIÓN */}
                <div
                  id="section-preparacion"
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 scroll-mt-24 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-3">
                      <BookOpen className="text-accent-700" size={28} />
                      Preparación
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Plan curricular optimizado con {selectedProcess.courses.length} materias preparatorias impartidas por catedráticos universitarios:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProcess.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-accent-600 flex-shrink-0" />
                          <span className="text-slate-800 text-sm font-medium">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Processes;
