"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Target, Users, ExternalLink, Zap } from "lucide-react";
import { achievements, teamMembers, methodologyItems } from "../data";
import ValuesCarousel from "../components/ValuesCarousel";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".about-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".values-carousel",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".history-image",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: historyRef.current,
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
              Sobre <span className="text-accent-900 relative">CEPRUNSA</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Más de 24 años formando a los futuros profesionales del Perú con
              excelencia académica, preparación especializada para el ingreso
              directo a la UNSA y compromiso social.
            </p>
          </div>
        </div>
      </section>

      {/* What is CEPRUNSA Section */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              ¿Qué es <span className="text-accent-900 relative">CEPRUNSA</span>
              ?
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-secondary-600 leading-relaxed mb-8">
                CEPRUNSA es una modalidad oficial de ingreso directo a la
                Universidad Nacional de San Agustín de Arequipa. A diferencia
                del examen ordinario, CEPRUNSA te prepara en{" "}
                <strong className="text-accent-700">
                  10 semanas intensivas
                </strong>{" "}
                en
                <strong className="text-accent-700">
                  {" "}
                  15 diferentes cursos
                </strong>{" "}
                para rendir el examen de admisión con vacantes exclusivas.
              </p>
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 rounded-2xl border border-primary-200 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-3 rounded-full">
                    <Zap className="text-white" size={28} />
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary-700 mb-4">
                  Ventaja Clave
                </h3>
                <p className="text-lg text-secondary-600">
                  El examen de conocimientos de CEPRUNSA se basa completamente
                  en el contenido académico que se desarrolla durante las 10
                  semanas de preparación. Esto significa que estudias
                  exactamente lo que te van a evaluar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section
        ref={aboutRef}
        className="section-padding bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="about-content">
              <h2 className="font-heading text-3xl font-bold text-primary-700 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-6">
                <p className="text-secondary-600 leading-relaxed text-lg">
                  CEPRUNSA fue fundado en el año{" "}
                  <strong className="text-accent-700">2000</strong> con el
                  objetivo de brindar una preparación de calidad a los
                  estudiantes que aspiran a ingresar a la Universidad Nacional
                  de San Agustín de Arequipa.
                </p>

                <p className="text-secondary-600 leading-relaxed text-lg">
                  Nuestro equipo está conformado por docentes especializados,
                  muchos de ellos egresados de la UNSA, que conocen a
                  profundidad los contenidos y metodologías necesarias para
                  superar el examen CEPRUNSA.
                </p>
                <p className="text-secondary-600 leading-relaxed text-lg">
                  Nuestra metodología de enseñanza ha evolucionado
                  constantemente, incorporando nuevas tecnologías y enfoques
                  pedagógicos, pero manteniendo siempre nuestro compromiso con
                  la excelencia académica.
                </p>
                <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-xl border border-accent-200">
                  <p className="text-secondary-700 font-medium">
                    CEPRUNSA esta comprometida con la mejora continua por ello
                    actualmente estamos en proceso de obtener la certificación{" "}
                    <strong className="text-accent-700">ISO 9001:2015 </strong>{" "}
                    para garantizar la calidad de nuestros servicios educativos.
                  </p>
                </div>
              </div>
            </div>
            <div ref={historyRef} className="history-image relative">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl border border-gray-100">
                {/* Simulated Image */}
                <div className="w-full h-[400px] bg-gradient-to-br from-primary-100 via-accent-50 to-primary-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-10"></div>
                  <div className="text-center z-10">
                    <Award
                      className="text-primary-600 mx-auto mb-4"
                      size={64}
                    />
                    <h3 className="text-2xl font-bold text-primary-700 mb-2">
                      25 Años de Historia
                    </h3>
                    <p className="text-primary-600">Preparando Postulantes</p>
                  </div>
                  {/* Timeline elements */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <div className="text-sm font-bold text-accent-600">
                      2000
                    </div>
                    <div className="text-xs text-gray-600">Fundación</div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <div className="text-sm font-bold text-accent-600">
                      2025
                    </div>
                    <div className="text-xs text-gray-600">Actualidad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Misión y <span className="text-accent-900">Visión</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los pilares fundamentales que guían nuestro compromiso educativo y
              definen nuestro rumbo institucional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-accent-200 h-full">
                <div className="bg-gradient-to-br from-accent-100 to-accent-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Target className="text-accent-600" size={36} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary-700 mb-6">
                  Nuestra Misión
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Brindar una preparación preuniversitaria que prepare a los
                  postulantes para el examen de admisión, también promueva la
                  adquisición de conocimientos y el desarrollo de competencias,
                  capacidades y aptitudes necesarias para tener éxito en los
                  estudios universitarios, incluyendo orientación vocacional y
                  apoyo emocional.
                </p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary-200 h-full">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Award className="text-primary-600" size={36} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary-700 mb-6">
                  Nuestra Visión
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Nos proyectamos como un centro líder en la preparación
                  preuniversitaria a nivel regional, reconocidos por nuestra
                  excelencia académica y compromiso con el desarrollo personal
                  de los estudiantes. Buscamos crear un ambiente de apoyo y guía
                  que permita a cada estudiante alcanzar su máximo potencial y
                  tomar decisiones informadas sobre su futuro académico y
                  profesional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Carousel */}
      <section
        ref={valuesRef}
        className="section-padding bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Los principios que guían nuestro trabajo y definen nuestra
              identidad institucional en la preparación CEPRUNSA.
            </p>
          </div>

          {/* Carousel container with responsive spacing */}
          <div className="values-carousel px-4 md:px-20 lg:px-24">
            <ValuesCarousel />
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-xl"></div>
        </div>
        <div className="container-custom relative">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-white">
              Nuestros Logros
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Números que respaldan nuestra trayectoria y compromiso con la
              modalidad CEPRUNSA
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/30">
                  <div className="bg-accent-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-400/30 transition-colors">
                    <achievement.icon className="text-accent-300" size={28} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-accent-300 mb-3 group-hover:text-accent-200 transition-colors">
                    {achievement.number}
                  </div>
                  <div className="text-primary-100 font-medium text-lg">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Nuestra <span className="text-accent-900">Metodología</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un sistema integral diseñado específicamente para el éxito en el
              examen CEPRUNSA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodologyItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 ${item.borderColor}`}
              >
                <div
                  className={`${item.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}
                >
                  <item.icon className={item.iconColor} size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-700 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-8 rounded-2xl border border-accent-200 max-w-3xl mx-auto">
              <h3 className="font-heading text-2xl font-bold text-primary-700 mb-4 flex items-center justify-center gap-2">
                <Target className="text-primary-700" size={24} />
                Ventaja Metodológica
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Nuestro examen se basa completamente en el avance académico
                realizado durante las 10 semanas. Esto garantiza que estudies
                exactamente lo que necesitas para ingresar a la UNSA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Nuestro <span className="text-accent-900">Equipo</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales altamente calificados comprometidos con la
              excelencia académica y tu éxito educativo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-accent-200 group"
              >
                {/* Profile Image or Icon */}
                <div className="relative mb-6">
                  {member.image ? (
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Users className="text-primary-600" size={36} />
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-heading text-lg font-bold text-primary-700 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-accent-600 font-semibold text-sm uppercase tracking-wide mb-4">
                    {member.role}
                  </p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed text-justify mb-6">
                  {member.description}
                </p>

                {/* CV Link */}
                {member.cvLink && (
                  <div className="text-center">
                    <a
                      href={member.cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 text-sm font-medium"
                    >
                      <span>Ver CV</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
