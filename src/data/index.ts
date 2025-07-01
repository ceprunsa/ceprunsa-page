import {
  Award,
  Target,
  Users,
  BookOpen,
  Clock,
  MapPin,
  Phone,
  Mail,
  Brain,
  Heart,
  Shield,
  Lightbulb,
  CheckCircle,
  Timer,
  Handshake,
  Star,
  Eye,
  Scale,
  Crown,
} from "lucide-react";
import type {
  Feature,
  Stat,
  Processes,
  Testimonial,
  Value,
  ContactInfo,
  TeamMember,
} from "../types";

// Features data
export const features: Feature[] = [
  {
    icon: Target,
    title: "Modalidad de Ingreso Directo",
    description:
      "CEPRUNSA es una modalidad oficial de ingreso a la UNSA con su propio examen y vacantes exclusivas.",
  },
  {
    icon: Brain,
    title: "Preparación Integral en 10 Semanas",
    description:
      "15 cursos especializados con banco de contenido digital, prácticas semanales y seminarios de reforzamiento.",
  },
  {
    icon: Users,
    title: "Talleres de Desarrollo Personal",
    description:
      "Técnicas de estudio, manejo del tiempo, control de emociones y orientación académica.",
  },
];

// Stats data
export const stats: Stat[] = [
  { number: "3", label: "Procesos Anuales" },
  { number: "10", label: "Semanas de Preparación" },
  { number: "15", label: "Cursos" },
];

// Programs data
export const processes: Processes[] = [
  {
    title: "CEPRUNSA I Fase",
    duration: "10 semanas",
    schedule: "Preparación integral - 15 cursos",
    description:
      "Primer proceso anual para estudiantes de 5to de secundaria y egresados. Modalidad principal de ingreso directo a la UNSA.",
    features: [
      "15 cursos especializados del programa CEPRUNSA",
      "Banco de contenido digital por cada curso",
      "Prácticas semanales evaluadas y calificadas",
      "Seminarios de reforzamiento de temas clave",
      "Talleres de técnicas de estudio efectivas",
      "Manejo del tiempo y control de emociones",
      "Orientación académica personalizada",
      "Examen basado en el avance académico realizado",
    ],
    subjects: [
      "Matemática",
      "Comunicación",
      "Historia del Perú",
      "Geografía",
      "Economía",
      "Filosofía",
      "Psicología",
      "Física",
      "Química",
      "Biología",
      "Razonamiento Verbal",
      "Razonamiento Matemático",
      "Cultura General",
      "Actualidad",
      "Inglés",
    ],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: true,
  },
  {
    title: "CEPRUNSA Ciclo Quintos",
    duration: "10 semanas",
    schedule: "Exclusivo para estudiantes de 5to año",
    description:
      "Proceso especial diseñado únicamente para estudiantes que están cursando 5to año de secundaria.",
    features: [
      "Exclusivo para estudiantes de 5to de secundaria",
      "Horarios compatibles con estudios escolares",
      "Metodología adaptada al nivel académico",
      "Preparacion en 15 cursos",
      "Seguimiento académico personalizado",
      "Apoyo continuo durante el proceso",
      "Prácticas y seminarios especializados",
      "Examen de ingreso directo a la UNSA",
    ],
    subjects: [
      "Programa completo de 15 cursos CEPRUNSA",
      "Contenido adaptado para estudiantes de 5to año",
      "Reforzamiento en áreas clave",
    ],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: false,
  },
  {
    title: "CEPRUNSA II Fase",
    duration: "10 semanas",
    schedule: "Segunda oportunidad anual",
    description:
      "Segundo proceso anual para estudiantes de 5to de secundaria y egresados. Nueva oportunidad de ingreso directo.",
    features: [
      "Segunda convocatoria del año académico",
      "Misma preparación integral de 10 semanas",
      "15 cursos especializados actualizados",
      "Banco de contenido digital renovado",
      "Prácticas intensivas y seminarios",
      "Talleres de desarrollo personal",
      "Nuevas vacantes disponibles para UNSA",
      "Examen basado en avance académico",
    ],
    subjects: [
      "Programa completo de 15 cursos",
      "Contenido actualizado y reforzado",
      "Material de estudio renovado",
    ],
    price: "Consultar",
    installments: "Facilidades de pago disponibles",
    recommended: false,
  },
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    name: "María González",
    career: "Medicina Humana - UNSA",
    text: "Gracias al proceso CEPRUNSA I Fase logré ingresar directamente a Medicina. La preparación en 10 semanas fue intensa pero muy efectiva.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    career: "Ingeniería de Sistemas - UNSA",
    text: "El banco de contenido digital y las prácticas semanales me prepararon perfectamente para el examen CEPRUNSA.",
    rating: 5,
  },
  {
    name: "Ana Quispe",
    career: "Derecho - UNSA",
    text: "Los talleres de manejo de emociones y técnicas de estudio fueron clave para mi éxito en el examen CEPRUNSA.",
    rating: 5,
  },
];

