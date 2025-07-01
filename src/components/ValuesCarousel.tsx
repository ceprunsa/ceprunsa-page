"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { values } from "../data";

const ValuesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, values.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView, isDragging]);

  const maxIndex = Math.max(0, values.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Touch/Mouse handlers for mobile swipe
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const maxIndex = Math.max(0, values.length - itemsPerView);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = startX - clientX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
        setIsDragging(false);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsDragging(false);
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  // Calculate visible dots
  const totalDots = maxIndex + 1;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => !isDragging && setIsAutoPlaying(true)}
    >
      {/* Desktop Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="hidden md:block absolute -left-16 lg:-left-20 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group z-10 border border-gray-200"
        aria-label="Valores anteriores"
      >
        <ChevronLeft
          className="text-primary-600 group-hover:text-accent-600 transition-colors"
          size={28}
        />
      </button>

      <button
        onClick={goToNext}
        className="hidden md:block absolute -right-16 lg:-right-20 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group z-10 border border-gray-200"
        aria-label="Siguientes valores"
      >
        <ChevronRight
          className="text-primary-600 group-hover:text-accent-600 transition-colors"
          size={28}
        />
      </button>

      {/* Mobile Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="md:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group z-10 border border-gray-200"
        aria-label="Valor anterior"
      >
        <ChevronLeft
          className="text-primary-600 group-hover:text-accent-600 transition-colors"
          size={20}
        />
      </button>

      <button
        onClick={goToNext}
        className="md:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group z-10 border border-gray-200"
        aria-label="Siguiente valor"
      >
        <ChevronRight
          className="text-primary-600 group-hover:text-accent-600 transition-colors"
          size={20}
        />
      </button>

      {/* Main carousel container */}
      <div
        className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
        ref={carouselRef}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                itemsPerView === 1
                  ? "w-full px-2"
                  : itemsPerView === 2
                  ? "w-1/2 px-3"
                  : "w-1/3 px-3"
              }`}
            >
              <div
                className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-soft hover:shadow-medium transition-all duration-300 text-center h-full flex flex-col justify-between group hover:border-accent-200 ${
                  itemsPerView === 1
                    ? "p-8 min-h-[400px]"
                    : "p-6 lg:p-8 min-h-[350px] lg:min-h-[400px]"
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 mb-6">
                  <div
                    className={`bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 ${
                      itemsPerView === 1
                        ? "w-24 h-24"
                        : "w-16 h-16 lg:w-20 lg:h-20"
                    }`}
                  >
                    <value.icon
                      className="text-accent-600"
                      size={itemsPerView === 1 ? 40 : 32}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-center space-y-4">
                  <h3
                    className={`font-heading font-bold text-primary-700 group-hover:text-accent-700 transition-colors ${
                      itemsPerView === 1
                        ? "text-2xl lg:text-3xl mb-4"
                        : "text-lg lg:text-xl mb-3"
                    }`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={`text-gray-600 leading-relaxed ${
                      itemsPerView === 1
                        ? "text-lg lg:text-xl"
                        : "text-sm lg:text-base line-clamp-4"
                    }`}
                  >
                    {value.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="flex-shrink-0 mt-6">
                  <div
                    className={`bg-gradient-to-r from-accent-400 to-primary-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      itemsPerView === 1 ? "w-16 h-1.5" : "w-12 h-1"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator - Enhanced for mobile */}
      {totalDots > 1 && (
        <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-6 md:w-8 h-2.5 md:h-3 bg-gradient-to-r from-accent-500 to-accent-600 shadow-lg"
                  : "w-2.5 md:w-3 h-2.5 md:h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125"
              }`}
              aria-label={`Ir al grupo de valores ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile swipe indicator */}
      <div className="md:hidden text-center mt-3">
        <p className="text-xs text-gray-400 flex items-center justify-center space-x-2">
          <span>←</span>
          <span>Desliza o toca las flechas</span>
          <span>→</span>
        </p>
      </div>

      {/* Mobile value counter */}
      <div className="md:hidden text-center mt-2">
        <div className="inline-flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600">
            Valor {currentIndex + 1} de {values.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValuesCarousel;
