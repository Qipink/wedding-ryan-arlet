import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  aspectClass = "aspect-square"
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.fromTo(imageRef.current,
      { y: "-10%" },
      {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative rounded-lg ${aspectClass} ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover scale-[1.22] origin-center"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
