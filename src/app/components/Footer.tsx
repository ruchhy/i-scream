"use client";

import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-black border-t border-white/5 py-20 px-6 md:px-16 select-none z-10 relative">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-start mb-16">
        
        {/* Column 1: Brand details */}
        <div className="flex flex-col items-start space-y-6">
          <a
            href="#"
            className="font-serif text-2xl font-light tracking-[0.2em] text-brand-ivory hover:text-brand-pistachio transition-colors duration-500 uppercase"
          >
            I-SCREAM
          </a>
          <p className="font-sans text-[11px] text-brand-ivory/40 uppercase tracking-[0.15em] leading-relaxed">
            Curating high-contrast sensory cold culture. Churned at volcanic standards for the digital palate.
          </p>
          <span className="text-[10px] text-brand-gold uppercase tracking-[0.1em] font-semibold">
            EST. 2026 / SICILY
          </span>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm text-brand-gold uppercase tracking-[0.1em] mb-2">
            DIRECTORY
          </h4>
          <nav className="flex flex-col space-y-2.5 text-[11px] uppercase tracking-[0.2em] font-medium text-brand-ivory/50">
            <a href="#experience" className="hover:text-brand-pistachio transition-colors duration-300">
              Experience
            </a>
            <a href="#flavors" className="hover:text-brand-pistachio transition-colors duration-300">
              Curated Flavors
            </a>
            <a href="#story" className="hover:text-brand-pistachio transition-colors duration-300">
              The Story
            </a>
          </nav>
        </div>

        {/* Column 3: Social & Culture */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm text-brand-gold uppercase tracking-[0.1em] mb-2">
            THE SALON
          </h4>
          <div className="flex items-center space-x-5 text-brand-ivory/50">
            <a
              href="#"
              aria-label="Follow us on Instagram"
              className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:text-brand-pistachio hover:scale-105 transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Follow us on Twitter"
              className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:text-brand-pistachio hover:scale-105 transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 4: Newsletter subscribe */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm text-brand-gold uppercase tracking-[0.1em] mb-2">
            SUBSCRIBE TO RELEASES
          </h4>
          <p className="font-sans text-[10px] text-brand-ivory/40 uppercase tracking-[0.1em] mb-2 leading-relaxed">
            Gain immediate access to limited volcanic collections and secret flavor drops.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex items-center relative"
          >
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="w-full bg-white/3 border border-white/5 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-ivory focus:outline-none focus:border-brand-pistachio/50 placeholder:text-brand-ivory/30 transition-all duration-300"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-2 p-2 rounded-full bg-brand-ivory text-brand-black hover:bg-brand-pistachio hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="w-full max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-brand-ivory/30 space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} I-SCREAM SRL. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-brand-ivory transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand-ivory transition-colors duration-300">
            Terms of Indulgence
          </a>
        </div>
      </div>
    </footer>
  );
}
