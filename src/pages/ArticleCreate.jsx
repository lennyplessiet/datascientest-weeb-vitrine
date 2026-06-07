import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiRequest, getAuthSession } from "../api.js";
import Header from "../nav/Header";
import Footer from "../nav/Footer";

import "./Blog.css";

function ArticleCreate() {
  const navigate = useNavigate();
  const session = getAuthSession();
  const [form, setForm] = useState({ title: "", content: "" });
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
      const article = await apiRequest("/article/", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access}` },
        body: JSON.stringify(form),
      });
      navigate(`/blog/${article.id}`);
    } catch (err) {
      setMessage(err.message);
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="center blog-form-section">
          {!session ? (
            <div className="blog-access-panel">
              <p className="pre-title">Acces reserve</p>
              <h1>Connectez-vous pour publier</h1>
              <p>La creation d'article est disponible uniquement pour les utilisateurs connectes.</p>
              <Link className="blog-create-link" to="/login">Se connecter</Link>
            </div>
          ) : (
          <>
          <h1>Ajouter un article</h1>
          <form className="blog-form" onSubmit={handleSubmit}>
            <input
              name="title"
              type="text"
              placeholder="Titre"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="content"
              placeholder="Contenu"
              value={form.content}
              onChange={handleChange}
              required
            />
            <input type="submit" value={status === "loading" ? "Publication..." : "Publier"} />
          </form>
          {message && <p className="blog-state blog-error">{message}</p>}
          </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ArticleCreate;
