function SubSection({ title, children }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#d1d8cf" }}>{title}</h3>
        <div style={{ flex: 1, height: 1, background: "#303a34" }} />
      </div>
      <div style={{
        display: "grid",
        // min() evita che sotto i 348px di viewport la traccia da 300px sfori
        // il contenitore e faccia scorrere la pagina in orizzontale.
        gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
        gap: 20,
      }}>
        {children}
      </div>
    </div>
  );
}

export default SubSection;
