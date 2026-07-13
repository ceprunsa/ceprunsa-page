"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Calendar,
  Award,
  Star,
  ChevronRight,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  processes,
  processTimeline,
} from "../data";

gsap.registerPlugin(ScrollTrigger);

const Processes: React.FC = () => {
  const programsRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);
  const [expandedCourses, setExpandedCourses] = useState<Record<number, boolean>>({});
  const [expandedEligibility, setExpandedEligibility] = useState<Record<number, boolean>>({});

  const toggleCourses = (index: number) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleEligibility = (index: number) => {
    setExpandedEligibility((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getCurrentTimelineStep = () => {
    const month = new Date().getMonth() + 1; // 1-indexed (1 = Enero, 12 = Diciembre)
    if (month >= 4 && month <= 7) return 0; // Abril - Julio
    if (month >= 8 && month <= 11) return 1; // Agosto - Noviembre
    if (month === 12 || month === 1) return 2; // Diciembre - Enero
    if (month === 2) return 3; // Febrero
    return 0; // default (Marzo / etc)
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ".program-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: programsRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".comparison-card",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 80%",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden flex flex-col">
        {/* Full Width Image */}
        <div className="w-full relative z-10 shadow-2xl order-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh]">
          <img
            src="/ceprunsa_ciclo_quintos.png"
            alt="CEPRUNSA Ciclo Quintos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="container-custom relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 z-10 text-center order-2">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              Procesos{" "}
              <span className="text-accent-900 relative">CEPRUNSA</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              Modalidades de ingreso directo a la UNSA con preparación especializada y acompañamiento constante.
            </p>
            {/* Cronograma Anual Horizontal */}
            <div className="max-w-5xl mx-auto mt-12 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-soft">
              <h3 className="font-heading text-lg font-bold text-primary-700 mb-8 text-center uppercase tracking-wider">
                Cronograma Anual de Procesos
              </h3>
              
              <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
                {/* Connector Line (Desktop) */}
                <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 hidden md:block z-0">
                  <div 
                    className="h-full bg-accent-600 transition-all duration-500" 
                    style={{ width: `${(getCurrentTimelineStep() / 3) * 100}%` }}
                  />
                </div>

                {/* Timeline Items */}
                {processTimeline.map((item, index) => {
                  const isActive = index === getCurrentTimelineStep();
                  return (
                    <div 
                      key={index} 
                      className={`relative z-10 flex flex-col items-center text-center flex-1 md:px-2 transition-all duration-300 ${
                        isActive ? "scale-105" : "opacity-70 hover:opacity-90"
                      }`}
                    >
                      {/* Node Icon/Number */}
                      <div 
                        className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300 mb-4 shadow-md ${
                          isActive 
                            ? "bg-accent-600 border-accent-400 text-white shadow-glow-red scale-110" 
                            : "bg-white border-gray-200 text-gray-500 hover:border-accent-300"
                        }`}
                      >
                        <Calendar size={22} className={isActive ? "text-white animate-pulse" : "text-gray-400"} />
                        <span className="text-[10px] font-bold mt-1 uppercase tracking-tight">
                          {item.period.split(" - ")[0]}
                        </span>
                      </div>

                      {/* Content Card */}
                      <div className={`p-4 rounded-xl border transition-all duration-300 ${
                        isActive 
                          ? "bg-accent-50/50 border-accent-200 shadow-sm" 
                          : "bg-gray-50/30 border-transparent"
                      }`}>
                        <h4 className={`font-heading text-sm font-bold ${isActive ? "text-accent-950" : "text-gray-800"}`}>
                          {item.title}
                        </h4>
                        <p className={`text-xs font-semibold mt-1 ${isActive ? "text-accent-700" : "text-accent-600"}`}>
                          {item.period}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed max-w-[200px] mx-auto">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Nuestros <span className="text-accent-900">Procesos de Admisión</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compara y elige el proceso que se adapta a tu perfil académico y metas de ingreso directo.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {processes.map((process, index) => (
              <div
                key={index}
                className={`program-card relative group rounded-2xl transition-all duration-300 ${
                  process.recommended
                    ? "ring-2 ring-accent-400 shadow-glow-red hover:ring-accent-500 hover:shadow-glow"
                    : ""
                }`}
              >
                <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-soft hover:shadow-large border border-gray-100 hover:border-accent-200 transition-all duration-300 overflow-hidden h-full">
                  {/* Columna Izquierda - Metadatos */}
                  <div className="lg:w-1/4 p-6 lg:p-8 bg-gradient-to-br from-primary-50 to-accent-50/30 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
                    <div>
                      {process.recommended && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-600 text-white mb-4 animate-pulse-slow">
                          <Star size={12} fill="currentColor" /> Próximo a Iniciar
                        </span>
                      )}
                      <h3 className="font-heading text-2xl font-bold text-primary-700 mb-2 group-hover:text-accent-700 transition-colors">
                        {process.title}
                      </h3>
                      <p className="text-sm text-secondary-600 leading-relaxed">
                        {process.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/50">
                      <div className="flex items-center gap-2 text-primary-700">
                        <Clock size={16} className="text-accent-500" />
                        <span className="text-sm font-semibold">{process.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-secondary-600 mt-1">
                        <Calendar size={16} className="text-primary-500" />
                        <span className="text-xs font-medium">{process.schedule}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sección Central - Información Homogénea */}
                  <div className="flex-1 p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Cursos */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                        <BookOpen size={16} className="text-primary-600" /> Cursos
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          Prepárate con <strong className="font-bold text-primary-700">{process.courses.length} cursos especializados</strong>.
                        </p>
                        <button
                          onClick={() => toggleCourses(index)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-700 hover:text-accent-800 transition-colors focus:outline-none focus:ring-1 focus:ring-accent-500 rounded px-1.5 py-0.5"
                          aria-expanded={expandedCourses[index]}
                        >
                          {expandedCourses[index] ? "Ocultar cursos" : "Ver cursos"}
                          <ChevronDown size={14} className={`transform transition-transform duration-200 ${expandedCourses[index] ? "rotate-180" : ""}`} />
                        </button>
                        
                        {/* Lista de cursos desplegable */}
                        <div className={`transition-all duration-300 overflow-hidden ${expandedCourses[index] ? "max-h-60 mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                          <ul className="space-y-1.5 pl-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                            {process.courses.map((course, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5 py-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                                <span>{course}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Beneficios */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Award size={16} className="text-accent-600" /> Beneficios
                      </h4>
                      <ul className="space-y-2">
                        {process.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle size={14} className="text-success-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Público Apto */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Users size={16} className="text-primary-600" /> Público Apto
                      </h4>
                      <div className="space-y-2">
                        <div className="space-y-2">
                          {process.eligibility.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <ChevronRight size={14} className="text-accent-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {process.additionalEligibility && (
                          <div className="space-y-2">
                            <button
                              onClick={() => toggleEligibility(index)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-700 hover:text-accent-800 transition-colors focus:outline-none focus:ring-1 focus:ring-accent-500 rounded px-1.5 py-0.5 mt-1"
                              aria-expanded={expandedEligibility[index]}
                            >
                              {expandedEligibility[index] ? "Ocultar" : "Ver todos"}
                              <ChevronDown size={14} className={`transform transition-transform duration-200 ${expandedEligibility[index] ? "rotate-180" : ""}`} />
                            </button>

                            <div className={`transition-all duration-300 overflow-hidden ${expandedEligibility[index] ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1 pt-1">
                                {process.additionalEligibility.map((item, i) => (
                                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                    <ChevronRight size={14} className="text-accent-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha - Precio y CTA */}
                  <div className="lg:w-1/5 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50/50 flex flex-col justify-center items-center text-center">
                    <div className="mb-4">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-1">
                        {process.price}
                      </div>
                      <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full inline-block border border-gray-200/50">
                        {process.installments}
                      </div>
                    </div>
                    <Link
                      to="/contacto"
                      className={`w-full block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        process.recommended
                          ? "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                          : "bg-white border border-gray-200 hover:border-accent-200 text-gray-800 hover:text-accent-700 shadow-soft"
                      }`}
                    >
                      {process.recommended ? "Inscríbete Ahora" : "Más Información"}
                      <ChevronRight
                        className="inline ml-1.5 group-hover:translate-x-0.5 transition-transform"
                        size={14}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={comparisonRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              CEPRUNSA vs{" "}
              <span className="text-accent-900">Examen Ordinario</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce las ventajas de la modalidad CEPRUNSA frente al examen ordinario de admisión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="comparison-card">
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-10 rounded-2xl border border-accent-200 shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-accent-500 to-accent-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Award className="text-white" size={36} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-accent-900">
                    CEPRUNSA
                  </h3>
                  <p className="text-accent-700 font-medium">
                    Modalidad Oficial de Ingreso Directo
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-accent-600 flex-shrink-0 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">
                      Preparación específica de 10 semanas
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-accent-600 flex-shrink-0 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">
                      Examen basado en el avance académico
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-accent-600 flex-shrink-0 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">
                      15 cursos especializados
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-accent-600 flex-shrink-0 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">
                      Talleres de desarrollo personal
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-accent-600 flex-shrink-0 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">Vacantes exclusivas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle
                      className="text-accent-600 flex-shrink-0 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">
                      Seguimiento personalizado
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="comparison-card">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl border border-gray-200 shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-gray-400 to-gray-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BookOpen className="text-white" size={36} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-700">
                    Examen Ordinario
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Modalidad Tradicional
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-600">
                      Preparación independiente
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-600">
                      Temario general amplio
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-600">
                      Sin preparación específica
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-600">Mayor competencia</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-600">Vacantes limitadas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-600">
                      Sin seguimiento académico
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 rounded-2xl border border-primary-200 max-w-3xl mx-auto">
              <h3 className="font-heading text-2xl font-bold text-primary-700 mb-4 flex items-center justify-center">
                <Lightbulb className="mr-2 text-primary-500" size={24} />
                Diferencia Clave
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                CEPRUNSA es una modalidad oficial que te garantiza estudiar exactamente lo que te van a evaluar, mientras que el examen ordinario requiere preparación general sin certeza del contenido específico.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="container-custom text-center relative">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            ¿Listo para el próximo proceso CEPRUNSA?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            No pierdas la oportunidad de ingresar a la UNSA a través de esta modalidad oficial con preparación especializada.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contacto"
              className="bg-white text-accent-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Solicitar Información
              <ChevronRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
            <a
              href="tel:+51054123456"
              className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-accent-600 transition-all duration-300 transform hover:scale-105"
            >
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Processes;

