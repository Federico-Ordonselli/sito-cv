import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CertificationsPage from "./pages/CertificationsPage.jsx";
import HobbiesPage from "./pages/HobbiesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import { getContent } from "./data/content.js";

// Hash routing: ogni pagina ha un URL (#/projects, #/about, ...) così i link
// sono condivisibili e il tasto indietro del browser funziona.
const PAGES = ["home", "projects", "certifications", "hobbies", "about"];

function pageFromHash() {
  const h = window.location.hash.replace(/^#\/?/, "");
  return PAGES.includes(h) ? h : "home";
}

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const [lang, setLang] = useState(() => {
    const saved = typeof localStorage !== "undefined" && localStorage.getItem("lang");
    return saved === "en" || saved === "it" ? saved : "it";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const navigate = (id) => {
    window.location.hash = id === "home" ? "/" : `/${id}`;
  };

  const D = getContent(lang);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#121615",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: "#eef1eb",
    }}>
      {/* Navbar */}
      <Navbar page={page} setPage={navigate} lang={lang} setLang={setLang} />

      {/* Content */}
      <main>
        {page === "home" && <HomePage setPage={navigate} lang={lang} />}
        {page === "projects" && <ProjectsPage lang={lang} />}
        {page === "certifications" && <CertificationsPage lang={lang} />}
        {page === "hobbies" && <HobbiesPage lang={lang} />}
        {page === "about" && <AboutPage lang={lang} />}
      </main>

      {/* Footer */}
      {page !== "home" && (
        <footer style={{
          textAlign: "center",
          padding: "40px 24px",
          color: "#9ca99e",
          fontSize: 13,
          borderTop: "1px solid #2c3530",
          marginTop: 40,
        }}>
          Federico · {D.ui.footerSuffix} · {new Date().getFullYear()}
        </footer>
      )}
    </div>
  );
}
