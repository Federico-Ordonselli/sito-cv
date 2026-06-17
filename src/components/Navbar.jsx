import { getContent, LANGS } from "../data/content.js";

function Navbar({ page, setPage, lang, setLang }) {
  const { nav } = getContent(lang).ui;
  const navItems = [
    { id: "home", label: nav.home },
    { id: "projects", label: nav.projects },
    { id: "certifications", label: nav.certifications },
    { id: "hobbies", label: nav.hobbies },
    { id: "about", label: nav.about },
  ];

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#0d0d1acc",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid #1e1e3e",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
    }}>
      <span
        onClick={() => setPage("home")}
        style={{
          fontWeight: 900,
          fontSize: 18,
          cursor: "pointer",
          background: "linear-gradient(135deg, #6C63FF, #FF6584)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        ordonselli.info
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {navItems.filter(n => n.id !== "home").map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              background: page === item.id ? "#6C63FF22" : "transparent",
              color: page === item.id ? "#6C63FF" : "#6060a0",
              border: page === item.id ? "1px solid #6C63FF44" : "1px solid transparent",
              borderRadius: 8,
              padding: "6px 16px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </button>
        ))}

        {/* Language toggle */}
        <div style={{
          display: "flex",
          marginLeft: 8,
          border: "1px solid #2a2a4a",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-label={`Switch to ${l.toUpperCase()}`}
              style={{
                background: lang === l ? "#6C63FF" : "transparent",
                color: lang === l ? "#fff" : "#6060a0",
                border: "none",
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
