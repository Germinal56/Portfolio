import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const smtpUser = process.env.SES_SMTP_USERNAME;
  const smtpPass = process.env.SES_SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    return NextResponse.json({ error: "SMTP credentials are missing" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: "email-smtp.eu-west-1.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New message from ${name} | Your Website`,
    text: `Email: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
