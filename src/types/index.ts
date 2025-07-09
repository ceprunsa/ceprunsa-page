import type { LucideIcon } from "lucide-react";

export interface Processes {
  title: string;
  duration: string;
  schedule: string;
  description: string;
  features: string[];
  subjects: string[];
  price: string;
  installments: string;
  recommended: boolean;
}

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  details: string[];
  color: string;
}

export interface Modality {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  process: string;
  message: string;
}

export interface NavItem {
  name: string;
  path: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Testimonial {
  name: string;
  career: string;
  text: string;
  rating: number;
}

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface Achievement {
  icon: LucideIcon;
  number: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
  cvLink?: string;
}

export interface MethodologyItem {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  borderColor: string;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  examDate: string;
  schedule: string;
  price: string;
  features: string[];
  status: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  schedule: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}