// Values data for About page - Updated with CEPRUNSA values
export const values: Value[] = [
  {
    icon: Award,
    title: "Excelencia Académica",
    description:
      "Fomentar el compromiso con la calidad en la enseñanza y el aprendizaje, promoviendo el esfuerzo y la dedicación hacia el logro de metas académicas.",
  },
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Promover la seguridad y la credibilidad en las relaciones interpersonales, basadas en la honestidad y el respeto mutuo.",
  },
  {
    icon: Heart,
    title: "Empatía",
    description:
      "Fomentar la comprensión y la empatía hacia los demás, promoviendo un ambiente de respeto, compasión y apoyo mutuo entre los estudiantes y el personal del CEPRUNSA.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Fomentar la creatividad y el pensamiento original para generar nuevas ideas y soluciones para los desafíos presentes.",
  },
  {
    icon: CheckCircle,
    title: "Responsabilidad",
    description:
      "Cumplir con las obligaciones académicas y laborales con ética y eficiencia. Promover el sentido del deber en toda la comunidad.",
  },
  {
    icon: Timer,
    title: "Puntualidad",
    description:
      "Respetar el tiempo propio y ajeno, asegurando la puntualidad en todas las actividades. Cumplir con los compromisos a tiempo.",
  },
  {
    icon: Handshake,
    title: "Trabajo en Equipo",
    description:
      "Fomentar la colaboración y cooperación entre todos los miembros. Trabajar juntos para alcanzar metas comunes.",
  },
  {
    icon: Star,
    title: "Compromiso",
    description:
      "Dedicarse a los valores y objetivos de CEPRUNSA con responsabilidad. Asumir un compromiso personal y colectivo en el proceso educativo.",
  },
  {
    icon: Eye,
    title: "Respeto",
    description:
      "Fomentar la consideración y el trato digno hacia los demás, valorando la diversidad de ideas y opiniones. Promover un ambiente de convivencia basado en el respeto mutuo.",
  },
  {
    icon: Scale,
    title: "Probidad",
    description:
      "Actuar con integridad y honestidad en todas las acciones y decisiones. Mantener una conducta ética que refleje los principios de transparencia y rectitud.",
  },
  {
    icon: Crown,
    title: "Lealtad",
    description:
      "Ser fiel a los valores y objetivos de CEPRUNSA, mostrando un compromiso constante. Apoyar con sinceridad y confianza a la institución y a sus integrantes.",
  },
];

// Achievements data for About page
export const achievements = [
  { number: "15+", label: "Años de Experiencia", icon: Clock },
  { number: "95%", label: "Tasa de Ingreso", icon: Target },
  { number: "2000+", label: "Estudiantes Ingresantes", icon: Users },
  { number: "50+", label: "Docentes Especializados", icon: BookOpen },
];

// Contact information
export const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Av. Independencia 123", "Arequipa, Perú"],
    color: "text-accent-600",
  },
  {
    icon: Phone,
    title: "Teléfonos",
    details: ["(054) 123-456", "(054) 789-012"],
    color: "text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@ceprunsa.edu.pe", "admisiones@ceprunsa.edu.pe"],
    color: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Horarios",
    details: ["Lun - Vie: 8:00 AM - 8:00 PM", "Sáb: 8:00 AM - 2:00 PM"],
    color: "text-purple-600",
  },
];

// Process options for contact form
export const processesOptions: string[] = [
  "CEPRUNSA I Fase",
  "CEPRUNSA Ciclo Quintos",
  "CEPRUNSA II Fase",
  "Proceso Extraordinario",
];

// FAQ data
export const faqs = [
  {
    question: "¿Cuándo inician los procesos CEPRUNSA?",
    answer:
      "Tenemos 3 procesos anuales: CEPRUNSA I (marzo), Ciclo Quintos (junio) y CEPRUNSA II (septiembre). También hay un proceso extraordinario para casos especiales.",
  },
  {
    question: "¿Qué diferencia hay entre CEPRUNSA y el examen ordinario?",
    answer:
      "CEPRUNSA es una modalidad oficial de ingreso directo donde el examen se basa en el contenido desarrollado durante las 10 semanas de preparación, a diferencia del examen ordinario que tiene un temario general.",
  },
  {
    question: "¿Ofrecen becas o descuentos?",
    answer:
      "Sí, tenemos becas por mérito académico y descuentos por pronto pago. También ofrecemos facilidades de pago para todos nuestros procesos.",
  },
  {
    question: "¿Qué incluye el material de estudio?",
    answer:
      "Banco de contenido digital por cada uno de los 15 cursos, material impreso, acceso a plataforma virtual, simulacros semanales y talleres de desarrollo personal.",
  },
  {
    question: "¿Puedo cambiar de proceso CEPRUNSA?",
    answer:
      "Sí, puedes cambiar entre procesos según disponibilidad de cupos y cumpliendo con los requisitos específicos de cada modalidad.",
  },
  {
    question: "¿Cómo funciona el proceso extraordinario?",
    answer:
      "Es una modalidad especial de 3 semanas con 3 cursos para casos específicos como primeros puestos, deportistas destacados, personas con discapacidad y bachillerato internacional.",
  },
];

