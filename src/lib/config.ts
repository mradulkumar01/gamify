export const APP_CONFIG = {
  // Brand Configuration
  name: process.env.NEXT_PUBLIC_APP_NAME || "AFTERDARK — THE GAMING ABYSS",
  shortName: "AFTERDARK",
  subName: "THE GAMING ABYSS",
  tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "ENTER THE UNKNOWN. PLAY BEYOND FEAR.",
  altTagline: process.env.NEXT_PUBLIC_APP_ALT_TAGLINE || "EVERY GAME HAS A DARK SIDE.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description:
    "The premier horror gaming universe and discovery platform. Explore verified horror titles, legendary characters, upcoming releases, legitimate download links, and uncensored community lore.",

  // Owner & Creator Attribution
  owner: {
    name: process.env.NEXT_PUBLIC_OWNER_NAME || "MRADUL KUMAR",
    role: process.env.NEXT_PUBLIC_OWNER_ROLE || "Founder, Creator & Developer",
    platform: "AFTERDARK — THE GAMING ABYSS",
    github: process.env.NEXT_PUBLIC_OWNER_GITHUB || "https://github.com/mradulkumar01",
    linkedin: process.env.NEXT_PUBLIC_OWNER_LINKEDIN || "https://linkedin.com/in/mradul-kumar0001",
    email: process.env.NEXT_PUBLIC_OWNER_EMAIL || "",
    portfolio: process.env.NEXT_PUBLIC_OWNER_PORTFOLIO || "",
    bio:
      process.env.NEXT_PUBLIC_OWNER_BIO ||
      "Visionary software engineer and creator of AFTERDARK. Architecting cinematic horror discovery platforms that bridge atmospheric storytelling with verified gaming catalogs.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    mission:
      "AFTERDARK was forged to rescue horror enthusiasts from superficial game catalogs. We connect players with genuine, verified horror experiences, deconstruct legendary game worlds and lore, champion transparent community critiques, and safeguard digital game preservation.",
  },

  // Supported Categories & Genres
  genres: [
    "Horror",
    "Psychological Horror",
    "Survival Horror",
    "Action Horror",
    "Sci-Fi Horror",
    "Multiplayer Horror",
    "Indie Horror",
    "Retro Horror",
    "Action",
    "Adventure",
    "Open World",
    "RPG",
    "FPS",
    "Strategy",
  ],

  // Supported Platforms
  platforms: [
    { id: "all", name: "All Platforms" },
    { id: "pc", name: "PC (Windows / Mac / Linux)" },
    { id: "mobile", name: "Mobile (Android / iOS)" },
    { id: "playstation", name: "PlayStation 5 / PS4" },
    { id: "xbox", name: "Xbox Series X|S" },
    { id: "switch", name: "Nintendo Switch" },
  ],

  // Blog Categories
  blogCategories: [
    "Reviews",
    "Gaming News",
    "Guides and Walkthroughs",
    "Character Analysis",
    "Horror Game Stories",
    "Gaming Opinion",
    "Tips and Tricks",
    "Upcoming Releases",
    "Gaming Technology",
  ],

  // Audio Atmosphere Defaults
  audio: {
    defaultMuted: true,
    initialVolume: 0.25,
  },
};
