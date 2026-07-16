import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { galleryImages } from "../../utils/galleryData";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    galleryImages[0].url,
    galleryImages[1].url,
    galleryImages[8].url,
    galleryImages[11].url,
    galleryImages[12].url,
  ];

  // Preload images to ensure smooth fade transitions
  useEffect(() => {
    heroImages.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
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
          <div className="relative w-full aspect-[4/5] border-2 border-brand-primary rounded-2xl p-3 bg-white shadow-sm rotate-[-1deg] transition-all hover:rotate-0">
            <AnimatePresence>
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                alt="Ryan and Arbaletta Wedding"
                className="absolute top-3 left-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover rounded-xl grayscale-[0.1] sepia-[0.1]"
                src={heroImages[currentImageIndex]}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
          {/* Floating hand-drawn stamp */}
          <div className="absolute -bottom-6 -right-4 bg-brand-secondary-fixed p-4 rounded-xl hand-drawn-border rotate-3 shadow-sm select-none z-10">
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
  );
}
