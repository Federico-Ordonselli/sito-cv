function SubSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#c0c0d8" }}>{title}</h3>
        <div style={{ flex: 1, height: 1, background: "#2a2a3e" }} />
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {children}
      </div>
    </div>
  );
}

export default SubSection;
