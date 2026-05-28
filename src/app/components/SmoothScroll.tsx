"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module level — safe in Next.js client components
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    // ─── Critical bridge: tell ScrollTrigger to read from Lenis ───────────────
    // Without this, ScrollTrigger uses raw window.scrollY which Lenis overrides,
    // so pinned sections and scrub animations never fire.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    // Keep ScrollTrigger in sync with every Lenis scroll event
    lenis.on("scroll", () => ScrollTrigger.update());

    // Drive Lenis through GSAP's RAF so timing is unified
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after setup so it recalculates all pin positions
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as any);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
