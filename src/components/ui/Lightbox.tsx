import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../../utils/galleryData";

interface LightboxProps {
  lightboxIndex: number | null;
  setLightboxIndex: (index: number | null) => void;
}

export default function Lightbox({ lightboxIndex, setLightboxIndex }: LightboxProps) {
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <AnimatePresence>
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between items-center p-4 select-none"
        >
          {/* Top Bar controls */}
          <div className="w-full flex justify-between items-center text-white/80 max-w-4xl py-4">
            <span className="font-sans text-xs font-bold tracking-widest uppercase">
              {galleryImages[lightboxIndex].title} ({lightboxIndex + 1} / {galleryImages.length})
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95 transition-all text-white cursor-pointer"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image display container with swipe arrows */}
          <div className="relative w-full max-w-3xl flex items-center justify-center my-auto">
            <button
              onClick={prevImage}
              className="absolute left-2 sm:-left-16 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-white cursor-pointer transition-all z-10"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[lightboxIndex].url}
              alt="Selected Lightbox Story Photo"
              className="max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />

            <button
              onClick={nextImage}
              className="absolute right-2 sm:-right-16 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-white cursor-pointer transition-all z-10"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center text-white/90 max-w-md pb-6">
            <p className="font-sans text-sm italic">
              "{galleryImages[lightboxIndex].desc}"
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
