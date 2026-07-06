import type React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#contenido-principal"
        className="fixed left-4 top-2 z-[100] -translate-y-16 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido-principal" className="flex-grow">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Footer />
      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/51954123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></span>
        <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.929 9.929 0 004.93 1.314c5.506 0 9.989-4.478 9.99-9.984A10.003 10.003 0 0012.012 2zm5.799 14.17c-.237.669-1.38 1.282-1.905 1.341-.525.06-1.05.29-3.344-.6a11.904 11.904 0 01-5.127-4.52c-.933-1.246-1.5-2.696-1.5-4.2a4.42 4.42 0 011.393-3.23c.319-.319.689-.472 1.058-.472.122 0 .235.006.335.016.3.013.45.03.65.45.244.518.824 2.012.899 2.164.075.152.125.328.026.526-.1.198-.15.32-.3.496-.15.176-.312.392-.448.526-.152.148-.312.308-.135.614.177.304.788 1.3 1.688 2.097.9 1.157 1.65 1.517 1.95 1.668.3.15.474.124.65-.076.177-.2.75-.873.95-1.173.2-.3.4-.25.675-.15.275.1.1.75 3.325 1.64.126.06.21.12.26.23.05.11.02.636-.217 1.306z"/>
        </svg>
      </a>
    </div>
  );
};

export default Layout;
