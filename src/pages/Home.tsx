"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Star,
  Award,
  Target,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react";
import { features, stats, testimonials } from "../data";

gsap.registerPlugin(ScrollTrigger);

interface CarouselItem {
  type: "countdown" | "image";
  title: string;
  description: string;
  image?: string;
  eventDate?: string;
  eventTitle?: string;
}

const carouselItems: CarouselItem[] = [
  {
    type: "countdown",
    title: "Próxima Apertura de Inscripciones",
    description: "CEPRUNSA I Fase 2024 - No te pierdas esta oportunidad",
    eventDate: "2025-07-14T00:00:00",
    eventTitle: "Inicio de Inscripciones CEPRUNSA I",
    image: "/placeholder.svg?height=400&width=600&text=Inscripciones+CEPRUNSA",
  },
  {
    type: "image",
    title: "Estudiantes CEPRUNSA",
    description:
      "Preparándose para el examen de ingreso con metodología especializada",
    image: "/placeholder.svg?height=400&width=600&text=Estudiantes+en+Clase",
  },
  {
    type: "image",
    title: "Laboratorios Especializados",
    description: "Instalaciones modernas para la preparación en ciencias",
    image: "/placeholder.svg?height=400&width=600&text=Laboratorio+de+Ciencias",
  },
  {
    type: "image",
    title: "Biblioteca Digital",
    description: "Acceso completo a banco de contenido digital por cada curso",
    image: "/placeholder.svg?height=400&width=600&text=Biblioteca+Digital",
  },
];

const CountdownTimer: React.FC<{
  targetDate: string;
  eventTitle: string;
  backgroundImage?: string;
}> = ({ targetDate, eventTitle, backgroundImage }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] relative overflow-hidden rounded-xl lg:rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={
            backgroundImage ||
            "/placeholder.svg?height=500&width=800&text=CEPRUNSA+Inscripciones"
          }
          alt="Inscripciones CEPRUNSA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/85 to-primary-900/90"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full">
        <Calendar className="text-white" size={18} />
      </div>
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full">
        <Clock className="text-white" size={18} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 leading-tight">
            {eventTitle}
          </h3>
          <p className="text-primary-100 text-sm sm:text-base lg:text-lg">
            Faltan:
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-none">
              {timeLeft.days}
            </div>
            <div className="text-xs sm:text-sm text-primary-100 mt-1">Días</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-none">
              {timeLeft.hours}
            </div>
            <div className="text-xs sm:text-sm text-primary-100 mt-1">
              Horas
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-none">
              {timeLeft.minutes}
            </div>
            <div className="text-xs sm:text-sm text-primary-100 mt-1">Min</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-none">
              {timeLeft.seconds}
            </div>
            <div className="text-xs sm:text-sm text-primary-100 mt-1">Seg</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm sm:text-base text-primary-100 opacity-90">
            ¡Prepárate para asegurar tu lugar en la UNSA!
          </p>
        </div>
      </div>
    </div>
  );
};

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 6000); // Increased to 6 seconds for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentItem = carouselItems[currentSlide];

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {currentItem.type === "countdown" &&
        currentItem.eventDate &&
        currentItem.eventTitle ? (
          <CountdownTimer
            targetDate={currentItem.eventDate}
            eventTitle={currentItem.eventTitle}
            backgroundImage={currentItem.image}
          />
        ) : (
          <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] relative overflow-hidden rounded-xl lg:rounded-2xl">
            <img
              src={currentItem.image || "/placeholder.svg?height=500&width=800"}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Floating elements for image slides */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg">
              <BookOpen className="text-accent-600" size={18} />
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg">
              <Target className="text-primary-600" size={18} />
            </div>

            {/* Content overlay for image slides */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">
                {currentItem.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-200 drop-shadow-md line-clamp-2">
                {currentItem.description}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 items-center justify-center"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 items-center justify-center"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={20} />
        </button>

        {/* Mobile swipe indicator */}
        <div className="sm:hidden absolute bottom-2 right-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-xs">Desliza →</span>
        </div>
      </div>

      {/* Slide Description - Only for non-countdown slides on mobile */}
      {currentItem.type !== "countdown" && (
        <div className="mt-3 sm:mt-4 text-center sm:hidden">
          <h4 className="text-base font-semibold text-primary-700 mb-1">
            {currentItem.title}
          </h4>
          <p className="text-secondary-600 text-sm line-clamp-2">
            {currentItem.description}
          </p>
        </div>
      )}

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-600 scale-110 shadow-md"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="text-center mt-2 sm:mt-3">
        <span className="text-xs sm:text-sm text-gray-500">
          {currentSlide + 1} de {carouselItems.length}
        </span>
      </div>
    </div>
  );
};

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
        ".hero-carousel",
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8 lg:col-span-2 order-2 lg:order-1">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-full shadow-soft border border-primary-200 hover:shadow-medium transition-all duration-300">
                  <Award className="text-accent-600 mr-2 lg:mr-3" size={18} />
                  <span className="text-xs lg:text-sm font-semibold text-gray-700">
                    Modalidad Oficial de Ingreso UNSA
                  </span>
                </div>
                <h1 className="hero-title font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-700 leading-tight">
                  Ingresa a la{" "}
                  <span className="text-accent-900 relative">UNSA</span> por{" "}
                  <span className="text-accent-900 relative">CEPRUNSA</span>
                </h1>
                <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-secondary-600 leading-relaxed max-w-2xl">
                  Modalidad oficial de ingreso directo con preparación integral
                  en 10 semanas, 15 cursos especializados y tu propio examen de
                  admisión.
                </p>
              </div>
              <div className="hero-buttons">
                <Link
                  to="/procesos"
                  className="btn-primary text-lg lg:text-xl group inline-flex items-center"
                >
                  Ver Procesos CEPRUNSA
                  <Target
                    className="ml-2 lg:ml-3 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Link>
              </div>
            </div>
            <div className="hero-carousel relative lg:col-span-3 order-1 lg:order-2">
              <HeroCarousel />
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
          <div className="text-center mb-16">
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
            to="/contacto"
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
