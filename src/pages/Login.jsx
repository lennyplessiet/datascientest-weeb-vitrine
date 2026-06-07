import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiRequest, saveAuthSession } from "../api.js";
import Header from "../nav/Header";
import Footer from "../nav/Footer";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const data = await apiRequest("/api/users/token/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      saveAuthSession({
        access: data.access,
        refresh: data.refresh,
        username: email,
      });

      navigate("/blog");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="center auth-section">
          <p className="pre-title">Connexion</p>
          <h1>Se connecter</h1>
          <form className="login-form auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <input type="submit" value={status === "loading" ? "Connexion..." : "Se connecter"} />
          </form>
          {message && <p className="form-message error">{message}</p>}
          <Link className="mdp-oublie" to="/password-reset">Mot de passe oublie ?</Link>
          <p className="creer-compte">Vous n'avez pas de compte ? Vous pouvez en <Link to="/signup">creer un</Link></p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
