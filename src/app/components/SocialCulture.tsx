"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function SocialCulture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Slow items float upwards slightly relative to scroll
      gsap.fromTo(
        ".masonry-slow",
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Fast items float downwards slightly relative to scroll
      gsap.fromTo(
        ".masonry-fast",
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  const galleryItems = [
    {
      id: "item-1",
      type: "image",
      src: "/luxury_pistachio_scoop.png",
      alt: "Curated scoop of pistachio ice cream",
      title: "THE GOLD RATIO",
      speed: "masonry-slow",
      colSpan: "col-span-1 md:col-span-2",
      height: "h-[300px] md:h-[450px]",
    },
    {
      id: "item-2",
      type: "card",
      theme: "gold",
      text: "SENSORY COLD CULTURE",
      subtext: "A campaign of absolute purity and architectural frozen art.",
      handle: "@I-SCREAM.LUXURY",
      speed: "masonry-fast",
      colSpan: "col-span-1",
      height: "h-[300px] md:h-[450px]",
    },
    {
      id: "item-3",
      type: "image",
      src: "/luxury_folded_cream.png",
      alt: "Slow-churned velvet sweet cream textures",
      title: "THE CHURN VELOCITY",
      speed: "masonry-fast",
      colSpan: "col-span-1",
      height: "h-[300px] md:h-[350px]",
    },
    {
      id: "item-4",
      type: "image",
      src: "/luxury_pistachio_kernels.png",
      alt: "Sicilian volcanic pistachio kernels in stone bowl",
      title: "VOLCANIC HARVEST",
      speed: "masonry-slow",
      colSpan: "col-span-1",
      height: "h-[300px] md:h-[400px]",
    },
    {
      id: "item-5",
      type: "card",
      theme: "dark",
      quote: "“A frozen masterpiece of pure milk and volcanic frost. There is simply nothing like this on the planet.”",
      source: "— L'Éditorial Noir",
      speed: "masonry-slow",
      colSpan: "col-span-1",
      height: "h-[300px] md:h-[350px]",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-brand-black py-28 px-6 md:px-16 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Editorial Title */}
        <div className="text-center mb-24">
          <span className="font-sans text-[10px] tracking-[0.45em] text-brand-gold uppercase font-bold mb-4 block">
            The Digital Salon
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-brand-ivory tracking-[0.05em] uppercase">
            Made to be Remembered
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/30 mx-auto mt-6" />
        </div>

        {/* Animated Custom Masonry Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {galleryItems.map((item) => {
            if (item.type === "image") {
              return (
                <div
                  key={item.id}
                  className={`${item.colSpan} ${item.height} ${item.speed} relative rounded-2xl overflow-hidden glass-panel border border-white/5 group shadow-xl`}
                >
                  <div className="absolute inset-0 border border-brand-gold/10 rounded-2xl pointer-events-none z-10" />

                  {/* Image container with scale-zoom on hover */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.src!}
                      alt={item.alt!}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-[0.16, 1, 0.3, 1] group-hover:scale-110 brightness-[0.85] contrast-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Absolute Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                    <span className="font-sans text-[9px] tracking-[0.3em] text-brand-gold uppercase font-bold mb-2">
                      CAMPAIGN JOURNAL
                    </span>
                    <h3 className="text-xl font-light text-brand-ivory tracking-[0.1em] uppercase">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            } else {
              // Text Card Items
              return (
                <div
                  key={item.id}
                  className={`${item.colSpan} ${item.height} ${item.speed} flex flex-col justify-between p-8 md:p-10 rounded-2xl glass-panel border border-white/5 shadow-xl`}
                >
                  {item.theme === "gold" ? (
                    <>
                      {/* Social Logo */}
                      <div className="flex items-center justify-between">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-brand-gold"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.3em]">
                          CULTURE
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-2xl font-light text-brand-ivory tracking-[0.05em] uppercase mb-4 leading-tight">
                          {item.text}
                        </h3>
                        <p className="font-sans text-xs md:text-sm text-brand-ivory/60 leading-relaxed font-light tracking-[0.05em]">
                          {item.subtext}
                        </p>
                      </div>

                      {/* Footer handle */}
                      <a
                        href="#"
                        className="text-[10px] uppercase tracking-[0.2em] text-brand-pistachio font-bold hover:underline"
                      >
                        {item.handle}
                      </a>
                    </>
                  ) : (
                    <>
                      {/* Quote card */}
                      <div className="text-left flex flex-col justify-between h-full">
                        <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-6 block">
                          CRITIQUE
                        </span>

                        <p className="font-serif text-lg md:text-xl text-brand-ivory/80 italic leading-relaxed font-light mb-8">
                          {item.quote}
                        </p>

                        <span className="font-sans text-[10px] text-brand-gold uppercase tracking-[0.15em] font-semibold">
                          {item.source}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
