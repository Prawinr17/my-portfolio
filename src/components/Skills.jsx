import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "../data/portfolio";
import CharacterImage from "./CharacterImage";

const ELEMENTS = [
  { element: "Fire Release",      kanji: "火遁", color: "#FF6B00" },
  { element: "Wind Release",      kanji: "風遁", color: "#00CCFF" },
  { element: "Water Release",     kanji: "水遁", color: "#00FF88" },
  { element: "Earth Release",     kanji: "土遁", color: "#CC5500" },
  { element: "Wood Release",      kanji: "木遁", color: "#44BB55" },
  { element: "Lightning Release", kanji: "雷遁", color: "#FFDD00" },
  { element: "Yin Release",       kanji: "陰遁", color: "#AA88FF" },
  { element: "Yang Release",      kanji: "陽遁", color: "#FF8C33" },
  { element: "Six Paths",         kanji: "六道", color: "#FF4466" },
];

/* Floating kanji background symbols */
const BG_KANJI = [
  { kanji: "火遁", color: "#FF6B00", x: "8%",  y: "12%", size: "7rem", rotate: -15, delay: 0 },
  { kanji: "風遁", color: "#00CCFF", x: "88%", y: "8%",  size: "5.5rem", rotate: 20,  delay: 0.4 },
  { kanji: "水遁", color: "#00FF88", x: "75%", y: "55%", size: "8rem",  rotate: -8,  delay: 0.8 },
  { kanji: "土遁", color: "#CC5500", x: "5%",  y: "60%", size: "6rem",  rotate: 12,  delay: 0.3 },
  { kanji: "木遁", color: "#44BB55", x: "50%", y: "5%",  size: "5rem",  rotate: -20, delay: 1.1 },
  { kanji: "雷遁", color: "#FFDD00", x: "92%", y: "78%", size: "7rem",  rotate: 8,   delay: 0.6 },
  { kanji: "陰遁", color: "#AA88FF", x: "20%", y: "85%", size: "6.5rem",rotate: -5,  delay: 0.9 },
  { kanji: "陽遁", color: "#FF8C33", x: "60%", y: "80%", size: "5rem",  rotate: 15,  delay: 1.3 },
  { kanji: "六道", color: "#FF4466", x: "35%", y: "50%", size: "9rem",  rotate: -12, delay: 0.2 },
];

function ElementIcon({ index, color }) {
  const s = 14;
  const icons = [
    <path key="f" d={`M7 1C7 1 3.5 5.9 3.5 9.1c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5C10.5 5.9 7 1 7 1Z`} fill={color} opacity="0.95"/>,
    <g key="w"><path d={`M1 5Q5 3 13 5`} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d={`M2 9Q6 11 12 9`} stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6"/></g>,
    <path key="wa" d={`M7 1L11 9.5A4 4 0 0 1 3 9.5Z`} fill={color} opacity="0.9"/>,
    <g key="e"><rect x="1" y="9" width="12" height="3.5" rx="1.5" fill={color} opacity="0.9"/><rect x="2.5" y="5.5" width="9" height="3.5" rx="1.5" fill={color} opacity="0.6"/><rect x="4.5" y="2.5" width="5" height="3" rx="1" fill={color} opacity="0.4"/></g>,
    <g key="wo"><rect x="6" y="7" width="2" height="6" fill={color} opacity="0.8"/><path d="M7 1L2 8h10Z" fill={color} opacity="0.85"/></g>,
    <path key="l" d={`M9 1L4 7.5h3.5L5.5 13l7-7H9Z`} fill={color} opacity="0.95"/>,
    <path key="yi" d={`M9.5 2A5.5 5.5 0 1 0 9.5 12A3.5 3.5 0 1 1 9.5 2Z`} fill={color} opacity="0.9"/>,
    <g key="ya"><circle cx="7" cy="7" r="3.5" fill={color} opacity="0.9"/>{[0,45,90,135,180,225,270,315].map((d,i)=>{const r=d*Math.PI/180;return <line key={i} x1={7+4.5*Math.cos(r)} y1={7+4.5*Math.sin(r)} x2={7+6*Math.cos(r)} y2={7+6*Math.sin(r)} stroke={color} strokeWidth="1.2" opacity="0.55"/>})}</g>,
    <path key="sp" d={`M7 0.5L8.3 4.8h4.5L9.6 7.5l1.3 4.3L7 9.4l-3.9 2.4L4.4 7.5 1.2 4.8h4.5Z`} fill={color} opacity="0.9"/>,
  ];
  return (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none">{icons[index]}</svg>
  );
}

