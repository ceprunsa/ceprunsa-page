import type React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { NavItem } from "../types";
import { siteConfig } from "../data";

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
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-400"
          >
            Portal de admisión <ArrowUpRight size={16} />
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Explora</h2>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-primary-200 transition-colors hover:text-white">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Contacto</h2>
          <div className="space-y-4 text-sm text-primary-200">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-accent-400" size={17} />
              <div>
                <p className="text-white font-semibold">Dirección</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=CEPRUNSA+Arequipa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-200 leading-relaxed hover:text-white transition-colors block"
                >
                  Calle San Agustín 108<br />
                  <span className="text-[11px] text-primary-400">(A media cuadra de la Plaza de Armas)</span>
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="mt-1 shrink-0 text-accent-400" size={17} />
              <div>
                <p className="text-white font-semibold">Teléfono</p>
                <p className="text-xs text-primary-200">
                  {siteConfig.phoneNumber} <span className="text-primary-400 font-medium">Anexo {siteConfig.phoneAnnex}</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-1 shrink-0 text-accent-400" size={17} />
              <div>
                <p className="text-white font-semibold">E-mails</p>
                <p className="text-xs text-primary-200 leading-snug">
                  <span className="text-primary-400 font-medium">Institucional:</span><br />
                  <a href={`mailto:${siteConfig.emailInstitutional}`} className="hover:underline">{siteConfig.emailInstitutional}</a>
                </p>
                <p className="text-xs text-primary-200 leading-snug mt-1.5">
                  <span className="text-primary-400 font-medium">Consultas:</span><br />
                  <a href={`mailto:${siteConfig.emailClientQuery}`} className="hover:underline">{siteConfig.emailClientQuery}</a><br />
                  <a href={`mailto:${siteConfig.emailApplicantQuery}`} className="hover:underline">{siteConfig.emailApplicantQuery}</a>
                </p>
              </div>
            </div>
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
