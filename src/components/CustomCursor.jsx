import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Kunai — tip is at top-left (0,0) for pixel-perfect click accuracy
function KunaiSVG({ size = 32, hovering = false, clicking = false }) {
  const color = hovering || clicking ? "#FF6B00" : "#d4a96a";
  const glow = hovering || clicking ? "#FF6B0066" : "transparent";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={{ filter: hovering ? `drop-shadow(0 0 6px ${glow})` : "none" }}
    >
      {/* Blade — tapers to tip at top-left (2,2) */}
      <path
        d="M2 2 L10 14 L14 10 Z"
        fill={color}
        opacity="0.95"
      />
      {/* Blade edge highlight */}
      <path
        d="M2 2 L10 14"
        stroke="white"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* Guard / collar */}
      <rect
        x="10.5" y="13" width="7" height="3"
        rx="1"
        transform="rotate(45 14 14.5)"
        fill={color}
        opacity="0.7"
      />
      {/* Handle with bandage wrap */}
      <path
        d="M15 16 L24 25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Bandage lines */}
      <line x1="17" y1="17.5" x2="19.5" y2="15" stroke="white" strokeWidth="0.7" opacity="0.25" />
      <line x1="19" y1="19.5" x2="21.5" y2="17" stroke="white" strokeWidth="0.7" opacity="0.25" />
      <line x1="21" y1="21.5" x2="23.5" y2="19" stroke="white" strokeWidth="0.7" opacity="0.25" />
      {/* Ring at pommel */}
      <circle
        cx="25.5" cy="26.5" r="2.5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Tip dot — the actual click point */}
      <circle cx="2" cy="2" r="1.2" fill="white" opacity="0.9" />
    </svg>
  );
}

export default function CustomCursor() {
  const [pos, setPos]       = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible]   = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleHover = (e) => {
      const t = e.target;
      setHovering(!!(
        t.closest("a") ||
        t.closest("button") ||
        t.closest("[role='button']") ||
        t.closest("input") ||
        t.closest("textarea")
      ));
    };

    const down = () => setClicking(true);
    const up   = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const size = hovering ? 38 : 32;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: pos.x - 2,   // offset so the tip (top-left) is exactly at cursor
        y: pos.y - 2,
        opacity: visible ? 1 : 0,
        scale: clicking ? 0.85 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 600, damping: 30, mass: 0.2 },
        y: { type: "spring", stiffness: 600, damping: 30, mass: 0.2 },
        scale: { duration: 0.1 },
        opacity: { duration: 0.15 },
      }}
    >
      <KunaiSVG size={size} hovering={hovering} clicking={clicking} />
    </motion.div>
  );
}
