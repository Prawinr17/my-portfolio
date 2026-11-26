import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, Code2, Layers } from "lucide-react";
import { projects } from "../data/portfolio";
import CharacterImage from "./CharacterImage";

const RANK_STYLES = {
  S: { bg: "#FF6B00", label: "S-RANK" },
  A: { bg: "#00FF88", label: "A-RANK" },
  B: { bg: "#4A9EFF", label: "B-RANK" },
};

const STATUS_STYLES = {
  LIVE:          { dot: "#00FF88", text: "#00FF88", border: "#00FF88" },
  "IN PROGRESS": { dot: "#FF6B00", text: "#FF6B00", border: "#FF6B00" },
  TODO:          { dot: "#6b7280", text: "#6b7280", border: "#6b7280" },
};

function RankBadge({ rank }) {
  const s = RANK_STYLES[rank] || RANK_STYLES.B;
  return (
    <span
      className="font-heading text-[9px] tracking-[0.25em] px-2.5 py-1 rounded-sm"
      style={{ backgroundColor: `${s.bg}22`, color: s.bg, border: `1px solid ${s.bg}50` }}
    >
      {s.label}
    </span>
  );
}

function StatusBadge({ status, statusLabel }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.TODO;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ border: `1px solid ${s.border}35`, background: `${s.border}10` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: s.text }}>
        {statusLabel || status}
      </span>
    </span>
  );
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ project, isInView, onOpen, slideIndex }) {
  const color = project.placeholder ? "#6b7280" : (project.color || "#FF6B00");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: slideIndex * 0.1 + 0.15 }}
      whileHover={project.placeholder ? {} : { y: -6, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-300 h-full flex flex-col"
        style={{
          background: "linear-gradient(160deg, #1c1710 0%, #141210 50%, #100e0e 100%)",
          borderColor: `${color}22`,
        }}
        onClick={() => !project.placeholder && onOpen(project)}
        role={project.placeholder ? undefined : "button"}
        tabIndex={project.placeholder ? undefined : 0}
        aria-label={project.placeholder ? undefined : `View details for ${project.title}`}
        onKeyDown={(e) => {
          if (!project.placeholder && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault(); onOpen(project);
          }
        }}
        onMouseEnter={(e) => {
          if (!project.placeholder)
            e.currentTarget.style.boxShadow = `0 8px 40px ${color}20, 0 0 0 1px ${color}30`;
        }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      >
        {/* ── Image banner ── */}
        <div className="relative h-28 sm:h-36 overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/40 to-transparent" />
          {/* Burnt edge at bottom of image */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(to right, ${color}55, ${color}22, ${color}44, ${color}11, ${color}66)`,
              maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4 Q10 0 20 4 Q30 8 40 4 Q50 0 60 4 Q70 8 80 4 Q90 0 100 4 Q110 8 120 4 Q130 0 140 4 Q150 8 160 4 Q170 0 180 4 Q190 8 200 4 L200 8 L0 8Z' fill='black'/%3E%3C/svg%3E\")",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* ── Card body ── */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
          {/* Rank + mission + status — clearly in body, not over image */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <RankBadge rank={project.rank} />
              <span className="font-mono text-[10px] text-gray-500 tracking-widest">
                {project.mission}
              </span>
            </div>
            <StatusBadge status={project.status} statusLabel={project.statusLabel} />
          </div>

          {/* Title + role */}
          <div>
            <h3 className="font-heading text-xl text-white tracking-wider leading-tight mb-0.5">
              {project.title}
            </h3>
            <p className="font-mono text-[10px] tracking-widest" style={{ color: `${color}99` }}>
              {project.role || project.summary}
            </p>
          </div>

          {/* Description — shown directly on card */}
          <p className="font-body text-xs text-gray-400 leading-relaxed line-clamp-3">
            {project.placeholder
              ? "Mission details sealed. Classification pending. Check back later."
              : project.description}
          </p>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(to right, transparent, ${color}30, transparent)` }}
          />

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 font-mono text-[10px] rounded-md"
                style={{ color, backgroundColor: `${color}0d`, border: `1px solid ${color}20` }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2.5 py-1 font-mono text-[10px] rounded-md text-gray-600 bg-white/5 border border-white/8">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-1">
            {project.placeholder ? (
              <span className="flex items-center gap-2 font-mono text-[10px] text-gray-600 tracking-widest italic">
                <Layers className="w-3.5 h-3.5" />
                Sealed Scroll — details coming soon
              </span>
            ) : (
              <motion.button
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 font-mono text-xs tracking-wider transition-colors duration-200 group/btn"
                style={{ color }}
                onClick={(e) => { e.stopPropagation(); onOpen(project); }}
                tabIndex={-1}
                aria-hidden="true"
              >
                View Mission Details
                <ChevronRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── DETAIL MODAL ──────────────────────────────────────────────────────────────
function DetailModal({ project, onClose }) {
  const color = project.color || "#FF6B00";
  const overlayRef = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    const closeBtn = overlayRef.current?.querySelector("[data-close]");
    closeBtn?.focus();

    function onKey(e) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab") {
        const els = overlayRef.current?.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!els?.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(6,6,6,0.92)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — mission details`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #1c1710 0%, #141210 50%, #100e0e 100%)",
          border: `1px solid ${color}28`,
          boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${color}18`,
        }}
      >
        {/* Hero image */}
        <div className="relative h-52 overflow-hidden rounded-t-2xl flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/50 to-transparent" />
          {/* Burnt bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(to right, ${color}66, ${color}22, ${color}55, ${color}11, ${color}77)`,
              maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4 Q10 0 20 4 Q30 8 40 4 Q50 0 60 4 Q70 8 80 4 Q90 0 100 4 Q110 8 120 4 Q130 0 140 4 Q150 8 160 4 Q170 0 180 4 Q190 8 200 4 L200 8 L0 8Z' fill='black'/%3E%3C/svg%3E\")",
              maskSize: "100% 100%",
            }}
          />
          {/* Close button — top right of image */}
          <button
            data-close
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm transition-all"
            aria-label="Close modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>
          {/* Rank + mission overlay on image */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <RankBadge rank={project.rank} />
            <span className="font-mono text-[10px] text-white/50 tracking-widest">{project.mission}</span>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          {/* Title + status */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wider leading-tight">
              {project.title}
            </h2>
            <StatusBadge status={project.status} statusLabel={project.statusLabel} />
          </div>

          {/* Role */}
          {project.role && (
            <p className="font-mono text-[10px] tracking-widest mb-4" style={{ color: `${color}88` }}>
              {project.role}
            </p>
          )}

          {/* Overview */}
          <section className="mb-5">
            <h4 className="font-heading text-[10px] tracking-[0.3em] mb-2" style={{ color }}>
              MISSION OVERVIEW
            </h4>
            <p className="font-body text-sm text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Key features / module breakdown */}
          {project.keyFeatures?.length > 0 && (
            <section className="mb-5">
              <h4 className="font-heading text-[10px] tracking-[0.3em] mb-3" style={{ color }}>
                MODULE BREAKDOWN
              </h4>
              <ul className="space-y-3">
                {project.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span
                      className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-body text-sm text-gray-300 leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Divider */}
          <div
            className="h-px w-full mb-5"
            style={{ background: `linear-gradient(to right, transparent, ${color}25, transparent)` }}
          />

          {/* Tech stack */}
          <section className="mb-5">
            <h4 className="font-heading text-[10px] tracking-[0.3em] mb-3" style={{ color }}>
              TECH STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 font-mono text-xs rounded-md"
                  style={{ color, backgroundColor: `${color}0d`, border: `1px solid ${color}28` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Links */}
          {(project.links?.live || project.links?.github) && (
            <div className="flex gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all"
                  style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}35` }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider text-gray-400 hover:text-white transition-all border border-white/10 hover:border-white/25"
                >
                  <Code2 className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const [activeProject, setActiveProject] = useState(null);
  const handleOpen = useCallback((p) => setActiveProject(p), []);
  const handleClose = useCallback(() => setActiveProject(null), []);

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const dragStartX = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const perPage = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, projects.length - perPage);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(maxIndex, c + 1)), [maxIndex]);
  useEffect(() => { setCurrent((c) => Math.min(c, maxIndex)); }, [maxIndex]);

  // Swipe
  const onDragStart = (e) => {
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };
  const onDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStartX.current - endX;
    if (Math.abs(delta) > 48) { delta > 0 ? next() : prev(); }
    dragStartX.current = null;
  };

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      <div className="absolute inset-0 diag-lines z-0" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
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
          {"// Chapter 04"}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 28, clipPath: "inset(100% 0 0 0)" }}
          animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide"
        >
          FEATURED MISSIONS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="font-body text-gray-500 mt-2 text-sm tracking-wide"
        >
          S-Rank through B-Rank missions completed in the field
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-[2px] w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
        />
      </motion.div>

      {/* Body */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* ── LEFT PANEL — Classified Dossier ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:flex flex-col self-center"
          >
            {/* Folder tab */}
            <div className="flex items-end ml-4">
              <div
                className="px-5 py-1.5 rounded-t-lg"
                style={{ background: "#1a1208", border: "1px solid #FF6B0030", borderBottom: "none" }}
              >
                <span className="font-mono text-[9px] text-[#FF6B00] tracking-[0.3em] uppercase">Mission Files</span>
              </div>
            </div>

            {/* Dossier body */}
            <div
              className="relative rounded-b-xl rounded-tr-xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #161208 0%, #0f0d08 60%, #0a0905 100%)",
                border: "1px solid #FF6B0025",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,107,0,0.08)",
              }}
            >
              {/* Diagonal CLASSIFIED watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ transform: "rotate(-25deg)" }}
              >
                <span
                  className="font-heading text-[5rem] tracking-[0.5em] whitespace-nowrap"
                  style={{ color: "#FF6B00", opacity: 0.04 }}
                >
                  機密
                </span>
              </div>

              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: "#FF6B0015", background: "rgba(255,107,0,0.03)" }}
              >
                <div className="flex items-center gap-2">
                  {/* Konoha seal small */}
                  <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                    <circle cx="25" cy="25" r="22" stroke="#FF6B00" strokeWidth="2" opacity="0.6"/>
                    <path d="M25 10C25 10 17 19 17 25c0 4.4 3.6 8 8 8s8-3.6 8-8C33 19 25 10 25 10Z" fill="#FF6B00" opacity="0.7"/>
                  </svg>
                  <span className="font-mono text-[10px] text-[#FF6B00] tracking-[0.25em]">KONOHA INTEL · REF #KI-{new Date().getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="font-mono text-[8px] text-[#00FF88] tracking-widest">ACTIVE</span>
                </div>
              </div>

              {/* Subject line */}
              <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: "#ffffff06" }}>
                <div className="font-mono text-[8px] text-gray-600 tracking-[0.3em] mb-1">SUBJECT</div>
                <div className="font-heading text-lg text-white tracking-widest">PRAVEEN R · MISSION RECORDS</div>
                <div className="font-mono text-[9px] text-gray-500 mt-0.5 tracking-wider">Software Engineer · Full Stack Developer</div>
              </div>

              {/* Mission list — redacted style */}
              <div className="px-5 py-3 space-y-1">
                <div className="font-mono text-[8px] text-gray-600 tracking-[0.3em] mb-2">MISSION LOG</div>
                {projects.filter(p => !p.placeholder).map((p, i) => {
                  const rankColor = p.rank === "S" ? "#FF6B00" : p.rank === "A" ? "#00FF88" : "#4A9EFF";
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.07 }}
                      onClick={() => onOpen(p)}
                      className="group flex items-center gap-2 py-1.5 cursor-pointer rounded-md px-2 -mx-2 transition-all duration-200"
                      onMouseEnter={e => { e.currentTarget.style.background = `${rankColor}12`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === "Enter") onOpen(p); }}
                    >
                      {/* Rank dot */}
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: rankColor, boxShadow: `0 0 4px ${rankColor}80` }}
                      />
                      {/* Rank label */}
                      <span
                        className="font-heading text-[8px] tracking-[0.2em] shrink-0 w-4"
                        style={{ color: rankColor }}
                      >
                        {p.rank}
                      </span>
                      {/* Mission number */}
                      <span className="font-mono text-[8px] text-gray-600 shrink-0 w-4">{p.missionNumber}</span>
                      {/* Title — always visible, hover highlights */}
                      <span
                        className="font-heading text-[11px] tracking-wide flex-1 truncate transition-colors duration-200"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                      >
                        {p.title}
                      </span>
                      {/* Summary — hidden, fades in on hover */}
                      <span
                        className="font-mono text-[7px] tracking-wider shrink-0 max-w-[80px] truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden xl:block"
                        style={{ color: `${rankColor}99` }}
                      >
                        {p.summary?.split(" ").slice(0, 3).join(" ")}
                      </span>
                      {/* Status dot */}
                      <span
                        className="w-1 h-1 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: p.status === "LIVE" ? "#00FF88" : "#FF6B00" }}
                      />
                      {/* Arrow */}
                      <span
                        className="font-mono text-[10px] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: rankColor }}
                      >›</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom wax seal + stats */}
              <div
                className="flex items-center justify-between px-5 py-3 mt-1 border-t"
                style={{ borderColor: "#FF6B0015", background: "rgba(255,107,0,0.02)" }}
              >
                {/* Wax seal SVG */}
                <div className="flex items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" fill="#FF6B00" opacity="0.12"/>
                    <circle cx="32" cy="32" r="24" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3"/>
                    {[0,45,90,135,180,225,270,315].map((d,i) => {
                      const r = d * Math.PI / 180;
                      return <polygon key={i} points={`${32+10*Math.cos(r)},${32+10*Math.sin(r)} ${32+16*Math.cos(r-0.3)},${32+16*Math.sin(r-0.3)} ${32+16*Math.cos(r+0.3)},${32+16*Math.sin(r+0.3)}`} fill="#FF6B00" opacity="0.35"/>;
                    })}
                    <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FF6B00" opacity="0.8" fontFamily="serif">忍</text>
                  </svg>
                  <div>
                    <div className="font-mono text-[8px] text-[#FF6B00] tracking-widest opacity-70">CERTIFIED</div>
                    <div className="font-mono text-[7px] text-gray-600 tracking-wider">HOKAGE OFFICE</div>
                  </div>
                </div>
                {/* Stats */}
                <div className="flex gap-4">
                  {[
                    { value: projects.filter(p => !p.placeholder).length, label: "TOTAL" },
                    { value: projects.filter(p => p.rank === "S").length, label: "S-RANK" },
                    { value: projects.filter(p => p.status === "LIVE").length, label: "LIVE" },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <span className="font-heading text-base text-[#FF6B00] block">{value}</span>
                      <span className="font-mono text-[7px] text-gray-600 tracking-widest">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: carousel ── */}
          <div className="lg:col-span-7 flex flex-col gap-5 min-w-0">

            {/* Top bar: label + chevrons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-heading text-xs text-[#FF6B00] tracking-[0.2em] sm:tracking-[0.3em] truncate">
                  S-RANK MISSIONS
                </span>
                <span className="font-mono text-[10px] text-gray-600 shrink-0">
                  {current * perPage + 1}–{Math.min(current * perPage + perPage, projects.length)} of {projects.length}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  aria-label="Previous projects"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)" }}
                  onMouseEnter={(e) => { if (current > 0) e.currentTarget.style.backgroundColor = "rgba(255,107,0,0.22)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,107,0,0.1)"; }}
                >
                  <ChevronLeft className="w-5 h-5 text-[#FF6B00]" />
                </button>
                <button
                  onClick={next}
                  disabled={current >= maxIndex}
                  aria-label="Next projects"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)" }}
                  onMouseEnter={(e) => { if (current < maxIndex) e.currentTarget.style.backgroundColor = "rgba(255,107,0,0.22)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,107,0,0.1)"; }}
                >
                  <ChevronRight className="w-5 h-5 text-[#FF6B00]" />
                </button>
              </div>
            </motion.div>

            {/* Carousel track */}
            <div
              className="overflow-hidden w-full"
              onMouseDown={onDragStart}
              onMouseUp={onDragEnd}
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
            >
              <motion.div
                className="flex"
                style={{ gap: "1.25rem" }}
                animate={prefersReducedMotion ? undefined : {
                  x: isMobile
                    ? `calc(-${current * 100}% - ${current * 1.25}rem)`
                    : `calc(-${current * 50}% - ${current * 0.625}rem)`
                }}
                transition={{ type: "spring", stiffness: 280, damping: 32 }}
              >
                {projects.map((project, i) => (
                  <div
                    key={project.title}
                    className="flex-shrink-0 w-full"
                    style={{ width: isMobile ? "100%" : "calc(50% - 0.625rem)" }}
                  >
                    <ProjectCard
                      project={project}
                      isInView={isInView}
                      onOpen={handleOpen}
                      slideIndex={i}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dot indicator */}
            <div className="flex justify-center gap-2" aria-hidden="true">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "1.75rem" : "0.5rem",
                    height: "0.375rem",
                    backgroundColor: i === current ? "#FF6B00" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeProject && (
          <DetailModal project={activeProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
