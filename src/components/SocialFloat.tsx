import type React from "react";
import { useState } from "react";
import { X, MessageSquare } from "lucide-react";

import { siteConfig } from "../data";

interface SocialLink {
  label: string;
  href: string;
  bg: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    label: "Escríbenos por WhatsApp",
    href: `https://wa.me/51${siteConfig.whatsappNumber}`,
    bg: "bg-[#25D366]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.929 9.929 0 004.93 1.314c5.506 0 9.989-4.478 9.99-9.984A10.003 10.003 0 0012.012 2zm5.799 14.17c-.237.669-1.38 1.282-1.905 1.341-.525.06-1.05.29-3.344-.6a11.904 11.904 0 01-5.127-4.52c-.933-1.246-1.5-2.696-1.5-4.2a4.42 4.42 0 011.393-3.23c.319-.319.689-.472 1.058-.472.122 0 .235.006.335.016.3.013.45.03.65.45.244.518.824 2.012.899 2.164.075.152.125.328.026.526-.1.198-.15.32-.3.496-.15.176-.312.392-.448.526-.152.148-.312.308-.135.614.177.304.788 1.3 1.688 2.097.9 1.157 1.65 1.517 1.95 1.668.3.15.474.124.65-.076.177-.2.75-.873.95-1.173.2-.3.4-.25.675-.15.275.1.1.75 3.325 1.64.126.06.21.12.26.23.05.11.02.636-.217 1.306z" />
      </svg>
    ),
  },
  {
    label: "Síguenos en Facebook",
    href: "https://www.facebook.com/ceprunsaoficial/",
    bg: "bg-[#1877F2]",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Síguenos en TikTok",
    href: "https://www.tiktok.com/@ceprunsa",
    bg: "bg-black",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z" />
      </svg>
    ),
  },
  {
    label: "Envíanos un correo",
    href: "mailto:info@ceprunsa.edu.pe",
    bg: "bg-accent-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const SocialFloat: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    /* Fixed to bottom-right; items stack upward via flex-col-reverse */
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">

      {/* Social icons — rendered above the toggle button */}
      <div className="flex flex-col items-center gap-3">
        {[...socialLinks].reverse().map((link, i) => {
          const delay = open
            ? `${(socialLinks.length - 1 - i) * 55}ms`
            : `${i * 35}ms`;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={`
                flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg
                ${link.bg}
                transition-all duration-300 hover:scale-110 active:scale-95
                ${open
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-6 pointer-events-none"
                }
              `}
              style={{ transitionDelay: delay }}
            >
              {link.icon}
            </a>
          );
        })}
      </div>

      {/* Toggle button — always at the bottom */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar redes sociales" : "Abrir redes sociales"}
        aria-expanded={open}
        className={`
          relative flex items-center justify-center w-16 h-16 rounded-full text-white
          shadow-xl transition-all duration-300 hover:scale-110 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-accent-300
          ${open ? "bg-gray-800" : "bg-gray-900"}
        `}
      >
        {/* Pulse ring — only when closed */}
        {!open && (
          <span className="absolute -inset-1 rounded-full bg-gray-700 opacity-40 animate-ping" />
        )}

        {/* Icon: chat bubble when closed, X when open */}
        <span
          className={`relative z-10 transition-all duration-300 ${open ? "rotate-90 scale-90" : "rotate-0 scale-100"}`}
        >
          {open
            ? <X size={28} />
            : <MessageSquare size={28} fill="white" strokeWidth={0} />
          }
        </span>
      </button>
    </div>
  );
};

export default SocialFloat;
