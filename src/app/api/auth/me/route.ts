import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      role: user.role,
      favoriteGenres: user.favoriteGenres,
      preferredPlatforms: user.preferredPlatforms,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
}
