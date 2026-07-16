import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { galleryImages } from "../../utils/galleryData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

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
  }, [heroImages]);

  useGSAP(() => {
    // Initial entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % heroImages.length;
      
      // Crossfade animation
      if (imagesRef.current[currentImageIndex] && imagesRef.current[nextIndex]) {
        gsap.to(imagesRef.current[currentImageIndex], { opacity: 0, duration: 1.5, ease: "power2.inOut" });
        gsap.to(imagesRef.current[nextIndex], { opacity: 1, duration: 1.5, ease: "power2.inOut" });
      }
      
      setCurrentImageIndex(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentImageIndex, heroImages.length]);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-16 pb-20 relative" id="home">
      <div className="absolute top-4 left-6 text-brand-tertiary doodle-float">
        <span className="text-3xl">✦</span>
      </div>
      <div className="absolute top-12 right-6 text-brand-secondary doodle-float" style={{ animationDelay: "-1s" }}>
        <Heart className="w-6 h-6 fill-brand-secondary" />
      </div>

      <div
        ref={containerRef}
        className="w-full flex flex-col items-center opacity-0"
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
          <div className="relative w-full aspect-[4/5] border-2 border-brand-primary rounded-2xl p-3 bg-white shadow-sm rotate-[-1deg] transition-all hover:rotate-0 overflow-hidden">
            {heroImages.map((src, idx) => (
              <img
                key={idx}
                ref={(el) => {
                  imagesRef.current[idx] = el;
                }}
                alt={`Wedding Photo ${idx}`}
                className="absolute top-3 left-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover rounded-xl grayscale-[0.1] sepia-[0.1]"
                src={src}
                style={{ opacity: idx === 0 ? 1 : 0 }}
                referrerPolicy="no-referrer"
              />
            ))}
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
      </div>
    </section>
  );
}
