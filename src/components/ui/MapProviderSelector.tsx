import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, MapPin, X } from "lucide-react";

interface MapProviderSelectorProps {
  venueName: string;
  address: string;
}

export default function MapProviderSelector({ venueName, address }: MapProviderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Encode search query for map providers
  const query = encodeURIComponent(`${venueName}, ${address}`);

  const providers = [
    {
      name: "Google Maps",
      icon: "📍",
      color: "hover:bg-emerald-50 hover:border-emerald-200 text-emerald-800",
      accentBg: "bg-emerald-100 text-emerald-700",
      url: `https://www.google.com/maps/search/?api=1&query=${query}`,
      desc: "Rekomendasi terbaik untuk navigasi lengkap",
    },
    {
      name: "Waze",
      icon: "🚙",
      color: "hover:bg-sky-50 hover:border-sky-200 text-sky-800",
      accentBg: "bg-sky-100 text-sky-700",
      url: `https://waze.com/ul?q=${query}&navigate=yes`,
      desc: "Hindari macet dengan info lalu lintas real-time",
    },
    {
      name: "Apple Maps",
      icon: "🗺️",
      color: "hover:bg-slate-50 hover:border-slate-200 text-slate-800",
      accentBg: "bg-slate-100 text-slate-700",
      url: `https://maps.apple.com/?q=${query}`,
      desc: "Khusus untuk pengguna perangkat Apple (iOS/macOS)",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3.5 border-2 border-brand-primary text-brand-primary font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all duration-300 rounded-xl cursor-pointer"
        aria-expanded={isOpen}
      >
        <MapPin className="w-4 h-4 animate-bounce" /> Buka Peta Lokasi
      </button>

      {/* Popover / Overlay Drawer for Accessibility */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />

            {/* Option Tray modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-md bg-white border border-brand-outline-variant rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[60] text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-brand-outline-variant/60 mb-4">
                <div>
                  <h4 className="font-epilogue font-bold text-brand-primary text-sm uppercase tracking-wider">
                    Pilih Aplikasi Peta
                  </h4>
                  <p className="text-[10px] text-brand-outline font-sans mt-0.5">
                    Akses navigasi mudah menuju lokasi acara
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-surface-container transition-colors text-brand-outline hover:text-brand-primary cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Providers List */}
              <div className="space-y-3">
                {providers.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-start gap-3.5 p-3.5 border border-brand-outline-variant/40 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer ${p.color}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${p.accentBg}`}>
                      {p.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-epilogue font-extrabold text-xs uppercase tracking-wide">
                          {p.name}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </div>
                      <p className="font-sans text-[10px] text-brand-outline mt-0.5 leading-snug">
                        {p.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Bottom Address snippet */}
              <div className="mt-4 p-3 bg-brand-surface-container-low/75 rounded-xl border border-brand-outline-variant/20 flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-epilogue text-[10px] font-bold text-brand-primary-dark uppercase">
                    Alamat Tujuan
                  </span>
                  <p className="font-sans text-[10px] text-brand-outline leading-normal mt-0.5">
                    <strong>{venueName}</strong> — {address}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
