"use client";

import { motion as framerMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative min-h-[90vh] w-full bg-brand-black flex flex-col items-center justify-center text-center px-6 overflow-hidden select-none"
    >
      {/* Dynamic Background Spotlights */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Pistachio soft pulsing highlight */}
        <div className="w-[70vw] h-[70vw] max-w-[600px] rounded-full bg-brand-pistachio/5 blur-[120px] animate-pulse absolute -top-1/4" style={{ animationDuration: "10s" }} />
        {/* Cold green soft pulsing highlight */}
        <div className="w-[60vw] h-[60vw] max-w-[500px] rounded-full bg-brand-coldgreen/5 blur-[110px] animate-pulse absolute -bottom-1/4" style={{ animationDuration: "12s" }} />
      </div>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 cinematic-texture opacity-20 pointer-events-none z-0" />

      {/* Central Content Column */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        
        {/* Small gold sparkle indicator */}
        <framerMotion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="p-3 rounded-full border border-brand-gold/20 bg-brand-gold/5 text-brand-gold mb-10"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </framerMotion.div>

        {/* Cinematic Title Reveal */}
        <framerMotion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-[8rem] font-light leading-none tracking-[0.1em] uppercase text-brand-ivory mb-12"
        >
          Taste the <br />
          <span className="font-sans italic text-brand-pistachio font-light tracking-[0.05em]">Impossible.</span>
        </framerMotion.h2>

        {/* Sub-narrative copy */}
        <framerMotion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans text-xs md:text-sm tracking-[0.25em] text-brand-ivory/60 uppercase max-w-md mb-16 leading-relaxed font-light"
        >
          Limited seasonal collections. Churned to order under raw volcanic standards.
        </framerMotion.p>

        {/* Premium Call to Action */}
        <framerMotion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <a
            href="#"
            className="group px-10 py-5 rounded-full bg-brand-ivory text-brand-black text-xs uppercase tracking-[0.3em] font-bold flex items-center space-x-4 hover:bg-brand-pistachio hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-brand-pistachio/10"
          >
            <span>Shop Collection</span>
            <div className="p-1 rounded-full bg-brand-black/5 group-hover:bg-brand-black/10 group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-brand-black" />
            </div>
          </a>
        </framerMotion.div>

      </div>
    </section>
  );
}
