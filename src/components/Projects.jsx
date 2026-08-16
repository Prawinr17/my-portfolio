import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { projects } from "../data/portfolio";

// Manual piecewise-linear interpolation, standing in for Framer Motion's
// array-form `useTransform(value, stops, outputs)`. That array form hands
// off to a hardware-accelerated native WAAPI animation shared off the same
// scrollYProgress input across every MissionHero sibling — with 6+ missions
// all reading/writing that shared acceleration state, it was observed to
// misattribute one mission's keyframes to another mission's DOM element
// (verified: computed opacity for "Proficiency Testing App" tracked the
// curve that belonged to the previous mission's exit window, not its own).
// Passing a plain function to useTransform (this) skips that shared
// acceleration path entirely, so each mission's motion value is computed
// independently — the trade-off is losing WAAPI's off-main-thread perf,
// which is not a concern here since resolution just needs one scroll
// listener's worth of math, not a spring/tween.
function piecewise(v, stops, values) {
  if (v <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (v >= stops[last]) return values[last];
  for (let i = 0; i < last; i++) {
    if (v >= stops[i] && v <= stops[i + 1]) {
      const span = stops[i + 1] - stops[i];
      const t = span === 0 ? 0 : (v - stops[i]) / span;
      return values[i] + (values[i + 1] - values[i]) * t;
    }
  }
  return values[last];
}

// How many viewport-heights of scroll each mission gets to step through its
// screenshots. Each mission currently has 1 image, but the math below scales
// automatically if more screenshots are added per project later.
const SCREENSHOTS_PER_MISSION = 1;
const VH_PER_MISSION = Math.max(SCREENSHOTS_PER_MISSION, 1.5);

// Fraction of a mission's scroll segment reserved for the handoff to the
// next mission. Mission N's exit window and mission N+1's enter window sit
// over the SAME global scroll range (N's segEnd straddled by +/- HANDOFF),
// so as one mission slides out the next is simultaneously sliding in — no
// gap where both sit at opacity 0. The two are offset in TIME within that
// shared window (see OUT_OPACITY_DONE / IN_OPACITY_START below) so their
// text never both render at high opacity at once — that overlap was the bug.
const HANDOFF = 0.1;
// Where in the shared handoff window (0-1, mapped across [exitStart,exitEnd])
// the outgoing mission finishes fading and the incoming one starts fading in.
// A hard cut would be 0.5 for both; splitting it like this means the
// outgoing mission is already invisible before the incoming one becomes
// legible, so there's no frame where both texts are readable at once.
const OUT_OPACITY_DONE = 0.4; // outgoing mission reaches opacity 0 by 40% through the window
const IN_OPACITY_START = 0.6; // incoming mission starts leaving opacity 0 at 60% through the window

// Four depth/parallax "looks" for the background image, cycled by mission
// index (mission 4 repeats mission 0's style, etc.) so consecutive missions
// read as distinct without needing a bespoke animation per project. Each
// style is driven by missionProgress (0->1 across the mission's own active
// window) and only ever touches transform (scale/x/rotate), never top/left/
// width/height, to stay on the compositor thread.
const DEPTH_STYLES = [
  // 0: slow zoom-in — classic Ken Burns push
  { scaleFrom: 1.08, scaleTo: 1.18, xFrom: 0, xTo: 0, rotateFrom: 0, rotateTo: 0 },
  // 1: slow zoom-out — pulls back to reveal more of the scene
  { scaleFrom: 1.18, scaleTo: 1.08, xFrom: 0, xTo: 0, rotateFrom: 0, rotateTo: 0 },
  // 2: diagonal drift — gentle horizontal pan while holding scale
  { scaleFrom: 1.12, scaleTo: 1.12, xFrom: -18, xTo: 18, rotateFrom: 0, rotateTo: 0 },
  // 3: tilt + push — slight rotation adds a handheld/dynamic feel
  { scaleFrom: 1.1, scaleTo: 1.16, xFrom: 8, xTo: -8, rotateFrom: -1.2, rotateTo: 1.2 },
];

// Staggered intro for each mission's text block: badge -> status -> title ->
// description -> tags -> step indicator, each arriving slightly after the
// last. Driven directly by missionProgress (scroll position), NOT by a
// time-based transition — a fixed-duration animation can be caught
// mid-flight on a fast scroll/fling (many missions' worth of scroll can
// happen in a single frame), which read as text "half loading" because the
// animation was still only partway through when the user's eye landed on
// that mission. Mapping straight from scroll position means the reveal
// state always matches wherever the scrollbar physically is, at any speed,
// exactly like the depth/parallax transforms already do.
// Six items get staggered: badge, status, title, description, tags, step-dots.
const STAGGER_ITEM_SPAN = 0.025; // fraction of mission-local progress each item takes to fade/slide in
const STAGGER_ITEM_GAP = 0.018; // fraction of mission-local progress between one item starting and the next

// One pinned "screen" per mission. The parent HeroSequence gives every
// mission a track of `VH_PER_MISSION * 100vh` of scroll room; this component
// receives the container's shared scrollYProgress and maps it to:
//   1. a screenshot index (which of its ~N images is showing)
//   2. an enter/exit transform (mission slides/fades against its neighbors)
function MissionHero({ project, index, total, scrollYProgress }) {
  // Slice the overall [0,1] scroll progress into one equal segment per
  // mission, then re-normalize that segment back to its own local [0,1]
  // progress. E.g. with 3 missions, mission index 1 owns scroll range
  // [0.33, 0.66], which maps to a local 0 -> 1 sweep used below for
  // screenshot stepping (the "which image is showing" question).
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const missionProgressMapper = useCallback(
    (v) => piecewise(v, [segStart, segEnd], [0, 1]),
    [segStart, segEnd]
  );
  const missionProgress = useTransform(scrollYProgress, missionProgressMapper);

  const images = [project.image]; // single image today; add more per-project to step through
  const shots = images.length;

  // --- Screenshot stepping -------------------------------------------------
  // Split this mission's local progress [0,1] into `shots` equal buckets and
  // pick the active one. E.g. with 3 shots: [0-.33) -> 0, [.33-.66) -> 1,
  // [.66-1] -> 2. Clamped so the last frame holds through the tail of the
  // track (the segment reserved for the exit transition).
  const [activeShot, setActiveShot] = useState(0);
  useEffect(
    () =>
      missionProgress.on("change", (v) => {
        const bucket = Math.min(shots - 1, Math.floor(v * shots));
        setActiveShot(bucket);
      }),
    [missionProgress, shots]
  );

  // --- Mission-to-mission transition --------------------------------------
  // Unlike screenshot stepping, the enter/exit transform is NOT derived from
  // missionProgress — that would confine mission N+1's "enter" to only start
  // once scroll has fully crossed into its own segment, leaving a dead zone
  // where mission N has finished exiting but N+1 hasn't started entering yet.
  // Instead, both transforms are windows on the SHARED global scrollYProgress,
  // centered on the segment boundary they share, so they run concurrently:
  //   this mission's EXIT window:  [segEnd - HANDOFF, segEnd + HANDOFF]
  //   next mission's ENTER window: same range (its segStart === this segEnd)
  // Mission 0 has no preceding mission, so it skips the enter phase and is
  // fully visible/in-place from scroll position 0. The last mission has no
  // following mission, so it skips the exit phase and stays put.
  //
  // All of this is wrapped in useMemo keyed on [index, total] (the only
  // real inputs — HANDOFF etc. are module constants): Framer Motion's
  // useTransform can hand off scroll-linked transforms to a native WAAPI
  // animation for performance, and that native animation is (re)built from
  // the stops/values array identities. Passing fresh array literals on every
  // render was letting that acceleration path rebuild with mismatched state
  // across sibling MissionHero instances, which produced wrong opacity per
  // mission (verified by comparing computed styles against the same math
  // run in isolation) and, in one observed case, a hard crash from the
  // browser's Web Animations API rejecting out-of-order offsets. Memoizing
  // keeps each mission's arrays referentially stable across re-renders.
  const { yStops, yValues, opacityStops, opacityValues, exitStart, exitEnd } = useMemo(() => {
    // HANDOFF is a fixed fraction of the WHOLE track, but each mission's own
    // segment shrinks as `total` grows (more missions = each gets a smaller
    // slice). If HANDOFF ever exceeds a quarter of the segment width, this
    // mission's enter and exit windows would overlap each other (or spill
    // into neighboring segments), producing non-increasing keyframe stops —
    // which the Web Animations API throws on. Clamp it so enter/exit always
    // stay safely separated regardless of how many missions are in the
    // sequence.
    const segWidth = 1 / total;
    const effectiveHandoff = Math.min(HANDOFF, segWidth / 4);

    const enterStart = Math.max(0, segStart - effectiveHandoff);
    const enterEnd = Math.min(1, segStart + effectiveHandoff);
    const exitStart = Math.max(0, segEnd - effectiveHandoff);
    const exitEnd = Math.min(1, segEnd + effectiveHandoff);

    // Opacity-only stops, offset within their own window per
    // OUT_OPACITY_DONE / IN_OPACITY_START so this mission's fade-out (in its
    // EXIT window) and the next mission's fade-in (in ITS enter window,
    // which is the same range as this mission's exit window) don't overlap
    // at high opacity — that overlap was the double-exposed-text bug. `y`
    // still uses the full window (see yStops below) so the slide motion
    // stays smooth even though opacity resolves faster.
    const fadeInStart = enterStart + (enterEnd - enterStart) * IN_OPACITY_START; // this mission fading IN
    const fadeOutEnd = exitStart + (exitEnd - exitStart) * OUT_OPACITY_DONE; // this mission fading OUT

    const isFirst = index === 0;
    const isLast = index === total - 1;

    // Every stops/values pair below is written out explicitly (no derived
    // index math) so each transform stage can be checked by eye: read the
    // two arrays top-to-bottom in lockstep — stops[i] is the scroll
    // position at which the transform reaches values[i].
    let yStops, yValues, opacityStops, opacityValues;
    if (isFirst && isLast) {
      // Only mission in the sequence — always in place, never fades.
      yStops = opacityStops = [0, 1];
      yValues = [0, 0];
      opacityValues = [1, 1];
    } else if (isFirst) {
      // No enter phase (visible from scroll 0); exits into mission 1.
      // Opacity finishes fading (fadeOutEnd) well before the slide finishes
      // (exitEnd), so this mission is already invisible while still sliding.
      yStops = [0, exitStart, exitEnd, 1];
      yValues = [0, 0, -80, -80];
      opacityStops = [0, exitStart, fadeOutEnd, 1];
      opacityValues = [1, 1, 0, 0];
    } else if (isLast) {
      // Enters from the previous mission; no exit phase (stays put after).
      // Opacity only starts rising at fadeInStart, once the previous
      // mission has already faded out — not at enterStart, which would
      // overlap it.
      yStops = [0, enterStart, enterEnd, 1];
      yValues = [80, 80, 0, 0];
      opacityStops = [0, fadeInStart, enterEnd, 1];
      opacityValues = [0, 0, 1, 1];
    } else {
      // Middle mission: enters, holds, then exits into the next one. Same
      // split-timing logic applied to both its enter and exit edges.
      yStops = [0, enterStart, enterEnd, exitStart, exitEnd, 1];
      yValues = [80, 80, 0, 0, -80, -80];
      opacityStops = [0, fadeInStart, enterEnd, exitStart, fadeOutEnd, 1];
      opacityValues = [0, 0, 1, 1, 0, 0];
    }

    return { yStops, yValues, opacityStops, opacityValues, exitStart, exitEnd };
  }, [index, total, segStart, segEnd]);

  // Function-form useTransform (see the `piecewise` comment above) instead
  // of the array-form — required to avoid the shared-acceleration bug.
  const yMapper = useCallback((v) => piecewise(v, yStops, yValues), [yStops, yValues]);
  const opacityMapper = useCallback(
    (v) => piecewise(v, opacityStops, opacityValues),
    [opacityStops, opacityValues]
  );
  const y = useTransform(scrollYProgress, yMapper);
  const opacity = useTransform(scrollYProgress, opacityMapper);

  // --- Intro stagger (scroll-driven, not time-based) --------------------
  // Each text item gets its own small slice of missionProgress (0->1, this
  // mission's own local scroll sweep) to fade/slide in, offset from the
  // previous item by STAGGER_ITEM_GAP. Reading straight off scroll position
  // — rather than a fixed-duration transition — means there is no "still
  // mid-animation" state to be caught in: on a fast scroll/fling the reveal
  // just resolves to wherever the scrollbar landed, same as the parallax
  // and depth transforms already do. Mission 0 has no enter phase (visible
  // from scroll 0), so its items are pinned fully revealed. Six explicit
  // calls (not a loop building an array of hooks) because the number of
  // staggered items is fixed and known — see STAGGER_ITEM_COUNT.
  const staggerWindow = useCallback(
    (itemIndex) => {
      if (index === 0) return [0, 0, 1, 1]; // always fully revealed, no stops needed
      const start = itemIndex * STAGGER_ITEM_GAP;
      const end = start + STAGGER_ITEM_SPAN;
      return [start, end];
    },
    [index]
  );
  const badgeOpacityMapper = useCallback(
    (v) => (index === 0 ? 1 : piecewise(v, staggerWindow(0), [0, 1])),
    [index, staggerWindow]
  );
  const badgeYMapper = useCallback(
    (v) => (index === 0 ? 0 : piecewise(v, staggerWindow(0), [16, 0])),
    [index, staggerWindow]
  );
  const statusOpacityMapper = useCallback(
    (v) => (index === 0 ? 1 : piecewise(v, staggerWindow(1), [0, 1])),
    [index, staggerWindow]
  );
  const statusYMapper = useCallback(
    (v) => (index === 0 ? 0 : piecewise(v, staggerWindow(1), [16, 0])),
    [index, staggerWindow]
  );
  const titleOpacityMapper = useCallback(
    (v) => (index === 0 ? 1 : piecewise(v, staggerWindow(2), [0, 1])),
    [index, staggerWindow]
  );
  const titleYMapper = useCallback(
    (v) => (index === 0 ? 0 : piecewise(v, staggerWindow(2), [16, 0])),
    [index, staggerWindow]
  );
  const descOpacityMapper = useCallback(
    (v) => (index === 0 ? 1 : piecewise(v, staggerWindow(3), [0, 1])),
    [index, staggerWindow]
  );
  const descYMapper = useCallback(
    (v) => (index === 0 ? 0 : piecewise(v, staggerWindow(3), [16, 0])),
    [index, staggerWindow]
  );
  const tagsOpacityMapper = useCallback(
    (v) => (index === 0 ? 1 : piecewise(v, staggerWindow(4), [0, 1])),
    [index, staggerWindow]
  );
  const tagsYMapper = useCallback(
    (v) => (index === 0 ? 0 : piecewise(v, staggerWindow(4), [16, 0])),
    [index, staggerWindow]
  );
  const dotsOpacityMapper = useCallback(
    (v) => (index === 0 ? 1 : piecewise(v, staggerWindow(5), [0, 1])),
    [index, staggerWindow]
  );
  const dotsYMapper = useCallback(
    (v) => (index === 0 ? 0 : piecewise(v, staggerWindow(5), [16, 0])),
    [index, staggerWindow]
  );
  const badgeOpacity = useTransform(missionProgress, badgeOpacityMapper);
  const badgeY = useTransform(missionProgress, badgeYMapper);
  const statusOpacity = useTransform(missionProgress, statusOpacityMapper);
  const statusY = useTransform(missionProgress, statusYMapper);
  const titleOpacity = useTransform(missionProgress, titleOpacityMapper);
  const titleY = useTransform(missionProgress, titleYMapper);
  const descOpacity = useTransform(missionProgress, descOpacityMapper);
  const descY = useTransform(missionProgress, descYMapper);
  const tagsOpacity = useTransform(missionProgress, tagsOpacityMapper);
  const tagsY = useTransform(missionProgress, tagsYMapper);
  const dotsOpacity = useTransform(missionProgress, dotsOpacityMapper);
  const dotsY = useTransform(missionProgress, dotsYMapper);

  const isLast = index === total - 1;

  // Background parallax: moves slower than the foreground text/badge so the
  // image appears to drift behind the copy during the exit transition.
  const bgYMapper = useCallback(
    (v) =>
      piecewise(
        v,
        isLast ? [0, 1] : [exitStart, exitEnd],
        isLast ? [0, 0] : [0, -32]
      ),
    [exitStart, exitEnd, isLast]
  );
  const bgY = useTransform(scrollYProgress, bgYMapper);

  // Depth style — one of DEPTH_STYLES, cycled by index so consecutive
  // missions get a visibly different treatment. Driven by missionProgress
  // (this mission's own 0->1 local sweep) rather than the global
  // scrollYProgress, so the zoom/drift/tilt runs smoothly across the whole
  // time this mission is active regardless of how many missions precede it.
  const depthStyle = DEPTH_STYLES[index % DEPTH_STYLES.length];
  const depthScaleMapper = useCallback(
    (v) => piecewise(v, [0, 1], [depthStyle.scaleFrom, depthStyle.scaleTo]),
    [depthStyle]
  );
  const depthXMapper = useCallback(
    (v) => piecewise(v, [0, 1], [depthStyle.xFrom, depthStyle.xTo]),
    [depthStyle]
  );
  const depthRotateMapper = useCallback(
    (v) => piecewise(v, [0, 1], [depthStyle.rotateFrom, depthStyle.rotateTo]),
    [depthStyle]
  );
  const depthScale = useTransform(missionProgress, depthScaleMapper);
  const depthX = useTransform(missionProgress, depthXMapper);
  const depthRotate = useTransform(missionProgress, depthRotateMapper);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, zIndex: total - index }}
    >
      {/* Background screenshot — oversized (inset -8%) so the parallax
          translateY never exposes empty space at its edges; independent
          of the foreground's enter/exit transform so it only ever drifts
          by the small parallax amount, not the full slide distance. */}
      <motion.div className="absolute -inset-y-[8%] inset-x-0 overflow-hidden" style={{ y: bgY }}>
        <motion.img
          src={images[activeShot]}
          alt={`${project.title} — project by Praveen R, built with ${project.technologies.join(", ")}`}
          className="w-full h-full object-cover"
          style={{ scale: depthScale, x: depthX, rotate: depthRotate }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
        {/* Uniform dark scrim — flat, consistent darkening on top of the
            directional gradients above so text stays readable everywhere,
            not just near the left/bottom edges. */}
        <div className="absolute inset-0 bg-[#0a0a0a]/45" />
      </motion.div>

      <motion.div className="relative w-full h-full" style={{ y }}>
        {/* Foreground content — left-aligned, same treatment as top header hero.
            Each child's opacity/y is its own scroll-driven motion value (see
            the staggerWindow block above) so the staggered entrance always
            matches scroll position exactly, even on a fast scroll/fling. */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-3xl">
          <motion.span
            style={{ opacity: badgeOpacity, y: badgeY }}
            className="font-heading text-[10px] sm:text-xs text-[#FF6B00] tracking-[0.3em] mb-4"
          >
            {project.mission}
          </motion.span>

          <motion.div style={{ opacity: statusOpacity, y: statusY }} className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0a]/70 backdrop-blur-sm border border-[#00FF88]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="font-mono text-[9px] text-[#00FF88] uppercase tracking-wider">
                {project.status}
              </span>
            </span>
          </motion.div>

          <motion.h3
            style={{ opacity: titleOpacity, y: titleY }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white tracking-wider mb-5 leading-[0.95]"
          >
            {project.title}
          </motion.h3>

          <motion.p
            style={{ opacity: descOpacity, y: descY }}
            className="font-body text-base sm:text-lg text-gray-100 leading-relaxed mb-6 max-w-xl"
          >
            {project.description}
          </motion.p>

          <motion.div style={{ opacity: tagsOpacity, y: tagsY }} className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 font-mono text-xs rounded-md bg-[#FF6B00]/10 text-[#FF6B00]/90 border border-[#FF6B00]/20"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Screenshot step indicator */}
          {shots > 1 && (
            <motion.div style={{ opacity: dotsOpacity, y: dotsY }} className="flex gap-1.5 mt-8">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === activeShot ? "w-8 bg-[#FF6B00]" : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Simplified static fallback for prefers-reduced-motion and mobile: plain
// vertical stack, fade/slide-in on scroll into view, no pinning or parallax.
function MissionStackItem({ project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative min-h-[70vh] sm:min-h-screen flex flex-col justify-center px-6 sm:px-12 py-16"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={project.image}
          alt={`${project.title} — project by Praveen R, built with ${project.technologies.join(", ")}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-[#0a0a0a]/45" />
      </div>

      <span className="font-heading text-[10px] text-[#FF6B00] tracking-[0.3em] mb-3">
        {project.mission}
      </span>

      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0a]/70 backdrop-blur-sm border border-[#00FF88]/20 self-start mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
        <span className="font-mono text-[9px] text-[#00FF88] uppercase tracking-wider">
          {project.status}
        </span>
      </span>

      <h3 className="font-heading text-3xl sm:text-5xl text-white tracking-wider mb-4 leading-tight">
        {project.title}
      </h3>

      <p className="font-body text-sm sm:text-base text-gray-100 leading-relaxed mb-6 max-w-xl">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 font-mono text-xs rounded-md bg-[#FF6B00]/10 text-[#FF6B00]/90 border border-[#FF6B00]/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function MissionStack({ projects: list }) {
  return (
    <div className="relative z-20">
      {list.map((project) => (
        <MissionStackItem key={project.title} project={project} />
      ))}
    </div>
  );
}

// Pinned scroll-driven sequence: one tall track (missions.length * VH_PER_MISSION
// viewport-heights) with a sticky viewport-height window. Scroll position maps
// to a per-mission local progress value that each MissionHero uses to step
// through its screenshots and animate its enter/exit transform.
function HeroSequence({ missions }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = missions.length;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${total * VH_PER_MISSION * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {missions.map((project, index) => (
          <MissionHero
            key={project.title}
            project={project}
            index={index}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Pinned scroll + parallax is skipped in favor of a plain fade/slide stack
  // when the user prefers reduced motion, or on mobile where a pinned
  // full-viewport sequence tends to feel janky/fights native scroll.
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const useSimpleLayout = prefersReducedMotion || isMobile;

  return (
    <section
      id="projects"
      className="relative py-0"
      ref={ref}
    >
      {/* ===== BG IMAGE — header only, cropped tight to badge+title+divider ===== */}
      <div className="relative w-full overflow-hidden">
        <motion.img
          src="/projects-section-background.png"
          alt="Praveen R — Projects portfolio section, React and full-stack work"
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Overlay — light, image clearly visible */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.2) 70%, rgba(10,10,10,0.85) 100%)" }} />

        {/* Header — content defines the height, no forced aspect ratio */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:py-20">
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
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white tracking-wider">
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

      {/* ===== FEATURED MISSIONS — scroll-driven full-bleed hero sequence ===== */}
      {useSimpleLayout ? (
        <MissionStack projects={projects} />
      ) : (
        <HeroSequence missions={projects} />
      )}
    </section>
  );
}
