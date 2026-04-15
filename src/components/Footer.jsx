import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Link, Mail, MapPin, Phone } from "lucide-react";

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
import { contactInfo, navLinks } from "../data/portfolio";
import CharacterImage from "./CharacterImage";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      ref={ref}
      style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, #080808 100%)" }}
    >
      {/* BG image — dark scene */}
      <div className="absolute inset-0 z-0">
        <img
          src="/konaha image.png"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </div>

      {/* Hidden Leaf badge — center of footer, light overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.06 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none"
      >
        <img src="/leafvillage.png" alt="" className="w-[250px] h-auto" />
      </motion.div>

      {/* Naruto standing — left side */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={isInView ? { opacity: 0.35, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute left-[12%] bottom-0 z-[1] hidden lg:block pointer-events-none"
      >
        <CharacterImage
          src="/NARUTO-1.png"
          alt="Naruto"
          color="#FF6B00"
          className="h-[320px] w-auto"
        />
      </motion.div>

      {/* Naruto Hokage — right side */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={isInView ? { opacity: 0.3, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="absolute right-[12%] bottom-0 z-[1] hidden lg:block pointer-events-none"
      >
        <CharacterImage
          src="/footernaruto.png"
          alt="Naruto"
          color="#FF6B00"
          className="h-[280px] w-auto"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Column 1 — Logo + About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-1 mb-4">
              <span className="font-heading text-2xl tracking-wider text-white">
                {"< "}
                <span className="text-[#FF6B00]">Praveen</span>
                {" />"}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] ml-1 animate-blink" />
            </div>

            <p className="font-body text-sm text-gray-300 leading-relaxed mb-5 max-w-xs">
              Senior Frontend Developer building high-performance React applications.
              Always on a mission to create something legendary.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: GithubIcon, href: contactInfo.github, label: "GitHub" },
                { icon: Link,   href: contactInfo.linkedin, label: "LinkedIn" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-[#FF6B00] hover:border-[#FF6B00]/30 transition-all duration-300 cursor-pointer"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading text-lg text-white tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 group">
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <span className="font-body text-sm text-gray-300 group-hover:text-white transition-colors">{contactInfo.email}</span>
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <span className="font-body text-sm text-gray-300 group-hover:text-white transition-colors">{contactInfo.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span className="font-body text-sm text-gray-300">{contactInfo.location}</span>
              </div>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <Link className="w-4 h-4 text-[#FF6B00]" />
                <span className="font-body text-sm text-gray-300 group-hover:text-white transition-colors">LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Column 3 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-heading text-lg text-white tracking-wider mb-4">Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-body text-sm text-gray-300 hover:text-[#FF6B00] transition-colors text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="font-body text-xs text-gray-400 flex items-center gap-1.5">
            Designed & Developed by <span className="text-white font-semibold">Praveen R</span>
            <Heart className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
          </p>
          <p className="font-body text-xs text-gray-400">
            Built with React · Framer Motion · Passion
          </p>
          <p className="font-mono text-[10px] text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
