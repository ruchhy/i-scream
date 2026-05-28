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
  },
  {
    id: "milk",
    act: "Chapter I",
    title: "The milk\narrived still warm.",
    body: "Within two hours of milking, the raw cream was gently separated at 4°C — never heated, never forced. A thin, golden layer rose to the surface like a secret. That cream alone carries 38% butterfat. I remember its weight. Thick. Patient. Honest.",
    side: "right",
    accent: "#fbf9f4",
    particle: "○",
  },
  {
    id: "ingredients",
    act: "Chapter II",
    title: "Then came\nthe pistachios.",
    body: "Flown in from Bronte, Sicily — grown in volcanic soil, harvested by hand every two years. Each kernel was inspected one by one. Roasted at 160°C for eleven minutes. Ground slowly until the oil released its green perfume into the cream. That scent — I carry it still.",
    side: "left",
    accent: "#a3c9a8",
    particle: "✦",
  },
  {
    id: "mixing",
    act: "Chapter III",
    title: "We were folded\ntogether slowly.",
    body: "The pistachio paste met the cream at exactly 6°C in a cold stone bowl. No machines yet — only wide paddles, turned by hand, in slow figure-eights. Three hours of folding. The color shifted from pale to deep sage. I began to taste like something real. Like something worth remembering.",
    side: "right",
    accent: "#c2a679",
    particle: "\u27F3",
  },
  {
    id: "freezing",
    act: "Chapter IV",
    title: "Then came\nthe cold.",
    body: "I entered the churning machine at \u20136\u00b0C. As I spun, micro-crystals formed — each no larger than 20 microns, invisible to the eye but felt on the tongue as velvet. Air was folded in precisely — 20% overrun — enough to lift me, not enough to make me hollow. The freeze took forty-seven minutes.",
    side: "left",
    accent: "#7ec8e3",
    particle: "\u25C8",
  },
  {
    id: "toppings",
    act: "Chapter V",
    title: "They crowned\nme in gold.",
    body: "A final touch: crushed Bronte pistachio kernels pressed gently into my surface. A single drizzle of aged Sicilian honey — amber, slow, warm. Three edible gold leaf fragments, placed with tweezers. I became more than food. I became an occasion.",
    side: "right",
    accent: "#c2a679",
    particle: "\u2605",
  },
  {
    id: "served",
    act: "Finale",
    title: "And then\nI met you.",
    body: "Scooped by hand. Placed on a freshly baked waffle cone — its ridges still warm. Carried to your table on cold marble. The moment your warmth touched mine, something irreversible began. I was made for exactly this. All those mountains, all that patience — arriving here, now, for you.",
    side: "left",
    accent: "#a3c9a8",
    particle: "\u2665",
  },
];

