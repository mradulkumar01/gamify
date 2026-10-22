import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      tagline,
      shortDescription,
      fullDescription,
      coverImage,
      genre,
      genres,
      platforms,
      supportedOS,
      developer,
      publisher,
      releaseDate,
      isUpcoming,
      price,
      isFreeToPlay,
      officialWebsite,
    } = body;

    if (!title || !shortDescription || !fullDescription || !genre || !developer || !publisher) {
      return NextResponse.json({ error: "Missing required game fields." }, { status: 400 });
    }

    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.game.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const game = await prisma.game.create({
      data: {
        slug,
        title: title.trim(),
        tagline: tagline || null,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        coverImage:
          coverImage ||
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        genre: genre.trim(),
        genres: genres || genre.trim(),
        platforms: platforms || "PC",
        supportedOS: supportedOS || "Windows",
        developer: developer.trim(),
        publisher: publisher.trim(),
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        isUpcoming: !!isUpcoming,
        price: price ? parseFloat(price) : 0,
        isFreeToPlay: !!isFreeToPlay,
        officialWebsite: officialWebsite || null,
        verifiedStatus: true,
      },
    });

    return NextResponse.json({ success: true, game });
  } catch (err: unknown) {
    console.error("Admin game create error:", err);
    return NextResponse.json({ error: "Failed to create game record." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Game ID is required." }, { status: 400 });
    }

    await prisma.game.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Game eradicated from archives." });
  } catch (err: unknown) {
    console.error("Admin game delete error:", err);
    return NextResponse.json({ error: "Failed to delete game." }, { status: 500 });
  }
}
