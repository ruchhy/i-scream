"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Story Chapters ──────────────────────────────────────────────────────────
const chapters = [
  {
    id: "origin",
    act: "Prologue",
    title: "I was born\nin the highlands.",
    body: "Before I was cream, I was dew on grass. High in the alpine meadows of northern Italy, where mornings smell of pine and cold river mist, a herd of Bruna Alpina cows grazed on clover and wildflowers. Their milk — rich, ivory-white — carries the memory of every mountain it passed through.",
    side: "left",
    accent: "#d1ebdb",
    particle: "❄",
    coneStage: 0,
  },
  {
    id: "milk",
    act: "Chapter I",
    title: "The milk\narrived still warm.",
    body: "Within two hours of milking, the raw cream was gently separated at 4°C — never heated, never forced. A thin, golden layer rose to the surface like a secret. That cream alone carries 38% butterfat. I remember its weight. Thick. Patient. Honest.",
    side: "right",
    accent: "#fbf9f4",
    particle: "○",
    coneStage: 1,
  },
  {
    id: "ingredients",
    act: "Chapter II",
    title: "Then came\nthe pistachios.",
    body: "Flown in from Bronte, Sicily — grown in volcanic soil, harvested by hand every two years. Each kernel was inspected one by one. Roasted at 160°C for eleven minutes. Ground slowly until the oil released its green perfume into the cream. That scent — I carry it still.",
    side: "left",
    accent: "#a3c9a8",
    particle: "✦",
    coneStage: 2,
  },
  {
    id: "mixing",
    act: "Chapter III",
    title: "We were folded\ntogether slowly.",
    body: "The pistachio paste met the cream at exactly 6°C in a cold stone bowl. No machines yet — only wide paddles, turned by hand, in slow figure-eights. Three hours of folding. The color shifted from pale to deep sage. I began to taste like something real. Like something worth remembering.",
    side: "right",
    accent: "#c2a679",
    particle: "⟳",
    coneStage: 3,
  },
  {
    id: "freezing",
    act: "Chapter IV",
    title: "Then came\nthe cold.",
    body: "I entered the churning machine at –6°C. As I spun, micro-crystals formed — each no larger than 20 microns, invisible to the eye but felt on the tongue as velvet. Air was folded in precisely — 20% overrun — enough to lift me, not enough to make me hollow. The freeze took forty-seven minutes.",
    side: "left",
    accent: "#7ec8e3",
    particle: "◈",
    coneStage: 4,
  },
  {
    id: "toppings",
    act: "Chapter V",
    title: "They crowned\nme in gold.",
    body: "A final touch: crushed Bronte pistachio kernels pressed gently into my surface. A single drizzle of aged Sicilian honey — amber, slow, warm. Three edible gold leaf fragments, placed with tweezers. I became more than food. I became an occasion.",
    side: "right",
    accent: "#c2a679",
    particle: "★",
    coneStage: 5,
  },
  {
    id: "served",
    act: "Finale",
    title: "And then\nI met you.",
    body: "Scooped by hand. Placed on a freshly baked waffle cone — its ridges still warm. Carried to your table on cold marble. The moment your warmth touched mine, something irreversible began. I was made for exactly this. All those mountains, all that patience — arriving here, now, for you.",
    side: "left",
    accent: "#a3c9a8",
    particle: "♥",
    coneStage: 6,
  },
];

