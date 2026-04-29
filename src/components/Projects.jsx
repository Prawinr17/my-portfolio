import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/portfolio";

function MissionCard({ project, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative"
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

          {/* Description */}
          <p className="font-body text-sm text-gray-400 leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 font-mono text-[10px] rounded-md bg-[#FF6B00]/8 text-[#FF6B00]/80 border border-[#FF6B00]/12"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Orange bottom accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Hover glow */}
      <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-[#FF6B00]/6" />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="relative py-0 overflow-hidden"
      ref={ref}
    >
      {/* ===== BG IMAGE — misson_bg ===== */}
      <div className="relative w-full h-[45vh] sm:h-[50vh] overflow-hidden">
        <motion.img
          src="/misson_bg.png"
          alt="Praveen R — Projects portfolio section, React and full-stack work"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Overlay — light, image clearly visible */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.2) 70%, rgba(10,10,10,0.7) 100%)" }} />

        {/* Header on image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
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
            <h2 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white tracking-wider">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
