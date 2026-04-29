import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import ParticleField from "./ParticleField";
import CharacterImage from "./CharacterImage";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] h-[88vh] overflow-hidden bg-[#0a0a0a]"
    >
      <ParticleField />

      {/* ===== Subtle dark glow behind character ===== */}
      <div
        className="absolute right-0 top-0 w-[60%] h-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, #FF6B0018 0%, transparent 65%)",
        }}
      />

      {/* ===== SEAL SYMBOL + NARUTO IMAGE ===== */}
      <div className="absolute right-[2%] md:right-[5%] lg:right-[10%] xl:right-[15%] 2xl:right-[18%] top-[55%] -translate-y-1/2 z-[1] hidden md:flex items-center justify-center">
        {/* Eight Trigrams Seal — spinning behind Naruto */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <svg viewBox="0 0 500 500" fill="none" className="opacity-60 w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
            {/* Outer ring */}
            <circle cx="250" cy="250" r="235" stroke="#CC0000" strokeWidth="3" opacity="0.7" />
            <circle cx="250" cy="250" r="220" stroke="#CC0000" strokeWidth="2" opacity="0.5" />
            {/* Spiral */}
            <path d="M250 120 Q320 165 320 250 Q320 340 250 340 Q180 340 180 260 Q180 190 250 190 Q300 190 300 250 Q300 300 250 300 Q210 300 210 260 Q210 230 250 230" stroke="#CC0000" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />
            {/* 8 pointed spikes */}
            <path d="M250 15 L265 75 L250 55 L235 75 Z" fill="#CC0000" opacity="0.6" />
            <path d="M250 485 L265 425 L250 445 L235 425 Z" fill="#CC0000" opacity="0.6" />
            <path d="M15 250 L75 235 L55 250 L75 265 Z" fill="#CC0000" opacity="0.6" />
            <path d="M485 250 L425 235 L445 250 L425 265 Z" fill="#CC0000" opacity="0.6" />
            <path d="M80 80 L125 115 L105 110 L115 130 Z" fill="#CC0000" opacity="0.5" />
            <path d="M420 80 L375 115 L395 110 L385 130 Z" fill="#CC0000" opacity="0.5" />
            <path d="M80 420 L125 385 L105 390 L115 370 Z" fill="#CC0000" opacity="0.5" />
            <path d="M420 420 L375 385 L395 390 L385 370 Z" fill="#CC0000" opacity="0.5" />
            {/* Inner circles */}
            <circle cx="250" cy="250" r="175" stroke="#CC0000" strokeWidth="1.5" opacity="0.4" />
            <circle cx="250" cy="250" r="130" stroke="#CC0000" strokeWidth="2" opacity="0.3" />
            {/* Kanji seal marks */}
            <text x="250" y="50" textAnchor="middle" fontFamily="serif" fontSize="20" fill="#CC0000" opacity="0.6">封</text>
            <text x="250" y="468" textAnchor="middle" fontFamily="serif" fontSize="20" fill="#CC0000" opacity="0.6">印</text>
            <text x="40" y="258" textAnchor="middle" fontFamily="serif" fontSize="20" fill="#CC0000" opacity="0.6">忍</text>
            <text x="462" y="258" textAnchor="middle" fontFamily="serif" fontSize="20" fill="#CC0000" opacity="0.6">術</text>
          </svg>
        </motion.div>

        {/* Red glow behind */}
        <div className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-full bg-[#CC0000]/[0.12] blur-[70px]" />

        {/* Naruto image — on top of seal, wind animation */}
        <motion.div
          animate={{
            y: [0, -5, 0, -3, 0],
            skewX: [0, -0.5, 0, 0.4, 0],
            scaleX: [1, 1.006, 1, 0.996, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <CharacterImage
            src="/Naruto Hokage.png"
            alt="Praveen R — Frontend Developer hero illustration, Naruto Hokage theme"
            color="#FF6B00"
            className="h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[78vh] 2xl:h-[82vh] max-h-[680px] w-auto"
          />
        </motion.div>
      </div>

      {/* Wind streaks behind character */}
      <div className="absolute z-[1] hidden md:block pointer-events-none" style={{ right: "10%", top: "20%", width: "350px", height: "60%" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute h-px rounded-full"
            style={{
              top: `${8 + i * 14}%`,
              right: 0,
              width: `${50 + i * 15}px`,
              background: `linear-gradient(to left, transparent, ${i % 2 === 0 ? "#FF6B00" : "#ffffff"}${i % 2 === 0 ? "18" : "08"}, transparent)`,
            }}
            animate={{
              x: [0, -50, -100, -50, 0],
              opacity: [0, 0.7, 1, 0.5, 0],
              scaleX: [0.3, 1.3, 1, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* ===== Right edge vignette — fades character into black ===== */}
      <div
        className="absolute right-0 top-0 w-[200px] h-full z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, #0a0a0a 0%, transparent 100%)",
        }}
      />

      {/* ===== Bottom edge fade ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
        }}
      />

      {/* ===== LEFT CONTENT ===== */}
      <div className="relative z-[10] h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-full md:max-w-[55%] lg:max-w-[50%] min-w-[280px]">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="font-body text-xs text-gray-400 uppercase tracking-[0.15em]">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Big name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-7xl sm:text-8xl lg:text-[8rem] leading-[0.9] tracking-wider text-white"
            >
              PRAVEEN R
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-[#FF6B00] mt-2"
            >
              Frontend Developer
            </motion.h2>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="font-body text-base text-gray-400 mt-5 leading-relaxed max-w-md"
            >
              3+ years building high-performance React apps at Creators
              Infotek, Bengaluru. Specializing in real-time platforms,
              scalable UI systems, and pixel-perfect interfaces.
            </motion.p>

            {/* Two buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-4 mt-7"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 25px #FF6B0044",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF6B00] text-white font-body font-bold text-sm uppercase tracking-widest rounded-lg cursor-pointer"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#FF6B00]/40 text-[#FF6B00] font-body font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-[#FF6B00]/10 transition-colors cursor-pointer"
              >
                Get In Touch
              </motion.a>

              <motion.a
                href="/Praveen_R_Resume.pdf"
                download="Praveen_R_Resume.pdf"
                aria-label="Download Praveen R resume PDF"
                rel="noopener"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-gray-300 font-body font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </motion.div>

            {/* Naruto quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-7 pl-4 border-l-2 border-[#FF6B00]/40"
            >
              <p className="font-body text-sm text-gray-400 italic leading-relaxed">
                "I'm not gonna run away. I never go back on my word. That's my nindo — my ninja way!"
              </p>
              <span className="font-mono text-xs text-[#FF6B00] mt-1 block">— Naruto Uzumaki</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="font-body text-[10px] text-[#FF6B00] uppercase tracking-[0.3em]">
            Begin the Saga
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FF6B00]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
