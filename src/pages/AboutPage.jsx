import { useState } from "react";
import { getContent } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";

function AboutPage({ lang }) {
  const [spotifyVisible, setSpotifyVisible] = useState(false);
  const DATA = getContent(lang);
  const t = DATA.ui.aboutPage;

  return (
    <div style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
      <SectionHeader
        title={t.title}
        subtitle={t.subtitle}
        accent="#F7971E"
      />

      {/* Bio */}
      <div style={{
        background: "#161622",
        border: "1px solid #2a2a3e",
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 32,
        borderLeft: "4px solid #F7971E",
      }}>
        <p style={{ margin: 0, color: "#b0b0cc", fontSize: 16, lineHeight: 1.8 }}>
          {DATA.about.bio}
        </p>
      </div>

      {/* Facts grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
        marginBottom: 40,
      }}>
        {DATA.about.facts.map((f, i) => (
          <div key={f.label} style={{
            background: "#161622",
            border: "1px solid #2a2a3e",
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            animation: `fadeUp 0.4s ease ${i * 60}ms both`,
          }}>
            <span style={{ fontSize: 24 }}>{f.icon}</span>
            <div>
              <div style={{ color: "#5050a0", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                {f.label}
              </div>
              <div style={{ color: "#d0d0e8", fontSize: 15, fontWeight: 600 }}>
                {f.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificazioni */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ color: "#9090b0", fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>
          {t.certsHeading}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {DATA.about.certs.map((c) => (
            <div key={c.name} style={{
              background: c.color + "22",
              border: `1px solid ${c.color}44`,
              borderRadius: 10,
              padding: "10px 18px",
              color: c.color,
              fontWeight: 700,
              fontSize: 14,
            }}>
              {c.name}
            </div>
          ))}
        </div>
      </div>

      {/* Spotify */}
      <div>
        <h3 style={{ color: "#9090b0", fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>
          {t.playlistHeading}
        </h3>
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #2a2a3e",
        }}>
          {!spotifyVisible ? (
            <button
              onClick={() => setSpotifyVisible(true)}
              style={{
                width: "100%",
                background: "#161622",
                border: "none",
                color: "#1DB954",
                padding: "32px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>🎵</span>
              {t.loadSpotify}
            </button>
          ) : (
            <iframe
              src={DATA.about.spotify}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: "block" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
