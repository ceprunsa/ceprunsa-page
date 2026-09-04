import {
  Award,
  Shield,
  Heart,
  Lightbulb,
  CheckCircle,
  Clock,
  Handshake,
  Star,
  Eye,
  Scale,
  Crown,
  Users,
  Trophy,
  Brain,
  Target,
  TrendingUp,
} from "lucide-react";

export const values = [
  {
    icon: Award,
    title: "Excelencia Académica",
    description:
      "Fomentar el compromiso con la calidad en la enseñanza y el aprendizaje, promoviendo el esfuerzo y la dedicación hacia el logro de metas académicas.",
    color: "from-accent-500 to-accent-700",
  },
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Promover la seguridad y la credibilidad en las relaciones interpersonales, basadas en la honestidad y el respeto mutuo.",
    color: "from-primary-500 to-primary-700",
  },
  {
    icon: Heart,
    title: "Empatía",
    description:
      "Fomentar la comprensión y la empatía hacia los demás, promoviendo un ambiente de respeto, compasión y apoyo mutuo entre los estudiantes y el personal del CEPRUNSA.",
    color: "from-accent-400 to-accent-700",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Fomentar la creatividad y el pensamiento original para generar nuevas ideas y soluciones para los desafíos presentes.",
    color: "from-primary-400 to-primary-700",
  },
  {
    icon: CheckCircle,
    title: "Responsabilidad",
    description:
      "Cumplir con las obligaciones académicas y laborales con ética y eficiencia. Promover el sentido del deber en toda la comunidad.",
    color: "from-accent-500 to-accent-800",
  },
  {
    icon: Clock,
    title: "Puntualidad",
    description:
      "Respetar el tiempo propio y ajeno, asegurando la puntualidad en todas las actividades. Cumplir con los compromisos a tiempo.",
    color: "from-primary-500 to-primary-800",
  },
  {
    icon: Handshake,
    title: "Trabajo en Equipo",
    description:
      "Fomentar la colaboración y cooperación entre todos los miembros. Trabajar juntos para alcanzar metas comunes.",
    color: "from-primary-400 to-primary-700",
  },
  {
    icon: Star,
    title: "Compromiso",
    description:
      "Dedicarse a los valores y objetivos de CEPRUNSA con responsabilidad. Asumir un compromiso personal y colectivo en el proceso educativo.",
    color: "from-accent-400 to-accent-700",
  },
  {
    icon: Eye,
    title: "Respeto",
    description:
      "Fomentar la consideración y el trato digno hacia los demás, valorando la diversidad de ideas y opiniones. Promover un ambiente de convivencia basado en el respeto mutuo.",
    color: "from-primary-500 to-primary-700",
  },
  {
    icon: Scale,
    title: "Probidad",
    description:
      "Actuar con integridad y honestidad en todas las acciones y decisiones. Mantener una conducta ética que refleje los principios de transparencia y rectitud.",
    color: "from-accent-500 to-accent-800",
  },
  {
    icon: Crown,
    title: "Lealtad",
    description:
      "Ser fiel a los valores y objetivos de CEPRUNSA, mostrando un compromiso constante. Apoyar con sinceridad y confianza a la institución y a sus integrantes.",
    color: "from-primary-400 to-primary-700",
  },
];

export const achievements = [
  { icon: Users, number: "+20000", label: "Postulantes preparados anualmente" },
  { icon: Award, number: "+27", label: "Años de Experiencia" },
  { icon: Trophy, number: "+2000", label: "Vacantes ofertadas para la UNSA" },
];

export const teamMembers = [
  {
    name: "Dra. Maria Elena Rojas Zegarra",
    role: "Directora",
    description:
      "Doctora en Psicología (UCM, España), experta en Psicoterapia Breve y Gestión Educativa.",
    image: "/images/nosotros/DRA-MARIA-ELENA-2.jpg",
    cvLink:
      "https://dina.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=20316",
  },
  {
    name: "Mg. Arnaldo Humberto Valdivia Loaiza",
    role: "Coordinador Académico",
    description:
      "Mg. en Docencia Universitaria y Gestión Educativa. Licenciado en Filosofía (UNSA).",
    image: "/images/nosotros/DR-ARNALDO.jpg",
    cvLink:
      "https://dina.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=63640",
  },
  {
    name: "Mg. Jose Miguel Rojas Hualpa",
    role: "Coordinador Administrativo",
    description:
      "Mg. en Biología Funcional y Molecular (UNICAMP). Lic. en Ciencias Biológicas e Ing. Ambiental (UNSA).",
    image: "/images/nosotros/DR-JOSE.jpg",
    cvLink:
      "https://dina.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=150092",
  },
];

export const methodologyItems = [
  {
    icon: Brain,
    title: "Aprendizaje Activo",
    description:
      "Metodología participativa que involucra al estudiante en su proceso de aprendizaje a través de ejercicios prácticos y resolución de problemas.",
    bgColor: "bg-primary-50",
    iconColor: "text-primary-700",
    borderColor: "hover:border-primary-200",
  },
  {
    icon: Target,
    title: "Enfoque Dirigido",
    description:
      "Preparación específica y dirigida hacia el contenido exacto que se evaluará en el examen CEPRUNSA, optimizando el tiempo de estudio.",
    bgColor: "bg-accent-50",
    iconColor: "text-accent-700",
    borderColor: "hover:border-accent-200",
  },
  {
    icon: CheckCircle,
    title: "Evaluación Continua",
    description:
      "Sistema de evaluaciones periódicas que permite monitorear el progreso y identificar áreas de mejora durante todo el proceso.",
    bgColor: "bg-primary-50",
    iconColor: "text-primary-700",
    borderColor: "hover:border-primary-200",
  },
  {
    icon: Users,
    title: "Grupos Reducidos",
    description:
      "Clases con número limitado de estudiantes para garantizar atención personalizada y un ambiente de aprendizaje óptimo.",
    bgColor: "bg-accent-50",
    iconColor: "text-accent-700",
    borderColor: "hover:border-accent-200",
  },
  {
    icon: Lightbulb,
    title: "Técnicas de Estudio",
    description:
      "Enseñanza de métodos y técnicas de estudio efectivas que los estudiantes podrán aplicar durante y después de CEPRUNSA.",
    bgColor: "bg-primary-50",
    iconColor: "text-primary-700",
    borderColor: "hover:border-primary-200",
  },
  {
    icon: TrendingUp,
    title: "Seguimiento Personalizado",
    description:
      "Acompañamiento individual del progreso académico de cada estudiante con retroalimentación constante y planes de mejora.",
    bgColor: "bg-accent-50",
    iconColor: "text-accent-700",
    borderColor: "hover:border-accent-200",
  },
];
