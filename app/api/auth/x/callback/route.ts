import { NextRequest, NextResponse } from "next/server";
import { exchangeXCode, getXMe } from "@/lib/x-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code") || "";
  const state = request.nextUrl.searchParams.get("state") || "";
  const oauthError = request.nextUrl.searchParams.get("error") || "";

  if (oauthError) {
    return NextResponse.redirect(
      new URL("/?x_connect=denied", request.url)
    );
  }

  const expectedState = request.cookies.get("x_oauth_state")?.value || "";
  const verifier = request.cookies.get("x_code_verifier")?.value || "";

  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    return NextResponse.redirect(
      new URL("/?x_connect=invalid_state", request.url)
    );
  }

  try {
    const token = await exchangeXCode({ code, verifier });

    if (!token.accessToken) {
      throw new Error("X did not return an access token.");
    }

    let username = "";

    try {
      const me = await getXMe(token.accessToken);
      username = String(me?.username || "");
    } catch {
      // Connection still succeeds even if profile lookup fails.
    }

    const response = NextResponse.redirect(
      new URL("/?x_connect=success", request.url)
    );

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("x_access_token", token.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: Math.max(60, token.expiresIn),
    });

    if (token.refreshToken) {
      response.cookies.set("x_refresh_token", token.refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
      });
    }

    response.cookies.set(
      "x_token_expires_at",
      String(Date.now() + token.expiresIn * 1000),
      {
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: Math.max(60, token.expiresIn),
      }
    );

    if (username) {
      response.cookies.set("x_connected_username", username, {
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
      });
    }

    response.cookies.delete("x_oauth_state");
    response.cookies.delete("x_code_verifier");

    return response;
  } catch (error) {
    console.error("X OAuth callback failed:", error);
    return NextResponse.redirect(
      new URL("/?x_connect=error", request.url)
    );
  }
}
