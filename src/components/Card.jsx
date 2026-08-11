import { useState, useLayoutEffect, useRef } from "react";
import Tag from "./Tag.jsx";

const TILT_MAX = 8;

const media = (query) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

// Il tilt ha senso solo con un puntatore preciso: su touch non c'è hover, e con
// prefers-reduced-motion va spento del tutto.
const canTilt = () =>
  media("(hover: hover) and (pointer: fine)") &&
  !media("(prefers-reduced-motion: reduce)");

function Card({ title, desc, tags, color, link, icon, delay = 0 }) {
  // La card parte VISIBILE e si nasconde solo se, al primo layout, è sotto la
  // piega: così il contenuto non dipende mai dal completamento di una
  // transizione. Chi renderizza la pagina senza aspettare (crawler, anteprime
  // dei link, screenshot headless) vede comunque quello che c'è a schermo.
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (media("(prefers-reduced-motion: reduce)")) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setVisible(false);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Il tilt scrive due custom property invece di passare da uno stato React:
  // altrimenti ogni mousemove causava un render dell'intera card.
  const handleMove = (e) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${-py * TILT_MAX}deg`);
    el.style.setProperty("--tilt-y", `${px * TILT_MAX}deg`);
  };

  const resetTilt = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  const leave = () => { setHovered(false); resetTilt(); };

  const interactive = Boolean(link) && link !== "#";
  const Root = interactive ? "a" : "div";
  const linkProps = interactive
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Root
      ref={ref}
      className={interactive ? "card card--link" : "card"}
      {...linkProps}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={leave}
      style={{
        "--accent": color,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // L'accento resta sul bordo e in un alone d'angolo: niente banda
        // colorata sul lato sinistro.
        background: `radial-gradient(130% 90% at 100% 0%, ${color}${hovered ? "26" : "16"}, transparent 55%), ${hovered ? "#1e1e2e" : "#161622"}`,
        border: `1px solid ${hovered ? color : color + "33"}`,
        borderRadius: 16,
        padding: "24px 28px",
        textDecoration: "none",
        color: "inherit",
        cursor: interactive ? "pointer" : "default",
        transition: hovered
          ? "background 0.3s, border-color 0.3s, box-shadow 0.3s, translate 0.3s cubic-bezier(0.16,1,0.3,1)"
          : "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1), translate 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s, border-color 0.3s, box-shadow 0.3s",
        transform: visible
          ? "perspective(800px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))"
          : "perspective(800px) translateY(24px)",
        translate: hovered ? "0 -4px" : "0 0",
        opacity: visible ? 1 : 0,
        transitionDelay: visible && !hovered ? `${Math.min(delay, 240)}ms` : "0ms",
        boxShadow: hovered ? `0 12px 40px ${color}44` : "none",
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
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
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
        <h3 style={{ margin: 0, color: "#e0e0f0", fontSize: 18, fontWeight: 700, textWrap: "balance" }}>{title}</h3>
        {interactive && (
          <span aria-hidden="true" style={{ color, fontSize: 14, flexShrink: 0 }}>↗</span>
        )}
      </div>
      <p style={{ margin: "0 0 20px", color: "#9797b8", fontSize: 14, lineHeight: 1.7, textWrap: "pretty" }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
        {tags.map((t) => <Tag key={t} label={t} color={color} />)}
      </div>
    </Root>
  );
}

export default Card;
