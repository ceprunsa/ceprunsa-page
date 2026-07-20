import type { Processes } from "../types";

export const processesOptions: string[] = [
  "CEPRUNSA I Fase",
  "CEPRUNSA Ciclo Quintos",
  "CEPRUNSA II Fase",
  "Proceso Extraordinario",
];

export const processes: Processes[] = [
  {
    title: "CEPRUNSA I Fase",
    duration: "10 semanas",
    schedule: "Primera oportunidad anual",
    description:
      "Primer proceso anual para estudiantes de 5to de secundaria y egresados. Modalidad inicial de ingreso directo a la UNSA.",
    courses: [
      "Matemática",
      "Física",
      "Química",
      "Biología",
      "Comunicación (Lenguaje y Literatura)",
      "Historia del Perú",
      "Historia Universal",
      "Geografía",
      "Economía",
      "Filosofía",
      "Psicología",
      "Educación Cívica",
      "Inglés",
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
      "Público en general",
      "Estudiantes de 5to de secundaria (Quintos)",
    ],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: false,
  },
  {
    title: "CEPRUNSA Ciclo Quintos",
    duration: "10 semanas",
    schedule: "Exclusivo para estudiantes de 5to año",
    description:
      "Proceso especial diseñado únicamente para estudiantes que están cursando el 5to año de secundaria.",
    courses: [
      "Matemática",
      "Física",
      "Química",
      "Biología",
      "Comunicación (Lenguaje y Literatura)",
      "Historia del Perú",
      "Historia Universal",
      "Geografía",
      "Economía",
      "Filosofía",
      "Psicología",
      "Educación Cívica",
      "Inglés",
      "Razonamiento Verbal",
      "Razonamiento Matemático",
    ],
    benefits: [
      "Exámenes simulacro",
      "Talleres de lectura",
      "Talleres psicológicos",
      "Seminarios",
    ],
    eligibility: ["Solo estudiantes de 5to de secundaria (Quintos)"],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: true,
  },
  {
    title: "CEPRUNSA II Fase",
    duration: "10 semanas",
    schedule: "Segunda oportunidad anual",
    description:
      "Segundo proceso anual para estudiantes de 5to de secundaria y egresados. Nueva oportunidad de ingreso directo.",
    courses: [
      "Matemática",
      "Física",
      "Química",
      "Biología",
      "Comunicación (Lenguaje y Literatura)",
      "Historia del Perú",
      "Historia Universal",
      "Geografía",
      "Economía",
      "Filosofía",
      "Psicología",
      "Educación Cívica",
      "Inglés",
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
      "Público en general",
      "Estudiantes de 5to de secundaria (Quintos)",
    ],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: false,
  },
  {
    title: "Proceso Extraordinario",
    duration: "3 semanas",
    schedule: "Modalidad Intensiva",
    description:
      "Proceso de admisión dirigido a postulantes con aptitudes y condiciones especiales, egresados excelentes, profesionales, deportistas, entre otros.",
    courses: [
      "Razonamiento Verbal",
      "Razonamiento Matemático",
      "Realidad Lógico",
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
      "Víctimas del terrorismo o de la violencia ocurrida entre 1980 y 2000.",
      "Postulantes del Convenio Andrés Bello.",
      "Egresados y bachilleres de universidades con licencia denegada por SUNEDU.",
      "Otros casos autorizados por el Consejo Universitario.",
    ],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: false,
  },
];

export const processTimeline = [
  {
    title: "CEPRUNSA I Fase",
    period: "Abril - Julio",
    description: "Primer proceso del año - Mayor demanda",
  },
  {
    title: "CEPRUNSA Ciclo Quintos",
    period: "Agosto - Noviembre",
    description: "Exclusivo para estudiantes de 5to",
  },
  {
    title: "CEPRUNSA II Fase",
    period: "Diciembre - Febrero",
    description: "Segunda oportunidad anual",
  },
  {
    title: "Proceso Extraordinario",
    period: "Febrero",
    description:
      "Oportunidad para Primeros Puestos, COAR, deportistas destacados, personas con discapacidad y Titulados",
  },
];
