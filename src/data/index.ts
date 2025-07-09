import {
  BookOpen,
  Users,
  Award,
  Target,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Brain,
  Lightbulb,
  Heart,
  Shield,
  Eye,
  Handshake,
  Trophy,
  Scale,
  Crown,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Calendar,
} from "lucide-react";

import type { Processes } from "../types";

export const features = [
  {
    icon: BookOpen,
    title: "15 Cursos Especializados",
    description:
      "Preparación integral en todas las materias del examen CEPRUNSA con contenido actualizado y metodología especializada.",
  },
  {
    icon: Clock,
    title: "10 Semanas Intensivas",
    description:
      "Programa de preparación concentrado y efectivo que optimiza tu tiempo de estudio para el examen de admisión.",
  },
  {
    icon: Target,
    title: "Examen Propio",
    description:
      "Tu examen se basa completamente en el contenido desarrollado durante las 10 semanas de preparación académica.",
  },
];

export const stats = [
  { number: "85%", label: "Tasa de Ingreso" },
  { number: "24", label: "Años de Experiencia" },
  { number: "15", label: "Cursos Especializados" },
  { number: "10", label: "Semanas de Preparación" },
  { number: "500+", label: "Estudiantes por Año" },
  { number: "95%", label: "Satisfacción Estudiantil" },
];

export const testimonials = [
  {
    name: "María González",
    career: "Ingeniería de Sistemas",
    text: "CEPRUNSA me dio las herramientas necesarias para ingresar a la carrera de mis sueños. La metodología es excelente y los profesores muy preparados.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    career: "Medicina Humana",
    text: "Gracias a la preparación integral de CEPRUNSA logré ingresar a Medicina. El contenido está perfectamente alineado con el examen.",
    rating: 5,
  },
  {
    name: "Ana Quispe",
    career: "Derecho",
    text: "La modalidad CEPRUNSA es la mejor opción para ingresar a la UNSA. Te preparan específicamente para tu propio examen de admisión.",
    rating: 5,
  },
];

export const values = [
  {
    icon: Award,
    title: "Excelencia Académica",
    description:
      "Fomentar el compromiso con la calidad en la enseñanza y el aprendizaje, promoviendo el esfuerzo y la dedicación hacia el logro de metas académicas.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Promover la seguridad y la credibilidad en las relaciones interpersonales, basadas en la honestidad y el respeto mutuo.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Empatía",
    description:
      "Fomentar la comprensión y la empatía hacia los demás, promoviendo un ambiente de respeto, compasión y apoyo mutuo entre los estudiantes y el personal del CEPRUNSA.",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Fomentar la creatividad y el pensamiento original para generar nuevas ideas y soluciones para los desafíos presentes.",
    color: "from-purple-400 to-violet-500",
  },
  {
    icon: CheckCircle,
    title: "Responsabilidad",
    description:
      "Cumplir con las obligaciones académicas y laborales con ética y eficiencia. Promover el sentido del deber en toda la comunidad.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Puntualidad",
    description:
      "Respetar el tiempo propio y ajeno, asegurando la puntualidad en todas las actividades. Cumplir con los compromisos a tiempo.",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: Handshake,
    title: "Trabajo en Equipo",
    description:
      "Fomentar la colaboración y cooperación entre todos los miembros. Trabajar juntos para alcanzar metas comunes.",
    color: "from-indigo-400 to-blue-500",
  },
  {
    icon: Star,
    title: "Compromiso",
    description:
      "Dedicarse a los valores y objetivos de CEPRUNSA con responsabilidad. Asumir un compromiso personal y colectivo en el proceso educativo.",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Eye,
    title: "Respeto",
    description:
      "Fomentar la consideración y el trato digno hacia los demás, valorando la diversidad de ideas y opiniones. Promover un ambiente de convivencia basado en el respeto mutuo.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Scale,
    title: "Probidad",
    description:
      "Actuar con integridad y honestidad en todas las acciones y decisiones. Mantener una conducta ética que refleje los principios de transparencia y rectitud.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: Crown,
    title: "Lealtad",
    description:
      "Ser fiel a los valores y objetivos de CEPRUNSA, mostrando un compromiso constante. Apoyar con sinceridad y confianza a la institución y a sus integrantes.",
    color: "from-amber-400 to-yellow-500",
  },
];

