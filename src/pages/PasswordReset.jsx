import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { apiRequest } from "../api.js";
import Header from "../nav/Header";
import Footer from "../nav/Footer";

import "./Login.css";

function PasswordReset() {
  const [searchParams] = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");
  const isConfirmMode = useMemo(() => Boolean(uidb64 && token), [uidb64, token]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const data = await apiRequest(
        isConfirmMode ? "/api/users/password-reset/confirm/" : "/api/users/password-reset/request/",
        {
          method: "POST",
          body: JSON.stringify(
            isConfirmMode
              ? { uidb64, token, password }
              : { email }
          ),
        }
      );
      setMessage(data?.message || "Demande envoyee.");
      setStatus("success");
    } catch (err) {
      const apiError = Array.isArray(err.data?.error) ? err.data.error.join(" ") : err.message;
      setMessage(apiError);
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="center auth-section">
          <p className="pre-title">Securite</p>
          <h1>Reinitialiser le mot de passe</h1>
          <form className="login-form auth-form" onSubmit={handleSubmit}>
            {isConfirmMode ? (
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            ) : (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            )}
            <input
              type="submit"
              value={status === "loading" ? "Envoi..." : isConfirmMode ? "Modifier" : "Recevoir le lien"}
            />
          </form>
          {message && <p className={`form-message ${status === "error" ? "error" : ""}`}>{message}</p>}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PasswordReset;
