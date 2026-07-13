"use client";

import type React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ChevronLeft,
  CheckCircle,
  Monitor,
  Smartphone,
  Wifi,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Accede con tu cuenta CEPRUNSA",
    description:
      "Accede con la cuenta CEPRUNSA que recibiste al momento de tu inscripción.",
  },
  {
    step: "02",
    title: "Ingresa a Google Classroom",
    description:
      "Ingresa a la plataforma Google Classroom utilizando dicha cuenta.",
  },
  {
    step: "03",
    title: "Únete a Google Meet",
    description:
      "Desde Classroom, selecciona tu salón y haz clic en el enlace de Google Meet correspondiente para unirte a la sesión.",
  },
];

const requirements = [
  { icon: Monitor, text: "Computadora, laptop o tablet" },
  { icon: Smartphone, text: "Teléfono con Android 8+ o iOS 14+" },
  { icon: Wifi, text: "Conexión a internet estable (mínimo 5 Mbps)" },
];

const GuiaClases: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-100 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="container-custom relative">
          <Link
            to="/zona-postulante/pago"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-accent-700 font-semibold mb-8 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zona del Postulante
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
              <BookOpen size={14} /> Guía de Acceso
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6 leading-tight">
              Cómo acceder a{" "}
              <span className="text-accent-900">tus clases</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Sigue esta guía paso a paso para ingresar correctamente a la
              plataforma virtual de CEPRUNSA y no perderte ninguna clase.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <h2 className="font-heading text-2xl font-bold text-primary-700 mb-8 text-center">
            Requisitos previos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {requirements.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center text-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-soft"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                  <Icon className="text-white" size={22} />
                </div>
                <p className="text-sm font-medium text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-700 mb-12 text-center">
            Pasos para ingresar a tu clase
          </h2>

          <div className="space-y-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="group flex gap-6 bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:border-primary-300 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg text-white font-bold text-lg group-hover:scale-105 transition-transform">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-primary-700 text-lg mb-2 group-hover:text-accent-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed text-sm">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-10 bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-200 rounded-2xl p-6">
            <h3 className="font-semibold text-primary-700 mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-accent-600" /> Consejos para una mejor experiencia
            </h3>
            <ul className="space-y-2 text-sm text-secondary-600">
              {[
                "Conecta tu computadora mediante cable Ethernet para mayor estabilidad.",
                "Usa audífonos para evitar eco y mejorar la calidad del audio.",
                "Cierra aplicaciones innecesarias para liberar recursos de tu dispositivo.",
                "Ingresa a la plataforma 5 minutos antes del inicio de clase para verificar que todo funcione.",
                "Si tienes problemas técnicos, comunícate inmediatamente con el soporte de CEPRUNSA.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-accent-500 mt-0.5 flex-shrink-0">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation footer */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/zona-postulante/pago"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-accent-700 font-semibold text-sm transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Ir a Guía de Pago UNSApay
          </Link>
          <Link
            to="/zona-postulante/pago"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-md text-sm group"
          >
            Siguiente: Guía de Pago UNSApay
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GuiaClases;
