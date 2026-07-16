import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { projects } from "../data/portfolio";

function MissionCard({ project, index, isInView, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative cursor-pointer"
      onClick={() => onOpen(project, index)}
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-[#FF6B00]/30 transition-all duration-300 h-full flex flex-col"
        style={{ background: "linear-gradient(160deg, #14121c 0%, #0d0c12 100%)" }}
      >
        {/* Mission image — big scene */}
        <div className="relative h-[240px] overflow-hidden">
          <motion.img
            src={project.image}
            alt={`${project.title} — project by Praveen R, built with ${project.technologies.join(", ")}`}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 + index * 0.2 }}
          />

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c12] via-[#0d0c12]/30 to-transparent" />
          <div className="absolute inset-0 bg-[#0a0a0a]/20" />

          {/* Mission number — large watermark */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 + index * 0.2 }}
            className="absolute top-4 left-5 font-heading text-5xl leading-none tracking-wider"
            style={{ color: "#FF6B0020" }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          {/* Status badge on image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7 + index * 0.2 }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0a]/70 backdrop-blur-sm border border-[#00FF88]/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00FF88] uppercase tracking-wider">
              {project.status}
            </span>
          </motion.div>

          {/* Mission label bottom of image */}
          <div className="absolute bottom-3 left-5">
            <span className="font-heading text-[10px] text-[#FF6B00] tracking-[0.3em]">
              {project.mission}
            </span>
          </div>
        </div>

        {/* Content — below image */}
        <div className="relative p-5 pt-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-heading text-2xl text-white tracking-wider mb-2 group-hover:text-[#FF6B00] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>

          {/* Description — clamped to keep card heights even */}
          <p className="font-body text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3 min-h-[3.75rem]">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 font-mono text-[10px] rounded-md bg-[#FF6B00]/8 text-[#FF6B00]/80 border border-[#FF6B00]/12"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View details hint */}
          <span className="mt-4 self-start font-mono text-[10px] text-[#FF6B00]/60 group-hover:text-[#FF6B00] tracking-wider transition-colors duration-300">
            VIEW MISSION BRIEFING →
          </span>
        </div>

        {/* Orange bottom accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Hover glow */}
      <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-[#FF6B00]/6" />
    </motion.div>
  );
}

function MissionModal({ project, index, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#FF6B00]/25"
        style={{ background: "linear-gradient(160deg, #17141f 0%, #0b0a0f 100%)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close mission briefing"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-colors"
        >
          ✕
        </button>

        {/* Image header */}
        <div className="relative h-[220px] sm:h-[280px] overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={`${project.title} — project by Praveen R, built with ${project.technologies.join(", ")}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a0f] via-[#0b0a0f]/20 to-transparent" />

          <span
            className="absolute top-4 left-5 font-heading text-5xl leading-none tracking-wider"
            style={{ color: "#FF6B0025" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute top-4 right-16 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0a]/70 backdrop-blur-sm border border-[#00FF88]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00FF88] uppercase tracking-wider">
              {project.status}
            </span>
          </div>

          <div className="absolute bottom-4 left-5">
            <span className="font-heading text-[10px] text-[#FF6B00] tracking-[0.3em]">
              {project.mission} BRIEFING
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-7">
          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wider mb-4 leading-tight">
            {project.title}
          </h3>

          <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-2">
            <span className="font-mono text-[11px] text-[#FF6B00]/70 tracking-[0.2em] uppercase">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 font-mono text-xs rounded-md bg-[#FF6B00]/10 text-[#FF6B00]/90 border border-[#FF6B00]/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(null);

  const openMission = (project, index) => setActive({ project, index });
  const closeMission = () => setActive(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMission();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section
      id="projects"
      className="relative py-0 overflow-hidden"
      ref={ref}
    >
      {/* ===== BG IMAGE — projects section ===== */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] min-h-[380px] overflow-hidden">
        <motion.img
          src="/projects-section-background.png"
          alt="Praveen R — Projects portfolio section, React and full-stack work"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Overlay — light, image clearly visible */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.2) 70%, rgba(10,10,10,0.7) 100%)" }} />

        {/* Header on image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 backdrop-blur-sm font-heading text-sm text-[#FF6B00] tracking-[0.3em]">
              S-RANK MISSIONS
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
              {"// Chapter 04"}
            </span>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white tracking-wider">
              FEATURED MISSIONS
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-[2px] w-32 mx-auto mt-3 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* ===== CARDS — overlapping upward ===== */}
      <div className="relative z-20 -mt-16 sm:-mt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <MissionCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
              onOpen={openMission}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <MissionModal
            project={active.project}
            index={active.index}
            onClose={closeMission}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
