import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, ChevronDown, PlayCircle, CreditCard } from "lucide-react";
import { gsap } from "gsap";
import type { NavItem } from "../types";

const navItems: NavItem[] = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Procesos", path: "/procesos" },
  { name: "Carreras", path: "/carreras" },
  { name: "Contacto", path: "/contacto" },
];

const zonaSubItems = [
  {
    name: "Acceso a Clases",
    path: "/zona-postulante/clases",
    icon: PlayCircle,
    desc: "Cómo ingresar a tu clase virtual",
  },
  {
    name: "Pago con UNSApay",
    path: "/zona-postulante/pago",
    icon: CreditCard,
    desc: "Guía de pago y normativa",
  },
];

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isZonaOpen, setIsZonaOpen] = useState(false);
  const [isMobileZonaOpen, setIsMobileZonaOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsZonaOpen(false);
    setIsMobileZonaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsZonaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-header-item]",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }, headerRef);
    return () => context.revert();
  }, []);

  const isZonaActive = location.pathname.startsWith("/zona-postulante");

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "border-accent-800 bg-accent-700/95 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-accent-700/95 backdrop-blur-md"
        }`}
      >
        <div className="container-custom flex h-[72px] items-center justify-between">
          <Link data-header-item to="/" className="flex items-center" aria-label="CEPRUNSA, inicio">
            <img src="/logo-ceprunsa-white.png" alt="CEPRUNSA" className="h-9 w-auto sm:h-10" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {navItems.map((item) => (
              <NavLink
                data-header-item
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-accent-800 text-white"
                      : "text-accent-50 hover:bg-accent-600 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Zona del Postulante dropdown */}
            <div ref={dropdownRef} className="relative" data-header-item>
              <button
                onClick={() => setIsZonaOpen((o) => !o)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isZonaActive
                    ? "bg-accent-800 text-white"
                    : "text-accent-50 hover:bg-accent-600 hover:text-white"
                }`}
                aria-expanded={isZonaOpen}
                aria-haspopup="true"
              >
                Zona del Postulante
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${isZonaOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              {isZonaOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-large border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  <div className="p-2 space-y-0.5">
                    {zonaSubItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-4 py-2.5 rounded-xl hover:bg-primary-50 text-sm font-semibold text-gray-800 hover:text-accent-700 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              data-header-item
              href="https://sisadmision.unsa.edu.pe/pregrado/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm btn-header-inscription btn-header-glow"
            >
              Inscríbete <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-500 text-white transition hover:bg-accent-600 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu - Sidebar (Menú Lateral) */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar container */}
      <div
        id="mobile-navigation"
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[280px] bg-accent-700 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header of the sidebar */}
        <div className="flex h-[72px] items-center justify-between px-6 border-b border-accent-800">
          <span className="font-semibold text-white text-base">Menú</span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent-500 text-white transition hover:bg-accent-600"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation content */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5" aria-label="Navegación móvil">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive ? "bg-accent-800 text-white" : "text-accent-50 hover:bg-accent-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile: Zona del Postulante collapsible */}
          <div className="space-y-1">
            <button
              onClick={() => setIsMobileZonaOpen((o) => !o)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                isZonaActive ? "bg-accent-800 text-white" : "text-accent-50 hover:bg-accent-600"
              }`}
            >
              Zona del Postulante
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isMobileZonaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isMobileZonaOpen && (
              <div className="pl-4 pr-2 py-1.5 mt-1 space-y-1 bg-accent-950/20 rounded-xl">
                {zonaSubItems.map((sub) => (
                  <NavLink
                    key={sub.path}
                    to={sub.path}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-accent-900 text-white"
                          : "text-accent-100 hover:bg-accent-600 hover:text-white"
                      }`
                    }
                  >
                    {sub.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4">
            <a
              href="https://sisadmision.unsa.edu.pe/pregrado/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm btn-header-inscription btn-header-glow"
            >
              Inscríbete <ArrowUpRight size={16} />
            </a>
          </div>
        </nav>
      </div>
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
};

export default Header;
