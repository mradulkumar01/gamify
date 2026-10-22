import React from "react";
import Link from "next/link";
import {
  Skull,
  Gamepad2,
  Flame,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Database,
  ExternalLink,
  Smartphone,
  Monitor,
  Heart,
  MessageSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { APP_CONFIG } from "@/lib/config";
import { CinematicIntro } from "@/components/CinematicIntro";
import { GameCard } from "@/components/GameCard";
import { CharacterCard } from "@/components/CharacterCard";
import { NewsCard } from "@/components/NewsCard";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  // Fetch data directly from SQLite database via Prisma
  const [
    featuredGame,
    trendingGames,
    latestReleases,
    upcomingGames,
    characters,
    newsArticles,
    communityReviews,
    featuredBlogs,
    statsData,
  ] = await Promise.all([
    // 1. Featured Game of the Week
    prisma.game.findFirst({
      where: { isFeatured: true },
      include: { downloadLinks: true },
    }),

    // 2. Trending Games
    prisma.game.findMany({
      where: { isTrending: true },
      take: 4,
    }),

    // 3. Latest Horror Releases
    prisma.game.findMany({
      where: { isUpcoming: false },
      orderBy: { releaseDate: "desc" },
      take: 4,
    }),

    // 4. Upcoming Games
    prisma.game.findMany({
      where: { isUpcoming: true },
      take: 3,
    }),

    // 6. Legendary Characters
    prisma.gameCharacter.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),

    // 7. Latest News
    prisma.newsArticle.findMany({
      take: 3,
      orderBy: { publishedAt: "desc" },
    }),

    // 8. Community Reviews
    prisma.review.findMany({
      where: { isModerated: true },
      take: 3,
      orderBy: { helpfulCount: "desc" },
      include: {
        game: { select: { title: true, slug: true, coverImage: true } },
        user: { select: { displayName: true, username: true, avatarUrl: true } },
      },
    }),

    // 9. Featured Blogs
    prisma.blogArticle.findMany({
      where: { status: "PUBLISHED" },
      take: 2,
      orderBy: { likesCount: "desc" },
      include: {
        author: { select: { displayName: true, username: true, avatarUrl: true } },
      },
    }),

    // 11. Database Statistics
    Promise.all([
      prisma.game.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.blogArticle.count(),
    ]),
  ]);

  const [totalGames, totalUsers, totalReviews, totalBlogs] = statsData;

  return (
    <div className="relative min-h-screen bg-obsidian text-ghost-white overflow-hidden">
      {/* 1. Cinematic Opening Intro (can be skipped or dismissed) */}
      <CinematicIntro />

      {/* Hero Atmosphere Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[750px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood/20 via-obsidian/40 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-blood-dark/15 blur-[140px]" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-toxic/5 blur-[150px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blood/40 bg-abyss-900/80 px-4 py-1.5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,28,47,0.25)]">
          <Skull className="h-3.5 w-3.5 text-blood animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-ghost-ash">
            THE DIGITAL PRESERVATION ABYSS
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-ghost-white max-w-5xl leading-none">
          THE GAMES YOU WERE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blood via-blood-crimson to-blood-dark drop-shadow-[0_0_35px_rgba(255,28,47,0.6)]">
            WARNED ABOUT.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-sm sm:text-lg text-ghost-ash max-w-2xl font-light leading-relaxed">
          Discover terrifying worlds, legendary characters, upcoming releases, and the stories hiding behind your favorite games.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/games"
            className="group relative inline-flex items-center gap-2 rounded-md border border-blood bg-gradient-to-r from-blood-dark via-blood to-blood-crimson px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(255,28,47,0.45)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,28,47,0.7)]"
          >
            <span>ENTER THE ABYSS</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/upcoming"
            className="inline-flex items-center gap-2 rounded-md border border-abyss-700 bg-abyss-900/80 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ghost-ash hover:border-blood/60 hover:text-white transition-all backdrop-blur-md"
          >
            <Calendar className="h-4 w-4 text-blood" />
            <span>UPCOMING HORROR</span>
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl border-y border-abyss-700/60 py-4 font-mono text-xs text-ghost-fog">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-toxic" />
            <span>100% Verified Stores</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Flame className="h-4 w-4 text-blood" />
            <span>Zero Piracy Archives</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Gamepad2 className="h-4 w-4 text-cold" />
            <span>PC & Mobile Cross-Play</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="h-4 w-4 text-ghost-ash" />
            <span>Uncensored Lore</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: FEATURED GAME OF THE WEEK */}
      {featuredGame && (
        <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
                CURATED SELECTION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ghost-white mt-1">
                FEATURED GAME OF THE WEEK
              </h2>
            </div>
            <Link
              href={`/games/${featuredGame.slug}`}
              className="hidden sm:flex items-center gap-1 font-mono text-xs text-blood hover:text-white transition-colors"
            >
              <span>INSPECT ARCHIVE</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="relative rounded-2xl border border-blood/40 bg-abyss-900 overflow-hidden shadow-[0_0_50px_rgba(255,28,47,0.2)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Artwork / Hero Image */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] w-full overflow-hidden bg-abyss-950">
                <img
                  src={featuredGame.heroImage || featuredGame.coverImage}
                  alt={featuredGame.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-abyss-900 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded bg-blood px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                    FEATURED SPOTLIGHT
                  </span>
                  <div className="flex items-center gap-1 rounded bg-obsidian/85 px-2.5 py-1 border border-blood/40 text-xs font-mono font-bold text-ghost-white">
                    <Star className="h-3.5 w-3.5 text-blood fill-blood" />
                    <span>{featuredGame.rating.toFixed(1)} / 10</span>
                  </div>
                </div>
              </div>

              {/* Text Info & Legitimate Actions */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-blood">
                  {featuredGame.genre}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ghost-white">
                  {featuredGame.title}
                </h3>
                {featuredGame.tagline && (
                  <p className="font-mono text-xs text-ghost-fog italic">
                    &quot;{featuredGame.tagline}&quot;
                  </p>
                )}
                <p className="text-xs sm:text-sm text-ghost-ash leading-relaxed">
                  {featuredGame.shortDescription}
                </p>

                <div className="pt-2 font-mono text-xs space-y-1.5 border-t border-abyss-800">
                  <div className="flex justify-between">
                    <span className="text-ghost-fog">DEVELOPER:</span>
                    <span className="text-ghost-white font-semibold">{featuredGame.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ghost-fog">PLATFORMS:</span>
                    <span className="text-ghost-white">{featuredGame.platforms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ghost-fog">STATUS:</span>
                    <span className="text-toxic flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verified Official Storefronts
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/games/${featuredGame.slug}`}
                    className="inline-flex items-center gap-2 rounded border border-blood bg-blood px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,28,47,0.4)] hover:bg-blood-crimson transition-all"
                  >
                    <span>VIEW DETAILS & STORES</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  {featuredGame.trailerUrl && (
                    <a
                      href={featuredGame.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-abyss-700 bg-abyss-800 px-4 py-2.5 font-mono text-xs font-semibold text-ghost-ash hover:border-blood hover:text-white transition-all"
                    >
                      WATCH TRAILER
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: TRENDING GAMES */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
              COMMUNITY HOTSPOTS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ghost-white mt-1">
              TRENDING IN THE ABYSS
            </h2>
          </div>
          <Link
            href="/games?sort=popularity"
            className="flex items-center gap-1 font-mono text-xs text-blood hover:text-white transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* SECTION 3 & 4: LATEST RELEASES & UPCOMING HORROR */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest Releases */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
                  RECENTLY UNLEASHED
                </span>
                <h2 className="font-display text-2xl font-bold text-ghost-white mt-1">
                  LATEST HORROR RELEASES
                </h2>
              </div>
              <Link
                href="/games?sort=newest"
                className="font-mono text-xs text-ghost-fog hover:text-blood transition-colors"
              >
                Browse All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestReleases.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>

          {/* Upcoming Horror Radar */}
          <div className="lg:col-span-4 rounded-xl border border-abyss-700/80 bg-abyss-900/90 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-abyss-800">
                <h3 className="font-display text-lg font-bold text-ghost-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blood" />
                  UPCOMING CALENDAR
                </h3>
                <Link href="/upcoming" className="font-mono text-[11px] text-blood hover:text-white">
                  FULL SLATE
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingGames.map((up) => (
                  <Link
                    key={up.id}
                    href={`/games/${up.slug}`}
                    className="group block rounded-lg border border-abyss-800 bg-abyss-950 p-3 hover:border-blood/40 transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={up.coverImage}
                        alt={up.title}
                        className="h-16 w-14 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-blood">
                          {up.genre}
                        </span>
                        <h4 className="font-display text-xs font-bold text-ghost-white group-hover:text-blood truncate">
                          {up.title}
                        </h4>
                        <p className="mt-1 font-mono text-[10px] text-ghost-fog">
                          Dev: {up.developer}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-abyss-800 text-center">
              <Link
                href="/upcoming"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-toxic hover:text-white transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Track Upcoming Horror Announcements</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PC VS MOBILE GAME DISCOVERY */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            HARDWARE PARADIGMS
          </span>
          <h2 className="font-display text-3xl font-bold text-ghost-white mt-1">
            PC HARDCORE VS MOBILE NIGHTMARES
          </h2>
          <p className="mt-2 text-xs text-ghost-fog font-mono">
            Experience uncompromised fear on high-fidelity PC battle stations or carried in your pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PC Section */}
          <div className="rounded-2xl border border-abyss-700 bg-gradient-to-br from-abyss-900 to-obsidian p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cold/40 bg-cold/10 text-cold">
                  <Monitor className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ghost-white">PC & DESKTOP ARCHIVES</h3>
                  <p className="font-mono text-xs text-cold">Ray-tracing, 144Hz+, Binaural Headsets</p>
                </div>
              </div>
              <p className="text-xs text-ghost-ash leading-relaxed mb-6">
                Push GPU limits with Unreal Engine 5 nanite geometry, Northlight volumetric fog, and uncompressed acoustic soundscapes. Featuring full Steam, Epic, and GOG verified releases.
              </p>
            </div>
            <Link
              href="/platforms/pc"
              className="inline-flex items-center justify-between rounded-md border border-cold/40 bg-abyss-950 px-4 py-2.5 font-mono text-xs text-ghost-white hover:border-cold transition-all"
            >
              <span>EXPLORE PC CATALOG</span>
              <ArrowRight className="h-3.5 w-3.5 text-cold" />
            </Link>
          </div>

          {/* Mobile Section */}
          <div className="rounded-2xl border border-abyss-700 bg-gradient-to-br from-abyss-900 to-obsidian p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-toxic/40 bg-toxic/10 text-toxic">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ghost-white">PORTABLE & MOBILE HORROR</h3>
                  <p className="font-mono text-xs text-toxic">Android, Apple Silicon iOS & iPadOS</p>
                </div>
              </div>
              <p className="text-xs text-ghost-ash leading-relaxed mb-6">
                AAA survival horror anywhere you dare. From official native ports of Alien: Isolation and Resident Evil to independent touch screen ghost investigations on Google Play and the App Store.
              </p>
            </div>
            <Link
              href="/platforms/mobile"
              className="inline-flex items-center justify-between rounded-md border border-toxic/40 bg-abyss-950 px-4 py-2.5 font-mono text-xs text-ghost-white hover:border-toxic transition-all"
            >
              <span>EXPLORE MOBILE CATALOG</span>
              <ArrowRight className="h-3.5 w-3.5 text-toxic" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: LEGENDARY GAME CHARACTERS */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
              LORE & ROSTER
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ghost-white mt-1">
              LEGENDARY SURVIVORS & ENTITIES
            </h2>
          </div>
          <Link
            href="/characters"
            className="flex items-center gap-1 font-mono text-xs text-blood hover:text-white transition-colors"
          >
            <span>FULL LORE ARCHIVE</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>

      {/* SECTION 7: LATEST GAMING NEWS */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
              DISPATCHES FROM THE DARK
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ghost-white mt-1">
              LATEST GAMING NEWS WIRE
            </h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-1 font-mono text-xs text-blood hover:text-white transition-colors"
          >
            <span>NEWS ARCHIVE</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <NewsCard key={article.id} news={article} />
          ))}
        </div>
      </section>

      {/* SECTION 8 & 9: COMMUNITY REVIEWS & FEATURED BLOGS */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Reviews column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2">
                <Star className="h-4 w-4 text-blood" />
                VERIFIED COMMUNITY REVIEWS
              </h3>
              <Link href="/reviews" className="font-mono text-xs text-blood hover:text-white">
                ALL REVIEWS
              </Link>
            </div>

            <div className="space-y-4">
              {communityReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-blood font-semibold">
                      {rev.game.title}
                    </span>
                    <span className="rounded bg-abyss-950 px-2 py-0.5 font-mono text-xs font-bold text-ghost-white border border-blood/30">
                      ★ {rev.rating}/10
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-ghost-white line-clamp-1">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-ghost-ash line-clamp-2 leading-relaxed">
                    &quot;{rev.body}&quot;
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-abyss-800 text-[11px] font-mono text-ghost-fog">
                    <span>By {rev.user.displayName}</span>
                    <span>{rev.helpfulCount} deemed helpful</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blogs column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-toxic" />
                FEATURED ESSAYS & BLOGS
              </h3>
              <Link href="/blogs" className="font-mono text-xs text-toxic hover:text-white">
                ALL ESSAYS
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: DATABASE STATISTICS */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-y border-abyss-800/80 my-8">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            LIVE DATABASE METRICS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ghost-white mt-1">
            ARCHIVE INTEGRITY
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-6">
            <Database className="h-6 w-6 text-blood mx-auto mb-2" />
            <p className="font-display text-3xl font-black text-ghost-white">{totalGames}</p>
            <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Verified Games</p>
          </div>
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-6">
            <Users className="h-6 w-6 text-toxic mx-auto mb-2" />
            <p className="font-display text-3xl font-black text-ghost-white">{totalUsers}</p>
            <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Registered Wanderers</p>
          </div>
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-6">
            <Star className="h-6 w-6 text-cold mx-auto mb-2" />
            <p className="font-display text-3xl font-black text-ghost-white">{totalReviews}</p>
            <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Player Reviews</p>
          </div>
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-6">
            <Heart className="h-6 w-6 text-blood-crimson mx-auto mb-2" />
            <p className="font-display text-3xl font-black text-ghost-white">{totalBlogs}</p>
            <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Lore Dissertations</p>
          </div>
        </div>
      </section>

      {/* SECTION 12: CREATOR SPOTLIGHT */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-blood/40 bg-gradient-to-r from-abyss-950 via-abyss-900 to-abyss-950 p-6 sm:p-10 shadow-[0_0_40px_rgba(255,28,47,0.2)]">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="relative h-28 w-28 sm:h-32 sm:sm:w-32 rounded-full overflow-hidden border-2 border-blood shadow-[0_0_20px_#ff1c2f] shrink-0">
              <img
                src={APP_CONFIG.owner.avatarUrl}
                alt={APP_CONFIG.owner.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blood font-bold">
                FOUNDER & ARCHITECT
              </span>
              <h3 className="font-display text-2xl font-black text-ghost-white">
                {APP_CONFIG.owner.name}
              </h3>
              <p className="font-mono text-xs text-ghost-fog">{APP_CONFIG.owner.role}</p>
              <p className="text-xs text-ghost-ash leading-relaxed pt-1">
                {APP_CONFIG.owner.mission}
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  href="/about"
                  className="rounded border border-blood bg-blood/20 px-3.5 py-1.5 font-mono text-xs font-semibold text-blood hover:bg-blood hover:text-white transition-all"
                >
                  READ CREATOR MISSION
                </Link>
                <a
                  href={APP_CONFIG.owner.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-abyss-700 bg-abyss-800 px-3.5 py-1.5 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all"
                >
                  GITHUB
                </a>
                <a
                  href={APP_CONFIG.owner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-abyss-700 bg-abyss-800 px-3.5 py-1.5 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CINEMATIC CTA */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blood/50 bg-abyss-900 shadow-[0_0_30px_rgba(255,28,47,0.4)] mx-auto mb-6">
          <Skull className="h-8 w-8 text-blood animate-pulse" />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-ghost-white">
          THE ABYSS AWAITS YOUR RETURN.
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-ghost-ash max-w-xl mx-auto font-mono">
          Join registered wanderers. Rate games, decipher lore, publish essays, and preserve horror history.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/register"
            className="rounded border border-blood bg-blood px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(255,28,47,0.5)] hover:bg-blood-crimson hover:scale-105 transition-all"
          >
            FORGE AN ACCOUNT
          </Link>
          <Link
            href="/games"
            className="rounded border border-abyss-700 bg-abyss-900 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ghost-ash hover:border-blood hover:text-white transition-all"
          >
            BROWSE ARCHIVES
          </Link>
        </div>
      </section>
    </div>
  );
}
