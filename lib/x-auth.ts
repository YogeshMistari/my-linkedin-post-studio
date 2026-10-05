import { createHash, randomBytes } from "crypto";

export const X_AUTHORIZE_URL = "https://x.com/i/oauth2/authorize";
export const X_TOKEN_URL = "https://api.x.com/2/oauth2/token";
export const X_ME_URL = "https://api.x.com/2/users/me";

export const X_SCOPES = [
  "tweet.read",
  "tweet.write",
  "users.read",
  "offline.access",
];

export function getXOAuthConfig() {
  const clientId = process.env.X_CLIENT_ID?.trim() || "";
  const clientSecret = process.env.X_CLIENT_SECRET?.trim() || "";
  const redirectUri =
    process.env.X_REDIRECT_URI?.trim() ||
    "http://localhost:3000/api/auth/x/callback";

  return { clientId, clientSecret, redirectUri };
}

export function createState() {
  return randomBytes(24).toString("base64url");
}

export function createCodeVerifier() {
  return randomBytes(48).toString("base64url");
}

export function createCodeChallenge(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

export async function exchangeXCode({
  code,
  verifier,
}: {
  code: string;
  verifier: string;
}) {
  const { clientId, clientSecret, redirectUri } = getXOAuthConfig();

  if (!clientId) {
    throw new Error("X_CLIENT_ID is not configured.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
    client_id: clientId,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (clientSecret) {
    headers.Authorization =
      "Basic " +
      Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  }

  const response = await fetch(X_TOKEN_URL, {
    method: "POST",
    headers,
    body,
    cache: "no-store",
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};

  if (!response.ok) {
    throw new Error(
      data?.error_description ||
        data?.error ||
        `X token exchange failed with status ${response.status}`
    );
  }

  return {
    accessToken: String(data.access_token || ""),
    refreshToken: String(data.refresh_token || ""),
    expiresIn: Number(data.expires_in || 7200),
    scope: String(data.scope || ""),
  };
}

export async function refreshXToken(refreshToken: string) {
  const { clientId, clientSecret } = getXOAuthConfig();

  if (!clientId) {
    throw new Error("X_CLIENT_ID is not configured.");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (clientSecret) {
    headers.Authorization =
      "Basic " +
      Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  }

  const response = await fetch(X_TOKEN_URL, {
    method: "POST",
    headers,
    body,
    cache: "no-store",
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};

  if (!response.ok) {
    throw new Error(
      data?.error_description ||
        data?.error ||
        `X token refresh failed with status ${response.status}`
    );
  }

  return {
    accessToken: String(data.access_token || ""),
    refreshToken: String(data.refresh_token || refreshToken),
    expiresIn: Number(data.expires_in || 7200),
    scope: String(data.scope || ""),
  };
}

export async function getXMe(accessToken: string) {
  const response = await fetch(X_ME_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};

  if (!response.ok) {
    throw new Error(
      data?.detail ||
        data?.title ||
        `X profile lookup failed with status ${response.status}`
    );
  }

  return data?.data || {};
}
