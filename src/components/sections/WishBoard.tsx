import React, { useState, useEffect } from "react";
import { wishService } from "../../utils/storage";
import { Wish } from "../../types";
import { Heart, Send, Search, CheckCircle, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WishBoard() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      setIsLoading(true);
      try {
        const data = await wishService.getWishes();
        setWishes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatusMsg("Silakan isi nama dan ucapan Anda.");
      return;
    }
    setIsSubmitting(true);

    try {
      await wishService.addWish(name.trim(), message.trim());
      const updatedWishes = await wishService.getWishes();
      setWishes(updatedWishes);
      
      setName("");
      setMessage("");
      setStatusMsg("Ucapan Anda berhasil dikirim!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setStatusMsg("Gagal mengirim ucapan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (wishId: string) => {
    try {
      const updated = await wishService.toggleLikeWish(wishId);
      setWishes(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      // Beautiful Indonesian months
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch (e) {
      return "Baru Saja";
    }
  };

  const filteredWishes = wishes.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.message.toLowerCase().includes(search.toLowerCase())
  );

  const displayedWishes = showAll ? filteredWishes : filteredWishes.slice(0, 4);

  return (
    <div className="relative mt-16 text-center scroll-mt-24" id="wish">
      {/* Small floating flower doodle */}
      <div className="absolute -top-6 right-2 text-brand-secondary/40 doodle-float z-0">
        <span className="text-4xl">✿</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center"
      >
        <div className="flex justify-center mb-2">
          <Heart className="w-8 h-8 text-brand-primary fill-brand-primary/10 doodle-pulse" />
        </div>
        <h2 className="font-script text-4xl text-brand-primary font-bold">
          Well Wishes & Doa Restu
        </h2>
        <p className="font-sans text-xs text-brand-outline mt-1.5 uppercase tracking-widest">
          Berikan doa tulus untuk Ryan & Arbaletta
        </p>
      </motion.div>

      <div className="space-y-8 max-w-2xl mx-auto px-1">
        {/* Wish Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="custom-dashed-border p-6 sm:p-8 bg-brand-surface-container text-left relative shadow-sm"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              className="bg-transparent border-none font-epilogue text-lg italic text-brand-primary placeholder-brand-primary/40 py-2 focus:ring-0 focus:outline-none font-semibold"
            />
            <div className="h-[1px] bg-brand-outline-variant/30 w-full"></div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa tulus Anda di sini..."
              rows={4}
              className="bg-transparent border-none font-sans text-sm text-brand-text/90 placeholder-brand-outline-variant/50 py-2 focus:ring-0 focus:outline-none resize-none min-h-[100px] leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <span className="text-xs font-sans text-brand-primary-dark/80 italic">
                {statusMsg && (
                  <span className="flex items-center gap-1.5 text-brand-primary">
                    <CheckCircle className="w-3.5 h-3.5" /> {statusMsg}
                  </span>
                )}
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-brand-primary hover:bg-brand-primary-dark text-white font-sans text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-lg border-2 border-brand-primary-dark flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <Send className="w-3 h-3" /> {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 max-w-md mx-auto bg-white border border-brand-outline-variant/50 rounded-full px-4 py-2 shadow-sm focus-within:border-brand-primary transition-all">
          <Search className="w-4 h-4 text-brand-outline-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ucapan teman-teman..."
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-xs text-brand-text font-sans placeholder-brand-outline-variant/70"
          />
        </div>

        {/* Wishes Wall Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mt-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-2xl border border-dashed border-brand-outline-variant/30 bg-brand-surface-container-low flex flex-col gap-4 text-left h-[160px] justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-brand-outline-variant/10">
                    <div className="w-6 h-6 rounded-full bg-brand-outline-variant/20"></div>
                    <div className="w-1/3 h-4 bg-brand-outline-variant/20 rounded"></div>
                  </div>
                  <div className="w-full h-3 bg-brand-outline-variant/15 rounded mb-2"></div>
                  <div className="w-5/6 h-3 bg-brand-outline-variant/15 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-1/4 h-3 bg-brand-outline-variant/20 rounded"></div>
                  <div className="w-12 h-6 bg-brand-outline-variant/20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mt-8">
            <AnimatePresence mode="popLayout">
              {displayedWishes.map((wish, index) => {
                // Alternating rotation and colors
                const rotationClass = index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";
                const bgClass = index % 3 === 0 
                  ? "bg-brand-secondary-fixed/20 hover:bg-brand-secondary-fixed/30" 
                  : index % 3 === 1 
                  ? "bg-brand-surface-container-high/45 hover:bg-brand-surface-container-high/65" 
                  : "bg-brand-surface-container-low/70 hover:bg-brand-surface-container-low/90";

                return (
                  <motion.div
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth cubic bezier
                      layout: { type: "spring", stiffness: 180, damping: 25 }
                    }}
                    className={`p-5 rounded-2xl hand-drawn-border flex flex-col justify-between gap-4 text-left transition-all duration-300 relative ${rotationClass} ${bgClass}`}
                  >
                    <div className="absolute top-3 right-4 opacity-5 pointer-events-none">
                      <Quote className="w-12 h-12 text-brand-primary" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 border-b border-brand-outline-variant/20 pb-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] shadow-sm">
                          🌸
                        </div>
                        <span className="font-epilogue text-sm font-bold text-brand-primary-dark">
                          {wish.name}
                        </span>
                      </div>
                      <p className="font-sans text-xs italic text-brand-text/80 leading-relaxed">
                        "{wish.message}"
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-brand-outline-variant/10">
                      <span className="text-[10px] uppercase font-sans tracking-wider text-brand-outline">
                        {formatDate(wish.createdAt)}
                      </span>

                      <button
                        onClick={() => handleLike(wish.id)}
                        className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-brand-outline-variant/30 bg-white shadow-sm transition-all active:scale-90 cursor-pointer ${
                          wish.likedByCurrentUser 
                            ? "text-red-500 font-bold border-red-200" 
                            : "text-brand-outline-variant hover:text-red-400"
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${wish.likedByCurrentUser ? "fill-red-500 text-red-500" : ""}`} />
                        <span>{wish.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredWishes.length === 0 && (
          <div className="py-12 bg-brand-surface-container-low rounded-xl border border-dashed border-brand-outline-variant">
            <p className="font-sans text-sm text-brand-outline">Belum ada ucapan yang cocok.</p>
          </div>
        )}

        {/* View All / Toggle Button */}
        {filteredWishes.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-sans text-xs font-bold text-brand-primary uppercase tracking-widest underline underline-offset-4 decoration-brand-secondary/60 hover:decoration-brand-primary transition-all cursor-pointer"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : `Tampilkan Semua ${wishes.length} Ucapan`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
