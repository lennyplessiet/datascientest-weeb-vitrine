import "./Header.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuthSession, logout } from "../api.js";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(() => getAuthSession());

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      // En cas d'erreur, on efface quand même la session locale
    }
    navigate("/login");
  };

  useEffect(() => {
    const syncSession = () => setSession(getAuthSession());

    window.addEventListener("auth-change", syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("auth-change", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return (
    <header>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              <img src="/src/assets/weeb.svg" alt="Logo" />
            </Link>
          </div>
          <nav>
            <div className="nav-item">
              <Link to="/blog">Blog</Link>
            </div>
            <div className="nav-item">
              <Link to="/contact">Contact</Link>
            </div>
          </nav>
        </div>

        <div className="header-right">
          {session ? (
            <>
              <p className="connected-user">Connecté en tant que {session.username}</p>
              <button className="logout-button" type="button" onClick={handleLogout}>
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <div className="login-button">
                <Link to="/login">Log In</Link>
              </div>
              <div className="joinnow-button">
                <Link to="/signup">Join Now</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mobile-header">
        <Link to="/">
          <img src="/src/assets/weeb.svg" alt="Logo" />
        </Link>

        <div
          className={`burger-menu ${isOpen ? "open" : ""}`}
          onClick={handleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`mobile-panel ${isOpen ? "open" : ""}`}>
          <div className="mobile-nav">
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            {session ? (
              <>
                <p className="connected-user">Connecté en tant que {session.username}</p>
                <button className="mobile-logout-button" type="button" onClick={() => { handleLogout(); setIsOpen(false); }}>
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link className="mobile-join-link" to="/signup">Join Now</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
