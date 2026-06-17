import { useState, useEffect, useRef } from "react";
import Tag from "./Tag.jsx";

function Card({ title, desc, tags, color, link, icon, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 8 });
  };

  const reset = () => { setHovered(false); setTilt({ x: 0, y: 0 }); };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => link && link !== "#" && window.open(link, "_blank")}
      style={{
        background: hovered ? "#1e1e2e" : "#161622",
        border: `1px solid ${hovered ? color : "#2a2a3e"}`,
        borderRadius: 16,
        padding: "24px 28px",
        cursor: link && link !== "#" ? "pointer" : "default",
        transition: hovered
          ? "background 0.3s, border 0.3s, box-shadow 0.3s"
          : "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        transform: visible
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -4 : 0}px)`
          : "perspective(800px) translateY(24px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible && !hovered ? `${delay}ms` : "0ms",
        boxShadow: hovered ? `0 12px 40px ${color}44` : "none",
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: 0, width: 4,
          height: "100%", background: color,
          borderRadius: "16px 0 0 16px",
        }}
      />
      {/* Shimmer sweep on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(110deg, transparent 30%, ${color}18 50%, transparent 70%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.2s ease",
          pointerEvents: "none",
        }} />
      )}
      {icon && (
        <div style={{
          fontSize: 32, marginBottom: 12,
          transform: hovered ? "scale(1.15) translateZ(20px)" : "scale(1)",
          transition: "transform 0.3s",
          display: "inline-block",
        }}>{icon}</div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <h3 style={{ margin: 0, color: "#e0e0f0", fontSize: 18, fontWeight: 700 }}>{title}</h3>
        {link && link !== "#" && (
          <span style={{ color: color, fontSize: 14 }}>↗</span>
        )}
      </div>
      <p style={{ margin: "0 0 16px", color: "#9090b0", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t) => <Tag key={t} label={t} color={color} />)}
      </div>
    </div>
  );
}

export default Card;
