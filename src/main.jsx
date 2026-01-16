import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login";

import "./index.css"

// Définir les routes avec createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

// Intégrer le router dans votre application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);