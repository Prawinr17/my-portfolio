import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "../data/portfolio";
import CharacterImage from "./CharacterImage";

/* Konoha / Hidden Leaf symbol */
function LeafSymbol({ size = 30, color = "#FF6B00", opacity = 0.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <circle cx="25" cy="25" r="22" stroke={color} strokeWidth="2" opacity={opacity} fill="none" />
      <path
        d="M25 8 C25 8 15 18 15 26 C15 31.5 19.5 36 25 36 C30.5 36 35 31.5 35 26 C35 18 25 8 25 8Z"
        fill={color}
        opacity={opacity * 0.8}
      />
      <path
        d="M25 14 L25 32 M20 22 L30 22"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* Red seal stamp */
function SealStamp({ className = "" }) {
  return (
    <svg width="45" height="45" viewBox="0 0 60 60" fill="none" className={className}>
      <circle cx="30" cy="30" r="26" fill="#CC0000" opacity="0.15" />
      <circle cx="30" cy="30" r="26" stroke="#CC0000" strokeWidth="2" opacity="0.4" />
      <circle cx="30" cy="30" r="20" stroke="#CC0000" strokeWidth="1" opacity="0.25" />
      <text x="30" y="34" textAnchor="middle" fontFamily="Bebas Neue" fontSize="14" fill="#CC0000" opacity="0.5">忍</text>
    </svg>
  );
}

function ScrollCard({ category, index, isInView }) {
  const baseDelay = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: baseDelay + 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      {/* Scroll / parchment card */}
      <div
        className="relative rounded-xl overflow-hidden border group-hover:border-[#FF6B00]/40 transition-all duration-300 h-full flex flex-col"
        style={{
          background: "linear-gradient(145deg, #1a1510 0%, #141210 40%, #111010 100%)",
          borderColor: `${category.color}20`,
        }}
      >
        {/* Parchment texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B00' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Burnt edge top — gradient */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(to right, ${category.color}88, ${category.color}33, ${category.color}66, ${category.color}22, ${category.color}77)`,
            maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3 Q10 0 20 3 Q30 6 40 3 Q50 0 60 3 Q70 6 80 3 Q90 0 100 3 Q110 6 120 3 Q130 0 140 3 Q150 6 160 3 Q170 0 180 3 Q190 6 200 3 L200 6 L0 6Z' fill='black'/%3E%3C/svg%3E\")",
            maskSize: "100% 100%",
          }}
        />

        <div className="relative z-10 p-5 flex-1">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ backgroundColor: `${category.color}12`, border: `1px solid ${category.color}25` }}
              >
                {category.emoji}
              </div>
              <div>
                <h3 className="font-heading text-lg text-white tracking-wider leading-none">
                  {category.title}
                </h3>
                <span className="font-body text-xs text-gray-400 uppercase tracking-wider">
                  {category.subtitle}
                </span>
              </div>
            </div>
            {/* Red seal */}
            <SealStamp />
          </div>

          {/* Ink splatter divider */}
          <div className="relative h-px mb-4">
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${category.color}30, transparent)` }} />
            {/* Ink dots */}
            <div className="absolute left-[20%] -top-0.5 w-1 h-1 rounded-full" style={{ backgroundColor: `${category.color}40` }} />
            <div className="absolute left-[60%] -top-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${category.color}25` }} />
            <div className="absolute right-[15%] -top-1 w-2 h-2 rounded-full" style={{ backgroundColor: `${category.color}15` }} />
          </div>

          {/* Skill tags — scroll-style */}
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.2,
                  delay: baseDelay + 0.4 + i * 0.03,
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                }}
                whileHover={{ scale: 1.06, transition: { duration: 0.12 } }}
                className="px-2.5 py-1 font-body text-[13px] font-medium rounded-md cursor-default transition-all duration-200"
                style={{
                  color: category.color,
                  backgroundColor: `${category.color}0a`,
                  border: `1px solid ${category.color}18`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${category.color}20`;
                  e.currentTarget.style.borderColor = `${category.color}50`;
                  e.currentTarget.style.boxShadow = `0 0 12px ${category.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${category.color}0a`;
                  e.currentTarget.style.borderColor = `${category.color}18`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Burnt edge bottom */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, ${category.color}44, ${category.color}11, ${category.color}33, ${category.color}11, ${category.color}55)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="relative py-14 sm:py-18 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      <div className="absolute inset-0 diag-lines z-0" />

      {/* Floating leaf decorations */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-[12%] opacity-25 hidden lg:block"
      >
        <LeafSymbol size={28} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-[6%] opacity-20 hidden lg:block"
      >
        <LeafSymbol size={22} />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-10 px-4"
      >
        <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
          {"// Chapter 02"}
        </span>
        <h2 className="font-heading text-5xl sm:text-6xl text-white tracking-wide">
          My Arsenal
        </h2>
        <p className="font-body text-gray-500 mt-2 text-sm tracking-wide">
          Jutsu mastered through years of ninja training
        </p>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-5 items-start">

          {/* LEFT: Naruto rasengan — bigger, fitted */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-10 -z-10 rounded-full bg-[#FF6B00]/[0.05] blur-[50px]" />
              <CharacterImage
                src="/rasengan.png"
                alt="Praveen R skills arsenal — React, TypeScript, .NET tech stack"
                color="#FF6B00"
                className="w-[320px] h-auto"
              />
            </div>
            <div className="mt-4 text-center max-w-[280px]">
              <p className="font-body text-sm text-gray-400 italic leading-relaxed">
                "I'm not gonna run away. I never go back on my word. That's my nindo!"
              </p>
              <span className="font-mono text-xs text-[#FF6B00] mt-1.5 block">— Naruto Uzumaki</span>
            </div>
          </motion.div>

          {/* RIGHT: Scroll cards — aligned grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 items-stretch">
            {skillCategories.map((cat, i) => (
              <ScrollCard
                key={cat.title}
                category={cat}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
