import { useState } from "react";
import { Gift, Copy, Check, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AccountCard {
  bankName: string;
  accountNumber: string;
  holderName: string;
  logoUrl?: string;
}

export default function GiftRegistry() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showGiftRegistry, setShowGiftRegistry] = useState(false);

  const accounts: AccountCard[] = [
    {
      bankName: "Bank BCA",
      accountNumber: "8690123456",
      holderName: "Ryan Fahri F.",
    },
    {
      bankName: "Bank Mandiri",
      accountNumber: "137001928374",
      holderName: "Arbaletta Kalinda D. P.",
    },
  ];

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(accountNumber);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      className="py-12 mt-16 text-center border-t border-b border-dashed border-brand-outline-variant relative"
    >
      <div className="absolute top-2 left-2 text-brand-secondary/30 doodle-float">
        <Heart className="w-8 h-8 fill-brand-secondary" />
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-brand-secondary-fixed flex items-center justify-center text-brand-primary">
          <Gift className="w-6 h-6 text-brand-primary" />
        </div>
      </div>
      
      <h3 className="font-epilogue text-2xl font-semibold text-brand-primary mb-3">
        Kado Digital (Digital Gift)
      </h3>
      <p className="font-sans text-sm text-brand-outline max-w-md mx-auto mb-8 px-4 leading-relaxed">
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, Anda dapat mengirimkannya melalui rekening di bawah ini:
      </p>

      {!showGiftRegistry ? (
        <button
          onClick={() => setShowGiftRegistry(true)}
          className="bg-brand-primary text-white font-sans text-xs uppercase tracking-widest font-semibold px-8 py-3 rounded-full hover:bg-brand-primary-dark hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
        >
          Tampilkan Rekening
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto px-4 mt-6"
        >
          {accounts.map((acc, index) => (
            <div
              key={acc.accountNumber}
              className="bg-brand-surface-container-low border-2 border-brand-primary rounded-2xl p-6 relative flex flex-col justify-between text-left shadow-sm hover:rotate-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-epilogue text-sm font-bold text-brand-primary-dark">
                    {acc.bankName}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-secondary-fixed/50 flex items-center justify-center">
                  <span className="text-xs">💳</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-sans text-[10px] tracking-wider text-brand-outline uppercase block mb-1">
                  Nomor Rekening
                </span>
                <span className="font-epilogue text-lg font-bold text-brand-primary-dark block select-all tracking-wider">
                  {acc.accountNumber}
                </span>
              </div>

              <div className="flex justify-between items-end mt-2">
                <div>
                  <span className="font-sans text-[10px] tracking-wider text-brand-outline uppercase block mb-1">
                    Atas Nama
                  </span>
                  <span className="font-sans text-sm font-semibold text-brand-text">
                    {acc.holderName}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(acc.accountNumber)}
                  className="bg-white hover:bg-brand-secondary-fixed text-brand-primary p-2.5 rounded-lg border border-brand-primary-dark flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Salin No Rekening"
                >
                  {copiedId === acc.accountNumber ? (
                    <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
                  ) : (
                    <Copy className="w-4 h-4 text-brand-primary-dark" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {copiedId === acc.accountNumber && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-brand-primary/95 rounded-2xl flex flex-col items-center justify-center text-center p-4 text-white"
                  >
                    <Check className="w-8 h-8 text-white mb-2" />
                    <span className="font-sans text-xs tracking-wider uppercase font-bold">
                      Nomor Rekening Disalin!
                    </span>
                    <span className="font-sans text-[10px] text-white/80 mt-1">
                      Terima kasih atas tanda kasih Anda.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