export const achievements = [
  { icon: Users, number: "2500+", label: "Estudiantes Ingresados" },
  { icon: Trophy, number: "85%", label: "Tasa de Éxito" },
  { icon: Award, number: "24", label: "Años de Experiencia" },
  { icon: Star, number: "95%", label: "Satisfacción" },
];

export const teamMembers = [
  {
    name: "Mg. Arnaldo Humberto Valdivia Loaiza",
    role: "COORDINADOR ACADÉMICO",
    description:
      "Docente especializado en Filosofía, con una maestría en Docencia Universitaria y Gestión Educativa. Actualmente es docente en la Universidad Nacional de San Agustín, con experiencia previa en diversas universidades peruanas desde 2003. En cuanto a su formación académica, es bachiller y licenciado en Filosofía por la Universidad Nacional de San Agustín de Arequipa, además de haber completado un diplomado en Desarrollo de Habilidades Digitales para el Aprendizaje y programas de formación docente en enseñanza e innovación.",
    image: undefined, // Se puede agregar la URL de la imagen aquí
    cvLink: "https://example.com/cv-arnaldo-valdivia", // URL del CV
  },
  {
    name: "Dra. Maria Elena Rojas Zegarra",
    role: "DIRECTORA",
    description:
      "Doctora en Psicología por la Universidad Complutense de Madrid. Actualmente, cursa el Máster en Investigación Psicológica por la Universidad Internacional de La Rioja (UNIR), España. Posee un Diplomado Internacional en el Modelo de Terapia Breve de Resolución de Problemas del Brief Therapy Center de Palo Alto, California, y es experta en Psicoterapia Breve para Niños y Adolescentes por la Universidad San Jorge, España.",
    image: undefined, // Se puede agregar la URL de la imagen aquí
    cvLink: "https://example.com/cv-maria-rojas", // URL del CV
  },
  {
    name: "Mg. Jose Miguel Rojas Hualpa",
    role: "COORDINADOR ADMINISTRATIVO",
    description:
      "Posee el grado en Ciencias Biológicas por la Universidad Nacional de San Agustín de Arequipa (2010) y el grado en Ingeniería Ambiental (2018). Es Magíster en Biología Funcional y Molecular por la Universidad Estadual de Campinas (2014). Fue investigador en el Laboratorio de Química de Proteínas de la Universidad Estadual de Campinas (2012 – 2014).",
    image: undefined, // Se puede agregar la URL de la imagen aquí
    cvLink: "https://example.com/cv-jose-rojas", // URL del CV
  },
];

export const methodologyItems = [
  {
    icon: Brain,
    title: "Aprendizaje Activo",
    description:
      "Metodología participativa que involucra al estudiante en su proceso de aprendizaje a través de ejercicios prácticos y resolución de problemas.",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-200",
  },
  {
    icon: Target,
    title: "Enfoque Dirigido",
    description:
      "Preparación específica y dirigida hacia el contenido exacto que se evaluará en el examen CEPRUNSA, optimizando el tiempo de estudio.",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "hover:border-green-200",
  },
  {
    icon: CheckCircle,
    title: "Evaluación Continua",
    description:
      "Sistema de evaluaciones periódicas que permite monitorear el progreso y identificar áreas de mejora durante todo el proceso.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-200",
  },
  {
    icon: Users,
    title: "Grupos Reducidos",
    description:
      "Clases con número limitado de estudiantes para garantizar atención personalizada y un ambiente de aprendizaje óptimo.",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    borderColor: "hover:border-orange-200",
  },
  {
    icon: Lightbulb,
    title: "Técnicas de Estudio",
    description:
      "Enseñanza de métodos y técnicas de estudio efectivas que los estudiantes podrán aplicar durante y después de CEPRUNSA.",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    borderColor: "hover:border-yellow-200",
  },
  {
    icon: TrendingUp,
    title: "Seguimiento Personalizado",
    description:
      "Acompañamiento individual del progreso académico de cada estudiante con retroalimentación constante y planes de mejora.",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    borderColor: "hover:border-red-200",
  },
];

