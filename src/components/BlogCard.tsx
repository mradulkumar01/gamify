import React from "react";
import Link from "next/link";
import { Clock, Eye, Heart } from "lucide-react";

export interface BlogCardData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  coverImage: string;
  category: string;
  readTimeMinutes: number;
  author: {
    displayName: string;
    username: string;
    avatarUrl?: string | null;
  };
  viewsCount: number;
  likesCount: number;
  createdAt: string | Date;
}

export function BlogCard({ blog }: { blog: BlogCardData }) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group rounded-xl border border-abyss-700/80 bg-abyss-900 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blood/60 flex flex-col h-full">
      <Link href={`/blogs/${blog.slug}`} className="relative block h-48 w-full overflow-hidden bg-abyss-950">
        <img
          src={blog.coverImage}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="rounded bg-obsidian/85 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-toxic border border-toxic/30 backdrop-blur-md">
            {blog.category}
          </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-ghost-fog mb-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {blog.readTimeMinutes} min read
            </span>
          </div>

          <Link href={`/blogs/${blog.slug}`}>
            <h3 className="font-display text-base font-bold text-ghost-white group-hover:text-blood transition-colors line-clamp-2">
              {blog.title}
            </h3>
          </Link>

          {blog.subtitle && (
            <p className="mt-2 text-xs text-ghost-ash line-clamp-2 leading-relaxed">
              {blog.subtitle}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-abyss-800 flex items-center justify-between text-xs font-mono">
          <Link
            href={`/profile/${blog.author.username}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <div className="h-6 w-6 rounded-full bg-abyss-800 border border-abyss-700 overflow-hidden flex items-center justify-center text-[10px] text-ghost-ash">
              {blog.author.avatarUrl ? (
                <img src={blog.author.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                blog.author.displayName.charAt(0)
              )}
            </div>
            <span className="text-ghost-fog text-[11px] truncate max-w-[110px]">
              {blog.author.displayName}
            </span>
          </Link>

          <div className="flex items-center gap-3 text-[11px] text-ghost-fog">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {blog.viewsCount}
            </span>
            <span className="flex items-center gap-1 text-blood">
              <Heart className="h-3 w-3 fill-blood/20" />
              {blog.likesCount}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
