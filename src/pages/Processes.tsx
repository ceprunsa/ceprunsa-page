"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Target,
  Calendar,
  Award,
  Star,
  ChevronRight,
  Zap,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  processes,
  extraordinaryRequirements,
  extraordinaryPreparation,
  processTimeline,
} from "../data";

gsap.registerPlugin(ScrollTrigger);

const Processes: React.FC = () => {
  const programsRef = useRef<HTMLElement>(null);
  const modalitiesRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
      ".modality-card",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: modalitiesRef.current,
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
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="container-custom relative">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              Procesos{" "}
              <span className="text-accent-900 relative">CEPRUNSA</span> 2024
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              Modalidad oficial de ingreso directo a la UNSA con tres procesos
              anuales y preparación especializada.
            </p>
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-8 rounded-2xl border border-accent-200 max-w-4xl mx-auto shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-3 rounded-full mr-4">
                  <Award className="text-white" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-accent-900">
                  Ventaja CEPRUNSA
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                A diferencia del examen ordinario, CEPRUNSA te prepara
                específicamente para tu propio examen de admisión. El examen se
                basa completamente en el contenido académico desarrollado
                durante las 10 semanas de preparación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Procesos Regulares{" "}
              <span className="text-accent-900">CEPRUNSA</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tres oportunidades anuales con preparación integral de 10 semanas
              y 15 cursos especializados.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {processes.map((process, index) => (
              <div
                key={index}
                className={`program-card relative group ${
                  process.recommended
                    ? "ring-2 ring-accent-400 shadow-glow-red rounded-2xl hover:ring-accent-500 hover:shadow-glow-blue"
                    : ""
                }`}
              >
                <div className="bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-accent-200 h-full overflow-hidden">
                  {process.recommended && (
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-4 text-sm font-semibold text-center relative">
                      <div className="flex items-center justify-center">
                        <Star className="mr-2" size={16} />
                        Proceso proximo a Iniciar
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-2xl font-bold text-primary-700 group-hover:text-accent-700 transition-colors">
                        {process.title}
                      </h3>
                      <span className="text-center bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold shadow-soft">
                        {process.duration}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-6 bg-gray-50 p-4 rounded-xl">
                      <Calendar size={20} className="mr-3 text-accent-500" />
                      <span className="text-sm font-medium">
                        {process.schedule}
                      </span>
                    </div>

                    <p className="text-secondary-600 mb-8 leading-relaxed text-lg">
                      {process.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                        <Zap className="mr-2 text-accent-500" size={20} />
                        Incluye:
                      </h4>
                      <ul className="space-y-3">
                        {process.features
                          .slice(0, 4)
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle
                                className="text-success-500 flex-shrink-0 mt-1"
                                size={18}
                              />
                              <span className="text-gray-700 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                          {process.price}
                        </div>
                        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                          {process.installments}
                        </div>
                      </div>
                      <Link
                        to="/contacto"
                        className={`w-full block text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 group ${
                          process.recommended
                            ? "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-soft hover:shadow-medium"
                        }`}
                      >
                        {process.recommended
                          ? "Inscríbete Ahora"
                          : "Más Información"}
                        <ChevronRight
                          className="inline ml-2 group-hover:translate-x-1 transition-transform"
                          size={16}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extraordinary Process Section */}
      <section
        ref={modalitiesRef}
        className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 relative"
      >
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Proceso <span className="text-accent-900">Extraordinario</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Modalidad especial con preparación intensiva de 3 semanas y 3
              cursos para casos específicos con requisitos especiales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className="modality-card">
              <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-accent-200 h-full">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-accent-100 to-accent-200 p-4 rounded-2xl mr-4">
                    <Users className="text-accent-600" size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary-700">
                    Requisitos para Postular
                  </h3>
                </div>
                <ul className="space-y-4">
                  {extraordinaryRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle
                        className="text-accent-600 flex-shrink-0 mt-1"
                        size={18}
                      />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Preparation */}
            <div className="modality-card">
              <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary-200 h-full">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl mr-4">
                    <BookOpen className="text-primary-600" size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary-700">
                    Preparación CEPRUNSA
                  </h3>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-primary-500" size={20} />
                    Modalidad Intensiva:
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-accent-50 to-accent-100 p-4 rounded-xl border border-accent-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="text-accent-600" size={20} />
                        <span className="font-semibold text-gray-900">
                          3 semanas de preparación
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200">
                      <div className="flex items-center space-x-3">
                        <Target className="text-primary-600" size={20} />
                        <span className="font-semibold text-gray-900">
                          3 cursos especializados
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-2 text-accent-500" size={20} />
                  Quiénes reciben preparación:
                </h4>
                <ul className="space-y-3">
                  {extraordinaryPreparation.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star
                        className="text-accent-500 flex-shrink-0 mt-1"
                        size={16}
                      />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 max-w-3xl mx-auto border border-gray-100">
              <div className="bg-gradient-to-r from-accent-500 to-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary-700 mb-4">
                Ventaja del Proceso Extraordinario
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Al igual que los procesos regulares, el examen del proceso
                extraordinario se basa completamente en el contenido académico
                desarrollado durante las 3 semanas de preparación intensiva.
              </p>
            </div>
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
              Conoce las ventajas de la modalidad CEPRUNSA frente al examen
              ordinario de admisión.
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
                CEPRUNSA es una modalidad oficial que te garantiza estudiar
                exactamente lo que te van a evaluar, mientras que el examen
                ordinario requiere preparación general sin certeza del contenido
                específico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Cronograma <span className="text-accent-900">CEPRUNSA</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Planifica tu preparación con nuestro cronograma anual de procesos
              CEPRUNSA.
            </p>
          </div>

          {/* Simulated Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-400 to-primary-400 rounded-full"></div>

            <div className="space-y-12">
              {processTimeline.map((process, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
                      <h3 className="font-heading text-xl font-bold text-primary-700 mb-2">
                        {process.title}
                      </h3>
                      <p className="text-accent-600 font-medium mb-2">
                        {process.period}
                      </p>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
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
            No pierdas la oportunidad de ingresar a la UNSA a través de esta
            modalidad oficial con preparación especializada.
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
