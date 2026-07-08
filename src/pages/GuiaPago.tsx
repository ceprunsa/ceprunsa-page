"use client";

import type React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  FileText,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Ingresa al portal UNSApay",
    description:
      'Abre tu navegador y visita el portal oficial de pagos de la UNSA en unsapay.unsa.edu.pe o busca "UNSApay UNSA" en Google. Asegúrate de acceder al sitio oficial.',
  },
  {
    step: "02",
    title: "Selecciona 'Pago de servicios académicos'",
    description:
      "En el menú principal, elige la opción correspondiente a tu tipo de pago: Inscripción a CEPRUNSA, cuota académica u otro servicio requerido.",
  },
  {
    step: "03",
    title: "Ingresa tu código de estudiante o DNI",
    description:
      "Escribe tu número de DNI o código de postulante para que el sistema identifique tu cuenta y muestre los conceptos de pago pendientes.",
  },
  {
    step: "04",
    title: "Selecciona el concepto a pagar",
    description:
      "Elige el concepto de pago que corresponde a tu proceso (ej. Inscripción CEPRUNSA I Fase). Verifica el monto y los datos antes de continuar.",
  },
  {
    step: "05",
    title: "Elige tu método de pago",
    description:
      "UNSApay acepta: tarjeta de crédito/débito Visa o Mastercard, transferencia bancaria y pago en agentes autorizados. Selecciona el que prefieras.",
  },
  {
    step: "06",
    title: "Confirma y guarda el comprobante",
    description:
      "Tras completar el pago, descarga o imprime el comprobante. Guárdalo en un lugar seguro y envíalo al correo de CEPRUNSA si se te solicita para validar tu inscripción.",
  },
];

const normativa = [
  "Los pagos deben realizarse dentro del plazo establecido en el cronograma oficial de cada proceso.",
  "No se aceptan pagos en efectivo directamente en las instalaciones de CEPRUNSA.",
  "El comprobante de pago es el único documento válido para confirmar tu inscripción.",
  "En caso de error en el pago, comunícate con Tesorería de la UNSA presentando el comprobante.",
  "Los pagos realizados fuera de fecha no garantizan la inclusión en el proceso vigente.",
  "Las devoluciones de pago están sujetas a evaluación y se rigen por el reglamento de la UNSA.",
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
              <CreditCard size={14} /> Video + Normativa
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6 leading-tight">
              Cómo pagar con{" "}
              <span className="text-accent-900">UNSApay</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Guía completa para realizar tu pago de inscripción a CEPRUNSA de forma
              segura a través de la plataforma oficial UNSApay de la UNSA.
            </p>
          </div>
        </div>
      </section>

      {/* Video tutorial */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-700 mb-8 text-center">
            Video tutorial: <span className="text-accent-900">Pago en UNSApay</span>
          </h2>

          {/* Video embed — replace src with the real YouTube embed URL */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-large border border-gray-100">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Tutorial: Cómo pagar con UNSApay en CEPRUNSA"
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

      {/* Métodos de pago */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <h2 className="font-heading text-2xl font-bold text-primary-700 mb-8 text-center">
            Métodos de pago aceptados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: CreditCard, label: "Tarjeta Visa / Mastercard", sub: "Crédito o débito" },
              { icon: DollarSign, label: "Transferencia bancaria", sub: "BCP, Interbank, Scotiabank" },
              { icon: ShieldCheck, label: "Agentes autorizados", sub: "BBVA, Kasnet, Western Union" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
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

      {/* Normativa */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-700 mb-10 text-center flex items-center justify-center gap-3">
            <FileText size={28} className="text-accent-600" />
            Normativa de pagos
          </h2>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden">
            {normativa.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 ${i < normativa.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
              >
                <CheckCircle size={18} className="text-accent-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="mt-6 flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Verifica siempre que estás en el sitio oficial de la UNSA antes de ingresar tus datos bancarios. Nunca compartas tu contraseña con terceros.
            </p>
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
