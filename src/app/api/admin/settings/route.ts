import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    return NextResponse.json({ settings: settingsMap });
  } catch (err: unknown) {
    console.error("Fetch settings error:", err);
    return NextResponse.json({ error: "Failed to read site settings." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const body = await req.json();
    const { settings } = body; // object with key-value pairs

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true, message: "Site settings persisted to database." });
  } catch (err: unknown) {
    console.error("Save settings error:", err);
    return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
  }
}
