"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { stats, testimonials } from "../data";
import { useConfig } from "../context/ConfigContext";
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
      "Preparándose para el examen de ingreso a la UNSA",
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
  const prefix = stat.number.startsWith("+") ? "+" : "";
  const suffix = stat.number.endsWith("+") ? "+" : "";
  const count = useCountUp(numericPart, 2000, shouldAnimate);
  return (
    <div className="stat-item text-center group h-full">
      <div className="bg-white rounded-2xl p-8 group-hover:scale-105 transition-all duration-300 border border-gray-100 shadow-md cursor-default h-full flex flex-col justify-center">
        <div className="text-4xl md:text-5xl font-bold text-accent-700 mb-3 transition-colors tabular-nums">
          {shouldAnimate ? `${prefix}${count}${suffix}` : stat.number}
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
  const { getImageUrl } = useConfig();
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
    <div className="w-full h-[600px] sm:h-[750px] md:h-[850px] lg:h-[92vh] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(backgroundImage || "/ceprunsa_ciclo_quintos.png")}
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
  const { getImageUrl } = useConfig();
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
        className="relative w-full h-[600px] sm:h-[750px] md:h-[850px] lg:h-[92vh] overflow-hidden"
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
                    src={getImageUrl(item.image || "/home_image.jpeg")}
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

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`flex absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 items-center justify-center backdrop-blur-sm opacity-80 hover:opacity-100 ${isTransitioning ? "pointer-events-none opacity-40" : ""
            }`}
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`flex absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 items-center justify-center backdrop-blur-sm opacity-80 hover:opacity-100 ${isTransitioning ? "pointer-events-none opacity-40" : ""
            }`}
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dots Indicator inside the carousel */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${isTransitioning ? "pointer-events-none" : ""
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


// Custom Testimonials Section matching reference image
const TestimonialsSection: React.FC<{
  testimonialsRef: React.RefObject<HTMLElement | null>;
}> = ({ testimonialsRef }) => {
  const { getImageUrl } = useConfig();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section
      ref={testimonialsRef}
      className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden"
    >
      <div className="container-custom max-w-6xl mx-auto px-4">
        {/* Title Header matching example image */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2545] tracking-tight">
            Conoce los
          </h2>
          <span className="block font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B2545] tracking-tight mt-1">
            testimonios
          </span>
          <div className="w-20 sm:w-24 h-1.5 bg-[#FF8A00] rounded-full mx-auto mt-4"></div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 md:p-14 min-h-[420px] flex items-center transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
            {/* Image on Left with custom right rounded arch */}
            <div className="md:col-span-5 flex justify-center">
              <div
                className="relative w-full max-w-[320px] sm:max-w-[360px] h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden shadow-xl bg-gray-100 transition-all duration-500 flex-shrink-0"
                style={{ borderRadius: "0px 160px 160px 0px" }}
              >
                <img
                  src={getImageUrl((current as any).image || "/student_maria.jpg")}
                  alt={current.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content on Right */}
            <div className="md:col-span-7 flex flex-col justify-center text-left space-y-4 md:space-y-6 md:pr-6">
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#5B50E6] leading-tight">
                {current.name} -{" "}
                <span className="text-[#5B50E6] font-semibold">{current.career}</span>
              </h3>

              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                "{current.text}"
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-[#0B2545] p-3 sm:p-4 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 z-20"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 bg-[#E53935] hover:bg-[#D32F2F] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { getImageUrl } = useConfig();
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gray-900 overflow-hidden flex flex-col"
      >
        {/* Full Width Carousel */}
        <div className="hero-carousel w-full relative z-10 shadow-2xl">
          <HeroCarousel />
        </div>
      </section>

      {/* Te preparamos para la UNSA Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom max-w-5xl mx-auto">
          {/* Header matching image */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs mx-auto cursor-default transition-shadow hover:shadow-sm">
              <svg className="w-4 h-4 text-[#6A1B29] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
                <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>
              </svg>
              <span>Modalidad Oficial de Ingreso UNSA</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="text-[#0E2F56]">Ingresa a la </span>
              <span className="text-[#6A1B29]">UNSA </span>
              <span className="text-[#0E2F56]">por </span>
              <span className="text-[#6A1B29]">CEPRUNSA</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Card 1: ¿Estás en quinto de secundaria? */}
            <Link
              to="/procesos?perfil=5to"
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 bg-white"
            >
              <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl("/ceprunsa_ciclo_quintos.png")}
                  alt="¿Estás en quinto de secundaria?"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="bg-gradient-to-r from-primary-700 to-primary-900 p-6 sm:p-8 text-center min-h-[120px] flex items-center justify-center">
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  ¿Estás en quinto<br />de secundaria?
                </h3>
              </div>
            </Link>

            {/* Card 2: ¿Terminaste el colegio? */}
            <Link
              to="/procesos?perfil=egresados"
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 bg-white"
            >
              <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl("/ceprunsa-estudiantes-demo.jpg")}
                  alt="¿Terminaste el colegio?"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="bg-gradient-to-r from-accent-800 to-accent-950 p-6 sm:p-8 text-center min-h-[120px] flex items-center justify-center">
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  ¿Terminaste el<br />colegio?
                </h3>
              </div>
            </Link>
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
      <TestimonialsSection testimonialsRef={testimonialsRef} />

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
