import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";
import { methodologyItems } from "../data";
import { useConfig } from "../context/ConfigContext";

const Metodologia: React.FC = () => {
  const { getImageUrl } = useConfig();
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Image Header */}
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] overflow-hidden shadow-xl">
        <img
          src={getImageUrl("/images/nosotros/metodologia.jpg")}
          alt="Nuestra Metodología CEPRUNSA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0 container-custom z-10 text-white">
          <Link
            to="/nosotros#conoce-mas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold mb-3 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft size={16} /> Volver a Nosotros
          </Link>
          <div className="inline-block px-3 py-1 rounded-md bg-yellow-400 text-slate-900 font-extrabold text-xs uppercase tracking-widest mb-3 shadow">
            Preparación Intensiva de 10 Semanas
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
            Nuestra <span className="text-yellow-400">Metodología</span>
          </h1>
          <p className="text-primary-100 max-w-2xl text-base sm:text-lg drop-shadow">
            Un sistema integral de aprendizaje y evaluación diseñado específicamente para asegurar tu ingreso a la Universidad Nacional de San Agustín.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom -mt-8 relative z-20">
        {/* Main Advantage Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/80 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-accent-100 text-accent-700 flex-shrink-0 flex items-center justify-center shadow-md">
              <Target size={44} />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-2">
                La Ventaja Metodológica CEPRUNSA
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Nuestros exámenes de admisión se basan estrictamente en el avance académico realizado durante las <strong>10 semanas</strong> del ciclo. Garantizamos que estudies exactamente lo que vendrá en tus exámenes.
              </p>
            </div>
          </div>
        </div>

        {/* Grid of Methodology items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {methodologyItems.map((item, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-3xl shadow-medium hover:shadow-xl transition-all duration-300 border border-slate-200/80 ${item.borderColor} flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`${item.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xs`}
                >
                  <item.icon className={item.iconColor} size={30} />
                </div>
                <h3 className="font-heading text-xl font-extrabold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Estrategia 0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Back Link Bottom */}
        <div className="text-center">
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

export default Metodologia;
