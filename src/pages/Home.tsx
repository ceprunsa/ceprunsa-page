"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  Award,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  CheckCircle,
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
    type: "image",
    title: "Preparación que se vive en equipo",
    description:
      "Aprendizaje activo, acompañamiento docente y objetivos claros.",
    image: "/ceprunsa-estudiantes-demo.jpg",
  },
  {
    type: "image",
    title: "Estudiantes CEPRUNSA",
    description:
      "Preparándose para el examen de ingreso con metodología especializada",
    image: "/home_image.jpeg",
  },
  {
    type: "image",
    title: "Conoce CEPRUNSA",
    description:
      "Un espacio de preparación conectado con la comunidad universitaria.",
    image: "/ceprunsa_local.jpeg",
  },
  {
    type: "image",
    title: "Ciclo Quintos",
    description:
      "Una alternativa pensada para estudiantes de quinto de secundaria.",
    image: "/ceprunsa_ciclo_quintos.png",
  },
];

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
};

const AnimatedStat: React.FC<{ stat: { number: string; label: string }; shouldAnimate: boolean }> = ({
  stat,
  shouldAnimate,
}) => {
  const numericPart = parseInt(stat.number.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = stat.number.replace(/[0-9]/g, "");
  const count = useCountUp(numericPart, 2000, shouldAnimate);
  return (
    <div className="stat-item text-center group h-full">
      <div className="bg-white rounded-2xl p-8 group-hover:scale-105 transition-all duration-300 border border-gray-100 shadow-md cursor-default h-full flex flex-col justify-center">
        <div className="text-4xl md:text-5xl font-bold text-accent-700 mb-3 transition-colors tabular-nums">
          {shouldAnimate ? `${count}${suffix}` : stat.number}
        </div>
        <div className="text-primary-700 font-semibold text-lg">{stat.label}</div>
      </div>
    </div>
  );
};

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
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70vh] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage || "/ceprunsa_ciclo_quintos.png"}
          alt="Inscripciones CEPRUNSA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/85 to-primary-900/90"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full">
        <Calendar className="text-white" size={24} />
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/20 backdrop-blur-sm p-3 rounded-full">
        <Clock className="text-white" size={24} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 leading-tight">
            {eventTitle}
          </h3>
          <p className="text-primary-100 text-lg sm:text-xl lg:text-2xl">
            Faltan:
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-none">
              {timeLeft.days}
            </div>
            <div className="text-sm sm:text-base text-primary-100 mt-2 font-medium">
              Días
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-none">
              {timeLeft.hours}
            </div>
            <div className="text-sm sm:text-base text-primary-100 mt-2 font-medium">
              Horas
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-none">
              {timeLeft.minutes}
            </div>
            <div className="text-sm sm:text-base text-primary-100 mt-2 font-medium">
              Min
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-none">
              {timeLeft.seconds}
            </div>
            <div className="text-sm sm:text-base text-primary-100 mt-2 font-medium">
              Seg
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-base sm:text-lg lg:text-xl text-primary-100 opacity-90 font-medium">
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

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
    if (isTransitioning) return;
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
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const startTransitionCooldown = () => {
    setIsTransitioning(true);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    startTransitionCooldown();
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    startTransitionCooldown();
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length,
    );
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    startTransitionCooldown();
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 group">
      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70vh] overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden">
              {item.type === "countdown" &&
                item.eventDate &&
                item.eventTitle ? (
                <CountdownTimer
                  targetDate={item.eventDate}
                  eventTitle={item.eventTitle}
                  backgroundImage={item.image}
                />
              ) : (
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={item.image || "/home_image.jpeg"}
                    alt={item.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />

                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Content overlay for image slides */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16 text-white container-custom mx-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`hidden md:flex absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 ${
            isTransitioning ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`hidden md:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 ${
            isTransitioning ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator inside the carousel */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              isTransitioning ? "pointer-events-none" : ""
            } ${index === currentSlide
              ? "bg-white scale-125 shadow-md"
              : "bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


// Expandable testimonial card
const TestimonialCard: React.FC<{
  testimonial: { name: string; career: string; text: string; rating: number };
  index: number;
}> = ({ testimonial }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.text.length > 100;
  return (
    <div className="testimonial-card group h-full">
      <div
        className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-primary-100 hover:border-accent-200 h-full flex flex-col cursor-pointer"
        onClick={() => isLong && setExpanded((e) => !e)}
        title={isLong ? (expanded ? "Mostrar menos" : "Leer más") : undefined}
      >
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="text-accent-500 fill-current group-hover:text-accent-600 transition-colors"
              size={20}
            />
          ))}
        </div>
        <p
          className={`text-gray-700 mb-6 italic text-lg leading-relaxed flex-1 transition-all duration-300 ${!expanded && isLong ? "line-clamp-4" : ""}`}
        >
          "{testimonial.text}"
        </p>
        {isLong && (
          <button
            className="text-accent-700 text-sm font-semibold flex items-center gap-1 mb-4 hover:text-accent-900 transition-colors w-fit"
            onClick={(e) => { e.stopPropagation(); setExpanded((ex) => !ex); }}
            aria-label={expanded ? "Mostrar menos" : "Leer más"}
          >
            {expanded ? "Mostrar menos" : "Leer más"}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
        <div className="flex items-center space-x-4 mt-auto">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
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
  );
};

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hero animations
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3",
      );

    // Quick links animation
    gsap.fromTo(
      ".quick-link-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".quick-links-section",
          start: "top 85%",
        },
      }
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
      },
    );

    // Stats animation + count-up trigger
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
          onEnter: () => setStatsVisible(true),
        },
      },
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
      },
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden flex flex-col"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        {/* Full Width Carousel */}
        <div className="hero-carousel w-full relative z-10 shadow-2xl order-1">
          <HeroCarousel />
        </div>

        <div className="container-custom relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 z-10 text-center order-2">
          <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-full shadow-soft border border-primary-200 hover:shadow-medium hover:border-primary-300 transition-all duration-300 mx-auto cursor-default">
              <Award className="text-accent-600 mr-2 lg:mr-3" size={18} />
              <span className="text-xs lg:text-sm font-semibold text-gray-700">
                Modalidad Oficial de Ingreso UNSA
              </span>
            </div>
            <h1 className="hero-title font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-700 leading-tight">
              Ingresa a la{" "}
              <span className="text-accent-900 relative">UNSA</span> por{" "}
              <span className="text-accent-900 relative">CEPRUNSA</span>
            </h1>
            <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-secondary-600 leading-relaxed max-w-3xl mx-auto">
              Modalidad oficial de ingreso directo con preparación integral en
              10 semanas, 15 cursos especializados y tu propio examen de
              admisión.
            </p>

            {/* Dual CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4 mt-6">

              <Link
                to="/contacto"
                className="btn-secondary text-sm sm:text-base group inline-flex items-center justify-center"
              >
                Inscríbete Ahora
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {[
                "85% de ingresantes",
                "24 años de experiencia",
                "500+ estudiantes/año",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-secondary-600 font-medium"
                >
                  <CheckCircle size={15} className="text-accent-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
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
              <div
                key={index}
                className="feature-card group relative block rounded-2xl cursor-default"
              >
                <div className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100 hover:border-accent-200 text-center h-full hover:-translate-y-2">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <feature.icon className="text-white" size={36} />
                    </div>
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
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-xl animate-pulse-slow"></div>
        </div>
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
              CEPRUNSA en números
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              La modalidad de ingreso más efectiva para acceder a la Universidad
              Nacional de San Agustín
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedStat key={index} stat={stat} shouldAnimate={statsVisible} />
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
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
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
            ¿Listo para ingresar a la UNSA por CEPRUNSA?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Aprovecha esta modalidad oficial de ingreso directo con preparación
            especializada y tu propio examen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Inscríbete al Próximo Proceso
              <GraduationCap
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
            <Link
              to="/procesos"
              className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
            >
              Ver Procesos
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
