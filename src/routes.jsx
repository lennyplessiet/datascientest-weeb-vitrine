import Accueil from "./pages/Accueil";
import Blog from "./pages/Blog.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import ArticleCreate from "./pages/ArticleCreate.jsx";
import PasswordReset from "./pages/PasswordReset.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";

// Table de routes partagée entre l'application (createBrowserRouter)
// et les tests (createMemoryRouter).
export const routes = [
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
];
