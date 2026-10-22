import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { User, Calendar, BookOpen, Star, Bookmark, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 60;

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      blogs: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { displayName: true, username: true, avatarUrl: true, role: true } },
        },
      },
      reviews: {
        where: { isModerated: true },
        orderBy: { createdAt: "desc" },
        include: {
          game: { select: { title: true, slug: true, coverImage: true } },
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Profile Header Card */}
      <div className="rounded-2xl border border-blood/40 bg-abyss-900/90 p-6 sm:p-8 mb-10 shadow-[0_0_35px_rgba(255,28,47,0.2)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-blood bg-abyss-950 flex items-center justify-center text-3xl font-bold text-white overflow-hidden shrink-0 shadow-lg">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.displayName} className="h-full w-full object-cover" />
            ) : (
              user.displayName.charAt(0)
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="rounded bg-blood px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
                {user.role}
              </span>
              {user.isVerified && (
                <span className="rounded bg-toxic/20 text-toxic border border-toxic/30 px-2 py-0.5 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-black text-ghost-white">
              {user.displayName}
            </h1>
            <p className="font-mono text-xs text-ghost-fog">@{user.username}</p>

            {user.bio && (
              <p className="text-xs sm:text-sm text-ghost-ash max-w-2xl leading-relaxed pt-1">
                {user.bio}
              </p>
            )}

            <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-ghost-fog">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blood" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>Favorite Genres: {user.favoriteGenres || "Horror"}</span>
              <span>•</span>
              <span>Platforms: {user.preferredPlatforms || "PC"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Published Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Published Blogs */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
            <BookOpen className="h-4 w-4 text-toxic" />
            PUBLISHED ESSAYS ({user.blogs.length})
          </h2>

          {user.blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-abyss-800 bg-abyss-950 p-6 text-center text-xs font-mono text-ghost-fog">
              No essays published yet.
            </div>
          )}
        </div>

        {/* User Reviews */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
            <Star className="h-4 w-4 text-blood" />
            REVIEWS ({user.reviews.length})
          </h2>

          <div className="space-y-4">
            {user.reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`/games/${rev.game.slug}`}
                    className="font-display text-xs font-bold text-ghost-white hover:text-blood"
                  >
                    {rev.game.title}
                  </Link>
                  <span className="font-mono text-xs font-bold text-blood">★ {rev.rating}/10</span>
                </div>
                <h4 className="font-display text-xs font-bold text-ghost-ash line-clamp-1">
                  {rev.title}
                </h4>
                <p className="text-[11px] text-ghost-fog line-clamp-2">{rev.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
