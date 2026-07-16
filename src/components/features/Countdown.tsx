import { useState, useEffect, useRef } from "react";
import { CountdownTime } from "../../types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Countdown() {
  const targetDate = new Date("2026-09-26T08:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
    );
    
    if (blockRefs.current.length > 0) {
      gsap.fromTo(blockRefs.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "easeOut", scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
      );
    }
  }, { scope: containerRef });

  const timeBlocks = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center my-10 px-4 opacity-0"
    >
      <div className="text-center mb-6">
        <span className="font-sans text-xs font-semibold tracking-widest text-brand-primary uppercase">
          COUNTDOWN TO THE BIG DAY
        </span>
      </div>
      <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
        {timeBlocks.map((block, index) => (
          <div
            key={block.label}
            ref={el => { blockRefs.current[index] = el; }}
            className="w-18 h-18 sm:w-22 sm:h-22 bg-brand-surface-container-low flex flex-col items-center justify-center hand-drawn-border relative shadow-sm opacity-0"
          >
            <span className="font-epilogue text-2xl sm:text-3xl font-bold text-brand-primary">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-brand-outline-variant mt-1 font-semibold">
              {block.label}
            </span>
          </div>
        ))}
      </div>
      {timeLeft.isOver && (
        <p className="mt-4 font-script text-2xl text-brand-secondary italic">
          Hari Bahagia Telah Tiba!
        </p>
      )}
    </div>
  );
}
