import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import {
  skillCategories, careerRecord, projects,
  education, certificates, contactInfo,
} from "../data/portfolio";

// ─── Response Engine ────────────────────────────────────────────────────────
function buildResponse(input) {
  const msg = input.toLowerCase().trim();
  const has = (...words) => words.some((w) => msg.includes(w));

  // Greeting — use word-boundary regex for short words to avoid false matches
  // e.g. "his" contains "hi", "your" contains "yo", "they" contains "hey"
  if (/\b(hi|hey|yo|sup)\b/.test(msg) || has("hello", "namaste", "howdy", "dattebayo")) {
    return "Dattebayo! 🍥 I'm Praveen's personal ninja assistant!\n\nI can tell you about:\n• Skills & tech stack 🥷\n• Work experience ⚔️\n• Projects & missions 🎯\n• Education & certs 📜\n• How to contact him 📬\n\nWhat would you like to discover? Believe it! 💪";
  }

  // About / Who
  if (has("who", "about", "yourself", "introduce", "praveen", "tell me", "summary", "profile")) {
    return "🥷 Praveen R — Full Stack Developer\n\n📍 Bengaluru, India\n🏢 Software Engineer @ Svavvashaa Technologies Pvt Ltd\n⚡ 3+ years building high-performance React apps\n🎯 Specialises in real-time platforms & scalable UI\n\nHis ninja way? Never stop learning, never stop building! 🔥";
  }

  // ── Personal Interests ───────────────────────────────────────────────────

  // Sports
  if (has("sport", "football", "cricket", "isl", "soccer", "field", "match", "kabaddi", "volleyball", "basketball", "play cricket", "play football")) {
    return "⚽ Praveen didn't just watch sports — he PLAYED them all:\n\n⚽ Football — his biggest passion. Genuinely dreamed of playing in the ISL (Indian Super League)\n🏏 Cricket — all-rounder on the pitch\n🏀 Basketball — actually played for his school team!\n🏐 Volleyball — yes, this too\n🤼 Kabaddi — proud Gen Z Tamilian, obviously\n\nThe ISL dream broke.\nBut that competitive fire? It went straight into his code. 🔥\n\nSame intensity. Different arena. 💪";
  }

  // Movies / Series
  if (has("movie", "film", "interstellar", "series", "dark", "netflix", "cinema", "show", "watch", "webseries", "tamil movie", "hollywood")) {
    return "🎬 Praveen's Screen Picks — no filters, no restrictions:\n\n🌌 Sci-Fi: Interstellar (all-time favourite — space + emotion = perfection)\n⏳ Series: Dark — German time-travel thriller, mind absolutely shattered\n🎥 Hollywood: Yes, everything\n🎬 Tamil Movies: Obviously — proud Tamilian\n💥 Action, Drama, 18+ series — he watches it all\n\nIf the storytelling is good, he's in. No genre gatekeeping. 🔥\n\n\"Do not go gentle into that good night.\" 🌌";
  }

  // Space / Astrophile
  if (has("space", "star", "galaxy", "black hole", "cosmos", "cosmic", "astroph", "universe", "neutron", "astro", "telescope", "nebula", "dark matter")) {
    return "🌌 Astrophile Mode: ON\n\nPraveen is genuinely fascinated by space — not just casually:\n\n⭐ Stars & stellar evolution\n🌀 Galaxies & cosmic structure\n⚫ Black Holes — the ultimate mystery\n💫 Neutron Stars — matter at its most extreme\n☄️ Cosmic rays & the scale of the universe\n\nAsk him about black holes at 2am and he'll give you a 2-hour monologue — cigarette in hand, balcony view, actual stars above. 🚬🌃\n\nSpace is the one thing that makes him feel both tiny and infinite at the same time. ✨";
  }

  // History / Geopolitics
  if (has("history", "histor", "geopolit", "politic", "tamilan", "tamil", "ancient", "civilization", "civiliz", "empire", "war history", "world history")) {
    return "📚 History & Geopolitics — Praveen Goes Deep:\n\n🏛️ Tamil History — proud Tamilian, knows his roots and culture deeply\n🌍 World History — ancient civilizations to the modern era\n🗺️ Geopolitics — borders, power, people, and how it all connects\n🏛️ Politics — understands the game, not just the players\n\nThe kind of person who starts watching a history documentary at midnight and surfaces at 4am with a completely different worldview.\n\nHistory isn't just the past — it's the source code of civilization. ⚡";
  }

  // Anime
  if (has("anime", "aot", "attack on titan", "vinland", "eren", "thorfinn", "manga")) {
    return "🔥 Praveen's Anime Holy Trinity:\n\n🍥 Naruto — The OG. The Hokage dream is very real.\n⚔️ Attack on Titan — Survey Corps grit. No walls can stop him.\n🪓 Vinland Saga — Thorfinn's arc: revenge → purpose → peace.\n\nFavorite Characters:\nNaruto 🍥 | Eren Yeager ⚡ | Thorfinn 🪓\n\nAll three refused to be broken by the world. So does he. 💪";
  }

  // Music
  if (has("music", "song", "listen", "playlist", "zimmer", "weeknd", "weekend", "artist", "genre", "soundtrack")) {
    return "🎵 Praveen's Soundtrack:\n\n🎼 Hans Zimmer — Epic orchestral fire (that Interstellar OST hits different at 2am 🌌)\n🎤 The Weeknd — Cinematic, smooth, no skip ever.\n🎧 Genre? ALL of them — no restrictions, pure vibe.\n\nPerfect midnight coding fuel for a certified night owl! 🦇⚡";
  }

  // Food
  if (has("food", "eat", "hungry", "chicken", "cuisine", "dish", "meal", "cook", "favourite food", "favorite food", "lunch", "dinner")) {
    return "🍗 The answer is always CHICKEN.\n\nBreakfast? 🍗 Chicken.\nLunch? 🍗 Chicken.\nDinner? 🍗 Chicken.\n2am after coding? 🍗 Still chicken.\n\nThe man is consistent — just like his code. 🔥\n\nThe ultimate full-stack meal. Works any time, any place.";
  }

  // Gaming / Hobbies
  if (has("game", "gaming", "gamer", "hobby", "hobbies", "free time", "vibe cod", "spare time", "leisure", "off duty")) {
    return "🎮 Praveen's Off-Duty Mode:\n\n🎮 Gaming — controller in hand, no hesitation\n💻 Vibe Coding — coding at midnight with Hans Zimmer playing in the background 🎼\n⚽ Football & Cricket — still on the field\n📚 Reading? Zero patience — he learns by DOING, not reading\n\nBatman mode activated: works best in the dark, alone, on a mission. 🦇";
  }

  // Night owl / Batman
  if (has("batman", "night owl", "midnight", "morning person", "sleep schedule", "night person", "dark knight")) {
    return "🦇 In one word? BATMAN.\n\n🌙 Night Owl — completely comes alive after dark\n💡 Best ideas always hit at midnight or later\n🚬 That guy sitting on the balcony at 2am, city lights below, stars above, deep in thought\n\n\"The night is darkest just before the dawn.\"\n\nAnd that's exactly when he ships. ⚡";
  }

  // Personality
  if (has("personality", "introvert", "extrovert", "character", "vibe", "nature", "social", "what type", "what kind", "who is he", "what is he like", "about him", "personal")) {
    return "🧠 Praveen — The Real Person:\n\n🌍 Gen Z from Tamil Nadu — proud Tamilian\n🤝 Extrovert, but not all the time — social when it counts, solo when building\n🌙 Certified Night Owl — mind runs at full speed after dark\n🌌 Astrophile — obsessed with space, black holes, the cosmos\n📚 History & geopolitics nerd — Tamil history to world civilizations\n💭 Deep thinker who feels things deeply but keeps moving\n❤️ Single, living life at full speed\n\nDreams of a top-floor 2BHK in Bengaluru — balcony at night, city lights, stars above. That's the vision. 🌆\n\nNot average. Never staying average. ⚡";
  }

  // Dream / Goal / What drives
  if (has("dream", "goal", "ambition", "future", "drive", "motivat", "aspir", "vision", "inspire", "what drives", "moto", "motto", "mantra")) {
    return "🎯 Praveen's Ninja Way:\n\n\"To be better than tomorrow.\"\n\nNot racing others — racing a better version of himself. Every single day.\n\nFrom football fields dreaming of the ISL ⚽\n→ to building React apps and AI tools in Bengaluru 💻\n\nHe pivots. He adapts. He climbs.\n\nThe dream: top-floor apartment, Bengaluru skyline, balcony at night, stars overhead — building something legendary. 🌆✨\n\nBelieve it! 🍥💪";
  }

  // Fun fact
  if (has("fun fact", "interesting", "quirky", "secret", "surprise", "real story", "tell me something", "besides work", "isl", "football dream")) {
    return "⚡ The Fun Fact That Hits Different:\n\nPraveen genuinely trained to play professional football — the ISL dream was real. ⚽\n\nThat dream broke.\n\nBut instead of stopping, his mind found a new universe to build. 💻\n\nHis personality is still built like a player:\n• Curious & competitive 🎯\n• Feels deeply, keeps moving 💪\n• Observant, always improving 🔍\n• Never settles for average 🔥\n\nSame fire. Different arena.\nFrom the football pitch → to frontend architecture. ⚡";
  }

  // General likes / interests (must come AFTER specific checks)
  if (has("what he like", "what does he like", "his interest", "apart from coding", "outside work", "besides coding", "personal life", "off duty", "leisure", "non tech")) {
    return "🔥 Praveen Beyond The Code:\n\n⚽ Sports — Football, Cricket, Kabaddi, Volleyball, Basketball (school team!)\n🌌 Space — astrophile, obsessed with black holes & the cosmos\n📚 History & Geopolitics — Tamil history to world civilizations\n🎬 Movies — Hollywood + Tamil, all genres, no filters\n🎮 Gaming + Vibe Coding at midnight 💻\n🎵 Hans Zimmer + The Weeknd (all types really)\n🍗 Chicken. Always chicken.\n🌙 Late nights, deep thoughts, city lights + stars\n\nA Gen Z Tamilian with a Hokage dream and a balcony view. 🦇🍥\n\nAsk me about any of these — I've got the full story! ⚡";
  }

  // ── Professional / Recruiter ─────────────────────────────────────────────

  // Resume / CV
  if (has("resume", "cv", "download", "pdf")) {
    return "📄 Praveen's Resume:\n\nHit the Resume button in the Hero section to download it instantly! 📥\n\nCovers his 3+ years across Creators Infotek and Svavvashaa Technologies, full tech stack, all projects, education, and certifications.\n\nA scroll worth reading! 🥷";
  }

  // Availability / Notice period
  if (has("available", "notice", "when can", "join", "start date", "currently", "looking", "open to work", "actively")) {
    return "💼 Current Status:\n\n🟡 Employed @ Svavvashaa Technologies Pvt Ltd\n🔍 Actively looking for the right opportunity\n\n⏱️ Notice Period: 30 Days\n✅ Can join within a month of an offer\n\nIf you've got the right mission — send that jutsu! 🎯";
  }

  // Remote / Location / Relocation
  if (has("remote", "work from home", "wfh", "hybrid", "onsite", "on-site", "relocate", "relocation", "work mode")) {
    return "🏢 Work Preferences:\n\n🥇 Preferred: On-site or Hybrid\n✅ Open to: Full remote if needed\n\n📍 Base: Bengaluru (loves it here)\n🏙️ Open to relocate: Bengaluru or Chennai\n\nFlexible — the right mission matters more than the map! ⚡";
  }

  // Freelance / Contract
  if (has("freelance", "contract", "part time", "part-time", "gig")) {
    return "💼 Freelance?\n\nPraveen's primary goal is a full-time role.\n\nBut if the project is interesting enough? Open to exploring it! 🤔\n\nHe's never freelanced before — but a good challenge never stopped a shinobi! 🥷⚡";
  }

  // Role type
  if (has("fullstack", "full stack", "full-stack", "frontend only", "what role", "kind of role", "role type", "open to roles")) {
    return "👨‍💻 Role Preference:\n\n🎯 Primary: Frontend (React.js specialist)\n⚡ Open to: Full Stack — but ONLY React + .NET stack\n\nMost dangerous with:\n• React / Next.js → Frontend\n• .NET → Backend\n\nNot a generalist — a specialist who goes deep. 🥷";
  }

  // Company / Domain preference
  if (has("startup", "company size", "big tech", "corporate", "mnc", "domain", "industry", "sector", "what company", "prefer company")) {
    return "🏢 Company Preference:\n\nAny size — startup to enterprise, doesn't matter!\n\n📌 Domain? Open to anything. He's built for:\n• Real Estate platforms 🏠\n• Healthcare portals 🏥\n• AI tooling 🤖\n• Enterprise systems ⚙️\n\nGive him a problem worth solving. He'll figure out the rest! 🎯";
  }

  // GitHub profile
  if (has("github", "git profile", "repository", "repo", "your code", "source code")) {
    return "🐙 GitHub Profile:\n\ngithub.com/Prawinpinto\n\nReal production-grade code — not just tutorial projects! 💻⚡\n\nYou can also find the link in the Contact section below. 👇";
  }

  // Skills — specific tech
  if (has("react")) {
    return "⚛️ React.js is Praveen's primary jutsu!\n\n3+ years building production apps with:\n• React.js & Next.js (SSR/SSG)\n• Redux & Zustand — state mastery\n• TypeScript — type-safe ninjutsu\n• SignalR — real-time chakra flow\n\nFrom healthcare portals to real-estate platforms — React is his weapon of choice! 🔥";
  }
  if (has("next", "nextjs", "ssr", "ssg")) {
    return "⚡ Next.js Ninjutsu!\n\nPraveen builds with Next.js for:\n• SSR & SSG performance boosts\n• SEO-optimised pages\n• Full-stack capability\n\nPart of his core frontend arsenal! 🥷";
  }
  if (has("typescript", "ts")) {
    return "📘 TypeScript — Praveen's precision blade!\n\nUsed across all major projects for type safety, better DX, and catching bugs before they strike. True shinobi discipline! ⚔️";
  }
  if (has("signalr", "real-time", "realtime", "websocket")) {
    return "⚡ SignalR — Real-time Chakra!\n\nPraveen integrated SignalR for:\n• Live contract tracking (Real Estate platform)\n• Real-time data in Healthcare portals\n• Multi-portal live sync\n\nLive data flows like chakra through his apps! 🌀";
  }

  // Skills — all
  if (has("skill", "tech", "stack", "language", "framework", "tools", "arsenal", "know", "use", "frontend", "backend",
          "good at", "goot", "great at", "best at", "expert", "excel", "capable", "speciali", "what he", "what can he")) {
    const cats = skillCategories
      .map((c) => `${c.title} — ${c.subtitle}:\n${c.skills.slice(0, 6).join(", ")}${c.skills.length > 6 ? "..." : ""}`)
      .join("\n\n");
    return `⚡ Praveen's Full Ninja Arsenal:\n\n${cats}\n\nA true shinobi of modern web development! 🎯`;
  }

  // Experience
  if (has("experience", "work", "job", "career", "company", "creator", "infotek", "svavvashaa", "svavvashaa technologies", "saga", "employed", "role", "designation", "position", "title", "current job", "current role")) {
    const [assign1, assign2] = careerRecord.assignments;
    const bullets2 = assign2.records.slice(0, 3).map(r => `• ${r}`).join("\n");
    return `⚔️ Shinobi Career Archive:\n\n🏢 ${careerRecord.company}\n📍 ${careerRecord.location}\n📅 ${careerRecord.overallPeriod} (${careerRecord.overallDuration})\n\n🟡 Arc 1 — ${assign1.title} @ ${assign1.team} (${assign1.period})\nBuilt web apps across multiple projects: KYC, RFQ, billing, healthcare, POS, real estate.\n\n🟠 Arc 2 — ${assign2.title} @ ${assign2.team} (${assign2.period})\n${bullets2}\n\nTwo arcs. Same fire. Zero ceilings. 🍥⚡`;
  }

  // First project
  if (has("first project", "first mission", "first app", "started with", "how he started", "beginning", "debut", "first work", "initial project", "very first")) {
    return `🌱 His First Mission — Where It All Began:\n\n⚡ Forsa — Workforce Development Platform\nThis was Praveen's first production project right out of training!\n\n📌 What he built:\n• Main dashboard with key workforce metrics\n• Associate creation & edit flows — onboarding with training assignments\n• Asset & business opportunity allocation\n• Employee portal and training center portal UI\n• Reports module for tracking Associate progress\n\nStack: React.js · Bootstrap · REST API · JavaScript\n\n💭 Looking back — \"basic CRUD patterns, navigation, real API calls for the first time. That feeling of seeing your code live in production? That's when it clicked.\"\n\nFrom that first scroll — to S-Rank missions now. 🍥 Growth mode: activated! ⚡`;
  }

  // Latest project
  if (has("latest project", "newest project", "most recent project", "current project", "latest mission", "recent work", "newest work", "what is he working", "working on now", "last project")) {
    return `🔥 Latest Mission — Most Recent Work:\n\n🧵 ThreadPOS — POS & Business Management Application\nThis is Praveen's most recently completed project!\n\n📌 What he built:\n• Full-stack POS and business management app across 8 modules\n• Product QR code generation + printing via billing machine\n• Scanning a QR code auto-adds the product to the billing list\n• GST workflows — GST setup, collection + GSTR-2B & GSTR-3B summary reports\n• POS operations, product management, billing & database operations end-to-end\n\nStack: React.js · C# · ASP.NET Web API · PostgreSQL\nRank: S-Rank · Status: ✅ Completed\n\n💡 After Forsa (his first) → all the way to building a full POS + GST system — that's the arc! 🍥⚡`;
  }

  // Most interesting / exciting project
  if (has("most interesting", "most exciting", "coolest", "favourite project", "favorite project", "which project", "exciting project", "interesting project", "fun project", "enjoyed most", "liked most", "best part")) {
    return `🔥 Most Interesting Mission — TriTrackz!\n\n🚚 TriTrackz — Logistics Aggregation Platform (S-Rank)\n\nWhy it's the most exciting, believe it:\n\n🧩 Complexity — 7 modules, 3 role-based portals (Admin, Driver, User)\n📋 RFQ flows — Forward, Backward, Share, Direct, Preferred Network, Common RFQ — 6 different types!\n🚗 Driver App UI — trip assignment, POP (Proof of Pickup) + POD (Proof of Delivery) full flow\n👥 Role-based KYC & onboarding for transport companies, brokers & carriers\n🔄 Real-time carrier bidding\n\nStack: React.js · C# · ASP.NET Web API · PostgreSQL\n\nThe sheer variety of user roles, workflows, and real-time interactions made this feel like building an entire ecosystem — not just an app!\n\nThat's what makes it unforgettable. 🍥⚡`;
  }

  // Difficulty / challenges faced
  if (has("difficult", "challenge", "hard part", "struggle", "tough", "obstacle", "problem faced", "hardest", "toughest", "what was hard", "biggest challenge", "pain point", "faced issue")) {
    return `⚔️ Hardest Battles Praveen Faced:\n\n🧩 1. TriTrackz — 6 Types of RFQ\nBuilding 6 completely different RFQ workflow types in one system — forward, backward, shared, direct, preferred network, common — each with its own logic, roles, and states. Mapping all these without breaking each other? Pure strategy.\n\n📋 2. Hasteri — 10-Stage PT Workflow\nThe Proficiency Testing app had a 10-stage sequential process where each stage could only open after admin completion. Getting state management right across both Admin and Participant portals — with proper role-based restrictions at button level — was intense.\n\n🏥 3. Tabib — 100ms Video Integration\nIntegrating the 100ms SDK for live doctor-patient video consultation — building call screen layouts, handling session states, prescription screens mid-call. First time working with live video infrastructure.\n\n🔗 4. Closing Pro — SignalR + Multi-role Comments\nReal-time contract-level comments via SignalR, synced across owners, brokers & agents simultaneously. Keeping the comment thread live without stale data or race conditions took real effort.\n\n💡 Every battle made him sharper. That's the ninja way! 🍥⚡`;
  }

  // Specific projects — all 7 real ones
  if (has("threadpos", "thread pos", "pos", "gst", "point of sale", "billing", "retailer", "clothing", "qr code")) {
    const p = projects.find((pr) => pr.title.includes("ThreadPOS"));
    if (p) return `🧵 ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• QR code generation + printing via billing machine\n• GST workflows — GSTR-2B and GSTR-3B summary reports\n• 8 modules: POS, product management, billing, GST & more\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}\n\nS-Rank full-stack mission! ⚡`;
  }
  if (has("tritrackz", "tri trackz", "tri-trackz", "logistics", "rfq", "carrier", "driver", "shipment", "freight", "pop", "pod")) {
    const p = projects.find((pr) => pr.title.includes("TriTrackz"));
    if (p) return `🚚 ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• 7 modules with role-based KYC onboarding\n• 6 RFQ workflow types — forward, backward, shared, direct, preferred, common\n• Driver app UI + full POP & POD delivery flow\n• Real-time carrier bidding\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}\n\nS-Rank — most complex mission to date! 🎯`;
  }
  if (has("hasteri", "proficiency", "proficiency testing", "lab", "iso", "pt workflow", "participant")) {
    const p = projects.find((pr) => pr.title.includes("Hasteri"));
    if (p) return `🔬 ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• Admin + Participant dual portals with role-based access\n• 10-stage sequential PT workflow (each stage unlocks after admin approval)\n• UMS with menu + button-level restrictions\n• Maintaining app end-to-end including reports, invoices & certificates\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}`;
  }
  if (has("tabib", "health", "hospital", "doctor", "patient", "medical", "100ms", "video consult", "appointment")) {
    const p = projects.find((pr) => pr.title.includes("Tabib"));
    if (p) return `🏥 ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• Patient onboarding + admin-driven patient creation\n• 8 admin master screens (specialization, degree, medicine…)\n• Appointment module for both admin & patient — scheduled + instant booking\n• 100ms video consultation with call layouts + prescription screens\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}`;
  }
  if (has("svvatech", "svavvashaa website", "company website", "wordpress", "elementor", "seo", "schema", "json-ld", "search console", "gsc", "geo", "ga4")) {
    const p = projects.find((pr) => pr.title.includes("Svvatech"));
    if (p) return `🌐 ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• 29-page B2B site from scratch — custom widget plugin\n• 8 JSON-LD schema types + 44-page XML sitemap\n• GA4 / Search Console integration\n• Weekly optimization + bi-weekly GEO content reviews\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}`;
  }
  if (has("closing pro", "real estate", "contract", "property", "broker", "agent", "signalr", "formik", "zustand")) {
    const p = projects.find((pr) => pr.title.includes("Closing Pro"));
    if (p) return `🏠 ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• Role-based onboarding for owners, brokers & agents\n• Contract creation → sharing → filling → review → closure workflow\n• SignalR real-time comments per contract\n• Full activity tracking — edits, status changes, milestones\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}`;
  }
  if (has("forsa", "workforce", "associate", "first project", "training center", "people management")) {
    const p = projects.find((pr) => pr.title.includes("Forsa"));
    if (p) return `⚡ ${p.title} — ${p.summary}\n\n${p.description}\n\n🔑 Key Highlights:\n• Dashboard with key workforce metrics\n• Associate creation, training assignment, asset allocation\n• Employee portal + training center portal\n• Reports module for Associate progress\n\n💡 This was Praveen's FIRST production project — where it all began!\n\nStack: ${p.technologies.join(" · ")}\nStatus: ✅ ${p.statusLabel}`;
  }

  // Best / Top / Favorite work
  if (has("best", "top", "favorite", "favourite", "proudest", "biggest", "main project", "flagship", "highlight", "most proud", "top project", "top work", "best work")) {
    return `🏆 Praveen's Top Missions:\n\n🥇 S-Rank — TriTrackz 🚚\nMost complex: 7 modules, 6 RFQ types, 3 role portals, driver app + real-time bidding\n\n🥈 S-Rank — ThreadPOS 🧵\nFull POS system: QR billing, GST workflows (GSTR-2B, GSTR-3B), 8 modules end-to-end\n\n🥉 A-Rank — Hasteri 🔬\nMost intricate flow: 10-stage PT workflow, dual portals, button-level role restrictions\n\n🌐 A-Rank — Svvatech Website\nOwned the whole thing: 29 pages, 8 schema types, SEO infrastructure + GEO\n\nAll 7 missions are live. No tutorials — real production code. 💪\n\nAsk about any specific one for the full breakdown! ⚡`;
  }

  // All projects
  if (has("project", "mission", "built", "created", "developed", "app", "system", "portfolio")) {
    const list = projects
      .filter(p => !p.placeholder)
      .map((p) => {
        const icon = p.rank === "S" ? "🔴" : p.rank === "A" ? "🟢" : "🔵";
        return `${icon} ${p.rank}-Rank · Mission ${p.missionNumber} · ${p.title}\n   ${p.summary}`;
      })
      .join("\n\n");
    return `🎯 All 7 Missions:\n\n${list}\n\n🏆 Ask "what's his best work?", "first project", "latest project", or "most interesting project" for details!\n\nEvery mission is live — real production code! ⚡`;
  }

  // Education
  if (has("education", "degree", "study", "college", "bca", "jamal", "academy", "school", "university", "trichy")) {
    return `🎓 Ninja Academy Training:\n\n📚 ${education.degree}\n🏛️ ${education.institution}\n📅 ${education.period}\n📍 ${education.location}\n\n${education.description}\n\nEvery legend starts at the academy! 🍥`;
  }

  // Certificates
  if (has("certificate", "certification", "rank", "scroll", ".net", "claude", "anthropic", "ai course", "course")) {
    const list = certificates
      .map((c) => `📜 ${c.title}\n   🏛️ ${c.issuer}`)
      .join("\n\n");
    return `🏆 Rank Scrolls Earned:\n\n${list}\n\nEvery rank earned through dedication and hard work! ⚡`;
  }

  // AI tools
  if (has("ai", "claude", "augment", "codex", "artificial intelligence", "llm", "gpt")) {
    return `🤖 Praveen's AI Jutsu:\n\n• Claude — AI pair programming, powering ThreadPOS's schema migrations & GST audits right now\n• Augment — Code acceleration\n• Codex — Workflow automation\n\nAI-assisted dev also boosted TriTrackz delivery efficiency by 20%!\n\nAI + Ninja = unstoppable! ⚡`;
  }

  // Contact / Hire
  if (has("contact", "hire", "email", "reach", "connect", "available", "opportunity", "work with", "recruit")) {
    return `📬 Connect with Praveen:\n\n📧 ${contactInfo.email}\n📱 ${contactInfo.phone}\n💼 linkedin.com/in/praveen-r-20536324b\n📍 ${contactInfo.location}\n\nOr send a jutsu through the Contact form below — fastest way to reach him! ⚡`;
  }

  // Location
  if (has("where", "location", "based", "bengaluru", "india", "city", "village", "place")) {
    return `📍 Hidden Leaf Village: Bengaluru, India! 🍃\n\nOriginally from Trichy, Tamil Nadu — now thriving in Bengaluru's tech scene.\n\nOpen to remote opportunities worldwide! 🌍`;
  }

  // Help / Menu
  if (has("help", "what can", "option", "menu", "ask", "what do you")) {
    return `🍥 Here's what you can ask me:\n\n• "Tell me about Praveen"\n• "What are his skills?"\n• "Show his projects"\n• "Work experience?"\n• "Education & certificates"\n• "How to contact him?"\n• Ask about React, TypeScript, SignalR...\n\nJust type naturally — I understand your jutsu! 💪`;
  }

  // Fallback
  return `Hmm, that scroll is hard to decode! 🤔\n\nTry asking about:\n• Skills & tech stack ⚡\n• Projects & missions 🎯\n• Work experience ⚔️\n• How to contact him 📬\n\nDattebayo — I'll find the answer! 🍥`;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What are his skills? 🥷",
  "His first project? 🌱",
  "Most interesting project? 🔥",
  "How to contact? 📬",
];

