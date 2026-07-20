"use client";

import type React from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  MessageCircle,
  Clock,
  Video,
  ExternalLink,
  Brain,
  Heart,
  Smile,
  Users,
  Shield,
  Sparkles,
  Compass,
} from "lucide-react";
import { siteConfig } from "../data";
const services = [
  { icon: Brain, name: "Manejo del estrés" },
  { icon: Heart, name: "Manejo de ansiedad" },
  { icon: Smile, name: "Apoyo emocional" },
  { icon: Users, name: "Acompañamiento emocional" },
  { icon: Shield, name: "Prevención de problemas" },
  { icon: Sparkles, name: "Mejora del autoconocimiento" },
  { icon: Clock, name: "Organización del tiempo" },
  { icon: Compass, name: "Orientación Vocacional" },
];

const ConsultorioPsicologico: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden flex flex-col">
        {/* Full Width Image */}
        <div className="w-full relative z-10 shadow-2xl order-1 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[50vh]">
          <img
            src="/consultorio-psicologico-header.png"
            alt="Consultorio Psicológico CEPRUNSA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="container-custom relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 z-10 order-2">
          <Link
            to="/zona-postulante"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-accent-700 font-semibold mb-8 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zona del Postulante
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
              <Brain size={14} /> Bienestar Estudiantil
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6 leading-tight">
              Consultorio <span className="text-accent-900">Psicológico</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Sabemos que prepararte para ingresar a la universidad también implica cuidar de ti.
              Encuentra un espacio de apoyo y orientación pensado exclusivamente para tu bienestar y salud mental.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Services and Details */}
            <div className="lg:col-span-7 space-y-10">

              {/* Target audience badge */}
              <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white p-5 rounded-2xl shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-xs text-primary-200 uppercase tracking-wider font-semibold">Dirigido a:</p>
                  <p className="text-lg font-bold">Postulantes CEPRUNSA</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
              </div>

              {/* Our Services */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary-700 mb-6 border-b pb-3">
                  Nuestros Servicios
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-primary-50/50 border border-primary-100/50 p-4 rounded-xl hover:border-accent-200 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-accent-100 text-accent-700 flex items-center justify-center flex-shrink-0">
                        <srv.icon size={18} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{srv.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-700 text-sm mb-1">Duración de la Sesión</h4>
                    <p className="text-xs text-secondary-600 leading-normal">Sesiones personalizadas de 40 minutos por postulante.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                    <Video size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-700 text-sm mb-1">Atención Virtual</h4>
                    <p className="text-xs text-secondary-600 leading-normal">Sesiones online cómodas y seguras a través de Google Meet.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Actions Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-primary-100 p-6 md:p-8 rounded-3xl shadow-medium space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-primary-700">Reserva tu Cita</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Reserva una sesión de orientación y asesoría psicológica en el horario de tu preferencia.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {siteConfig.psychologyServiceActive ? (
                    <>
                      <a
                        href={`https://wa.me/51${siteConfig.whatsappPsychologyNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center text-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm md:text-base group"
                      >
                        <MessageCircle size={20} />
                        Reservar Cita por WhatsApp
                        <ExternalLink size={14} className="opacity-70" />
                      </a>

                      <a
                        href="http://bit.ly/4dEyR0t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center text-center gap-2 bg-white border-2 border-primary-500 text-primary-700 hover:bg-primary-50 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] text-sm shadow-soft hover:shadow-medium"
                      >
                        Revisar Horarios en Línea
                        <ExternalLink size={14} />
                      </a>
                    </>
                  ) : (
                    <>
                      <div
                        className="w-full flex items-center justify-center text-center gap-2.5 bg-gray-100 border border-gray-200 text-gray-400 font-bold py-4 px-6 rounded-2xl cursor-not-allowed text-sm md:text-base select-none"
                        title="Las reservas por WhatsApp se encuentran inhabilitadas porque el servicio está inactivo."
                      >
                        <MessageCircle size={20} className="opacity-50" />
                        Reservar por WhatsApp (Inactivo)
                      </div>

                      <div
                        className="w-full flex items-center justify-center text-center gap-2.5 bg-gray-100 border border-gray-200 text-gray-400 font-bold py-4 px-6 rounded-2xl cursor-not-allowed text-sm select-none"
                        title="La agenda de horarios se encuentra inhabilitada porque el servicio está inactivo."
                      >
                        Horarios en Línea (Inactivo)
                      </div>

                      <div className="text-xs text-red-700 bg-red-50 border border-red-100 p-4 rounded-2xl font-semibold text-center mt-3 leading-relaxed">
                        * El servicio de consultorio psicológico se encuentra temporalmente inactivo.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation footer */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="container-custom flex items-center justify-start">
          <Link
            to="/zona-postulante"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-accent-700 font-semibold text-sm transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver a Zona del Postulante
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ConsultorioPsicologico;
