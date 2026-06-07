import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Blog from "./pages/Blog.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import ArticleCreate from "./pages/ArticleCreate.jsx";
import PasswordReset from "./pages/PasswordReset.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";

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
    path: "blog",
    element: <Blog />,
  },
  {
    path: "blog/ajouter",
    element: <ArticleCreate />,
  },
  {
    path: "blog/:id",
    element: <ArticleDetail />,
  },
  {
    path: "password-reset",
    element: <PasswordReset />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

// Intégrer le router dans votre application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
