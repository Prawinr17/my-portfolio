import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Konoha leaf SVG for the button icon
function KonohaLeaf() {
  return (
    <svg width="18" height="18" viewBox="0 0 50 60" fill="none">
      {/* Leaf body */}
      <path
        d="M25 4 C25 4 8 18 8 32 C8 42 15.5 50 25 50 C34.5 50 42 42 42 32 C42 18 25 4 25 4Z"
        fill="white"
        opacity="0.95"
      />
      {/* Center vein */}
      <line x1="25" y1="10" x2="25" y2="48" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      {/* Cross guard */}
      <line x1="13" y1="34" x2="37" y2="34" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Stem */}
      <path d="M25 50 L25 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.12, boxShadow: "0 0 24px #FF6B0077" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-[9990] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #FF6B00, #CC0000)",
            boxShadow: "0 4px 20px rgba(255,107,0,0.35)",
          }}
          aria-label="Back to top"
        >
          <KonohaLeaf />
          {/* Pulse ring */}
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-[#FF6B00]/60"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
