import React from "react";
import { motion } from "motion/react";
import { galleryImages } from "../../utils/galleryData";

export default function MempelaiSection() {
  return (
    <section className="py-16 border-t border-brand-outline-variant/20 text-center">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <span className="text-3xl mb-2 block">🕊</span>
        <h2 className="font-script text-4xl text-brand-primary font-bold">
          Mempelai Bahagia
        </h2>
        <p className="font-sans text-xs text-brand-outline tracking-wider uppercase mt-1">
          Memperkenalkan Kedua Mempelai
        </p>
        <div className="scribble-line mt-4 max-w-[200px] mx-auto"></div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Groom Profile */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-48 h-48 mb-6 group">
            <div className="absolute inset-0 bg-brand-secondary-fixed/60 rounded-full rotate-3 group-hover:rotate-6 transition-transform"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-brand-primary p-1 bg-white hover:scale-105 transition-transform shadow-sm">
              <img
                alt="Ryan Fahri F."
                className="w-full h-full object-cover rounded-full scale-180"
                src={galleryImages[17].url}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h3 className="font-alice text-3xl font-bold text-brand-primary">
            Ryan Fahri
          </h3>
          <p className="font-sans text-xs text-brand-outline-variant italic mt-1 mb-3">
            @ryanfahri
          </p>
          <p className="font-sans text-xs text-brand-outline leading-relaxed max-w-xs">
            Putra dari Pasangan <br />
            <span className="font-bold text-brand-text">Bapak Hari Soepranowo </span>
            &amp;<span className="font-bold text-brand-text"> Ibu Siti Sarofah, M.Pd.</span>
          </p>
        </motion.div>

        {/* Bride Profile */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-48 h-48 mb-6 group">
            <div className="absolute inset-0 bg-brand-secondary-fixed/60 rounded-full -rotate-3 group-hover:-rotate-6 transition-transform"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-brand-primary p-1 bg-white hover:scale-105 transition-transform shadow-sm">
              <img
                alt="Arbaletta Kalinda D. P."
                className="w-full h-full object-cover rounded-full scale-150"
                src={galleryImages[23].url}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h3 className="font-alice text-3xl font-bold text-brand-primary">
            Arbaletta Kalinda
          </h3>
          <p className="font-sans text-xs text-brand-outline-variant italic mt-1 mb-3">
            @arbaletta.k
          </p>
          <p className="font-sans text-xs text-brand-outline leading-relaxed max-w-xs">
            Putri dari Pasangan <br />
            <span className="font-bold text-brand-text">Bapak Dr. Arie Wahyu Prananta, M.Sos. </span>
            &amp;<span className="font-bold text-brand-text"> Ibu Septi Wulan Mardaningsih, S.Pi.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
