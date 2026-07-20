import { MapPin, Phone, Send, MessageCircle, Calendar } from "lucide-react";

export const contactInfo = [
  {
    title: "Dirección",
    details: [
      "Calle San Agustín 108",
      "(a media cuadra de la Plaza de Armas de Arequipa)"
    ],
    icon: MapPin,
    color: "text-blue-600",
  },
  {
    title: "Teléfono",
    details: ["054-391911", "Anexos 1422"],
    icon: Phone,
    color: "text-green-600",
  },
  {
    title: "Email",
    details: [
      "ceprunsa@unsa.edu.pe",
      "atencion.cliente@cepr.unsa.pe",
      "atencion.postulante@cepr.unsa.pe"
    ],
    icon: Send,
    color: "text-accent-600",
  },
  {
    title: "WhatsApp",
    details: ["+51 908 892 331"],
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
