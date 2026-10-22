import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const genre = searchParams.get("genre")?.trim() || "";
    const platform = searchParams.get("platform")?.trim() || "";
    const upcoming = searchParams.get("upcoming");
    const freeOnly = searchParams.get("free") === "true";
    const sort = searchParams.get("sort") || "rating"; // rating, newest, title, popularity
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const skip = (page - 1) * limit;

    const where: Prisma.GameWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDescription: { contains: search } },
        { developer: { contains: search } },
        { publisher: { contains: search } },
      ];
    }

    if (genre && genre !== "all") {
      where.genres = { contains: genre };
    }

    if (platform && platform !== "all") {
      where.platforms = { contains: platform };
    }

    if (upcoming === "true") {
      where.isUpcoming = true;
    } else if (upcoming === "false") {
      where.isUpcoming = false;
    }

    if (freeOnly) {
      where.isFreeToPlay = true;
    }

    // Determine sort
    let orderBy: Prisma.GameOrderByWithRelationInput = { rating: "desc" };
    if (sort === "newest") {
      orderBy = { releaseDate: "desc" };
    } else if (sort === "title") {
      orderBy = { title: "asc" };
    } else if (sort === "popularity") {
      orderBy = { ratingCount: "desc" };
    }

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          tagline: true,
          shortDescription: true,
          coverImage: true,
          genre: true,
          genres: true,
          platforms: true,
          rating: true,
          ratingCount: true,
          releaseDate: true,
          isUpcoming: true,
          price: true,
          isFreeToPlay: true,
          isFeatured: true,
          isTrending: true,
        },
      }),
      prisma.game.count({ where }),
    ]);

    return NextResponse.json({
      games,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: unknown) {
    console.error("Games fetch error:", err);
    return NextResponse.json({ error: "Failed to load game archives." }, { status: 500 });
  }
}
