import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import VideoScrubber from "@/app/components/VideoScrubber";
import IceCreamStory from "@/app/components/IceCreamStory";
import IngredientImmersion from "@/app/components/IngredientImmersion";
import FlavorShowcase from "@/app/components/FlavorShowcase";
import BrandStory from "@/app/components/BrandStory";
import SocialCulture from "@/app/components/SocialCulture";
import FinalCTA from "@/app/components/FinalCTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      {/* Floating Glass Navigation Header */}
      <Header />

      {/* Main Story-driven Content Track */}
      <main className="flex-1 flex flex-col bg-brand-black">
        {/* Intro Hero Section */}
        <Hero />

        {/* Scroll-driven Video Scrubbing & Story Subtitles */}
        <VideoScrubber />

        {/* Cinematic Ice Cream Origin Story — scroll-pinned with evolving cone */}
        <IceCreamStory />

        {/* Mouse Parallax Ingredient Interactive Showcase */}
        <IngredientImmersion />

        {/* Pinned Horizontal Flavor Carousel (Responsive Stacked on mobile) */}
        <FlavorShowcase />

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
