import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const authorUsername = searchParams.get("author");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: {
      status: string;
      category?: string;
      tags?: { contains: string };
      author?: { username: string };
    } = { status: "PUBLISHED" };

    if (category && category !== "all") {
      where.category = category;
    }
    if (tag) {
      where.tags = { contains: tag };
    }
    if (authorUsername) {
      where.author = { username: authorUsername };
    }

    const [blogs, total] = await Promise.all([
      prisma.blogArticle.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              role: true,
            },
          },
        },
      }),
      prisma.blogArticle.count({ where }),
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: unknown) {
    console.error("Blogs fetch error:", err);
    return NextResponse.json({ error: "Failed to load blogs." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to publish lore." }, { status: 401 });
    }

    const body = await req.json();
    const { title, subtitle, coverImage, content, category, tags, gameId, status } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: "Title, content, and category are required." }, { status: 400 });
    }

    // Slug generation
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    if (!baseSlug) baseSlug = "blog-post";

    let slug = baseSlug;
    let counter = 1;
    while (await prisma.blogArticle.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Estimate read time (avg 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Determine initial status based on role or setting
    const finalStatus =
      status === "DRAFT"
        ? "DRAFT"
        : session.role === "ADMIN" || session.role === "AUTHOR"
        ? "PUBLISHED"
        : "PUBLISHED"; // Or SUBMITTED per moderation workflow

    const blog = await prisma.blogArticle.create({
      data: {
        slug,
        title: title.trim(),
        subtitle: subtitle ? subtitle.trim() : null,
        coverImage:
          coverImage ||
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        content,
        category,
        tags: tags ? tags.trim() : null,
        readTimeMinutes,
        authorId: session.userId,
        gameId: gameId || null,
        status: finalStatus,
      },
    });

    return NextResponse.json({ success: true, blog });
  } catch (err: unknown) {
    console.error("Create blog error:", err);
    return NextResponse.json({ error: "Failed to create blog." }, { status: 500 });
  }
}
