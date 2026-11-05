import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../api.js";
import Header from "../nav/Header";
import Footer from "../nav/Footer";

import "./Login.css";

function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const data = await apiRequest("/api/users/signup/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setStatus("success");
      setMessage(data?.message || "Compte cree. Il doit maintenant etre active.");
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
          <p className="pre-title">Compte</p>
          <h1>Creer un compte</h1>
          <form className="login-form auth-form" onSubmit={handleSubmit}>
            <div className="auth-row">
              <input
                name="first_name"
                type="text"
                placeholder="Prenom"
                value={form.first_name}
                onChange={handleChange}
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Nom"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input type="submit" value={status === "loading" ? "Creation..." : "Creer le compte"} />
          </form>
          {message && <p className={`form-message ${status === "error" ? "error" : ""}`}>{message}</p>}
          <p className="creer-compte">Vous avez deja un compte ? <Link to="/login">Connectez-vous</Link></p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Signup;
