"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Users,
  Star,
  Award,
  Target,
  Zap,
  GraduationCap,
} from "lucide-react";
import { features, stats, testimonials } from "../data";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

    // Features animation
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      }
    );

    // Stats animation
    gsap.fromTo(
      ".stat-item",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      }
    );

    // Testimonials animation
    gsap.fromTo(
      ".testimonial-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-100 to-transparent rounded-full blur-3xl opacity-30"></div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-soft border border-primary-200 hover:shadow-medium transition-all duration-300">
                  <Award className="text-accent-600 mr-3" size={20} />
                  <span className="text-sm font-semibold text-gray-700">
                    Modalidad Oficial de Ingreso UNSA
                  </span>
                </div>
                <h1 className="hero-title font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-700 leading-tight">
                  Ingresa a la{" "}
                  <span className="text-accent-900 relative">UNSA</span> por{" "}
                  <span className="text-accent-900 relative">CEPRUNSA</span>
                </h1>
                <p className="hero-subtitle text-xl md:text-2xl text-secondary-600 leading-relaxed max-w-2xl">
                  Modalidad oficial de ingreso directo con preparación integral
                  en 10 semanas, 15 cursos especializados y tu propio examen de
                  admisión.
                </p>
              </div>
              <div className="hero-buttons">
                <Link
                  to="/programas"
                  className="btn-primary text-xl group inline-flex items-center"
                >
                  Ver Procesos CEPRUNSA
                  <Target
                    className="ml-3 group-hover:translate-x-1 transition-transform"
                    size={24}
                  />
                </Link>
              </div>
            </div>
            <div className="hero-image relative lg:col-span-3">
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
                {/* Simulated Image */}
                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-primary-100 via-accent-50 to-primary-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-10"></div>
                  <div className="text-center z-10">
                    <Users
                      className="text-primary-600 mx-auto mb-4"
                      size={64}
                    />
                    <h3 className="text-2xl font-bold text-primary-700 mb-2">
                      Estudiantes CEPRUNSA
                    </h3>
                    <p className="text-primary-600">
                      Preparándose para el examen de ingreso
                    </p>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <BookOpen className="text-accent-600" size={24} />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Target className="text-primary-600" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is CEPRUNSA Section */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="text-center ">
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
                  El examen de cococimeintos de CEPRUNSA se basa completamente
                  en el contenido académico que se desarrolla durante las 10
                  semanas de preparación. Esto significa que estudias
                  exactamente lo que te van a evaluar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="section-padding bg-gradient-to-b from-gray-50 to-white relative"
      >
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              ¿Por qué elegir <span className="text-accent-900">CEPRUNSA</span>?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Una modalidad de ingreso diseñada para maximizar tus posibilidades
              de éxito con preparación integral y especializada.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group relative">
                <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-accent-200 text-center h-full">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <feature.icon className="text-white" size={36} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-primary-700 mb-6 group-hover:text-accent-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="section-padding bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-xl"></div>
        </div>
        <div className="container-custom relative">
          <div className="text-center ">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
              CEPRUNSA en <span className="text-accent-300">números</span>
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              La modalidad de ingreso más efectiva para acceder a la Universidad
              Nacional de San Agustín
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/30">
                  <div className="text-4xl md:text-5xl font-bold text-accent-300 mb-3 group-hover:text-accent-200 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-primary-100 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="section-padding bg-white relative"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Estudiantes que ingresaron por{" "}
              <span className="text-accent-900">CEPRUNSA</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce las experiencias de quienes lograron ingresar a la UNSA a
              través de la modalidad CEPRUNSA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card group">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-primary-100 hover:border-accent-200 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-accent-500 fill-current group-hover:text-accent-600 transition-colors"
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-accent-600 text-sm font-medium">
                        {testimonial.career}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="container-custom text-center relative">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            ¿Listo para ingresar a la{" "}
            <span className="text-accent-300">UNSA</span> por{" "}
            <span className="text-accent-300">CEPRUNSA</span>?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Aprovecha esta modalidad oficial de ingreso directo con preparación
            especializada y tu propio examen.
          </p>
          <Link
            to="https://sisadmision.unsa.edu.pe/pregrado/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Inscríbete al Próximo Proceso
            <GraduationCap
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
