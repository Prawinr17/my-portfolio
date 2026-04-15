import { motion, AnimatePresence } from "framer-motion";

function KunaiSVG() {
  return (
    <svg width="200" height="65" viewBox="0 0 200 65" fill="none">
      {/* Blade — bigger, sharper */}
      <path d="M0 32 L75 22 L75 42 Z" fill="#D0D0D0" />
      <path d="M0 32 L75 32 L75 22 Z" fill="#F0F0F0" />
      {/* Edge shine */}
      <path d="M5 32 L70 24" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />
      {/* Guard */}
      <rect x="75" y="18" width="8" height="28" rx="2" fill="#FF6B00" />
      {/* Handle */}
      <rect x="83" y="24" width="65" height="16" rx="3" fill="#2a2a2a" />
      <rect x="83" y="24" width="65" height="8" rx="3" fill="#333" />
      {/* Handle wraps */}
      <line x1="93" y1="24" x2="93" y2="40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="103" y1="24" x2="103" y2="40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="113" y1="24" x2="113" y2="40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="123" y1="24" x2="123" y2="40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="133" y1="24" x2="133" y2="40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      {/* Ring */}
      <circle cx="165" cy="32" r="16" fill="none" stroke="#FF6B00" strokeWidth="3" />
      <circle cx="165" cy="32" r="6" fill="none" stroke="#FF6B00" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export default function LoadingScreen({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-[#FF6B00] flex items-center justify-center"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {/* Cloud/smoke puffs on exit — reveal effect */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="fixed rounded-full bg-[#0a0a0a] z-[9999] pointer-events-none"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${i < 4 ? 20 : 60}%`,
                width: `${200 + i * 40}px`,
                height: `${200 + i * 40}px`,
              }}
              initial={{ scale: 0, opacity: 0.9 }}
              exit={{
                scale: [1.5, 3, 5],
                opacity: [0.8, 0.4, 0],
                transition: {
                  duration: 1,
                  delay: i * 0.06,
                  ease: "easeOut",
                },
              }}
            />
          ))}
          {/* Dark bg wipes down quickly after strike */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.35, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "top" }}
          />

          <div className="relative z-10 flex items-center justify-center">
            {/* PRAVEEN R text — appears, holds, then fades after strike */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <motion.span
                className="font-heading text-6xl sm:text-8xl lg:text-9xl text-white tracking-[0.15em] block text-center select-none"
                animate={{ opacity: [1, 1, 1, 0] }}
                transition={{ duration: 2.8, times: [0, 0.5, 0.75, 1] }}
              >
                PRAVEEN R
              </motion.span>

              {/* Strike slash line — appears on kunai impact */}
              <motion.div
                className="absolute top-1/2 -left-[10%] -right-[10%] h-[4px] -translate-y-1/2"
                style={{
                  background: "linear-gradient(to right, transparent 0%, #FF6B00 15%, #FFFFFF 50%, #FF6B00 85%, transparent 100%)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 0, 1, 1, 1, 0],
                  opacity: [0, 0, 1, 1, 0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.35, 0.45, 0.6, 0.75, 1],
                  ease: "easeOut",
                }}
              />

              {/* Text splits apart after strike — top half goes up, bottom goes down */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(0 0 52% 0)" }}
                animate={{ y: [0, 0, 0, -15], opacity: [0, 0, 0, 0.4, 0] }}
                transition={{ duration: 2.8, times: [0, 0.5, 0.7, 0.85, 1] }}
              >
                <span className="font-heading text-6xl sm:text-8xl lg:text-9xl text-white tracking-[0.15em] block text-center">
                  PRAVEEN R
                </span>
              </motion.div>
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(52% 0 0 0)" }}
                animate={{ y: [0, 0, 0, 15], opacity: [0, 0, 0, 0.4, 0] }}
                transition={{ duration: 2.8, times: [0, 0.5, 0.7, 0.85, 1] }}
              >
                <span className="font-heading text-6xl sm:text-8xl lg:text-9xl text-white tracking-[0.15em] block text-center">
                  PRAVEEN R
                </span>
              </motion.div>
            </motion.div>

            {/* KUNAI — comes fast from right, SLOWS DOWN at center (slo-mo), then exits */}
            <motion.div
              className="absolute z-20"
              initial={{ x: 600, opacity: 0 }}
              animate={{
                x: [600, 100, 0, -30, -600],
                opacity: [0, 1, 1, 1, 0],
                rotate: [0, 0, 0, 0, -3],
              }}
              transition={{
                duration: 2,
                delay: 0.6,
                times: [0, 0.15, 0.35, 0.55, 1],
                ease: "easeInOut",
              }}
            >
              <KunaiSVG />
            </motion.div>

            {/* Impact flash — big white burst */}
            <motion.div
              className="absolute w-6 h-6 rounded-full bg-white z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 5, 8, 0],
                opacity: [0, 0.9, 0.4, 0],
              }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />

            {/* Screen flash white on impact */}
            <motion.div
              className="fixed inset-0 bg-white z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.15, 0] }}
              transition={{ duration: 1.8, delay: 0.6, times: [0, 0.35, 0.4, 0.55] }}
            />

            {/* Spark particles on impact */}
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const dist = 60 + Math.random() * 80;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#FF6B00] z-30"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, Math.cos(angle) * dist],
                    y: [0, Math.sin(angle) * dist],
                    opacity: [0, 1, 0],
                    scale: [0, 2, 0],
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 1.3 + i * 0.02,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Metal clang sparks — white */}
            {[...Array(5)].map((_, i) => {
              const angle = (Math.random() - 0.5) * Math.PI;
              const dist = 30 + Math.random() * 50;
              return (
                <motion.div
                  key={`w${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white z-30"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: [0, Math.cos(angle) * dist],
                    y: [0, Math.sin(angle) * dist],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 1.3 + i * 0.03,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
