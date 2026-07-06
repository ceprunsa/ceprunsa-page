import React, { useState, useMemo } from "react";
import { Search, Filter, BookOpen, GraduationCap, ExternalLink } from "lucide-react";
import { unsaCarreras } from "../data/unsa_carreras";

interface CarreraData {
  nombre: string;
  area: string;
  facultad: string;
  url: string;
  imagen: string;
  descripcion: string;
  codigo?: string;
}

const Carreras: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("Todas");
  const [selectedFacultad, setSelectedFacultad] = useState<string>("Todas");

  // Aplanar los datos
  const allCarreras = useMemo(() => {
    const arr: CarreraData[] = [];
    Object.entries(unsaCarreras).forEach(([area, facultades]) => {
      Object.entries(facultades as any).forEach(([facultad, carreras]) => {
        Object.entries(carreras as any).forEach(([nombre, detalles]: [string, any]) => {
          arr.push({
            nombre,
            area,
            facultad,
            url: detalles.url || "#",
            imagen: detalles.imagen || "/home_image.jpeg",
            descripcion: detalles.por_que_estudiar?.descripcion || "Carrera profesional de la UNSA.",
            codigo: detalles.codigo,
          });
        });
      });
    });
    // Ordenar alfabéticamente
    return arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, []);

  // Extraer opciones únicas
  const areas = useMemo(() => ["Todas", ...new Set(allCarreras.map((c) => c.area))], [allCarreras]);
  
  const facultadesDisponibles = useMemo(() => {
    if (selectedArea === "Todas") {
      return ["Todas", ...new Set(allCarreras.map((c) => c.facultad))];
    }
    return [
      "Todas",
      ...new Set(allCarreras.filter((c) => c.area === selectedArea).map((c) => c.facultad)),
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
      const matchSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.facultad.toLowerCase().includes(searchTerm.toLowerCase());
      const matchArea = selectedArea === "Todas" || c.area === selectedArea;
      const matchFacultad = selectedFacultad === "Todas" || c.facultad === selectedFacultad;
      
      return matchSearch && matchArea && matchFacultad;
    });
  }, [allCarreras, searchTerm, selectedArea, selectedFacultad]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden flex flex-col">
        {/* Full Width Image */}
        <div className="w-full relative z-10 shadow-2xl order-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh]">
          <img
            src="/home_image.jpeg"
            alt="Carreras UNSA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="container-custom relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 z-10 text-center order-2">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-700 mb-6">
              Descubre tu <span className="text-accent-900 relative">Vocación</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Explora las diferentes carreras profesionales que la Universidad Nacional de San Agustín tiene para ofrecerte.
            </p>
          </div>
        </div>
      </section>

      {/* Buscador y Filtros */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative" id="carreras">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container-custom relative">

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
            Mostrando <span className="font-semibold text-primary-700">{filteredCarreras.length}</span> carreras
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
                    src={carrera.imagen}
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
                      <ExternalLink size={16} className="ml-2 opacity-70 group-hover/btn:opacity-100" />
                    </a>
                    {carrera.codigo && (
                      <a
                        href={`http://extranet.unsa.edu.pe/tmp/plan_${carrera.codigo}_2025.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-accent-50 text-accent-700 hover:bg-accent-600 hover:text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-300 group/btn2"
                      >
                        Ver Plan de Estudios
                        <ExternalLink size={16} className="ml-2 opacity-70 group-hover/btn2:opacity-100" />
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
            <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron carreras</h3>
            <p className="text-gray-500">
              Intenta buscar con otros términos o cambia los filtros seleccionados.
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
