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
    </div>
  );
};

export default Layout;
