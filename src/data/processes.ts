import type { Processes } from "../types";
import { siteConfig } from "./config";

export const processesOptions: string[] = [
  "CEPRUNSA I Fase",
  "CEPRUNSA Ciclo Quintos",
  "CEPRUNSA II Fase",
  "Proceso Extraordinario",
];

export const processes: Processes[] = [
  {
    id: "ceprunsa-1",
    title: "CEPRUNSA I Fase",
    shortTitle: "I Fase",
    badge: "MARZO - JULIO",
    targetAudience: "5° de Secundaria y Secundaria Completa",
    image: "/ceprunsa_i_fase.jpg",
    duration: "10 semanas",
    schedule: "Primera oportunidad anual",
    description:
      "Primer proceso anual para estudiantes de 5to de secundaria y egresados. Modalidad inicial de ingreso directo a la UNSA.",
    courses: [
      "Matemática (Álgebra, Aritmética y Geometría)",
      "Física y Química",
      "Biología y Ecología",
      "Comunicación (Lenguaje y Literatura)",
      "Historia del Perú y Universal",
      "Geografía y Economía",
      "Filosofía y Psicología",
      "Educación Cívica y Razonamiento Lógico",
      "Inglés Académico",
      "Razonamiento Verbal",
      "Razonamiento Matemático",
    ],
    benefits: [
      "Exámenes simulacro",
      "Talleres de lectura",
      "Talleres psicológicos",
      "Seminarios",
    ],
    eligibility: [
      "Estudiantes cursando 5° de Secundaria en el año lectivo.",
      "Egresados de educación secundaria pública o privada.",
    ],
    recommended: siteConfig.nextProcessToStart === 1,
    details: {
      inversion: "S/ 1,470.00",
      ultimoDiaPago: "17 de abril de 2026",
      modalidad: "Virtual",
      inicioClases: "27 de abril de 2026",
      finClases: "05 de julio de 2026",
      horarioClases: {
        dias: "De lunes a sábado",
        turnos: [
          "Turno 1: De 7:00 a 12:10 hrs.",
          "Turno 2: De 12:15 a 17:25 hrs.",
          "Turno 3: De 16:00 a 21:10 hrs.",
        ],
      },
      presentacion: {
        dirigidoA:
          "Escolares que están cursando el 5° año de secundaria y egresados de colegios públicos y privados que desean asegurar su vacante directa en la Universidad Nacional de San Agustín de Arequipa.",
        enQueConsiste:
          "CEPRUNSA I Fase es el primer ciclo académico regular del año en modalidad virtual. Ofrece una preparación integral orientada al balotario oficial de la UNSA, con evaluaciones sumativas clave que otorgan puntaje acumulativo para la adjudicación de vacantes en todas las carreras profesionales.",
        resumen:
          "Si estás por culminar el colegio o ya egresaste, esta es tu oportunidad de asegurar tu ingreso directo a la UNSA mediante una preparación rigurosa con los mejores catedráticos de la universidad.",
      },
      cronograma: [
        {
          event: "Inscripciones",
          date: "Del 23 de marzo al 17 de abril de 2026",
        },
        {
          event: "Inicio de Clases",
          date: "27 de abril de 2026",
        },
        {
          event: "Evaluación Previa",
          date: "21 de junio de 2026",
        },
        {
          event: "Evaluación de Conocimientos",
          date: "05 de julio de 2026",
        },
      ],
    },
  },
  {
    id: "ciclo-quintos",
    title: "CEPRUNSA Ciclo Quintos",
    shortTitle: "Ciclo Quintos",
    badge: "JULIO - NOVIEMBRE",
    targetAudience: "Exclusivo 5° de Secundaria en 2026",
    image: "/ceprunsa_ciclo_quintos.png",
    duration: "10 semanas",
    schedule: "Exclusivo para estudiantes de 5to año",
    description:
      "Proceso especial diseñado únicamente para estudiantes que están cursando el 5to año de secundaria.",
    courses: [
      "Matemática y Razonamiento Lógico",
      "Física y Química Aplicada",
      "Biología y Anatomía",
      "Comunicación y Lenguaje",
      "Historia y Realidad Nacional",
      "Geografía y Medio Ambiente",
      "Filosofía y Desarrollo Ciudadano",
      "Razonamiento Verbal",
      "Razonamiento Matemático",
    ],
    benefits: [
      "Exámenes simulacro",
      "Talleres de lectura",
      "Talleres psicológicos",
      "Seminarios",
    ],
    eligibility: [
      "Única y exclusivamente estudiantes que estén cursando el 5° año de Secundaria.",
    ],
    recommended: siteConfig.nextProcessToStart === 2,
    details: {
      inversion: "S/ 1,470.00",
      ultimoDiaPago: "14 de agosto de 2026",
      modalidad: "Virtual",
      inicioClases: "24 de agosto de 2026",
      finClases: "01 de noviembre de 2026",
      horarioClases: {
        dias: "De lunes a sábado",
        turnos: [
          "Turno 1: De 7:00 a 12:10 hrs.",
          "Turno 3: De 16:00 a 21:10 hrs.",
        ],
      },
      presentacion: {
        dirigidoA:
          "Escolares que cursan el 5° de secundaria en el año lectivo actual y desean lograr su ingreso a la universidad en modalidad virtual antes de terminar el colegio.",
        enQueConsiste:
          "En CEPRUNSA Ciclo Quintos podrás prepararte virtualmente con la plataforma oficial de la UNSA, preparándote simultáneamente mientras terminas la secundaria. Competirás únicamente contra otros estudiantes de 5to año por un paquete especial de vacantes exclusivas.",
        resumen:
          "Si pasas a 5° de Secundaria, esta es la oportunidad de descubrir todo lo que puedes ser y hacer. Asegura tu vacante a la UNSA sin esperar a graduarte.",
      },
      cronograma: [
        {
          event: "Inscripciones",
          date: "Del 27 de julio al 14 de agosto de 2026",
        },
        {
          event: "Inicio de Clases",
          date: "24 de agosto de 2026",
        },
        {
          event: "Evaluación Previa",
          date: "18 de octubre de 2026",
        },
        {
          event: "Evaluación de Conocimientos",
          date: "01 de noviembre de 2026",
        },
      ],
    },
  },
  {
    id: "ceprunsa-2",
    title: "CEPRUNSA II Fase",
    shortTitle: "II Fase",
    badge: "OCTUBRE - ENERO",
    targetAudience: "5° de Secundaria y Secundaria Completa",
    image: "/ceprunsa_ii_fase.jpg",
    duration: "10 semanas",
    schedule: "Segunda oportunidad anual",
    description:
      "Segundo proceso anual para estudiantes de 5to de secundaria y egresados. Nueva oportunidad de ingreso directo.",
    courses: [
      "Matemática Integral",
      "Física y Química",
      "Biología y Ciencia Ambiental",
      "Lenguaje y Literatura",
      "Historia del Perú y del Mundo",
      "Geografía y Economía",
      "Filosofía, Psicología y Cívica",
      "Razonamiento Verbal",
      "Razonamiento Matemático",
    ],
    benefits: [
      "Exámenes simulacro",
      "Talleres de lectura",
      "Talleres psicológicos",
      "Seminarios",
    ],
    eligibility: [
      "Público en general y egresados de secundaria.",
      "Estudiantes que hayan culminado el 5to año de secundaria.",
    ],
    recommended: siteConfig.nextProcessToStart === 3,
    details: {
      inversion: "S/ 1,470.00",
      ultimoDiaPago: "06 de noviembre de 2026",
      modalidad: "Virtual",
      inicioClases: "16 de noviembre de 2026",
      finClases: "24 de enero de 2027",
      horarioClases: {
        dias: "De lunes a sábado",
        turnos: [
          "Turno 1: De 7:00 a 12:10 hrs.",
          "Turno 2: De 12:15 a 17:25 hrs.",
          "Turno 3: De 16:00 a 21:10 hrs.",
        ],
      },
      presentacion: {
        dirigidoA:
          "Jóvenes egresados de secundaria y postulantes en general que buscan consolidar su preparación en modalidad virtual durante el ciclo de II Fase.",
        enQueConsiste:
          "CEPRUNSA II Fase es la segunda oportunidad anual en modalidad virtual para el ingreso directo a la UNSA. Con una metodología acelerada y orientada a resultados, los alumnos repasan de manera estratégica todo el prospecto de admisión con docentes experimentados.",
        resumen:
          "Aprovecha esta oportunidad para asegurar tu vacante a la universidad. Con CEPRUNSA II Fase tendrás una preparación concentrada e intensiva con evaluación directa.",
      },
      cronograma: [
        {
          event: "Inscripciones",
          date: "Del 12 de octubre al 06 de noviembre de 2026",
        },
        {
          event: "Inicio de Clases",
          date: "16 de noviembre de 2026",
        },
        {
          event: "Evaluación Previa",
          date: "10 de enero de 2027",
        },
        {
          event: "Evaluación de Conocimientos",
          date: "24 de enero de 2027",
        },
      ],
    },
  },
  {
    id: "extraordinario",
    title: "Proceso Extraordinario",
    shortTitle: "Extraordinario",
    badge: "ENERO - FEBRERO",
    targetAudience: "Secundaria Completa",
    image: "/proceso_extraordinario.jpg",
    duration: "3 semanas",
    schedule: "Modalidad Intensiva",
    description:
      "Proceso de admisión dirigido a postulantes con aptitudes y condiciones especiales, egresados excelentes, profesionales, deportistas, entre otros.",
    courses: [
      "Razonamiento Verbal",
      "Razonamiento Matemático",
      "Realidad Nacional y Cívica",
    ],
    benefits: ["Talleres de lectura", "Talleres psicológicos", "Seminarios"],
    eligibility: [
      "Primeros puestos de secundaria de cada región.",
      "Personas con discapacidad acreditadas por CONADIS.",
      "Egresados de Bachillerato Internacional y COAR.",
    ],
    additionalEligibility: [
      "Deportistas destacados acreditados por el IPD.",
      "Postulantes por traslados externos o internos.",
      "Titulados o graduados de universidades e instituciones de educación superior.",
      "Víctimas del terrorismo (Ley 27277) o de la violencia social.",
      "Postulantes del Convenio Andrés Bello.",
      "Egresados y bachilleres de universidades con licencia denegada por SUNEDU.",
    ],
    recommended: siteConfig.nextProcessToStart === 4,
    details: {
      inversion: "S/ 1,800.00",
      ultimoDiaPago: "27 de enero de 2027",
      modalidad: "Virtual",
      inicioClases: "01 de febrero de 2027",
      finClases: "23 de febrero de 2027",
      horarioClases: {
        dias: "De lunes a sábado",
        turnos: [
          "Turno 1: De 7:00 a 12:10 hrs.",
          "Turno 2: De 12:15 a 17:25 hrs.",
          "Turno 3: De 16:00 a 21:10 hrs.",
        ],
      },
      presentacion: {
        dirigidoA:
          "Postulantes que acrediten condiciones de excelencia académica (1er y 2do puesto escolar, Bachillerato Internacional, COAR), deportistas de alto nivel (IPD), personas con discapacidad (CONADIS), traslados universitarios y egresados titulados.",
        enQueConsiste:
          "El Proceso Extraordinario de CEPRUNSA en modalidad virtual brinda una preparación intensiva y una vía de admisión diferenciada a quienes destacan en ámbitos académicos, deportivos o de superación personal.",
        resumen:
          "Aprovecha tu mérito académico, deportivo o profesional para ingresar a la UNSA mediante un proceso exclusivo diseñado para tu perfil.",
      },
      cronograma: [
        {
          event: "Inscripciones",
          date: "Del 04 de enero al 27 de enero de 2027",
        },
        {
          event: "Inicio de Clases",
          date: "01 de febrero de 2027",
        },
        {
          event: "Evaluación Previa",
          date: "14 de febrero de 2027",
        },
        {
          event: "Evaluación de Aptitud Académica",
          date: "21 de febrero de 2027",
        },
        {
          event: "Asignación de vacantes",
          date: "23 de febrero de 2027",
        },
      ],
    },
  },
];

export const processTimeline = [
  {
    title: "CEPRUNSA I Fase",
    period: "Marzo - Julio 2026",
    description: "Primer proceso del año - Mayor demanda",
  },
  {
    title: "CEPRUNSA Ciclo Quintos",
    period: "Julio - Noviembre 2026",
    description: "Exclusivo para estudiantes de 5to",
  },
  {
    title: "CEPRUNSA II Fase",
    period: "Octubre 2026 - Enero 2027",
    description: "Segunda oportunidad anual",
  },
  {
    title: "Proceso Extraordinario",
    period: "Enero - Febrero 2027",
    description:
      "Oportunidad para Primeros Puestos, COAR, deportistas destacados, personas con discapacidad y Titulados",
  },
];
