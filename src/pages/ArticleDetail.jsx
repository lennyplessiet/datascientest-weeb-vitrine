import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { apiRequest } from "../api.js";
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

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest(`/article/${id}/`)
      .then((data) => {
        setArticle(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [id]);

  return (
    <>
      <Header />
      <main>
        <section className="article-detail-section">
          {status === "loading" && <p className="blog-state">Chargement de l'article...</p>}
          {status === "error" && <p className="blog-state blog-error">{error}</p>}
          {status === "success" && article && (
            <article className="article-detail">
              <Link className="article-back-link" to="/blog">Retour au blog</Link>
              <div className="article-detail-card">
                <p className="article-date">{formatDate(article.created_at)}</p>
                <h1>{article.title}</h1>
                <p>{article.content}</p>
              </div>
            </article>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ArticleDetail;
