import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://gianlucafornaciari.com",
  "https://www.gianlucafornaciari.com",
  "http://gianlucafornaciari.com",
  "http://www.gianlucafornaciari.com",
  "https://main.d2r4x32lujy7lh.amplifyapp.com",
  //"http://localhost:3000", // for local dev
];

export function corsMiddleware(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    const response = new NextResponse(null, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }

  return new NextResponse("CORS error: Not allowed", { status: 403 });
}
