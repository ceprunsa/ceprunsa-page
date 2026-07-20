import { MapPin, Phone, Send, MessageCircle, Calendar } from "lucide-react";

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
