import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to bookmark games." }, { status: 401 });
    }

    const { slug } = params;
    const game = await prisma.game.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found." }, { status: 404 });
    }

    const existing = await prisma.savedGame.findUnique({
      where: {
        userId_gameId: {
          userId: session.userId,
          gameId: game.id,
        },
      },
    });

    if (existing) {
      await prisma.savedGame.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false, message: "Removed from library." });
    } else {
      await prisma.savedGame.create({
        data: {
          userId: session.userId,
          gameId: game.id,
        },
      });
      return NextResponse.json({ saved: true, message: "Archived to your library." });
    }
  } catch (err: unknown) {
    console.error("Save game error:", err);
    return NextResponse.json({ error: "Failed to update saved game status." }, { status: 500 });
  }
}
