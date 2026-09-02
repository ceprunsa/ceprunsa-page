import React from "react";
import { Link } from "react-router-dom";
import { Target, Award, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

const MisionVision: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-accent-900 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
        <div className="container-custom relative z-10">
          <Link
            to="/nosotros#conoce-mas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold mb-6 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft size={16} /> Volver a Nosotros
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Misión y <span className="text-yellow-400">Visión</span>
          </h1>
          <p className="text-primary-100 max-w-2xl text-base sm:text-lg">
            Los principios orientadores que impulsan nuestro modelo educativo y nuestro compromiso con el futuro de Arequipa.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Misión Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/80 hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-accent-100 text-accent-700 flex items-center justify-center mb-6 shadow-sm">
                <Target size={36} />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Nuestra Misión
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Brindar una preparación preuniversitaria de máxima excelencia académica que prepare a los postulantes para el examen de admisión de la Universidad Nacional de San Agustín de Arequipa (UNSA), impulsando el desarrollo de competencias esenciales, vocación y aptitudes requeridas para asegurar el éxito universitario.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-accent-700 text-sm font-bold">
              <CheckCircle2 size={18} /> Preparación Integral y Orientación Vocacional
            </div>
          </div>

          {/* Visión Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/80 hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6 shadow-sm">
                <Award size={36} />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Nuestra Visión
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Consolidarnos como el centro preuniversitario referente a nivel regional y nacional, reconocido por la excelencia de sus programas formativos, la constante innovación pedagógica y la elevada tasa de ingresantes que transforman su esfuerzo en éxito académico.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-primary-700 text-sm font-bold">
              <ShieldCheck size={18} /> Liderazgo y Calidad Académica Regional
            </div>
          </div>
        </div>

        {/* Pilares Institucionales */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-medium border border-slate-200/80">
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 text-center">
            Pilares Estratégicos Institucionales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-accent-600 font-extrabold text-lg mb-2">01. Excelencia</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Docentes especializados y contenidos rigurosamente alineados al prospecto UNSA.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-primary-600 font-extrabold text-lg mb-2">02. Innovación</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Uso de tecnologías avanzadas y metodología participativa continua.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-accent-600 font-extrabold text-lg mb-2">03. Compromiso</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Acompañamiento psicológico y académico permanente para el postulante.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link Bottom */}
        <div className="mt-12 text-center">
          <Link
            to="/nosotros#conoce-mas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold transition-all shadow-md"
          >
            <ArrowLeft size={18} /> Volver a Nosotros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MisionVision;
