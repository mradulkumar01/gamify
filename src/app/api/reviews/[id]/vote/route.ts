import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to vote." }, { status: 401 });
    }

    const { id: reviewId } = params;

    const existingVote = await prisma.reviewHelpfulVote.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId: session.userId,
        },
      },
    });

    if (existingVote) {
      await prisma.reviewHelpfulVote.delete({
        where: { id: existingVote.id },
      });
      const updated = await prisma.review.update({
        where: { id: reviewId },
        data: { helpfulCount: { decrement: 1 } },
        select: { helpfulCount: true },
      });
      return NextResponse.json({ voted: false, helpfulCount: updated.helpfulCount });
    } else {
      await prisma.reviewHelpfulVote.create({
        data: {
          reviewId,
          userId: session.userId,
        },
      });
      const updated = await prisma.review.update({
        where: { id: reviewId },
        data: { helpfulCount: { increment: 1 } },
        select: { helpfulCount: true },
      });
      return NextResponse.json({ voted: true, helpfulCount: updated.helpfulCount });
    }
  } catch (err: unknown) {
    console.error("Review helpful vote error:", err);
    return NextResponse.json({ error: "Failed to record vote." }, { status: 500 });
  }
}
