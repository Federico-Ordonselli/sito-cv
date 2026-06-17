import { useState, useEffect } from "react";
import { getContent } from "../data/content.js";

const githubIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/>
  </svg>
);

const linkedinIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const mailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 6L2 7"/>
  </svg>
);

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

        {/* Social + CV */}
        <div style={{
          marginTop: 32,
          display: "flex", gap: 14, justifyContent: "center", alignItems: "center", flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.7s",
        }}>
          {[
            { href: DATA.github, label: "GitHub", icon: githubIcon },
            { href: DATA.linkedin, label: "LinkedIn", icon: linkedinIcon },
            { href: "mailto:" + DATA.email, label: "Email", icon: mailIcon },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={s.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, borderRadius: 12,
                background: "#161622", border: "1px solid #2a2a3e",
                color: "#9090b0", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#6C63FF";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#9090b0";
                e.currentTarget.style.borderColor = "#2a2a3e";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {s.icon}
            </a>
          ))}

          <a
            href={DATA.cv}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              height: 44, padding: "0 20px", borderRadius: 12,
              background: "#161622", border: "1px solid #2a2a3e",
              color: "#c0c0d8", fontSize: 14, fontWeight: 700,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#43B89C";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#c0c0d8";
              e.currentTarget.style.borderColor = "#2a2a3e";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ⬇ {DATA.ui.downloadCv}
          </a>
        </div>

        <div style={{ marginTop: 28, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
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
