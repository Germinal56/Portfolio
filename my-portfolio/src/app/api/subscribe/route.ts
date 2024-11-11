import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.BREVO_API_KEY!;
    const brevoUrl = "https://api.brevo.com/v3/contacts";

    await axios.post(
      brevoUrl,
      {
        email,
        attributes: { FIRSTNAME: name },
        listIds: [4],
        updateEnabled: true,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ message: "User added successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Brevo API error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
