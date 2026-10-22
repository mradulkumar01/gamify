import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";

    if (!q || q.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Search games
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { genre: { contains: q } },
          { genres: { contains: q } },
          { platforms: { contains: q } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        genre: true,
      },
      take: 6,
    });

    // Search characters
    const characters = await prisma.gameCharacter.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { gameTitle: { contains: q } },
          { role: { contains: q } },
        ],
      },
      select: {
        id: true,
        slug: true,
        name: true,
        gameTitle: true,
      },
      take: 4,
    });

    // Search news
    const news = await prisma.newsArticle.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { tags: { contains: q } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
      },
      take: 3,
    });

    // Search published blogs
    const blogs = await prisma.blogArticle.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q } },
          { tags: { contains: q } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
      },
      take: 3,
    });

    const results = [
      ...games.map((g) => ({
        type: "game" as const,
        title: g.title,
        subtitle: g.genre,
        url: `/games/${g.slug}`,
      })),
      ...characters.map((c) => ({
        type: "character" as const,
        title: c.name,
        subtitle: c.gameTitle,
        url: `/characters/${c.slug}`,
      })),
      ...news.map((n) => ({
        type: "news" as const,
        title: n.title,
        subtitle: "Official News Dispatch",
        url: `/news/${n.slug}`,
      })),
      ...blogs.map((b) => ({
        type: "blog" as const,
        title: b.title,
        subtitle: b.category,
        url: `/blogs/${b.slug}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (err: unknown) {
    console.error("Search API error:", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
