import React from "react";
import { Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { NewsCard } from "@/components/NewsCard";

export const revalidate = 60;

export default async function NewsIndexPage() {
  const news = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <Newspaper className="h-4 w-4" />
          <span>EDITORIAL DISPATCHES</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          GAMING NEWS WIRE
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-2xl">
          Verified publisher announcements, industry milestone reports, release date updates, and studio investigations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>
    </div>
  );
}
