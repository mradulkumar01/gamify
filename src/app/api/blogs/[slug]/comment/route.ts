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
      return NextResponse.json({ error: "Authentication required to comment." }, { status: 401 });
    }

    const { slug } = params;
    const body = await req.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Comment text cannot be empty." }, { status: 400 });
    }

    const blog = await prisma.blogArticle.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        blogId: blog.id,
        userId: session.userId,
        content: content.trim(),
        isModerated: true,
      },
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
    });

    return NextResponse.json({ success: true, comment });
  } catch (err: unknown) {
    console.error("Comment submit error:", err);
    return NextResponse.json({ error: "Failed to post comment." }, { status: 500 });
  }
}
