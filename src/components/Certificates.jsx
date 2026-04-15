import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { certificates } from "../data/portfolio";

// Rank labels mapped to each certificate index
const rankMeta = [
  { rank: "CHUNIN", kanji: "中忍", color: "#FF6B00" },
  { rank: "JONIN",  kanji: "上忍", color: "#00FF88" },
];

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certificates"
      className="relative py-16 sm:py-20 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      {/* ===== BG watermark — 証 (seal / certificate) ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.04 } : {}}
          transition={{ duration: 1.2 }}
          className="font-heading text-[22rem] sm:text-[30rem] text-white leading-none"
        >
          証
        </motion.span>
      </div>

      {/* Subtle orange glow — center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[500px] h-[500px] rounded-full bg-[#FF6B00]/[0.04] blur-[100px]" />
      </div>

      {/* ===== HEADER ===== */}
      <div className="relative z-10 text-center mb-14 px-4">
        {/* Badge — scales in first */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 backdrop-blur-sm font-heading text-sm text-[#FF6B00] tracking-[0.3em]">
            CHUNIN EXAMS
          </span>
        </motion.div>

        {/* Chapter label + heading — slides up after badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
            {"// Chapter 06"}
          </span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider">
            RANK SCROLLS
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-[2px] w-32 mx-auto mt-3 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
          />
        </motion.div>
      </div>

      {/* ===== SCROLL CARDS ===== */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-8">
          {certificates.map((cert, i) => {
            const meta = rankMeta[i];
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative group"
              >
                {/* Outer glow on hover */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{ background: `${meta.color}10` }}
                />

                <div
                  className="rounded-2xl overflow-hidden border"
                  style={{
                    background: "linear-gradient(160deg, #14121c 0%, #0d0c12 100%)",
                    borderColor: `${meta.color}22`,
                  }}
                >
                  {/* ── Scroll top roll ── */}
                  <div
                    className="h-4 w-full relative overflow-hidden"
                    style={{ background: `${meta.color}12` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, ${meta.color}18 0px, ${meta.color}18 1px, transparent 1px, transparent 10px)`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[1px]"
                      style={{ background: `${meta.color}40` }}
                    />
                  </div>

                  {/* ── Main content ── */}
                  <div className="p-6 relative">
                    {/* Rank number watermark */}
                    <span
                      className="absolute top-4 right-5 font-heading text-7xl leading-none select-none pointer-events-none"
                      style={{ color: `${meta.color}0D` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Top row — rank badge + kanji */}
                    <div className="flex items-start justify-between mb-5">
                      {/* Rank badge */}
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border"
                        style={{
                          borderColor: `${meta.color}30`,
                          background: `${meta.color}10`,
                        }}
                      >
                        <span
                          className="font-heading text-xs tracking-[0.2em]"
                          style={{ color: meta.color }}
                        >
                          {meta.rank}
                        </span>
                      </div>

                      {/* Kanji seal circle */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 relative"
                        style={{
                          borderColor: `${meta.color}30`,
                          background: `${meta.color}08`,
                        }}
                      >
                        <span
                          className="font-heading text-lg"
                          style={{ color: `${meta.color}90` }}
                        >
                          {meta.kanji}
                        </span>
                        {/* Outer ring pulse */}
                        <motion.div
                          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                          className="absolute inset-0 rounded-full border"
                          style={{ borderColor: `${meta.color}40` }}
                        />
                      </div>
                    </div>

                    {/* Certificate title */}
                    <h3 className="font-heading text-xl text-white tracking-wider leading-snug mb-2">
                      {cert.title}
                    </h3>

                    {/* Village (issuer) */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-[10px] text-gray-500 tracking-wider">村:</span>
                      <span
                        className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                        style={{ color: meta.color }}
                      >
                        {cert.issuer}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm text-gray-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* ── Scroll bottom footer ── */}
                  <div
                    className="px-6 py-3 flex items-center justify-between border-t"
                    style={{
                      background: `${meta.color}08`,
                      borderColor: `${meta.color}18`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full"
                        style={{ background: meta.color }}
                      />
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: meta.color }}
                      >
                        Rank Achieved
                      </span>
                    </div>

                    {/* Scroll bottom roll decoration */}
                    <div
                      className="h-2 w-20 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${meta.color}30, transparent)`,
                      }}
                    />
                  </div>

                  {/* ── Scroll bottom roll ── */}
                  <div
                    className="h-4 w-full relative overflow-hidden"
                    style={{ background: `${meta.color}12` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, ${meta.color}18 0px, ${meta.color}18 1px, transparent 1px, transparent 10px)`,
                      }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{ background: `${meta.color}40` }}
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom flavour text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-gray-600 italic">
            "Besides money, shinobi may also gain reputation, rank promotions, and trust from the village leadership."
          </p>
          <span className="font-mono text-xs text-[#FF6B00] mt-1 block">— Naruto Lore</span>
        </motion.div>
      </div>
    </section>
  );
}
