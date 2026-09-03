import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  BookOpen,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { unsaCarreras } from "../data/unsa_carreras";
import { useConfig } from "../context/ConfigContext";

interface CarreraData {
  nombre: string;
  area: string;
  facultad: string;
  url: string;
  imagen: string;
  descripcion: string;
  codigo?: string;
}

interface CarreraDetalle {
  url?: string;
  imagen?: string;
  por_que_estudiar?: {
    descripcion?: string;
  };
  codigo?: string;
}

type CarrerasPorFacultad = Record<string, CarreraDetalle>;
type FacultadesPorArea = Record<string, CarrerasPorFacultad>;
type UnsaCarrerasData = Record<string, FacultadesPorArea>;

const Carreras: React.FC = () => {
  const { getImageUrl } = useConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("Todas");
  const [selectedFacultad, setSelectedFacultad] = useState<string>("Todas");

  // Aplanar los datos
  const allCarreras = useMemo(() => {
    const arr: CarreraData[] = [];
    Object.entries(unsaCarreras as UnsaCarrerasData).forEach(
      ([area, facultades]) => {
        Object.entries(facultades).forEach(([facultad, carreras]) => {
          Object.entries(carreras).forEach(([nombre, detalles]) => {
            arr.push({
              nombre,
              area,
              facultad,
              url: detalles.url || "#",
              imagen: detalles.imagen || "/home_image.jpeg",
              descripcion:
                detalles.por_que_estudiar?.descripcion ||
                "Carrera profesional de la UNSA.",
              codigo: detalles.codigo,
            });
          });
        });
      },
    );
    // Ordenar alfabéticamente
    return arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, []);

  // Extraer opciones únicas
  const areas = useMemo(
    () => ["Todas", ...new Set(allCarreras.map((c) => c.area))],
    [allCarreras],
  );

  const facultadesDisponibles = useMemo(() => {
    if (selectedArea === "Todas") {
      return ["Todas", ...new Set(allCarreras.map((c) => c.facultad))];
    }
    return [
      "Todas",
      ...new Set(
        allCarreras
          .filter((c) => c.area === selectedArea)
          .map((c) => c.facultad),
      ),
    ];
  }, [allCarreras, selectedArea]);

  // Manejar el cambio de área para resetear la facultad
  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setSelectedFacultad("Todas"); // Resetear facultad al cambiar de área
  };

  // Filtrado de carreras
  const filteredCarreras = useMemo(() => {
    return allCarreras.filter((c) => {
      const matchSearch =
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.facultad.toLowerCase().includes(searchTerm.toLowerCase());
      const matchArea = selectedArea === "Todas" || c.area === selectedArea;
      const matchFacultad =
        selectedFacultad === "Todas" || c.facultad === selectedFacultad;

      return matchSearch && matchArea && matchFacultad;
    });
  }, [allCarreras, searchTerm, selectedArea, selectedFacultad]);

  return (
    <div>
      {/* Dynamic Header Section matching Processes.tsx */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Descubre tu <span className="text-yellow-400">Vocación</span>
            </h1>
            <p className="text-primary-100 text-base sm:text-lg leading-relaxed">
              Explora las diferentes carreras profesionales que la Universidad Nacional de San Agustín tiene para ofrecerte.
            </p>
          </div>
        </div>
      </section>

      {/* ConoceT Mobile App Floating Card */}
      <div className="container-custom relative z-20 -mt-8 sm:-mt-10 max-w-5xl mb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Left: App Icon (Reduced size) */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-3xl shadow-lg border border-gray-100 p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/conocet-app-logo.png"
                  alt="ConoceT App Icon"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Middle: Content */}
            <div className="space-y-3 max-w-xl text-left flex-1">


              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] tracking-tight mb-2">
                  ¿Aún no sabes qué carrera elegir?
                </h2>
                <p className="text-[#FF8A00] font-semibold text-xs sm:text-sm italic mt-2">
                  "Descubre tu camino, construye tu futuro"
                </p>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Prueba <strong>ConoceT</strong>, la app oficial desarrollada por CEPRUNSA para brindarte orientación vocacional. Evalúa tus aptitudes, preferencias y dimensiones de personalidad para ayudarte a identificar las carreras profesionales que mejor se ajustan a tu perfil.
              </p>
            </div>

            {/* Right: Google Play Button */}
            <div className="flex-shrink-0 pt-2 lg:pt-0">
              <a
                href="https://play.google.com/store/apps/details?id=com.ceprunsa.conocet&hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0A0E1A] hover:bg-black text-white px-5 py-3 rounded-2xl border border-gray-700/70 shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z" fill="#EA4335" />
                    <path d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z" fill="#FBBC04" />
                    <path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z" fill="#4285F4" />
                    <path d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z" fill="#34A853" />
                  </g>
                </svg>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-widest">DISPONIBLE EN</span>
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight font-sans">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Buscador y Filtros */}
      <section
        className="section-padding bg-gradient-to-b from-white to-gray-50 relative"
        id="carreras"
      >
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative">
          {/* Title above filters */}
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-700 tracking-tight">
              Revisa nuestras <span className="text-accent-900">carreras</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-accent-600 rounded-full mx-auto mt-3"></div>
          </div>

          {/* Buscador y Filtros */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 mb-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Buscador */}
              <div className="relative w-full md:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por carrera o facultad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-xl border border-gray-200 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filtros */}
              <div className="flex flex-col sm:flex-row w-full md:w-1/2 gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={selectedArea}
                    onChange={handleAreaChange}
                    className="pl-9 w-full rounded-xl border border-gray-200 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-500 appearance-none bg-white transition-all cursor-pointer"
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area === "Todas" ? "Todas las Áreas" : area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={selectedFacultad}
                    onChange={(e) => setSelectedFacultad(e.target.value)}
                    className="pl-9 w-full rounded-xl border border-gray-200 py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-500 appearance-none bg-white transition-all cursor-pointer"
                  >
                    {facultadesDisponibles.map((fac) => (
                      <option key={fac} value={fac}>
                        {fac === "Todas" ? "Todas las Facultades" : fac}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Mostrando{" "}
              <span className="font-semibold text-primary-700">
                {filteredCarreras.length}
              </span>{" "}
              carreras
            </div>
          </div>

          {/* Lista de Carreras */}
          {filteredCarreras.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCarreras.map((carrera, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 border border-gray-100 flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(carrera.imagen)}
                      alt={carrera.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/home_image.jpeg";
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {carrera.area}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-accent-600 font-semibold mb-2">
                      <GraduationCap size={16} className="mr-1" />
                      {carrera.facultad}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {carrera.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                      {carrera.descripcion}
                    </p>

                    <div className="flex flex-col gap-2">
                      <a
                        href={carrera.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-300 group/btn"
                      >
                        Ver Detalles Oficiales
                        <ExternalLink
                          size={16}
                          className="ml-2 opacity-70 group-hover/btn:opacity-100"
                        />
                      </a>
                      {carrera.codigo && (
                        <a
                          href={
                            carrera.codigo === "406"
                              ? "http://extranet.unsa.edu.pe/tmp/plan_406_2017.pdf"
                              : `http://extranet.unsa.edu.pe/tmp/plan_${carrera.codigo}_2025.pdf`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full bg-accent-50 text-accent-700 hover:bg-accent-600 hover:text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-300 group/btn2"
                        >
                          Ver Plan de Estudios
                          <ExternalLink
                            size={16}
                            className="ml-2 opacity-70 group-hover/btn2:opacity-100"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-soft border border-gray-100">
              <GraduationCap className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No se encontraron carreras
              </h3>
              <p className="text-gray-500">
                Intenta buscar con otros términos o cambia los filtros
                seleccionados.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedArea("Todas");
                  setSelectedFacultad("Todas");
                }}
                className="mt-6 text-accent-600 hover:text-accent-700 font-semibold inline-flex items-center"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Carreras;
