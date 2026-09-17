import { useState, useEffect, useRef } from "react";
import { getContent, LANGS } from "../data/content.js";

const NAV_HEIGHT = 76;

function Navbar({ page, setPage, lang, setLang }) {
  const { nav } = getContent(lang).ui;
  const navItems = [
    { id: "home", label: nav.home },
    { id: "projects", label: nav.projects },
    { id: "certifications", label: nav.certifications },
    { id: "hobbies", label: nav.hobbies },
    { id: "about", label: nav.about },
  ];

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 800
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 800;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // close menu when switching to desktop
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close the mobile menu on Escape or click/tap outside the navbar
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const goTo = (id) => {
    setPage(id);
    setMenuOpen(false);
  };

  const langToggle = (
    <div style={{
      display: "flex",
      border: "1px solid #303a34",
      borderRadius: 8,
      overflow: "hidden",
    }}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-label={`Switch to ${l.toUpperCase()}`}
          aria-pressed={lang === l}
          style={{
            background: lang === l ? "#bdd1b8" : "transparent",
            color: lang === l ? "#121615" : "#9ca99e",
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
  );

  return (
    <nav className="navbar" ref={navRef} style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#121615cc",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid #2c3530",
      padding: "0 max(24px, calc((100vw - 1100px) / 2))",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: NAV_HEIGHT,
    }}>
      <button className="brand"
        onClick={() => goTo("home")}
        style={{
          fontWeight: 900,
          fontSize: 18,
          cursor: "pointer",
          background: "none", color: "var(--text)", border: 0, padding: 0, letterSpacing: -0.6,
        }}
      >
        ordonselli<span style={{ color: "var(--accent)", fontWeight: 400 }}>.info</span>
      </button>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navItems.filter(n => n.id !== "home").map((item) => (
            <button
              key={item.id}
              aria-current={page === item.id ? "page" : undefined}
              onClick={() => setPage(item.id)}
              style={{
                background: page === item.id ? "#bdd1b822" : "transparent",
                color: page === item.id ? "#bdd1b8" : "#a8b3a9",
                border: page === item.id ? "1px solid #bdd1b844" : "1px solid transparent",
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
          <div style={{ marginLeft: 8 }}>{langToggle}</div>
        </div>
      )}

      {isMobile && (
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{
            background: "transparent",
            border: "1px solid #303a34",
            borderRadius: 8,
            width: 40,
            height: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            cursor: "pointer",
            padding: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 18,
                height: 2,
                borderRadius: 2,
                background: "#a8b3a9",
                transition: "transform 0.25s, opacity 0.2s",
                transform:
                  menuOpen && i === 0 ? "translateY(6px) rotate(45deg)"
                  : menuOpen && i === 2 ? "translateY(-6px) rotate(-45deg)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      )}

      {/* Mobile dropdown panel */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute",
          top: NAV_HEIGHT,
          left: 0,
          right: 0,
          background: "#121615f2",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #2c3530",
          padding: "12px 24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          animation: "fadeUp 0.25s ease",
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              aria-current={page === item.id ? "page" : undefined}
              onClick={() => goTo(item.id)}
              style={{
                background: page === item.id ? "#bdd1b822" : "transparent",
                color: page === item.id ? "#bdd1b8" : "#a8b3a9",
                border: page === item.id ? "1px solid #bdd1b844" : "1px solid transparent",
                borderRadius: 8,
                padding: "12px 16px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ marginTop: 8 }}>{langToggle}</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
