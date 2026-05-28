"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Register at module level — avoids double-registration issues
gsap.registerPlugin(ScrollTrigger);

export default function FlavorShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const flavors = [
    {
      id: "pistachio",
      name: "SIGNATURE PISTACHIO",
      subtitle: "Vera Bronte",
      desc: "An earthy, emerald-green symphony of slow-roasted Sicilian pistachios, double-churned milk, and cold gold cream highlights.",
      bgAccent: "bg-brand-pistachio/10",
      borderAccent: "border-brand-pistachio/30",
      textColor: "text-brand-pistachio",
      glowColor: "shadow-brand-pistachio/5",
      num: "01",
    },
    {
      id: "chocolate",
      name: "DARK CHOCOLATE TENEBRIS",
      subtitle: "Cacao Origin",
      desc: "Seventy-two percent Single-Origin Ecuadorian dark cacao micro-blended with shaved raw organic dark chocolate flakes and premium mineral sea salt.",
      bgAccent: "bg-brand-gold/10",
      borderAccent: "border-brand-gold/20",
      textColor: "text-brand-gold",
      glowColor: "shadow-brand-gold/5",
      num: "02",
    },
    {
      id: "vanilla",
      name: "VANILLA GOLD AUREUM",
      subtitle: "Madagascar Reserve",
      desc: "Double-extracted Bourbon vanilla bean caviar speckled with twenty-four karat edible organic gold leaf sheets.",
      bgAccent: "bg-brand-ivory/10",
      borderAccent: "border-brand-ivory/20",
      textColor: "text-brand-ivory",
      glowColor: "shadow-brand-ivory/5",
      num: "03",
    },
    {
      id: "berry",
      name: "BERRY FROST GLACIES",
      subtitle: "Arctic Infusion",
      desc: "Nordic wild blackberries and organic cold-pressed elderberries frozen in crystalline organic sugar cane suspension.",
      bgAccent: "bg-brand-coldgreen/10",
      borderAccent: "border-brand-coldgreen/20",
      textColor: "text-brand-coldgreen",
      glowColor: "shadow-brand-coldgreen/5",
      num: "04",
    },
  ];

  useGSAP(
    () => {
      const row = rowRef.current;
      const desktop = desktopRef.current;
      if (!row || !desktop) return;

      // Re-measure on every run (handles SSR/hydration timing)
      const scrollWidth = row.scrollWidth;
      const viewportWidth = window.innerWidth;
      const amountToScroll = scrollWidth - viewportWidth;

      if (amountToScroll > 0) {
        gsap.to(row, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: desktop,
            scroller: document.documentElement, // match the Lenis scrollerProxy target
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Refresh after creation so Lenis proxy positions are recalculated
        ScrollTrigger.refresh();
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} id="flavors" className="relative w-full bg-brand-black select-none">
      
      {/* 1. DESKTOP & MOBILE: Elegant Pinned Horizontal Scroll */}
      <div ref={desktopRef} className="relative h-[180vh] w-full">
        {/* Sticky frame containing translation row */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-brand-black">
          
          {/* Section title + centred hint */}
          <div className="px-16 max-w-7xl mx-auto w-full mb-6 flex flex-col items-center text-center z-10">
            <div className="mb-6">
              <span className="font-sans text-[10px] tracking-[0.45em] text-brand-gold uppercase font-bold mb-3 block">
                The Master Collection
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-brand-ivory tracking-[0.05em] uppercase leading-none">
                CURATED FLAVORS
              </h2>
            </div>
            <button
              onClick={() => {
                // Scroll down by one viewport height to advance the pinned GSAP scroll
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
              }}
              className="group flex items-center space-x-2 font-sans text-xs text-brand-ivory/40 uppercase tracking-[0.2em] hover:text-brand-gold transition-colors duration-300 cursor-pointer"
            >
              <span>Scroll to navigate</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Row container holding sliding cards */}
          <div
            ref={rowRef}
            className="flex items-stretch space-x-12 px-[10vw] w-max h-[55vh]"
          >
            {flavors.map((flavor) => (
              <div
                key={flavor.id}
                className={`w-[450px] flex flex-col justify-between p-10 rounded-3xl glass-panel border ${flavor.borderAccent} shadow-2xl ${flavor.glowColor} group transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 relative overflow-hidden`}
              >
                {/* Background light spot aura */}
                <div
                  className={`absolute -right-20 -top-20 w-48 h-48 rounded-full ${flavor.bgAccent} blur-3xl group-hover:scale-150 transition-transform duration-750 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-end mb-8">
                    <Sparkles className={`w-4 h-4 ${flavor.textColor} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>

                  <h3 className="text-3xl font-light text-brand-ivory tracking-[0.05em] uppercase mb-1">
                    {flavor.name}
                  </h3>
                  <p className="font-serif text-xs text-brand-gold italic mb-8 tracking-[0.05em]">
                    {flavor.subtitle}
                  </p>

                  <p className="font-sans text-sm text-brand-ivory/60 leading-relaxed font-light tracking-[0.05em] group-hover:text-brand-ivory/80 transition-colors duration-500">
                    {flavor.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-10 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-brand-ivory uppercase group-hover:text-brand-pistachio transition-colors duration-300">
                    Reserve Collection
                  </span>
                  <div className={`p-2 rounded-full border border-white/5 bg-white/5 ${flavor.textColor} group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
