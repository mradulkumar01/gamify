import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Tag, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { BlogDetailClient } from "./BlogDetailClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await prisma.blogArticle.findUnique({
    where: { slug: params.slug },
    select: { title: true, subtitle: true, coverImage: true },
  });

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: blog.title,
    description: blog.subtitle || blog.title,
    openGraph: {
      title: `${blog.title} | AFTERDARK`,
      description: blog.subtitle || blog.title,
      images: [{ url: blog.coverImage }],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blogArticle.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { displayName: true, username: true, avatarUrl: true, bio: true, role: true },
      },
      game: {
        select: { id: true, slug: true, title: true, coverImage: true, genre: true },
      },
      comments: {
        where: { isModerated: true },
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { displayName: true, username: true, avatarUrl: true },
          },
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  // Increment view
  await prisma.blogArticle.update({
    where: { id: blog.id },
    data: { viewsCount: { increment: 1 } },
  });

  let isLiked = false;
  let isBookmarked = false;
  const session = await getSession();
  if (session) {
    const [reaction, bookmark] = await Promise.all([
      prisma.reaction.findUnique({
        where: {
          blogId_userId_type: {
            blogId: blog.id,
            userId: session.userId,
            type: "LIKE",
          },
        },
      }),
      prisma.bookmark.findUnique({
        where: {
          userId_blogId: {
            userId: session.userId,
            blogId: blog.id,
          },
        },
      }),
    ]);
    isLiked = !!reaction;
    isBookmarked = !!bookmark;
  }

  const tagsList = blog.tags ? blog.tags.split(",").map((t) => t.trim()) : [];

  return (
    <article className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 font-mono text-xs text-ghost-fog hover:text-blood transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ALL COMMUNITY BLOGS</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 font-mono text-xs text-ghost-fog">
          <span className="text-toxic uppercase font-bold">{blog.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {blog.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-ghost-white leading-tight">
          {blog.title}
        </h1>

        {blog.subtitle && (
          <p className="text-base sm:text-lg text-ghost-ash leading-relaxed font-light">
            {blog.subtitle}
          </p>
        )}

        {/* Author Bio Bar */}
        <div className="pt-4 flex items-center justify-between border-t border-abyss-800">
          <Link
            href={`/profile/${blog.author.username}`}
            className="flex items-center gap-3 group"
          >
            <div className="h-10 w-10 rounded-full bg-blood-dark/50 border border-blood/30 overflow-hidden flex items-center justify-center text-xs font-bold text-white">
              {blog.author.avatarUrl ? (
                <img src={blog.author.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                blog.author.displayName.charAt(0)
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-ghost-white group-hover:text-blood transition-colors">
                {blog.author.displayName}
              </p>
              <p className="text-[10px] font-mono text-blood uppercase">{blog.author.role}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-abyss-700 bg-abyss-950 aspect-video mb-10 shadow-2xl">
        <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover" />
      </div>

      {/* Game Association if any */}
      {blog.game && (
        <div className="rounded-xl border border-blood/30 bg-abyss-900/80 p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={blog.game.coverImage} alt="" className="h-12 w-10 rounded object-cover" />
            <div>
              <p className="text-[10px] font-mono uppercase text-blood font-semibold">SUBJECT GAME</p>
              <h4 className="font-display text-sm font-bold text-white">{blog.game.title}</h4>
            </div>
          </div>
          <Link
            href={`/games/${blog.game.slug}`}
            className="rounded border border-abyss-700 bg-abyss-800 px-3 py-1 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white"
          >
            VIEW GAME
          </Link>
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-invert max-w-none text-ghost-ash leading-relaxed space-y-6 text-sm sm:text-base font-sans">
        {blog.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Tags */}
      {tagsList.length > 0 && (
        <div className="mt-10 pt-6 border-t border-abyss-800 flex flex-wrap items-center gap-2 font-mono text-xs">
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

      {/* Interactive Reactions and Comment Feed */}
      <BlogDetailClient
        blogSlug={blog.slug}
        initialLikes={blog.likesCount}
        initialLiked={isLiked}
        initialBookmarked={isBookmarked}
        comments={blog.comments}
      />
    </article>
  );
}
