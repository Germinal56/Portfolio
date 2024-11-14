import { NextResponse } from "next/server";

const allowedOrigins = [
    "https://gianlucafornaciari.com",
    "https://www.gianlucafornaciari.com", // Include www version
    "http://gianlucafornaciari.com",      // Include http version
    "http://www.gianlucafornaciari.com",  // Include http+www version
    "https://main.d2r4x32lujy7lh.amplifyapp.com"
];
  
export function corsMiddleware(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    return response;
  }

  return new NextResponse("CORS error: Not allowed", { status: 403 });
}
