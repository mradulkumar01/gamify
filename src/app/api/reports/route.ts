import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to file reports." }, { status: 401 });
    }

    const body = await req.json();
    const { contentType, contentId, reason } = body;

    if (!contentType || !contentId || !reason) {
      return NextResponse.json({ error: "Content type, ID, and reason are required." }, { status: 400 });
    }

    const report = await prisma.contentReport.create({
      data: {
        reportedByUserId: session.userId,
        contentType,
        contentId,
        reason: reason.trim(),
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Report logged with AFTERDARK moderation overseers.",
      reportId: report.id,
    });
  } catch (err: unknown) {
    console.error("Report error:", err);
    return NextResponse.json({ error: "Failed to submit report." }, { status: 500 });
  }
}
