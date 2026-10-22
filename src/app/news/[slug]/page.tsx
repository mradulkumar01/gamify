import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ExternalLink, ArrowLeft, Share2, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await prisma.newsArticle.findUnique({
    where: { slug: params.slug },
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
    },
  });

  if (!news) {
    notFound();
  }

  const tagsList = news.tags ? news.tags.split(",").map((t) => t.trim()) : [];

  return (
    <article className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-mono text-xs text-ghost-fog hover:text-blood transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>NEWS WIRE ARCHIVE</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 font-mono text-xs text-ghost-fog">
          <span className="text-blood font-semibold">NEWS DISPATCH</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(news.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {news.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-ghost-white leading-tight">
          {news.title}
        </h1>

        {news.subtitle && (
          <p className="text-base sm:text-lg text-ghost-ash leading-relaxed font-light">
            {news.subtitle}
          </p>
        )}

        <div className="pt-2 flex items-center justify-between border-t border-abyss-800 text-xs font-mono">
          <div>
            <span className="text-white font-bold">{news.authorName}</span>
            <span className="text-ghost-fog"> — {news.authorRole}</span>
          </div>
          {news.sourceUrl && (
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-toxic hover:text-white transition-colors"
            >
              <span>OFFICIAL SOURCE</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden border border-abyss-700 bg-abyss-950 aspect-video mb-10 shadow-2xl">
        <img
          src={news.coverImage}
          alt={news.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Associated Game Pill */}
      {news.game && (
        <div className="rounded-xl border border-blood/30 bg-abyss-900/80 p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={news.game.coverImage} alt="" className="h-12 w-10 rounded object-cover" />
            <div>
              <p className="text-[10px] font-mono uppercase text-blood font-semibold">ASSOCIATED TITLE</p>
              <h4 className="font-display text-sm font-bold text-white">{news.game.title}</h4>
            </div>
          </div>
          <Link
            href={`/games/${news.game.slug}`}
            className="rounded border border-abyss-700 bg-abyss-800 px-3 py-1 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white"
          >
            OPEN ARCHIVE
          </Link>
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-ghost-ash leading-relaxed space-y-6 text-sm sm:text-base font-sans">
        {news.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Tags */}
      {tagsList.length > 0 && (
        <div className="mt-12 pt-6 border-t border-abyss-800 flex flex-wrap items-center gap-2 font-mono text-xs">
          <Tag className="h-3.5 w-3.5 text-blood" />
          <span className="text-ghost-fog mr-2">TOPICS:</span>
          {tagsList.map((tag) => (
            <span
              key={tag}
              className="rounded bg-abyss-900 px-2.5 py-1 text-ghost-ash border border-abyss-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
