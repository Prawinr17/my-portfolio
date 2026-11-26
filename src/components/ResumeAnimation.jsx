import { useEffect, useRef, useState, useCallback } from "react";

// Only the running-RIGHT frames from Naruto Overworld (filtered by visual inspection)
const NARUTO_FRAMES = [
  "20_Asset_69.png","21_Asset_6.png","22_Asset_24.png","23_Asset_30.png",
  "24_Asset_18.png","25_Asset_37.png","27_Asset_49.png","29_Asset_33.png",
  "32_Asset_31.png","33_Asset_62.png","35_Asset_20.png","36_Asset_70.png",
  "38_Asset_65.png","39_Asset_22.png","40_Asset_21.png","41_Asset_67.png",
  "43_Asset_9.png","44_Asset_27.png","45_Asset_11.png","46_Asset_50.png",
  "47_Asset_39.png","50_Asset_58.png","51_Asset_17.png","53_Asset_51.png",
  "57_Asset_59.png","58_Asset_28.png","59_Asset_7.png","61_Asset_10.png",
  "62_Asset_29.png","63_Asset_19.png","64_Asset_53.png","66_Asset_64.png",
  "67_Asset_54.png","68_Asset_52.png","69_Asset_8.png","70_Asset_56.png",
  "71_Asset_68.png","72_Asset_71.png","73_Asset_43.png",
];

const NARUTO_PATH = "/Browser Games - Naruto Online - Recruitable Characters - Naruto Uzumaki (Goggles)/Naruto Uzumaki - Goggles (Overworld)/";

// Only the running-RIGHT frames from Sasuke Overworld (filtered by visual inspection)
const SASUKE_FRAMES = [
  "1_Asset_27.png","2_Asset_25.png","4_Asset_21.png","7_Asset_24.png",
  "10_Asset_18.png","11_Asset_11.png","14_Asset_13.png",
  "26_Asset_28.png","28_Asset_14.png","29_Asset_12.png",
  "31_Asset_23.png","32_Asset_19.png","33_Asset_20.png","34_Asset_30.png",
  "35_Asset_8.png","36_Asset_16.png","37_Asset_22.png",
];

const SASUKE_PATH = "/Sasuke Uchiha - Part 1 (Overworld)/";

const PHASE = { RUN: "run", CHARGE: "charge", CLASH: "clash", DOWNLOAD: "download" };

