import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  Info,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Home,
  Image,
  Mail,
  MessageSquare
} from "lucide-react";

import { galleryImages } from "./utils/galleryData";

import CoverScreen from "./components/CoverScreen";
import BackgroundMusic from "./components/BackgroundMusic";
import Countdown from "./components/Countdown";
import GiftRegistry from "./components/GiftRegistry";
import RSVPForm from "./components/RSVPForm";
import WishBoard from "./components/WishBoard";
import FallingParticles from "./components/FallingParticles";
import ParallaxImage from "./components/ParallaxImage";
import MapProviderSelector from "./components/MapProviderSelector";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  
  // Ref to block IntersectionObserver updates during programmatic smooth scrolls
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<any>(null);
  
  // Interactive Lightbox Gallery state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Dresscode tips state
  const [selectedDressColor, setSelectedDressColor] = useState<string | null>(null);

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

  const dresscodeColors = [
    { name: "Sage Green", value: "#818263", desc: "Warna utama sage green yang memberikan nuansa asri, sejuk, dan alami." },
    { name: "Soft Olive", value: "#5d5e38", desc: "Warna zaitun lembut untuk paduan elegan yang menyatu dengan alam." },
    { name: "Terracotta", value: "#e2bfb3", desc: "Sentuhan warna tanah liat yang hangat dan klasik." },
    { name: "Warm Cream", value: "#f0eee0", desc: "Warna krem pastel yang netral, cerah, dan menenangkan." },
  ];

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen relative font-sans overflow-x-hidden selection:bg-brand-secondary-fixed">
      {/* Cover Screen Overlay */}
      <CoverScreen onOpen={handleOpenInvitation} />

      {/* Floating Background Music Player */}
      <BackgroundMusic playTrigger={musicTrigger} />

      {/* Main Container */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Whimsical Falling Particles Background */}
            <FallingParticles />

            {/* Floating Bottom Navigation Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-brand-bg/95 backdrop-blur-md p-1.5 rounded-full border border-brand-outline-variant shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex items-center gap-1 sm:gap-2">
                {[
                  { id: "home", label: "Home", icon: Home },
                  { id: "acara", label: "Acara", icon: Calendar },
                  { id: "gallery", label: "Galeri", icon: Image },
                  { id: "rsvp", label: "RSVP", icon: Mail },
                  { id: "wish", label: "Ucapan", icon: MessageSquare },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`relative p-3 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? "text-white scale-110 shadow-md"
                          : "text-brand-outline hover:text-brand-primary hover:bg-brand-surface-container/50"
                      }`}
                      style={{ minWidth: "44px", minHeight: "44px" }}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2px] relative z-10" />
                      
                      {/* Smooth Active Background pill using Framer Motion */}
                      {isActive && (
                        <motion.span
                          layoutId="activeTabPill"
                          className="absolute inset-0 rounded-full bg-brand-primary"
                          style={{ zIndex: 5 }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Active Indicator Micro Dot under icon */}
                      {isActive && (
                        <motion.span
                          layoutId="activeTabDot"
                          className="absolute bottom-1 w-1 h-1 rounded-full bg-white"
                          style={{ zIndex: 10 }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Hover Tooltip / Label */}
                      <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-brand-primary text-white text-[10px] font-bold py-1 px-2.5 rounded-md shadow-md pointer-events-none whitespace-nowrap z-50">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

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
              
              {/* HERO SECTION */}
              <section className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-16 pb-20 relative" id="home">
                <div className="absolute top-4 left-6 text-brand-tertiary doodle-float">
                  <span className="text-3xl">✦</span>
                </div>
                <div className="absolute top-12 right-6 text-brand-secondary doodle-float" style={{ animationDelay: "-1s" }}>
                  <Heart className="w-6 h-6 fill-brand-secondary" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="mb-6">
                    <span className="font-sans text-[10px] font-semibold text-brand-primary uppercase tracking-[0.3em] block">
                      THE WEDDING CELEBRATION OF
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mb-10">
                    <h1 className="font-alice text-5xl sm:text-6xl md:text-7xl text-brand-primary font-bold tracking-wide">
                      Ryan Fahri
                    </h1>
                    <span className="font-hangyaboly text-4xl text-brand-secondary align-middle my-1">&amp;</span>
                    <h1 className="font-alice text-5xl sm:text-6xl md:text-7xl text-brand-primary font-bold tracking-wide">
                      Arbaletta Kalinda
                    </h1>
                  </div>

                  {/* Hero Illustration Stack */}
                  <div className="relative w-full max-w-md mb-12 group">
                    <div className="absolute inset-0 bg-brand-secondary-fixed/50 rounded-2xl rotate-2 transition-transform group-hover:rotate-1"></div>
                    <div className="relative border-2 border-brand-primary rounded-2xl p-3 bg-white shadow-sm rotate-[-1deg] transition-all hover:rotate-0">
                      <img
                        alt="Ryan and Arbaletta Wedding Illustration"
                        className="w-full h-auto rounded-xl grayscale-[0.1] sepia-[0.1]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBKZwGZPLIrwzHSIRaGYB6uKx_2I28OuRqjsfLZzCejtg6PRbnNXEoILMUvFz1qIypGrOyOPz4uanVkRoJCC-lye3o5_dHEhea9mxOGUlWvrMS16BYOBvnzdg5oAlqQx32YLKU51X3dp2nfiSbHNZrhmSirp2feNknM2W25KgmgNLqK9Mo9Qh5FFdCXL1WxOZ72BLseGykNWS6Gq4TVnkKHc3SCFrkX0I8AzV_EvcUvRnGFmmlAFEPCf9bHsBaei4NH4i05Ly4fzs"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Floating hand-drawn stamp */}
                    <div className="absolute -bottom-6 -right-4 bg-brand-secondary-fixed p-4 rounded-xl hand-drawn-border rotate-3 shadow-sm select-none">
                      <p className="font-epilogue text-brand-primary-dark font-extrabold text-lg">
                        26.09.2026
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                    <p className="font-sans text-sm text-brand-text/80 leading-relaxed italic">
                      "Atas nama cinta yang tulus dan ikhlas, kami memohon doa restu Bapak/Ibu/Saudara/i sekalian untuk mengiringi langkah pernikahan kami."
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="h-[1px] w-10 bg-brand-outline-variant"></div>
                      <span className="font-sans text-[10px] font-bold text-brand-primary tracking-widest uppercase">
                        SABTU | 10:00 WIB
                      </span>
                      <div className="h-[1px] w-10 bg-brand-outline-variant"></div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* MEMPELAI SECTION */}
              <section className="py-16 border-t border-brand-outline-variant/20 text-center">
                <motion.header
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <span className="text-3xl mb-2 block">🕊</span>
                  <h2 className="font-script text-4xl text-brand-primary font-bold">
                    Mempelai Bahagia
                  </h2>
                  <p className="font-sans text-xs text-brand-outline tracking-wider uppercase mt-1">
                    Memperkenalkan Kedua Mempelai
                  </p>
                  <div className="scribble-line mt-4 max-w-[200px] mx-auto"></div>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                  {/* Groom Profile */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-48 h-48 mb-6 group">
                      <div className="absolute inset-0 bg-brand-secondary-fixed/60 rounded-full rotate-3 group-hover:rotate-6 transition-transform"></div>
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-brand-primary p-1 bg-white hover:scale-105 transition-transform shadow-sm">
                        <img
                          alt="Ryan Fahri F."
                          className="w-full h-full object-cover rounded-full scale-180"
                          src={galleryImages[17].url}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h3 className="font-alice text-3xl font-bold text-brand-primary">
                      Ryan Fahri
                    </h3>
                    <p className="font-sans text-xs text-brand-outline-variant italic mt-1 mb-3">
                      @ryanfahri
                    </p>
                    <p className="font-sans text-xs text-brand-outline leading-relaxed max-w-xs">
                      Putra dari Pasangan <br />
                      <span className="font-bold text-brand-text">Bapak Hari Soepranowo </span>
                      &amp;<span className="font-bold text-brand-text"> Ibu Siti Sarofah, M.Pd.</span>
                    </p>
                  </motion.div>

                  {/* Bride Profile */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-48 h-48 mb-6 group">
                      <div className="absolute inset-0 bg-brand-secondary-fixed/60 rounded-full -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-brand-primary p-1 bg-white hover:scale-105 transition-transform shadow-sm">
                        <img
                          alt="Arbaletta Kalinda D. P."
                          className="w-full h-full object-cover rounded-full scale-150"
                          src={galleryImages[23].url}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <h3 className="font-alice text-3xl font-bold text-brand-primary">
                      Arbaletta Kalinda
                    </h3>
                    <p className="font-sans text-xs text-brand-outline-variant italic mt-1 mb-3">
                      @arbaletta.k
                    </p>
                    <p className="font-sans text-xs text-brand-outline leading-relaxed max-w-xs">
                      Putri dari Pasangan <br />
                      <span className="font-bold text-brand-text">Bapak Dr. Arie Wahyu Prananta, M.Sos. </span>
                      &amp;<span className="font-bold text-brand-text"> Ibu Septi Wulan Mardaningsih, S.Pi.</span>
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* MILESTONES SECTION */}
              <section className="py-16 border-t border-brand-outline-variant/20 text-center">
                <header className="mb-12">
                  <span className="text-3xl mb-2 block">🌸</span>
                  <h2 className="font-script text-4xl text-brand-primary font-bold">
                    Perjalanan Cinta Kami
                  </h2>
                  <p className="font-sans text-xs text-brand-outline tracking-wider uppercase mt-1">
                    Milestone Kebersamaan Ryan &amp; Arba
                  </p>
                  <div className="scribble-line mt-4 max-w-[200px] mx-auto"></div>
                </header>

                <div className="relative max-w-2xl mx-auto px-4 text-left">
                  {/* Vertical line running down the center/left */}
                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-secondary/30 transform -translate-x-1/2"></div>

                  <div className="space-y-12">
                    {/* Milestone 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative flex flex-col md:flex-row items-start md:justify-between"
                    >
                      <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-brand-secondary-fixed border-2 border-brand-primary flex items-center justify-center transform -translate-x-1/2 -mt-1 z-10 shadow-sm">
                        <span className="text-xs">🌱</span>
                      </div>
                      
                      <div className="pl-14 md:pl-0 md:w-[45%] md:text-right">
                        <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-brand-primary-dark bg-brand-secondary-fixed/50 rounded-full mb-2 uppercase">
                          Agustus 2021
                        </span>
                        <h3 className="font-epilogue text-lg font-bold text-brand-primary leading-snug">
                          Awal Pertemuan (First Meet)
                        </h3>
                        <p className="font-sans text-xs text-brand-outline leading-relaxed mt-2">
                          Pertemuan pertama kami berawal dari kesamaan minat di salah satu kegiatan sosial. Percakapan ringan yang mengalir begitu hangat menjadi benih awal kedekatan kami yang tidak terduga.
                        </p>
                      </div>
                      <div className="hidden md:block w-[45%]"></div>
                    </motion.div>

                    {/* Milestone 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative flex flex-col md:flex-row items-start md:justify-between md:flex-row-reverse"
                    >
                      <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-brand-secondary-fixed border-2 border-brand-primary flex items-center justify-center transform -translate-x-1/2 -mt-1 z-10 shadow-sm">
                        <span className="text-xs">🤝</span>
                      </div>

                      <div className="pl-14 md:pl-0 md:w-[45%] md:text-left">
                        <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-brand-primary-dark bg-brand-secondary-fixed/50 rounded-full mb-2 uppercase">
                          Oktober 2023
                        </span>
                        <h3 className="font-epilogue text-lg font-bold text-brand-primary leading-snug">
                          Menjalin Komitmen
                        </h3>
                        <p className="font-sans text-xs text-brand-outline leading-relaxed mt-2">
                          Setelah sekian waktu berbagi tawa, impian, dan sudut pandang tentang hidup, kami memantapkan hati untuk mengukuhkan rasa percaya ini menjadi sebuah komitmen serius menyongsong masa depan bersama.
                        </p>
                      </div>
                      <div className="hidden md:block w-[45%]"></div>
                    </motion.div>

                    {/* Milestone 3 */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative flex flex-col md:flex-row items-start md:justify-between"
                    >
                      <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-brand-secondary-fixed border-2 border-brand-primary flex items-center justify-center transform -translate-x-1/2 -mt-1 z-10 shadow-sm">
                        <span className="text-xs">💍</span>
                      </div>

                      <div className="pl-14 md:pl-0 md:w-[45%] md:text-right">
                        <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-brand-primary-dark bg-brand-secondary-fixed/50 rounded-full mb-2 uppercase">
                          Desember 2025
                        </span>
                        <h3 className="font-epilogue text-lg font-bold text-brand-primary leading-snug">
                          Pertemuan Resmi (Lamaran)
                        </h3>
                        <p className="font-sans text-xs text-brand-outline leading-relaxed mt-2">
                          Dengan diiringi doa, ketulusan, serta kehangatan restu dari kedua keluarga besar, kami melangsungkan prosesi lamaran resmi. Sebuah ikatan suci selangkah lebih dekat menuju pelaminan yang diimpikan.
                        </p>
                      </div>
                      <div className="hidden md:block w-[45%]"></div>
                    </motion.div>

                    {/* Milestone 4 */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative flex flex-col md:flex-row items-start md:justify-between md:flex-row-reverse"
                    >
                      <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-brand-secondary-fixed border-2 border-brand-primary flex items-center justify-center transform -translate-x-1/2 -mt-1 z-10 shadow-sm">
                        <span className="text-xs">💖</span>
                      </div>

                      <div className="pl-14 md:pl-0 md:w-[45%] md:text-left">
                        <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-brand-primary-dark bg-brand-secondary-fixed/50 rounded-full mb-2 uppercase">
                          Juli 2026
                        </span>
                        <h3 className="font-epilogue text-lg font-bold text-brand-primary leading-snug">
                          Pernikahan Suci (The Wedding)
                        </h3>
                        <p className="font-sans text-xs text-brand-outline leading-relaxed mt-2">
                          Di hadapan Sang Pencipta dan saksi-saksi terkasih, kami menautkan janji pernikahan suci seumur hidup. Hari mulia di mana kami berjanji untuk setia menemani, saling menguatkan, dan memelihara cinta selamanya.
                        </p>
                      </div>
                      <div className="hidden md:block w-[45%]"></div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* COUNTDOWN COMPONENT */}
              <Countdown />

              {/* DETAIL ACARA SECTION */}
              <section className="py-16 scroll-mt-24" id="acara">
                <motion.header
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <div className="flex justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-brand-secondary animate-pulse" />
                  </div>
                  <h2 className="font-script text-4xl text-brand-primary font-bold">
                    Detail Acara Bahagia
                  </h2>
                  <p className="font-sans text-xs text-brand-outline tracking-wider uppercase mt-1">
                    Pelaksanaan Ibadah &amp; Syukuran Pernikahan
                  </p>
                </motion.header>

                <div className="space-y-12">
                  {/* Akad Nikah */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-brand-surface-container-low border-2 border-brand-primary rounded-2xl p-6 sm:p-10 transition-all hover:scale-[1.01]"
                  >
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-brand-secondary-fixed rounded-full flex items-center justify-center text-brand-primary shadow-sm font-bold">
                      ❤
                    </div>
                    
                    <div className="mb-6 border-b border-dashed border-brand-outline-variant pb-4 text-left">
                      <h3 className="font-epilogue text-2xl font-bold text-brand-primary-dark">
                        Akad Nikah
                      </h3>
                      <p className="font-sans text-[10px] text-brand-secondary uppercase tracking-[0.2em] font-semibold mt-1">
                        PEMBERKATAN &amp; JANJI SUCI
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-brand-primary mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TANGGAL</h4>
                          <p className="font-sans text-sm font-bold text-brand-text">Sabtu, 26 September 2026</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-brand-primary mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">WAKTU</h4>
                          <p className="font-sans text-sm font-bold text-brand-text">15.30 WIB - Selesai</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:col-span-2">
                        <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TEMPAT</h4>
                          <p className="font-sans text-sm font-bold text-brand-text">The Heritage Garden</p>
                          <p className="font-sans text-xs text-brand-outline-variant mt-0.5">Jl. Romantic Sunset No. 26, Jakarta</p>
                        </div>
                      </div>
                    </div>

                    {/* Venue Image */}
                    <div className="rounded-xl overflow-hidden border border-brand-outline-variant/60 grayscale hover:grayscale-0 transition-all duration-700 h-44 shadow-sm relative group cursor-pointer">
                      <img
                        alt="The Heritage Garden Venue Map"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdqU5mqY8f0IjCpnImvsRSLpn7dBRNXF8SM2LkUREUyVKRA1BQ5kD-5S1mNK17uT4Tg3WVdCZsBNHGTZak-IJ7T2Y9r1nqArM0CZ3VHQZPqZCB_qIWVvU-1ocnBeo7n9hjrYy27gNFZn34UH9q2XnivAJ603yEj0WdH_gv3wwEyZxLjDUaIzKikWohbOS_HH8TK959YbIpcEORpdDI4DYkS_R3KHGYAM-k2fS83i_QcDlPA4Vmn6Wk8tSuPmUXzN2MYomDhzkMzFE"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-primary-dark/10 group-hover:bg-transparent transition-all"></div>
                      <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg border border-brand-primary text-[10px] font-bold text-brand-primary-dark flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" /> Detail Peta
                      </div>
                    </div>
                  </motion.div>

                  {/* Resepsi */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="relative bg-brand-surface-container-low border-2 border-brand-primary rounded-2xl p-6 sm:p-10 transition-all hover:scale-[1.01]"
                  >
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-secondary-container rounded-full flex items-center justify-center text-brand-primary shadow-sm font-bold">
                      🎉
                    </div>

                    <div className="mb-6 border-b border-dashed border-brand-outline-variant pb-4 text-left">
                      <h3 className="font-serif text-2xl font-bold text-brand-primary">
                        Intimate Wedding Reception
                      </h3>
                      <p className="font-sans text-[10px] text-brand-secondary uppercase tracking-[0.2em] font-semibold mt-1">
                        PERAYAAN KEBAHAGIAAN &amp; RECEPTION
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-brand-primary mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TANGGAL</h4>
                          <p className="font-sans text-sm font-bold text-brand-text">Sabtu, 26 September 2026</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-brand-primary mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">WAKTU</h4>
                          <p className="font-sans text-sm font-bold text-brand-text">18.00 - 20.00 WIB</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:col-span-2">
                        <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TEMPAT</h4>
                          <p className="font-sans text-sm font-bold text-brand-text">The Heritage Garden</p>
                          <p className="font-sans text-xs text-brand-outline-variant mt-0.5">Jl. Romantic Sunset No. 26, Jakarta</p>
                        </div>
                      </div>
                    </div>

                    {/* Google Maps & Other Map Providers Selection */}
                    <div className="space-y-4">
                      <MapProviderSelector
                        venueName="The Heritage Garden"
                        address="Jl. Romantic Sunset No. 26, Jakarta"
                      />
                      <div className="flex flex-wrap justify-center gap-3">
                        <span className="px-3.5 py-1 bg-brand-secondary-fixed text-[10px] font-bold font-sans text-brand-primary-dark rounded-full shadow-sm">
                          #RyanArletWedding
                        </span>
                        <span className="px-3.5 py-1 bg-brand-surface-container-high text-[10px] font-bold font-sans text-brand-primary-dark rounded-full shadow-sm">
                          Garden Theme
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* INTERACTIVE DRESSCODE EXPLORER */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mt-12 text-center px-6 py-8 bg-brand-surface-container-highest/30 rounded-3xl border border-dashed border-brand-outline-variant"
                >
                  <span className="text-2xl mb-2 block">👗</span>
                  <h3 className="font-epilogue text-lg font-bold text-brand-primary mb-3">
                    Panduan Dresscode Tamu
                  </h3>
                  <p className="font-sans text-xs text-brand-text/90 max-w-md mx-auto mb-6 italic leading-relaxed">
                    Kami sangat menghargai jika para tamu dapat mengenakan pakaian formal dengan nuansa alam hangat (<span className="text-brand-primary font-bold">Earth Tone</span>) atau <span className="text-brand-primary-dark font-bold">Sage Green</span>.
                  </p>

                  <div className="flex justify-center gap-4 mb-4">
                    {dresscodeColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedDressColor(selectedDressColor === color.name ? null : color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative flex items-center justify-center cursor-pointer shadow-sm ${
                          selectedDressColor === color.name ? "border-brand-text scale-110" : "border-white hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={`Click for details on ${color.name}`}
                      >
                        {selectedDressColor === color.name && (
                          <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] stroke-[3px]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedDressColor ? (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-white p-3.5 rounded-xl border border-brand-outline-variant/40 max-w-sm mx-auto text-left shadow-sm"
                      >
                        <p className="font-sans text-xs font-bold text-brand-primary-dark mb-1 flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: dresscodeColors.find((c) => c.name === selectedDressColor)?.value }}
                          ></span>
                          {selectedDressColor}
                        </p>
                        <p className="font-sans text-[11px] text-brand-outline leading-relaxed">
                          {dresscodeColors.find((c) => c.name === selectedDressColor)?.desc}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="font-sans text-[10px] text-brand-outline-variant italic">
                        *Klik salah satu warna di atas untuk tips panduan berbusana
                      </p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </section>

              {/* GALLERY SECTION */}
              <section className="py-16 scroll-mt-24 border-t border-brand-outline-variant/20" id="gallery">
                <motion.header
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <span className="text-3xl mb-1 block">✨</span>
                  <h2 className="font-script text-4xl text-brand-primary font-bold">
                    Scrapbook Cerita Kami
                  </h2>
                  <p className="font-sans text-xs text-brand-outline uppercase tracking-widest mt-1.5">
                    Lensa Kenangan Ryan &amp; Arbaletta
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    <div className="h-[2px] w-10 bg-brand-secondary-fixed self-center"></div>
                    <span className="text-brand-secondary text-sm">✿</span>
                    <div className="h-[2px] w-10 bg-brand-secondary-fixed self-center"></div>
                  </div>
                </motion.header>

                {/* Collage Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {/* Photo 1: Prologue */}
                  <motion.div 
                    onClick={() => setLightboxIndex(0)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group cursor-pointer text-center"
                  >
                    <div className="hand-drawn-frame rotate-[-1deg] transition-all group-hover:rotate-0 duration-500 hover:shadow-md bg-white p-3 border border-brand-primary/40 relative">
                      <ParallaxImage
                        src={galleryImages[0].url}
                        alt="Prologue"
                        aspectClass="aspect-[4/5]"
                        className="grayscale-[10%] group-hover:grayscale-0 transition-all"
                      />
                      <div className="absolute inset-0 bg-brand-primary-dark/5 group-hover:bg-transparent transition-colors rounded-lg pointer-events-none"></div>
                    </div>
                    <div className="mt-3">
                      <span className="font-sans text-[10px] font-bold text-brand-secondary tracking-wider block uppercase">
                        {galleryImages[0].number}. {galleryImages[0].title}
                      </span>
                      <p className="font-sans text-xs italic text-brand-text mt-0.5">
                        {galleryImages[0].desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Photo 2: The Yes */}
                  <motion.div 
                    onClick={() => setLightboxIndex(1)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="group cursor-pointer text-center mt-6 sm:mt-12"
                  >
                    <div className="whimsical-border rotate-[2deg] transition-all group-hover:rotate-0 duration-500 hover:shadow-md p-3 bg-white rounded-xl">
                      <ParallaxImage
                        src={galleryImages[1].url}
                        alt="The Yes"
                        aspectClass="aspect-square"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="font-sans text-[10px] font-bold text-brand-secondary tracking-wider block uppercase">
                        {galleryImages[1].number}. {galleryImages[1].title}
                      </span>
                      <p className="font-sans text-xs italic text-brand-text mt-0.5">
                        {galleryImages[1].desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Photo 3: Sunday Mornings */}
                  <motion.div 
                    onClick={() => setLightboxIndex(2)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group cursor-pointer text-center sm:-mt-6"
                  >
                    <div className="hand-drawn-frame border-2 border-solid border-brand-secondary-fixed rotate-[-2deg] transition-all group-hover:rotate-0 duration-500 hover:shadow-md bg-white p-3">
                      <ParallaxImage
                        src={galleryImages[2].url}
                        alt="Sunday Mornings"
                        aspectClass="aspect-[3/4]"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="font-sans text-[10px] font-bold text-brand-secondary tracking-wider block uppercase">
                        {galleryImages[2].number}. {galleryImages[2].title}
                      </span>
                      <p className="font-sans text-xs italic text-brand-text mt-0.5">
                        {galleryImages[2].desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Photo 4: Travels */}
                  <motion.div 
                    onClick={() => setLightboxIndex(3)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="group cursor-pointer text-center"
                  >
                    <div className="relative p-3 bg-white rounded-2xl border border-brand-outline-variant shadow-sm transition-all group-hover:-translate-y-1 hover:shadow-md">
                      <div className="absolute inset-0 border-2 border-brand-secondary-fixed translate-x-2.5 translate-y-2.5 rounded-2xl -z-10"></div>
                      <ParallaxImage
                        src={galleryImages[3].url}
                        alt="Travels"
                        aspectClass="aspect-video"
                      />
                    </div>
                    <div className="mt-6">
                      <span className="font-sans text-[10px] font-bold text-brand-secondary tracking-wider block uppercase">
                        {galleryImages[3].number}. {galleryImages[3].title}
                      </span>
                      <p className="font-sans text-xs italic text-brand-text mt-0.5">
                        {galleryImages[3].desc}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Quran Yassin Quote banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mt-16 py-12 px-6 border-2 border-dashed border-brand-primary text-center relative bg-white/95 rounded-3xl shadow-sm"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=800')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <span className="font-serif text-2xl font-bold text-brand-primary block mb-4 tracking-widest uppercase">
                    OUR FOREVER BEGINS
                  </span>
                  <blockquote className="font-sans text-sm text-brand-text leading-relaxed max-w-lg mx-auto px-4 italic">
                    "Mahasuci Allah yang telah menciptakan pasangan-pasangan semuanya, baik dari apa yang ditumbuhi oleh bumi, dari diri mereka sendiri, maupun dari apa yang tidak mereka ketahui."
                  </blockquote>
                  <p className="font-sans text-xs font-bold text-brand-primary mt-4 tracking-wider uppercase">
                    — QS. Yassin: 36
                  </p>
                </motion.div>

                {/* Additional Small Gallery Stamps */}
                <div className="mt-12 grid grid-cols-3 gap-4">
                  {[4, 5, 6].map((idx, index) => (
                    <motion.div
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                      className="hand-drawn-frame transform hover:-translate-y-2 hover:shadow-md transition-all cursor-pointer bg-white"
                    >
                      <ParallaxImage
                        src={galleryImages[idx].url}
                        alt={galleryImages[idx].title}
                        aspectClass="aspect-square"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>

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

            {/* FOOTER */}
            <footer className="w-full py-12 bg-brand-primary border-t-4 border-double border-brand-outline-variant/50 text-white relative">
              <div className="flex flex-col items-center gap-4 text-center px-6 max-w-xl mx-auto">
                <span className="font-script text-3xl font-bold text-white block">
                  Ryan &amp; Arbaletta
                </span>
                <p className="font-sans text-xs tracking-wider text-white/80">
                  Membangun janji suci di bawah indahnya restu semesta.
                </p>
                <p className="font-sans text-[10px] tracking-wider text-white/60 uppercase mt-2">
                  Dibuat dengan cinta oleh Ryan &amp; Arbaletta © 2026
                </p>
                
                <div className="flex gap-4 mt-6">
                  <span className="text-white/40">❤</span>
                  <span className="text-white/40">✿</span>
                  <span className="text-white/40">★</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN PHOTO LIGHTBOX PREVIEWER */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between items-center p-4 select-none"
          >
            {/* Top Bar controls */}
            <div className="w-full flex justify-between items-center text-white/80 max-w-4xl py-4">
              <span className="font-sans text-xs font-bold tracking-widest uppercase">
                {galleryImages[lightboxIndex].title} ({lightboxIndex + 1} / {galleryImages.length})
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95 transition-all text-white cursor-pointer"
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image display container with swipe arrows */}
            <div className="relative w-full max-w-3xl flex items-center justify-center my-auto">
              <button
                onClick={prevImage}
                className="absolute left-2 sm:-left-16 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-white cursor-pointer transition-all z-10"
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[lightboxIndex].url}
                alt="Selected Lightbox Story Photo"
                className="max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/15"
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />

              <button
                onClick={nextImage}
                className="absolute right-2 sm:-right-16 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-white cursor-pointer transition-all z-10"
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-white/90 max-w-md pb-6">
              <p className="font-sans text-sm italic">
                "{galleryImages[lightboxIndex].desc}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
