import { Resend } from "resend";
import { NextResponse } from "next/server";

const FROM = "Tove Booking <noreply@tove.dk>";
const TO = "kontakt@tove.dk";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function escapeHtml(value: string) {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => characters[character]);
}

function parseDate(dateString: string) {
  const match = DATE_PATTERN.exec(dateString);
  if (!match) return null;

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("da-DK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, date, time, message } = body as {
    name?: unknown;
    email?: unknown;
    date?: unknown;
    time?: unknown;
    message?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof date !== "string" ||
    typeof time !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !date ||
    !time
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (message !== undefined && typeof message !== "string") {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const normalizedName = name.trim().replace(/[\r\n]+/g, " ");
  const normalizedEmail = email.trim();
  const bookingDate = parseDate(date);

  if (!EMAIL_PATTERN.test(normalizedEmail) || !bookingDate || !TIME_PATTERN.test(time)) {
    return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
  }

  // Server-side policy enforcement: no bookings at or after 17:30 on Fri/Sat
  const dayOfWeek = bookingDate.getDay();
  if ((dayOfWeek === 5 || dayOfWeek === 6) && time >= "17:30") {
    return NextResponse.json(
      { error: "No bookings at or after 17:30 on Fri/Sat" },
      { status: 422 }
    );
  }

  const formattedDate = formatDate(bookingDate);
  const safeName = escapeHtml(normalizedName);
  const safeEmail = escapeHtml(normalizedEmail);
  const safeMessage = message ? escapeHtml(message) : "";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2c2c2c; background: #f9f6f1; padding: 32px; border-radius: 4px;">
      <h2 style="margin: 0 0 24px; font-size: 22px; font-weight: 400; border-bottom: 1px solid #ddd; padding-bottom: 16px;">
        New booking request
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 10px 0; color: #888; width: 110px; vertical-align: top;">Name</td>
          <td style="padding: 10px 0; font-weight: 500;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${encodeURIComponent(normalizedEmail)}" style="color: #2c2c2c;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Date</td>
          <td style="padding: 10px 0;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Time</td>
          <td style="padding: 10px 0;">${time}</td>
        </tr>
        ${
          safeMessage
            ? `<tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; line-height: 1.6;">${safeMessage.replace(/\n/g, "<br>")}</td>
        </tr>`
            : ""
        }
      </table>
      <p style="margin: 24px 0 0; font-size: 13px; color: #aaa; border-top: 1px solid #ddd; padding-top: 16px;">
        Reply directly to this email to respond to ${safeName}.
      </p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Booking email is not configured: RESEND_API_KEY is missing");
    return NextResponse.json({ error: "Booking email is unavailable" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: normalizedEmail,
      subject: `Booking request — ${normalizedName}, ${formattedDate} ${time}`,
      html,
    });

    if (error) {
      console.error("Resend rejected booking email", {
        name: error.name,
        message: error.message,
      });
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected booking email failure", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
