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
      return NextResponse.json({ error: "Authentication required to react." }, { status: 401 });
    }

    const { slug } = params;
    const body = await req.json();
    const action = body.action || "like"; // "like" or "bookmark"

    const blog = await prisma.blogArticle.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    if (action === "bookmark") {
      const existing = await prisma.bookmark.findUnique({
        where: {
          userId_blogId: {
            userId: session.userId,
            blogId: blog.id,
          },
        },
      });

      if (existing) {
        await prisma.bookmark.delete({ where: { id: existing.id } });
        return NextResponse.json({ bookmarked: false });
      } else {
        await prisma.bookmark.create({
          data: {
            userId: session.userId,
            blogId: blog.id,
          },
        });
        return NextResponse.json({ bookmarked: true });
      }
    } else {
      // Like reaction
      const existing = await prisma.reaction.findUnique({
        where: {
          blogId_userId_type: {
            blogId: blog.id,
            userId: session.userId,
            type: "LIKE",
          },
        },
      });

      if (existing) {
        await prisma.reaction.delete({ where: { id: existing.id } });
        const updated = await prisma.blogArticle.update({
          where: { id: blog.id },
          data: { likesCount: { decrement: 1 } },
          select: { likesCount: true },
        });
        return NextResponse.json({ liked: false, likesCount: updated.likesCount });
      } else {
        await prisma.reaction.create({
          data: {
            blogId: blog.id,
            userId: session.userId,
            type: "LIKE",
          },
        });
        const updated = await prisma.blogArticle.update({
          where: { id: blog.id },
          data: { likesCount: { increment: 1 } },
          select: { likesCount: true },
        });
        return NextResponse.json({ liked: true, likesCount: updated.likesCount });
      }
    }
  } catch (err: unknown) {
    console.error("Blog react error:", err);
    return NextResponse.json({ error: "Failed to update reaction." }, { status: 500 });
  }
}
