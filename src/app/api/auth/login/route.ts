import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, createToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { login, password } = body;

    if (!login || !password) {
      return NextResponse.json(
        { error: "Identification identifier and password are required." },
        { status: 400 }
      );
    }

    const cleanLogin = login.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: cleanLogin }, { username: cleanLogin }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. The abyss denies entry." },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials. The abyss denies entry." },
        { status: 401 }
      );
    }

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
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err: unknown) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Authentication system error." },
      { status: 500 }
    );
  }
}
