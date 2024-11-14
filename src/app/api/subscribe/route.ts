import { NextResponse } from "next/server";
import axios from "axios";
import { corsMiddleware } from "@/lib/cors";

export async function POST(request: Request) {
  // CORS check
  const corsResponse = corsMiddleware(request);
  if (corsResponse.status !== 200) return corsResponse;

  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      {
        status: 400,
        headers: corsResponse.headers, // Include CORS headers in error responses
      }
    );
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

    return NextResponse.json(
      { message: "User added successfully!" },
      { status: 200, headers: corsResponse.headers } // Include CORS headers
    );
  } catch (error) {
    console.error("Brevo API error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500, headers: corsResponse.headers } // Include CORS headers
    );
  }
}

export function OPTIONS(request: Request) {
  return corsMiddleware(request); // Preflight request for CORS
}
