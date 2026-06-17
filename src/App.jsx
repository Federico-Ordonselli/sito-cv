import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CertificationsPage from "./pages/CertificationsPage.jsx";
import HobbiesPage from "./pages/HobbiesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d1a",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: "#e0e0f0",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(40px, -30px) scale(1.1); }
          66%      { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, -25px) scale(1.15); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(18deg); }
          75%      { transform: rotate(-12deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 20px #6C63FF88); }
          50%      { filter: drop-shadow(0 0 35px #FF6584cc); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 3px; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navbar */}
      <Navbar page={page} setPage={setPage} />

      {/* Content */}
      <main>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "projects" && <ProjectsPage />}
        {page === "certifications" && <CertificationsPage />}
        {page === "hobbies" && <HobbiesPage />}
        {page === "about" && <AboutPage />}
      </main>

      {/* Footer */}
      {page !== "home" && (
        <footer style={{
          textAlign: "center",
          padding: "40px 24px",
          color: "#3030a0",
          fontSize: 13,
          borderTop: "1px solid #1e1e3e",
          marginTop: 40,
        }}>
          Federico · Roma, Italia · {new Date().getFullYear()}
        </footer>
      )}
    </div>
  );
}
