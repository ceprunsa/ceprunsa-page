import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, CheckCircle2, Award, FileCheck, RefreshCw, Users, Star } from "lucide-react";

const Iso9001: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-accent-900 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
        <div className="container-custom relative z-10">
          <Link
            to="/nosotros"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold mb-6 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft size={16} /> Volver a Nosotros
          </Link>
          <div className="inline-block px-3 py-1 rounded-md bg-yellow-400 text-slate-900 font-extrabold text-xs uppercase tracking-widest mb-3">
            Calidad Garantizada
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Certificación <span className="text-yellow-400">ISO 9001:2015</span>
          </h1>
          <p className="text-primary-100 max-w-2xl text-base sm:text-lg">
            Compromiso institucional con los más altos estándares internacionales en la gestión de servicios educativos preuniversitarios.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom -mt-8 relative z-20">
        {/* Main Banner Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-primary-600 to-accent-700 text-white flex-shrink-0 flex items-center justify-center shadow-lg">
              <Award size={64} className="text-yellow-300" />
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Sistema de Gestión de la Calidad
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                CEPRUNSA se encuentra en proceso continuo de alineamiento e implementación de la norma <strong className="text-primary-700">ISO 9001:2015</strong>. Este estándar ratifica nuestra vocación de mejora continua, optimización de procesos académicos y satisfacción permanente de nuestros estudiantes y familias.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <FileCheck size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Procesos Académicos
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Diseño curricular y material educativo evaluado y respaldado bajo estrictos controles institucionales.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center mb-4">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Mejora Continua
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Auditorías internas y retroalimentación permanente para perfeccionar cada ciclo de enseñanza.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Docentes Calificados
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Selección rigurosa de profesionales con amplia experiencia en cátedra preuniversitaria UNSA.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center mb-4">
              <Star size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Satisfacción del Alumno
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Canales de atención eficientes para responder inquietudes administrativas y académicas a tiempo.
            </p>
          </div>
        </div>

        {/* Benefits banner */}
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-8 sm:p-10 rounded-3xl border border-accent-200/80 mb-12">
          <h3 className="font-heading text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-accent-700" size={24} />
            ¿Qué garantiza la certificación ISO 9001 a nuestros estudiantes?
          </h3>
          <ul className="space-y-3 text-slate-700 text-sm sm:text-base font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-accent-600 flex-shrink-0 mt-0.5" size={18} />
              <span>Garantía de cumplimiento del 100% del temario establecido en el prospecto de admisión UNSA.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-accent-600 flex-shrink-0 mt-0.5" size={18} />
              <span>Plataforma virtual optimizada e infraestructura tecnológica segura y accesible.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-accent-600 flex-shrink-0 mt-0.5" size={18} />
              <span>Transparencia y puntualidad en cronogramas de clases, simulacros y resultados.</span>
            </li>
          </ul>
        </div>

        {/* Back Link Bottom */}
        <div className="text-center">
          <Link
            to="/nosotros"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold transition-all shadow-md"
          >
            <ArrowLeft size={18} /> Volver a Nosotros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Iso9001;