/* ── Konoha village-style card ── */
function SkillCard({ category, element, index, isInView }) {
  const { color, element: elName, kanji } = element;
  const isWide = index === 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, clipPath: "inset(100% 0 0 0)" }}
      animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${isWide ? "sm:col-span-2" : ""}`}
      style={{
        background: `linear-gradient(135deg, #0f0e18 0%, #0a0914 60%, #0d0b16 100%)`,
        border: `1px solid ${color}18`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.boxShadow = `0 8px 32px ${color}18, 0 0 0 1px ${color}30, inset 0 1px 0 ${color}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${color}18`;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top roll — scroll/parchment top bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color}60 20%, ${color}90 50%, ${color}60 80%, transparent 100%)` }}
      />

      {/* Diagonal accent lines — Konoha village geometric feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `repeating-linear-gradient(-55deg, ${color}06 0px, ${color}06 1px, transparent 1px, transparent 18px)`,
        }}
      />

      {/* Corner kanji seal — top right */}
      <div
        className="absolute top-2 right-3 font-heading text-2xl leading-none select-none pointer-events-none transition-opacity duration-300"
        style={{ color: `${color}12`, fontSize: "2.2rem" }}
      >
        {kanji}
      </div>
      <div
        className="absolute top-2 right-3 font-heading text-2xl leading-none select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: `${color}22`, fontSize: "2.2rem" }}
      >
        {kanji}
      </div>

      {/* Content */}
      <div className="relative z-10 p-3.5">
        {/* Header row */}
        <div className="flex items-center gap-2 mb-2.5">
          {/* Element badge — text only, no bg */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ElementIcon index={index} color={color} />
            <span className="font-mono text-[9px] tracking-[0.15em] font-bold" style={{ color }}>
              {elName}
            </span>
            <span className="font-mono text-[9px]" style={{ color: `${color}60` }}>{kanji}</span>
          </div>

          {/* Divider line */}
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />

          {/* Category title */}
          <span className="font-heading text-[10px] text-gray-500 tracking-[0.12em] shrink-0 uppercase">
            {category.title}
          </span>
        </div>

        {/* Skill tags — Konoha headband style */}
        <div className="flex flex-wrap gap-1.5">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 font-body text-xs font-semibold rounded-md transition-all duration-200 group-hover:border-opacity-40"
              style={{
                color: "#dde0f0",
                background: "linear-gradient(135deg, #191828 0%, #141320 100%)",
                border: `1px solid #ffffff12`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#dde0f0";
                e.currentTarget.style.borderColor = "#ffffff12";
                e.currentTarget.style.background = "linear-gradient(135deg, #191828 0%, #141320 100%)";
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color}50 50%, transparent 100%)` }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [swept, setSwept] = useState(false);

  return (
    <section
      id="skills"
      className="relative py-14 sm:py-16 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      {/* ── BG: diagonal texture ── */}
      <div className="absolute inset-0 diag-lines z-0 pointer-events-none opacity-50" />

      {/* ── BG: 9 floating kanji symbols ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {BG_KANJI.map((item, i) => (
          <motion.span
            key={i}
            className="absolute font-heading leading-none select-none"
            style={{
              left: item.x,
              top: item.y,
              fontSize: item.size,
              color: item.color,
              rotate: item.rotate,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? {
              opacity: [0, 0.055, 0.045, 0.055],
              scale: [0.6, 1, 0.98, 1],
              y: [0, -12, 0, -8, 0],
            } : {}}
            transition={{
              opacity: { duration: 0.8, delay: item.delay },
              scale:   { duration: 0.8, delay: item.delay },
              y: { duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: item.delay + 1 },
            }}
          >
            {item.kanji}
          </motion.span>
        ))}
      </div>

      {/* ── BG: radial center glow ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 65% 50%, #FF6B0008 0%, transparent 60%)" }}
      />

      {/* Scanline sweep on enter */}
      {isInView && !swept && (
        <div className="scan-sweep z-20" onAnimationEnd={() => setSwept(true)} />
      )}

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="relative z-10 text-center mb-8 px-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm text-[#00FF88] mb-1.5 block tracking-wider"
        >
          {"// Chapter 02"}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24, clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl sm:text-6xl text-white tracking-wide"
        >
          CHAKRA ELEMENTS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="font-body text-gray-500 mt-1.5 text-sm"
        >
          Master the Elements. Unlock the Techniques.
        </motion.p>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT: Naruto image + quote + legend ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[26%] flex flex-col items-center lg:sticky lg:top-20 shrink-0"
          >
            <div className="relative flex items-center justify-center w-full">
              {/* Soft glow */}
              <div
                className="absolute w-[200px] h-[200px] rounded-full blur-[70px] pointer-events-none"
                style={{ background: "radial-gradient(circle, #FF6B0025 0%, transparent 70%)" }}
              />
              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: i % 2 === 0 ? 4 : 3,
                    height: i % 2 === 0 ? 4 : 3,
                    background: i % 3 === 0 ? "#FF6B00" : i % 3 === 1 ? "#4db8ff" : "#00FF88",
                    left: `${18 + (i * 14) % 55}%`,
                    top: `${10 + (i * 19) % 70}%`,
                  }}
                  animate={{ y: [0, -10, 0], opacity: [0.25, 0.65, 0.25] }}
                  transition={{ duration: 2.2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />
              ))}
              <CharacterImage
                src="/rasengan.png"
                alt="Naruto — Rasengan Mode"
                color="#FF6B00"
                className="w-full max-w-[200px] lg:max-w-[220px] h-auto relative z-10"
              />
            </div>

            {/* Caption pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-2 text-center"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5">
                <span className="w-1 h-1 rounded-full bg-[#FF6B00] animate-pulse shrink-0" />
                <span className="font-mono text-[8px] text-[#FF6B00] tracking-[0.15em] uppercase leading-tight">
                  Rasengan Mode
                </span>
              </div>
            </motion.div>

            {/* Naruto quote — Japanese + English, no card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              className="mt-5 w-full px-1 text-center"
            >
              {/* Japanese */}
              <p className="font-heading text-sm tracking-[0.18em] leading-relaxed mb-2" style={{ color: "#FF6B00", opacity: 0.75 }}>
                諦めたら、夢も何もかも終わりだ。
              </p>
              {/* Divider */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #FF6B0040)" }} />
                <span className="font-mono text-[8px] text-gray-600 tracking-widest">ナルト</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #FF6B0040)" }} />
              </div>
              {/* English */}
              <p className="font-body text-[11px] text-gray-500 italic leading-relaxed">
                "When you give up, your dreams and everything else — they're gone."
              </p>
              <span className="font-mono text-[9px] text-[#FF6B00] tracking-wider mt-1 block" style={{ opacity: 0.6 }}>
                — Naruto Uzumaki
              </span>
            </motion.div>

          </motion.div>

          {/* ── RIGHT: 9 Konoha-style cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            {skillCategories.map((cat, i) => (
              <SkillCard
                key={cat.title}
                category={cat}
                element={ELEMENTS[i]}
                index={i}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
