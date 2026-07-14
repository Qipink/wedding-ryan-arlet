import React from "react";

export default function FooterSection() {
  return (
    <footer className="w-full py-12 bg-brand-primary border-t-4 border-double border-brand-outline-variant/50 text-white relative">
      <div className="flex flex-col items-center gap-4 text-center px-6 max-w-xl mx-auto">
        <span className="font-script text-3xl font-bold text-white block">
          Ryan &amp; Arbaletta
        </span>
        <p className="font-sans text-xs tracking-wider text-white/80">
          Membangun janji suci di bawah indahnya restu semesta.
        </p>
        <p className="font-sans text-[10px] tracking-wider text-white/60 uppercase mt-2">
          Dibuat dengan cinta oleh Ryan &amp; Arbaletta © 2026
        </p>
        
        <div className="flex gap-4 mt-6">
          <span className="text-white/40">❤</span>
          <span className="text-white/40">✿</span>
          <span className="text-white/40">★</span>
        </div>
      </div>
    </footer>
  );
}
