import { useRef } from "react";
import ParallaxImage from "../ui/ParallaxImage";
import { galleryImages } from "../../utils/galleryData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  setLightboxIndex: (index: number) => void;
}

export default function GallerySection({ setLightboxIndex }: GallerySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const smallPhotoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
    );

    // Big photos animation
    photoRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "easeOut", delay: i % 2 !== 0 ? 0.1 : 0, scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      }
    });

    // Banner animation
    gsap.fromTo(bannerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "easeOut", scrollTrigger: { trigger: bannerRef.current, start: "top 85%" } }
    );

    // Small photos animation (staggered)
    if (smallPhotoRefs.current.length > 0) {
      gsap.fromTo(smallPhotoRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", stagger: 0.1, scrollTrigger: { trigger: smallPhotoRefs.current[0], start: "top 90%" } }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 scroll-mt-24 border-t border-brand-outline-variant/20" id="gallery">
      <header
        ref={headerRef}
        className="text-center mb-12 opacity-0"
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
      </header>

      {/* Collage Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Photo 1: Prologue */}
        <div 
          ref={(el) => { photoRefs.current[0] = el; }}
          onClick={() => setLightboxIndex(0)}
          className="group cursor-pointer text-center opacity-0"
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
        </div>

        {/* Photo 2: The Yes */}
        <div 
          ref={(el) => { photoRefs.current[1] = el; }}
          onClick={() => setLightboxIndex(1)}
          className="group cursor-pointer text-center mt-6 sm:mt-12 opacity-0"
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
        </div>

        {/* Photo 3: Sunday Mornings */}
        <div 
          ref={(el) => { photoRefs.current[2] = el; }}
          onClick={() => setLightboxIndex(2)}
          className="group cursor-pointer text-center sm:-mt-6 opacity-0"
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
        </div>

        {/* Photo 4: Travels */}
        <div 
          ref={(el) => { photoRefs.current[3] = el; }}
          onClick={() => setLightboxIndex(3)}
          className="group cursor-pointer text-center opacity-0"
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
        </div>
      </div>

      {/* Quran Yassin Quote banner */}
      <div
        ref={bannerRef}
        className="mt-16 py-12 px-6 border-2 border-dashed border-brand-primary text-center relative bg-white/95 rounded-3xl shadow-sm opacity-0"
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
      </div>

      {/* Additional Small Gallery Stamps */}
      <div className="mt-12 grid grid-cols-3 gap-4">
        {[4, 5, 6].map((idx, index) => (
          <div
            key={idx}
            ref={(el) => { smallPhotoRefs.current[index] = el; }}
            onClick={() => setLightboxIndex(idx)}
            className="hand-drawn-frame transform hover:-translate-y-2 hover:shadow-md transition-all cursor-pointer bg-white opacity-0"
          >
            <ParallaxImage
              src={galleryImages[idx].url}
              alt={galleryImages[idx].title}
              aspectClass="aspect-square"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
