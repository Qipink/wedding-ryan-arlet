"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Heart } from "lucide-react";

import CoverScreen from "../components/layout/CoverScreen";
import BackgroundMusic from "../components/ui/BackgroundMusic";
import Countdown from "../components/features/Countdown";
import GiftRegistry from "../components/features/GiftRegistry";
import RSVPForm from "../components/features/RSVPForm";
import WishBoard from "../components/sections/WishBoard";
import FallingParticles from "../components/ui/FallingParticles";

import FloatingNavbar from "../components/layout/FloatingNavbar";
import HeroSection from "../components/sections/HeroSection";
import MempelaiSection from "../components/sections/MempelaiSection";
import MilestoneSection from "../components/sections/MilestoneSection";
import DetailAcaraSection from "../components/sections/DetailAcaraSection";
import DresscodeSection from "../components/sections/DresscodeSection";
import GallerySection from "../components/sections/GallerySection";
import FooterSection from "../components/layout/FooterSection";
import Lightbox from "../components/ui/Lightbox";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  
  // Ref to block IntersectionObserver updates during programmatic smooth scrolls
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<any>(null);
  
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Interactive Lightbox Gallery state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useGSAP(() => {
    if (isUnlocked && mainContainerRef.current) {
      gsap.fromTo(mainContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [isUnlocked]);

  // Scroll spy effect using a robust scroll event listener
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sections = ["home", "acara", "gallery", "rsvp", "wish"];
      const referenceLine = 160; // 160px from top of viewport

      let activeId = "home";
      let lastPassedId: string | null = null;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= referenceLine) {
            lastPassedId = id;
          }
        }
      }

      if (lastPassedId) {
        activeId = lastPassedId;
      }

      // Special handling for the bottom of the page:
      // If we are scrolled near the absolute bottom, activate the wish tab if visible,
      // but keep RSVP active if Wish is still mostly off-screen.
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom && lastPassedId === "rsvp") {
        const wishEl = document.getElementById("wish");
        if (wishEl) {
          const wishRect = wishEl.getBoundingClientRect();
          if (wishRect.top < window.innerHeight * 0.7) {
            activeId = "wish";
          }
        }
      }

      setActiveTab(activeId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount/unlock to initialize the correct tab
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isUnlocked]);

  const handleOpenInvitation = () => {
    setIsUnlocked(true);
    setMusicTrigger(true);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    isScrollingRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <div suppressHydrationWarning className="bg-brand-bg text-brand-text min-h-screen relative font-sans overflow-x-hidden selection:bg-brand-secondary-fixed">
      {/* Cover Screen Overlay */}
      <CoverScreen onOpen={handleOpenInvitation} />

      {/* Floating Background Music Player */}
      <BackgroundMusic playTrigger={musicTrigger} />

      {/* Main Container */}
      {isUnlocked && (
        <div ref={mainContainerRef} style={{ opacity: 0 }}>
            {/* Whimsical Falling Particles Background */}
            <FallingParticles />

            {/* Floating Bottom Navigation Bar */}
            <FloatingNavbar activeTab={activeTab} scrollToSection={scrollToSection} />

            {/* Custom Whimsical Particles Background & Shapes */}
            <div className="absolute top-[10%] left-[5%] text-brand-secondary opacity-40 doodle-float z-0 pointer-events-none">
              <Heart className="w-10 h-10 fill-brand-secondary" />
            </div>
            <div className="absolute top-[35%] right-[5%] text-brand-primary opacity-30 doodle-float z-0 pointer-events-none" style={{ animationDelay: "-2s" }}>
              <span className="text-4xl">★</span>
            </div>
            <div className="absolute top-[65%] left-[8%] text-brand-secondary opacity-40 doodle-float z-0 pointer-events-none" style={{ animationDelay: "-1s" }}>
              <Heart className="w-12 h-12 fill-brand-secondary" />
            </div>
            <div className="absolute top-[82%] right-[8%] text-brand-primary opacity-30 doodle-float z-0 pointer-events-none" style={{ animationDelay: "-3s" }}>
              <span className="text-5xl">✦</span>
            </div>

            {/* MAIN CONTAINER FIXED WIDTH LIMIT FOR WHIMSICAL INTIMACY */}
            <main className="max-w-[800px] mx-auto px-6 relative z-10">
              
              <HeroSection />
              <MempelaiSection />
              <MilestoneSection />
              <Countdown />
              <DetailAcaraSection />
              <DresscodeSection />
              <GallerySection setLightboxIndex={setLightboxIndex} />

              {/* RSVP SECTION */}
              <section className="py-16 scroll-mt-24 border-t border-brand-outline-variant/20" id="rsvp">
                <header className="text-center mb-10">
                  <span className="text-3xl mb-1 block">✉</span>
                  <h2 className="font-script text-4xl text-brand-primary font-bold">
                    Konfirmasi Kehadiran
                  </h2>
                  <p className="font-sans text-xs text-brand-outline uppercase tracking-widest mt-1.5">
                    Silakan isi form RSVP di bawah ini
                  </p>
                  <div className="scribble-line mt-6"></div>
                </header>

                {/* RSVP Form Component */}
                <RSVPForm />

                {/* Digital Gift Drawer Registry */}
                <GiftRegistry />
              </section>

              {/* WISHES SECTION */}
              <WishBoard />

              {/* Decorative Ending Emblem */}
              <div className="flex justify-center py-12">
                <img
                  className="w-52 h-auto opacity-70 select-none pointer-events-none"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa6KE2qVKZahqkAH5BxzIy4IGSnH9kN6DLZ-SPyOIwmcwg1RtFctZfRnlQ11sURw5DeF-xFyPbXgvnhPbrK2-1HObTKN8PDOZpHDPL3pK1clKG_iB0iERbAmLHNSRClnn2RNqfKwG-6M-tNxpfGr4KlNk65yh1QHX5lPAh4H8RB9gznqvs6NADZz5LPYkS17XSGZYQ-6wEBYYQuk2W1KSsFZvHNVsxjeq4Le-MaSGXy0hq_Rgb7sKhbDsY5SD_wXmAw-727iQ9nZA"
                  alt="Ending Flower Ring"
                  referrerPolicy="no-referrer"
                />
              </div>

            </main>

            {/* Checkerboard Pattern Divider */}
            <div className="w-full h-6 checkerboard-divider opacity-15"></div>

            <FooterSection />
        </div>
      )}

      {/* FULL SCREEN PHOTO LIGHTBOX PREVIEWER */}
      <Lightbox lightboxIndex={lightboxIndex} setLightboxIndex={setLightboxIndex} />
    </div>
  );
}
