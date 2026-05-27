"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Manifest {
  totalFrames: number;
  fps: number;
  duration: number;
  width: number;
  height: number;
}

export default function CanvasScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let manifest: Manifest;
    let frames: HTMLImageElement[] = [];
    let currentFrameIndex = -1;
    let targetFrameIndex = 0;
    let rafId: number;
    let loadedCount = 0;

    // ── Draw a specific frame index to canvas ──────────────────────────────
    const drawFrame = (index: number) => {
      const img = frames[index];
      if (!img?.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentFrameIndex = index;
    };

    // ── Resize canvas to match container ──────────────────────────────────
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (currentFrameIndex >= 0) drawFrame(currentFrameIndex);
    };

    // ── RAF loop: lerp toward target frame ────────────────────────────────
    const tick = () => {
      if (frames.length > 0) {
        const delta = targetFrameIndex - currentFrameIndex;
        if (Math.abs(delta) >= 0.5) {
          const next = Math.round(currentFrameIndex + delta * 0.2);
          const clamped = Math.max(0, Math.min(frames.length - 1, next));
          if (clamped !== currentFrameIndex && frames[clamped]?.complete) {
            drawFrame(clamped);
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // ── Set up ScrollTrigger after frames are ready ───────────────────────
    const setupScrollTrigger = () => {
      // Draw frame 0 immediately
      drawFrame(0);

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetFrameIndex = Math.min(
            Math.round(self.progress * (frames.length - 1)),
            frames.length - 1
          );
        },
      });

      // Chapter subtitle triggers
      const chapters = [
        { sel: ".chap-1", s: "2%",  m: "18%", e: "30%" },
        { sel: ".chap-2", s: "38%", m: "52%", e: "65%" },
        { sel: ".chap-3", s: "70%", m: "83%", e: "94%" },
      ];
      chapters.forEach(({ sel, s, m, e }) => {
        gsap.fromTo(sel,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out",
            scrollTrigger: { trigger: container, start: `${s} top`, end: `${m} top`, scrub: 0.8 } }
        );
        gsap.to(sel, { opacity: 0, y: -40, ease: "power2.in",
          scrollTrigger: { trigger: container, start: `${m} top`, end: `${e} top`, scrub: 0.8 } });
      });

      rafId = requestAnimationFrame(tick);
    };

    // ── Load all frames from public/frames/ ───────────────────────────────
    const loadFrames = (total: number) => {
      frames = Array(total).fill(null).map(() => new Image());

      // Batch load: load the first 60 frames immediately (above the fold),
      // then load the rest lazily so the page doesn't block on 633 requests
      const loadBatch = (start: number, end: number, onDone?: () => void) => {
        let done = 0;
        const batchSize = end - start;
        for (let i = start; i < end; i++) {
          const img = frames[i];
          const num = String(i + 1).padStart(4, "0");
          img.onload = () => {
            loadedCount++;
            done++;
            if (done === batchSize && onDone) onDone();
          };
          img.onerror = () => { done++; if (done === batchSize && onDone) onDone(); };
          img.src = `/frames/frame_${num}.jpg`;
        }
      };

      // Load first 30 frames, then set up scroll while rest load in background
      loadBatch(0, Math.min(30, total), () => {
        setupScrollTrigger();
        // Load remaining frames in background
        loadBatch(30, total);
      });
    };

    // ── Fetch manifest then start loading ─────────────────────────────────
    fetch("/frames/manifest.json")
      .then((r) => r.json())
      .then((data: Manifest) => {
        manifest = data;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        loadFrames(data.totalFrames);
      })
      .catch((e) => console.error("Failed to load manifest:", e));

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative h-[500vh] w-full bg-brand-black"
      data-lenis-prevent
    >
      {/* Sticky fullscreen panel */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — renders frames at 60fps */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "block" }}
        />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/55 pointer-events-none z-10" />
        <div className="absolute inset-0 cinematic-texture opacity-[0.06] pointer-events-none z-10" />

        {/* Chapter overlays */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none px-8 md:px-20">
          <div className="w-full max-w-7xl mx-auto">

            <div className="chap-1 opacity-0 max-w-sm">
              <span className="block font-sans text-[9px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">
                Chapter I
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-brand-ivory leading-none mb-5 uppercase tracking-wide">
                Pure<br />Ingredients
              </h2>
              <p className="font-sans text-xs text-brand-ivory/55 leading-relaxed tracking-wide font-light max-w-xs">
                Hand-selected Sicilian pistachios and slow-churned organic cream —
                a sensory foundation that knows no compromise.
              </p>
            </div>

            <div className="chap-2 opacity-0 max-w-sm ml-auto text-right mt-0">
              <span className="block font-sans text-[9px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">
                Chapter II
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-brand-ivory leading-none mb-5 uppercase tracking-wide">
                Cold<br />Craft
              </h2>
              <p className="font-sans text-xs text-brand-ivory/55 leading-relaxed tracking-wide font-light">
                Temperature, texture and density micro-balanced to
                sub-zero perfection.
              </p>
            </div>

            <div className="chap-3 opacity-0 max-w-sm mt-0">
              <span className="block font-sans text-[9px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">
                Chapter III
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-brand-ivory leading-none mb-5 uppercase tracking-wide">
                Sculpted<br />Flavor
              </h2>
              <p className="font-sans text-xs text-brand-ivory/55 leading-relaxed tracking-wide font-light max-w-xs">
                Frozen indulgence engineered through patience,
                artistry and craft.
              </p>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-2 pointer-events-none">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-brand-ivory/25">
            Scroll to direct the film
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-gold/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}
