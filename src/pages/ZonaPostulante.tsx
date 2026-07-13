"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, CreditCard, ArrowRight, BookOpen, Shield } from "lucide-react";

const guides = [
  {
    icon: PlayCircle,
    title: "Acceso a Clases",
    description:
      "Aprende paso a paso cómo ingresar a la plataforma virtual y unirte a tus clases en línea desde cualquier dispositivo.",
    to: "/zona-postulante/clases",
    color: "from-primary-500 to-primary-700",
    bg: "hover:bg-primary-50",
    border: "hover:border-primary-300",
    tag: "Video tutorial",
  },
  {
    icon: CreditCard,
    title: "Pago de Cuotas",
    description:
      "Guía completa para realizar tu pago de cuotas en el BCP con tu código web, incluyendo canales disponibles y la normativa vigente.",
    to: "/zona-postulante/pago",
    color: "from-accent-500 to-accent-700",
    bg: "hover:bg-accent-50",
    border: "hover:border-accent-300",
    tag: "Pasos + Reglamento",
  },
];

const ZonaPostulante: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft border border-primary-200 mb-6">
            <Shield size={16} className="text-accent-600" />
            <span className="text-xs font-semibold text-gray-700">Recursos exclusivos para postulantes</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Zona del{" "}
            <span className="text-accent-900">Postulante</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas para comenzar tu proceso en CEPRUNSA: guías en video,
            instrucciones de pago y normativa en un solo lugar.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Selecciona una <span className="text-accent-900">guía</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-xl mx-auto">
              Elige el tema sobre el que necesitas ayuda y sigue las instrucciones paso a paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guides.map((guide) => (
              <Link
                key={guide.to}
                to={guide.to}
                className={`group flex flex-col bg-white border border-gray-100 ${guide.border} ${guide.bg} rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2 p-10`}
              >
                <div className={`bg-gradient-to-br ${guide.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <guide.icon className="text-white" size={30} />
                </div>
                <span className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <BookOpen size={12} /> {guide.tag}
                </span>
                <h3 className="font-heading text-2xl font-bold text-primary-700 mb-4 group-hover:text-accent-800 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed flex-1 mb-6">
                  {guide.description}
                </p>
                <div className="flex items-center gap-2 text-accent-700 font-semibold text-sm group-hover:gap-3 transition-all">
                  Ver guía <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="container-custom text-center relative">
          <h2 className="font-heading text-3xl font-bold mb-4">
            ¿Tienes otra duda?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Nuestro equipo está disponible para ayudarte con cualquier consulta sobre el proceso CEPRUNSA.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Contáctanos <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ZonaPostulante;
