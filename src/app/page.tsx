import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import IceCreamStory from "@/app/components/IceCreamStory";
import IngredientImmersion from "@/app/components/IngredientImmersion";
import BrandStory from "@/app/components/BrandStory";
import SocialCulture from "@/app/components/SocialCulture";
import FinalCTA from "@/app/components/FinalCTA";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "I-SCREAM | The Cinematic Experience",
  description:
    "A scroll-driven cinematic film experience. Watch luxury pistachio ice cream crafted frame by frame, directed by your scroll.",
};

export default function Home() {
  return (
    <>
      {/* Floating Glass Navigation Header */}
      <Header />

      {/* Main Story-driven Content Track */}
      <main className="flex-1 flex flex-col bg-brand-black">
        {/* Intro Hero Section */}
        <Hero />

        {/* Cinematic Ice Cream Origin Story — scroll-pinned with evolving video */}
        <IceCreamStory />

        {/* Mouse Parallax Ingredient Interactive Showcase */}
        <IngredientImmersion />

        {/* Editorial split-grid brand vision */}
        <BrandStory />

        {/* Multi-speed scroll parallax campaign and quote masonry */}
        <SocialCulture />

        {/* Grand sensory final reveal & action */}
        <FinalCTA />
      </main>

      {/* Luxury minimalist directory footer */}
      <Footer />
    </>
  );
}
