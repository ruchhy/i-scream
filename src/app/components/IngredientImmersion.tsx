"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldAlert } from "lucide-react";

export default function IngredientImmersion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    // Return smoothly to center when mouse leaves
    setMousePos({ x: 0, y: 0 });
  };

  const ingredients = [
    {
      id: "pistachio",
      title: "BRONTE PISTACHIO",
      subtitle: "The Emerald Seed",
      desc: "Cultivated on the mineral-rich slopes of Mount Etna. Hand-harvested only once every two years to maximize the concentration of natural essential oils, yielding an intense, buttery depth.",
      icon: Sparkles,
      color: "border-brand-pistachio/30 text-brand-pistachio",
      glow: "bg-brand-pistachio/5",
    },
    {
      id: "cream",
      title: "SLOW-CHURNED CREAM",
      subtitle: "The Velvet Base",
      desc: "Sourced from high-alpine organic pastures. Churned slowly at exactly four degrees Celsius for forty-eight hours to achieve a micro-crystalline texture that melts at skin temperature.",
      icon: Compass,
      color: "border-brand-ivory/30 text-brand-ivory",
      glow: "bg-brand-ivory/5",
    },
    {
      id: "ice",
      title: "CRYSTALLINE ICE",
      subtitle: "The Thermal Core",
      desc: "Micro-filtered artesian water frozen into microscopic geometric structures. Engineered to lock in natural cream notes while providing a crisp, cold structural finish.",
      icon: ShieldAlert,
      color: "border-brand-coldgreen/30 text-brand-coldgreen",
      glow: "bg-brand-coldgreen/5",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-brand-black flex flex-col items-center justify-center py-28 px-6 overflow-hidden select-none"
      style={
        {
          "--mx": `${mousePos.x}`,
          "--my": `${mousePos.y}`,
        } as any
      }
    >
      {/* Background Interactive Parallax Layers */}
      
      {/* Layer 1: Massive Pistachio Green Ambient Glow (Far Depth) */}
      <div
        className="absolute w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-brand-pistachio/8 blur-[100px] pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate(calc(var(--mx) * -0.04px - 20%), calc(var(--my) * -0.04px - 10%))`,
          top: "10%",
          left: "15%",
        }}
      />

      {/* Layer 2: Cool Teal Accent (Mid Depth) */}
      <div
        className="absolute w-[45vw] h-[45vw] max-w-[450px] rounded-full bg-brand-coldgreen/6 blur-[90px] pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate(calc(var(--mx) * 0.06px + 10%), calc(var(--my) * 0.06px + 10%))`,
          bottom: "15%",
          right: "10%",
        }}
      />

      {/* Layer 3: Warm Luxury Gold Speckle (Near Depth) */}
      <div
        className="absolute w-[35vw] h-[35vw] max-w-[350px] rounded-full bg-brand-gold/6 blur-[80px] pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate(calc(var(--mx) * -0.09px), calc(var(--my) * -0.09px - 20%))`,
          top: "30%",
          right: "20%",
        }}
      />

      {/* Grid overlay lines to add technical luxury editorial vibe */}
      <div className="absolute inset-0 cinematic-texture opacity-30 pointer-events-none z-0" />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        
        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="font-sans text-[10px] tracking-[0.45em] text-brand-gold uppercase font-bold mb-4 block">
            The Sensory Formula
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-brand-ivory tracking-[0.05em] uppercase">
            Inside the Experience
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/30 mx-auto mt-6" />
        </motion.div>

        {/* 3-Column Glassmorphism Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {ingredients.map((ing, idx) => {
            const Icon = ing.icon;
            return (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.15,
                }}
                className={`group relative flex flex-col justify-between p-8 md:p-10 rounded-2xl glass-panel border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default`}
                style={{
                  transform: `translate(calc(var(--mx) * ${
                    (idx - 1) * -0.02
                  }px), calc(var(--my) * ${(idx - 1) * -0.02}px))`,
                }}
              >
                {/* Background soft glowing card accent */}
                <div
                  className={`absolute -right-16 -top-16 w-36 h-36 rounded-full ${ing.glow} blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none`}
                />

                <div>
                  {/* Card Header & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-sans text-[10px] tracking-[0.3em] text-brand-gold font-bold">
                      0{idx + 1} / FORMULA
                    </span>
                    <div
                      className={`p-2.5 rounded-full border border-white/5 bg-white/5 ${ing.color} group-hover:scale-115 group-hover:bg-white/10 transition-all duration-300`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Product Profile Titles */}
                  <h3 className="text-2xl font-light text-brand-ivory tracking-[0.05em] uppercase mb-1">
                    {ing.title}
                  </h3>
                  <p className="font-serif text-xs text-brand-gold italic mb-6 tracking-[0.1em]">
                    {ing.subtitle}
                  </p>

                  {/* Narrative Body */}
                  <p className="font-sans text-xs md:text-sm text-brand-ivory/60 leading-relaxed font-light tracking-[0.05em] group-hover:text-brand-ivory/80 transition-colors duration-500">
                    {ing.desc}
                  </p>
                </div>

                {/* Card Subtle Bottom Border Accelerator */}
                <div className="w-full h-[2px] bg-white/5 mt-10 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-brand-pistachio group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
