import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ disconnected: true });

  for (const name of [
    "x_access_token",
    "x_refresh_token",
    "x_token_expires_at",
    "x_connected_username",
    "x_oauth_state",
    "x_code_verifier",
  ]) {
    response.cookies.delete(name);
  }

  return response;
}
