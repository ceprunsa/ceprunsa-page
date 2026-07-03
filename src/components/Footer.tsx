import type React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { NavItem } from "../types";

const quickLinks: NavItem[] = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Procesos", path: "/procesos" },
  { name: "Contacto", path: "/contacto" },
];

const Footer: React.FC = () => (
  <footer className="relative overflow-hidden bg-primary-950 text-white">
    <div className="absolute inset-0 bg-pattern opacity-10" aria-hidden="true" />
    <div className="container-custom relative py-12 md:py-14">
      <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5 md:col-span-2">
          <img src="/logo-ceprunsa-white.png" alt="CEPRUNSA" className="h-10 w-auto" />
          <p className="max-w-lg text-sm leading-6 text-primary-200">
            Centro Preuniversitario de la Universidad Nacional de San Agustín de Arequipa. Preparación académica orientada a los procesos de ingreso UNSA.
          </p>
          <a
            href="https://sisadmision.unsa.edu.pe/pregrado/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-300"
          >
            Portal de admisión <ArrowUpRight size={16} />
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-300">Explora</h2>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-primary-200 transition-colors hover:text-white">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-300">Contacto</h2>
          <div className="space-y-4 text-sm text-primary-200">
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-accent-300" size={17} /> Arequipa, Perú</p>
            <Link to="/contacto" className="flex items-center gap-3 transition-colors hover:text-white"><Mail className="shrink-0 text-accent-300" size={17} /> Ver canales de atención</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-6 text-xs text-primary-300 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CEPRUNSA. Todos los derechos reservados.</p>
        <p>Universidad Nacional de San Agustín de Arequipa</p>
      </div>
    </div>
  </footer>
);

export default Footer;
