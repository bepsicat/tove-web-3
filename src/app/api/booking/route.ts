import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: verify tove.dk in Resend dashboard (resend.com/domains) before going live,
// then change the from address to: Tove <noreply@tove.dk>
const FROM = "Tove Booking <onboarding@resend.dev>";
const TO = "kontakt@tove.dk";

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("da-DK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, date, time, message } = body as {
    name: string;
    email: string;
    date: string;
    time: string;
    message?: string;
  };

  if (!name || !email || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Server-side policy enforcement: no bookings at or after 17:30 on Fri/Sat
  const [year, month, day] = date.split("-").map(Number);
  const dayOfWeek = new Date(year, month - 1, day).getDay();
  if ((dayOfWeek === 5 || dayOfWeek === 6) && time >= "17:30") {
    return NextResponse.json(
      { error: "No bookings at or after 17:30 on Fri/Sat" },
      { status: 422 }
    );
  }

  const formattedDate = formatDate(date);

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2c2c2c; background: #f9f6f1; padding: 32px; border-radius: 4px;">
      <h2 style="margin: 0 0 24px; font-size: 22px; font-weight: 400; border-bottom: 1px solid #ddd; padding-bottom: 16px;">
        New booking request
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 10px 0; color: #888; width: 110px; vertical-align: top;">Name</td>
          <td style="padding: 10px 0; font-weight: 500;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2c2c2c;">${email}</a></td>
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
          message
            ? `<tr>
          <td style="padding: 10px 0; color: #888; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
        </tr>`
            : ""
        }
      </table>
      <p style="margin: 24px 0 0; font-size: 13px; color: #aaa; border-top: 1px solid #ddd; padding-top: 16px;">
        Reply directly to this email to respond to ${name}.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Booking request — ${name}, ${formattedDate} ${time}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