export const faqs = [
  {
    question: "¿Qué es CEPRUNSA?",
    answer:
      "CEPRUNSA es una modalidad oficial de ingreso directo a la Universidad Nacional de San Agustín de Arequipa. Te prepara en 10 semanas intensivas con 15 cursos especializados para rendir tu propio examen de admisión.",
  },
  {
    question: "¿Cuánto dura la preparación?",
    answer:
      "La preparación tiene una duración de 10 semanas intensivas, con clases de lunes a viernes en horarios matutinos o vespertinos según el proceso elegido.",
  },
  {
    question: "¿Qué cursos incluye la preparación?",
    answer:
      "La preparación incluye 15 cursos especializados: Matemática, Física, Química, Biología, Lenguaje, Literatura, Historia del Perú, Historia Universal, Geografía, Economía, Filosofía, Psicología, Educación Cívica, Inglés y Razonamiento Matemático.",
  },
  {
    question: "¿Cuál es la diferencia con el examen ordinario?",
    answer:
      "A diferencia del examen ordinario, en CEPRUNSA tu examen se basa completamente en el contenido académico desarrollado durante las 10 semanas de preparación, lo que significa que estudias exactamente lo que te van a evaluar.",
  },
  {
    question: "¿Cuándo son los procesos de inscripción?",
    answer:
      "CEPRUNSA tiene tres procesos al año: CEPRUNSA I (marzo-junio), CEPRUNSA II (julio-octubre) y CEPRUNSA III (noviembre-febrero). Las fechas exactas se publican en nuestra página web.",
  },
  {
    question: "¿Qué incluye el costo de inscripción?",
    answer:
      "El costo incluye las 10 semanas de preparación, material de estudio, simulacros semanales, asesoría personalizada, acceso a plataforma virtual y el derecho a rendir el examen de admisión.",
  },
];

export const processesOptions: string[] = [
  "CEPRUNSA I Fase",
  "CEPRUNSA Ciclo Quintos",
  "CEPRUNSA II Fase",
  "Proceso Extraordinario",
];

export const contactInfo = [
  {
    title: "Dirección",
    details: ["Av. Independencia 200, Arequipa, Perú"],
    icon: MapPin,
    color: "text-blue-600",
  },
  {
    title: "Teléfono",
    details: ["(054) 123-456"],
    icon: Phone,
    color: "text-green-600",
  },
  {
    title: "Email",
    details: ["info@ceprunsa.edu.pe"],
    icon: Send,
    color: "text-accent-600",
  },
  {
    title: "WhatsApp",
    details: ["+51 954 123 456"],
    icon: MessageCircle,
    color: "text-green-600",
  },
  {
    title: "Horario de Atención",
    details: ["Lunes a Viernes: 8:00 AM - 6:00 PM"],
    icon: Calendar,
    color: "text-red-600",
  },
];
export const processes: Processes[] = [
  {
    title: "CEPRUNSA I Fase",
    duration: "10 semanas",
    schedule: "Preparación integral - 15 cursos",
    description:
      "Primer proceso anual para estudiantes de 5to de secundaria y egresados. Modalidad inicial de ingreso directo a la UNSA.",
    features: [
      "15 cursos especializados",
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
    recommended: false,
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
    recommended: true,
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
      "Banco de contenido digital",
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
