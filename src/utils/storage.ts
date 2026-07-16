import { createClient } from "@supabase/supabase-js";
import { RSVP, Wish } from "../types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.info(
    "%cSupabase Not Configured",
    "color: #ebd0d3; background: #591a22; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
    "Using localStorage fallback. To connect to Supabase, add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your env/secrets."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const RSVP_KEY = "ryan_arba_wedding_rsvp";
const WISH_KEY = "ryan_arba_wedding_wishes";
const LIKED_WISHES_KEY = "ryan_arba_liked_wishes";

const MOCK_WISHES: Wish[] = [
  {
    id: "w-1",
    name: "Aunty Maya",
    message: "Selamat menempuh hidup baru Ryan dan Arba! Semoga perjalanan kalian berdua selalu diliputi dengan tawa, berkah, dan cinta yang tak kunjung padam. Kami sangat bahagia untuk kalian!",
    likes: 8,
    createdAt: "2026-06-12T14:30:00Z",
  },
  {
    id: "w-2",
    name: "David & Lisa",
    message: "So happy to be part of your big day! Looking forward to the celebration. You both look absolutely perfect together! Semoga lancar sampai hari-H ya!",
    likes: 5,
    createdAt: "2026-06-14T09:15:00Z",
  },
  {
    id: "w-3",
    name: "Fadel Rahman",
    message: "Bro Ryan! Akhirnya melepas masa lajang juga haha. Selamat ya bro, semoga menjadi keluarga sakinah mawaddah warahmah dengan Arbaletta. Ditunggu reuni pas resepsi!",
    likes: 12,
    createdAt: "2026-06-15T18:40:00Z",
  },
  {
    id: "w-4",
    name: "Citra & Dimas",
    message: "Arbaaa sayangg, selamat ya! Terharu banget ngikutin cerita kalian dari zaman kuliah sampai akhirnya melangkah ke jenjang pernikahan. Bahagia selamanya ya kalian berdua!",
    likes: 6,
    createdAt: "2026-06-16T21:10:00Z",
  },
  {
    id: "w-5",
    name: "Pakde Heru & Keluarga",
    message: "Selamat ya untuk Ryan & Arbaletta. Semoga pernikahan kalian menjadi awal dari kisah panjang yang penuh kebahagiaan, kesabaran, dan rezeki yang melimpah. Amin.",
    likes: 3,
    createdAt: "2026-06-18T11:05:00Z",
  },
  {
    id: "w-6",
    name: "Siska Wardani",
    message: "Wishing you both a lifetime of love and happiness! Can't wait to see you in your gorgeous sage green outfit! Happy wedding Ryan & Arba! 💕",
    likes: 9,
    createdAt: "2026-06-20T08:22:00Z",
  }
];

// Helper to track which wish IDs are liked locally on this device
const getLikedWishesLocally = (): string[] => {
  const data = localStorage.getItem(LIKED_WISHES_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLikedWishesLocally = (likedIds: string[]): void => {
  localStorage.setItem(LIKED_WISHES_KEY, JSON.stringify(likedIds));
};

export const rsvpService = {
  async getUserRsvp(): Promise<RSVP | null> {
    const localData = localStorage.getItem(RSVP_KEY);
    if (!localData) return null;
    const parsedLocal = JSON.parse(localData);

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("rsvps")
          .select("*")
          .eq("id", parsedLocal.id)
          .single();
        
        if (data && !error) {
          return {
            id: data.id,
            name: data.name,
            guests: data.guests,
            attending: data.attending,
            notes: data.notes,
            createdAt: data.created_at,
          };
        }
      } catch (err) {
        console.error("Failed to fetch RSVP from Supabase, falling back to localStorage:", err);
      }
    }
    return parsedLocal;
  },

  async saveRsvp(rsvp: Omit<RSVP, "id" | "createdAt">): Promise<RSVP> {
    const localData = localStorage.getItem(RSVP_KEY);
    const existingId = localData ? JSON.parse(localData).id : "rsvp-" + Date.now();
    const createdAt = new Date().toISOString();

    const newRsvp: RSVP = {
      ...rsvp,
      id: existingId,
      createdAt,
    };

    // Always save locally first for quick access
    localStorage.setItem(RSVP_KEY, JSON.stringify(newRsvp));

    if (supabase) {
      try {
        const { error } = await supabase.from("rsvps").upsert({
          id: newRsvp.id,
          name: newRsvp.name,
          guests: newRsvp.guests,
          attending: newRsvp.attending,
          notes: newRsvp.notes || "",
          created_at: newRsvp.createdAt,
        });

        if (error) {
          console.error("Error upserting RSVP into Supabase:", error);
        }
      } catch (err) {
        console.error("Failed to sync RSVP to Supabase:", err);
      }
    }

    return newRsvp;
  },

  async clearRsvp(): Promise<void> {
    const localData = localStorage.getItem(RSVP_KEY);
    if (localData && supabase) {
      try {
        const parsed = JSON.parse(localData);
        await supabase.from("rsvps").delete().eq("id", parsed.id);
      } catch (err) {
        console.error("Failed to delete RSVP from Supabase:", err);
      }
    }
    localStorage.removeItem(RSVP_KEY);
  }
};

