import { NextResponse } from "next/server";
import {
  X_AUTHORIZE_URL,
  X_SCOPES,
  createCodeChallenge,
  createCodeVerifier,
  createState,
  getXOAuthConfig,
} from "@/lib/x-auth";

export const runtime = "nodejs";

export async function GET() {
  const { clientId, redirectUri } = getXOAuthConfig();

  if (!clientId) {
    return NextResponse.json(
      { error: "X_CLIENT_ID is not configured in .env.local." },
      { status: 500 }
    );
  }

  const state = createState();
  const verifier = createCodeVerifier();
  const challenge = createCodeChallenge(verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: X_SCOPES.join(" "),
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  const response = NextResponse.redirect(
    `${X_AUTHORIZE_URL}?${params.toString()}`
  );

  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("x_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 10 * 60,
  });

  response.cookies.set("x_code_verifier", verifier, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 10 * 60,
  });

  return response;
}
