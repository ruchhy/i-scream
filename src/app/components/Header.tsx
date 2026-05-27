"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Header() {
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const hidden = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) {
        // Always show near top
        if (hidden.current) {
          headerRef.current?.style.setProperty("transform", "translate(-50%, 0)");
          headerRef.current?.style.setProperty("opacity", "1");
          hidden.current = false;
        }
      } else if (delta > 5 && !hidden.current) {
        // Scrolling DOWN — hide navbar
        headerRef.current?.style.setProperty("transform", "translate(-50%, -120%)");
        headerRef.current?.style.setProperty("opacity", "0");
        hidden.current = true;
      } else if (delta < -5 && hidden.current) {
        // Scrolling UP — reveal navbar
        headerRef.current?.style.setProperty("transform", "translate(-50%, 0)");
        headerRef.current?.style.setProperty("opacity", "1");
        hidden.current = false;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={headerRef}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl"
      style={{
        zIndex: 999,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        willChange: "transform, opacity",
      }}
    >
      <div className="glass-nav px-6 py-4 rounded-full flex items-center justify-between shadow-2xl shadow-black/50">
        {/* Brand Logo */}
        <a
          href="/"
          className="font-serif text-2xl font-light tracking-[0.15em] text-brand-ivory hover:text-brand-pistachio transition-colors duration-500 uppercase select-none"
        >
          I-SCREAM
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.25em] font-medium text-brand-ivory/70">
          {[
            { label: "Experience", href: "#experience" },
            { label: "Flavors",    href: "#flavors"    },
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

        {/* CTA */}
        <a
          href="#cta"
          className="px-5 py-2.5 rounded-full bg-brand-ivory text-brand-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-pistachio hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
        >
          Order Craft
        </a>
      </div>
    </motion.div>
  );
}