// ─── Floating Particles ──────────────────────────────────────────────────────
function FloatingParticles({ char, accent }: { char: string; accent: string }) {
  const particles = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute text-xl animate-float-particle opacity-0"
          style={{
            left: `${10 + ((i * 11) % 80)}%`,
            top: `${15 + ((i * 17) % 70)}%`,
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

// ─── Chapter Text Block ──────────────────────────────────────────────────────
function ChapterText({
  chapter,
  align = "left",
}: {
  chapter: (typeof chapters)[0];
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      {/* Accent line */}
      <div
        className="h-[1px] w-10 mb-5"
        style={{ background: chapter.accent + "70" }}
      />

      {/* Chapter title */}
      <h2
        className={`font-serif text-3xl md:text-5xl font-light leading-tight mb-5 uppercase tracking-wide ${
          align === "right" ? "text-right" : "text-left"
        }`}
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
        className="h-[1px] w-8 mb-5"
        style={{ background: chapter.accent + "40" }}
      />

      {/* Body text */}
      <p
        className={`font-sans text-xs md:text-sm text-brand-ivory/60 leading-relaxed font-light tracking-wide ${
          align === "right" ? "text-right" : "text-left"
        }`}
        style={{ maxWidth: "300px" }}
      >
        {chapter.body}
      </p>

      {/* Decorative quote mark */}
      <div
        className={`mt-6 font-serif text-5xl leading-none select-none ${
          align === "right" ? "self-end" : "self-start"
        }`}
        style={{ color: chapter.accent + "18" }}
      >
        {align === "right" ? "\u201d" : "\u201c"}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function IceCreamStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // RAF-based smooth video scrub
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // ── RAF loop: smoothly lerp video.currentTime → targetTime ──
    const tick = () => {
      const target = targetTimeRef.current;
      const current = currentTimeRef.current;
      const delta = target - current;
      const lerped = current + delta * 0.18;
      currentTimeRef.current = lerped;

      if (!isSeekingRef.current && Math.abs(delta) > 0.016) {
        isSeekingRef.current = true;
        if (typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(lerped);
          isSeekingRef.current = false;
        } else {
          video.currentTime = lerped;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
    };
    video.addEventListener("seeked", onSeeked);

    // Track only this component's own triggers for scoped cleanup
    const ownTriggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    const setup = () => {
      const dur = video.duration;
      if (!dur || isNaN(dur)) return;

      // ── Pin sticky panel + scrub video via scroll ──
      ownTriggers.push(
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: stickyRef.current,
          pinSpacing: false,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetTimeRef.current = self.progress * dur;
          },
        })
      );

      // ── Chapter activation triggers ──
      chapters.forEach((_chapter, i) => {
        const pct = (i / chapters.length) * 100;
        const pctEnd = ((i + 1) / chapters.length) * 100;
        ownTriggers.push(
          ScrollTrigger.create({
            trigger: container,
            start: `${pct}% top`,
            end: `${pctEnd}% top`,
            onEnter: () => setActiveChapter(i),
            onEnterBack: () => setActiveChapter(i),
          })
        );
      });

      // Recalculate all pin positions so Lenis proxy is accounted for
      ScrollTrigger.refresh();

      // Start the RAF scrub loop
      rafRef.current = requestAnimationFrame(tick);
    };

    video.preload = "auto";
    video.load();

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("seeked", onSeeked);
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
      {/* ── Sticky viewport ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Dynamic ambient background */}
        <div
          className="absolute inset-0 transition-all duration-1500 ease-in-out"
          style={{
            background: `
              radial-gradient(ellipse 55% 60% at 18% 50%, ${active.accent}07 0%, transparent 70%),
              radial-gradient(ellipse 55% 60% at 82% 50%, ${active.accent}05 0%, transparent 70%),
              radial-gradient(ellipse 70% 35% at 50% 95%, ${active.accent}06 0%, transparent 60%),
              #050505
            `,
          }}
        />

        {/* Floating particles */}
        <FloatingParticles char={active.particle} accent={active.accent} />

        {/* Grain overlay */}
        <div className="absolute inset-0 cinematic-texture opacity-[0.05] pointer-events-none z-10" />

        {/* Top vignette */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-brand-black to-transparent pointer-events-none z-10" />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-brand-black to-transparent pointer-events-none z-10" />

        {/* ── Fullscreen 16:9 video — fills the sticky viewport ── */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/final vid ice.mp4"
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* ── Text overlay — left or right side depending on chapter ── */}
        <div className="relative z-20 w-full h-full flex items-center px-8 md:px-20 pointer-events-none">
          <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center">

            {/* Left text panel */}
            <div
              className="w-[260px] md:w-[320px] transition-all duration-700 ease-out"
              style={{
                opacity: active.side === "left" ? 1 : 0,
                transform: `translateX(${active.side === "left" ? 0 : -24}px)`,
              }}
            >
              <ChapterText chapter={active} align="left" />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right text panel */}
            <div
              className="w-[260px] md:w-[320px] transition-all duration-700 ease-out"
              style={{
                opacity: active.side === "right" ? 1 : 0,
                transform: `translateX(${active.side === "right" ? 0 : 24}px)`,
              }}
            >
              <ChapterText chapter={active} align="right" />
            </div>
          </div>
        </div>

        {/* ── Bottom HUD ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-4">

          {/* Scroll cue */}
          <div className="flex flex-col items-center space-y-1 opacity-35">
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-brand-ivory">
              Scroll to continue
            </span>
            <div className="w-px h-6 bg-gradient-to-b from-brand-gold/50 to-transparent animate-pulse" />
          </div>
        </div>

        {/* ── Top-left: Act label ── */}
        <div className="absolute top-8 left-8 z-30">
          <span
            className="font-sans text-[10px] tracking-[0.5em] uppercase font-bold transition-colors duration-700"
            style={{ color: active.accent }}
          >
            {active.act}
          </span>
        </div>

        {/* ── Top-right: Chapter counter ── */}
        <div className="absolute top-8 right-8 z-30">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-ivory/25">
            {String(activeChapter + 1).padStart(2, "0")} /{" "}
            {String(chapters.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
