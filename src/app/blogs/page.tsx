import React from "react";
import Link from "next/link";
import { BookOpen, PlusSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { APP_CONFIG } from "@/lib/config";
import { BlogCard } from "@/components/BlogCard";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    category?: string;
  };
}

export default async function BlogsIndexPage({ searchParams }: PageProps) {
  const category = searchParams.category || "all";

  const where: { status: string; category?: string } = { status: "PUBLISHED" };
  if (category && category !== "all") {
    where.category = category;
  }

  const blogs = await prisma.blogArticle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { displayName: true, username: true, avatarUrl: true, role: true },
      },
    },
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-abyss-700/80 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            <BookOpen className="h-4 w-4" />
            <span>COMMUNITY LORE ARCHIVES</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
            COMMUNITY BLOGS & ESSAYS
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-xl">
            Thoughtful dissertations, design retrospectives, audio breakdowns, and survival guides written by the community.
          </p>
        </div>

        <Link
          href="/blogs/editor"
          className="inline-flex items-center gap-2 rounded border border-toxic bg-toxic/20 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-toxic hover:bg-toxic hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] shrink-0"
        >
          <PlusSquare className="h-4 w-4" />
          <span>WRITE ESSAY</span>
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
        <span className="text-ghost-fog mr-1">CATEGORY:</span>
        <Link
          href="/blogs"
          className={`rounded px-3 py-1 border transition-all ${
            category === "all"
              ? "border-blood bg-blood text-white font-bold"
              : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
          }`}
        >
          ALL TOPICS
        </Link>
        {APP_CONFIG.blogCategories.map((c) => (
          <Link
            key={c}
            href={`/blogs?category=${encodeURIComponent(c)}`}
            className={`rounded px-3 py-1 border transition-all ${
              category === c
                ? "border-blood bg-blood text-white font-bold"
                : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Grid of Community Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <BlogCard key={b.id} blog={b} />
        ))}
      </div>
    </div>
  );
}