export const wishService = {
  async getWishes(): Promise<Wish[]> {
    const likedIds = getLikedWishesLocally();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("wishes")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && !error) {
          return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            message: item.message,
            likes: item.likes,
            likedByCurrentUser: likedIds.includes(item.id),
            createdAt: item.created_at,
          }));
        } else if (error) {
          console.error("Supabase wishes query error:", error);
        }
      } catch (err) {
        console.error("Failed to load wishes from Supabase, falling back to localStorage:", err);
      }
    }

    // Local fallback
    const localWishesData = localStorage.getItem(WISH_KEY);
    let wishesList: Wish[] = [];
    if (!localWishesData) {
      wishesList = MOCK_WISHES;
      localStorage.setItem(WISH_KEY, JSON.stringify(MOCK_WISHES));
    } else {
      wishesList = JSON.parse(localWishesData);
    }

    return wishesList.map(w => ({
      ...w,
      likedByCurrentUser: likedIds.includes(w.id),
    }));
  },

  async addWish(name: string, message: string): Promise<Wish> {
    const newWish: Wish = {
      id: "wish-" + Date.now(),
      name,
      message,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { error } = await supabase.from("wishes").insert({
          id: newWish.id,
          name: newWish.name,
          message: newWish.message,
          likes: newWish.likes,
          created_at: newWish.createdAt,
        });

        if (error) {
          console.error("Error inserting wish into Supabase:", error);
        } else {
          return newWish;
        }
      } catch (err) {
        console.error("Failed to save wish to Supabase:", err);
      }
    }

    // Local fallback
    const localWishesData = localStorage.getItem(WISH_KEY) || JSON.stringify(MOCK_WISHES);
    const wishes: Wish[] = JSON.parse(localWishesData);
    wishes.unshift(newWish);
    localStorage.setItem(WISH_KEY, JSON.stringify(wishes));
    return newWish;
  },

  async toggleLikeWish(wishId: string): Promise<Wish[]> {
    const likedIds = getLikedWishesLocally();
    const isCurrentlyLiked = likedIds.includes(wishId);
    let newLikedIds: string[];

    if (isCurrentlyLiked) {
      newLikedIds = likedIds.filter(id => id !== wishId);
    } else {
      newLikedIds = [...likedIds, wishId];
    }
    saveLikedWishesLocally(newLikedIds);

    const incrementVal = isCurrentlyLiked ? -1 : 1;

    if (supabase) {
      try {
        // Increment or decrement the likes count on Supabase
        const { error } = await supabase.rpc("increment_likes", {
          wish_id: wishId,
          increment_value: incrementVal
        });

        if (error) {
          // Fallback if the custom RPC increment function isn't set up yet:
          // fetch current wish, modify, then update.
          const { data: wishData } = await supabase
            .from("wishes")
            .select("likes")
            .eq("id", wishId)
            .single();

          if (wishData) {
            const currentLikes = wishData.likes;
            await supabase
              .from("wishes")
              .update({ likes: Math.max(0, currentLikes + incrementVal) })
              .eq("id", wishId);
          }
        }
      } catch (err) {
        console.error("Failed to update like in Supabase:", err);
      }
    }

    // Sync localStorage as well
    const localWishesData = localStorage.getItem(WISH_KEY) || JSON.stringify(MOCK_WISHES);
    const wishes: Wish[] = JSON.parse(localWishesData);
    const updated = wishes.map((w) => {
      if (w.id === wishId) {
        return {
          ...w,
          likes: Math.max(0, w.likes + incrementVal),
        };
      }
      return w;
    });
    localStorage.setItem(WISH_KEY, JSON.stringify(updated));

    // Return the updated list mapped with liked flags
    return updated.map(w => ({
      ...w,
      likedByCurrentUser: newLikedIds.includes(w.id),
    }));
  }
};
