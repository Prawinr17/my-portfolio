import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { MapPin, Zap, Target, Clock, Code2 } from "lucide-react";

function Counter({ target, suffix = "", isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v) + suffix);
  const ref = useRef(null);

  useEffect(() => {
    if (isInView) {
      animate(count, parseInt(target), { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { value: "3", suffix: "+", label: "Years" },
  { value: "5", suffix: "+", label: "Projects" },
  { value: "100", suffix: "%", label: "Passion" },
  { value: "3", suffix: "", label: "Platforms" },
];

const profileItems = [
  { icon: Zap, label: "Rank", value: "Senior Frontend Developer" },
  { icon: MapPin, label: "Village", value: "Bengaluru, India" },
  { icon: Clock, label: "Experience", value: "3+ Years of Battle" },
  { icon: Target, label: "Specialty", value: "React.js · TypeScript · Redux" },
  { icon: Code2, label: "Current Mission", value: "Creators Infotek" },
];

export default function About() {
  const ref = useRef(null);
  const introRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const introInView = useInView(introRef, { once: true, amount: 0.4 });

  return (
    <section
      id="about"
      className="relative py-0 overflow-hidden"
      ref={ref}
    >
      {/* ===== KONOHA BG IMAGE — Valley of the End ===== */}
      <div ref={introRef} className="relative w-full h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
        {/* Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={introInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/konaha image.png"
            alt="Praveen R — About section background, Valley of the End scene"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Dark overlay gradient — bottom fade into content */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, #0a0a0a 100%)",
          }}
        />

        {/* Chapter heading — overlaid on image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 backdrop-blur-sm font-heading text-sm text-[#FF6B00] tracking-[0.3em]">
              ORIGIN STORY
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
              {"// Chapter 01"}
            </span>
            <h2 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-white tracking-wider">
              MY STORY
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={introInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-[2px] w-32 mx-auto mt-3 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
            />
          </motion.div>
        </div>

        {/* Floating Konoha leaf symbols over the image */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] z-10 opacity-40"
        >
          <svg width="25" height="25" viewBox="0 0 50 50" fill="none">
            <path d="M25 8 C25 8 15 18 15 26 C15 31.5 19.5 36 25 36 C30.5 36 35 31.5 35 26 C35 18 25 8 25 8Z" fill="#FF6B00" opacity="0.8" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[12%] z-10 opacity-30"
        >
          <svg width="20" height="20" viewBox="0 0 50 50" fill="none">
            <path d="M25 8 C25 8 15 18 15 26 C15 31.5 19.5 36 25 36 C30.5 36 35 31.5 35 26 C35 18 25 8 25 8Z" fill="#FF6B00" opacity="0.8" />
          </svg>
        </motion.div>
      </div>

      {/* ===== CONTENT — overlaps upward into the image ===== */}
      <div className="relative z-20 -mt-24 sm:-mt-32 pb-16 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Ninja Profile Card — floating over the bg transition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-[#0d0d14]/90 backdrop-blur-xl border border-[#FF6B00]/15 overflow-hidden mb-8"
          >
            {/* Card header bar */}
            <div className="px-6 py-3 border-b border-[#FF6B00]/10 bg-[#FF6B00]/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B00]/15 flex items-center justify-center">
                  <span className="text-sm">🍥</span>
                </div>
                <span className="font-heading text-sm text-[#FF6B00] tracking-[0.2em]">
                  NINJA PROFILE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                <span className="font-mono text-[10px] text-[#00FF88] uppercase tracking-wider">Active</span>
              </div>
            </div>

            {/* Profile grid */}
            <div className="p-5 sm:p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {profileItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    whileHover={{ y: -2, borderColor: "#FF6B0040", transition: { duration: 0.15 } }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#FF6B00]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-body text-[11px] text-[#FF6B00] font-semibold uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <p className="font-body text-sm text-white font-medium leading-snug truncate">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio + Stats row */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-8 space-y-4"
            >
              <p className="font-body text-lg text-gray-200 leading-relaxed">
                I'm a <span className="text-[#FF6B00] font-bold">Senior Frontend Developer</span> with
                3+ years of experience building high-performance, real-time web applications.
                I specialize in crafting pixel-perfect UIs with <span className="text-[#FF6B00] font-semibold">React.js</span> and
                modern JavaScript ecosystems.
              </p>
              <p className="font-body text-base text-gray-400 leading-relaxed">
                At <span className="text-white font-semibold">Creators Infotek</span>, I architect
                scalable frontend solutions for complex enterprise platforms. My ninja way? Never
                stop learning, never stop building.
              </p>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-4 pl-4 border-l-2 border-[#FF6B00]/30"
              >
                <p className="font-body text-sm text-gray-500 italic">
                  "When people are protecting something truly special to them, they truly can become as strong as they can be."
                </p>
                <span className="font-mono text-xs text-[#FF6B00] mt-1 block">— Naruto Uzumaki</span>
              </motion.div>
            </motion.div>

            {/* Stats — vertical on right */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="p-4 rounded-xl bg-[#0d0d14]/80 border border-white/[0.06] hover:border-[#FF6B00]/25 transition-colors text-center"
                >
                  <div className="font-heading text-3xl text-[#FF6B00]">
                    <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </div>
                  <div className="font-body text-xs text-gray-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
