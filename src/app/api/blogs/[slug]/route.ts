import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const blog = await prisma.blogArticle.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            bio: true,
            role: true,
          },
        },
        game: {
          select: {
            id: true,
            slug: true,
            title: true,
            coverImage: true,
          },
        },
        comments: {
          where: { isModerated: true },
          orderBy: { createdAt: "desc" },
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

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    // Increment view count asynchronously
    await prisma.blogArticle.update({
      where: { id: blog.id },
      data: { viewsCount: { increment: 1 } },
    });

    // Check current user reactions / bookmarks
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

    return NextResponse.json({
      blog,
      isLiked,
      isBookmarked,
    });
  } catch (err: unknown) {
    console.error("Blog fetch error:", err);
    return NextResponse.json({ error: "Failed to load blog." }, { status: 500 });
  }
}
