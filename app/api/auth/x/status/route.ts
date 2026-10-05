import { NextRequest, NextResponse } from "next/server";
import { getXMe, refreshXToken } from "@/lib/x-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  let accessToken =
    request.cookies.get("x_access_token")?.value ||
    process.env.X_USER_ACCESS_TOKEN?.trim() ||
    "";

  const refreshToken = request.cookies.get("x_refresh_token")?.value || "";
  const expiresAt = Number(
    request.cookies.get("x_token_expires_at")?.value || "0"
  );

  let refreshed:
    | {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      }
    | undefined;

  if (
    refreshToken &&
    (!accessToken || (expiresAt && Date.now() > expiresAt - 60_000))
  ) {
    try {
      refreshed = await refreshXToken(refreshToken);
      accessToken = refreshed.accessToken;
    } catch (error) {
      console.error("Unable to refresh X token:", error);
    }
  }

  if (!accessToken) {
    return NextResponse.json({ connected: false });
  }

  try {
    const me = await getXMe(accessToken);
    const response = NextResponse.json({
      connected: true,
      username: String(me?.username || ""),
      name: String(me?.name || ""),
    });

    if (refreshed) {
      const secure = process.env.NODE_ENV === "production";

      response.cookies.set("x_access_token", refreshed.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: Math.max(60, refreshed.expiresIn),
      });

      response.cookies.set("x_refresh_token", refreshed.refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
      });

      response.cookies.set(
        "x_token_expires_at",
        String(Date.now() + refreshed.expiresIn * 1000),
        {
          httpOnly: true,
          sameSite: "lax",
          secure,
          path: "/",
          maxAge: Math.max(60, refreshed.expiresIn),
        }
      );
    }

    return response;
  } catch {
    return NextResponse.json({ connected: false });
  }
}
