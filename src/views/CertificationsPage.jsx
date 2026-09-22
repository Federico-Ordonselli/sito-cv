import { useState, useEffect } from "react";
import { getContent } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import SubSection from "../components/SubSection.jsx";

function CertCard({ cert, onOpen, t }) {
  const [previewFailed, setPreviewFailed] = useState(false);
  const preview = cert.file.replace('/certs/', '/certs/previews/').replace(/\.pdf$/, '.jpg');

  return (
    <button type="button" className="cert-card" onClick={() => onOpen(cert)}>
      <span className="cert-preview" aria-hidden="true">
        {previewFailed ? (
          <span className="cert-preview-fallback">PDF</span>
        ) : (
          <img src={preview} alt="" loading="lazy" decoding="async" onError={() => setPreviewFailed(true)} />
        )}
      </span>
      <span className="cert-details">
        <span className="cert-meta">
          <span>{cert.issuer}</span>
          {cert.date && <span>{cert.date}</span>}
        </span>
        <span className="cert-title">{cert.name}</span>
        <span className="cert-action">{t.view} <span aria-hidden="true">↗</span></span>
      </span>
    </button>
  );
}

function PdfModal({ cert, onClose, t }) {
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
          background: "#121615",
          border: "1px solid var(--border)",
          borderRadius: 16,
          width: "min(960px, 100%)",
          height: "min(90vh, 100%)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 80px #0006",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 20px", flexWrap: "wrap",
          borderBottom: "1px solid #2c3530",
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{
              margin: 0, color: "#eef1eb", fontSize: 16, fontWeight: 700,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {cert.name}
            </h3>
            <div style={{ color: "#9ca99e", fontSize: 12, fontWeight: 600 }}>
              {cert.issuer}{cert.date ? ` · ${cert.date}` : ""}
            </div>
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--accent)", fontSize: 13, fontWeight: 700,
                textDecoration: "none", whiteSpace: "nowrap",
                padding: "6px 12px", borderRadius: 8,
                border: "1px solid var(--border)",
              }}
            >
              {t.verify} ↗
            </a>
          )}
          <a
            href={cert.file}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#a8b3a9", fontSize: 13, fontWeight: 700,
              textDecoration: "none", whiteSpace: "nowrap",
              padding: "6px 12px", borderRadius: 8,
              border: "1px solid #303a34",
            }}
          >
            {t.open} ↗
          </a>
          <button
            onClick={onClose}
            aria-label={t.close}
            style={{
              background: "transparent", border: "1px solid #303a34",
              color: "#a8b3a9", borderRadius: 8, cursor: "pointer",
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
          style={{ flex: 1, width: "100%", border: "none", background: "#202723" }}
        />
      </div>
    </div>
  );
}

function CertificationsPage({ lang }) {
  const [active, setActive] = useState(null);
  const DATA = getContent(lang);
  const t = DATA.ui.certsPage;

  return (
    <div style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader
        title={t.title}
        subtitle={t.subtitle}
        accent="#bdd1b8"
      />

      <p style={{ color: "#a8b3a9", fontSize: 16, lineHeight: 1.7, marginTop: -16, marginBottom: 48, maxWidth: 700 }}>
        {t.intro}
      </p>

      {DATA.certifications.map((group) => (
        <SubSection key={group.category} title={group.category} color={group.color}>
          {group.items.map((cert) => (
            <CertCard
              key={cert.file}
              cert={cert}
              color={group.color}
              onOpen={setActive}
              t={t}
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
            )?.color || "#bdd1b8"
          }
          onClose={() => setActive(null)}
          t={t}
        />
      )}
    </div>
  );
}

export default CertificationsPage;
