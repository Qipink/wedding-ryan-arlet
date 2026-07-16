import { useEffect, useState, useRef } from "react";
import { MailOpen } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CoverScreenProps {
  onOpen: () => void;
}

export default function CoverScreen({ onOpen }: CoverScreenProps) {
  const [guestName, setGuestName] = useState<string>("Tamu Undangan");
  const [isOpen, setIsOpen] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Parse name from URL parameter "to" or "recipient"
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("recipient") || params.get("p");
    if (to) {
      setGuestName(to);
    }
  }, []);

  useGSAP(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();

    // Initial enter animations
    tl.fromTo(containerRef.current, 
      { opacity: 0, y: 0 }, 
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(namesRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(greetingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Button hover effects
    const btn = buttonRef.current;
    if (btn) {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power1.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
      });
      btn.addEventListener("mousedown", () => {
        gsap.to(btn, { scale: 0.95, duration: 0.1, ease: "power1.out" });
      });
      btn.addEventListener("mouseup", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.1, ease: "power1.out" });
      });
    }

  }, { scope: containerRef, dependencies: [isOpen] });

  const handleOpen = () => {
    // Animate out
    gsap.to(containerRef.current, {
      opacity: 0,
      y: "-100vh",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        setIsOpen(false);
        onOpen();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className="fixed inset-0 z-50 flex flex-col justify-between items-center text-center p-6 overflow-hidden select-none"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle decorative top border */}
      <div className="w-full h-3 checkerboard-divider opacity-20 absolute top-0 left-0"></div>

      {/* Invitation Header */}
      <div
        ref={headerRef}
        className="mt-16 z-10 opacity-0"
      >
        <span className="font-hangyaboly text-4xl md:text-5xl text-brand-primary tracking-wide block drop-shadow-sm">
          Wedding Invitation
        </span>
      </div>

      {/* Names of Groom & Bride */}
      <div
        ref={namesRef}
        className="flex flex-col gap-2 my-auto z-10 opacity-0"
      >
        <h1 className="font-alice text-5xl sm:text-6xl md:text-7xl text-brand-primary font-bold tracking-[0.08em] uppercase drop-shadow-sm px-2">
          ARLET<span className="font-hangyaboly text-4xl text-brand-secondary align-middle mx-1">&amp;</span>RYAN
        </h1>

        {/* Elegant, Simplified and Compact Date Badge */}
        <div className="mt-6 select-none max-w-sm mx-auto">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-brand-primary rounded-full px-5 py-2 shadow-sm flex items-center justify-center gap-3 font-sans">
            <span className="font-epilogue font-bold text-brand-primary-dark text-xs uppercase tracking-wider">
              SABTU
            </span>
            <span className="h-4 w-[1.5px] bg-brand-outline-variant"></span>
            <span className="font-epilogue font-black text-brand-primary text-sm tracking-widest">
              26 . 09 . 2026
            </span>
            <span className="h-4 w-[1.5px] bg-brand-outline-variant"></span>
            <span className="font-epilogue font-bold text-brand-primary-dark text-xs uppercase tracking-wider">
              15:30 WIB
            </span>
          </div>
        </div>
      </div>

      {/* Guest Greeting Section with clear spacing from the date above */}
      <div
        ref={greetingRef}
        className="mb-16 z-10 bg-white/80 backdrop-blur-md border border-brand-outline-variant rounded-2xl p-6 max-w-md w-full mx-auto shadow-md opacity-0"
      >
        <p className="font-canva-student text-2xl text-brand-secondary mb-2">
          Kindly deliver to
        </p>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-primary mb-4 tracking-wide">
          {guestName}
        </h3>

        <button
          ref={buttonRef}
          onClick={handleOpen}
          className="w-full bg-brand-primary text-white py-3.5 px-6 rounded-full font-sans font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 border-2 border-brand-primary-dark hover:bg-brand-primary-dark shadow-[4px_4px_0px_#ebd0d3] transition-all cursor-pointer"
        >
          <MailOpen className="w-4 h-4" />
          Buka Undangan
        </button>
      </div>

      {/* Subtle bottom border */}
      <div className="w-full h-3 checkerboard-divider opacity-20 absolute bottom-0 left-0"></div>
    </div>
  );
}

