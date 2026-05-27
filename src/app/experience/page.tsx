import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import CanvasScrubber from "@/app/components/CanvasScrubber";
import IngredientImmersion from "@/app/components/IngredientImmersion";
import FlavorShowcase from "@/app/components/FlavorShowcase";
import BrandStory from "@/app/components/BrandStory";
import SocialCulture from "@/app/components/SocialCulture";
import FinalCTA from "@/app/components/FinalCTA";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "I-SCREAM | The Cinematic Experience",
  description:
    "A scroll-driven cinematic film experience. Watch luxury pistachio ice cream crafted frame by frame, directed by your scroll.",
};

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-brand-black">
        <Hero />
        {/* Canvas frame-sequence scrubber — true 60fps */}
        <CanvasScrubber />
        <IngredientImmersion />
        <FlavorShowcase />
        <BrandStory />
        <SocialCulture />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
