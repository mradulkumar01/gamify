import React from "react";
import Link from "next/link";
import { Search, Gamepad2, User, Newspaper, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { GameCard } from "@/components/GameCard";
import { CharacterCard } from "@/components/CharacterCard";
import { NewsCard } from "@/components/NewsCard";
import { BlogCard } from "@/components/BlogCard";

interface PageProps {
  searchParams: {
    q?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function SearchResultsPage({ searchParams }: PageProps) {
  const q = searchParams.q?.trim() || "";

  let games: any[] = [];
  let characters: any[] = [];
  let news: any[] = [];
  let blogs: any[] = [];

  if (q.length >= 2) {
    [games, characters, news, blogs] = await Promise.all([
      prisma.game.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { genre: { contains: q } },
            { genres: { contains: q } },
            { platforms: { contains: q } },
          ],
        },
        take: 8,
      }),
      prisma.gameCharacter.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { gameTitle: { contains: q } },
            { role: { contains: q } },
          ],
        },
        take: 4,
      }),
      prisma.newsArticle.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { tags: { contains: q } },
          ],
        },
        take: 3,
      }),
      prisma.blogArticle.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: q } },
            { tags: { contains: q } },
          ],
        },
        take: 3,
        include: {
          author: { select: { displayName: true, username: true, avatarUrl: true } },
        },
      }),
    ]);
  }

  const totalHits = games.length + characters.length + news.length + blogs.length;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <Search className="h-4 w-4" />
          <span>ARCHIVE SEARCH RESULTS</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          QUERY: &quot;{q || "EMPTY SEARCH"}&quot;
        </h1>
        <p className="mt-2 text-xs font-mono text-ghost-fog">
          Total occurrences discovered across games, lore, news, and essays: {totalHits}
        </p>
      </div>

      {totalHits === 0 ? (
        <div className="rounded-2xl border border-abyss-700 bg-abyss-900/60 p-12 text-center max-w-lg mx-auto my-12">
          <Search className="h-10 w-10 text-ghost-fog mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold text-ghost-white">
            NO ANOMALIES FOUND
          </h3>
          <p className="mt-2 text-xs font-mono text-ghost-fog">
            No games, lore characters, or news matched your search terms.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Games Matching */}
          {games.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
                <Gamepad2 className="h-4 w-4 text-blood" />
                GAMES ({games.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </section>
          )}

          {/* Characters Matching */}
          {characters.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
                <User className="h-4 w-4 text-toxic" />
                LORE CHARACTERS ({characters.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {characters.map((c) => (
                  <CharacterCard key={c.id} character={c} />
                ))}
              </div>
            </section>
          )}

          {/* News Matching */}
          {news.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
                <Newspaper className="h-4 w-4 text-cold" />
                NEWS DISPATCHES ({news.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((n) => (
                  <NewsCard key={n.id} news={n} />
                ))}
              </div>
            </section>
          )}

          {/* Community Blogs Matching */}
          {blogs.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
                <BookOpen className="h-4 w-4 text-blood" />
                COMMUNITY ESSAYS ({blogs.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
