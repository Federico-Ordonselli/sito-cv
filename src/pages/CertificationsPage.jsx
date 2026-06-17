import { useState, useEffect } from "react";
import { DATA } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import SubSection from "../components/SubSection.jsx";

function CertCard({ cert, color, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(cert)}
      style={{
        background: hovered ? "#1e1e2e" : "#161622",
        border: `1px solid ${hovered ? color : "#2a2a3e"}`,
        borderRadius: 16,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px ${color}44` : "none",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, width: 4,
        height: "100%", background: color, borderRadius: "16px 0 0 16px",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, flexShrink: 0,
          borderRadius: 10,
          background: color + "22",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>📄</div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            color: "#5050a0", fontSize: 11, fontWeight: 700,
            letterSpacing: 1, textTransform: "uppercase",
          }}>
            {cert.issuer}
          </div>
          {cert.date && (
            <div style={{ color: "#7070a0", fontSize: 12, fontWeight: 600 }}>{cert.date}</div>
          )}
        </div>
      </div>

      <h3 style={{
        margin: "0 0 16px", color: "#e0e0f0",
        fontSize: 16, fontWeight: 700, lineHeight: 1.4, flex: 1,
      }}>
        {cert.name}
      </h3>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        color: color, fontSize: 13, fontWeight: 700,
      }}>
        <span>Visualizza certificato</span>
        <span style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "none" }}>→</span>
      </div>
    </div>
  );
}

function PdfModal({ cert, color, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "#05050ccc",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        animation: "fadeUp 0.25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0d1a",
          border: `1px solid ${color}55`,
          borderRadius: 16,
          width: "min(960px, 100%)",
          height: "min(90vh, 100%)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          boxShadow: `0 24px 80px ${color}33`,
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 20px",
          borderBottom: "1px solid #1e1e3e",
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{
              margin: 0, color: "#e0e0f0", fontSize: 16, fontWeight: 700,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {cert.name}
            </h3>
            <div style={{ color: "#5050a0", fontSize: 12, fontWeight: 600 }}>
              {cert.issuer}{cert.date ? ` · ${cert.date}` : ""}
            </div>
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: color, fontSize: 13, fontWeight: 700,
                textDecoration: "none", whiteSpace: "nowrap",
                padding: "6px 12px", borderRadius: 8,
                border: `1px solid ${color}44`,
              }}
            >
              Verifica ↗
            </a>
          )}
          <a
            href={cert.file}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#9090b0", fontSize: 13, fontWeight: 700,
              textDecoration: "none", whiteSpace: "nowrap",
              padding: "6px 12px", borderRadius: 8,
              border: "1px solid #2a2a3e",
            }}
          >
            Apri ↗
          </a>
          <button
            onClick={onClose}
            aria-label="Chiudi"
            style={{
              background: "transparent", border: "1px solid #2a2a3e",
              color: "#9090b0", borderRadius: 8, cursor: "pointer",
              width: 34, height: 34, fontSize: 18, lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* PDF viewer */}
        <iframe
          title={cert.name}
          src={`${cert.file}#view=FitH`}
          style={{ flex: 1, width: "100%", border: "none", background: "#1a1a2a" }}
        />
      </div>
    </div>
  );
}

function CertificationsPage() {
  const [active, setActive] = useState(null);

  return (
    <div style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader
        title="Certificazioni"
        subtitle="Credenziali"
        accent="#43B89C"
      />

      <p style={{ color: "#9090b0", fontSize: 16, lineHeight: 1.7, marginTop: -16, marginBottom: 48, maxWidth: 700 }}>
        Clicca su una certificazione per visualizzare il PDF originale.
      </p>

      {DATA.certifications.map((group) => (
        <SubSection key={group.category} title={group.category} color={group.color}>
          {group.items.map((cert) => (
            <CertCard
              key={cert.file}
              cert={cert}
              color={group.color}
              onOpen={setActive}
            />
          ))}
        </SubSection>
      ))}

      {active && (
        <PdfModal
          cert={active}
          color={
            DATA.certifications.find((g) =>
              g.items.some((c) => c.file === active.file)
            )?.color || "#43B89C"
          }
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}

export default CertificationsPage;
