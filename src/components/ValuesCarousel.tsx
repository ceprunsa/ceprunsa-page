"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { values } from "../data";

const ValuesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg and up
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm and down
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, values.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  // Touch handlers
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

    if (isLeftSwipe && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main carousel container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3 lg:px-4"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-accent-200 h-full group">
                {/* Icon with gradient background */}
                <div className="relative mb-6 lg:mb-8">
                  <div
                    className={`bg-gradient-to-br ${value.color} w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  >
                    <value.icon className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-heading text-xl lg:text-2xl font-bold text-primary-700 mb-4 lg:mb-6 group-hover:text-accent-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed text-sm lg:text-base">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-white hover:bg-gray-50 text-gray-800 p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center z-10"
        aria-label="Valor anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-white hover:bg-gray-50 text-gray-800 p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center z-10"
        aria-label="Siguiente valor"
      >
        <ChevronRight size={24} />
      </button>

      {/* Mobile swipe indicator */}
      <div className="md:hidden absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-white text-xs">Desliza →</span>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 lg:mt-8 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary-600 scale-110 shadow-md"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a grupo de valores ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="text-center mt-3 lg:mt-4">
        <span className="text-xs lg:text-sm text-gray-500">
          {currentIndex + 1} de {maxIndex + 1}
        </span>
      </div>
    </div>
  );
};

export default ValuesCarousel;
