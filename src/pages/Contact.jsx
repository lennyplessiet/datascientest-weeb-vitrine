import { useState } from "react";

import Header from "../nav/Header";
import Footer from "../nav/Footer";
import { apiRequest } from "../api.js";

import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await apiRequest("/contact/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setStatus("success");
      setMessage("Merci, votre message a bien été envoyé.");
      setForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="center">
          <h1>Votre avis compte !</h1>
          <p>
            Votre retour est essentiel pour nous améliorer ! Partagez votre expérience,
            dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos
            suggestions nous aident à faire de ce blog une ressource toujours plus utile
            et enrichissante.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                name="first_name"
                type="text"
                placeholder="Nom"
                value={form.first_name}
                onChange={handleChange}
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Prénom"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                name="phone_number"
                type="text"
                placeholder="Téléphone"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input type="submit" value={status === "loading" ? "Envoi..." : "Contact"} />
            </div>
            {message && (
              <p className={`form-message ${status === "error" ? "error" : "success"}`}>
                {message}
              </p>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
