// Schiarisce una tinta verso il bianco. Serve al contrasto: sul fondo scuro
// del sito le tinte piene degli accenti non arrivano a 4.5:1 (#6C63FF si ferma
// intorno a 4.1:1), e sotto i 18px le WCAG chiedono quel rapporto.
export function lighten(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return (
    "#" +
    [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      .map((c) => mix(c).toString(16).padStart(2, "0"))
      .join("")
  );
}
