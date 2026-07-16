import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MilestoneSection() {
  const containerRef = useRef<HTMLElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    milestoneRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "easeOut", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 border-t border-brand-outline-variant/20 text-center">
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
          <div
            ref={el => { milestoneRefs.current[0] = el; }}
            className="relative flex flex-col md:flex-row items-start md:justify-between opacity-0"
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
          </div>

          {/* Milestone 2 */}
          <div
            ref={el => { milestoneRefs.current[1] = el; }}
            className="relative flex flex-col md:flex-row items-start md:justify-between md:flex-row-reverse opacity-0"
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
          </div>

          {/* Milestone 3 */}
          <div
            ref={el => { milestoneRefs.current[2] = el; }}
            className="relative flex flex-col md:flex-row items-start md:justify-between opacity-0"
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
          </div>

          {/* Milestone 4 */}
          <div
            ref={el => { milestoneRefs.current[3] = el; }}
            className="relative flex flex-col md:flex-row items-start md:justify-between md:flex-row-reverse opacity-0"
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
          </div>
        </div>
      </div>
    </section>
  );
}
