import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, ArrowRight, Shield } from "lucide-react";
import { experience } from "../data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const exp = experience;

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

      {/* Hidden Leaf Village symbol — right side, 3D float effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute right-8 sm:right-20 top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:block"
      >
        {/* Glow behind image */}
        <div className="absolute -inset-8 rounded-full bg-[#FF6B00]/[0.06] blur-[50px]" />

        {/* 3D float animation */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, -3, 0, 3, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: "800px" }}
        >
        
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 relative z-10 px-4"
      >
        <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
          {"// Chapter 03"}
        </span>
        <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide">
          My Saga
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* ===== HORIZONTAL DOSSIER LAYOUT ===== */}
        <div className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-white/[0.06]">

          {/* LEFT — Ninja Academy image + role info overlay */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative min-h-[300px] lg:min-h-0 overflow-hidden"
          >
            {/* Academy bg image */}
            <motion.img
              src="/Hokageofc.png"
              alt="Ninja Academy"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />

            {/* Content over image */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full">
              {/* Arc badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF6B00]/15 border border-[#FF6B00]/25 self-start mb-4"
              >
                <Shield className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="font-heading text-xs text-[#FF6B00] tracking-[0.15em]">ARC 01</span>
              </motion.div>

              {/* Company name big */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="font-heading text-3xl sm:text-4xl text-white tracking-wider mb-1"
              >
                {exp.company}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-3 text-sm text-gray-400 font-body mb-4"
              >
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                  {exp.period}
                </span>
                <span className="text-gray-700">|</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  {exp.location}
                </span>
              </motion.div>

              {/* Role + duration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                <span className="font-body text-lg text-white font-semibold block">{exp.title}</span>
                <span className="font-mono text-xs text-[#FF6B00]">🍥 {exp.duration} of training</span>
              </motion.div>

              {/* Tech tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-1.5 mt-4"
              >
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 font-mono text-[10px] rounded bg-[#FF6B00]/8 text-[#FF6B00]/70 border border-[#FF6B00]/12"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Battle records / achievements list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 bg-[#0d0d14] p-6 sm:p-8 relative"
          >
            {/* Scan texture */}
            <div className="absolute inset-0 scan-lines opacity-15 pointer-events-none" />

            {/* Section label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-[#FF6B00]/30 to-transparent" />
              <span className="font-heading text-xs text-[#FF6B00] tracking-[0.2em]">BATTLE RECORDS</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#FF6B00]/30 to-transparent" />
            </div>

            {/* Achievement items — numbered */}
            <ul className="space-y-4 relative z-10">
              {exp.description.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="flex gap-4 group"
                >
                  {/* Number circle */}
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center group-hover:bg-[#FF6B00]/20 group-hover:border-[#FF6B00]/40 transition-colors">
                    <span className="font-mono text-[10px] text-[#FF6B00]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="font-body text-sm text-gray-300 leading-relaxed pt-0.5 group-hover:text-gray-200 transition-colors">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* Quote at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="mt-8 pt-5 border-t border-white/[0.04]"
            >
              <p className="font-body text-sm text-gray-500 italic">
                "A genius who ceases to make efforts is no longer a genius."
              </p>
              <span className="font-mono text-xs text-[#FF6B00] mt-1 block">— Naruto Uzumaki</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
