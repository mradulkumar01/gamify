import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied. Administrator clearance required." }, { status: 403 });
    }

    const [
      gamesCount,
      usersCount,
      reviewsCount,
      blogsCount,
      newsCount,
      charactersCount,
      savedGamesCount,
      recentUsers,
      recentReviews,
      recentBlogs,
    ] = await Promise.all([
      prisma.game.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.blogArticle.count(),
      prisma.newsArticle.count(),
      prisma.gameCharacter.count(),
      prisma.savedGame.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, username: true, email: true, role: true, createdAt: true },
      }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          game: { select: { title: true } },
          user: { select: { username: true } },
        },
      }),
      prisma.blogArticle.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { username: true } },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        gamesCount,
        usersCount,
        reviewsCount,
        blogsCount,
        newsCount,
        charactersCount,
        savedGamesCount,
      },
      recentUsers,
      recentReviews,
      recentBlogs,
    });
  } catch (err: unknown) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to compile system metrics." }, { status: 500 });
  }
}
