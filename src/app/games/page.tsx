import React from "react";
import Link from "next/link";
import { Gamepad2, Filter, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { APP_CONFIG } from "@/lib/config";
import { GameCard } from "@/components/GameCard";
import { Prisma } from "@prisma/client";

interface PageProps {
  searchParams: {
    search?: string;
    genre?: string;
    platform?: string;
    upcoming?: string;
    free?: string;
    sort?: string;
    page?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function GamesExplorerPage({ searchParams }: PageProps) {
  const search = searchParams.search || "";
  const genre = searchParams.genre || "all";
  const platform = searchParams.platform || "all";
  const upcoming = searchParams.upcoming;
  const freeOnly = searchParams.free === "true";
  const sort = searchParams.sort || "rating";
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 12;
  const skip = (page - 1) * limit;

  const where: Prisma.GameWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { shortDescription: { contains: search } },
      { developer: { contains: search } },
      { publisher: { contains: search } },
    ];
  }

  if (genre && genre !== "all") {
    where.genres = { contains: genre };
  }

  if (platform && platform !== "all") {
    where.platforms = { contains: platform };
  }

  if (upcoming === "true") {
    where.isUpcoming = true;
  } else if (upcoming === "false") {
    where.isUpcoming = false;
  }

  if (freeOnly) {
    where.isFreeToPlay = true;
  }

  let orderBy: Prisma.GameOrderByWithRelationInput = { rating: "desc" };
  if (sort === "newest") orderBy = { releaseDate: "desc" };
  else if (sort === "title") orderBy = { title: "asc" };
  else if (sort === "popularity") orderBy = { ratingCount: "desc" };

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.game.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <Gamepad2 className="h-4 w-4" />
          <span>VERIFIED ARCHIVES</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          GAME DISCOVERY LIBRARY
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-2xl">
          Traverse authenticated horror catalogs, check official minimum system specs, and access verified storefront links.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-4 mb-8 backdrop-blur-md">
        <form method="GET" action="/games" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword Search */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-ghost-fog mb-1">Search Archives</label>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Title, developer, keywords..."
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-1.5 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
            />
          </div>

          {/* Genre Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-ghost-fog mb-1">Genre Category</label>
            <select
              name="genre"
              defaultValue={genre}
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-1.5 text-xs text-ghost-white focus:border-blood focus:outline-none"
            >
              <option value="all">All Genres</option>
              {APP_CONFIG.genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-ghost-fog mb-1">Target Platform</label>
            <select
              name="platform"
              defaultValue={platform}
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-1.5 text-xs text-ghost-white focus:border-blood focus:outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="PC">PC (Windows / Mac / Linux)</option>
              <option value="PlayStation">PlayStation 5 / PS4</option>
              <option value="Xbox">Xbox Series X|S</option>
              <option value="iOS">Apple iOS</option>
              <option value="Android">Google Android</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-ghost-fog mb-1">Sort Hierarchy</label>
            <select
              name="sort"
              defaultValue={sort}
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-1.5 text-xs text-ghost-white focus:border-blood focus:outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="newest">Release Date</option>
              <option value="popularity">Community Popularity</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 rounded border border-blood bg-blood py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-blood-crimson transition-all shadow-[0_0_10px_rgba(255,28,47,0.3)]"
            >
              FILTER
            </button>
            <Link
              href="/games"
              className="flex items-center justify-center rounded border border-abyss-700 bg-abyss-800 p-1.5 text-ghost-ash hover:border-blood hover:text-white"
              title="Reset Filters"
            >
              <RotateCcw className="h-4 w-4" />
            </Link>
          </div>
        </form>

        {/* Quick Tags */}
        <div className="mt-3 pt-3 border-t border-abyss-800 flex flex-wrap items-center gap-2 text-[11px] font-mono text-ghost-fog">
          <span>QUICK TAGS:</span>
          {["Psychological Horror", "Survival Horror", "Sci-Fi Horror", "Indie Horror", "Co-op"].map((t) => (
            <Link
              key={t}
              href={`/games?genre=${encodeURIComponent(t)}`}
              className={`rounded px-2 py-0.5 border ${
                genre === t
                  ? "border-blood bg-blood/20 text-white"
                  : "border-abyss-700 bg-abyss-950 text-ghost-ash hover:border-blood hover:text-white"
              }`}
            >
              {t}
            </Link>
          ))}
          <Link
            href="/games?upcoming=true"
            className={`rounded px-2 py-0.5 border ${
              upcoming === "true"
                ? "border-blood bg-blood/20 text-white"
                : "border-abyss-700 bg-abyss-950 text-ghost-ash hover:border-blood hover:text-white"
            }`}
          >
            Upcoming Only
          </Link>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-ghost-fog mb-6">
        <span>ARCHIVES FOUND: {total}</span>
        <span>PAGE {page} OF {totalPages || 1}</span>
      </div>

      {/* Games Grid or Empty State */}
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-abyss-700 bg-abyss-900/60 p-12 text-center my-12">
          <Filter className="h-10 w-10 text-blood mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold text-ghost-white">
            NO DARKNESS FOUND MATCHING CRITERIA
          </h3>
          <p className="mt-2 text-xs font-mono text-ghost-fog max-w-md mx-auto">
            The abyss holds no records matching your active filters. Try clearing your search or exploring all categories.
          </p>
          <div className="mt-6">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 rounded border border-blood bg-blood/20 px-4 py-2 font-mono text-xs text-blood hover:bg-blood hover:text-white transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>RESET ALL FILTERS</span>
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 font-mono text-xs">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/games?page=${p}&search=${encodeURIComponent(search)}&genre=${encodeURIComponent(genre)}&platform=${encodeURIComponent(platform)}&sort=${sort}`}
              className={`flex h-8 w-8 items-center justify-center rounded border transition-all ${
                p === page
                  ? "border-blood bg-blood text-white font-bold"
                  : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
