import "./Header.css";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <header>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <a href="/">
              <img src="/src/assets/weeb.svg" alt="Logo" />
            </a>
          </div>
          <nav>
            <div className="nav-item">
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>

        <div className="header-right">
          <div className="login-button">
            <a href="/login">Log In</a>
          </div>
          <div className="joinnow-button">
            <button>Join Now</button>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <a href="/">
          <img src="/src/assets/weeb.svg" alt="Logo" />
        </a>

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
            <a href="/contact">Contact</a>
            <a href="/login">Login</a>
            <button>Join Now</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
