import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Shuriken({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M50 50 L50 5 L30 35 Z" fill="#FF6B00" opacity="0.9" />
      <path d="M50 50 L95 50 L65 30 Z" fill="#FF6B00" opacity="0.7" />
      <path d="M50 50 L50 95 L70 65 Z" fill="#FF6B00" opacity="0.9" />
      <path d="M50 50 L5 50 L35 70 Z" fill="#FF6B00" opacity="0.7" />
      <circle cx="50" cy="50" r="8" fill="#0a0a0a" stroke="#FF6B00" strokeWidth="2" />
      <circle cx="50" cy="50" r="3" fill="#FF6B00" />
    </svg>
  );
}

function Kunai({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 180" fill="none">
      <path d="M40 0 L52 70 L40 80 L28 70 Z" fill="#C0C0C0" opacity="0.8" />
      <path d="M40 0 L40 80 L28 70 Z" fill="#A0A0A0" opacity="0.6" />
      <line x1="40" y1="5" x2="40" y2="75" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" />
      <rect x="30" y="78" width="20" height="6" rx="2" fill="#FF6B00" opacity="0.9" />
      <rect x="36" y="84" width="8" height="50" rx="2" fill="#333" />
      <line x1="36" y1="90" x2="44" y2="90" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="98" x2="44" y2="98" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="106" x2="44" y2="106" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="114" x2="44" y2="114" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="122" x2="44" y2="122" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="145" r="12" fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.8" />
      <circle cx="40" cy="145" r="5" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function QuoteDivider({ japanese, english, character, characterRole, image }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-10 sm:py-14 lg:py-16 px-4 overflow-hidden bg-[#080810]">
      {/* Top/bottom border lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/25 to-transparent"
        style={{ transformOrigin: "center" }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/25 to-transparent"
        style={{ transformOrigin: "center" }}
      />

      {/* LEFT: weapons — hidden on mobile, shown sm+ */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden sm:flex absolute left-[4%] md:left-[8%] lg:left-[14%] top-1/2 -translate-y-1/2 items-center gap-3"
      >
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
          <Shuriken size={40} />
        </motion.div>
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ transform: "rotate(15deg)" }}>
          <Kunai size={48} />
        </motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="hidden md:block">
          <Shuriken size={32} />
        </motion.div>
      </motion.div>

      {/* RIGHT: Character image — hidden on mobile, shown sm+ */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden sm:block absolute right-[4%] md:right-[8%] lg:right-[13%] top-1/2 -translate-y-1/2"
      >
        <img
          src={image || "/young naruto.png"}
          alt={`${character} quote`}
          className="h-[130px] sm:h-[160px] lg:h-[190px] w-auto opacity-85"
        />
      </motion.div>

      {/* CENTER: Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-sm sm:max-w-md lg:max-w-xl mx-auto text-center px-2"
      >
        {/* Japanese version */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="font-heading text-sm sm:text-base lg:text-lg tracking-[0.12em] leading-relaxed mb-3"
          style={{ color: "#FF6B00", opacity: 0.85 }}
        >
          {japanese}
        </motion.p>

        {/* Divider with kanji dot */}
        <div className="flex items-center gap-3 mb-3 justify-center">
          <div className="h-px w-12 sm:w-16" style={{ background: "linear-gradient(to right, transparent, #FF6B0050)" }} />
          <span className="font-mono text-[9px] text-gray-600 tracking-[0.3em]">忍</span>
          <div className="h-px w-12 sm:w-16" style={{ background: "linear-gradient(to left, transparent, #FF6B0050)" }} />
        </div>

        {/* English version */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="font-heading text-lg sm:text-2xl lg:text-3xl text-white leading-snug tracking-wider"
        >
          "{english}"
        </motion.p>

        {/* Character attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
          className="mt-4 flex flex-col items-center gap-0.5"
        >
          <span className="font-body text-sm text-[#FF6B00] tracking-[0.2em] uppercase font-semibold">
            — {character}
          </span>
          {characterRole && (
            <span className="font-mono text-[9px] text-gray-600 tracking-widest uppercase">
              {characterRole}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
