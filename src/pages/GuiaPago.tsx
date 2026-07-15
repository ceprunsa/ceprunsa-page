"use client";

import type React from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ArrowRight,
  Smartphone,
  Laptop,
  Store,
  QrCode,
  Building,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Dirígete a Pagar Servicios",
    description:
      "Ingresa a cualquier canal del BCP (Banca Móvil, Banca por Internet, Agente o Yape) y selecciona la opción “Pagar servicios”.",
  },
  {
    step: "02",
    title: "Busca la Entidad",
    description:
      "Busca y selecciona la entidad “Universidad Nacional de San Agustín”.",
  },
  {
    step: "03",
    title: "Selecciona el Servicio",
    description:
      "Selecciona la opción de pago “UNSA-VIRTUAL” para proceder con las cuotas del CEPRUNSA.",
  },
  {
    step: "04",
    title: "Ingresa tu Código Web",
    description:
      "Ingresa el código web que se te asignó en el sistema SISADMISION al momento de tu inscripción.",
  },
];

const channels = [
  { icon: Store, label: "Agentes BCP", sub: "Red de agentes autorizados" },
  { icon: Smartphone, label: "Banca Móvil", sub: "App BCP en tu celular" },
  { icon: Laptop, label: "Banca por Internet", sub: "Vía web oficial de BCP" },
  { icon: QrCode, label: "Yape", sub: "Pago rápido desde tu app" },
];

const GuiaPago: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-accent-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="container-custom relative">
          <Link
            to="/zona-postulante/clases"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-accent-700 font-semibold mb-8 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zona del Postulante
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
              <Building size={14} /> Pago mediante BCP
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6 leading-tight">
              Cómo realizar el pago de <span className="text-accent-900">tus cuotas</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              El pago de las cuotas del CEPRUNSA se realiza utilizando el código web asignado en el sistema SISADMISION al momento de tu inscripción.
            </p>
          </div>
        </div>
      </section>

      {/* Canales de pago */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <h2 className="font-heading text-2xl font-bold text-primary-700 mb-8 text-center">
            Canales de pago disponibles (BCP)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {channels.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-md">
                  <Icon className="text-white" size={22} />
                </div>
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-700 mb-12 text-center">
            Pasos para realizar tu pago
          </h2>

          <div className="space-y-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="group flex gap-6 bg-gradient-to-br from-accent-50 to-white border border-accent-100 hover:border-accent-300 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-600 to-accent-800 flex items-center justify-center shadow-lg text-white font-bold text-lg group-hover:scale-105 transition-transform">
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
        </div>
      </section>

      {/* Navigation footer */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/zona-postulante/clases"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-accent-700 font-semibold text-sm transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Anterior: Acceso a Clases
          </Link>
          <Link
            to="/zona-postulante/clases"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-md text-sm group"
          >
            Ir a Acceso a Clases
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GuiaPago;
