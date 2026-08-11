// Il testo del tag usa una variante schiarita dell'accento: a 12px serve un
// rapporto di contrasto 4.5:1, e le tinte piene su fondo scuro non ci arrivano
// (#6C63FF si ferma intorno a 4.1:1 sul fondo della card).
function lighten(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return (
    "#" +
    [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      .map((c) => mix(c).toString(16).padStart(2, "0"))
      .join("")
  );
}

function Tag({ label, color }) {
  return (
    <span
      style={{
        background: color + "22",
        color: lighten(color, 0.3),
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
