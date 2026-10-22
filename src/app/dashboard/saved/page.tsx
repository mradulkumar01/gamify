import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bookmark, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { GameCard } from "@/components/GameCard";

export const revalidate = 0;

export default async function SavedGamesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login?redirect=/dashboard/saved");
  }

  const saved = await prisma.savedGame.findMany({
    where: { userId: user.id },
    include: { game: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ghost-fog hover:text-blood"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>RETURN TO DASHBOARD</span>
        </Link>
      </div>

      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <Bookmark className="h-4 w-4" />
          <span>YOUR VAULT</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          SAVED HORROR ARCHIVES
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-2xl">
          Quick access to bookmarked titles, official storefront links, and tracked releases.
        </p>
      </div>

      {saved.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saved.map((s) => (
            <GameCard key={s.id} game={{ ...s.game, isSaved: true }} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-abyss-700 bg-abyss-900/60 p-12 text-center max-w-xl mx-auto my-12">
          <Bookmark className="h-10 w-10 text-ghost-fog mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold text-ghost-white">
            YOUR VAULT IS CURRENTLY EMPTY
          </h3>
          <p className="mt-2 text-xs font-mono text-ghost-fog">
            Explore the horror archives and click the bookmark ribbon to save games to your personal command station.
          </p>
          <div className="mt-6">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 rounded border border-blood bg-blood/20 px-5 py-2 font-mono text-xs text-blood hover:bg-blood hover:text-white transition-all"
            >
              BROWSE GAMES NOW
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
