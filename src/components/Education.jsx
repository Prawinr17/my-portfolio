import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import { education } from "../data/portfolio";

const subjects = ["Computer Science", "DBMS", "Operating Systems", "Networks", "Web Development"];

export default function Education() {
  const ref = useRef(null);
  const introRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const introInView = useInView(introRef, { once: true, amount: 0.4 });

  return (
    <section
      id="education"
      className="relative py-0 overflow-hidden"
      ref={ref}
    >
      {/* ===== BG IMAGE ===== */}
      <div ref={introRef} className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[65vh] overflow-hidden">
        <motion.img
          src="/Ninjaschool.png"
          alt="Ninja Academy"
          className="w-full h-full object-cover object-[50%_35%]"
          initial={{ scale: 1.1 }}
          animate={introInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.35) 55%, #0a0a0a 100%)",
          }}
        />

        {/* Chapter heading */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 backdrop-blur-sm font-heading text-sm text-[#FF6B00] tracking-[0.3em]">
              NINJA ACADEMY
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
              {"// Chapter 05"}
            </span>
            <h2 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white tracking-wider">
              THE ACADEMY
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={introInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-[2px] w-32 mx-auto mt-3 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 -mt-16 sm:-mt-20 pb-16 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Academy Record Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-[#0d0d14]/90 backdrop-blur-xl border border-[#FF6B00]/15 overflow-hidden"
          >
            {/* Card header bar */}
            <div className="px-6 py-3 border-b border-[#FF6B00]/10 bg-[#FF6B00]/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B00]/15 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
                </div>
                <span className="font-heading text-sm text-[#FF6B00] tracking-[0.2em]">
                  ACADEMY RECORD
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                <span className="font-mono text-[10px] text-[#00FF88] uppercase tracking-wider">
                  Graduated
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-12 gap-6">

                {/* Left — Degree info */}
                <div className="sm:col-span-7">
                  <span className="font-mono text-xs text-[#FF6B00] tracking-widest uppercase mb-2 block">
                    Degree
                  </span>
                  <h3 className="font-heading text-4xl sm:text-5xl text-white tracking-wider mb-1">
                    {education.degree}
                  </h3>
                  <p className="font-body text-lg text-[#FF6B00] font-semibold mb-5">
                    {education.institution}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-body mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                      {education.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                      {education.location}
                    </span>
                  </div>
                  <p className="font-body text-sm text-gray-400 leading-relaxed">
                    {education.description}
                  </p>
                </div>

                {/* Right — Jutsu studied (subjects) */}
                <div className="sm:col-span-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-[#FF6B00]" />
                    <span className="font-mono text-xs text-[#FF6B00] tracking-widest uppercase">
                      Jutsu Studied
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {subjects.map((subject, i) => (
                      <motion.li
                        key={subject}
                        initial={{ opacity: 0, x: 15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="flex items-center gap-3 group"
                      >
                        <span className="font-mono text-[10px] text-[#FF6B00]/50 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-body text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                          {subject}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
