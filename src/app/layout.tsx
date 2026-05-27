import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScroll from "@/app/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "I-SCREAM | Luxury Crafted Frozen Indulgence",
  description:
    "Indulge in a premium cinematic sensory experience with I-SCREAM. Crafted from hand-selected pistachios, rich slow-churned cream, and sculpted to pure, cold perfection.",
  metadataBase: new URL("https://i-scream.luxury"),
  openGraph: {
    title: "I-SCREAM | Luxury Crafted Frozen Indulgence",
    description:
      "Indulge in a premium cinematic sensory experience with I-SCREAM. Crafted from hand-selected pistachios, rich slow-churned cream, and sculpted to pure, cold perfection.",
    url: "https://i-scream.luxury",
    siteName: "I-SCREAM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I-SCREAM | Luxury Crafted Frozen Indulgence",
    description:
      "Indulge in a premium cinematic sensory experience with I-SCREAM. Crafted from hand-selected pistachios, rich slow-churned cream, and sculpted to pure, cold perfection.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-brand-black text-brand-ivory antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-brand-pistachio selection:text-brand-black overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
