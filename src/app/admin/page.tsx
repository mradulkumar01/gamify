import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Gamepad2,
  FileCheck,
  Settings,
  Users,
  Database,
  Star,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/auth/login?redirect=/admin");
  }

  const [
    gamesCount,
    usersCount,
    reviewsCount,
    blogsCount,
    pendingBlogsCount,
    recentUsers,
    recentReviews,
  ] = await Promise.all([
    prisma.game.count(),
    prisma.user.count(),
    prisma.review.count(),
    prisma.blogArticle.count(),
    prisma.blogArticle.count({ where: { status: "SUBMITTED" } }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, username: true, displayName: true, email: true, role: true, createdAt: true },
    }),
    prisma.review.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        game: { select: { title: true } },
        user: { select: { displayName: true } },
      },
    }),
  ]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-blood/40 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            <ShieldAlert className="h-4 w-4" />
            <span>OVERSEER COMMAND CONSOLE</span>
          </div>
          <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
            ABYSS CENTRAL OVERSEER
          </h1>
          <p className="font-mono text-xs text-ghost-fog">
            Administrator Clearance Verified: <span className="text-white font-bold">{user.displayName}</span>
          </p>
        </div>

        {/* Quick Navigation Pills */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <Link
            href="/admin/games"
            className="flex items-center gap-1.5 rounded border border-abyss-700 bg-abyss-900 px-3.5 py-2 text-ghost-white hover:border-blood"
          >
            <Gamepad2 className="h-3.5 w-3.5 text-blood" />
            <span>GAME MANAGER</span>
          </Link>
          <Link
            href="/admin/moderation"
            className="flex items-center gap-1.5 rounded border border-abyss-700 bg-abyss-900 px-3.5 py-2 text-ghost-white hover:border-toxic"
          >
            <FileCheck className="h-3.5 w-3.5 text-toxic" />
            <span>MODERATION ({pendingBlogsCount})</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-1.5 rounded border border-abyss-700 bg-abyss-900 px-3.5 py-2 text-ghost-white hover:border-cold"
          >
            <Settings className="h-3.5 w-3.5 text-cold" />
            <span>SITE SETTINGS</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl border border-blood/30 bg-abyss-900/80 p-5">
          <div className="flex items-center justify-between mb-2">
            <Gamepad2 className="h-5 w-5 text-blood" />
            <span className="font-mono text-[10px] text-toxic">LIVE DB</span>
          </div>
          <p className="font-display text-3xl font-black text-white">{gamesCount}</p>
          <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Cataloged Games</p>
        </div>

        <div className="rounded-xl border border-toxic/30 bg-abyss-900/80 p-5">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-toxic" />
            <span className="font-mono text-[10px] text-toxic">ACTIVE</span>
          </div>
          <p className="font-display text-3xl font-black text-white">{usersCount}</p>
          <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Registered Users</p>
        </div>

        <div className="rounded-xl border border-cold/30 bg-abyss-900/80 p-5">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-5 w-5 text-cold" />
            <span className="font-mono text-[10px] text-cold">VERIFIED</span>
          </div>
          <p className="font-display text-3xl font-black text-white">{reviewsCount}</p>
          <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Player Reviews</p>
        </div>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-5">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="h-5 w-5 text-ghost-ash" />
            <span className="font-mono text-[10px] text-blood">
              {pendingBlogsCount} PENDING
            </span>
          </div>
          <p className="font-display text-3xl font-black text-white">{blogsCount}</p>
          <p className="font-mono text-xs text-ghost-fog uppercase mt-1">Community Essays</p>
        </div>
      </div>

      {/* Main Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registered Users */}
        <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
            <Users className="h-4 w-4 text-toxic" />
            RECENT USER INITIATIONS
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded bg-abyss-950 p-3 border border-abyss-800"
              >
                <div>
                  <p className="text-white font-bold">{u.displayName}</p>
                  <p className="text-[10px] text-ghost-fog">@{u.username} • {u.email}</p>
                </div>
                <div className="text-right">
                  <span className="rounded bg-blood/20 text-blood px-2 py-0.5 text-[10px] font-bold">
                    {u.role}
                  </span>
                  <p className="text-[9px] text-ghost-fog mt-1">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews Activity */}
        <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
            <Star className="h-4 w-4 text-blood" />
            LATEST REVIEW SUBMISSIONS
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {recentReviews.map((r) => (
              <div
                key={r.id}
                className="rounded bg-abyss-950 p-3 border border-abyss-800 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-blood font-bold">{r.game.title}</span>
                  <span className="text-white">★ {r.rating}/10</span>
                </div>
                <p className="text-ghost-ash text-[11px] truncate">{r.title}</p>
                <div className="flex items-center justify-between text-[10px] text-ghost-fog pt-1 border-t border-abyss-800">
                  <span>By {r.user.displayName}</span>
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
