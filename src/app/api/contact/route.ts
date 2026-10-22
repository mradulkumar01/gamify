import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Sanitize and process contact transmission
    console.log("Transmission received for AFTERDARK Creator / Staff:", {
      name: name.trim(),
      email: email.trim(),
      subject: subject || "General Inquiry",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your message has pierced the veil and reached the creator. We shall respond if your transmission survives.",
    });
  } catch (err: unknown) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send dispatch." }, { status: 500 });
  }
}
