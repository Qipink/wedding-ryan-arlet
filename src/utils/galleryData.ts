// src/utils/galleryData.ts

export interface GalleryImage {
  number: number;
  url: string;
  title: string;
  desc: string;
}

const BASE_URL = "https://mygmaslqyhxrtcabucrm.supabase.co/storage/v1/object/public/image";

export const galleryImages: GalleryImage[] = [
  // --- Kategori: Duo Blue (6 Items) ---
  {
    number: 1,
    url: `${BASE_URL}/duoBlue-1.webp`,
    title: "SERENADE IN BLUE",
    desc: "Langkah awal menyelaraskan mimpi dalam keanggunan warna langit."
  },
  {
    number: 2,
    url: `${BASE_URL}/duoBlue-2.webp`,
    title: "SHARED DREAMS",
    desc: "Menatap masa depan yang sama, membangun cerita bersama."
  },
  {
    number: 3,
    url: `${BASE_URL}/duoBlue-3.webp`,
    title: "BOUNDLESS JOY",
    desc: "Tawa lepas yang mengiringi kesiapan menuju hari bahagia."
  },
  {
    number: 4,
    url: `${BASE_URL}/duoBlue-4.webp`,
    title: "HARMONIOUS STRIDES",
    desc: "Keserasian dalam balutan doa dan harapan yang tulus."
  },
  {
    number: 5,
    url: `${BASE_URL}/duoBlue-5.webp`,
    title: "SIDE BY SIDE",
    desc: "Saling bersandar dan melangkah beriringan menatap hari esok."
  },
  {
    number: 6,
    url: `${BASE_URL}/duoBlue-6.webp`,
    title: "THE PROMISE",
    desc: "Komitmen sederhana yang melukiskan kehangatan abadi."
  },

  // --- Kategori: Duo Monochrome (1 Item) ---
  {
    number: 7,
    url: `${BASE_URL}/duoBW-1.webp`,
    title: "TIMELESS TALE",
    desc: "Cinta klasik yang tidak akan pernah pudar oleh waktu."
  },

  // --- Kategori: Duo Form (4 Items) ---
  {
    number: 8,
    url: `${BASE_URL}/duoForm-1.webp`,
    title: "SOLEMN MOMENTS",
    desc: "Ketulusan yang terukir nyata dalam tatapan mata."
  },
  {
    number: 9,
    url: `${BASE_URL}/duoForm-2.webp`,
    title: "THE ELEGANT UNION",
    desc: "Menyatukan dua cerita dalam satu ikatan formal yang sakral."
  },
  {
    number: 10,
    url: `${BASE_URL}/duoForm-3.webp`,
    title: "TOGETHER AS ONE",
    desc: "Setiap jejak langkah yang kita ukir kini menjadi tujuan bersama."
  },
  {
    number: 11,
    url: `${BASE_URL}/duoForm-4.webp`,
    title: "CHAPTER ONE",
    desc: "Awal mula dari lembaran baru kehidupan kami."
  },

  // --- Kategori: Duo Shadow (4 Items) ---
  {
    number: 12,
    url: `${BASE_URL}/duoShadow-1.webp`,
    title: "SILHOUETTE OF LOVE",
    desc: "Bayang-bayang kebersamaan yang menyimpan sejuta cerita teduh."
  },
  {
    number: 13,
    url: `${BASE_URL}/duoShadow-2.webp`,
    title: "ECHOES OF TIME",
    desc: "Momen magis yang abadi dalam bingkai waktu."
  },
  {
    number: 14,
    url: `${BASE_URL}/duoShadow-3.webp`,
    title: "THE COMPANION",
    desc: "Menjadi tempat berteduh ternyaman di kala suka maupun duka."
  },
  {
    number: 15,
    url: `${BASE_URL}/duoShadow-4.webp`,
    title: "ETERNAL CHRONICLES",
    desc: "Langkah mantap yang tak ragu menghadapi masa depan."
  },

  // --- Kategori: Man Blue & Man Form (7 Items) ---
  {
    number: 16,
    url: `${BASE_URL}/manBlue-1.webp`,
    title: "SERENITY",
    desc: "Ketenangan hati menyambut takdir indah yang telah digariskan."
  },
  {
    number: 17,
    url: `${BASE_URL}/manBlue-2.webp`,
    title: "THE GROOM'S CHOICE",
    desc: "Pesona bersahaja sang mempelai dalam balutan nuansa biru."
  },
  {
    number: 18,
    url: `${BASE_URL}/manForm-1.webp`,
    title: "A FIRM STANCE",
    desc: "Kesiapan dan keteguhan hati seorang lelaki memimpin masa depan."
  },
  {
    number: 19,
    url: `${BASE_URL}/manForm-2.webp`,
    title: "CONTEMPLATION",
    desc: "Merenungi arti tanggung jawab baru dengan senyuman hangat."
  },
  {
    number: 20,
    url: `${BASE_URL}/manForm-3.webp`,
    title: "THE D-DAY PREP",
    desc: "Detik-detik penuh fokus menjelang janji suci disuarakan."
  },
  {
    number: 21,
    url: `${BASE_URL}/manForm-4.webp`,
    title: "READY FOR YOU",
    desc: "Langkah mantap menuju altar kebahagiaan."
  },
  {
    number: 22,
    url: `${BASE_URL}/manShadow-1.webp`,
    title: "HIS REFLECTION",
    desc: "Sisi teduh yang bersiap menjadi pelindung terbaik."
  },

  // --- Kategori: Woman Blue, Woman Form & Shadow (4 Items) ---
  {
    number: 23,
    url: `${BASE_URL}/womanBlue-1.webp`,
    title: "ELEGANCE IN BLUE",
    desc: "Keanggunan yang terpancar dari ketulusan hati yang paling dalam."
  },
  {
    number: 24,
    url: `${BASE_URL}/womanForm-1.webp`,
    title: "THE BRIDE'S GRACE",
    desc: "Pancaran kebahagiaan sang mempelai wanita menyambut hari esok."
  },
  {
    number: 25,
    url: `${BASE_URL}/womanForm-2.webp`,
    title: "VISIONS OF LACE",
    desc: "Detail busana indah berbalut keanggunan sikap yang lembut."
  },
  {
    number: 26,
    url: `${BASE_URL}/womanShadow-1.webp`,
    title: "HER REFLECTION",
    desc: "Lembaran baru yang siap ditulis dengan tinta kasih sayang."
  }
];