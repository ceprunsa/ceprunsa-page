"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, ExternalLink } from "lucide-react";
import { achievements, teamMembers } from "../data";
import ValuesCarousel from "../components/ValuesCarousel";
import { useConfig } from "../context/ConfigContext";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const { getImageUrl } = useConfig();
  const location = useLocation();
  const aboutRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash === "#conoce-mas" || window.location.hash === "#conoce-mas") {
      const el = document.getElementById("conoce-mas");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden flex flex-col">
        {/* Full Width Image */}
        <div className="w-full relative z-10 shadow-2xl order-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh]">
          <img
            src={getImageUrl("/images/nosotros/ceprunsa-local.jpg")}
            alt="CEPRUNSA Local Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="container-custom relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 z-10 text-center order-2">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              Sobre <span className="text-accent-900 relative">CEPRUNSA</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
              Con más de 24 años de trayectoria formando futuros profesionales con excelencia académica y compromiso social, CEPRUNSA es una modalidad oficial de ingreso directo a la Universidad Nacional de San Agustín de Arequipa. A través de una preparación intensiva de 10 semanas en 15 asignaturas, los postulantes compiten por vacantes exclusivas mediante evaluaciones basadas estrictamente en los contenidos desarrollados, garantizando que estudies exactamente lo que te van a evaluar.
            </p>
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
                  <strong className="text-accent-700">1999</strong> con el
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
              <div className="rounded-2xl bg-white p-3 shadow-large border border-primary-100 sm:p-4">
                <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[400px] group">
                  <img
                    src={getImageUrl("/images/nosotros/ceprunsa-local.jpg")}
                    alt="Instalaciones de CEPRUNSA en Arequipa"
                    width="848"
                    height="355"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <div className="text-sm font-bold text-accent-600">
                      1999
                    </div>
                    <div className="text-xs text-gray-600">Fundación</div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <div className="text-sm font-bold text-accent-600">
                      Hoy
                    </div>
                    <div className="text-xs text-gray-600">Actualidad</div>
                  </div>
                  <p className="absolute bottom-5 left-5 max-w-xs text-sm font-semibold text-white drop-shadow">
                    Más de dos décadas acompañando a postulantes de la región.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Options Section */}
      <section id="conoce-mas" className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Conoce más sobre <span className="text-accent-900">CEPRUNSA</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora los aspectos clave que definen nuestra excelencia e identidad institucional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Misión y Visión */}
            <Link
              to="/nosotros/mision-vision"
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 block h-72 sm:h-80 lg:h-96 border border-slate-100"
            >
              <img
                src={getImageUrl("/images/nosotros/mision-vision.jpg")}
                alt="Nuestra Misión y Visión"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3 z-10">
                <span className="text-yellow-400 font-extrabold text-3xl sm:text-4xl leading-none drop-shadow-md select-none group-hover:scale-110 transition-transform">
                  +
                </span>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wider leading-tight drop-shadow-md group-hover:text-yellow-300 transition-colors">
                  NUESTRA MISIÓN Y VISIÓN
                </h3>
              </div>
            </Link>

            {/* Card 2: Certificación ISO 9001:2015 */}
            <Link
              to="/nosotros/iso-9001"
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 block h-72 sm:h-80 lg:h-96 border border-slate-100"
            >
              <img
                src={getImageUrl("/images/nosotros/iso-9001.jpg")}
                alt="Certificación ISO 9001:2015"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3 z-10">
                <span className="text-yellow-400 font-extrabold text-3xl sm:text-4xl leading-none drop-shadow-md select-none group-hover:scale-110 transition-transform">
                  +
                </span>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wider leading-tight drop-shadow-md group-hover:text-yellow-300 transition-colors">
                  CERTIFICACIÓN ISO 9001:2015
                </h3>
              </div>
            </Link>

            {/* Card 3: Nuestra Metodología */}
            <Link
              to="/nosotros/metodologia"
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 block h-72 sm:h-80 lg:h-96 border border-slate-100"
            >
              <img
                src={getImageUrl("/images/nosotros/metodologia.jpg")}
                alt="Nuestra Metodología"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3 z-10">
                <span className="text-yellow-400 font-extrabold text-3xl sm:text-4xl leading-none drop-shadow-md select-none group-hover:scale-110 transition-transform">
                  +
                </span>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wider leading-tight drop-shadow-md group-hover:text-yellow-300 transition-colors">
                  NUESTRA METODOLOGÍA
                </h3>
              </div>
            </Link>
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
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              La modalidad de ingreso más efectiva para acceder a la Universidad Nacional de San Agustín
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group h-full">
                <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-gray-100 shadow-md h-full flex flex-col justify-center">
                  <div className="bg-accent-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <achievement.icon className="text-accent-700" size={28} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-accent-700 mb-3 tabular-nums">
                    {achievement.number}
                  </div>
                  <div className="text-primary-700 font-semibold text-lg">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-700 mb-4">
              Equipo de <span className="text-accent-900">Trabajo</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales altamente calificados comprometidos con la
              excelencia académica y tu éxito educativo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 max-w-6xl mx-auto items-start">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-4 transition-all duration-300"
              >
                {/* Profile Image or Icon */}
                <div className="relative mb-6">
                  {member.image ? (
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full mx-auto object-cover shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center mx-auto shadow-lg transition-transform duration-500 group-hover:scale-105">
                      <Users className="text-primary-600" size={64} />
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-accent-700 mb-1 leading-tight">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-xs mx-auto mb-4">
                  {member.description}
                </p>

                {/* CV Link */}
                {member.cvLink && (
                  <a
                    href={member.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 rounded-lg transition-colors duration-300 text-xs font-semibold shadow-xs"
                  >
                    <span>Ver CV en CONCYTEC</span>
                    <ExternalLink size={14} />
                  </a>
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
