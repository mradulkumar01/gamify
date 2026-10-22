import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get("gameId");
    const sort = searchParams.get("sort") || "helpful"; // helpful, newest, rating_high, rating_low

    const where: { isModerated: boolean; gameId?: string } = { isModerated: true };
    if (gameId) where.gameId = gameId;

    let orderBy: Record<string, "asc" | "desc"> = { helpfulCount: "desc" };
    if (sort === "newest") orderBy = { createdAt: "desc" };
    else if (sort === "rating_high") orderBy = { rating: "desc" };
    else if (sort === "rating_low") orderBy = { rating: "asc" };

    const reviews = await prisma.review.findMany({
      where,
      orderBy,
      include: {
        game: {
          select: { id: true, title: true, slug: true, coverImage: true },
        },
        user: {
          select: { id: true, username: true, displayName: true, avatarUrl: true, role: true },
        },
      },
      take: 30,
    });

    return NextResponse.json({ reviews });
  } catch (err: unknown) {
    console.error("Reviews fetch error:", err);
    return NextResponse.json({ error: "Failed to load reviews." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to submit review." }, { status: 401 });
    }

    const body = await req.json();
    const { gameId, rating, title, reviewBody, platformPlayed, playTimeHours, hasSpoilers } = body;

    if (!gameId || !rating || !title || !reviewBody || !platformPlayed) {
      return NextResponse.json({ error: "All required review fields must be supplied." }, { status: 400 });
    }

    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 10) {
      return NextResponse.json({ error: "Rating must be between 1 and 10." }, { status: 400 });
    }

    // Upsert review (allows user to update their existing review per requirement 10)
    const review = await prisma.review.upsert({
      where: {
        gameId_userId: {
          gameId,
          userId: session.userId,
        },
      },
      update: {
        rating: numRating,
        title: title.trim(),
        body: reviewBody.trim(),
        platformPlayed,
        playTimeHours: playTimeHours ? parseFloat(playTimeHours) : null,
        hasSpoilers: !!hasSpoilers,
        updatedAt: new Date(),
      },
      create: {
        gameId,
        userId: session.userId,
        rating: numRating,
        title: title.trim(),
        body: reviewBody.trim(),
        platformPlayed,
        playTimeHours: playTimeHours ? parseFloat(playTimeHours) : null,
        hasSpoilers: !!hasSpoilers,
        isModerated: true,
      },
    });

    // Re-aggregate real game rating from database records
    const allGameReviews = await prisma.review.findMany({
      where: { gameId, isModerated: true },
      select: { rating: true },
    });

    if (allGameReviews.length > 0) {
      const avg = allGameReviews.reduce((acc, r) => acc + r.rating, 0) / allGameReviews.length;
      await prisma.game.update({
        where: { id: gameId },
        data: {
          rating: parseFloat(avg.toFixed(1)),
          ratingCount: allGameReviews.length,
        },
      });
    }

    return NextResponse.json({ success: true, review });
  } catch (err: unknown) {
    console.error("Submit review error:", err);
    return NextResponse.json({ error: "Failed to record review." }, { status: 500 });
  }
}
