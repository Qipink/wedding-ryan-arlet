import { motion } from "motion/react";
import { Sparkles, Calendar, Clock, MapPin } from "lucide-react";
import MapProviderSelector from "../ui/MapProviderSelector";

export default function DetailAcaraSection() {
  return (
    <section className="py-16 scroll-mt-24 px-4 sm:px-6 relative" id="acara">
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
          Pelaksanaan Ibadah & Syukuran Pernikahan
        </p>
      </motion.header>

      <div className="max-w-2xl mx-auto px-1 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-brand-surface-container-low border-2 border-brand-primary rounded-3xl p-5 sm:p-8 transition-all shadow-sm hover:shadow-md"
        >
          {/* Decorative Top Floating Icons */}
          <div className="absolute -top-5 -left-5 w-12 h-12 bg-brand-secondary-fixed rounded-full flex items-center justify-center text-brand-primary shadow-sm font-bold border-2 border-white z-10">
            ❤
          </div>
          <div className="absolute -top-5 -right-5 w-12 h-12 bg-brand-secondary-fixed rounded-full flex items-center justify-center text-brand-primary shadow-sm font-bold border-2 border-white z-10">
            🎉
          </div>
          
          <div className="mb-8 border-b border-dashed border-brand-outline-variant pb-6 text-center">
            <h3 className="font-serif text-3xl font-bold text-brand-primary-dark">
              Pemberkatan & Resepsi
            </h3>
            <p className="font-sans text-[10px] sm:text-xs text-brand-secondary uppercase tracking-[0.2em] font-semibold mt-2">
              Akad Nikah & Intimate Wedding Reception
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
            {/* Left Column: Date & Venue */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TANGGAL</h4>
                  <p className="font-sans text-sm font-bold text-brand-text">Sabtu, 26 September 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">TEMPAT</h4>
                  <p className="font-sans text-sm font-bold text-brand-text">The Heritage Garden</p>
                  <p className="font-sans text-xs text-brand-outline-variant mt-0.5 leading-relaxed">
                    Jl. Romantic Sunset No. 26, Jakarta Selatan, DKI Jakarta
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Timetable */}
            <div className="space-y-6 md:pl-6 md:border-l md:border-dashed md:border-brand-outline-variant/40">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">AKAD NIKAH</h4>
                  <p className="font-sans text-sm font-bold text-brand-text">15.30 WIB - Selesai</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-sans text-[10px] text-brand-outline font-bold tracking-wider uppercase">RESEPSI</h4>
                  <p className="font-sans text-sm font-bold text-brand-text">18.00 WIB - 20.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (Interactive Map) */}
          <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-brand-outline-variant/60 mb-6 shadow-sm relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.059298816666!2d106.820294114769!3d-6.2558525954714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d9d59247eb%3A0xc660d3fc04f58b4!2sJakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Acara The Heritage Garden"
              className="grayscale-[30%] contrast-[90%] transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100"
            ></iframe>
          </div>

          {/* GPS Map Selector Buttons Component */}
          <div className="space-y-5">
            <MapProviderSelector
              venueName="The Heritage Garden"
              address="Jl. Romantic Sunset No. 26, Jakarta Selatan"
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
