"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // These refs are written by GSAP and read by the RAF loop — no React re-renders
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // ─── RAF LOOP ─────────────────────────────────────────────────────────────
    // Runs at 60fps. Smoothly lerps currentTime toward targetTime.
    // Skips the seek if the video is already seeking (prevents queue buildup).
    const tick = () => {
      const target = targetTimeRef.current;
      const current = currentTimeRef.current;
      const delta = target - current;

      // Lerp factor: 0.12 = silky smooth, 0.25 = snappier
      const lerped = current + delta * 0.18;
      currentTimeRef.current = lerped;

      // Only issue a seek if:
      // 1. We're not already mid-seek (avoids seek queue pileup)
      // 2. The difference is at least 1 video frame (1/60s ≈ 0.016s)
      if (!isSeekingRef.current && Math.abs(delta) > 0.016) {
        isSeekingRef.current = true;

        // fastSeek() is less precise but much faster — ideal for scrubbing
        if (typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(lerped);
          isSeekingRef.current = false; // fastSeek is synchronous-ish
        } else {
          video.currentTime = lerped;
          // isSeekingRef reset in the 'seeked' event below
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // ─── SCROLL TRIGGER ───────────────────────────────────────────────────────
    const setup = () => {
      const dur = video.duration;
      if (!dur || isNaN(dur)) return;
      durationRef.current = dur;

      // GSAP scrub:0.5 smooths the progress value itself so we never get
      // chunky scroll-event spikes feeding directly into the seek queue
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Write target — the RAF loop will smoothly chase this value
          targetTimeRef.current = self.progress * dur;
        },
      });

      // Chapter subtitle triggers — tied to the same container
      const chapters = [
        { sel: ".chap-1", start: "2%",  mid: "20%", end: "33%" },
        { sel: ".chap-2", start: "38%", mid: "52%", end: "65%" },
        { sel: ".chap-3", start: "70%", mid: "82%", end: "94%" },
      ];
      chapters.forEach(({ sel, start, mid, end }) => {
        gsap.fromTo(sel,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: `${start} top`,
              end: `${mid} top`,
              scrub: 0.8,
            },
          }
        );
        gsap.to(sel, {
          opacity: 0, y: -40,
          ease: "power2.in",
          scrollTrigger: {
            trigger: container,
            start: `${mid} top`,
            end: `${end} top`,
            scrub: 0.8,
          },
        });
      });

      // Start the RAF loop
      rafRef.current = requestAnimationFrame(tick);
    };

    // 'seeked' fires when the browser finishes decoding a requested frame
    const onSeeked = () => { isSeekingRef.current = false; };
    video.addEventListener("seeked", onSeeked);

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    // Force browser to buffer the entire file for keyframe-fast seeking
    video.preload = "auto";
    video.load();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("seeked", onSeeked);
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
      {/* ── Sticky fullscreen panel ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Fullscreen scrubbed video */}
        <video
          ref={videoRef}
          src="/final vid ice.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/55 via-transparent to-brand-black/55 pointer-events-none z-10" />

        {/* Subtle grain texture */}
        <div className="absolute inset-0 cinematic-texture opacity-[0.08] pointer-events-none z-10" />

        {/* ── Chapter text overlays ── */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none px-8 md:px-20">
          <div className="w-full max-w-7xl mx-auto">

            {/* Chapter 1 — left */}
            <div className="chap-1 opacity-0 max-w-xs md:max-w-sm">
              <span className="block font-sans text-[9px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">
                Chapter I
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-brand-ivory leading-none mb-5 uppercase tracking-wide">
                Pure<br />Ingredients
              </h2>
              <p className="font-sans text-xs text-brand-ivory/55 leading-relaxed tracking-wide font-light max-w-xs">
                Hand-selected Sicilian pistachios and slow-churned organic cream.
                A sensory foundation that knows no compromise.
              </p>
            </div>

            {/* Chapter 2 — right */}
            <div className="chap-2 opacity-0 max-w-xs md:max-w-sm ml-auto text-right mt-0">
              <span className="block font-sans text-[9px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">
                Chapter II
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-brand-ivory leading-none mb-5 uppercase tracking-wide">
                Cold<br />Craft
              </h2>
              <p className="font-sans text-xs text-brand-ivory/55 leading-relaxed tracking-wide font-light">
                Temperature, texture and density micro-balanced to sub-zero
                perfection.
              </p>
            </div>

            {/* Chapter 3 — left */}
            <div className="chap-3 opacity-0 max-w-xs md:max-w-sm mt-0">
              <span className="block font-sans text-[9px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">
                Chapter III
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-brand-ivory leading-none mb-5 uppercase tracking-wide">
                Sculpted<br />Flavor
              </h2>
              <p className="font-sans text-xs text-brand-ivory/55 leading-relaxed tracking-wide font-light max-w-xs">
                Frozen indulgence engineered through patience, artistry and
                craft.
              </p>
            </div>

          </div>
        </div>

        {/* Scroll hint at bottom */}
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
