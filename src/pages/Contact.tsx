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
} from "lucide-react";
import { contactInfo, processesOptions, faqs } from "../data";
import type { FormData } from "../types";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    process: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        process: "",
        message: "",
      });
    }, 2000);
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

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-4 bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-all duration-300 border border-gray-100 hover:border-accent-200">
                      <div
                        className={`${info.color} bg-white p-4 rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-300`}
                      >
                        <info.icon size={28} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-700 mb-3 text-lg">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-gray-600 leading-relaxed"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="text-center z-10">
                  <MapPin className="text-gray-400 mx-auto mb-4" size={64} />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    Ubicación CEPRUNSA
                  </h3>
                  <p className="text-gray-500">Mapa interactivo próximamente</p>
                </div>
                {/* Location markers */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="text-sm font-bold text-accent-600">UNSA</div>
                  <div className="text-xs text-gray-600">Universidad</div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="text-sm font-bold text-primary-600">
                    CEPRUNSA
                  </div>
                  <div className="text-xs text-gray-600">Centro</div>
                </div>
              </div>
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
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          name="program"
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
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Contacto <span className="text-accent-900">Rápido</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Necesitas información inmediata? Contáctanos por estos medios
              directos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-green-200 text-center">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="text-green-600" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-700 mb-4">
                  WhatsApp
                </h3>
                <p className="text-gray-600 mb-6">
                  Chatea con nosotros en tiempo real
                </p>
                <a
                  href="https://wa.me/51054123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  WhatsApp
                  <ChevronRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </a>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-blue-200 text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="text-blue-600" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-700 mb-4">
                  Llamada Directa
                </h3>
                <p className="text-gray-600 mb-6">
                  Habla con nuestros asesores
                </p>
                <a
                  href="tel:+51054123456"
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  Llamar Ahora
                  <ChevronRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </a>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-accent-200 text-center">
                <div className="bg-gradient-to-br from-accent-100 to-accent-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="text-accent-600" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-700 mb-4">
                  Cita Presencial
                </h3>
                <p className="text-gray-600 mb-6">
                  Visítanos en nuestras instalaciones
                </p>
                <button className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 group">
                  Agendar Cita
                  <ChevronRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </button>
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
              href="tel:+51054123456"
              className="bg-white text-accent-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Phone className="inline mr-2" size={20} /> Llamar Ahora
              <ChevronRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="https://wa.me/51054123456"
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
