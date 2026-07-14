import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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

  // Track the scroll of the image container as it passes through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to vertical position translation (-10% to 10%)
  // The scale-[1.2] on the image ensures there's enough overflow so we don't see empty space
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative rounded-lg ${aspectClass} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover scale-[1.22] origin-center"
        style={{ y }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