// Extraordinary process data
export const extraordinaryRequirements = [
  "Titulados o graduados de universidades públicas o privadas",
  "Primer y segundo puesto de instituciones educativas secundarias",
  "Deportistas destacados acreditados por el IPD",
  "Personas con discapacidad acreditadas por CONADIS",
  "Traslados externos e internos de universidades nacionales o extranjeras",
  "Bachillerato Internacional y egresados de COAR",
  "Convenio Andrés Bello",
];

export const extraordinaryPreparation = [
  "Primer y segundo puesto de instituciones educativas secundarias",
  "Deportistas destacados acreditados por el IPD",
  "Personas con discapacidad acreditadas por CONADIS",
  "Bachillerato Internacional y egresados de COAR",
];

// Timeline data for processes page
export const processTimeline = [
  {
    title: "CEPRUNSA I Fase",
    period: "Marzo - Mayo",
    description: "Primer proceso del año - Mayor demanda",
  },
  {
    title: "Ciclo Quintos",
    period: "Junio - Agosto",
    description: "Exclusivo para estudiantes de 5to",
  },
  {
    title: "CEPRUNSA II Fase",
    period: "Septiembre - Noviembre",
    description: "Segunda oportunidad anual",
  },
];

// Team members data for About page
export const teamMembers: TeamMember[] = [
  {
    name: "Mg. Arnaldo Humberto Valdivia Loaiza",
    role: "COORDINADOR ACADÉMICO",
    description:
      "Docente especializado en Filosofía, con una maestría en Docencia Universitaria y Gestión Educativa. Actualmente es docente en la Universidad Nacional de San Agustín, con experiencia previa en diversas universidades peruanas desde 2003. En cuanto a su formación académica, es bachiller y licenciado en Filosofía por la Universidad Nacional de San Agustín de Arequipa, además de haber completado un diplomado en Desarrollo de Habilidades Digitales para el Aprendizaje y programas de formación docente en enseñanza e innovación.",
    // image: "/images/team/arnaldo-valdivia.jpg", // Uncomment when image is available
    cvLink: "https://example.com/cv/arnaldo-valdivia",
  },
  {
    name: "Dra. Maria Elena Rojas Zegarra",
    role: "DIRECTORA",
    description:
      "Doctora en Psicología por la Universidad Complutense de Madrid. Actualmente, cursa el Máster en Investigación Psicológica por la Universidad Internacional de La Rioja (UNIR), España. Posee un Diplomado Internacional en el Modelo de Terapia Breve de Resolución de Problemas del Brief Therapy Center de Palo Alto, California, y es experta en Psicoterapia Breve para Niños y Adolescentes por la Universidad San Jorge, España.",
    // image: "/images/team/maria-rojas.jpg", // Uncomment when image is available
    cvLink: "https://example.com/cv/maria-rojas",
  },
  {
    name: "Mg. Jose Miguel Rojas Hualpa",
    role: "COORDINADOR ADMINISTRATIVO",
    description:
      "Posee el grado en Ciencias Biológicas por la Universidad Nacional de San Agustín de Arequipa (2010) y el grado en Ingeniería Ambiental (2018). Es Magíster en Biología Funcional y Molecular por la Universidad Estadual de Campinas (2014). Fue investigador en el Laboratorio de Química de Proteínas de la Universidad Estadual de Campinas (2012 – 2014).",
    // image: "/images/team/jose-rojas.jpg", // Uncomment when image is available
    cvLink: "https://example.com/cv/jose-rojas",
  },
];

// Methodology data for About page
export const methodologyItems = [
  {
    icon: BookOpen,
    title: "15 Cursos Especializados",
    description:
      "Contenido académico específicamente diseñado para el examen CEPRUNSA, con banco de contenido digital por cada curso.",
    bgColor: "bg-accent-100",
    iconColor: "text-accent-600",
    borderColor: "hover:border-accent-200",
  },
  {
    icon: Target,
    title: "Prácticas Semanales",
    description:
      "Evaluaciones constantes que simulan el examen real, permitiendo un seguimiento detallado del progreso académico.",
    bgColor: "bg-primary-100",
    iconColor: "text-primary-600",
    borderColor: "hover:border-primary-200",
  },
  {
    icon: Users,
    title: "Talleres Integrales",
    description:
      "Técnicas de estudio, manejo del tiempo, control de emociones y orientación académica personalizada.",
    bgColor: "bg-accent-100",
    iconColor: "text-accent-600",
    borderColor: "hover:border-accent-200",
  },
];
