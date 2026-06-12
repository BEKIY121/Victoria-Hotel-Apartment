import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data/settings";
import { sendContactInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const settings = await getSiteSettings();
    const sent = await sendContactInquiryEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      message: message.trim(),
      hotelEmail: settings.email,
    });

    if (!sent) {
      return NextResponse.json(
        { error: "Email service unavailable — please call or WhatsApp us" },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/contact:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
