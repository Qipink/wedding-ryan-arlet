import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface BackgroundMusicProps {
  playTrigger: boolean;
}

export default function BackgroundMusic({ playTrigger }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Tentukan batasan waktu di sini (dalam satuan detik)
  const WAKTU_MULAI = 145; // Contoh: Mulai dari detik ke-178
  const WAKTU_SELESAI = 275; // Contoh: Berhenti di detik ke-220

  const playTriggerRef = useRef(playTrigger);
  const isPlayingRef = useRef(isPlaying);
  const isPausedByHideRef = useRef(false);

  useEffect(() => {
    playTriggerRef.current = playTrigger;
  }, [playTrigger]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Autopause when leaving the website (tab visibility changes)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (isPlayingRef.current) {
          audio.pause();
          setIsPlaying(false);
          isPausedByHideRef.current = true;
        }
      } else {
        if (isPausedByHideRef.current) {
          isPausedByHideRef.current = false;
          playAudioSegment();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(
      "https://mygmaslqyhxrtcabucrm.supabase.co/storage/v1/object/public/music/Barasuara-TerbuangDalamWaktu.mp3"
    );
    audio.loop = true;
    audio.volume = 0.8;
    // Set anonymous crossOrigin to prevent canvas or media access taint errors
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    // Fungsi untuk menetapkan waktu mulai ketika metadata audio telah dimuat
    const handleLoadedMetadata = () => {
      try {
        if (audio.currentTime < WAKTU_MULAI || audio.currentTime >= WAKTU_SELESAI) {
          audio.currentTime = WAKTU_MULAI;
        }
      } catch (err) {
        console.warn("Failed to set currentTime on metadata load:", err);
      }
    };

    // Fungsi untuk memantau durasi lagu yang sedang berjalan
    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      
      // Jika durasi lagu sudah melewati batas waktu selesai yang ditentukan
      try {
        if (audioRef.current.currentTime >= WAKTU_SELESAI) {
          if (audioRef.current.loop) {
            // Jika loop aktif, kembalikan posisi memutar ke WAKTU_MULAI
            audioRef.current.currentTime = WAKTU_MULAI;
          } else {
            // Jika tidak loop, matikan musiknya
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }
      } catch (err) {
        console.warn("Timeupdate state check failed:", err);
      }
    };

    // Fallback if primary Supabase file fails to load or experiences CORS block
    const handleAudioError = () => {
      console.warn("Primary audio failed to load. Switching to highly reliable fallback...");
      const fallbackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";
      if (audio.src !== fallbackUrl) {
        audio.src = fallbackUrl;
        audio.load();
        if (isPlayingRef.current || playTriggerRef.current) {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.log("Fallback play error:", err));
        }
      }
    };

    // Pasang event listener ke objek audio
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleAudioError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleAudioError);
      audio.pause();
    };
  }, []);

  // Modifikasi fungsi play untuk memutar audio secara langsung (synchrounous) demi mempertahankan context interaksi user
  const playAudioSegment = () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Hanya set currentTime jika metadata sudah dimuat (readyState >= 1)
      if (audio.readyState >= 1) {
        if (audio.currentTime < WAKTU_MULAI || audio.currentTime >= WAKTU_SELESAI) {
          audio.currentTime = WAKTU_MULAI;
        }
      }
    } catch (err) {
      console.warn("Failed to set safe currentTime:", err);
    }

    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.log("Playback blocked or audio error:", err);
        setIsPlaying(false);
      });
  };

  useEffect(() => {
    if (playTrigger) {
      playAudioSegment();
    }
  }, [playTrigger]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      playAudioSegment();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-40">
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center border-2 border-brand-secondary-fixed shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 ${
          isPlaying ? "animate-spin [animation-duration:8s]" : ""
        }`}
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-secondary flex items-center justify-center">
          <Music className="w-2.5 h-2.5 text-brand-primary-dark" />
        </div>
      </button>
    </div>
  );
}