import { useState, useEffect } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  isLeaf: boolean;
  isRight: boolean;
  rotation: number;
}

export default function FallingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate a fixed set of particles with random properties
    const colors = [
      "#ddbaae", // brand-secondary (dusty pink)
      "#ffdbcf", // brand-secondary-fixed (soft peach)
      "#818263", // brand-primary (sage green)
      "#c9c7ba", // brand-outline-variant (champagne/olive)
    ];

    const generated: Particle[] = Array.from({ length: 60 }).map((_, i) => {
      const isLeaf = Math.random() > 0.6; // 40% leaves, 60% flower petals
      const isRight = Math.random() > 0.5;
      
      return {
        id: i,
        left: Math.random() * 100, 
        top: Math.random() * 100, // Distribute across the entire document height
        size: Math.floor(Math.random() * 12) + 12, // 12px to 24px
        delay: Math.random() * -20, 
        duration: Math.random() * 10 + 12, // 12s to 22s for ultra-slow elegant flow
        opacity: Math.random() * 0.4 + 0.25, // Soft opacity (25% to 65%)
        color: colors[Math.floor(Math.random() * colors.length)],
        isLeaf,
        isRight,
        rotation: Math.random() * 360,
      };
    });

    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => {
        const animationClass = p.isRight ? "animate-fall-right" : "animate-fall-left";
        
        return (
          <div
            key={p.id}
            className={`absolute ${animationClass}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          >
            {p.isLeaf ? (
              // Delicate leaf SVG
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: `rotate(${p.rotation}deg)`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M2 15 C 2 15, 10 3, 20 2 C 20 2, 28 8, 28 18 C 28 18, 18 28, 2 15 Z"
                  fill={p.color}
                />
                {/* Hand-drawn style leaf center line */}
                <path
                  d="M2 15 Q 12 12, 20 2"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Soft whimsical flower petal SVG
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: `rotate(${p.rotation}deg)`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M12 4 C 18 2, 24 6, 26 12 C 28 18, 22 26, 15 28 C 8 30, 3 24, 2 17 C 1 10, 6 6, 12 4 Z"
                  fill={p.color}
                />
                <path
                  d="M12 4 Q 15 15, 15 28"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
