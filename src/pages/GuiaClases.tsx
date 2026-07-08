"use client";

import type React from "react";
import { Link } from "react-router-dom";
import {
  PlayCircle,
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
    title: "Accede al enlace de tu clase",
    description:
      "Ingresa al correo con el que te inscribiste. Busca el mensaje enviado por CEPRUNSA con el enlace de acceso a tu plataforma virtual o sala de videoconferencia.",
  },
  {
    step: "02",
    title: "Inicia sesión con tus credenciales",
    description:
      "Usa el usuario y contraseña que te fueron asignados al momento de completar tu inscripción. Si olvidaste tu contraseña, comunícate con administración.",
  },
  {
    step: "03",
    title: "Únete a la sala de clases",
    description:
      "Haz clic en el botón 'Unirse' o 'Entrar a la clase'. Asegúrate de tener tu micrófono y cámara configurados correctamente antes de ingresar.",
  },
  {
    step: "04",
    title: "Participa y sigue la clase",
    description:
      "Una vez dentro, podrás ver al docente, escuchar la clase y participar usando el chat o levantando la mano. Mantén tu micrófono en silencio cuando no estés hablando.",
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
              <PlayCircle size={14} /> Video Tutorial
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

      {/* Video tutorial */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-700 mb-8 text-center">
            Video tutorial: <span className="text-accent-900">Ingreso a clases</span>
          </h2>

          {/* Video embed — placeholder iframe (replace src with real YouTube embed URL) */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-large border border-gray-100">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Tutorial: Cómo acceder a tus clases en CEPRUNSA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-4">
            ¿No puedes ver el video? Asegúrate de tener conexión a internet activa.
          </p>
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
