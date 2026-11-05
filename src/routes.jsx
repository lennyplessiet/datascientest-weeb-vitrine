import Accueil from "./pages/Accueil";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login";

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
    path: "login",
    element: <Login />,
  },
];
