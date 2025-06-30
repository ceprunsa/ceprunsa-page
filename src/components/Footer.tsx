import type React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import type { NavItem } from "../types";

const Footer: React.FC = () => {
  const quickLinks: NavItem[] = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Procesos", path: "/procesos" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <div className="container-custom section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gold-500 p-3 rounded-xl">
                <img
                  src="/logo-ceprunsa-white.png"
                  alt="CEPRUNSA"
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl">
                  CEPRUNSA
                </span>
                <p className="text-primary-200 text-sm">
                  Centro Preuniversitario UNSA
                </p>
              </div>
            </div>
            <p className="text-primary-200 leading-relaxed max-w-md text-lg">
              Centro de Estudios Preuniversitarios oficial de la Universidad
              Nacional de San Agustín. Formamos a los futuros profesionales con
              excelencia académica.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-xl mb-6 text-gold-400">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 hover:translate-x-1"
                  >
                    <span>→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 text-gold-400">
              Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-white/10 hover:bg-white/20 p-2 rounded-lg">
                  <MapPin size={20} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-primary-200 leading-relaxed">
                    Av. Independencia 123
                    <br />
                    Arequipa, Perú
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 hover:bg-white/20 p-2 rounded-lg">
                  <Phone size={20} className="text-gold-400" />
                </div>
                <p className="text-primary-200">(054) 123-456</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 hover:bg-white/20 p-2 rounded-lg">
                  <Mail size={20} className="text-gold-400" />
                </div>
                <p className="text-primary-200">info@ceprunsa.edu.pe</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-8 text-center">
          <p className="text-primary-300">
            © 2024 CEPRUNSA - Centro Preuniversitario UNSA. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
