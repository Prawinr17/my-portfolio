import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Link, Send } from "lucide-react";

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
import { contactInfo } from "../data/portfolio";

const infoCards = [
  { icon: Mail,   label: "Email",    value: contactInfo.email,              href: `mailto:${contactInfo.email}` },
  { icon: Phone,  label: "Phone",    value: contactInfo.phone,              href: `tel:${contactInfo.phone}` },
  { icon: MapPin, label: "Location", value: contactInfo.location },
  { icon: Link,   label: "LinkedIn", value: "linkedin.com/in/praveen-r",    href: contactInfo.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "github.com/praveen-r",        href: contactInfo.github, full: true },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  // Get your free key at web3forms.com → enter saiprawin0466@gmail.com → copy key
  const WEB3FORMS_KEY = "0a268a56-a3e0-4216-91af-d49a58721f15";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `⚡ New Mission Request from ${form.name}`,
          from_name: "Praveen Portfolio",
          replyto: form.email,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-18 overflow-hidden bg-[#0a0a0a]" ref={ref}>

      {/* Header + Quote — top center */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 relative z-10 px-4"
      >
        <span className="font-mono text-sm text-[#00FF88] mb-2 block tracking-wider">
          {"// Final Chapter"}
        </span>
        <h2 className="font-heading text-5xl sm:text-6xl text-white tracking-wide">
          Send a Jutsu
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="text-center mb-10 px-4"
      >
        <p className="font-body text-sm text-gray-400 italic max-w-md mx-auto">
          "When people have something important they want to protect, that's when they can become truly strong."
        </p>
        <span className="font-mono text-xs text-[#FF6B00] mt-1.5 block">— Naruto Uzumaki</span>
      </motion.div>

      {/* ===== TWO COLUMN: Image left | Form+details right ===== */}
      <div className="w-full px-0">
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/[0.06]">

          {/* LEFT — contact_us image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative min-h-[400px] lg:min-h-0 overflow-hidden"
          >
            <img
              src="/contact_us.jpg"
              alt="Contact Praveen R — Frontend Developer based in Bengaluru, India"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-[#0a0a0a]/30" />

            {/* Gradient fade into right side */}
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-transparent to-[#0d0d14]" />
            {/* Bottom fade for mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d0d14] to-transparent lg:hidden" />
          </motion.div>

          {/* RIGHT — details + form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#0d0d14] p-8 sm:p-12 flex flex-col justify-center"
          >
            {/* Contact info cards */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {infoCards.map((item, i) => {
                const CardContent = (
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-[#FF6B00]/25 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-[#FF6B00]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">{item.label}</div>
                      <div className="font-body text-xs text-gray-300 truncate">{item.value}</div>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className={`group ${item.full ? "col-span-2" : ""}`}
                  >
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {CardContent}
                      </a>
                    ) : CardContent}
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-mono text-[8px] text-gray-600 uppercase tracking-widest mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white font-body placeholder-gray-700 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[8px] text-gray-600 uppercase tracking-widest mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white font-body placeholder-gray-700 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[8px] text-gray-600 uppercase tracking-widest mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white font-body placeholder-gray-700 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors text-sm resize-none"
                  placeholder="Tell me about your mission..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 25px #FF6B0044" } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full py-3 bg-[#FF6B00] text-white font-heading text-base tracking-[0.2em] rounded-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              >
                {sent    && <span>✓ JUTSU SENT!</span>}
                {error   && <span>⚠ FAILED — TRY AGAIN</span>}
                {loading && <span>CHANNELLING CHAKRA...</span>}
                {!sent && !error && !loading && (
                  <>
                    <span>SEND JUTSU</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
