function SectionHeader({ title, subtitle, accent }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: "inline-block",
        background: accent + "22",
        color: accent,
        borderRadius: 8,
        padding: "4px 14px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginBottom: 12,
      }}>
        {subtitle}
      </div>
      <h2 style={{
        margin: 0,
        fontSize: 36,
        fontWeight: 800,
        color: "#e0e0f0",
        letterSpacing: -0.5,
      }}>
        {title}
      </h2>
    </div>
  );
}

export default SectionHeader;
