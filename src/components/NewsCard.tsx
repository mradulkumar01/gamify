import React from "react";
import Link from "next/link";
import { Clock, Calendar, ExternalLink } from "lucide-react";

export interface NewsCardData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  coverImage: string;
  authorName: string;
  authorRole: string;
  readTimeMinutes: number;
  publishedAt: string | Date;
  tags?: string | null;
  sourceUrl?: string | null;
}

export function NewsCard({ news }: { news: NewsCardData }) {
  const formattedDate = new Date(news.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group rounded-xl border border-abyss-700/80 bg-abyss-900 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blood/60 flex flex-col h-full">
      <Link href={`/news/${news.slug}`} className="relative block h-48 w-full overflow-hidden bg-abyss-950">
        <img
          src={news.coverImage}
          alt={news.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="rounded bg-obsidian/80 px-2 py-0.5 text-[10px] font-mono uppercase text-blood border border-blood/20 backdrop-blur-md">
            NEWS WIRE
          </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-ghost-fog mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {news.readTimeMinutes} min read
            </span>
          </div>

          <Link href={`/news/${news.slug}`}>
            <h3 className="font-display text-base font-bold text-ghost-white group-hover:text-blood transition-colors line-clamp-2">
              {news.title}
            </h3>
          </Link>

          {news.subtitle && (
            <p className="mt-2 text-xs text-ghost-ash line-clamp-2 leading-relaxed">
              {news.subtitle}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-abyss-800 flex items-center justify-between text-xs font-mono">
          <span className="text-ghost-fog truncate">By {news.authorName}</span>
          <Link
            href={`/news/${news.slug}`}
            className="flex items-center gap-1 text-blood hover:text-white transition-colors"
          >
            <span>DISPATCH</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
