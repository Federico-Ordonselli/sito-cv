import { useState, useEffect } from "react";
import { getContent } from "../data/content.js";

function HomePage({ setPage, lang }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const DATA = getContent(lang);
  const { nav } = DATA.ui;
  const gradient = "linear-gradient(135deg, #6C63FF, #FF6584, #F7971E)";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 400, height: 400,
        background: "radial-gradient(circle, #6C63FF22, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "float1 18s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: 350, height: 350,
        background: "radial-gradient(circle, #FF658422, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "float2 14s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: "40%", right: "25%",
        width: 250, height: 250,
        background: "radial-gradient(circle, #43B89C18, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "float1 22s ease-in-out infinite reverse",
      }} />

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
        maxWidth: 700,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          fontSize: 72, marginBottom: 8,
          display: "inline-block",
          transformOrigin: "70% 70%",
          animation: "wave 2.5s ease-in-out infinite, pulseGlow 4s ease-in-out infinite",
        }}>
          👋
        </div>
        <h1 style={{
          margin: "0 0 8px",
          fontSize: "clamp(42px, 8vw, 80px)",
          fontWeight: 900,
          background: gradient,
          backgroundSize: "200% 200%",
          animation: "gradientShift 6s ease infinite",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: -2,
          lineHeight: 1.1,
        }}>
          {DATA.name}
        </h1>
        <p style={{
          fontSize: 20, color: "#9090b0", margin: "0 0 16px",
          fontWeight: 600, letterSpacing: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.25s",
        }}>
          {DATA.role}
        </p>
        <p style={{
          fontSize: 16, color: "#6060a0", margin: "0 0 48px",
          lineHeight: 1.7, maxWidth: 500, marginLeft: "auto", marginRight: "auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.4s",
        }}>
          {DATA.tagline}
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.55s",
        }}>
          {[
            { label: nav.projects, page: "projects", color: "#6C63FF" },
            { label: nav.hobbies, page: "hobbies", color: "#FF6584" },
            { label: nav.about, page: "about", color: "#F7971E" },
          ].map((btn) => (
            <button
              key={btn.page}
              onClick={() => setPage(btn.page)}
              style={{
                background: btn.color,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 28px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: `0 4px 20px ${btn.color}55`,
              }}
              onMouseEnter={e => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 8px 28px ${btn.color}88`;
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = `0 4px 20px ${btn.color}55`;
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 24, justifyContent: "center" }}>
          {[
            { label: "📍 " + DATA.location },
            { label: "✉️ " + DATA.email },
          ].map((item) => (
            <span key={item.label} style={{ color: "#5050a0", fontSize: 14 }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
