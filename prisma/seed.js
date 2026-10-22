const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Beginning AFTERDARK — THE GAMING ABYSS database seed...");

  // Clear existing records to ensure fresh, clean data
  await prisma.reviewHelpfulVote.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.reaction.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.savedGame.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.blogArticle.deleteMany({});
  await prisma.newsArticle.deleteMany({});
  await prisma.gameCharacter.deleteMany({});
  await prisma.gameScreenshot.deleteMany({});
  await prisma.officialDownloadLink.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.contentReport.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Core Users
  const passwordHash = await bcrypt.hash("DarkAbyss2026!", 10);

  const ownerUser = await prisma.user.create({
    data: {
      username: "mradulkumar",
      email: "mradul@afterdark.games",
      passwordHash: passwordHash,
      displayName: "MRADUL KUMAR",
      bio: "Founder, Creator & Developer of AFTERDARK. Crafting cinematic gaming discovery experiences that venture deep into the dark corners of interactive entertainment.",
      role: "ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      favoriteGenres: "Psychological Horror, Survival Horror, Action RPG",
      preferredPlatforms: "PC, PlayStation 5",
      isVerified: true,
    },
  });

  const authorUser = await prisma.user.create({
    data: {
      username: "gravekeeper",
      email: "gravekeeper@afterdark.games",
      passwordHash: passwordHash,
      displayName: "Elena Vance",
      bio: "Horror game archivist, atmospheric sound designer, and senior essayist.",
      role: "AUTHOR",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      favoriteGenres: "Cosmic Horror, Retro Horror, Indie",
      preferredPlatforms: "PC, Nintendo Switch",
      isVerified: true,
    },
  });

  const communityUser = await prisma.user.create({
    data: {
      username: "abysswalker",
      email: "walker@afterdark.games",
      passwordHash: passwordHash,
      displayName: "Viktor Gray",
      bio: "Survival horror speedrunner and creature design enthusiast.",
      role: "USER",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      favoriteGenres: "Survival Horror, Sci-Fi Horror",
      preferredPlatforms: "PC, Xbox Series X",
      isVerified: true,
    },
  });

  console.log("Created users:", ownerUser.username, authorUser.username, communityUser.username);

  // 2. Games Data
  const gamesData = [
    {
      slug: "silent-hill-2-remake",
      title: "Silent Hill 2 Remake",
      tagline: "In my restless dreams, I see that town.",
      shortDescription: "Having received a letter from his deceased wife, James heads to where they shared so many memories in the fog-drenched nightmare town of Silent Hill.",
      fullDescription: "Investigating a letter from his late wife Mary, James Sunderland returns to the mysterious town of Silent Hill—a place now transformed by suffocating mist, derelict streets, and grotesque manifestations of his own suppressed guilt. Bloober Team and Konami deliver a masterclass in modern psychological horror utilizing Unreal Engine 5, over-the-shoulder combat, binaural 3D audio, and breathtaking visual fidelity.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=pyC_qiW_444",
      genre: "Psychological Horror",
      genres: "Psychological Horror, Survival Horror, Atmospheric",
      tags: "Fog, Psychological, Foggy, Surreal, Guilt, Classic",
      releaseDate: new Date("2024-10-08"),
      isUpcoming: false,
      developer: "Bloober Team",
      publisher: "KONAMI",
      platforms: "PC, PlayStation 5",
      supportedOS: "Windows",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB) / PEGI 18",
      languageSupport: "English, Japanese, French, German, Italian, Spanish, Korean, Simplified Chinese",
      minCpu: "Intel Core i7-6700K / AMD Ryzen 5 3600",
      minGpu: "NVIDIA GeForce GTX 1080 / AMD Radeon RX 5700",
      minRam: "16 GB RAM",
      minStorage: "50 GB SSD",
      recCpu: "Intel Core i7-8700K / AMD Ryzen 5 3600X",
      recGpu: "NVIDIA GeForce RTX 2080 / AMD Radeon 6800XT",
      recRam: "16 GB RAM",
      recStorage: "50 GB SSD",
      price: 69.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.konami.com/games/silenthill/2r/",
      verifiedStatus: true,
      dataSource: "Konami Official Publishing & Steam Storefront",
      rating: 9.3,
      ratingCount: 384,
      pros: "Flawless psychological atmosphere; Breathtaking Unreal Engine 5 fog and sound design; Faithful yet modern reimagining of an all-time classic.",
      cons: "High hardware requirements; Pacing can feel deliberate for modern action fans.",
      isFeatured: true,
      isTrending: true,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official)",
          url: "https://store.steampowered.com/app/2124490/SILENT_HILL_2/",
          notes: "Official PC digital license with Steam Cloud & Achievements."
        },
        {
          platform: "PlayStation 5",
          storeName: "PlayStation Store (Official)",
          url: "https://store.playstation.com/concept/10005705",
          notes: "Native PS5 edition with DualSense haptic feedback and Tempest 3D Audio."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", caption: "The suffocating fog of Toluca Lake" },
        { imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80", caption: "Corridors of Brookhaven Hospital" }
      ]
    },
    {
      slug: "alan-wake-2",
      title: "Alan Wake 2",
      tagline: "It's not a lake, it's an ocean.",
      shortDescription: "A string of ritualistic murders threatens Bright Falls. FBI agent Saga Anderson arrives to investigate, while tormented writer Alan Wake attempts to write himself out of the Dark Place.",
      fullDescription: "Alan Wake 2 is Remedy Entertainment's landmark psychological survival horror masterpiece. Unraveling two intertwined single-player campaigns—Saga Anderson's detective investigation in the Pacific Northwest and Alan Wake's surreal nightmare trapped in the nightmare realm of the Dark Place. Featuring dual realities, live-action cinematic integration, and spine-chilling soundscapes.",
      coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=q668p9eJvOQ",
      genre: "Survival Horror",
      genres: "Survival Horror, Psychological, Detective Mystery",
      tags: "Mind Place, Remedy Connected Universe, Flashlight, Surreal, Live Action",
      releaseDate: new Date("2023-10-27"),
      isUpcoming: false,
      developer: "Remedy Entertainment",
      publisher: "Epic Games Publishing",
      platforms: "PC, PlayStation 5, Xbox Series X|S",
      supportedOS: "Windows",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB)",
      languageSupport: "English, French, German, Spanish, Italian, Japanese",
      minCpu: "Intel Core i5-7600K / AMD equivalent",
      minGpu: "GeForce RTX 2060 / Radeon RX 6600",
      minRam: "16 GB RAM",
      minStorage: "90 GB SSD",
      recCpu: "AMD Ryzen 7 3700X / Intel equivalent",
      recGpu: "GeForce RTX 3070 / Radeon RX 6700 XT",
      recRam: "16 GB RAM",
      recStorage: "90 GB SSD",
      price: 49.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.alanwake.com",
      verifiedStatus: true,
      dataSource: "Remedy Official / Epic Games Store",
      rating: 9.6,
      ratingCount: 512,
      pros: "Astonishing narrative craft and cinematic visuals; Groundbreaking use of the Mind Place; Incredibly intense combat encounters.",
      cons: "Demands powerful modern GPU hardware with Mesh Shader support.",
      isFeatured: true,
      isTrending: true,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "PC",
          storeName: "Epic Games Store (Official)",
          url: "https://store.epicgames.com/p/alan-wake-2",
          notes: "Official PC edition powered by Northlight Engine."
        },
        {
          platform: "PlayStation 5",
          storeName: "PlayStation Store (Official)",
          url: "https://store.playstation.com/concept/10003310",
          notes: "PS5 release with DualSense trigger feedback."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80", caption: "The Dark Place neon alleyways" },
        { imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", caption: "Cauldron Lake perimeter search" }
      ]
    },
    {
      slug: "resident-evil-4-remake",
      title: "Resident Evil 4 Remake",
      tagline: "Survival is only the beginning.",
      shortDescription: "Special Agent Leon S. Kennedy is dispatched to a remote European village dominated by a secluded cult to rescue the President's kidnapped daughter.",
      fullDescription: "Resident Evil 4 is Capcom's state-of-the-art rebirth of the groundbreaking 2005 survival-horror action title. Modernized gameplay, a reimagined storyline, and vivid RE Engine graphics make this nightmare richer and more tense than ever before.",
      coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=j5Ic2z3_xP0",
      genre: "Action Horror",
      genres: "Action Horror, Survival, Third-Person Shooter",
      tags: "Las Plagas, Leon Kennedy, Knife Parry, Merchant, Village",
      releaseDate: new Date("2023-03-24"),
      isUpcoming: false,
      developer: "Capcom",
      publisher: "Capcom",
      platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, iOS, macOS",
      supportedOS: "Windows, iOS, macOS",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB)",
      languageSupport: "English, Japanese, French, Italian, German, Spanish, Brazilian Portuguese, Russian",
      minCpu: "AMD Ryzen 3 1200 / Intel Core i5-7500",
      minGpu: "AMD Radeon RX 560 / NVIDIA GeForce GTX 1050 Ti",
      minRam: "8 GB RAM",
      minStorage: "60 GB",
      recCpu: "AMD Ryzen 5 3600 / Intel Core i7 8700",
      recGpu: "AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070",
      recRam: "16 GB RAM",
      recStorage: "60 GB SSD",
      price: 59.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.residentevil.com/re4/",
      verifiedStatus: true,
      dataSource: "Capcom Verified Publisher Listing",
      rating: 9.5,
      ratingCount: 780,
      pros: "Sublime parry mechanic; Exceptional pacing; Tremendous replayability with Mercenaries mode.",
      cons: "Minor alterations to certain classic audio lines.",
      isFeatured: true,
      isTrending: true,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official)",
          url: "https://store.steampowered.com/app/2050650/Resident_Evil_4/",
          notes: "Includes achievements and Steam Deck verification."
        },
        {
          platform: "iOS",
          storeName: "Apple App Store (Official Mobile/Mac)",
          url: "https://apps.apple.com/app/resident-evil-4/id6459829350",
          notes: "Official AAA mobile & iPadOS port for Apple Silicon devices."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80", caption: "The cursed European village square" }
      ]
    },
    {
      slug: "dead-space-remake",
      title: "Dead Space Remake",
      tagline: "Cut off their limbs.",
      shortDescription: "Isaac Clarke is an engineer sent to repair the USG Ishimura mining ship, only to discover its crew has been slaughtered by an alien scourge.",
      fullDescription: "The sci-fi survival horror classic returns, completely rebuilt from the ground up by Motive Studio on Frostbite engine to offer a deeper, more immersive experience. With stunning visual fidelity, suspenseful atmospheric audio, and improvements to gameplay including seamless zero-G exploration.",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=cTDJ8ptWqFA",
      genre: "Sci-Fi Horror",
      genres: "Sci-Fi Horror, Survival, Space",
      tags: "Necromorph, Plasma Cutter, Dismemberment, USG Ishimura, Zero-G",
      releaseDate: new Date("2023-01-27"),
      isUpcoming: false,
      developer: "Motive Studio",
      publisher: "Electronic Arts",
      platforms: "PC, PlayStation 5, Xbox Series X|S",
      supportedOS: "Windows",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB)",
      languageSupport: "English, French, Italian, German, Spanish, Japanese, Polish",
      minCpu: "Ryzen 5 2600x / Core i5 8600",
      minGpu: "RX 5700 / GTX 1070",
      minRam: "16 GB RAM",
      minStorage: "50 GB SSD",
      recCpu: "Ryzen 5 5600X / Core i5 11600K",
      recGpu: "Radeon RX 6700 XT / Geforce RTX 2070",
      recRam: "16 GB RAM",
      recStorage: "50 GB SSD",
      price: 59.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.ea.com/games/dead-space/dead-space",
      verifiedStatus: true,
      dataSource: "EA Motive Official Storefront",
      rating: 9.1,
      ratingCount: 310,
      pros: "The Intensity Director creates perpetual dread; Masterful lighting and flesh peel system; Fully voiced Isaac Clarke.",
      cons: "Demanding ray-tracing implementation.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official)",
          url: "https://store.steampowered.com/app/1693980/Dead_Space/",
          notes: "Official PC release on Steam."
        },
        {
          platform: "Epic Games",
          storeName: "Epic Games Store (Official)",
          url: "https://store.epicgames.com/p/dead-space",
          notes: "Verified digital PC store page."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", caption: "The dim corridors of the USG Ishimura" }
      ]
    },
    {
      slug: "phasmophobia",
      title: "Phasmophobia",
      tagline: "Can you hear us? Give us a sign.",
      shortDescription: "A 4-player online co-op psychological horror where you and your team of paranormal investigators enter haunted locations filled with paranormal activity.",
      fullDescription: "Phasmophobia is an unprecedented 4 player online co-op psychological horror hit. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost hunting equipment at your disposal in order to gather as much evidence as you can. Features full voice-recognition where entities listen to your actual spoken words.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=sNxA5x65Z0E",
      genre: "Multiplayer Horror",
      genres: "Multiplayer Horror, Co-op, Ghost Investigation",
      tags: "EMF Reader, Spirit Box, Ouija Board, Voice Recognition, Co-op",
      releaseDate: new Date("2020-09-18"),
      isUpcoming: false,
      developer: "Kinetic Games",
      publisher: "Kinetic Games",
      platforms: "PC, PlayStation 5, Xbox Series X|S, PS VR2",
      supportedOS: "Windows",
      gameModes: "Co-op, Multiplayer, Singleplayer",
      playerCount: "1 - 4 Players",
      ageRating: "Teen 13+ / PEGI 16",
      languageSupport: "English, French, German, Italian, Spanish, Portuguese, Russian, Japanese",
      minCpu: "Intel Core i5-4590 / AMD FX 8350",
      minGpu: "NVIDIA GTX 970 / AMD Radeon R9 290",
      minRam: "8 GB RAM",
      minStorage: "21 GB",
      recCpu: "Intel Core i5-10600 / AMD Ryzen 5 3600",
      recGpu: "NVIDIA RTX 2060 / AMD Radeon RX 5700",
      recRam: "16 GB RAM",
      recStorage: "21 GB SSD",
      price: 19.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://kineticgames.co.uk",
      verifiedStatus: true,
      dataSource: "Kinetic Games Official",
      rating: 8.9,
      ratingCount: 640,
      pros: "Terrifying microphone detection mechanic; Infinite emergent hilarity and dread with friends; Active continuous content updates.",
      cons: "Visual fidelity is functional rather than cinematic.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: false,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official)",
          url: "https://store.steampowered.com/app/739630/Phasmophobia/",
          notes: "Official PC edition with VR support."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80", caption: "Investigating the abandoned asylum with UV light" }
      ]
    },
    {
      slug: "alien-isolation",
      title: "Alien: Isolation",
      tagline: "How will you survive?",
      shortDescription: "Discover the true meaning of fear in Alien: Isolation, a survival horror set in an atmosphere of constant dread and mortal danger fifteen years after the original film.",
      fullDescription: "Underpowered and underprepared, Amanda Ripley must scrounge resources, improvise solutions and use her wits, not just to succeed in her mission to discover what happened to her mother, but to simply stay alive as an unscripted, reactive Alien stalks her through Sevastopol Station.",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=7h0cgmvIrZw",
      genre: "Sci-Fi Horror",
      genres: "Sci-Fi Horror, Stealth, Survival",
      tags: "Xenomorph, Motion Tracker, Sevastopol, Retro-Futurism, Stealth",
      releaseDate: new Date("2014-10-06"),
      isUpcoming: false,
      developer: "Creative Assembly",
      publisher: "SEGA / Feral Interactive",
      platforms: "PC, macOS, Linux, Android, iOS, Nintendo Switch, PlayStation, Xbox",
      supportedOS: "Windows, macOS, Linux, Android, iOS",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB)",
      languageSupport: "English, French, Italian, German, Spanish, Polish, Russian, Japanese",
      minCpu: "3.16Ghz Intel Core 2 Duo E8500",
      minGpu: "1GB DirectX 11 (AMD Radeon HD 5550 or Nvidia GeForce GT 430)",
      minRam: "4 GB RAM",
      minStorage: "35 GB",
      recCpu: "AMD: Phenom II X4 955 or Intel: Core 2 Quad Q9650",
      recGpu: "2GB DirectX 11 (AMD Radeon R9 200 Series or Nvidia GeForce GTX 660)",
      recRam: "8 GB RAM",
      recStorage: "35 GB",
      price: 39.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.alienisolation.com",
      verifiedStatus: true,
      dataSource: "SEGA & Feral Interactive Official",
      rating: 9.4,
      ratingCount: 890,
      pros: "Arguably the most intelligent and terrifying AI adversary in video game history; Flawless 1979 film retro-futuristic aesthetic; Incredible port on iOS and Android.",
      cons: "Campaign length can feel slightly stretched in final chapters.",
      isFeatured: false,
      isTrending: false,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official PC)",
          url: "https://store.steampowered.com/app/214490/Alien_Isolation/",
          notes: "Verified Steam PC edition."
        },
        {
          platform: "Android",
          storeName: "Google Play (Official Mobile)",
          url: "https://play.google.com/store/apps/details?id=com.feralinteractive.alienisolation_android",
          notes: "Official Feral Interactive Android edition with custom touch controls & gamepad support."
        },
        {
          platform: "iOS",
          storeName: "Apple App Store (Official iOS)",
          url: "https://apps.apple.com/app/alien-isolation/id1573029090",
          notes: "Full desktop game running natively on iPhone and iPad."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", caption: "The Motion Tracker beep echoes in Sevastopol Station" }
      ]
    },
    {
      slug: "amnesia-the-bunker",
      title: "Amnesia: The Bunker",
      tagline: "Left alone in a desolate WW1 bunker.",
      shortDescription: "A first-person horror game set in a desolate WW1 bunker. Face the oppressing terrors stalking the dark corridors. Search for and use tools and weapons, while keeping the lights on at all costs.",
      fullDescription: "Amnesia: The Bunker is the latest triumph from Frictional Games. You play as French soldier Henri Clément, trapped in an underground military bunker with only one bullet left in your revolver, a noisy dynamo flashlight, and a relentless creature drawn to every sound.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=S01Z8j3dCjU",
      genre: "Survival Horror",
      genres: "Survival Horror, Immersive Sim, Psychological",
      tags: "WW1 Bunker, Generator, Emergent Physics, Dynamite, Frictional Games",
      releaseDate: new Date("2023-06-06"),
      isUpcoming: false,
      developer: "Frictional Games",
      publisher: "Frictional Games",
      platforms: "PC, PlayStation 4, Xbox One, Xbox Series X|S",
      supportedOS: "Windows",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB)",
      languageSupport: "English, French, German, Spanish, Russian, Portuguese",
      minCpu: "Core i3 / AMD FX 2.4Ghz",
      minGpu: "OpenGL 4.3 - NVIDIA GeForce GTX 460 / AMD Radeon HD 5750",
      minRam: "4 GB RAM",
      minStorage: "35 GB",
      recCpu: "Core i5 / Ryzen 5",
      recGpu: "OpenGL 4.5 - NVIDIA GeForce GTX 680 / AMD Radeon RX 580",
      recRam: "8 GB RAM",
      recStorage: "35 GB SSD",
      price: 24.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://frictionalgames.com/amnesia-the-bunker/",
      verifiedStatus: true,
      dataSource: "Frictional Games Official",
      rating: 8.8,
      ratingCount: 220,
      pros: "Unscripted immersive sim physics; Agonizing tension managing fuel and the noisy dynamo flashlight; High replay value with randomized item positions.",
      cons: "Relatively short campaign duration for experienced survival horror players.",
      isFeatured: false,
      isTrending: false,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official)",
          url: "https://store.steampowered.com/app/1944430/Amnesia_The_Bunker/",
          notes: "Official PC release."
        },
        {
          platform: "GOG",
          storeName: "GOG.com (Official DRM-Free)",
          url: "https://www.gog.com/en/game/amnesia_the_bunker",
          notes: "DRM-free digital PC edition."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80", caption: "Fueling the central generator before the shadows descend" }
      ]
    },
    {
      slug: "signalis",
      title: "Signalis",
      tagline: "A classic survival horror experience with a dystopian retro-tech aesthetic.",
      shortDescription: "Awaken from slumber and explore a surreal retrotech world as Elster, a technician Replika searching for her lost partner and her lost dreams.",
      fullDescription: "Signalis is an indie psychological survival horror game created by rose-engine. Set in a dystopian future where humanity has colonized the solar system, the game channels classic Resident Evil and Silent Hill gameplay with a chilling blend of Cosmic Horror and Cold War anime aesthetics.",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=J_GkC9L2TjE",
      genre: "Psychological Horror",
      genres: "Psychological Horror, Retro, Sci-Fi",
      tags: "Replika, Radio Puzzles, Inventory Management, Cosmic Horror, Anime Aesthetic",
      releaseDate: new Date("2022-10-27"),
      isUpcoming: false,
      developer: "rose-engine",
      publisher: "Humble Games",
      platforms: "PC, Nintendo Switch, PlayStation 4, Xbox One",
      supportedOS: "Windows",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Mature 17+ (ESRB)",
      languageSupport: "English, German, Japanese, Korean, Simplified Chinese",
      minCpu: "Intel Core i5-2300 or AMD FX-4350",
      minGpu: "NVIDIA GeForce GTX 650 or AMD Radeon HD 5770",
      minRam: "4 GB RAM",
      minStorage: "2 GB",
      recCpu: "Intel Core i7-3770 or AMD FX-8350",
      recGpu: "NVIDIA GeForce GTX 1050 or AMD Radeon RX 560",
      recRam: "8 GB RAM",
      recStorage: "2 GB SSD",
      price: 19.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "http://rose-engine.org/signalis/",
      verifiedStatus: true,
      dataSource: "rose-engine / Humble Games",
      rating: 9.2,
      ratingCount: 340,
      pros: "Hauntingly beautiful retro-tech pixel art; Emotionally devastating story; Outstanding ambient synthesizer soundtrack.",
      cons: "Original 6-item inventory slot limit can require backtracking (though customizable in updates).",
      isFeatured: false,
      isTrending: true,
      isEditorPick: true,
      downloadLinks: [
        {
          platform: "Steam",
          storeName: "Steam Store (Official)",
          url: "https://store.steampowered.com/app/1262350/SIGNALIS/",
          notes: "Official PC release."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", caption: "The crimson eye of the mining facility" }
      ]
    },
    {
      slug: "od-overdose",
      title: "OD (Overdose)",
      tagline: "For All Players and Screamers.",
      shortDescription: "A groundbreaking new interactive horror experience helmed by visionary director Hideo Kojima in collaboration with Oscar-winning director Jordan Peele and Xbox Game Studios.",
      fullDescription: "OD explores the concept of testing your fear threshold, and what it means to overdose on fear while blurring the boundaries between video game and film. Starring Sophia Lillis, Hunter Schafer, and Udo Kier, OD leverages Xbox Cloud Gaming technology and Unreal Engine MetaHuman shaders to redefine interactive fear.",
      coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=kYv9b4Qk87U",
      genre: "Psychological Horror",
      genres: "Psychological Horror, Cinematic, Mystery",
      tags: "Hideo Kojima, Jordan Peele, Cloud Tech, Unreal Engine MetaHuman, Upcoming",
      releaseDate: new Date("2026-11-15"),
      isUpcoming: true,
      developer: "Kojima Productions",
      publisher: "Xbox Game Studios",
      platforms: "PC, Xbox Series X|S, Cloud Gaming",
      supportedOS: "Windows, Cloud",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Rating Pending (Expected Mature 17+)",
      languageSupport: "English, Japanese, and global localizations",
      minCpu: "To be announced by Xbox Game Studios",
      minGpu: "To be announced",
      minRam: "16 GB RAM (Expected)",
      minStorage: "SSD Required",
      recCpu: "TBA",
      recGpu: "TBA",
      recRam: "TBA",
      recStorage: "TBA",
      price: 69.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.kojimaproductions.jp/en/OD-announcement",
      verifiedStatus: true,
      dataSource: "Kojima Productions & The Game Awards Official Showcase",
      rating: 0,
      ratingCount: 0,
      pros: "Dream collaboration between Hideo Kojima and Jordan Peele; Hyper-realistic MetaHuman facial capture.",
      cons: "Release date yet to be finalized.",
      isFeatured: true,
      isTrending: true,
      isEditorPick: false,
      downloadLinks: [
        {
          platform: "PC",
          storeName: "Xbox Game Studios (Official Announcement)",
          url: "https://www.xbox.com/en-US/games/od",
          notes: "Official Xbox title page."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80", caption: "The purple dinosaur door teaser render" }
      ]
    },
    {
      slug: "silent-hill-townfall",
      title: "Silent Hill: Townfall",
      tagline: "Signals from the dark deep.",
      shortDescription: "Co-produced with Annapurna Interactive and developed by BAFTA award-winning studio No Code (Stories Untold, Observation).",
      fullDescription: "Silent Hill: Townfall is a bold new entry in the legendary franchise designed to offer a unique perspective on the town's lore. Developed by Scottish horror masters No Code, Townfall leans into tactile retro communication devices, encrypted frequencies, and claustrophobic dread.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=wXvOQ5D26C4",
      genre: "Psychological Horror",
      genres: "Psychological Horror, Mystery, Sci-Fi",
      tags: "No Code, Annapurna, Frequency Audio, Encrypted Signals, Upcoming",
      releaseDate: new Date("2026-10-31"),
      isUpcoming: true,
      developer: "No Code Studios",
      publisher: "Konami / Annapurna Interactive",
      platforms: "PC, PlayStation 5",
      supportedOS: "Windows",
      gameModes: "Singleplayer",
      playerCount: "1 Player",
      ageRating: "Rating Pending",
      languageSupport: "English, Japanese, Worldwide",
      minCpu: "TBA",
      minGpu: "TBA",
      minRam: "16 GB RAM",
      minStorage: "TBA",
      price: 49.99,
      isFreeToPlay: false,
      currency: "USD",
      officialWebsite: "https://www.konami.com/games/silenthill/",
      verifiedStatus: true,
      dataSource: "Konami Official Transmission",
      rating: 0,
      ratingCount: 0,
      pros: "Crafted by the masters of psychological narrative tension at No Code; Fresh narrative angle on the Silent Hill mythos.",
      cons: "Limited gameplay reveals so far.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: false,
      downloadLinks: [
        {
          platform: "PC",
          storeName: "Konami Official Portal",
          url: "https://www.konami.com/games/silenthill/",
          notes: "Official announcement listing."
        }
      ],
      screenshots: [
        { imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80", caption: "The CRT radio monitor decoding unknown audio transmissions" }
      ]
    }
  ];

  console.log(`Seeding ${gamesData.length} games...`);

  const createdGamesMap = {};

  for (const gameItem of gamesData) {
    const { downloadLinks, screenshots, ...gameFields } = gameItem;
    const createdGame = await prisma.game.create({
      data: {
        ...gameFields,
        downloadLinks: {
          create: downloadLinks
        },
        screenshots: {
          create: screenshots
        }
      }
    });
    createdGamesMap[createdGame.slug] = createdGame;
  }

  // 3. Game Characters & Lore
  const charactersData = [
    {
      slug: "james-sunderland",
      name: "James Sunderland",
      portraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      gameId: createdGamesMap["silent-hill-2-remake"].id,
      gameTitle: "Silent Hill 2 Remake",
      role: "Protagonist",
      characterClass: "Grieving Survivor",
      species: "Human",
      abilities: "Melee combat improvisation, radio static interpretation, high psychological resilience",
      weapons: "Steel pipe, wooden plank with nails, hand gun, hunting rifle",
      backstory: "James Sunderland is a soft-spoken clerk whose life collapsed three years prior following the protracted terminal illness of his beloved wife Mary. When a letter arrives bearing her handwriting, claiming she is waiting for him in their 'special place' in Silent Hill, he travels into the mist.",
      personality: "Melancholic, emotionally repressed, determined, burdened by unresolved trauma.",
      relationships: "Mary Shepherd-Sunderland (Deceased Wife), Maria (Manifestation), Angela Orosco (Fellow Wanderer), Eddie Dombrowski (Fellow Wanderer)",
      firstAppearance: "Silent Hill 2 (2001 / Remake 2024)",
      keyEvents: "Arriving at the observation deck overlooking Toluca Lake; encountering Maria in Rosewater Park; descending into the Historical Society abyss.",
      strengths: "Single-minded focus, physical endurance against horrific entities.",
      weaknesses: "Overwhelming psychological guilt, denial of past realities.",
      trivia: "His iconic green military M-65 field jacket features authentic patch insignias subtly distressed in the remake.",
      hasSpoilers: true,
      sources: "Silent Hill 2 Official Lore Archive & Konami Character Profiles"
    },
    {
      slug: "pyramid-head",
      name: "Red Pyramid Thing (Pyramid Head)",
      portraitUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
      gameId: createdGamesMap["silent-hill-2-remake"].id,
      gameTitle: "Silent Hill 2 Remake",
      role: "Antagonist / Judge",
      characterClass: "Executioner Manifestation",
      species: "Supernatural entity / Guilt Manifestation",
      abilities: "Immunity to firearm trauma, superhuman strength, psychological terror projection",
      weapons: "Great Knife (Great Blade), Long Spear",
      backstory: "A towering figure cloaked in a butcher's apron, crowned with an oppressive geometric iron helmet that conceals any human countenance. Born from James Sunderland's subconscious desire for retribution and execution for his past sins.",
      personality: "Relentless, silent, methodical, impartial executor.",
      relationships: "James Sunderland (Creator / Target), The Valtiel Sect (Thematic inspiration)",
      firstAppearance: "Silent Hill 2 (2001)",
      keyEvents: "The Wood Side Apartments stairwell encounter; the roof drop confrontation; the dual spear duel in Lakeview Hotel.",
      strengths: "Invulnerable to standard weapons until its symbolic purpose is fulfilled.",
      weaknesses: "Bound strictly to James's acceptance of truth; once guilt is acknowledged, its purpose dissolves.",
      trivia: "Creature designer Masahiro Ito originally conceived the headpiece as an angled wedge of iron to embody agonizing, uncomfortable weight.",
      hasSpoilers: true,
      sources: "Konami Official Monster Compendium & Masahiro Ito Design Notes"
    },
    {
      slug: "alan-wake",
      name: "Alan Wake",
      portraitUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      gameId: createdGamesMap["alan-wake-2"].id,
      gameTitle: "Alan Wake 2",
      role: "Protagonist",
      characterClass: "Reality-Bending Author / Parautilitarian",
      species: "Human",
      abilities: "Clairvoyant manuscript creation, reality rewriting via the Clicker and Angel Lamp",
      weapons: "Angel Lamp, flare gun, sawed-off shotgun, revolver, flashbangs",
      backstory: "A bestselling New York crime novelist who suffered severe writer's block before traveling to Cauldron Lake with his wife Alice in 2010. Trapped for thirteen subjective years within the Dark Place, Alan battles endless iterations of his evil double 'Scratch' to write his salvation.",
      personality: "Brooding, brilliant, driven, prone to self-doubt, fiercely devoted to saving his wife.",
      relationships: "Alice Wake (Wife), Saga Anderson (Collaborator), Wulfgar Zane / Thomas Zane, Barry Wheeler (Agent)",
      firstAppearance: "Alan Wake (2010) / Alan Wake 2 (2023)",
      keyEvents: "Diving into Cauldron Lake in 2010; navigating the Oceanview Hotel ritual loops; broadcasting through the talk show studio with Mr. Door.",
      strengths: "Creative vision capable of altering cosmic fabric, mastery over the light.",
      weaknesses: "Vulnerable to despair, insomnia, and manipulation by the Dark Presence.",
      trivia: "Portrayed physically by Finnish actor Ilkka Villi and voiced by Matthew Porretta.",
      hasSpoilers: false,
      sources: "Remedy Entertainment Official Lore Archives"
    },
    {
      slug: "leon-s-kennedy",
      name: "Leon S. Kennedy",
      portraitUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      gameId: createdGamesMap["resident-evil-4-remake"].id,
      gameTitle: "Resident Evil 4 Remake",
      role: "Protagonist",
      characterClass: "DSO Government Special Agent",
      species: "Human",
      abilities: "Acrobatic martial arts, combat knife parrying, tactical firearms proficiency",
      weapons: "Combat Knife, SG-09 R Handgun, Riot Gun Shotgun, Bolt Thrower, Red9",
      backstory: "A former rookie Raccoon City police officer whose fateful first day on the job turned into a bio-apocalyptic disaster in 1998. Having survived Raccoon City, Leon was coerced into rigorous federal special operations training, becoming one of the most capable counter-bioterrorism operatives on Earth.",
      personality: "Cynical yet deeply compassionate, sarcastic under pressure, uncompromisingly moral.",
      relationships: "Ada Wong (Complicated Rival / Savior), Ashley Graham (Protectee), Major Jack Krauser (Former Mentor)",
      firstAppearance: "Resident Evil 2 (1998)",
      keyEvents: "The Raccoon City incident; the rescue operation of Ashley Graham in rural Spain; the deathmatch with Jack Krauser.",
      strengths: "Incredible situational agility, laser precision with blade and firearm, quick tactical improvisation.",
      weaknesses: "Carries profound survivor's guilt from the fall of Raccoon City.",
      trivia: "In the remake, his combat knife features realistic degradation and can be reinforced at the Merchant's shop.",
      hasSpoilers: false,
      sources: "Capcom Resident Evil Archives"
    },
    {
      slug: "isaac-clarke",
      name: "Isaac Clarke",
      portraitUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      gameId: createdGamesMap["dead-space-remake"].id,
      gameTitle: "Dead Space Remake",
      role: "Protagonist",
      characterClass: "Ship Systems Engineer",
      species: "Human",
      abilities: "Kinesis and Stasis module mastery, zero-G spatial maneuvering, high-tech industrial engineering",
      weapons: "211-V Plasma Cutter, Line Gun, Pulse Rifle, Ripper, Flamethrower",
      backstory: "Isaac Clarke is an electrical and mechanical engineer stationed aboard the repair vessel USG Kellion. He volunteers for an emergency maintenance dispatch to the USG Ishimura planetary cracker ship hoping to reunite with his girlfriend, Senior Medical Officer Nicole Brennan.",
      personality: "Pragmatic, resilient, technically brilliant, struggling against cognitive dementia induced by the Marker.",
      relationships: "Nicole Brennan (Partner), Kendra Daniels (Kellion Team), Zach Hammond (Chief Security Officer)",
      firstAppearance: "Dead Space (2008 / Remake 2023)",
      keyEvents: "The initial necromorph ambush in Kellion flight lounge; zero-g repair of the ADS asteroid defense cannon; confronting the Marker on Aegis VII.",
      strengths: "Utilizes mining tools with lethal anatomical precision, unmatched engineering capability.",
      weaknesses: "Vulnerable to Marker-induced auditory and visual hallucinations.",
      trivia: "Named after iconic science fiction authors Isaac Asimov and Arthur C. Clarke.",
      hasSpoilers: false,
      sources: "EA Motive / Visceral Games Official Bible"
    },
    {
      slug: "the-xenomorph",
      name: "The Xenomorph (Alien)",
      portraitUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      gameId: createdGamesMap["alien-isolation"].id,
      gameTitle: "Alien: Isolation",
      role: "Apex Predator / Antagonist",
      characterClass: "Extraterrestrial Endoparasitoid",
      species: "Xenomorph XX121",
      abilities: "Unscripted adaptive learning AI, acoustic and visual hunting, acid blood, silent ventilation duct travel",
      weapons: "Pharyngeal second jaw, razor tail, claws, acid blood",
      backstory: "The ultimate biological organism. Brought aboard the commercial station Sevastopol by the crew of the salvage vessel Anesidora after harvesting a derelict vessel on LV-426, the organism systematically wiped out Sevastopol's population.",
      personality: "Calculated, relentlessly curious, devoid of fear or mercy.",
      relationships: "Amanda Ripley (Primary Prey), Weyland-Yutani (Exploiter)",
      firstAppearance: "Alien (1979 film) / Alien: Isolation (2014)",
      keyEvents: "The medical pavilion slaughter; stalking through the vents of Apollo Core; the nest infestation below engineering.",
      strengths: "Completely invulnerable to all conventional firearms; adapts to player diversion tactics over time.",
      weaknesses: "Aversive to high-temperature flame (Flamethrower and Molotov cocktails).",
      trivia: "The AI operates on two distinct systems: a macro 'Director' that knows where the player is, and an internal 'Micro' Alien brain that must discover the player organically.",
      hasSpoilers: false,
      sources: "Creative Assembly Technical Papers & 20th Century Fox Alien Canon"
    }
  ];

  console.log(`Seeding ${charactersData.length} game characters...`);
  for (const charItem of charactersData) {
    await prisma.gameCharacter.create({
      data: charItem
    });
  }

  // 4. News Articles
  const newsData = [
    {
      slug: "silent-hill-2-remake-crosses-milestone",
      title: "Silent Hill 2 Remake Surpasses 2 Million Units Sold Worldwide as Psychological Horror Booms",
      subtitle: "Bloober Team and Konami's faithful atmospheric reimaging proves that single-player psychological dread is more viable than ever.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      content: `Konami Digital Entertainment and Polish developer Bloober Team announced today that their critically acclaimed remake of Silent Hill 2 has officially surpassed two million copies sold across PlayStation 5 and PC via Steam within its initial global launch window.\n\nThe commercial triumph comes alongside glowing reception from both legacy franchise veterans and modern horror gamers. By meticulously recreating Akira Yamaoka's iconic soundscape and elevating Masahiro Ito's nightmarish creature aesthetics through Unreal Engine 5, the release has revitalized interest in psychological survival horror.\n\nIndustry analysts note that the game's success cements Konami's strategic pivot back into dedicated prestige horror experiences, with additional franchise installments including Silent Hill: Townfall and Silent Hill: The Short Message setting the stage for a new golden era.`,
      authorName: "MRADUL KUMAR",
      authorRole: "Founder & Editor-in-Chief",
      gameId: createdGamesMap["silent-hill-2-remake"].id,
      tags: "Konami, Bloober Team, Sales Records, Milestones, Unreal Engine 5",
      readTimeMinutes: 4,
      sourceUrl: "https://www.konami.com/games/corporate/en/news/release/20241018/"
    },
    {
      slug: "kojima-unveils-new-details-on-od-overdose",
      title: "Hideo Kojima and Jordan Peele Detail Revolutionary Cloud Horror Project 'OD'",
      subtitle: "Kojima Productions teases a terrifying convergence of interactive video games and cinematic psychological filmmaking.",
      coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
      content: `At an exclusive industry roundtable, visionary game director Hideo Kojima alongside Oscar-winning filmmaker Jordan Peele shed new light on their highly secretive upcoming horror project, titled OD.\n\nLeveraging Microsoft's cutting-edge Xbox Cloud Gaming infrastructure and Unreal Engine's groundbreaking MetaHuman digital human pipeline, OD aims to push the boundaries of what constitutes fear in an interactive medium. Starring Sophia Lillis, Hunter Schafer, and legendary genre actor Udo Kier, the experience revolves around linguistic phonetics and the physiological boundaries of panic.\n\n"We are building something that is neither purely a film nor strictly a video game," explained Kojima. "It is a new medium of scream." Peele echoed the sentiment, praising the project's psychological subversion and surreal claustrophobia.`,
      authorName: "Elena Vance",
      authorRole: "Senior Horror Games Editor",
      gameId: createdGamesMap["od-overdose"].id,
      tags: "Kojima Productions, Jordan Peele, Xbox Game Studios, Cloud Gaming, OD",
      readTimeMinutes: 5,
      sourceUrl: "https://www.kojimaproductions.jp/en"
    },
    {
      slug: "alien-isolation-sequel-confirmed-in-development",
      title: "Creative Assembly Officially Confirms Alien: Isolation Sequel in Active Development",
      subtitle: "Director Al Hope announces a new chapter in the survival horror benchmark as the original celebrates its 10th anniversary.",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      content: `On the exact tenth anniversary of Alien: Isolation's 2014 launch, Creative Assembly creative director Al Hope published an open letter to fans confirming that a direct sequel is currently in early development.\n\n"When we launched Alien: Isolation, our goal was to deliver a truly authentic Alien experience—a game that returned to the DNA of Ridley Scott's 1979 masterpiece: pure atmospheric survival against a creature far smarter than you," Hope stated. "On this 10th anniversary, it feels only fitting to let you know that our team has heard your distress call loud and clear, and we have embarked on the next chapter."\n\nWhile specific platform targets and narrative details remain classified, expectations are extraordinarily high for how modern computational power will push the franchise's legendary dual-brain AI systems.`,
      authorName: "MRADUL KUMAR",
      authorRole: "Founder & Editor-in-Chief",
      gameId: createdGamesMap["alien-isolation"].id,
      tags: "Creative Assembly, SEGA, Alien, Sequel, Survival Horror",
      readTimeMinutes: 3,
      sourceUrl: "https://x.com/AlienIsolation/status/1843288126742516187"
    }
  ];

  console.log(`Seeding ${newsData.length} news articles...`);
  for (const n of newsData) {
    await prisma.newsArticle.create({
      data: n
    });
  }

  // 5. Community Blog Articles
  const blogsData = [
    {
      slug: "the-architecture-of-dread-sound-design-in-alan-wake-2",
      title: "The Architecture of Dread: How Alan Wake 2 Rewrote Survival Horror Sound Design",
      subtitle: "Analyzing the psychological weight of binaural audio, screeching shadow whispers, and musical interludes in Cauldron Lake.",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      category: "Horror Game Stories",
      content: `Survival horror is fundamentally an auditory discipline. Long before a visual apparition emerges from the darkness, the human mind constructs a thousand terrifying possibilities from a stray acoustic rattle.\n\nIn Alan Wake 2, Remedy Entertainment achieved what few developers ever manage: they weaponized audio space to destabilize the player's perception of sanity. Trapped inside the Dark Place, the whispers aren't merely directional alerts—they overlap with the player's own internal monologue. Words like 'Wake', 'Drown', and 'Writer' decay into sub-bass frequencies that vibrate through modern low-frequency drivers.\n\nWhen combined with Petri Alanko's unsettling string quartets and the sudden, thunderous live-action jump cuts, the game doesn't just scare you; it exhausts your nervous system in the most artistic way imaginable. Here is a comprehensive breakdown of the sound engine tricks Remedy employed...`,
      tags: "Remedy, Alan Wake 2, Sound Design, Audio Engineering, Analysis",
      readTimeMinutes: 7,
      authorId: authorUser.id,
      gameId: createdGamesMap["alan-wake-2"].id,
      status: "PUBLISHED",
      viewsCount: 1420,
      likesCount: 89
    },
    {
      slug: "why-survival-horror-inventory-limits-make-games-better",
      title: "The Sacred Six Slots: Why Inventory Restrictions Are the Heartbeat of Horror",
      subtitle: "From classic Resident Evil ink ribbons to Signalis and Dead Space, true panic requires calculating every bullet.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      category: "Gaming Opinion",
      content: `Modern action games train players to be omnipotent hoarder gods with bottomless digital backpacks. You pick up four hundred assault rifles, sixty healing draughts, and never look back.\n\nTrue horror, however, begins when you find a crucial shotgun shell and realize you have nowhere to put it. You are forced to stand in a dark, creaking hallway, deciding whether to drop your only healing herb or leave behind the puzzle item needed to unlock the safe room door.\n\nGames like Signalis, Resident Evil 4 Remake, and Amnesia: The Bunker understand that inventory management is not mechanical tedium—it is the engine of vulnerability. When every slot has an existential cost, the player is never entirely at ease.`,
      tags: "Game Design, Inventory, Resident Evil, Signalis, Mechanics",
      readTimeMinutes: 5,
      authorId: communityUser.id,
      gameId: createdGamesMap["signalis"].id,
      status: "PUBLISHED",
      viewsCount: 890,
      likesCount: 45
    }
  ];

  console.log(`Seeding ${blogsData.length} blog articles...`);
  for (const b of blogsData) {
    await prisma.blogArticle.create({
      data: b
    });
  }

  // 6. Community Reviews
  const reviewsData = [
    {
      gameId: createdGamesMap["silent-hill-2-remake"].id,
      userId: ownerUser.id,
      rating: 10,
      title: "A Masterpiece of Melancholy and Unforgiving Psychological Fear",
      body: "Bloober Team delivered what many believed was impossible. The fog feels heavy and suffocating; the sound design crawls inside your skull. Masahiro Ito's creature design retains every ounce of its symbolic horror while gaining astonishing physical weight in Unreal Engine 5. James Sunderland's descent into Brookhaven and the Historical Society is an unforgettable gaming experience.",
      platformPlayed: "PC",
      playTimeHours: 24.5,
      hasSpoilers: false,
      isVerifiedPurchase: true,
      helpfulCount: 42,
      isModerated: true
    },
    {
      gameId: createdGamesMap["alan-wake-2"].id,
      userId: authorUser.id,
      rating: 10,
      title: "The Pinnacle of Interactive Cinematic Horror Storytelling",
      body: "Remedy has redefined what video games can accomplish as an artistic medium. The seamless blending of live-action cinematography, interactive choreography, and deeply disturbing survival horror mechanics makes Alan Wake 2 a generational triumph. Saga's Mind Place is the best detective mechanic ever conceived.",
      platformPlayed: "PlayStation 5",
      playTimeHours: 32.0,
      hasSpoilers: false,
      isVerifiedPurchase: true,
      helpfulCount: 28,
      isModerated: true
    },
    {
      gameId: createdGamesMap["resident-evil-4-remake"].id,
      userId: communityUser.id,
      rating: 9,
      title: "The Golden Standard for Action-Horror Remakes",
      body: "Knife parrying a chainsaw will never get old. The pacing is relentlessly intense from the opening village siege to the final island escape. Capcom preserved the campy charm while drastically elevating the genuine tension and gore. A must-play for any gaming enthusiast.",
      platformPlayed: "PC",
      playTimeHours: 45.2,
      hasSpoilers: false,
      isVerifiedPurchase: true,
      helpfulCount: 19,
      isModerated: true
    }
  ];

  console.log(`Seeding ${reviewsData.length} reviews...`);
  for (const r of reviewsData) {
    await prisma.review.create({
      data: r
    });
  }

  // 7. Site Settings
  const settingsData = [
    { key: "SITE_NAME", value: "AFTERDARK — THE GAMING ABYSS" },
    { key: "SITE_TAGLINE", value: "ENTER THE UNKNOWN. PLAY BEYOND FEAR." },
    { key: "SITE_ALT_TAGLINE", value: "EVERY GAME HAS A DARK SIDE." },
    { key: "OWNER_NAME", value: "MRADUL KUMAR" },
    { key: "OWNER_ROLE", value: "Founder, Creator & Developer" },
    { key: "OWNER_GITHUB", value: "https://github.com/mradulkumar01" },
    { key: "OWNER_LINKEDIN", value: "https://linkedin.com/in/mradul-kumar0001" },
    { key: "OWNER_BIO", value: "Visionary software engineer and creator of AFTERDARK. Architecting cinematic horror discovery platforms that bridge atmospheric storytelling with verified gaming catalogs." },
    { key: "ALLOW_USER_REGISTRATION", value: "true" },
    { key: "AUTO_APPROVE_BLOGS", value: "false" }
  ];

  for (const s of settingsData) {
    await prisma.siteSetting.create({
      data: s
    });
  }

  console.log("Database seeded successfully with horror games, characters, news, blogs, reviews, and site settings!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
