"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Send,
  CheckCircle,
  MessageCircle,
  Calendar,
  ChevronRight,
  Facebook,
} from "lucide-react";
import { processesOptions, faqs } from "../data";
import type { FormData } from "../types";

gsap.registerPlugin(ScrollTrigger);

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL ?? "";

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const formElement = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    process: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ".contact-info",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".contact-form",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formElement.current) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch (err) {
        if (response.ok) {
          result = { status: "success" };
        } else {
          throw new Error("Respuesta no válida del servidor");
        }
      }

      if (result && result.status === "success") {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", process: "", message: "" });
      } else {
        throw new Error(result?.message || "Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Apps Script Submit Error:", error);
      setSubmitError("Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo o contáctanos directamente por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="container-custom relative">
          <div className="text-center ">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              <span className="text-accent-900 relative">Contáctanos</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Estamos aquí para resolver todas tus dudas sobre los procesos
              CEPRUNSA y ayudarte a comenzar tu preparación para el ingreso
              directo a la UNSA.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="contact-info">
              <h2 className="font-heading text-3xl font-bold text-primary-700 mb-8">
                Información de Contacto
              </h2>
              <p className="text-secondary-600 mb-8 leading-relaxed text-lg">
                Ponte en contacto con nosotros a través de cualquiera de estos
                medios. Nuestro equipo de asesores académicos especializados en
                CEPRUNSA está disponible para brindarte toda la información que
                necesitas.
              </p>

              {/* Contact info grid — uniform clickable cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Dirección */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calle+San+Agustin+108+Arequipa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-200 p-5 rounded-2xl transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-primary-700 text-sm mb-0.5">Dirección</p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-snug">
                      Calle San Agustín 108<br />
                      <span className="text-[11px] text-gray-500 font-medium">(A media cuadra de la Plaza de Armas)</span>
                    </p>
                  </div>
                </a>

                {/* Teléfono */}
                <a
                  href="tel:+51054391911"
                  className="group flex items-center gap-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-5 rounded-2xl transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-primary-700 text-sm mb-0.5">Teléfono</p>
                    <p className="text-gray-600 text-sm">
                      054-391911<br />
                      <span className="text-xs text-gray-500 font-medium">Anexos 1422</span>
                    </p>
                  </div>
                </a>

                {/* Email */}
                <div
                  className="group flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Send className="text-white" size={22} />
                  </div>
                  <div className="min-w-0 w-full">
                    <p className="font-semibold text-primary-700 text-sm mb-0.5">E-mails</p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-snug">
                      <a href="mailto:ceprunsa@unsa.edu.pe" className="text-accent-600 hover:underline">ceprunsa@unsa.edu.pe</a>
                      <span className="text-[11px] text-gray-400 block font-medium">(Institucional)</span>
                    </p>
                    <div className="text-[11px] text-gray-500 leading-normal mt-1 border-t border-gray-100 pt-1">
                      <span className="font-medium text-primary-700">Consultas:</span>
                      <div className="truncate"><a href="mailto:atencion.cliente@cepr.unsa.pe" className="hover:underline hover:text-accent-600">atencion.cliente@cepr.unsa.pe</a></div>
                      <div className="truncate"><a href="mailto:atencion.postulante@cepr.unsa.pe" className="hover:underline hover:text-accent-600">atencion.postulante@cepr.unsa.pe</a></div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/51908892331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 p-5 rounded-2xl transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="text-white" size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-primary-700 text-sm mb-0.5">WhatsApp</p>
                    <p className="text-gray-600 text-sm">+51 908 892 331</p>
                  </div>
                </a>

                {/* Horario — spans full width */}
                <div className="sm:col-span-2 group flex items-center gap-4 bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-200 p-5 rounded-2xl transition-all duration-300 hover:shadow-soft">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-700 text-sm mb-0.5">Horario de Atención</p>
                    <p className="text-gray-600 text-sm">Lunes a Viernes: 8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social networks */}
              <div className="mt-6 bg-gradient-to-br from-primary-50 to-accent-50/40 p-5 rounded-2xl border border-primary-100/60">
                <h3 className="font-semibold text-primary-800 mb-4 text-base">Síguenos en nuestras redes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/ceprunsaoficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Facebook className="text-white" size={22} />
                    </div>
                    <div>
                      <span className="block font-semibold text-sm text-gray-800 group-hover:text-blue-700 transition-colors">Facebook</span>
                      <span className="block text-xs text-gray-500">@ceprunsaoficial</span>
                    </div>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@ceprunsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-300 p-4 rounded-xl transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-[22px] h-[22px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-semibold text-sm text-gray-800 group-hover:text-black transition-colors">TikTok</span>
                      <span className="block text-xs text-gray-500">@ceprunsa</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Map */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=CEPRUNSA+Arequipa"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-6 block h-64 overflow-hidden rounded-2xl shadow-soft sm:h-72"
                aria-label="Buscar la ubicación de CEPRUNSA en Google Maps"
              >
                <img src="/ceprunsa_local.jpeg" alt="Sede de CEPRUNSA" width="848" height="355" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-white flex items-end gap-3 w-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-600/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <MapPin className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold leading-tight">Sede de CEPRUNSA</h3>
                    <p className="text-xs text-primary-100 flex items-center gap-1 mt-0.5">
                      Abrir indicaciones en Google Maps
                      <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div ref={formRef} className="contact-form">
              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
                <h2 className="font-heading text-3xl font-bold text-primary-700 mb-8">
                  Solicita Información
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-green-600" size={40} />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Gracias por tu interés en CEPRUNSA. Nos pondremos en
                      contacto contigo muy pronto para brindarte toda la
                      información sobre nuestros procesos.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Enviar Otro Mensaje
                    </button>
                  </div>
                ) : (
                  <form ref={formElement} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-3"
                        >
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 bg-white hover:border-accent-300"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-3"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 bg-white hover:border-accent-300"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-3"
                        >
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 bg-white hover:border-accent-300"
                          placeholder="999 999 999"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="program"
                          className="block text-sm font-medium text-gray-700 mb-3"
                        >
                          Proceso de Interés
                        </label>
                        <select
                          id="program"
                          name="process"
                          value={formData.process}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 bg-white hover:border-accent-300"
                        >
                          <option value="">Selecciona un proceso</option>
                          {processesOptions.map((process, index) => (
                            <option key={index} value={process}>
                              {process}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 resize-none bg-white hover:border-accent-300"
                        placeholder="Cuéntanos sobre tus objetivos académicos y cómo podemos ayudarte con tu ingreso a la UNSA..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>

                    {/* Error message */}
                    {submitError && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                        <span className="mt-0.5 flex-shrink-0">⚠️</span>
                        <p>{submitError}</p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section ref={faqRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre los
              procesos CEPRUNSA y nuestros servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item group">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-accent-200 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-accent-100 to-accent-200 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-accent-600 font-bold text-sm">
                        ?
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-700 mb-3 text-lg group-hover:text-accent-700 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="container-custom text-center relative">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            ¿Listo para comenzar tu preparación CEPRUNSA?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Da el primer paso hacia tu futuro universitario en la UNSA. Nuestro
            equipo especializado está esperando tu contacto.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+51054391911"
              className="bg-white text-accent-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Phone className="inline mr-2" size={20} /> Llamar Ahora
              <ChevronRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="https://wa.me/51908892331"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <MessageCircle className="inline mr-2" size={20} /> WhatsApp
              <ChevronRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
