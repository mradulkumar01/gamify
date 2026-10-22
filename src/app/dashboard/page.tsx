import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Bookmark,
  PenTool,
  Star,
  Settings,
  Bell,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { GameCard } from "@/components/GameCard";

export const revalidate = 0; // Dynamic dashboard

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  const [savedGames, userBlogs, userReviews] = await Promise.all([
    prisma.savedGame.findMany({
      where: { userId: user.id },
      include: { game: true },
      take: 4,
    }),
    prisma.blogArticle.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.review.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { game: { select: { title: true, slug: true } } },
      take: 4,
    }),
  ]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-abyss-700/80 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            <LayoutDashboard className="h-4 w-4" />
            <span>PERSONAL COMMAND STATION</span>
          </div>
          <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
            GREETINGS, {user.displayName}
          </h1>
          <p className="font-mono text-xs text-ghost-fog">
            Role: <span className="text-blood font-semibold">{user.role}</span> • Email: {user.email}
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href="/blogs/editor"
            className="flex items-center gap-1.5 rounded border border-toxic bg-toxic/20 px-4 py-2 text-toxic hover:bg-toxic hover:text-black font-semibold transition-all"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>WRITE ESSAY</span>
          </Link>
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded border border-blood bg-blood px-4 py-2 text-white font-bold transition-all shadow-[0_0_15px_rgba(255,28,47,0.4)]"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>ADMIN CONSOLE</span>
            </Link>
          )}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Link
          href="/dashboard/saved"
          className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-5 hover:border-blood/50 transition-all"
        >
          <Bookmark className="h-5 w-5 text-blood mb-2" />
          <p className="font-display text-2xl font-black text-white">{savedGames.length}</p>
          <p className="font-mono text-[11px] text-ghost-fog uppercase">Saved Games</p>
        </Link>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-5">
          <PenTool className="h-5 w-5 text-toxic mb-2" />
          <p className="font-display text-2xl font-black text-white">{userBlogs.length}</p>
          <p className="font-mono text-[11px] text-ghost-fog uppercase">Published Essays</p>
        </div>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-5">
          <Star className="h-5 w-5 text-cold mb-2" />
          <p className="font-display text-2xl font-black text-white">{userReviews.length}</p>
          <p className="font-mono text-[11px] text-ghost-fog uppercase">Logged Reviews</p>
        </div>

        <Link
          href="/dashboard/notifications"
          className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-5 hover:border-blood/50 transition-all"
        >
          <Bell className="h-5 w-5 text-ghost-ash mb-2" />
          <p className="font-display text-2xl font-black text-white">0</p>
          <p className="font-mono text-[11px] text-ghost-fog uppercase">Dispatches / Alerts</p>
        </Link>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Saved Games Library Preview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-abyss-800 pb-2">
            <h2 className="font-display text-lg font-bold text-ghost-white flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-blood" />
              SAVED GAMES IN YOUR ARCHIVE
            </h2>
            <Link
              href="/dashboard/saved"
              className="font-mono text-xs text-blood hover:text-white"
            >
              VIEW ALL
            </Link>
          </div>

          {savedGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedGames.map((sg) => (
                <GameCard key={sg.id} game={sg.game} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-abyss-800 bg-abyss-950 p-8 text-center">
              <p className="text-xs font-mono text-ghost-fog">No games bookmarked yet.</p>
              <Link
                href="/games"
                className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-blood hover:underline"
              >
                <span>Browse Game Archives</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar: Your Published Lore & Reviews */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-5 space-y-4">
            <h3 className="font-display text-sm font-bold text-ghost-white pb-2 border-b border-abyss-800">
              YOUR ESSAYS & REVIEWS
            </h3>

            <div className="space-y-3">
              {userBlogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blogs/${b.slug}`}
                  className="block rounded bg-abyss-950 p-2.5 border border-abyss-800 hover:border-blood/40"
                >
                  <span className="font-mono text-[9px] uppercase text-toxic">{b.category}</span>
                  <p className="font-display text-xs font-bold text-white truncate">{b.title}</p>
                </Link>
              ))}

              {userReviews.map((r) => (
                <div key={r.id} className="rounded bg-abyss-950 p-2.5 border border-abyss-800">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-blood font-semibold">{r.game.title}</span>
                    <span className="text-white">★ {r.rating}/10</span>
                  </div>
                  <p className="font-display text-xs text-ghost-ash truncate mt-0.5">{r.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
