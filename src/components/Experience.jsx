import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, Shield } from "lucide-react";
import { careerRecord } from "../data/portfolio";

/* ─── Konoha SVG ─── */
function KonohaSymbol({ size = 60, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      <circle cx="30" cy="30" r="27" stroke="#FF6B00" strokeWidth="1.5" />
      <path d="M30 8C30 8 18 20 18 30c0 6.6 5.4 12 12 12s12-5.4 12-12C42 20 30 8 30 8Z" fill="#FF6B00" opacity="0.8"/>
      <path d="M30 15L30 38M24 26L36 26" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}


/* ─── Hexagonal rank pip ─── */
function HexPip({ rank, current }) {
  const color = rank === "JONIN" ? "#FF6B00" : "#00FF88";
  const label = rank === "JONIN" ? "上忍" : "中忍";
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
        <path d="M16 1L30 9v18L16 35 2 27V9L16 1Z" stroke={color} strokeWidth="1.5" fill={`${color}15`}/>
        <text x="16" y="22" textAnchor="middle" fontFamily="serif" fontSize="11" fill={color} opacity="0.9">{label}</text>
      </svg>
      <div>
        <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color }}>{rank}</div>
        {current && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
            <span className="font-mono text-[8px] text-gray-400 tracking-wider">ACTIVE</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Mission log line ─── */
function LogLine({ text, index, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="group flex gap-3 items-start py-3 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] -mx-4 px-4 transition-colors rounded"
    >
      {/* index number */}
      <div
        className="shrink-0 mt-0.5 w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold"
        style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="flex-1 font-body text-[15px] text-gray-200 leading-relaxed group-hover:text-white transition-colors">
        {text}
      </div>
    </motion.div>
  );
}

/* ─── Progress bar timeline ─── */
function TimelineBar({ assignments }) {
  // May 2023 → now = ~31 months; May 2026 = ~36 months from epoch
  const totalStart = new Date("2023-05-01");
  const totalEnd   = new Date();
  const totalMs    = totalEnd - totalStart;

  const getPercent = (from, to) => {
    const f = new Date(from) - totalStart;
    const t = (to === "Present" ? totalEnd : new Date(to)) - totalStart;
    return { left: (f / totalMs) * 100, width: ((t - f) / totalMs) * 100 };
  };

  const seg1 = getPercent("2023-05-01", "2026-05-01");
  const seg2 = getPercent("2026-05-01", "Present");

  return (
    <div className="relative">
      {/* Labels */}
      <div className="flex justify-between font-mono text-[9px] text-gray-500 mb-1.5 tracking-wider">
        <span>MAY 2023</span>
        <span>MAY 2026</span>
        <span>PRESENT</span>
      </div>
      {/* Track */}
      <div className="relative h-2 rounded-full bg-white/[0.05] overflow-hidden">
        {/* Seg 1 — Creators Infotek */}
        <motion.div
          className="absolute h-full rounded-l-full"
          style={{ left: `${seg1.left}%`, background: "linear-gradient(to right, #00FF8888, #00FF88)" }}
          initial={{ width: 0 }}
          animate={{ width: `${seg1.width}%` }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        />
        {/* Divider pip */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/50 z-10" style={{ left: `${seg1.left + seg1.width}%` }} />
        {/* Seg 2 — Svavvashaa */}
        <motion.div
          className="absolute h-full rounded-r-full"
          style={{ left: `${seg2.left}%`, background: "linear-gradient(to right, #FF6B00, #FF8C00)" }}
          initial={{ width: 0 }}
          animate={{ width: `${seg2.width}%` }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        />
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="font-body text-[11px] text-gray-400">Creators Infotek</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
          <span className="font-body text-[11px] text-gray-400">Svavvashaa Technologies</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(1); // 1 = Svvatech (current), shown first
  const { company, location, overallPeriod, overallDuration, designation, technologies, assignments } = careerRecord;
  const current = assignments[active];
  const accentColor = active === 0 ? "#00FF88" : "#FF6B00";

  return (
    <section
      id="experience"
      className="relative pt-16 sm:pt-20 pb-8 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      {/* BG texture */}
      <div className="absolute inset-0 diag-lines opacity-50 z-0 pointer-events-none" />

      {/* Giant kanji — decorative */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none z-0 overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.03 } : {}}
          transition={{ duration: 1.5 }}
          className="font-heading text-[22rem] text-white leading-none select-none"
        >
          忍
        </motion.span>
      </div>

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-12 px-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider"
        >
          {"// Chapter 03"}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 28, clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide"
        >
          SHINOBI CAREER ARCHIVE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="font-body text-gray-500 mt-2 text-sm tracking-widest uppercase"
        >
          Professional Experience · Career Progression · Mission Records
        </motion.p>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-[#FF6B00]/12"
          style={{ background: "linear-gradient(135deg,#0d0d16 0%,#080810 100%)" }}>

          {/* ══════════════════════════════════════════
              LEFT — Classified Identity Panel
          ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col border-r border-[#FF6B00]/10"
          >
            {/* ── IMAGE BLOCK — S-rank seal lives inside ── */}
            <div className="relative overflow-hidden" style={{ height: 200 }}>
              <img
                src="/Hokageofc.png"
                alt="Svavvashaa Technologies"
                className="w-full h-full object-cover object-center"
              />
              {/* Thin bottom fade only */}
              <div
                className="absolute bottom-0 left-0 right-0 h-10"
                style={{ background: "linear-gradient(to bottom, transparent, #0d0d16)" }}
              />
              {/* Naruto-themed S-Rank seal — bottom-right inside image */}
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  {/* Outer ring */}
                  <circle cx="36" cy="36" r="34" fill="rgba(0,0,0,0.65)" stroke="#FF6B00" strokeWidth="2"/>
                  {/* Dashed inner ring */}
                  <circle cx="36" cy="36" r="28" stroke="#FF6B00" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
                  {/* 8 spike triangles around edge */}
                  {[0,45,90,135,180,225,270,315].map((deg, i) => {
                    const r = Math.PI * deg / 180;
                    const x = 36 + 31 * Math.cos(r);
                    const y = 36 + 31 * Math.sin(r);
                    const lx = 36 + 25 * Math.cos(r - 0.22);
                    const ly = 36 + 25 * Math.sin(r - 0.22);
                    const rx2 = 36 + 25 * Math.cos(r + 0.22);
                    const ry2 = 36 + 25 * Math.sin(r + 0.22);
                    return <polygon key={i} points={`${x},${y} ${lx},${ly} ${rx2},${ry2}`} fill="#FF6B00" opacity="0.7"/>;
                  })}
                  {/* S letter — large, white, centered */}
                  <text x="36" y="47" textAnchor="middle" fontFamily="Bebas Neue,sans-serif" fontSize="34" fill="#ffffff" fontWeight="bold">S</text>
                  {/* RANK label below S */}
                  <text x="36" y="57" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#FF6B00" letterSpacing="2" opacity="1" fontWeight="bold">RANK</text>
                </svg>
              </div>
            </div>

            {/* ── DETAILS BELOW IMAGE — solid bg, fully readable ── */}
            <div className="flex-1 flex flex-col p-5 sm:p-6 gap-5" style={{ background: "#0d0d16" }}>
              {/* Company + role */}
              <div>
                <div className="font-mono text-[10px] text-[#FF6B00] tracking-[0.2em] mb-1 uppercase">Employer Record</div>
                <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wider leading-snug">
                  {company}
                </h3>
                <p className="font-body text-[#FF6B00] text-base font-bold mt-0.5">{designation}</p>
              </div>

              {/* Info rows */}
              <div className="space-y-2 font-body text-sm">
                <div className="flex items-center gap-2.5 text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                  <span>{overallPeriod}</span>
                  <span className="text-gray-400 text-xs ml-1">({overallDuration})</span>
                </div>
                <div className="flex items-center gap-2.5 text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                  <span>{location}</span>
                </div>
              </div>

              {/* Career timeline bar */}
              <div>
                <div className="font-mono text-[10px] text-gray-400 tracking-[0.15em] mb-2 uppercase">Service Timeline</div>
                <TimelineBar assignments={assignments} />
              </div>

              {/* Equipment */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="font-mono text-[10px] text-gray-400 tracking-[0.15em] mb-2.5 uppercase">Equipment</div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 font-body text-xs rounded border font-semibold"
                      style={{ color: "#FF8C33", borderColor: "#FF6B0030", background: "#FF6B0012" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════
              RIGHT — Mission Log Panel
          ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col"
          >
            {/* Assignment tabs — Svvatech first (index 1), Creators second (index 0) */}
            <div className="flex border-b border-[#FF6B00]/12 relative">
              {[...assignments].reverse().map((a, revI) => {
                const i = assignments.length - 1 - revI; // real index
                const tabColor = i === 0 ? "#00FF88" : "#FF6B00";
                const isActive = active === i;
                return (
                  <button
                    key={a.number}
                    onClick={() => setActive(i)}
                    className="relative flex-1 flex flex-col items-start gap-0.5 px-5 py-4 cursor-pointer transition-all duration-300 text-left"
                    style={{ background: isActive ? `${tabColor}08` : "transparent" }}
                  >
                    {/* Active top border */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      animate={{ background: isActive ? tabColor : "transparent" }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Assignment number + active dot */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="font-mono text-[10px] tracking-[0.2em]"
                        style={{ color: isActive ? tabColor : "#555" }}
                      >
                        ASSIGNMENT {a.number}
                      </span>
                      {a.current && (
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tabColor }} />
                      )}
                    </div>
                    {/* Company name — prominent */}
                    <span
                      className="font-heading text-base sm:text-lg tracking-wide leading-tight transition-colors duration-200"
                      style={{ color: isActive ? "#fff" : "#666" }}
                    >
                      {a.team}
                    </span>
                    {/* Role below */}
                    <span
                      className="font-body text-sm font-semibold transition-colors duration-200 mt-0.5"
                      style={{ color: isActive ? tabColor : "#444" }}
                    >
                      {a.title}
                    </span>
                    {/* Period */}
                    <span
                      className="font-body text-xs transition-colors duration-200 mt-0.5"
                      style={{ color: isActive ? "#aaa" : "#3a3a3a" }}
                    >
                      {a.period}
                    </span>

                    {/* Vertical divider between tabs */}
                    {i < assignments.length - 1 && (
                      <div className="absolute right-0 top-3 bottom-3 w-px bg-white/[0.05]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mission log body */}
            <div className="flex-1 p-5 sm:p-7 relative overflow-hidden">
              {/* Faint scan texture */}
              <div className="absolute inset-0 scan-lines opacity-10 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 h-full flex flex-col"
                >
                  {/* Mission header */}
                  <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-white/[0.05]">
                    <div>
                      <div
                        className="font-mono text-[10px] tracking-[0.2em] mb-1.5"
                        style={{ color: accentColor }}
                      >
                        MISSION BRIEFING · ASSIGNMENT {current.number}
                      </div>
                      <h3 className="font-heading text-3xl sm:text-4xl text-white tracking-wider">
                        {current.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 font-body text-sm">
                        <span className="font-semibold" style={{ color: accentColor }}>{current.team}</span>
                        <span className="text-gray-600">·</span>
                        <span className="flex items-center gap-1.5 text-gray-300">
                          <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
                          {current.period}
                        </span>
                      </div>
                    </div>
                    <HexPip rank={current.rank} current={current.current} />
                  </div>

                  {/* Log header bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: accentColor }}>
                      Battle Records
                    </span>
                    <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
                    <span className="font-mono text-[10px] text-gray-500">{current.records.length} entries</span>
                  </div>

                  {/* Log lines */}
                  <div className="flex-1 space-y-0">
                    {current.records.map((rec, i) => (
                      <LogLine key={i} text={rec} index={i} color={accentColor} />
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="font-body text-xs text-gray-400 tracking-wider">
                      Status: <span style={{ color: accentColor }}>{current.current ? "Ongoing" : "Completed"}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ background: i < (current.current ? 3 : 2) ? accentColor : "#2a2a2a" }}
                        />
                      ))}
                    </div>
                    <span className="font-body text-xs text-gray-400">
                      {current.duration}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom — internal transfer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-3 mb-2 flex items-center gap-3 px-2 justify-center"
        >
          <div className="h-px flex-1 bg-white/[0.04]" />
          <span className="font-mono text-[10px] text-gray-600 tracking-wider text-center leading-relaxed max-w-lg">
            Internal transfer in May 2026 — designation upgrade within the same organisation. Single continuous employment.
          </span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>

      </div>
    </section>
  );
}
