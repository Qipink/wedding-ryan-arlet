import { useRef } from "react";
import { Heart } from "lucide-react";
import { galleryImages } from "../../utils/galleryData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MempelaiSection() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: quoteRef.current, start: "top 85%" } }
    );
    
    gsap.fromTo(groomRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: groomRef.current, start: "top 85%" } }
    );
    
    gsap.fromTo(brideRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: brideRef.current, start: "top 85%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-6 max-w-4xl mx-auto text-center relative overflow-hidden border-t border-brand-outline-variant/20" id="mempelai">
      {/* Decorative floral illustration background elements */}
      <div className="absolute top-10 left-4 text-brand-secondary/30 select-none pointer-events-none text-7xl font-script">
        🌸
      </div>
      <div className="absolute bottom-10 right-4 text-brand-primary/30 select-none pointer-events-none text-7xl font-script">
        🌿
      </div>

      <div className="space-y-12 relative z-10">
        {/* Marriage Quote Section */}
        <div
          ref={quoteRef}
          className="max-w-2xl mx-auto space-y-4 opacity-0"
        >
          <span className="text-brand-primary font-serif italic text-lg block">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
          <p className="text-brand-text/90 font-serif italic text-sm sm:text-base leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
          <span className="text-[10px] sm:text-xs font-sans tracking-widest text-brand-outline font-semibold block uppercase">
            — Q.S. Ar-Rum: 21
          </span>
          <div className="flex justify-center items-center space-x-2 py-4">
            <div className="h-[1px] w-12 bg-brand-outline-variant"></div>
            <Heart size={14} className="text-brand-secondary fill-brand-secondary" />
            <div className="h-[1px] w-12 bg-brand-outline-variant"></div>
          </div>
        </div>

        {/* Intoduction Header */}
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-sans uppercase tracking-widest text-brand-primary font-medium">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </h3>
          <p className="text-xs sm:text-sm font-serif text-brand-text/80 max-w-xl mx-auto">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan putra-putri kami:
          </p>
        </div>

        {/* Bride & Groom Detail Cards */}
        <div className="grid md:grid-cols-2 gap-12 pt-8 relative">
          {/* Groom Details */}
          <div
            ref={groomRef}
            className="flex flex-col items-center space-y-4 opacity-0"
          >
            {/* Groom Portrait Frame */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-secondary-fixed to-brand-primary/40 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative w-52 h-72 rounded-2xl border-4 border-white overflow-hidden shadow-md">
                <img
                  src={galleryImages[17].url}
                  alt="Ryan Fahri F."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white border border-brand-outline-variant flex items-center justify-center text-brand-primary shadow-sm">
                ✦
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-3xl font-script text-brand-primary-dark font-semibold">
                Ryan Fahri F., S.T.
              </h4>
              <p className="text-xs font-sans text-brand-outline uppercase tracking-widest font-semibold">
                — Ryan —
              </p>
              <div className="text-sm font-serif text-brand-text/90 space-y-0.5 pt-2">
                <p>Putra pertama dari:</p>
                <p className="font-semibold text-brand-text">Bapak H. Ferdiansyah, M.T.</p>
                <p>&amp;</p>
                <p className="font-semibold text-brand-text">Ibu Hj. Linda Farida</p>
              </div>
              <p className="text-xs text-brand-outline-variant italic">Asal: Bandung, Jawa Barat</p>
            </div>
          </div>

          {/* Decorative central heart & separator line */}
          <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 top-12 bottom-12 -translate-x-1/2 text-brand-secondary">
            <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-brand-secondary/40 to-transparent"></div>
            <Heart size={20} className="my-4 animate-pulse fill-brand-secondary/30 text-brand-secondary" />
            <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-brand-secondary/40 to-transparent"></div>
          </div>

          {/* Bride Details */}
          <div
            ref={brideRef}
            className="flex flex-col items-center space-y-4 opacity-0"
          >
            {/* Bride Portrait Frame */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-primary/40 to-brand-secondary-fixed rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative w-52 h-72 rounded-2xl border-4 border-white overflow-hidden shadow-md">
                <img
                  src={galleryImages[23].url}
                  alt="Arbaletta Kalinda D. P."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white border border-brand-outline-variant flex items-center justify-center text-brand-primary shadow-sm">
                ✦
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-3xl font-script text-brand-primary-dark font-semibold">
                Arbaletta Kalinda D. P., S.Kom.
              </h4>
              <p className="text-xs font-sans text-brand-outline uppercase tracking-widest font-semibold">
                — Arba —
              </p>
              <div className="text-sm font-serif text-brand-text/90 space-y-0.5 pt-2">
                <p>Putri bungsu dari:</p>
                <p className="font-semibold text-brand-text">Bapak Dani Permana, S.E.</p>
                <p>&amp;</p>
                <p className="font-semibold text-brand-text">Ibu Arini Dian Lestari, S.Pd.</p>
              </div>
              <p className="text-xs text-brand-outline-variant italic">Asal: Jakarta Selatan, DKI Jakarta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
