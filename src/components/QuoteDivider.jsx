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
      {/* Blade */}
      <path d="M40 0 L52 70 L40 80 L28 70 Z" fill="#C0C0C0" opacity="0.8" />
      <path d="M40 0 L40 80 L28 70 Z" fill="#A0A0A0" opacity="0.6" />
      {/* Edge line */}
      <line x1="40" y1="5" x2="40" y2="75" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" />
      {/* Guard */}
      <rect x="30" y="78" width="20" height="6" rx="2" fill="#FF6B00" opacity="0.9" />
      {/* Handle wrap */}
      <rect x="36" y="84" width="8" height="50" rx="2" fill="#333" />
      <line x1="36" y1="90" x2="44" y2="90" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="98" x2="44" y2="98" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="106" x2="44" y2="106" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="114" x2="44" y2="114" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="122" x2="44" y2="122" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />
      {/* Ring at bottom */}
      <circle cx="40" cy="145" r="12" fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.8" />
      <circle cx="40" cy="145" r="5" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function QuoteDivider({ text, author }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-16 sm:py-20 px-4 overflow-hidden bg-[#080810]">
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

      {/* LEFT: Kunai + Shuriken — closer to center */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute left-[8%] sm:left-[12%] lg:left-[18%] top-1/2 -translate-y-1/2 flex items-center gap-5"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Shuriken size={55} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "rotate(15deg)" }}
        >
          <Kunai size={60} />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Shuriken size={45} />
        </motion.div>
      </motion.div>

      {/* RIGHT: Naruto rasengan image — bigger */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute right-[8%] sm:right-[12%] lg:right-[16%] top-1/2 -translate-y-1/2"
      >
        <img
          src="/young naruto.png"
          alt="Praveen R portfolio decorative quote section, Naruto Rasengan illustration"
          className="h-[180px] sm:h-[210px] w-auto opacity-80"
        />
      </motion.div>

      {/* CENTER: Quote text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-snug tracking-wider">
          "{text}"
        </div>
        <div className="font-body text-sm text-[#FF6B00] mt-3 tracking-wider uppercase">
          — {author}
        </div>
      </motion.div>
    </div>
  );
}
