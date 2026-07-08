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
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-large border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  <div className="p-2">
                    {zonaSubItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <sub.icon className="text-white" size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-accent-700 transition-colors leading-tight">
                            {sub.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{sub.desc}</p>
                        </div>
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

        {/* Mobile menu */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-accent-800 bg-accent-700 transition-[max-height,opacity] duration-300 md:hidden ${
            isMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <nav className="container-custom space-y-1 py-4" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-accent-800 text-white" : "text-accent-50 hover:bg-accent-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile: Zona del Postulante collapsible */}
            <div>
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
                <div className="ml-4 mt-1 space-y-1">
                  {zonaSubItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-accent-100 hover:bg-accent-600 hover:text-white transition-colors"
                    >
                      <sub.icon size={15} />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://sisadmision.unsa.edu.pe/pregrado/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm btn-header-inscription btn-header-glow"
            >
              Inscríbete <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
};

export default Header;
