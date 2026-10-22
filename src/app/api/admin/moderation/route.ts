import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || (session.role !== "ADMIN" && session.role !== "MODERATOR")) {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const [pendingBlogs, allReviews, reports] = await Promise.all([
      prisma.blogArticle.findMany({
        where: { status: { in: ["SUBMITTED", "DRAFT"] } },
        include: {
          author: { select: { username: true, displayName: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.review.findMany({
        take: 20,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { username: true } },
          game: { select: { title: true } },
        },
      }),
      prisma.contentReport.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          reportedBy: { select: { username: true } },
        },
      }),
    ]);

    return NextResponse.json({ pendingBlogs, allReviews, reports });
  } catch (err: unknown) {
    console.error("Moderation list error:", err);
    return NextResponse.json({ error: "Failed to fetch moderation queue." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "ADMIN" && session.role !== "MODERATOR")) {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const body = await req.json();
    const { action, type, id, reason } = body;

    if (type === "blog") {
      if (action === "approve") {
        await prisma.blogArticle.update({
          where: { id },
          data: { status: "PUBLISHED" },
        });
      } else if (action === "reject") {
        await prisma.blogArticle.update({
          where: { id },
          data: { status: "REJECTED", rejectionReason: reason || "Does not meet community lore standards." },
        });
      } else if (action === "delete") {
        await prisma.blogArticle.delete({ where: { id } });
      }
    } else if (type === "review") {
      if (action === "delete") {
        await prisma.review.delete({ where: { id } });
      } else if (action === "toggle_moderation") {
        const review = await prisma.review.findUnique({ where: { id }, select: { isModerated: true } });
        if (review) {
          await prisma.review.update({
            where: { id },
            data: { isModerated: !review.isModerated },
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: `Moderation action ${action} executed.` });
  } catch (err: unknown) {
    console.error("Moderation action error:", err);
    return NextResponse.json({ error: "Failed to apply moderation decision." }, { status: 500 });
  }
}
