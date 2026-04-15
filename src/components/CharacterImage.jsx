import { useState } from "react";

function FallbackSilhouette({ color = "#FF6B00", className = "" }) {
  return (
    <svg
      viewBox="0 0 300 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="charGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feFlood floodColor={color} floodOpacity="0.4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#charGlow)" opacity="0.7">
        {/* Head */}
        <circle cx="150" cy="80" r="40" fill={color} opacity="0.3" />
        {/* Body */}
        <path
          d="M150 120 L150 350 M100 180 L200 180 M150 350 L100 500 M150 350 L200 500"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Cape / dramatic flow */}
        <path
          d="M120 150 Q60 300 80 480 L150 350 L220 480 Q240 300 180 150 Z"
          fill={color}
          opacity="0.08"
        />
        {/* Glow aura */}
        <ellipse cx="150" cy="300" rx="100" ry="250" fill={color} opacity="0.04" />
      </g>
    </svg>
  );
}

export default function CharacterImage({ src, alt, color = "#FF6B00", className = "", style = {} }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <FallbackSilhouette color={color} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`char-img ${className}`}
      style={style}
      onError={() => setFailed(true)}
      loading="eager"
    />
  );
}
