import { useEffect, useRef, useState, useReducer } from "react";

const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCursorPos() {
  const pos  = useRef({ x: -200, y: -200 });
  const anim = useRef({ x: -200, y: -200 });
  const raf  = useRef(null);
  const [, tick] = useReducer((n) => n + 1, 0);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (isTouch || prefersReduced) return;
    const loop = () => {
      const { x: tx, y: ty } = pos.current;
      const { x: ax, y: ay } = anim.current;
      anim.current = { x: ax + (tx - ax) * 0.22, y: ay + (ty - ay) * 0.22 };
      tick();
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return { raw: pos, smooth: anim };
}

// SVG rasengan drawn inline — wind blades + swirling core
function RasenganSVG({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Deep blue swirl core gradient */}
        <radialGradient id="rsCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%"  stopColor="#a8e0ff" stopOpacity="1" />
          <stop offset="65%"  stopColor="#1a90ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#003eaa" stopOpacity="1" />
        </radialGradient>
        {/* Wind blade gradient — white fading out */}
        <linearGradient id="rsBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%"  stopColor="#c0e8ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4db8ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rsBlade2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#c0e8ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4db8ff" stopOpacity="0" />
        </linearGradient>
        {/* Outer glow */}
        <radialGradient id="rsGlow" cx="50%" cy="50%" r="50%">
          <stop offset="40%"  stopColor="#1a90ff" stopOpacity="0" />
          <stop offset="100%" stopColor="#0055cc" stopOpacity="0.35" />
        </radialGradient>
        {/* Swirl ring gradient */}
        <linearGradient id="rsSwirl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%"  stopColor="#4db8ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer ambient glow circle */}
      <circle cx="24" cy="24" r="22" fill="url(#rsGlow)" />

      {/* Wind blades group — spins as one around centre */}
      <g style={{ transformOrigin: "24px 24px", animation: "rs-spin-cw 0.7s linear infinite" }}>
        {/* Blade 1 — left */}
        <path d="M24 24 L4 6 Q10 14 14 24 Q10 34 4 42 Z"  fill="url(#rsBlade1)" />
        {/* Blade 2 — right */}
        <path d="M24 24 L44 6 Q38 14 34 24 Q38 34 44 42 Z" fill="url(#rsBlade2)" />
        {/* Blade 3 — top */}
        <path d="M24 24 L6 4 Q16 10 24 14 Q32 10 42 4 Z"  fill="url(#rsBlade1)" opacity="0.75" />
        {/* Blade 4 — bottom */}
        <path d="M24 24 L6 44 Q16 38 24 34 Q32 38 42 44 Z" fill="url(#rsBlade2)" opacity="0.75" />
      </g>

      {/* Swirl outer ring */}
      <circle
        cx="24" cy="24" r="13"
        stroke="url(#rsSwirl)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="20 12 8 4"
        strokeLinecap="round"
        style={{ transformOrigin: "24px 24px", animation: "rs-spin-cw 0.5s linear infinite" }}
      />
      {/* Swirl inner ring */}
      <circle
        cx="24" cy="24" r="9"
        stroke="#ffffffcc"
        strokeWidth="1"
        fill="none"
        strokeDasharray="12 8 6 3"
        strokeLinecap="round"
        style={{ transformOrigin: "24px 24px", animation: "rs-spin-ccw 0.4s linear infinite" }}
      />

      {/* Core orb */}
      <circle cx="24" cy="24" r="7" fill="url(#rsCore)" />
      {/* Core inner bright spot */}
      <circle cx="22" cy="22" r="3" fill="white" opacity="0.9" />
    </svg>
  );
}

export default function CustomCursor() {
  const [state, setState] = useState({ visible: false, hover: false, text: false });
  const [rippleKey, setRippleKey] = useState(0);
  const ripplePos = useRef({ x: 0, y: 0 });
  const { raw, smooth } = useCursorPos();

  useEffect(() => {
    if (isTouch) return;

    const onEnter = () => setState((s) => ({ ...s, visible: true }));
    const onLeave = () => setState((s) => ({ ...s, visible: false }));

    const onOver = (e) => {
      const t = e.target;
      const isText      = !!t.closest("input, textarea, [contenteditable]");
      const isClickable = !!t.closest("a, button, [role='button'], [data-cursor='pointer']");
      setState((s) => ({ ...s, hover: isClickable && !isText, text: isText }));
    };

    const onDown = () => {
      ripplePos.current = { ...raw.current };
      setRippleKey((k) => k + 1);
    };

    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);

    return () => {
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
    };
  }, [raw]);

  if (isTouch) return null;

  const { x, y } = prefersReduced ? raw.current : smooth.current;
  const { visible, hover, text } = state;

  if (text) return null;

  // Hover: bigger rasengan
  const size = hover ? 52 : 36;

  return (
    <>
      {/* Click ripple */}
      {rippleKey > 0 && (
        <div
          key={rippleKey}
          className="rs-ripple"
          style={{ left: ripplePos.current.x, top: ripplePos.current.y }}
        />
      )}

      {/* Rasengan SVG cursor */}
      <div
        style={{
          position: "fixed",
          left: x,
          top: y,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "width 0.18s ease, height 0.18s ease, opacity 0.12s",
          filter: "drop-shadow(0 0 6px #1a90ffaa) drop-shadow(0 0 14px #0055cc55)",
        }}
      >
        <RasenganSVG size={size} />
      </div>
    </>
  );
}
