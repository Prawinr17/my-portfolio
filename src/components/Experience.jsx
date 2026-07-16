import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, Shield } from "lucide-react";
import { experiences } from "../data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      {/* Large kanji watermark — left side, white */}
      <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.06 } : {}}
          transition={{ duration: 1 }}
          className="font-heading text-[16rem] sm:text-[22rem] text-white select-none leading-none block"
        >
          修行
        </motion.span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10 px-4"
      >
        <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
          {"// Chapter 03"}
        </span>
        <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide">
          My Saga
        </h2>
      </motion.div>

      {/* Arc tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center justify-center gap-3 mb-8 relative z-10 px-4"
      >
        {experiences.map((e, i) => (
          <button
            key={e.arcTitle}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-heading text-xs tracking-[0.15em] transition-all duration-300 cursor-pointer ${
              active === i
                ? "bg-[#FF6B00]/15 border-[#FF6B00]/50 text-[#FF6B00]"
                : "bg-white/[0.02] border-white/[0.08] text-gray-500 hover:text-gray-300 hover:border-white/20"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            ARC {String(e.arcNumber).padStart(2, "0")}
            {e.period.includes("Present") && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            )}
          </button>
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* ===== HORIZONTAL DOSSIER LAYOUT ===== */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* LEFT — Ninja Academy image (static) + role info overlay (animated text) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-0 overflow-hidden">
              {/* Academy bg image — static, never re-animates on arc switch */}
              <img
                src="/Hokageofc.png"
                alt="Praveen R — Software Engineer, Bengaluru"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay — static */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />

              {/* Content over image — only this text animates between arcs */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {/* Arc badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF6B00]/15 border border-[#FF6B00]/25 self-start mb-4">
                      <Shield className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span className="font-heading text-xs text-[#FF6B00] tracking-[0.15em]">
                        ARC {String(exp.arcNumber).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Company name big */}
                    <h3 className="font-heading text-3xl sm:text-4xl text-white tracking-wider mb-1">
                      {exp.company}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 font-body mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {exp.period}
                      </span>
                      <span className="text-gray-700">|</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Role + duration */}
                    <div>
                      <span className="font-body text-lg text-white font-semibold block">{exp.title}</span>
                      <span className="font-mono text-xs text-[#FF6B00]">🍥 {exp.duration} of training</span>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 font-mono text-[10px] rounded bg-[#FF6B00]/8 text-[#FF6B00]/70 border border-[#FF6B00]/12"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — Battle records / achievements list (static shell, animated text) */}
            <div className="lg:col-span-7 bg-[#0d0d14] p-6 sm:p-8 relative">
              {/* Scan texture — static */}
              <div className="absolute inset-0 scan-lines opacity-15 pointer-events-none" />

              {/* Section label — static */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-[#FF6B00]/30 to-transparent" />
                <span className="font-heading text-xs text-[#FF6B00] tracking-[0.2em]">BATTLE RECORDS</span>
                <div className="h-px flex-1 bg-gradient-to-l from-[#FF6B00]/30 to-transparent" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Achievement items — numbered */}
                  <ul className="space-y-4 relative z-10">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-4 group">
                        {/* Number circle */}
                        <div className="shrink-0 w-7 h-7 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center group-hover:bg-[#FF6B00]/20 group-hover:border-[#FF6B00]/40 transition-colors">
                          <span className="font-mono text-[10px] text-[#FF6B00]">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="font-body text-sm text-gray-300 leading-relaxed pt-0.5 group-hover:text-gray-200 transition-colors">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Quote at bottom — static */}
              <div className="mt-8 pt-5 border-t border-white/[0.04]">
                <p className="font-body text-sm text-gray-500 italic">
                  "A genius who ceases to make efforts is no longer a genius."
                </p>
                <span className="font-mono text-xs text-[#FF6B00] mt-1 block">— Naruto Uzumaki</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
