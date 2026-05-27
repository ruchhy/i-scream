"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-brand-black overflow-hidden select-none">
      {/* Background Soft Spotlight */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-brand-pistachio/5 blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
      </div>

      {/* Floating Cinematic Studio Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden"
          style={{ maskImage: "radial-gradient(circle, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)" }}
        >
          <Image
            src="/luxury_pistachio_scoop.png"
            alt="I-SCREAM Luxury Pistachio Cream Scoop"
            fill
            className="object-cover brightness-75 contrast-125"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Hero Content Panel */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-sans text-[10px] md:text-xs uppercase tracking-[0.45em] text-brand-gold mb-6 font-bold"
        >
          An Indulgence of the Senses
        </motion.p>

        {/* Title */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="font-serif text-7xl md:text-[10rem] font-light leading-none tracking-[0.12em] text-brand-ivory"
          >
            I-SCREAM
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] text-brand-ivory/60 max-w-md font-light leading-relaxed uppercase"
        >
          Luxury crafted frozen indulgence.
        </motion.p>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-brand-ivory/40 group-hover:text-brand-pistachio transition-colors duration-300 mb-3">
          Scroll to Begin
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full glass-panel-light group-hover:bg-brand-pistachio/10 group-hover:border-brand-pistachio/30 transition-all duration-300"
        >
          <ArrowDown className="w-4 h-4 text-brand-gold group-hover:text-brand-pistachio transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
