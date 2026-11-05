import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import weebLogo from "../assets/weeb.svg";

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
            <Link to="/">
              <img src={weebLogo} alt="Logo" />
            </Link>
          </div>
          <nav>
            <div className="nav-item">
              <Link to="/contact">Contact</Link>
            </div>
          </nav>
        </div>

        <div className="header-right">
          <div className="login-button">
            <Link to="/login">Log In</Link>
          </div>
          <div className="joinnow-button">
            <button>Join Now</button>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <Link to="/">
          <img src={weebLogo} alt="Logo" />
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
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <button>Join Now</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
