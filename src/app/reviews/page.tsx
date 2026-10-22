import React from "react";
import Link from "next/link";
import { Star, ThumbsUp, ShieldCheck, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    sort?: string;
  };
}

export default async function ReviewsIndexPage({ searchParams }: PageProps) {
  const sort = searchParams.sort || "helpful";

  let orderBy: Record<string, "asc" | "desc"> = { helpfulCount: "desc" };
  if (sort === "newest") orderBy = { createdAt: "desc" };
  else if (sort === "rating_high") orderBy = { rating: "desc" };
  else if (sort === "rating_low") orderBy = { rating: "asc" };

  const reviews = await prisma.review.findMany({
    where: { isModerated: true },
    orderBy,
    include: {
      game: {
        select: {
          id: true,
          slug: true,
          title: true,
          coverImage: true,
          genre: true,
        },
      },
      user: {
        select: {
          displayName: true,
          username: true,
          avatarUrl: true,
          role: true,
        },
      },
    },
    take: 30,
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <Star className="h-4 w-4 fill-blood" />
          <span>UNCENSORED FEEDBACK</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          COMMUNITY REVIEWS & CRITIQUES
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-2xl">
          Real aggregate feedback calculated strictly from authenticated player records. No fabricated reviews or bots.
        </p>
      </div>

      {/* Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-ghost-fog">SORT BY:</span>
          {[
            { label: "MOST HELPFUL", val: "helpful" },
            { label: "NEWEST", val: "newest" },
            { label: "HIGHEST RATED", val: "rating_high" },
            { label: "LOWEST RATED", val: "rating_low" },
          ].map((s) => (
            <Link
              key={s.val}
              href={`/reviews?sort=${s.val}`}
              className={`rounded px-3 py-1.5 border transition-all ${
                sort === s.val
                  ? "border-blood bg-blood text-white font-bold"
                  : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
        <span className="text-ghost-fog">TOTAL REVIEWS LOGGED: {reviews.length}</span>
      </div>

      {/* Reviews Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-abyss-700 bg-abyss-900/80 p-6 flex flex-col justify-between space-y-4 hover:border-blood/40 transition-all"
          >
            <div>
              {/* Game Info Header */}
              <div className="flex items-center justify-between pb-3 border-b border-abyss-800">
                <Link
                  href={`/games/${rev.game.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={rev.game.coverImage}
                    alt={rev.game.title}
                    className="h-12 w-10 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-display text-sm font-bold text-ghost-white group-hover:text-blood transition-colors">
                      {rev.game.title}
                    </h3>
                    <span className="font-mono text-[10px] text-blood">{rev.game.genre}</span>
                  </div>
                </Link>

                <div className="flex items-center gap-1 rounded bg-obsidian px-2.5 py-1 border border-blood/30 font-mono text-xs font-bold text-white">
                  <Star className="h-3.5 w-3.5 text-blood fill-blood" />
                  <span>{rev.rating}/10</span>
                </div>
              </div>

              {/* Review Body */}
              <div className="mt-4 space-y-2">
                <h4 className="font-display text-base font-bold text-ghost-white">
                  {rev.title}
                </h4>
                <p className="text-xs text-ghost-ash leading-relaxed whitespace-pre-line line-clamp-4">
                  {rev.body}
                </p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-3 border-t border-abyss-800 flex items-center justify-between text-[11px] font-mono text-ghost-fog">
              <Link
                href={`/profile/${rev.user.username}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-abyss-800 border border-abyss-700 flex items-center justify-center text-[10px] text-ghost-ash overflow-hidden">
                  {rev.user.avatarUrl ? (
                    <img src={rev.user.avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    rev.user.displayName.charAt(0)
                  )}
                </div>
                <span className="font-bold text-ghost-white">{rev.user.displayName}</span>
              </Link>

              <div className="flex items-center gap-3">
                <span>{rev.platformPlayed}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-toxic">
                  <ThumbsUp className="h-3 w-3" /> {rev.helpfulCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
