import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const game = await prisma.game.findUnique({
      where: { slug },
      include: {
        downloadLinks: {
          orderBy: { createdAt: "asc" },
        },
        screenshots: {
          orderBy: { order: "asc" },
        },
        characters: {
          select: {
            id: true,
            slug: true,
            name: true,
            portraitUrl: true,
            role: true,
            characterClass: true,
            hasSpoilers: true,
          },
        },
        reviews: {
          where: { isModerated: true },
          orderBy: { helpfulCount: "desc" },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found in the abyss." }, { status: 404 });
    }

    // Check if current user saved this game
    let isSaved = false;
    let userReview = null;
    const session = await getSession();
    if (session) {
      const saved = await prisma.savedGame.findUnique({
        where: {
          userId_gameId: {
            userId: session.userId,
            gameId: game.id,
          },
        },
      });
      isSaved = !!saved;

      userReview = await prisma.review.findUnique({
        where: {
          gameId_userId: {
            gameId: game.id,
            userId: session.userId,
          },
        },
      });
    }

    // Related games
    const relatedGames = await prisma.game.findMany({
      where: {
        genre: game.genre,
        id: { not: game.id },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        coverImage: true,
        genre: true,
        rating: true,
        platforms: true,
      },
      take: 4,
    });

    return NextResponse.json({
      game,
      isSaved,
      userReview,
      relatedGames,
    });
  } catch (err: unknown) {
    console.error("Game detail fetch error:", err);
    return NextResponse.json({ error: "Internal archive error." }, { status: 500 });
  }
}
