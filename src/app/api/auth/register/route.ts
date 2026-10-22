import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, displayName } = body;

    if (!username || !email || !password || !displayName) {
      return NextResponse.json(
        { error: "All credentials (username, email, password, display name) are required." },
        { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { error: "Username must be between 3 and 30 characters." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const cleanUsername = username.toLowerCase().trim();
    const cleanEmail = email.toLowerCase().trim();

    // Check existing
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username: cleanUsername }, { email: cleanEmail }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Username or email is already bound to another abyss entity." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        displayName: displayName.trim(),
        passwordHash,
        role: "USER",
      },
    });

    const token = createToken({
      userId: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    });

    setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Failed to forge abyss account." },
      { status: 500 }
    );
  }
}
