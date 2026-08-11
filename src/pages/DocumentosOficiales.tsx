"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Download, FileText, ExternalLink } from "lucide-react";
import { officialDocuments2027 } from "../data/documents";
import { useConfig } from "../context/ConfigContext";

const DocumentosOficiales: React.FC = () => {
  const { getImageUrl } = useConfig();
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden flex flex-col">
        {/* Full Width Image */}
        <div className="w-full relative z-10 shadow-2xl order-1 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[50vh]">
          <img
            src={getImageUrl("/documentos-oficiales-header.png")}
            alt="Documentos Oficiales CEPRUNSA"
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
              <FileText size={14} /> Documentos
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6 leading-tight">
              Documentos <span className="text-accent-900">Oficiales 2027</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Consulta y descarga las resoluciones y normativas oficiales aprobadas
              por el Consejo Universitario para el proceso de admisión 2027 de la UNSA.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            {officialDocuments2027.map((doc, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:border-primary-300 rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 md:max-w-xl">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md text-white mt-1 group-hover:scale-105 transition-transform">
                    <FileText size={22} />
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <h3 className="font-bold text-primary-700 text-lg group-hover:text-accent-700 transition-colors">
                        {doc.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 border border-accent-200">
                        {doc.badge}
                      </span>
                    </div>
                    <p className="text-secondary-600 leading-relaxed text-sm">
                      {doc.description}
                    </p>
                  </div>
                </div>

                <a
                  href={doc.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-center whitespace-nowrap gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md text-sm group-hover:shadow-lg w-fit self-center"
                >
                  <Download size={16} />
                  Ver documento
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              </div>
            ))}
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

export default DocumentosOficiales;