export default function ResumeAnimation({ onComplete }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const imagesRef = useRef({ naruto: [], sasuke: [], loaded: 0, total: NARUTO_FRAMES.length + SASUKE_FRAMES.length });
  const animRef = useRef(null);
  const [uiPhase, setUiPhase] = useState(PHASE.RUN);
  const [clashFlash, setClashFlash] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [scrollAnim, setScrollAnim] = useState(false);
  const downloadCalledRef = useRef(false);

  // Preload all sprite images
  useEffect(() => {
    const imgs = imagesRef.current;
    function onLoad() {
      imgs.loaded++;
    }
    NARUTO_FRAMES.forEach((f, i) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = NARUTO_PATH + f;
      imgs.naruto[i] = img;
    });
    SASUKE_FRAMES.forEach((f, i) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = SASUKE_PATH + f;
      imgs.sasuke[i] = img;
    });
  }, []);

  const triggerDownload = useCallback(() => {
    if (downloadCalledRef.current) return;
    downloadCalledRef.current = true;
    const a = document.createElement("a");
    a.href = "/Praveen_Resume.pdf";
    a.download = "Praveen_R_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowScroll(true);
    setTimeout(() => setScrollAnim(true), 60);
    setTimeout(() => onComplete(), 4000);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!stateRef.current) {
        stateRef.current = {
          phase: PHASE.RUN,
          narutoX: -80,
          narutoFrame: 0,
          narutoFrameMs: 0,
          sasukeX: canvas.width + 80,
          sasukeFrame: 0,
          sasukeFrameMs: 0,
          chargeProgress: 0,
          clashX: canvas.width / 2,
          clashTimer: 0,
          shakeX: 0,
          shakeY: 0,
          shakeFrames: 0,
          particles: [],
        };
      }
    }
    resize();
    window.addEventListener("resize", resize);

    const SPRITE_MS = 1000 / 12; // 12 fps sprite animation

    function spawnParticle(x, y, type) {
      const p = stateRef.current.particles;
      if (type === "ember") {
        p.push({ x, y, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2 - 0.5, life: 1, decay: 0.018, r: Math.random() * 3 + 1, color: `hsl(${20 + Math.random() * 30},100%,60%)` });
      } else if (type === "blue") {
        p.push({ x, y, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2 - 0.5, life: 1, decay: 0.018, r: Math.random() * 3 + 1, color: `hsl(${200 + Math.random() * 30},100%,65%)` });
      } else if (type === "debris") {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 14 + 4;
        p.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4, life: 1, decay: 0.022, r: Math.random() * 4 + 2, color: Math.random() > 0.5 ? "#FF6B00" : "#66aaff", gravity: 0.35 });
      }
    }

    function drawSprite(img, x, groundY, h, flipH) {
      if (!img || !img.complete || !img.naturalWidth) return;
      const aspect = img.naturalWidth / img.naturalHeight;
      const w = h * aspect;
      ctx.save();
      if (flipH) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -x - w / 2, groundY - h, w, h);
      } else {
        ctx.drawImage(img, x - w / 2, groundY - h, w, h);
      }
      ctx.restore();
    }

    function drawRasengan(x, y, t, progress) {
      const radius = 32 * progress;
      ctx.save();
      // Outer glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.2);
      grd.addColorStop(0, `rgba(100,210,255,${0.55 * progress})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2); ctx.fill();
      // Rotating dashed rings
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x, y, radius * (0.4 + i * 0.3), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140,220,255,${(0.9 - i * 0.2) * progress})`;
        ctx.lineWidth = 2.5 - i * 0.5;
        ctx.setLineDash([6, 5]);
        ctx.lineDashOffset = -(t / 150) * (i % 2 === 0 ? 1 : -1) * 30;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      // Bright core
      const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.5);
      core.addColorStop(0, `rgba(255,255,255,${progress})`);
      core.addColorStop(0.5, `rgba(100,220,255,${0.9 * progress})`);
      core.addColorStop(1, "transparent");
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    function drawChidori(x, y, t, progress) {
      const radius = 28 * progress;
      ctx.save();
      // Blue glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
      grd.addColorStop(0, `rgba(60,130,255,${0.5 * progress})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2); ctx.fill();
      // Lightning bolts
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (t / 300) * (i % 2 ? 1 : -1);
        const len = radius * (0.8 + Math.sin(t / 100 + i) * 0.3);
        ctx.beginPath();
        ctx.moveTo(x, y);
        const mx = x + Math.cos(angle) * len * 0.5 + (Math.random() - 0.5) * 10;
        const my = y + Math.sin(angle) * len * 0.5 + (Math.random() - 0.5) * 10;
        ctx.lineTo(mx, my);
        ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
        ctx.strokeStyle = `rgba(140,190,255,${(0.75 + Math.random() * 0.25) * progress})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }
      // Core
      const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.4);
      core.addColorStop(0, `rgba(255,255,255,${progress})`);
      core.addColorStop(0.5, `rgba(80,140,255,${0.9 * progress})`);
      core.addColorStop(1, "transparent");
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    function drawClashExplosion(cx, cy, t) {
      ctx.save();
      const r = t * 200;
      const alpha = Math.max(0, 1 - t);
      // Shockwave rings
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * (1 - i * 0.18), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,${i % 2 ? 160 : 80},0,${alpha * (1 - i * 0.22)})`;
        ctx.lineWidth = 4 - i * 0.8;
        ctx.stroke();
      }
      // Radial debris lines
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const len = r * 0.65;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 15, cy + Math.sin(angle) * 15);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx.strokeStyle = `rgba(${i % 3 === 0 ? "255,160,0" : i % 3 === 1 ? "100,180,255" : "255,255,200"},${alpha * 0.85})`;
        ctx.lineWidth = 2; ctx.stroke();
      }
      // Center kanji 忍
      const fontSize = Math.min(r * 0.55, 180);
      if (fontSize > 20) {
        ctx.font = `bold ${fontSize}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255,100,0,${alpha * 0.65})`;
        ctx.shadowColor = "#FF6B00";
        ctx.shadowBlur = 30 * alpha;
        ctx.fillText("忍", cx, cy);
      }
      ctx.restore();
    }

    let last = performance.now();

    function loop(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      const s = stateRef.current;
      if (!s) { animRef.current = requestAnimationFrame(loop); return; }

      const W = canvas.width;
      const H = canvas.height;
      const CHAR_H = Math.min(H * 0.44, 230);
      const GROUND_Y = H * 0.72;
      const RUN_SPEED = 4.0;

      // Advance sprite frames
      s.narutoFrameMs += dt;
      s.sasukeFrameMs += dt;
      if (s.narutoFrameMs >= SPRITE_MS) {
        s.narutoFrameMs -= SPRITE_MS;
        s.narutoFrame = (s.narutoFrame + 1) % NARUTO_FRAMES.length;
      }
      if (s.sasukeFrameMs >= SPRITE_MS) {
        s.sasukeFrameMs -= SPRITE_MS;
        s.sasukeFrame = (s.sasukeFrame + 1) % SASUKE_FRAMES.length;
      }

      // Phase transitions
      if (s.phase === PHASE.RUN) {
        s.narutoX += RUN_SPEED;
        s.sasukeX -= RUN_SPEED;
        if (s.narutoX > W * 0.28 && s.sasukeX < W * 0.72) {
          s.phase = PHASE.CHARGE;
          setUiPhase(PHASE.CHARGE);
        }
      } else if (s.phase === PHASE.CHARGE) {
        s.narutoX += RUN_SPEED * 0.35;
        s.sasukeX -= RUN_SPEED * 0.35;
        s.chargeProgress = Math.min(s.chargeProgress + dt / 1400, 1);
        // Particle aura
        if (Math.random() < 0.5) spawnParticle(s.narutoX + 20, GROUND_Y - CHAR_H * 0.5, "ember");
        if (Math.random() < 0.5) spawnParticle(s.sasukeX - 20, GROUND_Y - CHAR_H * 0.5, "blue");
        // Trigger clash when charged or very close
        if (s.chargeProgress >= 1 || s.sasukeX - s.narutoX < 70) {
          s.phase = PHASE.CLASH;
          s.clashX = (s.narutoX + s.sasukeX) / 2;
          s.clashTimer = 0;
          s.shakeFrames = 32;
          setUiPhase(PHASE.CLASH);
          setClashFlash(true);
          setTimeout(() => setClashFlash(false), 220);
          for (let i = 0; i < 50; i++) spawnParticle(s.clashX, GROUND_Y - CHAR_H * 0.55, "debris");
        }
      } else if (s.phase === PHASE.CLASH) {
        s.clashTimer += dt / 2200;
        s.narutoX -= RUN_SPEED * 0.25;
        s.sasukeX += RUN_SPEED * 0.25;
        if (s.clashTimer >= 1) {
          s.phase = PHASE.DOWNLOAD;
          setUiPhase(PHASE.DOWNLOAD);
          triggerDownload();
        }
      } else if (s.phase === PHASE.DOWNLOAD) {
        s.narutoX -= RUN_SPEED * 0.4;
        s.sasukeX += RUN_SPEED * 0.4;
      }

      // Screen shake
      if (s.shakeFrames > 0) {
        s.shakeFrames--;
        const intensity = s.shakeFrames / 32;
        s.shakeX = (Math.random() - 0.5) * 16 * intensity;
        s.shakeY = (Math.random() - 0.5) * 10 * intensity;
      } else {
        s.shakeX = 0; s.shakeY = 0;
      }

      // Update particles
      s.particles = s.particles.filter(p => p.life > 0);
      for (const p of s.particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.gravity) p.vy += p.gravity;
        p.life -= p.decay;
      }

      // === RENDER ===
      ctx.save();
      ctx.translate(s.shakeX, s.shakeY);

      // Background
      ctx.fillStyle = "#04040a";
      ctx.fillRect(-20, -20, W + 40, H + 40);

      // Subtle dark vignette from edges
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // Ground
      const groundGrad = ctx.createLinearGradient(0, GROUND_Y - 2, 0, GROUND_Y + 8);
      groundGrad.addColorStop(0, "rgba(255,107,0,0.6)");
      groundGrad.addColorStop(1, "transparent");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, GROUND_Y - 2, W, 10);

      // Speed lines (charge phase)
      if (s.phase === PHASE.CHARGE || s.phase === PHASE.CLASH) {
        for (let i = 0; i < 14; i++) {
          const y = H * 0.12 + (H * 0.68 / 14) * i;
          const len = 60 + Math.random() * 80;
          const alpha = 0.03 + Math.random() * 0.07;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(len, y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(W, y); ctx.lineTo(W - len, y); ctx.stroke();
        }
      }

      // Particles
      for (const p of s.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // Jutsu effects (charge phase)
      if (s.phase === PHASE.CHARGE) {
        const cp = s.chargeProgress;
        const jutsuY = GROUND_Y - CHAR_H * 0.58;
        drawRasengan(s.narutoX + 38, jutsuY, now, cp);
        drawChidori(s.sasukeX - 38, jutsuY, now, cp);
      }

      // Clash explosion
      if (s.phase === PHASE.CLASH) {
        drawClashExplosion(s.clashX, GROUND_Y - CHAR_H * 0.5, s.clashTimer);
      }

      // Draw Naruto (facing right, no flip)
      const nImg = imagesRef.current.naruto[s.narutoFrame];
      drawSprite(nImg, s.narutoX, GROUND_Y, CHAR_H, false);

      // Draw Sasuke (facing left, flipped)
      const sImg = imagesRef.current.sasuke[s.sasukeFrame];
      drawSprite(sImg, s.sasukeX, GROUND_Y, CHAR_H, true);

      // VS text during charge
      if (s.phase === PHASE.CHARGE && s.chargeProgress > 0.15) {
        const alpha = Math.min(1, (s.chargeProgress - 0.15) / 0.3);
        ctx.save();
        ctx.font = `bold ${70 * alpha}px sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255,80,0,${alpha * 0.9})`;
        ctx.shadowColor = "#FF6B00"; ctx.shadowBlur = 25 * alpha;
        ctx.fillText("VS", W / 2, H * 0.33);
        ctx.restore();
      }

      // Cinematic bars (top + bottom black strips)
      ctx.fillStyle = "#000";
      ctx.fillRect(-20, -20, W + 40, H * 0.085 + 20);
      ctx.fillRect(-20, H * 0.915, W + 40, H * 0.09 + 20);

      ctx.restore();

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [triggerDownload]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* White flash on clash */}
      {clashFlash && (
        <div className="absolute inset-0 z-10 bg-white pointer-events-none" />
      )}

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Skip */}
      <button
        onClick={triggerDownload}
        className="absolute top-6 right-6 z-20 font-mono text-xs text-white/50 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded transition-colors"
        style={{ letterSpacing: "0.15em" }}
      >
        SKIP
      </button>

      {/* Phase label */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 font-mono text-center pointer-events-none select-none">
        {uiPhase === PHASE.RUN && (
          <span className="text-[#FF6B00] text-xs tracking-[0.3em] uppercase animate-pulse">Approaching...</span>
        )}
        {uiPhase === PHASE.CHARGE && (
          <span className="text-white text-sm tracking-[0.4em] uppercase" style={{ textShadow: "0 0 20px #FF6B00" }}>
            Chakra Charging...
          </span>
        )}
        {uiPhase === PHASE.CLASH && (
          <span className="text-yellow-300 text-lg font-bold tracking-[0.5em] uppercase" style={{ textShadow: "0 0 30px #ffcc00" }}>
            CLASH!
          </span>
        )}
        {uiPhase === PHASE.DOWNLOAD && (
          <span className="text-[#00FF88] text-sm tracking-[0.3em] uppercase animate-pulse">
            Downloading Resume...
          </span>
        )}
      </div>

      {/* Mission scroll overlay */}
      {showScroll && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.78)", opacity: scrollAnim ? 1 : 0, transition: "opacity 0.5s" }}
        >
          <div
            style={{
              width: "min(500px, 88vw)",
              background: "linear-gradient(155deg,#2c1b08,#1a1005,#2c1b08)",
              border: "2px solid #8B6914",
              borderRadius: "4px",
              padding: "36px 44px",
              boxShadow: "0 0 60px rgba(255,107,0,0.3), inset 0 0 40px rgba(0,0,0,0.5)",
              transform: scrollAnim ? "scale(1)" : "scale(0.8)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="text-center mb-4">
              <svg viewBox="0 0 80 80" width="52" height="52" style={{ display: "inline-block" }}>
                <circle cx="40" cy="40" r="36" stroke="#8B6914" strokeWidth="2" fill="none" />
                <circle cx="40" cy="40" r="27" stroke="#8B6914" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M40 10 L44 24 L40 20 L36 24 Z" fill="#8B6914" opacity="0.8" />
                <path d="M40 70 L44 56 L40 60 L36 56 Z" fill="#8B6914" opacity="0.8" />
                <path d="M10 40 L24 36 L20 40 L24 44 Z" fill="#8B6914" opacity="0.8" />
                <path d="M70 40 L56 36 L60 40 L56 44 Z" fill="#8B6914" opacity="0.8" />
                <text x="40" y="45" textAnchor="middle" fontFamily="serif" fontSize="18" fill="#8B6914">忍</text>
              </svg>
            </div>
            <div className="text-center mb-3">
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#8B6914", letterSpacing: "0.4em" }}>
                KONOHAGAKURE · PERSONNEL FILE
              </span>
            </div>
            <div style={{ borderTop: "1px solid #8B691440", borderBottom: "1px solid #8B691440", padding: "18px 0", margin: "10px 0", textAlign: "center" }}>
              <div style={{ fontFamily: "serif", fontSize: "24px", color: "#FFD700", letterSpacing: "0.1em", marginBottom: "4px" }}>PRAVEEN R</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#aaa", letterSpacing: "0.3em" }}>RANK: SOFTWARE ENGINEER · CLASS A</div>
            </div>
            <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: "12px", color: "#00FF88", letterSpacing: "0.2em", marginBottom: "14px" }}>
              ✓ RESUME UNSEALED & DOWNLOADED
            </div>
            <div style={{ textAlign: "center", fontSize: "10px", color: "#555", fontFamily: "monospace", letterSpacing: "0.1em" }}>
              Closing in a moment...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
