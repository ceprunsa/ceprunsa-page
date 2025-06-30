import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

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
