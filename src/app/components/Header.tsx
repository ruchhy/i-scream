"use client";

import { useRef } from "react";

export default function Header() {
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl"
      style={{ zIndex: 999 }}
    >
      {/* Inner wrapper: handles Y slide + opacity via JS */}
      <div
        ref={innerRef}
        style={{
          transform: "translateY(-50px)",
          opacity: 0,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          willChange: "transform, opacity",
          animation: "navEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        }}
      >
        <div className="glass-nav px-6 py-4 rounded-full grid grid-cols-3 items-center shadow-2xl shadow-black/50">
          {/* Brand Logo — left */}
          <a
            href="/"
            className="font-serif text-2xl font-light tracking-[0.15em] text-brand-ivory hover:text-brand-pistachio transition-colors duration-500 uppercase select-none"
          >
            I-SCREAM
          </a>

          {/* Navigation Links — centre column */}
          <nav className="hidden md:flex justify-center items-center space-x-10 text-xs uppercase tracking-[0.25em] font-medium text-brand-ivory/70">
            {[
              { label: "Experience", href: "#experience" },
              { label: "Story",      href: "#story"      },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-brand-pistachio transition-colors duration-300 relative group"
              >
                {label}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-brand-pistachio transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA — right */}
          <div className="flex justify-end">
            <a
              href="#cta"
              className="px-5 py-2.5 rounded-full bg-brand-ivory text-brand-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-pistachio hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            >
              Order Craft
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
