import React, { useState, useEffect } from "react";
import { rsvpService } from "../utils/storage";
import { Check, Heart, MailCheck, UserCheck, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1 Person");
  const [attending, setAttending] = useState(true);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [userRsvp, setUserRsvp] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if the user has already RSVP'd on this device
    const checkExisting = async () => {
      const existing = await rsvpService.getUserRsvp();
      if (existing) {
        setUserRsvp(existing);
        setIsSubmitted(true);
      }
    };
    checkExisting();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Silakan masukkan nama Anda.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const guestsNum = parseInt(guests) || 1;
      const rsvpData = await rsvpService.saveRsvp({
        name: name.trim(),
        guests: guestsNum,
        attending,
        notes: notes.trim(),
      });

      setUserRsvp(rsvpData);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menyimpan RSVP Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    try {
      await rsvpService.clearRsvp();
    } catch (err) {
      console.error(err);
    }
    setUserRsvp(null);
    setIsSubmitted(false);
    setName("");
    setGuests("1 Person");
    setAttending(true);
    setNotes("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      className="hand-drawn-border bg-brand-surface-container-low p-6 sm:p-10 relative mb-16 shadow-sm overflow-hidden"
    >
      {/* Decorative Stamp/Sticker Illustration */}
      <div className="absolute -right-6 -top-6 hidden sm:block rotate-12 opacity-90 select-none pointer-events-none">
        <img
          className="w-24 h-24 object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIAHaiAbDKn-NeVNc72auw0VbhN49_BurmHMJfK2LSSRqFkFFvOU_GJHueQnTXOCEo7786uKAHcELKJ6UgI_3Xphq159Hw3aDsZRHSgySLbesA5AOVedFA_ikeCx_v8qTn9GTXHLhM_xUH6GO3DyoxbfUOafrRTGlreKMdD0JnTOvt1Hsyl3mHvsDXgIT_JdCSehrPGtjwBY-ZQU0R2hJi3kXvP_MmGAcXgnuCeIPuTa4XvSB4bNiXjfGyTD0H9F_tHPxPyZWNMNo"
          alt="Wedding Stamp Stamp"
          referrerPolicy="no-referrer"
        />
      </div>

      {isSubmitted && userRsvp ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 px-4 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary mb-4 animate-bounce">
            <MailCheck className="w-8 h-8 text-brand-primary" />
          </div>
          <h3 className="font-epilogue text-2xl font-bold text-brand-primary mb-2">
            Terima Kasih, {userRsvp.name}!
          </h3>
          <p className="font-sans text-sm text-brand-outline max-w-sm mx-auto mb-6">
            Konfirmasi kehadiran Anda telah kami simpan. Kami sangat tidak sabar menyambut Anda di perayaan kebahagiaan kami!
          </p>

          <div className="bg-white rounded-xl p-6 border-2 border-dashed border-brand-outline-variant max-w-xs w-full text-left space-y-3 mb-8">
            <div className="flex justify-between border-b border-brand-surface-container pb-2">
              <span className="text-xs text-brand-outline font-semibold uppercase">Status</span>
              <span className={`text-xs font-bold uppercase ${userRsvp.attending ? "text-emerald-700" : "text-amber-700"}`}>
                {userRsvp.attending ? "Akan Hadir" : "Tidak Hadir"}
              </span>
            </div>
            {userRsvp.attending && (
              <div className="flex justify-between border-b border-brand-surface-container pb-2">
                <span className="text-xs text-brand-outline font-semibold uppercase">Jumlah Tamu</span>
                <span className="text-xs font-bold text-brand-text">{userRsvp.guests} Orang</span>
              </div>
            )}
            {userRsvp.notes && (
              <div>
                <span className="text-xs text-brand-outline font-semibold uppercase block mb-1">Catatan</span>
                <p className="text-xs italic text-brand-text/80 bg-brand-surface-container-low p-2 rounded">
                  "{userRsvp.notes}"
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-sans font-semibold tracking-wider uppercase text-brand-primary hover:text-brand-primary-dark underline underline-offset-4 decoration-brand-secondary cursor-pointer"
          >
            Ubah Konfirmasi Kehadiran
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Guest Name */}
            <div className="space-y-2 text-left">
              <label className="font-sans text-[11px] font-bold tracking-widest text-brand-primary uppercase flex items-center gap-1.5">
                Nama Tamu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full bg-transparent border-b-2 border-brand-primary focus:border-brand-secondary focus:outline-none py-2 font-sans text-sm text-brand-text placeholder-brand-outline-variant/60"
              />
            </div>

            {/* Number of Guests */}
            <div className="space-y-2 text-left">
              <label className="font-sans text-[11px] font-bold tracking-widest text-brand-primary uppercase">
                Jumlah Tamu
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent border-b-2 border-brand-primary focus:border-brand-secondary focus:outline-none py-2 font-sans text-sm text-brand-text cursor-pointer"
              >
                <option value="1 Person" className="bg-brand-bg text-brand-text">1 Orang</option>
                <option value="2 People" className="bg-brand-bg text-brand-text">2 Orang</option>
              </select>
            </div>
          </div>

          {/* Attendance Radio Options */}
          <div className="space-y-3 text-left">
            <label className="font-sans text-[11px] font-bold tracking-widest text-brand-primary uppercase block">
              Apakah Anda akan menghadiri perayaan kami?
            </label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="attendance"
                  checked={attending === true}
                  onChange={() => setAttending(true)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 border-brand-primary flex items-center justify-center transition-all ${
                  attending ? "bg-brand-primary text-white" : "group-hover:bg-brand-secondary-fixed"
                }`}>
                  {attending && <Check className="w-3 h-3 stroke-[3px]" />}
                </div>
                <span className="font-sans text-sm font-medium text-brand-text">
                  Dapat Hadir (Happily Attend)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="attendance"
                  checked={attending === false}
                  onChange={() => setAttending(false)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 border-brand-primary flex items-center justify-center transition-all ${
                  !attending ? "bg-brand-primary text-white" : "group-hover:bg-brand-secondary-fixed"
                }`}>
                  {!attending && <Check className="w-3 h-3 stroke-[3px]" />}
                </div>
                <span className="font-sans text-sm font-medium text-brand-text">
                  Tidak Dapat Hadir (Regretfully Decline)
                </span>
              </label>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2 text-left">
            <label className="font-sans text-[11px] font-bold tracking-widest text-brand-primary uppercase">
              Catatan / Pesan Khusus (Opsional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan ucapan selamat atau permintaan khusus, misal diet vegetarian, dll."
              rows={3}
              className="w-full bg-transparent border-b-2 border-brand-primary focus:border-brand-secondary focus:outline-none py-2 font-sans text-sm text-brand-text resize-none placeholder-brand-outline-variant/60"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 text-xs text-left">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-brand-primary text-white px-10 py-3.5 font-sans font-bold uppercase tracking-widest text-xs border-2 border-brand-secondary-fixed shadow-[4px_4px_0px_#e5e6b5] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#e5e6b5] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi RSVP"}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
