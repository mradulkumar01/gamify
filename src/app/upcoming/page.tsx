import React from "react";
import Link from "next/link";
import { Calendar, Sparkles, Monitor, Gamepad2, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function UpcomingReleasesPage() {
  const upcomingGames = await prisma.game.findMany({
    where: { isUpcoming: true },
    orderBy: { releaseDate: "asc" },
    include: { downloadLinks: true },
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-abyss-700/80 pb-6 mb-10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <Calendar className="h-4 w-4" />
          <span>RADAR & HORIZON</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          UPCOMING HORROR RELEASES
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-2xl">
          Verified roadmap of announced psychological nightmares, survival sequels, and next-generation interactive horror films.
        </p>
      </div>

      <div className="space-y-6">
        {upcomingGames.map((game) => (
          <div
            key={game.id}
            className="group rounded-2xl border border-abyss-700 bg-abyss-900/90 overflow-hidden shadow-lg transition-all duration-300 hover:border-blood/60"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              {/* Cover/Hero Preview */}
              <div className="md:col-span-4 relative h-64 md:h-full min-h-[220px] overflow-hidden bg-abyss-950">
                <img
                  src={game.heroImage || game.coverImage}
                  alt={game.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-abyss-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="rounded bg-blood px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-white shadow-md">
                    PROJECTED: {new Date(game.releaseDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Info & Details */}
              <div className="md:col-span-8 p-6 sm:p-8 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-blood">
                    {game.genre}
                  </span>
                  <span className="font-mono text-[11px] text-toxic flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Confirmed Official Publisher Project
                  </span>
                </div>

                <Link href={`/games/${game.slug}`}>
                  <h2 className="font-display text-2xl font-bold text-ghost-white group-hover:text-blood transition-colors">
                    {game.title}
                  </h2>
                </Link>

                {game.tagline && (
                  <p className="font-mono text-xs text-ghost-fog italic">
                    &quot;{game.tagline}&quot;
                  </p>
                )}

                <p className="text-xs sm:text-sm text-ghost-ash leading-relaxed">
                  {game.shortDescription}
                </p>

                <div className="pt-3 border-t border-abyss-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <span className="text-ghost-fog">DEVELOPER: </span>
                    <span className="text-ghost-white font-semibold">{game.developer}</span>
                    <span className="mx-2 text-abyss-700">•</span>
                    <span className="text-ghost-fog">PLATFORMS: </span>
                    <span className="text-ghost-ash">{game.platforms}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {game.trailerUrl && (
                      <a
                        href={game.trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border border-abyss-700 bg-abyss-800 px-3 py-1.5 text-[11px] text-ghost-ash hover:border-blood hover:text-white"
                      >
                        TEASER
                      </a>
                    )}
                    <Link
                      href={`/games/${game.slug}`}
                      className="inline-flex items-center gap-1.5 rounded border border-blood bg-blood/20 px-4 py-1.5 text-xs font-semibold text-blood hover:bg-blood hover:text-white transition-all"
                    >
                      <span>TRACK ARCHIVE</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
