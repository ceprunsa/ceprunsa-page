import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Processes from "./pages/Processes";
import Contact from "./pages/Contact";
import Carreras from "./pages/Carreras";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "nosotros",
        element: <About />,
      },
      {
        path: "procesos",
        element: <Processes />,
      },
      {
        path: "contacto",
        element: <Contact />,
      },
      {
        path: "carreras",
        element: <Carreras />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