const INITIAL_MESSAGES = [
  {
    from: "bot",
    text: "Dattebayo! 👋 I'm Praveen's ninja assistant!\n\nAsk me anything about his skills, projects, experience, or how to get in touch.\n\nBelieve it! 🍥",
    id: 0,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(false);
  const [chipsGone, setChipsGone] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setUnread(false);
        inputRef.current?.focus();
      }, 300);
    }
  }, [open]);

  const sendMessage = (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;

    setChipsGone(true);
    setMessages((prev) => [...prev, { from: "user", text: msg, id: Date.now() }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = buildResponse(msg);
      setMessages((prev) => [...prev, { from: "bot", text: reply, id: Date.now() + 1 }]);
      if (!open) setUnread(true);
    }, 950);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <div className="fixed bottom-8 left-8 z-[9990]">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="trigger"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative"
            >
              {/* Unread badge */}
              {unread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00FF88] rounded-full z-10 ring-2 ring-[#0a0a0a] animate-pulse" />
              )}

              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,107,0,0.35)" }}
              />

              {/* Naruto button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setOpen(true)}
                className="relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-[#FF6B00]/70 cursor-pointer"
                style={{ boxShadow: "0 4px 24px rgba(255,107,0,0.4)" }}
                aria-label="Open chat"
              >
                <img
                  src="/young naruto.png"
                  alt="Open chat assistant — ask about Praveen R"
                  className="w-full h-full object-cover object-top scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
              </motion.button>

              {/* Waving hand */}
              <motion.span
                className="absolute -top-2 -right-0.5 text-base select-none pointer-events-none"
                style={{ transformOrigin: "70% 90%" }}
                animate={{ rotate: [0, 22, -8, 22, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5 }}
              >
                👋
              </motion.span>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute left-[72px] top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg"
                  style={{
                    background: "#14121c",
                    border: "1px solid rgba(255,107,0,0.25)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <span className="font-body text-xs text-gray-300">Ask about Praveen 🍥</span>
                </div>
                {/* Arrow */}
                <div
                  className="absolute right-full top-1/2 -translate-y-1/2"
                  style={{
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderRight: "6px solid rgba(255,107,0,0.25)",
                  }}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* Close button */
            <motion.button
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(false)}
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #FF6B00, #CC0000)",
                boxShadow: "0 4px 20px rgba(255,107,0,0.45)",
              }}
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed bottom-[88px] left-8 z-[9991] w-[340px] sm:w-[370px] rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #14121c 0%, #0d0c12 100%)",
              border: "1px solid rgba(255,107,0,0.18)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,107,0,0.04)",
              maxHeight: "70vh",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center gap-3 shrink-0"
              style={{
                background: "linear-gradient(90deg,rgba(255,107,0,0.12),rgba(255,107,0,0.04))",
                borderBottom: "1px solid rgba(255,107,0,0.12)",
              }}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#FF6B00]/40 shrink-0">
                <img src="/young naruto.png" alt="Naruto" className="w-full h-full object-cover object-top scale-125" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm text-white tracking-wider leading-none mb-1">
                  SAGE ASSISTANT
                </p>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shrink-0"
                  />
                  <span className="font-mono text-[9px] text-[#00FF88] tracking-wider">
                    Online · Believe it!
                  </span>
                </div>
              </div>
              <span className="text-xl select-none">🍥</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,107,0,0.2) transparent" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#FF6B00]/30 shrink-0 mb-0.5">
                      <img src="/young naruto.png" alt="" className="w-full h-full object-cover object-top scale-125" />
                    </div>
                  )}
                  <div
                    className="max-w-[82%] px-3 py-2.5 rounded-2xl font-body text-[11px] leading-relaxed whitespace-pre-line"
                    style={
                      msg.from === "user"
                        ? {
                            background: "linear-gradient(135deg,#FF6B00,#CC4400)",
                            color: "white",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#e5e7eb",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2 justify-start"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#FF6B00]/30 shrink-0">
                      <img src="/young naruto.png" alt="" className="w-full h-full object-cover object-top scale-125" />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderBottomLeftRadius: "4px",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] block"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Suggestion chips */}
            <AnimatePresence>
              {!chipsGone && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0"
                >
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      onClick={() => sendMessage(s)}
                      className="px-2.5 py-1 rounded-full font-body text-[10px] cursor-pointer transition-colors"
                      style={{
                        background: "rgba(255,107,0,0.08)",
                        border: "1px solid rgba(255,107,0,0.22)",
                        color: "#FF6B00",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,107,0,0.18)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,107,0,0.08)")}
                    >
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input row */}
            <div
              className="px-3 py-3 flex items-center gap-2 shrink-0"
              style={{
                borderTop: "1px solid rgba(255,107,0,0.1)",
                background: "rgba(255,107,0,0.02)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about Praveen..."
                className="flex-1 rounded-xl px-3 py-2 font-body text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,107,0,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
                style={{ background: "linear-gradient(135deg,#FF6B00,#CC4400)" }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
