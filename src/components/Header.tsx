"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { gsap } from "gsap";
import type { NavItem } from "../types";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".header-logo",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  const navItems: NavItem[] = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Procesos", path: "/procesos" },
    { name: "Contacto", path: "/contacto" },
  ];

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-effect shadow-medium py-2"
            : "bg-white/95 backdrop-blur-sm py-3 shadow-soft"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo Section - Simple and clean */}
            <Link to="/" className="header-logo flex items-center">
              <img
                src="/logo-ceprunsa.png"
                alt="CEPRUNSA"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item font-medium transition-all duration-300 hover:text-accent-900 relative ${
                    location.pathname === item.path
                      ? "text-accent-900"
                      : "text-primary-600 hover:text-accent-900"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-900 rounded-full"></span>
                  )}
                </Link>
              ))}
              <Link
                to="https://sisadmision.unsa.edu.pe/pregrado/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item btn-primary text-sm px-6 py-2"
              >
                <GraduationCap className="mr-2 inline-block h-4 w-4" />
                Inscríbete
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg rounded-b-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-accent-900 bg-accent-50"
                        : "text-primary-600 hover:text-accent-900 hover:bg-primary-50"
                    }`}
                    onClick={handleMenuClose}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    to="https://sisadmision.unsa.edu.pe/pregrado/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center btn-primary py-3"
                    onClick={handleMenuClose}
                  >
                    <GraduationCap className="mr-2 inline-block h-4 w-4" />
                    Inscríbete
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Standard spacer */}
      <div className="h-18"></div>
    </>
  );
};

export default Header;
