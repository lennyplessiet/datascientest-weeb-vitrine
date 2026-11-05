import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest, getAuthSession } from "../api.js";
import Header from "../nav/Header";
import Footer from "../nav/Footer";

import "./Blog.css";

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function Blog() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const isConnected = Boolean(getAuthSession());

  useEffect(() => {
    apiRequest("/article/")
      .then((data) => {
        setArticles(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="blog-hero">
          <div>
            <p className="pre-title">Blog</p>
            <h1>Tous les articles</h1>
            <p>Retrouvez les derniers contenus publies depuis la base de donnees.</p>
          </div>
          {isConnected && <Link className="blog-create-link" to="/blog/ajouter">Ajouter un article</Link>}
        </section>

        <section className="blog-list-section">
          {status === "loading" && <p className="blog-state">Chargement des articles...</p>}
          {status === "error" && <p className="blog-state blog-error">{error}</p>}
          {status === "success" && articles.length === 0 && (
            <p className="blog-state">Aucun article n'est disponible pour le moment.</p>
          )}

          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.id}>
                <p className="article-date">{formatDate(article.created_at)}</p>
                <h2>{article.title}</h2>
                <p>{article.content}</p>
                <Link className="call-to-action" to={`/blog/${article.id}`}>Lire l'article</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Blog;