// ─── Ice Cream Cone SVG Stages ───────────────────────────────────────────────
// Each stage adds a visual layer to the cone illustration
function IceCreamConeSVG({ stage, accent }: { stage: number; accent: string }) {
  return (
    <svg
      viewBox="0 0 280 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
      style={{ filter: `drop-shadow(0 20px 60px ${accent}30)` }}
    >
      {/* ── Waffle Cone Body ── */}
      {stage >= 0 && (
        <g opacity={stage >= 6 ? 1 : stage >= 0 ? 0.85 : 0}>
          {/* Cone silhouette */}
          <path
            d="M80 240 L200 240 L155 410 L125 410 Z"
            fill="url(#coneGrad)"
            style={{ transition: "opacity 1.2s ease" }}
          />
          {/* Waffle grid lines horizontal */}
          <path d="M86 258 L194 258" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M92 276 L188 276" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M98 295 L182 295" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M104 314 L176 314" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M110 333 L170 333" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M116 352 L164 352" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M122 371 L158 371" stroke="#c2a67950" strokeWidth="1.2" />
          <path d="M128 390 L152 390" stroke="#c2a67950" strokeWidth="1.2" />
          {/* Waffle grid diagonal lines */}
          <path d="M95 240 L133 410" stroke="#c2a67930" strokeWidth="1" />
          <path d="M110 240 L143 410" stroke="#c2a67930" strokeWidth="1" />
          <path d="M125 240 L152 410" stroke="#c2a67930" strokeWidth="1" />
          <path d="M140 240 L155 410" stroke="#c2a67930" strokeWidth="1" />
          <path d="M155 240 L158 410" stroke="#c2a67930" strokeWidth="1" />
          <path d="M170 240 L156 380" stroke="#c2a67930" strokeWidth="1" />
          <path d="M185 240 L155 360" stroke="#c2a67930" strokeWidth="1" />
          {/* Cone highlight edge */}
          <path
            d="M80 240 L155 410"
            stroke="#c2a67945"
            strokeWidth="1.5"
          />
        </g>
      )}

      {/* ── Base Cream Scoop (Stage 1 — milk arrives) ── */}
      {stage >= 1 && (
        <ellipse
          cx="140"
          cy="220"
          rx="66"
          ry="42"
          fill="url(#creamBaseGrad)"
          style={{ transition: "all 1.2s ease" }}
        />
      )}

      {/* ── First Pistachio Scoop (Stage 2 — ingredients) ── */}
      {stage >= 2 && (
        <g style={{ transition: "all 1.2s ease" }}>
          <ellipse cx="140" cy="168" rx="62" ry="58" fill="url(#pistachioGrad1)" />
          <ellipse cx="140" cy="168" rx="62" ry="58" fill="url(#pistachioOverlay)" />
          {/* Texture swirls */}
          <path
            d="M110 160 Q130 148 150 162 Q170 176 155 190 Q140 205 120 192 Q100 179 110 160Z"
            fill="#8bb88840"
            style={{ transition: "opacity 0.8s ease" }}
          />
        </g>
      )}

      {/* ── Second Scoop / Folded Cream (Stage 3 — mixing) ── */}
      {stage >= 3 && (
        <g style={{ transition: "all 1.2s ease" }}>
          <ellipse cx="140" cy="120" rx="55" ry="50" fill="url(#mixedGrad)" />
          {/* Cream fold lines */}
          <path
            d="M110 118 Q125 108 140 118 Q155 128 170 118"
            stroke="#fbf9f430"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M115 128 Q130 120 145 128 Q160 136 172 128"
            stroke="#fbf9f420"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* ── Frost / Frozen Layer (Stage 4 — freezing) ── */}
      {stage >= 4 && (
        <g style={{ transition: "all 1.2s ease" }}>
          {/* Crystalline shimmer overlay on main scoop */}
          <ellipse
            cx="140"
            cy="120"
            rx="55"
            ry="50"
            fill="url(#frozenOverlay)"
          />
          <ellipse
            cx="140"
            cy="168"
            rx="62"
            ry="58"
            fill="url(#frozenOverlay2)"
          />
          {/* Ice crystal sparkles */}
          <circle cx="108" cy="108" r="2.5" fill="#7ec8e3" opacity="0.7" />
          <circle cx="172" cy="115" r="2" fill="#7ec8e3" opacity="0.5" />
          <circle cx="120" cy="140" r="1.8" fill="#d1ebdb" opacity="0.6" />
          <circle cx="160" cy="130" r="2.2" fill="#7ec8e380" opacity="0.8" />
          <circle cx="138" cy="85" r="1.5" fill="#7ec8e3" opacity="0.6" />
          <circle cx="152" cy="98" r="1.2" fill="#d1ebdb" opacity="0.7" />
        </g>
      )}

      {/* ── Top Scoop Peak (Stage 5 — toppings) ── */}
      {stage >= 5 && (
        <g style={{ transition: "all 1.2s ease" }}>
          {/* Rounded top peak */}
          <ellipse cx="140" cy="76" rx="40" ry="38" fill="url(#topScoopGrad)" />
          {/* Honey drizzle */}
          <path
            d="M162 78 Q170 92 166 108 Q163 120 168 130"
            stroke="#c2a679"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M118 82 Q110 96 114 112"
            stroke="#c2a679"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Gold leaf flakes */}
          <ellipse cx="150" cy="58" rx="6" ry="3" fill="#c2a679" opacity="0.85" transform="rotate(-25 150 58)" />
          <ellipse cx="128" cy="64" rx="5" ry="2.5" fill="#d4b483" opacity="0.7" transform="rotate(15 128 64)" />
          <ellipse cx="158" cy="70" rx="4" ry="2" fill="#c2a679" opacity="0.9" transform="rotate(-10 158 70)" />
          {/* Pistachio crumble */}
          <circle cx="132" cy="56" r="3.5" fill="#a3c9a8" opacity="0.9" />
          <circle cx="148" cy="48" r="3" fill="#8bb888" opacity="0.85" />
          <circle cx="140" cy="60" r="2.5" fill="#a3c9a8" opacity="0.8" />
          <circle cx="122" cy="72" r="3" fill="#8bb888" opacity="0.75" />
          <circle cx="160" cy="65" r="2.5" fill="#a3c9a8" opacity="0.85" />
          <circle cx="136" cy="78" r="2" fill="#8bb888" opacity="0.7" />
          <circle cx="154" cy="54" r="2.2" fill="#a3c9a8" opacity="0.9" />
        </g>
      )}

      {/* ── Final Served State — warm glow (Stage 6) ── */}
      {stage >= 6 && (
        <g>
          {/* Warmth aura */}
          <ellipse cx="140" cy="200" rx="90" ry="30" fill="url(#warmGlow)" />
          {/* Small melting drip */}
          <path
            d="M196 230 Q202 238 200 248 Q198 255 196 250 Q194 245 196 238Z"
            fill="#d1ebdb90"
          />
          <path
            d="M86 235 Q80 244 82 252 Q84 258 86 253 Q88 248 86 240Z"
            fill="#fbf9f470"
          />
        </g>
      )}

      {/* ─── Gradients ─── */}
      <defs>
        <linearGradient id="coneGrad" x1="80" y1="240" x2="155" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c2a679" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#a88660" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8a6840" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="creamBaseGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbf9f4" />
          <stop offset="70%" stopColor="#f0ece3" />
          <stop offset="100%" stopColor="#e0d8c8" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="pistachioGrad1" cx="45%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#b8d4b8" />
          <stop offset="50%" stopColor="#8ab98a" />
          <stop offset="100%" stopColor="#6a9e6a" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="pistachioOverlay" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="mixedGrad" cx="45%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#c8dfc8" />
          <stop offset="50%" stopColor="#98c498" />
          <stop offset="100%" stopColor="#78a878" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="frozenOverlay" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d1ebdb" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="frozenOverlay2" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#d1ebdb" stopOpacity="0.03" />
        </radialGradient>
        <radialGradient id="topScoopGrad" cx="42%" cy="35%" r="62%">
          <stop offset="0%" stopColor="#b8d8b8" />
          <stop offset="45%" stopColor="#90c090" />
          <stop offset="100%" stopColor="#70a870" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a3c9a8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#a3c9a8" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ─── Floating Particle ──────────────────────────────────────────────────────
function FloatingParticles({ char, accent }: { char: string; accent: string }) {
  const particles = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute text-xl animate-float-particle opacity-0"
          style={{
            left: `${10 + (i * 11) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
            color: accent,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function IceCreamStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const coneRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [coneStage, setConeStage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Pin the sticky panel for the entire scroll journey
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    // Create a trigger for each chapter
    chapters.forEach((chapter, i) => {
      const triggerStart = i === 0 ? "0%" : `${(i / chapters.length) * 100}%`;
      const triggerEnd = `${((i + 1) / chapters.length) * 100}%`;

      ScrollTrigger.create({
        trigger: container,
        start: `${triggerStart} top`,
        end: `${triggerEnd} top`,
        onEnter: () => {
          setActiveChapter(i);
          setConeStage(chapter.coneStage);
        },
        onEnterBack: () => {
          setActiveChapter(i);
          setConeStage(chapter.coneStage);
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const active = chapters[activeChapter];

  return (
    <section
      ref={containerRef}
      id="ice-cream-story"
      className="relative w-full bg-brand-black"
      style={{ height: `${chapters.length * 110}vh` }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Dynamic background gradient that shifts per chapter */}
        <div
          className="absolute inset-0 transition-all duration-1500 ease-in-out"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 50%, ${active.accent}08 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 80% 50%, ${active.accent}05 0%, transparent 70%),
              radial-gradient(ellipse 80% 40% at 50% 90%, ${active.accent}06 0%, transparent 60%),
              #050505
            `,
          }}
        />

        {/* Floating particles layer */}
        <FloatingParticles char={active.particle} accent={active.accent} />

        {/* Cinematic grain overlay */}
        <div className="absolute inset-0 cinematic-texture opacity-[0.06] pointer-events-none z-10" />

        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-brand-black to-transparent pointer-events-none z-10" />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-black to-transparent pointer-events-none z-10" />

        {/* ── Main Layout: Text | Cone | (Text on right) ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 h-full flex items-center">

          {/* Left text panel */}
          <div
            className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm transition-all duration-700 ease-out"
            style={{
              opacity: active.side === "left" ? 1 : 0,
              transform: `translateY(-50%) translateX(${active.side === "left" ? 0 : -30}px)`,
            }}
          >
            <ChapterText chapter={active} />
          </div>

          {/* Centered ice cream cone */}
          <div
            ref={coneRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[300px] h-[360px] md:h-[440px] transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 30px 80px ${active.accent}25)`,
            }}
          >
            <IceCreamConeSVG stage={coneStage} accent={active.accent} />

            {/* Subtle rotating glow ring behind cone */}
            <div
              className="absolute inset-[-20%] rounded-full opacity-20 animate-spin-slow pointer-events-none"
              style={{
                background: `conic-gradient(transparent 0%, ${active.accent}30 30%, transparent 60%, ${active.accent}15 80%, transparent 100%)`,
                transition: "background 1.5s ease",
              }}
            />
          </div>

          {/* Right text panel */}
          <div
            className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm text-right transition-all duration-700 ease-out"
            style={{
              opacity: active.side === "right" ? 1 : 0,
              transform: `translateY(-50%) translateX(${active.side === "right" ? 0 : 30}px)`,
            }}
          >
            <ChapterText chapter={active} align="right" />
          </div>
        </div>

        {/* ── Bottom HUD: Progress + Chapter Dots ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-4">
          {/* Chapter progress dots */}
          <div className="flex items-center space-x-3">
            {chapters.map((ch, i) => (
              <div
                key={ch.id}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === activeChapter ? "24px" : "6px",
                  height: "6px",
                  background:
                    i === activeChapter
                      ? active.accent
                      : i < activeChapter
                      ? active.accent + "60"
                      : "#ffffff15",
                }}
              />
            ))}
          </div>
          {/* Scroll cue */}
          <div className="flex flex-col items-center space-y-1 opacity-40">
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-brand-ivory">
              Scroll to continue
            </span>
            <div className="w-px h-6 bg-gradient-to-b from-brand-gold/50 to-transparent animate-pulse" />
          </div>
        </div>

        {/* ── Top Left: Act Label ── */}
        <div className="absolute top-8 left-8 z-30">
          <span
            className="font-sans text-[10px] tracking-[0.5em] uppercase font-bold transition-all duration-700"
            style={{ color: active.accent }}
          >
            {active.act}
          </span>
        </div>

        {/* ── Top Right: Chapter counter ── */}
        <div className="absolute top-8 right-8 z-30 text-right">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-ivory/30">
            {String(activeChapter + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Chapter Text Block ──────────────────────────────────────────────────────
function ChapterText({
  chapter,
  align = "left",
}: {
  chapter: (typeof chapters)[0];
  align?: "left" | "right";
}) {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      {/* Accent line */}
      <div
        className="h-[1px] w-10 mb-5 transition-all duration-1000"
        style={{ background: chapter.accent + "70" }}
      />

      {/* Chapter title */}
      <h2
        className={`font-serif text-3xl md:text-5xl font-light leading-tight mb-5 uppercase tracking-wide ${align === "right" ? "text-right" : "text-left"}`}
        style={{ color: "#fbf9f4" }}
      >
        {chapter.title.split("\n").map((line, i) => (
          <span key={i} className="block">
            {i === 1 ? (
              <span style={{ color: chapter.accent }}>{line}</span>
            ) : (
              line
            )}
          </span>
        ))}
      </h2>

      {/* Separator */}
      <div
        className="h-[1px] w-8 mb-5 transition-all duration-1000"
        style={{ background: chapter.accent + "40" }}
      />

      {/* Body text */}
      <p
        className={`font-sans text-xs md:text-sm text-brand-ivory/60 leading-relaxed font-light tracking-wide ${align === "right" ? "text-right" : "text-left"}`}
        style={{ maxWidth: "320px" }}
      >
        {chapter.body}
      </p>

      {/* Quote accent */}
      <div
        className={`mt-6 font-serif text-4xl leading-none ${align === "right" ? "self-end" : "self-start"}`}
        style={{ color: chapter.accent + "20" }}
      >
        {align === "right" ? """ : """}
      </div>
    </div>
  );
}
