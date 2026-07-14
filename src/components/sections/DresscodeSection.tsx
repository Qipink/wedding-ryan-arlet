import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

export default function DresscodeSection() {
  const [selectedDressColor, setSelectedDressColor] = useState<string | null>(null);

  const dresscodeColors = [
    { name: "Sage Green", value: "#818263", desc: "Warna utama sage green yang memberikan nuansa asri, sejuk, dan alami." },
    { name: "Soft Olive", value: "#5d5e38", desc: "Warna zaitun lembut untuk paduan elegan yang menyatu dengan alam." },
    { name: "Terracotta", value: "#e2bfb3", desc: "Sentuhan warna tanah liat yang hangat dan klasik." },
    { name: "Warm Cream", value: "#f0eee0", desc: "Warna krem pastel yang netral, cerah, dan menenangkan." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-12 text-center px-6 py-8 bg-brand-surface-container-highest/30 rounded-3xl border border-dashed border-brand-outline-variant"
    >
      <span className="text-2xl mb-2 block">👗</span>
      <h3 className="font-epilogue text-lg font-bold text-brand-primary mb-3">
        Panduan Dresscode Tamu
      </h3>
      <p className="font-sans text-xs text-brand-text/90 max-w-md mx-auto mb-6 italic leading-relaxed">
        Kami sangat menghargai jika para tamu dapat mengenakan pakaian formal dengan nuansa alam hangat (<span className="text-brand-primary font-bold">Earth Tone</span>) atau <span className="text-brand-primary-dark font-bold">Sage Green</span>.
      </p>

      <div className="flex justify-center gap-4 mb-4">
        {dresscodeColors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedDressColor(selectedDressColor === color.name ? null : color.name)}
            className={`w-10 h-10 rounded-full border-2 transition-all relative flex items-center justify-center cursor-pointer shadow-sm ${
              selectedDressColor === color.name ? "border-brand-text scale-110" : "border-white hover:scale-105"
            }`}
            style={{ backgroundColor: color.value }}
            title={`Click for details on ${color.name}`}
          >
            {selectedDressColor === color.name && (
              <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] stroke-[3px]" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedDressColor ? (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="bg-white p-3.5 rounded-xl border border-brand-outline-variant/40 max-w-sm mx-auto text-left shadow-sm"
          >
            <p className="font-sans text-xs font-bold text-brand-primary-dark mb-1 flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: dresscodeColors.find((c) => c.name === selectedDressColor)?.value }}
              ></span>
              {selectedDressColor}
            </p>
            <p className="font-sans text-[11px] text-brand-outline leading-relaxed">
              {dresscodeColors.find((c) => c.name === selectedDressColor)?.desc}
            </p>
          </motion.div>
        ) : (
          <p className="font-sans text-[10px] text-brand-outline-variant italic">
            *Klik salah satu warna di atas untuk tips panduan berbusana
          </p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
