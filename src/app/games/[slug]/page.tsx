import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Monitor,
  Cpu,
  HardDrive,
  Calendar,
  Building2,
  Globe,
  Tag,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { GameDetailClient } from "./GameDetailClient";
import { CharacterCard } from "@/components/CharacterCard";
import { GameCard } from "@/components/GameCard";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const game = await prisma.game.findUnique({
    where: { slug: params.slug },
    select: { title: true, shortDescription: true, coverImage: true },
  });

  if (!game) return { title: "Game Not Found" };

  return {
    title: game.title,
    description: game.shortDescription,
    openGraph: {
      title: `${game.title} | AFTERDARK`,
      description: game.shortDescription,
      images: [{ url: game.coverImage }],
    },
  };
}

export default async function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = await prisma.game.findUnique({
    where: { slug: params.slug },
    include: {
      downloadLinks: { orderBy: { createdAt: "asc" } },
      screenshots: { orderBy: { order: "asc" } },
      characters: true,
      reviews: {
        where: { isModerated: true },
        orderBy: { helpfulCount: "desc" },
        include: {
          user: {
            select: { displayName: true, username: true, avatarUrl: true, role: true },
          },
        },
      },
    },
  });

  if (!game) {
    notFound();
  }

  // Check saved state for current logged in user
  let isSaved = false;
  let userReview = null;
  const session = await getSession();
  if (session) {
    const saved = await prisma.savedGame.findUnique({
      where: {
        userId_gameId: {
          userId: session.userId,
          gameId: game.id,
        },
      },
    });
    isSaved = !!saved;

    userReview = await prisma.review.findUnique({
      where: {
        gameId_userId: {
          gameId: game.id,
          userId: session.userId,
        },
      },
    });
  }

  // Related games in the same genre
  const relatedGames = await prisma.game.findMany({
    where: {
      genre: game.genre,
      id: { not: game.id },
    },
    take: 4,
  });

  const prosList = game.pros ? game.pros.split(";").map((p) => p.trim()) : [];
  const consList = game.cons ? game.cons.split(";").map((c) => c.trim()) : [];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner Section */}
      <div className="relative h-[420px] sm:h-[500px] w-full bg-abyss-950 overflow-hidden">
        <img
          src={game.heroImage || game.coverImage}
          alt={game.title}
          className="h-full w-full object-cover opacity-40 scale-105 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent" />

        {/* Hero Title & Breadcrumb Content */}
        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-ghost-fog mb-3">
            <Link href="/" className="hover:text-blood">HOME</Link>
            <span>/</span>
            <Link href="/games" className="hover:text-blood">GAMES</Link>
            <span>/</span>
            <span className="text-blood">{game.genre}</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="rounded bg-blood/20 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-blood border border-blood/30">
                {game.genre}
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-ghost-white mt-2">
                {game.title}
              </h1>
              {game.tagline && (
                <p className="font-mono text-xs sm:text-sm text-ghost-ash mt-1 italic">
                  &quot;{game.tagline}&quot;
                </p>
              )}
            </div>

            {game.rating > 0 && (
              <div className="flex items-center gap-2 rounded-xl border border-blood/50 bg-abyss-900/90 px-4 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(255,28,47,0.3)]">
                <Star className="h-6 w-6 text-blood fill-blood" />
                <div>
                  <p className="font-display text-2xl font-black text-white leading-none">
                    {game.rating.toFixed(1)}
                  </p>
                  <p className="font-mono text-[10px] text-ghost-fog">{game.ratingCount} Ratings</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Specs, Reviews, Gallery */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Story */}
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold text-ghost-white border-l-2 border-blood pl-3">
                OVERVIEW & LORE
              </h2>
              <p className="text-sm sm:text-base text-ghost-ash leading-relaxed whitespace-pre-line">
                {game.fullDescription}
              </p>
            </section>

            {/* Pros and Cons */}
            {(prosList.length > 0 || consList.length > 0) && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prosList.length > 0 && (
                  <div className="rounded-xl border border-toxic/30 bg-abyss-900/60 p-4">
                    <h3 className="font-mono text-xs font-bold text-toxic uppercase flex items-center gap-1.5 mb-3">
                      <CheckCircle className="h-4 w-4" /> HIGHLIGHTS
                    </h3>
                    <ul className="space-y-2 text-xs text-ghost-ash">
                      {prosList.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-toxic font-bold">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {consList.length > 0 && (
                  <div className="rounded-xl border border-blood/30 bg-abyss-900/60 p-4">
                    <h3 className="font-mono text-xs font-bold text-blood uppercase flex items-center gap-1.5 mb-3">
                      <XCircle className="h-4 w-4" /> DRAWBACKS & RIGORS
                    </h3>
                    <ul className="space-y-2 text-xs text-ghost-ash">
                      {consList.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blood font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Screenshots Gallery */}
            {game.screenshots.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display text-xl font-bold text-ghost-white border-l-2 border-blood pl-3">
                  ATMOSPHERIC SCREENSHOTS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.screenshots.map((s) => (
                    <div
                      key={s.id}
                      className="group relative rounded-xl overflow-hidden border border-abyss-700 bg-abyss-950 aspect-video"
                    >
                      <img
                        src={s.imageUrl}
                        alt={s.caption || game.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {s.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/95 to-transparent p-3 text-[11px] font-mono text-ghost-ash">
                          {s.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* System Requirements */}
            {(game.minCpu || game.recCpu) && (
              <section className="space-y-4">
                <h2 className="font-display text-xl font-bold text-ghost-white border-l-2 border-blood pl-3">
                  SYSTEM HARDWARE REQUIREMENTS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Minimum */}
                  <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-5 space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ghost-white font-bold pb-2 border-b border-abyss-800">
                      <Monitor className="h-4 w-4 text-blood" />
                      <span>MINIMUM SPECIFICATIONS</span>
                    </div>
                    {game.minCpu && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">PROCESSOR:</span>
                        <span className="text-ghost-ash">{game.minCpu}</span>
                      </div>
                    )}
                    {game.minGpu && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">GRAPHICS CARD:</span>
                        <span className="text-ghost-ash">{game.minGpu}</span>
                      </div>
                    )}
                    {game.minRam && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">SYSTEM MEMORY:</span>
                        <span className="text-ghost-ash">{game.minRam}</span>
                      </div>
                    )}
                    {game.minStorage && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">STORAGE SPACE:</span>
                        <span className="text-ghost-ash">{game.minStorage}</span>
                      </div>
                    )}
                  </div>

                  {/* Recommended */}
                  <div className="rounded-xl border border-blood/30 bg-abyss-900/70 p-5 space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ghost-white font-bold pb-2 border-b border-abyss-800">
                      <Cpu className="h-4 w-4 text-toxic" />
                      <span>RECOMMENDED FOR PEAK DREAD</span>
                    </div>
                    {game.recCpu && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">PROCESSOR:</span>
                        <span className="text-ghost-ash">{game.recCpu}</span>
                      </div>
                    )}
                    {game.recGpu && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">GRAPHICS CARD:</span>
                        <span className="text-ghost-ash">{game.recGpu}</span>
                      </div>
                    )}
                    {game.recRam && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">SYSTEM MEMORY:</span>
                        <span className="text-ghost-ash">{game.recRam}</span>
                      </div>
                    )}
                    {game.recStorage && (
                      <div>
                        <span className="text-ghost-fog block text-[10px]">STORAGE SPACE:</span>
                        <span className="text-ghost-ash">{game.recStorage}</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Characters Affiliated with Game */}
            {game.characters.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display text-xl font-bold text-ghost-white border-l-2 border-blood pl-3">
                  SURVIVORS & ENTITIES FROM THIS REALM
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.characters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                  ))}
                </div>
              </section>
            )}

            {/* Interactive Review Section & Verified External Download Sources Client */}
            <GameDetailClient
              gameId={game.id}
              gameSlug={game.slug}
              gameTitle={game.title}
              downloadLinks={game.downloadLinks}
              reviews={game.reviews}
              isInitiallySaved={isSaved}
              userReview={userReview}
            />
          </div>

          {/* Right Sidebar: Quick Metadata Card & Related Titles */}
          <div className="lg:col-span-4 space-y-8">
            {/* Metadata Card */}
            <div className="rounded-xl border border-abyss-700 bg-abyss-900/90 p-5 space-y-4 font-mono text-xs">
              <h3 className="font-display text-base font-bold text-ghost-white pb-3 border-b border-abyss-800">
                ARCHIVE SPECIFICATIONS
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-ghost-fog flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> DEVELOPER:
                  </span>
                  <span className="text-ghost-white font-semibold text-right">{game.developer}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-ghost-fog flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> PUBLISHER:
                  </span>
                  <span className="text-ghost-white font-semibold text-right">{game.publisher}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-ghost-fog flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> RELEASE DATE:
                  </span>
                  <span className="text-ghost-white font-semibold">
                    {new Date(game.releaseDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-ghost-fog flex items-center gap-1.5">
                    <Monitor className="h-3.5 w-3.5" /> PLATFORMS:
                  </span>
                  <span className="text-ghost-white text-right max-w-[180px]">{game.platforms}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-ghost-fog flex items-center gap-1.5">
                    <HardDrive className="h-3.5 w-3.5" /> GAME MODES:
                  </span>
                  <span className="text-ghost-white">{game.gameModes}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-ghost-fog flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" /> AGE RATING:
                  </span>
                  <span className="text-blood font-semibold">{game.ageRating || "Mature 17+"}</span>
                </div>

                {game.officialWebsite && (
                  <div className="pt-2 border-t border-abyss-800">
                    <a
                      href={game.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-ghost-ash hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-blood" /> Official Website
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Related Games */}
            {relatedGames.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display text-base font-bold text-ghost-white">
                  RELATED IN THE SHADOWS
                </h3>
                <div className="space-y-4">
                  {relatedGames.map((rel) => (
                    <GameCard key={rel.id} game={rel} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
