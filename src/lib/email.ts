import { formatDate, formatPrice } from "@/lib/utils";

async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  logLabel: string;
}): Promise<boolean> {
  const from =
    process.env.EMAIL_FROM ?? "Victoria Hotel <bookings@victoriahotel.et>";
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && !apiKey.includes("replace") && apiKey.length > 0) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });
    if (!res.ok) {
      console.error("Resend API error:", await res.text());
      return false;
    }
    return true;
  }

  if (
    process.env.NODE_ENV === "development" ||
    process.env.ALLOW_DEV_BOOKING === "true"
  ) {
    console.log(`[email:dev] ${options.logLabel}`);
    console.log(`  To: ${Array.isArray(options.to) ? options.to.join(", ") : options.to}`);
    console.log(`  Subject: ${options.subject}`);
    return true;
  }

  return false;
}

export interface BookingConfirmationEmail {
  to: string;
  guestName: string;
  refNumber: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
}

export interface BookingCancellationEmail {
  to: string;
  guestName: string;
  refNumber: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
}

export interface ContactInquiryEmail {
  name: string;
  email: string;
  phone?: string;
  message: string;
  hotelEmail: string;
}

function buildBookingEmailHtml(data: BookingConfirmationEmail): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h1 style="font-size:22px;font-weight:normal">Booking Confirmed</h1>
      <p>Dear ${data.guestName},</p>
      <p>Thank you for booking with Victoria Hotel Apartments. Your reservation is confirmed.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
        <tr><td style="padding:8px 0;color:#666">Reference</td><td style="padding:8px 0;text-align:right"><strong>${data.refNumber}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Room</td><td style="padding:8px 0;text-align:right">${data.roomName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Check-in</td><td style="padding:8px 0;text-align:right">${formatDate(data.checkIn)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Check-out</td><td style="padding:8px 0;text-align:right">${formatDate(data.checkOut)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Guests</td><td style="padding:8px 0;text-align:right">${data.guests}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Total paid</td><td style="padding:8px 0;text-align:right"><strong>${formatPrice(data.totalAmount)}</strong></td></tr>
      </table>
      <p style="font-size:14px"><a href="${appUrl}/booking/lookup?ref=${data.refNumber}">View your booking</a></p>
      <p style="font-size:13px;color:#666">Victoria Hotel Apartments · Sarbet, Pushkin Square · Addis Ababa</p>
    </div>
  `;
}

export async function sendBookingConfirmationEmail(
  data: BookingConfirmationEmail
): Promise<boolean> {
  return sendEmail({
    to: data.to,
    subject: `Booking Confirmed — ${data.refNumber}`,
    html: buildBookingEmailHtml(data),
    logLabel: `Booking confirmation · ${data.refNumber}`,
  });
}

export async function sendBookingCancellationEmail(
  data: BookingCancellationEmail
): Promise<boolean> {
  return sendEmail({
    to: data.to,
    subject: `Booking Cancelled — ${data.refNumber}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h1 style="font-size:22px;font-weight:normal">Booking Cancelled</h1>
        <p>Dear ${data.guestName},</p>
        <p>Your reservation <strong>${data.refNumber}</strong> for ${data.roomName} (${formatDate(data.checkIn)} — ${formatDate(data.checkOut)}) has been cancelled.</p>
        <p style="font-size:13px;color:#666">If a payment was made, a refund will be processed to your original payment method.</p>
      </div>
    `,
    logLabel: `Booking cancellation · ${data.refNumber}`,
  });
}

export async function sendContactInquiryEmail(
  data: ContactInquiryEmail
): Promise<boolean> {
  return sendEmail({
    to: data.hotelEmail,
    subject: `Website inquiry from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px">
        <h2>New contact inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
    logLabel: `Contact inquiry from ${data.email}`,
  });
}
