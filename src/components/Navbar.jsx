function Navbar({ page, setPage }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Progetti" },
    { id: "hobbies", label: "Hobby" },
    { id: "about", label: "Chi sono" },
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
        Federico.dev
      </span>
      <div style={{ display: "flex", gap: 4 }}>
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
      </div>
    </nav>
  );
}

export default Navbar;
