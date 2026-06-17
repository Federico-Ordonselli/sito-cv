function Tag({ label, color }) {
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}44`,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.3,
      }}
    >
      {label}
    </span>
  );
}

export default Tag;
