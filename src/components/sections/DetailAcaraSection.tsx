import React from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, Clock, MapPin, Maximize2 } from "lucide-react";
import MapProviderSelector from "../ui/MapProviderSelector";

export default function DetailAcaraSection() {
  return (
    <section className="py-16 scroll-mt-24" id="acara">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-3">
          <Sparkles className="w-6 h-6 text-brand-secondary animate-pulse" />
        </div>
        <h2 className="font-script text-4xl text-brand-primary font-bold">
          Detail Acara Bahagia
        </h2>
        <p className="font-sans text-xs text-brand-outline tracking-wider uppercase mt-1">
          Pelaksanaan Ibadah &amp; Syukuran Pernikahan
        </p>
      </motion.header>

      <div className="space-y-12">
        {/* Akad Nikah */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-brand-surface-container-low border-2 border-brand-primary rounded-2xl p-6 sm:p-10 transition-all hover:scale-[1.01]"
        >
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-brand-secondary-fixed rounded-full flex items-center justify-center text-brand-primary shadow-sm font-bold">
            ❤
          </div>
          
          <div className="mb-6 border-b border-dashed border-brand-outline-variant pb-4 text-left">
            <h3 className="font-epilogue text-2xl font-bold text-brand-primary-dark">
              Akad Nikah
            </h3>
            <p className="font-sans text-[10px] text-brand-secondary uppercase tracking-[0.2em] font-semibold mt-1">
              PEMBERKATAN &amp; JANJI SUCI
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TANGGAL</h4>
                <p className="font-sans text-sm font-bold text-brand-text">Sabtu, 26 September 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">WAKTU</h4>
                <p className="font-sans text-sm font-bold text-brand-text">15.30 WIB - Selesai</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TEMPAT</h4>
                <p className="font-sans text-sm font-bold text-brand-text">The Heritage Garden</p>
                <p className="font-sans text-xs text-brand-outline-variant mt-0.5">Jl. Romantic Sunset No. 26, Jakarta</p>
              </div>
            </div>
          </div>

          {/* Venue Image */}
          <div className="rounded-xl overflow-hidden border border-brand-outline-variant/60 grayscale hover:grayscale-0 transition-all duration-700 h-44 shadow-sm relative group cursor-pointer">
            <img
              alt="The Heritage Garden Venue Map"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdqU5mqY8f0IjCpnImvsRSLpn7dBRNXF8SM2LkUREUyVKRA1BQ5kD-5S1mNK17uT4Tg3WVdCZsBNHGTZak-IJ7T2Y9r1nqArM0CZ3VHQZPqZCB_qIWVvU-1ocnBeo7n9hjrYy27gNFZn34UH9q2XnivAJ603yEj0WdH_gv3wwEyZxLjDUaIzKikWohbOS_HH8TK959YbIpcEORpdDI4DYkS_R3KHGYAM-k2fS83i_QcDlPA4Vmn6Wk8tSuPmUXzN2MYomDhzkMzFE"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-primary-dark/10 group-hover:bg-transparent transition-all"></div>
            <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg border border-brand-primary text-[10px] font-bold text-brand-primary-dark flex items-center gap-1">
              <Maximize2 className="w-3 h-3" /> Detail Peta
            </div>
          </div>
        </motion.div>

        {/* Resepsi */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative bg-brand-surface-container-low border-2 border-brand-primary rounded-2xl p-6 sm:p-10 transition-all hover:scale-[1.01]"
        >
          <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-secondary-container rounded-full flex items-center justify-center text-brand-primary shadow-sm font-bold">
            🎉
          </div>

          <div className="mb-6 border-b border-dashed border-brand-outline-variant pb-4 text-left">
            <h3 className="font-serif text-2xl font-bold text-brand-primary">
              Intimate Wedding Reception
            </h3>
            <p className="font-sans text-[10px] text-brand-secondary uppercase tracking-[0.2em] font-semibold mt-1">
              PERAYAAN KEBAHAGIAAN &amp; RECEPTION
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TANGGAL</h4>
                <p className="font-sans text-sm font-bold text-brand-text">Sabtu, 26 September 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">WAKTU</h4>
                <p className="font-sans text-sm font-bold text-brand-text">18.00 - 20.00 WIB</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TEMPAT</h4>
                <p className="font-sans text-sm font-bold text-brand-text">The Heritage Garden</p>
                <p className="font-sans text-xs text-brand-outline-variant mt-0.5">Jl. Romantic Sunset No. 26, Jakarta</p>
              </div>
            </div>
          </div>

          {/* Google Maps & Other Map Providers Selection */}
          <div className="space-y-4">
            <MapProviderSelector
              venueName="The Heritage Garden"
              address="Jl. Romantic Sunset No. 26, Jakarta"
            />
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3.5 py-1 bg-brand-secondary-fixed text-[10px] font-bold font-sans text-brand-primary-dark rounded-full shadow-sm">
                #RyanArletWedding
              </span>
              <span className="px-3.5 py-1 bg-brand-surface-container-high text-[10px] font-bold font-sans text-brand-primary-dark rounded-full shadow-sm">
                Garden Theme
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
