"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Elegant clip-path reveal of the brand image
      gsap.fromTo(
        imageWrapperRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.1,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1, // tied to scroll speed
          },
        }
      );

      // Staggered text reveals for headings and paragraph
      gsap.fromTo(
        ".story-reveal-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-reveal-text",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen w-full bg-brand-black flex items-center py-28 px-6 md:px-16 overflow-hidden select-none"
    >
      {/* Editorial grid layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left Column: Narrative Copy */}
        <div className="flex flex-col items-start text-left">
          <span className="story-reveal-text opacity-0 font-sans text-[10px] tracking-[0.45em] text-brand-gold uppercase font-bold mb-4">
            The Philosophy
          </span>
          
          <h2 className="story-reveal-text opacity-0 text-4xl md:text-6xl font-light text-brand-ivory tracking-[0.05em] uppercase mb-10 leading-tight">
            More Than <br className="hidden md:block" />
            <span className="font-serif italic font-light text-brand-pistachio">Ice Cream.</span>
          </h2>

          <div className="story-reveal-text opacity-0 w-16 h-[1px] bg-brand-gold/40 mb-10" />

          <p className="story-reveal-text opacity-0 font-sans text-sm md:text-base text-brand-ivory/70 leading-relaxed font-light tracking-[0.05em] mb-8 max-w-lg">
            We believe frozen desserts are not merely foods, but premium sensory mediums designed to deliver profound culinary emotional resonance. I-SCREAM represents the intersection of sub-zero laboratory science and fine culinary artistry.
          </p>

          <p className="story-reveal-text opacity-0 font-sans text-sm md:text-base text-brand-ivory/60 leading-relaxed font-light tracking-[0.05em] mb-12 max-w-lg">
            Every layer is sculpted around meticulous thermal engineering. We balance density, butterfat melting points, and micro-crystalline ice suspensions so that each flavor opens like a high-end fragrance on the palate. A delicate sequence of earth, sugar, and frost.
          </p>

          {/* Luxury Editorial Mini Bullet Rows */}
          <div className="story-reveal-text opacity-0 w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
            <div>
              <h4 className="font-serif text-sm text-brand-gold uppercase tracking-[0.1em] mb-2">
                MICRO CHURNED
              </h4>
              <p className="text-[10px] text-brand-ivory/50 uppercase tracking-[0.1em]">
                Sub-zero density calibration
              </p>
            </div>
            <div>
              <h4 className="font-serif text-sm text-brand-gold uppercase tracking-[0.1em] mb-2">
                RAW ECOLOGY
              </h4>
              <p className="text-[10px] text-brand-ivory/50 uppercase tracking-[0.1em]">
                100% volcanic-soil botanicals
              </p>
            </div>
            <div>
              <h4 className="font-serif text-sm text-brand-gold uppercase tracking-[0.1em] mb-2">
                SCULPTED FINISH
              </h4>
              <p className="text-[10px] text-brand-ivory/50 uppercase tracking-[0.1em]">
                Skin-melting temperature points
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Image Reveal Frame */}
        <div className="w-full flex justify-center">
          <div
            ref={imageWrapperRef}
            className="relative w-full h-[60vh] md:h-[75vh] max-w-lg rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            {/* Elegant thin gold border */}
            <div className="absolute inset-0 border border-brand-gold/15 rounded-2xl pointer-events-none z-10" />
            
            <Image
              src="/luxury_folded_cream.png"
              alt="Meticulously folded organic sweet cream textures"
              fill
              className="object-cover brightness-90 contrast-110 pointer-events-none scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Visual gradient overlay filters */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-brand-black/20 pointer-events-none z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
