import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import type { NavItem } from "../types";

const navItems: NavItem[] = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Procesos", path: "/procesos" },
  { name: "Carreras", path: "/carreras" },
  { name: "Contacto", path: "/contacto" },
];

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from("[data-header-item]", {
        opacity: 0,
        y: -10,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, headerRef);
    return () => context.revert();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "border-primary-100 bg-white/95 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="container-custom flex h-[72px] items-center justify-between">
          <Link data-header-item to="/" className="flex items-center" aria-label="CEPRUNSA, inicio">
            <img src="/logo-ceprunsa.png" alt="CEPRUNSA" className="h-9 w-auto sm:h-10" />
          </Link>

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
                      ? "bg-primary-50 text-accent-700"
                      : "text-primary-700 hover:bg-primary-50 hover:text-accent-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <a
              data-header-item
              href="https://sisadmision.unsa.edu.pe/pregrado/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 rounded-xl bg-accent-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-800 hover:shadow-medium"
            >
              Inscríbete <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary-100 text-primary-700 transition hover:bg-primary-50 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-primary-100 bg-white transition-[max-height,opacity] duration-300 md:hidden ${
            isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 border-transparent opacity-0"
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
                    isActive ? "bg-primary-50 text-accent-700" : "text-primary-700 hover:bg-gray-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <a
              href="https://sisadmision.unsa.edu.pe/pregrado/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-accent-700 px-4 py-3 text-sm font-semibold text-white"
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
